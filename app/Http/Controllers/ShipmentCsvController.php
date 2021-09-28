<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\QRGenController;
use Rap2hpoutre\FastExcel\FastExcel;
use App\customer;
use App\jan;
use App\maker;
use App\customer_order;
use App\customer_shop;
use App\customer_order_detail;
use App\customer_shipment;

use App\customer_item;
use App\vendor_item;
use App\User;
use Session;
use Auth;

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
             $janInfo = jan::where('jan',$jan_code)->first();
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
            if($inputs_type=='ケース'){
                $order_case_quantity = $value[10];
                $order_ball_quantity = 0;
                $order_unit_quantity = 0;
            }else if($inputs_type=='ボール'){
                $order_case_quantity = 0;
                $order_ball_quantity = $value[10];
                $order_unit_quantity = 0;
            }else{
                $order_case_quantity = 0;
                $order_ball_quantity = 0;
                $order_unit_quantity = $value[10];
            }
            $c_quantity = $order_unit_quantity+($order_ball_quantity*$janInfo->ball_inputs)+($order_case_quantity*$janInfo->case_inputs);
            $customer_order_demo_detail['quantity']=$c_quantity;
            $customer_order_demo_detail['cost_price']=$value[11];
            $customer_order_demo_detail['selling_price']=$value[12];
            $customer_order_demo_detail['order_case_quantity']=$order_case_quantity;
            $customer_order_demo_detail['order_ball_quantity']=$order_ball_quantity;
            $customer_order_demo_detail['order_unit_quantity']=$order_unit_quantity;
            $customer_order_id = customer_order::insertGetId($customer_order_demo);
            $customer_order_demo_detail['customer_order_id']=$customer_order_id;
            $customer_order_detail_id = customer_order_detail::insertGetId($customer_order_demo_detail);
            $stock_info = $this->get_stock_info($jan_code);
            
           
            $shiptment['customer_id']=$customer_id;
            $shiptment['customer_order_id']=$customer_order_id;
            $shiptment['customer_order_detail_id']=$customer_order_detail_id;
            $shiptment['shipment_date']=date('Y-m-d H:i:s',strtotime($value[6]));
            $shiptment['inputs']=$inputs_type;
            $shiptment['confirm_case_quantity']=$order_case_quantity;
            $shiptment['confirm_ball_quantity']=$order_ball_quantity;
            $shiptment['confirm_unit_quantity']=$order_unit_quantity;
            $shiptment['confirm_quantity']=$c_quantity;
            
            
            if($stock_info){
                $shiptment['rack_number']=$stock_info->rack_number;
                if($stock_info->case_quantity>=$order_case_quantity && $stock_info->ball_quantity>=$order_ball_quantity && $stock_info->unit_quantity>=$order_unit_quantity){
                    customer_shipment::insert($shiptment);
                    customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
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
    
    public function ShipmentCsvInsert_brand_backup_for_old(Request $request){
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
            $is_exist_customer_order = customer_order::join('customer_order_details','customer_order_details.customer_order_id','=','customer_orders.customer_order_id')->where(['customer_orders.customer_id'=>$customer_id,'customer_orders.customer_shop_id'=>$customer_shop_id,'customer_order_details.customer_item_id'=>$customer_item_id,'status'=>'未出荷'])->orWhere('status','確定済み')->first();
            if($is_exist_customer_order){
                $error_item_duplicate[]=array('customer_item_id'=>$value[8]);
                continue;
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
/*required function list*/
    public function customer_findOrInsert($cus_name,$cus_code){
        $customer_info = customer::where('name',$cus_name)->where('partner_code',$cus_code)->first();
        if($customer_info){
            return $customer_info['customer_id'];
        }else{
            $customer_id = customer::insertGetId(['name'=>$cus_name,'partner_code'=>$cus_code,'phone'=>'1234567']);
            return $customer_id;
        }
    }
    public function vendor_item_findOrInsert($customer_id,$jan_code,$jan_name,$maker_name,$cost_price,$selling_price){
        $customer_item_info = vendor_item::where('jan',$jan_code)->first();
        if($customer_item_info){
            return $customer_item_info['customer_item_id'];
        }else{
            $janLenght = strlen($jan_code);
            if($janLenght=='8'){
                $maker_code = substr($jan_code, 0, 5);
            }else{
                $maker_code = substr($jan_code, 2, 5);
            }
            
            $vendor_id = User::find(Auth::user()->id)->vendor->vendor_id;
            if (maker::where('maker_code', $maker_code)->first()) {
                $api_data = maker::where('maker_code', $maker_code)->first();
                $vendor_id = $api_data->vendor_id;
                $maker_id = $api_data->maker_id;
            } else {
                $maker_id = maker::insertGetId(['maker_code' => $maker_code, 'vendor_id' => $vendor_id, 'maker_name' => $maker_name]);
            }
            if (!jan::where('jan', $jan_code)->first()) {
                jan::insert([
                        "jan" => $jan_code,
                        "name" => $jan_name,
                        "jan_start_date" => date('Y-m-d H:i:s'),
                        "jan_end_date" => date('Y-m-d H:i:s'),
                        "case_inputs"=>"12",
                        "ball_inputs"=>"6",
                ]);
            }
            
            $profit = $selling_price - $cost_price;
            $profit_margin = (100*$profit)/$selling_price;
            $profit_margin = round($profit_margin);
            if (!vendor_item::where('jan', $jan_code)->first()) {
            $vendor_item_id = vendor_item::insertGetId([
                'vendor_id'=>$vendor_id,
                'maker_id'=>$maker_id,
                'jan'=>$jan_code,
                'cost_price'=>$cost_price,
                'selling_price'=>$selling_price,
                'sale_selling_price'=>$selling_price,
                'gross_profit'=>$profit,
                'gross_profit_margin'=>$profit_margin,
                'start_date'=>date('Y-m-d'),
                'end_date'=>date('Y-m-d')
            ]);
            return $vendor_item_id;
            }
            $csarray = array(
            'c_name' => $customer_id,
            'v_name' => $vendor_id,
            'j_code' => $jan_code,
            'cost_price' => $selling_price
            );
           // return $insertTocus = $this->insertIntocustomeritem($csarray);

            // $customer_item_info = customer_item::where('customer_id',$customer_id)->where('jan',$jan_code)->first();
            // if($customer_item_info){
            //     return $customer_item_info['customer_item_id'];
            // }else{
            //     return 999999;
            // }
        }
        
    }
    public function customer_item_findOrInsert($customer_id,$jan_code,$jan_name,$maker_name,$cost_price,$selling_price){
        $customer_item_info = customer_item::where('customer_id',$customer_id)->where('jan',$jan_code)->first();
        if($customer_item_info){
            return $customer_item_info['customer_item_id'];
        }else{
            $janLenght = strlen($jan_code);
            if($janLenght=='8'){
                $maker_code = substr($jan_code, 0, 5);
            }else{
                $maker_code = substr($jan_code, 2, 5);
            }
            $vendor_id = 0;
            if (maker::where('maker_code', $maker_code)->first()) {
                $api_data = maker::where('maker_code', $maker_code)->first();
                $vendor_id = $api_data->vendor_id;
                $maker_id = $api_data->maker_id;
            } else {
                $maker_id = maker::insertGetId(['maker_code' => $maker_code, 'vendor_id' => $vendor_id, 'maker_name' => $maker_name]);
            }
            if (!jan::where('jan', $jan_code)->first()) {
                jan::insert([
                        "jan" => $jan_code,
                        "name" => $jan_name,
                        "jan_start_date" => date('Y-m-d H:i:s'),
                        "jan_end_date" => date('Y-m-d H:i:s'),
                        "case_inputs"=>"12",
                        "ball_inputs"=>"6",
                ]);
            }
            
            $profit = $selling_price - $cost_price;
            $profit_margin = ($cost_price*$profit)/100;
            $profit_margin = round($profit_margin);
            if (!vendor_item::where('jan', $jan_code)->first()) {
            $vendor_item_id = vendor_item::insertGetId([
                'vendor_id'=>$vendor_id,
                'maker_id'=>$maker_id,
                'jan'=>$jan_code,
                'cost_price'=>$cost_price,
                'selling_price'=>$selling_price,
                'sale_selling_price'=>$selling_price,
                'gross_profit'=>$profit,
                'gross_profit_margin'=>$profit_margin,
                'start_date'=>date('Y-m-d'),
                'end_date'=>date('Y-m-d')
            ]);
            }
            $csarray = array(
            'c_name' => $customer_id,
            'v_name' => $vendor_id,
            'j_code' => $jan_code,
            'cost_price' => $selling_price
            );
            return $insertTocus = $this->insertIntocustomeritem($csarray);

            // $customer_item_info = customer_item::where('customer_id',$customer_id)->where('jan',$jan_code)->first();
            // if($customer_item_info){
            //     return $customer_item_info['customer_item_id'];
            // }else{
            //     return 999999;
            // }
        }
        
    }
    public function insertIntocustomeritem($data){
        $gross_profit_margin = ($data['cost_price'] > 0 ? 30 : 0);
        $selling_price = $data['cost_price'] + (($data['cost_price'] * $gross_profit_margin) / 100);
        $selling_price = round($selling_price, 2);
        $gross_profit = $selling_price - $data['cost_price'];

        $customer_data_ins_array = array(
            'customer_id' => $data['c_name'],
            'vendor_id' => $data['v_name'],
            'jan' => $data['j_code'],
            'sale_selling_price' => 0,
            'cost_price' => $data['cost_price'],
            'selling_price' => $selling_price,
            'gross_profit' => $gross_profit,
            'gross_profit_margin' => $gross_profit_margin,
            "start_date" => '2019-01-01',
            "end_date" => '2021-12-31',
        );
        if (customer_item::where('jan', $data['j_code'])->where('customer_id',$data['c_name'])->first()) {
             $customer_item_info = customer_item::where('jan', $data['j_code'])->where('customer_id',$data['c_name'])->first();
            return $customer_item_info->customer_item_id;
        } else {
            $customer_item_id = customer_item::insertGetId($customer_data_ins_array);
            return $customer_item_id;
        }
    }
/*required function list*/
    public function ShipmentCsvInsert_brand(Request $request){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        ini_set('max_input_time', 360);
        set_time_limit(0);
        $file = $request->file('file');
        $file_type = $request->file_type;
        $file_name = time().'_'.$file->getClientOriginalName();
        $this->QR_var->folder_create($this->csv_folder_name);

        $file->storeAs(config('const.CSV_UPLOAD_PATH'), $file_name);
        $baseUrl = storage_path().'/app/'.config('const.CSV_UPLOAD_PATH') . $file_name;
        $dataArr = array();
        if($file_type=='xlsx'){
        /*xlsx reader*/
        $sheets = (new FastExcel)->importSheets($baseUrl);
        foreach($sheets as $shett){
           foreach($shett as $value){
                $dataArr[]=array($value['スーパー'],$value['スーパーコード'],$value['店舗名'],$value['店舗コード'],$value['JAN'],$value['メーカー名'],$value['商品名'],$value['受注数量'],$value['納品日'],$value['原価'],$value['売価']);
           }
        }
    }else{
        $dataArr = $this->csvReader_new($baseUrl);
    }
    
        $customer_order_array=array();
        $error_item_list=array();
        $error_item_duplicate=array();
        $chunckedArray=array_chunk($dataArr,50);
        
        foreach ($chunckedArray as $chnkdata) {
        foreach ($chnkdata as $key => $value) {
            $cus_name = $value[0];
            $cus_code = $value[1];
            $shp_name = $value[2];
            $shp_code = $value[3];
            $jan_code = $value[4];
            $maker_name = $value[5];
            $jan_name = $value[6];
            $quantity = (int)$value[7];
            $order_date = date('Y-m-d',strtotime($value[8]));
            $cost_price = (int)$value[9];
            $selling_price = (int)$value[10];
           // $customer_id=$this->customer_search_byname($cus_name);

            $customer_id=$this->customer_findOrInsert($cus_name,$cus_code);
            if($customer_id==null){
                // @unlink($baseUrl);
                // Session::flash('message', '未登録の販売先コードがあります：'.$value[3]); 
                // Session::flash('class_name', 'alert-danger'); 
                $error_item_list[]=array('customer_id'=>$value[0]);
                continue;
                // return response()->json(['message' => '未登録の販売先コードがあります：'.$value[3],'success'=>0]);
            }
            $customer_shop_id=1;//$this->customer_shop_search_byname($customer_id,$shp_name,$shp_code);
            if($customer_shop_id==null){
                // @unlink($baseUrl);
                // Session::flash('message', 'shop code do not match：[shop code]'); 
                // Session::flash('class_name', 'alert-danger'); 
                // return response()->json(['message' => 'shop code do not match：'.$value[2],'success'=>0]);
                $error_item_list[]=array('customer_shop_id'=>$value[1]);
                continue;
            }
            //$customer_item_id=$this->customer_item_search($jan_code,$customer_id);
            
          //$customer_item_id=$this->customer_item_findOrInsert($customer_id,$jan_code,$jan_name,$maker_name,$cost_price,$selling_price);
           $customer_item_id=$this->vendor_item_findOrInsert($customer_id,$jan_code,$jan_name,$maker_name,$cost_price,$selling_price);
           
           if($customer_item_id==null){
                // @unlink($baseUrl);
                // Session::flash('message', 'jan code not exist：[jan code]'); 
                // Session::flash('class_name', 'alert-danger'); 
                // return response()->json(['message' => 'jan code not exist：'.$jan_code,'success'=>0]);
                $error_item_list[]=array('customer_item_id'=>$value[2]);
                continue;
            }
            $shipment_number=date('Y-m-d',strtotime($order_date));
            
            $this->QR_var->folder_create('/app/public/shipment_numbers');
            $this->QR_var->qr_code_gen($shipment_number,'/app/public/shipment_numbers');
            $inputs_type = 'バラ';//$value[9];
            if($inputs_type!='ケース' || $inputs_type!='ボール' || $inputs_type!='バラ'){
                $inputs_type ='バラ';
            }
            $stock_info = $this->get_stock_info($jan_code);
           
            $is_exist_customer_order = customer_order_detail::join('customer_orders','customer_order_details.customer_order_id','=','customer_orders.customer_order_id')->where('customer_orders.customer_id',$customer_id)->where('customer_orders.customer_shop_id',$customer_shop_id)->where('customer_order_details.customer_item_id',$customer_item_id)->first();
            $error_item_list[]=$is_exist_customer_order;
            //->where('customer_orders.status','未出荷')->orWhere('customer_orders.status','確定済み')
            if(isset($is_exist_customer_order) && ($is_exist_customer_order->status=='未出荷' || $is_exist_customer_order->status=='確定済み')){
                //$error_item_duplicate[]=array('customer_item_id'=>$value[2]);
                $exitQty = $is_exist_customer_order->quantity;
                $newQty= (int)$is_exist_customer_order->quantity+$quantity;
                $newfrquency =$is_exist_customer_order->order_frequency_num+1; 
                customer_order::where('customer_order_id',$is_exist_customer_order->customer_order_id)->update(['order_frequency_num'=>$newfrquency]);
                customer_order_detail::where('customer_order_id',$is_exist_customer_order->customer_order_id)->update(['quantity'=>$newQty,'last_qty'=>$quantity]);
                if(customer_shipment::where('customer_order_id',$is_exist_customer_order->customer_order_id)->first()){
                    if($stock_info){
                        if($stock_info->unit_quantity>=$newQty){
                            customer_shipment::where('customer_order_id',$is_exist_customer_order->customer_order_id)->update(['confirm_quantity'=>$newQty,'confirm_unit_quantity'=>$newQty]);
                        }
                    }
                }else{
                    if($stock_info){
                        if($stock_info->unit_quantity>=$newQty){
                            customer_shipment::insert([
                                'rack_number'=>$stock_info->rack_number,
                                'customer_id'=>$customer_id,
                                'shipment_date'=>date('Y-m-d H:i:s'),
                                'inputs'=>$inputs_type,
                                'confirm_quantity'=>$newQty,
                                'confirm_case_quantity'=>0,
                                'confirm_ball_quantity'=>0,
                                'confirm_unit_quantity'=>$newQty,
                                'customer_order_detail_id'=>$is_exist_customer_order->customer_order_id,
                                'customer_order_id'=>$is_exist_customer_order->customer_order_id
                            ]);
                            customer_order::where('customer_order_id',$is_exist_customer_order->customer_order_id)->update(['status'=>'確定済み']);
                        }
                        
                    }
                }
                continue;
            }
            $customer_order_demo['customer_id']=$customer_id;
            $customer_order_demo['customer_shop_id']=$customer_shop_id;
            $customer_order_demo['shipment_number']=$shipment_number;
            $customer_order_demo['category']='edi';
            $customer_order_demo['order_frequency_num']=1;
            $customer_order_demo['voucher_number']=date('YmdHis',strtotime($order_date));//$value[4];
            $customer_order_demo['order_date']= date('Y-m-d H:i:s',strtotime($order_date));
            $customer_order_demo['shipment_date']= date('Y-m-d');
            $customer_order_demo['delivery_date']= date('Y-m-d H:i:s',strtotime($order_date));

            $customer_order_demo_detail['customer_item_id']=$customer_item_id;//now updated as vendor_item
            $customer_order_demo_detail['jan']=$jan_code;
            $customer_order_demo_detail['inputs']=$inputs_type;
            $customer_order_demo_detail['quantity']=$quantity;
            $customer_order_demo_detail['order_case_quantity']=0;
            $customer_order_demo_detail['order_ball_quantity']=0;
            $customer_order_demo_detail['order_unit_quantity']=$quantity;
            $customer_order_demo_detail['last_qty']=$quantity;
            $customer_order_demo_detail['cost_price']=$cost_price;
            $customer_order_demo_detail['selling_price']=$selling_price;
            $customer_order_id = customer_order::insertGetId($customer_order_demo);
            $customer_order_demo_detail['customer_order_id']=$customer_order_id;
            $customer_order_detail_id = customer_order_detail::insertGetId($customer_order_demo_detail);
            
            
            $c_quantity = $quantity;
            $order_case_quantity = 0;
            $order_ball_quantity = 0;
            $order_unit_quantity = $quantity;
            $shiptment['customer_id']=$customer_id;
            $shiptment['customer_order_id']=$customer_order_id;
            $shiptment['customer_order_detail_id']=$customer_order_detail_id;
            $shiptment['shipment_date']=date('Y-m-d H:i:s',strtotime($value[6]));
            $shiptment['inputs']=$inputs_type;
            $shiptment['confirm_quantity']=$c_quantity;
            $shiptment['confirm_case_quantity']=0;
            $shiptment['confirm_ball_quantity']=0;
            $shiptment['confirm_unit_quantity']=$c_quantity;
            
            if($stock_info){
                $shiptment['rack_number']=$stock_info->rack_number;
                if($stock_info->case_quantity>=$order_case_quantity && $stock_info->ball_quantity>=$order_ball_quantity && $stock_info->unit_quantity>=$c_quantity){
                    customer_shipment::insert($shiptment);
                    customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
                }
                
            }

            //$customer_order_array[]=$customer_order_demo;
        }//endforeach
        }//endforeach
        
        // return $customer_order_array;
        //customer_order::insert($customer_order_array);
        //customer_order_detail::insert($customer_order_detail_array);
        if(count($error_item_duplicate)==0){
        Session::flash('message', '受注データの取り込みが完了しました'); 
        Session::flash('class_name', 'alert-success'); 
        return response()->json(['message' => '受注データの取り込みが完了しました','success'=>1,'error_item_list'=>$error_item_list]);
    }else{
        Session::flash('message', '同じデータを2回入力することはできません'); 
        Session::flash('class_name', 'alert-success'); 
        return response()->json(['message' => '同じデータを2回入力することはできません','success'=>0,'error_item_list'=>$error_item_list]);
    }

    }

    public function ShipmentCsvInsert_brandBackup(Request $request){
        $file = $request->file('file');
        $file_name = time().'_'.$file->getClientOriginalName();
        $this->QR_var->folder_create($this->csv_folder_name);

        $file->storeAs(config('const.CSV_UPLOAD_PATH'), $file_name);
        $baseUrl = storage_path().'/app/'.config('const.CSV_UPLOAD_PATH') . $file_name;
        $dataArr = $this->csvReader($baseUrl);
        $customer_order_array=array();
        $error_item_list=array();
        $error_item_duplicate=array();
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
            $is_exist_customer_order = customer_order::join('customer_order_details','customer_order_details.customer_order_id','=','customer_orders.customer_order_id')->where(['customer_orders.customer_id'=>$customer_id,'customer_orders.customer_shop_id'=>$customer_shop_id,'customer_order_details.customer_item_id'=>$customer_item_id,'status'=>'未出荷'])->orWhere('status','確定済み')->first();
            if($is_exist_customer_order){
                $error_item_duplicate[]=array('customer_item_id'=>$value[8]);
                continue;
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
        $newcaseballOrder = array();
        $caseballarr = array(
            'case_order'=>0,
            'ball_order'=>0,
            'unit_order'=>0
        );
        foreach($orders as $vl){
            if ($vl['input_type'] == 'ケース') {
                $caseballarr['case_order']=$vl['quantity'];
            }else if($vl['input_type'] == 'ボール'){
                $caseballarr['ball_order']=$vl['quantity'];
            }else{
                $caseballarr['unit_order']=$vl['quantity'];
            }
            $newcaseballOrder[$vl['shop_id']]=$caseballarr;
        }
        $items_info = customer_item::where('jan',$jan_code)->where('customer_id',$customer_id)->first();
        $vendoritems_info = vendor_item::where('jan',$jan_code)->first();
        $janInfo = jan::where('jan',$jan_code)->first();

        foreach($newcaseballOrder as $k=>$v){
            $inputs_type = 'ケース';
            $case_order_quantity=$v['case_order'];
            $ball_order_quantity=$v['ball_order'];
            $unit_order_quantity=$v['unit_order'];
            $total_quantity = $v['unit_order']+($ball_order_quantity*$janInfo->ball_inputs)+($case_order_quantity*$janInfo->case_inputs);
            $c_quantity = $total_quantity;
            $customer_order_demo['customer_id']=$customer_id;
            $customer_order_demo['customer_shop_id']=$k;
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
            $customer_order_demo_detail['order_case_quantity']=$case_order_quantity;
            $customer_order_demo_detail['order_ball_quantity']=$ball_order_quantity;
            $customer_order_demo_detail['order_unit_quantity']=$unit_order_quantity;
            $customer_order_demo_detail['cost_price']=$items_info->cost_price;
            $customer_order_demo_detail['selling_price']=$items_info->selling_price;
            $customer_order_id = customer_order::insertGetId($customer_order_demo);
            $customer_order_demo_detail['customer_order_id']=$customer_order_id;
            $customer_order_detail_id = customer_order_detail::insertGetId($customer_order_demo_detail);
            $stock_info = $this->get_stock_info($jan_code);
            
            $shiptment['customer_id']=$customer_id;
            $shiptment['customer_order_id']=$customer_order_id;
            $shiptment['customer_order_detail_id']=$customer_order_detail_id;
            $shiptment['shipment_date']=date('Y-m-d H:i:s');
            $shiptment['inputs']=$inputs_type;
            $shiptment['confirm_case_quantity']=$case_order_quantity;
            $shiptment['confirm_ball_quantity']=$ball_order_quantity;
            $shiptment['confirm_unit_quantity']=$unit_order_quantity;
            $shiptment['confirm_quantity']=$c_quantity;
            
            
            
            if($stock_info){
                $shiptment['rack_number']=$stock_info->rack_number;
                if($stock_info->case_quantity>=$case_order_quantity && $stock_info->ball_quantity>=$ball_order_quantity && $stock_info->unit_quantity>=$unit_order_quantity){
                    customer_shipment::insert($shiptment);
                    customer_order::where('customer_order_id',$customer_order_id)->update(['status'=>'確定済み']);
                }
                
            }
        }
/*
        foreach($orders as $value){
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
        }
        */
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
        return $rowData;
    }
    public function csvReader_new($baseUrl)
    {
        $data = array_map('str_getcsv', file($baseUrl));
       return $csv_data = array_slice($data, 1);
        // print_r($csv_data);
        // $rowData = $this->convert_from_sjis_to_utf8_recursively($csv_data);
        // print_r($rowData);exit;
        // return $rowData;
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

    private function customer_search_byname($name){
        $customer_info = customer::where('name',$name)->first();
        return $customer_info['customer_id'];
    }
    public function customer_shop_search_byname($customer_id,$shop_name,$shop_code){
        $customer_info = customer_shop::where(['shop_name'=>$shop_name,'shop_no'=>$shop_code,'customer_id'=>$customer_id])->first();
      
        if($customer_info){
            return $customer_info['customer_shop_id'];
        }else{
            $customer_shop_id = customer_shop::insertGetId(['shop_no'=>$shop_code,'customer_id'=>$customer_id,'shop_name'=>$shop_name,'phone'=>'1234567']);
            return $customer_shop_id;
        }
       
    }
    public function customer_item_search($jan_code,$customer_id){
        $customer_item_info = customer_item::where('customer_id',$customer_id)->where('jan',$jan_code)->first();
        return $customer_item_info['customer_item_id'];
    }
    
    
    
}
