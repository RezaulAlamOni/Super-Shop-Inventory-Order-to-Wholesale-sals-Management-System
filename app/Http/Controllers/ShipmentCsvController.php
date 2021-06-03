<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\QRGenController;
use App\customer;
use App\customer_order;
use App\customer_shop;
use App\customer_order_detail;
use App\customer_shipment;

use App\customer_item;
use App\vendor_item;
use Session;

class ShipmentCsvController extends Controller
{
    private $QR_var;
    private $csv_folder_name;
    
    public function __construct()
    {
        $this->QR_var=new QRGenController();
        $this->csv_folder_name='app/'.config('const.CSV_UPLOAD_PATH');
    }
    public function get_stock_info($jan_code){
        $data = array();
        $stock_info = collect(\DB::select("select stock_items.*,(SELECT SUM(customer_shipments.confirm_quantity) as confirm_qty
        FROM customer_order_details INNER JOIN customer_shipments ON customer_shipments.customer_order_detail_id=customer_order_details.customer_order_detail_id INNER JOIN customer_orders on customer_orders.customer_order_id=customer_order_details.customer_order_id where customer_orders.status='確定済み' and customer_order_details.jan='".$jan_code."') conf_qty
      from jans inner join vendor_items on jans.jan=vendor_items.jan inner join stock_items on vendor_items.vendor_item_id = stock_items.vendor_item_id where jans.jan = '".$jan_code."'"))->first();
        if($stock_info){
            $data = $stock_info;
        }
        return $data;
    }
    public function ShipmentCsvInsert(Request $request){
        $file = $request->file('file');
        $file_name = time().'_'.$file->getClientOriginalName();
        $this->QR_var->folder_create($this->csv_folder_name);

        $file->storeAs(config('const.CSV_UPLOAD_PATH'), $file_name);
        $baseUrl = storage_path().'/app/'.config('const.CSV_UPLOAD_PATH') . $file_name;
        $dataArr = $this->csvReader($baseUrl);
        $customer_order_array=array();
        $error_item_list=array();
       //return $dataArr;
        foreach ($dataArr as $key => $value) {
           
            $customer_id=$this->customer_search($value[3]);
            if($customer_id==null){
                // @unlink($baseUrl);
                // Session::flash('message', '未登録の販売先コードがあります：'.$value[3]); 
                // Session::flash('class_name', 'alert-danger'); 
                $error_item_list[]=array('customer_id'=>$value[8]);
                continue;
                // return response()->json(['message' => '未登録の販売先コードがあります：'.$value[3],'success'=>0]);
            }
            $customer_shop_id=$this->customer_shop_search($value[2],$customer_id,$value[1]);
            if($customer_shop_id==null){
                // @unlink($baseUrl);
                // Session::flash('message', 'shop code do not match：[shop code]'); 
                // Session::flash('class_name', 'alert-danger'); 
                // return response()->json(['message' => 'shop code do not match：'.$value[2],'success'=>0]);
                $error_item_list[]=array('customer_shop_id'=>$value[8]);
                continue;
            }
             $jan_code=$value[8];
            $customer_item_id=$this->customer_item_search($jan_code,$customer_id);
            if($customer_item_id==null){
                // @unlink($baseUrl);
                // Session::flash('message', 'jan code not exist：[jan code]'); 
                // Session::flash('class_name', 'alert-danger'); 
                // return response()->json(['message' => 'jan code not exist：'.$jan_code,'success'=>0]);
                $error_item_list[]=array('customer_item_id'=>$value[8]);
                continue;
            }
            $shipment_number=$value[3].'_'.date('Y-m-d',strtotime($value[5])).'_'.$value[4];
            
            $this->QR_var->folder_create('/app/public/shipment_numbers');
            $this->QR_var->qr_code_gen($shipment_number,'/app/public/shipment_numbers');
            $inputs_type = $value[9];
            $customer_order_demo['customer_id']=$customer_id;
            $customer_order_demo['customer_shop_id']=$customer_shop_id;
            $customer_order_demo['shipment_number']=$shipment_number;
            $customer_order_demo['category']='edi';
            $customer_order_demo['voucher_number']=$value[4];
            $customer_order_demo['order_date']= date('Y-m-d H:i:s',strtotime($value[5]));
            $customer_order_demo['shipment_date']= date('Y-m-d');
            $customer_order_demo['delivery_date']= date('Y-m-d H:i:s',strtotime($value[6]));

            $customer_order_demo_detail['customer_item_id']=$customer_item_id;
            $customer_order_demo_detail['jan']=$jan_code;
            $customer_order_demo_detail['inputs']=$inputs_type;
            $customer_order_demo_detail['quantity']=$value[10];
            $customer_order_demo_detail['cost_price']=$value[11];
            $customer_order_demo_detail['selling_price']=$value[12];
            $customer_order_id = customer_order::insertGetId($customer_order_demo);
            $customer_order_demo_detail['customer_order_id']=$customer_order_id;
            $customer_order_detail_id = customer_order_detail::insertGetId($customer_order_demo_detail);
            $stock_info = $this->get_stock_info($jan_code);
            
            $c_quantity = $value[10];
            $shiptment['customer_id']=$customer_id;
            $shiptment['customer_order_id']=$customer_order_id;
            $shiptment['customer_order_detail_id']=$customer_order_detail_id;
            $shiptment['shipment_date']=date('Y-m-d H:i:s',strtotime($value[6]));
            $shiptment['inputs']=$inputs_type;
            $shiptment['confirm_quantity']=$c_quantity;
            
            
            
            if($stock_info){
                $shiptment['rack_number']=$stock_info->rack_number;
                $conf_qty = $stock_info->conf_qty;
                $conf_qty = ($conf_qty!=''?$conf_qty:0);
                if ($inputs_type == 'ケース') {
                    if($c_quantity<=$stock_info->case_quantity-$conf_qty){
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
                    }
                    
                } else if ($inputs_type == 'ボール') {
                    if($c_quantity<=$stock_info->ball_quantity-$conf_qty){ 
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
                    }
                } else {
                    if($c_quantity<=$stock_info->unit_quantity-$conf_qty){
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
                    }
                }
            }

            //$customer_order_array[]=$customer_order_demo;
        }
        // return $customer_order_array;
        //customer_order::insert($customer_order_array);
        //customer_order_detail::insert($customer_order_detail_array);
        Session::flash('message', '受注データの取り込みが完了しました'); 
        Session::flash('class_name', 'alert-success'); 
        return response()->json(['message' => '受注データの取り込みが完了しました','success'=>1]);
    }
    
    public function ShipmentCsvInsert_brand(Request $request){
        $file = $request->file('file');
        $file_name = time().'_'.$file->getClientOriginalName();
        $this->QR_var->folder_create($this->csv_folder_name);

        $file->storeAs(config('const.CSV_UPLOAD_PATH'), $file_name);
        $baseUrl = storage_path().'/app/'.config('const.CSV_UPLOAD_PATH') . $file_name;
        $dataArr = $this->csvReader($baseUrl);
        $customer_order_array=array();
        $error_item_list=array();
        $error_item_duplicate=array();
       //return $dataArr;
        foreach ($dataArr as $key => $value) {
           
            $customer_id=$this->customer_search($value[3]);
            if($customer_id==null){
                // @unlink($baseUrl);
                // Session::flash('message', '未登録の販売先コードがあります：'.$value[3]); 
                // Session::flash('class_name', 'alert-danger'); 
                $error_item_list[]=array('customer_id'=>$value[8]);
                continue;
                // return response()->json(['message' => '未登録の販売先コードがあります：'.$value[3],'success'=>0]);
            }
            $customer_shop_id=$this->customer_shop_search($value[2],$customer_id,$value[1]);
            if($customer_shop_id==null){
                // @unlink($baseUrl);
                // Session::flash('message', 'shop code do not match：[shop code]'); 
                // Session::flash('class_name', 'alert-danger'); 
                // return response()->json(['message' => 'shop code do not match：'.$value[2],'success'=>0]);
                $error_item_list[]=array('customer_shop_id'=>$value[8]);
                continue;
            }
             $jan_code=$value[8];
            $customer_item_id=$this->customer_item_search($jan_code,$customer_id);
            if($customer_item_id==null){
                // @unlink($baseUrl);
                // Session::flash('message', 'jan code not exist：[jan code]'); 
                // Session::flash('class_name', 'alert-danger'); 
                // return response()->json(['message' => 'jan code not exist：'.$jan_code,'success'=>0]);
                $error_item_list[]=array('customer_item_id'=>$value[8]);
                continue;
            }
            $shipment_number=$value[3].'_'.date('Y-m-d',strtotime($value[5])).'_'.$value[4];
            
            $this->QR_var->folder_create('/app/public/shipment_numbers');
            $this->QR_var->qr_code_gen($shipment_number,'/app/public/shipment_numbers');
            $inputs_type = $value[9];
            if($inputs_type!='ケース' || $inputs_type!='ボール' || $inputs_type!='バラ'){
                $inputs_type ='ケース';
            }
            $is_exist_customer_order = customer_order::join('customer_order_details','customer_order_details.customer_order_id','=','customer_orders.customer_order_id')->where(['customer_id'=>$customer_id,'customer_shop_id'=>$customer_shop_id,'customer_item_id'=>$customer_item_id,'status'=>'未出荷'])->orWhere('status','確定済み')->first();
            if($is_exist_customer_order){
                $error_item_duplicate[]=array('customer_item_id'=>$value[8]);
            }
            $customer_order_demo['customer_id']=$customer_id;
            $customer_order_demo['customer_shop_id']=$customer_shop_id;
            $customer_order_demo['shipment_number']=$shipment_number;
            $customer_order_demo['category']='edi';
            $customer_order_demo['voucher_number']=$value[4];
            $customer_order_demo['order_date']= date('Y-m-d H:i:s',strtotime($value[5]));
            $customer_order_demo['shipment_date']= date('Y-m-d');
            $customer_order_demo['delivery_date']= date('Y-m-d H:i:s',strtotime($value[6]));

            $customer_order_demo_detail['customer_item_id']=$customer_item_id;
            $customer_order_demo_detail['jan']=$jan_code;
            $customer_order_demo_detail['inputs']=$inputs_type;
            $customer_order_demo_detail['quantity']=$value[10];
            $customer_order_demo_detail['cost_price']=$value[11];
            $customer_order_demo_detail['selling_price']=$value[12];
            $customer_order_id = customer_order::insertGetId($customer_order_demo);
            $customer_order_demo_detail['customer_order_id']=$customer_order_id;
            $customer_order_detail_id = customer_order_detail::insertGetId($customer_order_demo_detail);
            $stock_info = $this->get_stock_info($jan_code);
            
            $c_quantity = $value[10];
            $shiptment['customer_id']=$customer_id;
            $shiptment['customer_order_id']=$customer_order_id;
            $shiptment['customer_order_detail_id']=$customer_order_detail_id;
            $shiptment['shipment_date']=date('Y-m-d H:i:s',strtotime($value[6]));
            $shiptment['inputs']=$inputs_type;
            $shiptment['confirm_quantity']=$c_quantity;
            
            
            
            if($stock_info){
                $shiptment['rack_number']=$stock_info->rack_number;
                $conf_qty = $stock_info->conf_qty;
                $conf_qty = ($conf_qty!=''?$conf_qty:0);
                if ($inputs_type == 'ケース') {
                    if($c_quantity<=$stock_info->case_quantity-$conf_qty){
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
                    }
                    
                } else if ($inputs_type == 'ボール') {
                    if($c_quantity<=$stock_info->ball_quantity-$conf_qty){ 
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
                    }
                } else {
                    if($c_quantity<=$stock_info->unit_quantity-$conf_qty){
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
                    }
                }
            }

            //$customer_order_array[]=$customer_order_demo;
        }
        // return $customer_order_array;
        //customer_order::insert($customer_order_array);
        //customer_order_detail::insert($customer_order_detail_array);
        if(count($error_item_duplicate)==0){
        Session::flash('message', '受注データの取り込みが完了しました'); 
        Session::flash('class_name', 'alert-success'); 
        return response()->json(['message' => '受注データの取り込みが完了しました','success'=>1]);
    }else{
        Session::flash('message', '同じデータを2回入力することはできません'); 
        Session::flash('class_name', 'alert-success'); 
        return response()->json(['message' => '同じデータを2回入力することはできません','success'=>0]);
    }

    }


    public function customer_manul_order_insert_by_jan_code(Request $request){
        $customer_id = $request->customer_id;
        $jan_code = $request->jan;
        $orders = $request->manual_order;
        $items_info = customer_item::where('jan',$jan_code)->where('customer_id',$customer_id)->first();
        $vendoritems_info = vendor_item::where('jan',$jan_code)->first();
        foreach($orders as $value){
            /*insert ordr info*/
            $inputs_type = $value['input_type'];
            $c_quantity = $value['quantity'];
            $customer_order_demo['customer_id']=$customer_id;
            $customer_order_demo['customer_shop_id']=$value['shop_id'];
            $customer_order_demo['shipment_number']=rand();
            $customer_order_demo['category']='manual';
            $customer_order_demo['voucher_number']=rand();
            $customer_order_demo['order_date']= date('Y-m-d H:i:s');
            $customer_order_demo['shipment_date']= date('Y-m-d');
            $customer_order_demo['delivery_date']= date('Y-m-d H:i:s');

            $customer_order_demo_detail['customer_item_id']=$items_info->customer_item_id;
            $customer_order_demo_detail['jan']=$jan_code;
            $customer_order_demo_detail['inputs']=$inputs_type;
            $customer_order_demo_detail['quantity']=$c_quantity;
            $customer_order_demo_detail['cost_price']=$vendoritems_info->cost_price;
            $customer_order_demo_detail['selling_price']=$vendoritems_info->selling_price;
            $customer_order_id = customer_order::insertGetId($customer_order_demo);
            $customer_order_demo_detail['customer_order_id']=$customer_order_id;
            $customer_order_detail_id = customer_order_detail::insertGetId($customer_order_demo_detail);
            $stock_info = $this->get_stock_info($jan_code);
            
            $shiptment['customer_id']=$customer_id;
            $shiptment['customer_order_id']=$customer_order_id;
            $shiptment['customer_order_detail_id']=$customer_order_detail_id;
            $shiptment['shipment_date']=date('Y-m-d H:i:s');
            $shiptment['inputs']=$inputs_type;
            $shiptment['confirm_quantity']=$c_quantity;
            
            
            
            if($stock_info){
                $shiptment['rack_number']=$stock_info->rack_number;
                $conf_qty = $stock_info->conf_qty;
                $conf_qty = ($conf_qty!=''?$conf_qty:0);
                $stock_c = $stock_info->case_quantity-$conf_qty;
                $stock_b = $stock_info->ball_quantity-$conf_qty;
                $stock_u = $stock_info->unit_quantity-$conf_qty;
                if ($inputs_type == 'ケース') {
                    if($stock_c>0){
                        if($c_quantity>$stock_c){
                            $shiptment['confirm_quantity']=$stock_c;
                        }
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
                    }
                    
                } else if ($inputs_type == 'ボール') {
                    if($stock_b>0){
                        if($c_quantity>$stock_b){
                            $shiptment['confirm_quantity']=$stock_b;
                        }
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
                    }
                } else {
                    if($stock_u>0){
                        if($c_quantity>$stock_u){
                            $shiptment['confirm_quantity']=$stock_u;
                        }
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
                    }
                }
            }
            /*insert ordr info*/
        }
        return response()->json(['message' => 'manual order has been inserted','success'=>1]);
    }
    /**
     * Csv file reader
     * @param  url string of a file
     * @return array
     */
    public function csvReader($baseUrl)
    {
        $data = array_map('str_getcsv', file($baseUrl));
        $csv_data = array_slice($data, 1);
        $rowData = $this->convert_from_sjis_to_utf8_recursively($csv_data);
        \Log::debug('----- CSV file read completed from this url: (' . $baseUrl . ')-----');
        return $rowData;
    }

    /**
     * File encoding from SJIJ to utf8
     * @param  SJIJ String or array
     * @return utf-8 encoded string
     */
    public static function convert_from_sjis_to_utf8_recursively($dat)
    {
        if (is_string($dat)) {
            \Log::debug('----- SJIJ to UTF-8 conversion completed -----');
            return mb_convert_encoding($dat, "UTF-8", "sjis-win");
        } elseif (is_array($dat)) {
            $ret = [];
            foreach ($dat as $i => $d) {
                $ret[$i] = self::convert_from_sjis_to_utf8_recursively($d);
            }

            return $ret;
        } elseif (is_object($dat)) {
            foreach ($dat as $i => $d) {
                $dat->$i = self::convert_from_sjis_to_utf8_recursively($d);
            }

            return $dat;
        } else {
            return $dat;
        }
    }

    private function customer_search($partner_code){
        $customer_info = customer::where('partner_code',$partner_code)->first();
        return $customer_info['customer_id'];
    }
    public function customer_item_search($jan_code,$customer_id){
        $customer_item_info = customer_item::where('customer_id',$customer_id)->where('jan',$jan_code)->first();
        return $customer_item_info['customer_item_id'];
    }
    public function customer_shop_search($shop_code,$customer_id,$shop_name){
        $customer_info = customer_shop::where(['shop_no'=>$shop_code,'customer_id'=>$customer_id])->first();
        return $customer_info['customer_shop_id'];
        if($customer_info){
            return $customer_info['customer_shop_id'];
        }else{
            $customer_shop_id = customer_shop::insertGetId(['shop_no'=>$shop_code,'customer_id'=>$customer_id,'shop_name'=>$shop_name]);
            return $customer_shop_id;
        }
       
    }
    
    
}
