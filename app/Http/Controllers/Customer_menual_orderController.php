<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\customer;
use App\customer_item;
use App\customer_order;
use App\customer_shipment;
use App\customer_shop;
use App\vendor_item;
use App\jan;
use App\customer_order_detail;
use Session;
use App\Http\Controllers\ShipmentCsvController;
use App\Http\Controllers\QRGenController;
use DB;
class Customer_menual_orderController extends Controller
{
    private $item_srch;
    private $QR_var;
    public function __construct()
    {
        $this->item_srch=new ShipmentCsvController();
        $this->QR_var=new QRGenController();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $title = "Menual Order";
        $active = 'manualOrder';
        $customer_list = customer::get();
        return view('backend.customer_menual_order.menual_order', compact('title', 'active','customer_list'));
    }
    public function onlineorder()
    {
        $title = "Oline Order";
        $active = 'onlinerder';
        $customer_list = customer::get();
        return view('backend.customer_menual_order.online_order', compact('title', 'active','customer_list'));
    }
     /**
     * Show the form for creating a new resource.
     *
     * @return jn info by jan id
     */
    public function get_jn_info_by_jn_code(Request $request)
    {
        $jn_info = [];
        $jn= $request->jn;
        $customer_id= $request->customer_id;
        $jn_info = collect(\DB::select("SELECT jans.name,stock_items.case_quantity,stock_items.ball_quantity,stock_items.unit_quantity,customer_items.jan FROM `customer_items` join jans on jans.jan=customer_items.jan join vendor_items on vendor_items.jan = customer_items.jan left JOIN stock_items on stock_items.vendor_item_id = vendor_items.vendor_item_id WHERE customer_items.jan='".$jn."' and customer_items.customer_id='".$customer_id."'"))->first();

        $result = response()->json(['jn_info' => $jn_info]);
        return $result;
    }
    public function get_jn_info_by_jn_code_list(Request $request)
    {
        $jn_info = [];
        $customer_id= $request->customer_id;
        $jn_info = collect(\DB::select("SELECT jans.name,stock_items.case_quantity,stock_items.ball_quantity,stock_items.unit_quantity,customer_items.jan FROM `customer_items` join jans on jans.jan=customer_items.jan join vendor_items on vendor_items.jan = customer_items.jan left JOIN stock_items on stock_items.vendor_item_id = vendor_items.vendor_item_id WHERE customer_items.customer_id='".$customer_id."' group by customer_items.jan"));

        $result = response()->json(['jn_info' => $jn_info]);
        return $result;
    }
     /**
     * Show the form for creating a new resource.
     *
     * @return add menual order
     */
    public function add_menual_order_insert(Request $request)
    {
        $customer_id= $request->customer_id;
        $shop_id= $request->shop_id;
        $voucher_m_number= $request->voucher_m_number;
        $delivery_date = $request->delivery_date;
        $order_type = $request->order_type;
        $m_o_arr= $request->m_o_arr;

        $customer_order_array=array();
        $customer_shipment_array=array();
        $curdate = date('Y-m-d');
        $customer_info = customer::where('customer_id',$customer_id)->first();
        $shipment_number=$customer_info->partner_code.'_'.date('Y-m-d',strtotime($curdate)).'_'.$voucher_m_number;
        /*add order*/
        $order_id = customer_order::insertGetId(['customer_id'=>$customer_id,'order_type'=>$order_type,
            'customer_shop_id'=>$shop_id,'shipment_number'=> $shipment_number,'voucher_number'=>$voucher_m_number,
            'order_date'=> date('Y-m-d H:i:s'),'shipment_date'=> date('Y-m-d'),
            'delivery_date'=> date('Y-m-d H:i:s',strtotime($delivery_date))]);

        /*add order*/
        $total_cost_price = 0;
        $total_selling_price = 0;
        foreach($m_o_arr as $value){
            $customer_item_id=$this->item_srch->customer_item_search($value[0],$customer_id);
            $required_info = $this->get_cost_selling_price_customer_patner_code($m_o_arr[0],$customer_id);
            $this->QR_var->folder_create('/app/public/shipment_numbers');
            $this->QR_var->qr_code_gen($shipment_number,'/app/public/shipment_numbers');
            $customer_order_demo['customer_item_id']=$customer_item_id;
            $customer_order_demo['jan']=$value[0];
            $customer_order_demo['inputs']=$value[1];
            $customer_order_demo['quantity']=$value[2];
            $customer_order_demo['cost_price']=$required_info['cost_price'];
            $customer_order_demo['selling_price']=$required_info['selling_price'];
            $jans_code = $value[0];
           customer_order_detail::insert(['customer_item_id'=>$customer_item_id,'customer_order_id'=>$order_id,
            'jan'=>$jans_code,'inputs'=>$value[1],'quantity'=>$value[2],
            'cost_price'=>$required_info['cost_price'],
            'selling_price'=>$required_info['selling_price']]);

            $customer_shipment_array['customer_id']=$customer_id;
            $customer_shipment_array['customer_order_id']=$order_id;
            $customer_shipment_array['shipment_date']=date('Y-m-d');
            $customer_shipment_array['inputs']=$value[1];
            $customer_shipment_array['quantity']=$value[2];
            customer_shipment::insert($customer_shipment_array);
            $total_cost_price += $required_info['cost_price'];
            $total_selling_price += $required_info['selling_price'];
        }
        //return $customer_order_array;
        customer_order::where('customer_order_id', '=', $order_id)->update(['cost_price_total'=>$total_cost_price,'selling_price_total'=>$total_selling_price]);
        // Session::flash('message', 'Menual order completed');
        // Session::flash('class_name', 'alert-success');
        return response()->json(['message' => 'Menual order completed']);
    }

    public function get_cost_selling_price_customer_patner_code($jan_code,$customer_id){
        $customer_item_info = customer_item::where('customer_id',$customer_id)->where('jan',$jan_code)->first();
        $vendor_item_info = vendor_item::where('jan',$jan_code)->first();
        $customer_info = customer::where('customer_id',$customer_id)->first();
        $arrays = array(
            'selling_price'=>$customer_item_info['selling_price'],
            'cost_price'=>$vendor_item_info['cost_price'],
            'partner_code'=>$customer_info['partner_code']
        );
        return $arrays;
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return shoplist by customer id
     */
    public function get_shop_list_by_customer_id(Request $request)
    {
        $customer_id = $request->customer_id;
        $shop_list =customer_shop::where('customer_id',$customer_id)->get();
        $result = response()->json(['shop_list' => $shop_list]);
        return $result;
    }
    public function update_csv_order_data(Request $request){
        $row_id = $request->row_id;
        $field_name = $request->field_name;
        $vl = $request->vl;
        customer_order_detail::where('customer_order_detail_id',$row_id)->update(['update_status'=>'1',$field_name=>$vl]);
        return response()->json(['success' => 1]);
    }
    public function get_shop_item_list_by_customer_id(Request $request)
    {
        $customer_id = $request->customer_id;
        $id = $request->customer_id;
        $shop_id = $request->shop_id;
        $voice_text = $request->voice_text;
        $shop_item_list = customer_item::Join('jans', 'jans.jan', '=', 'customer_items.jan');
        if($customer_id!=0){
            $shop_item_list = $shop_item_list->where('customer_items.customer_id',$customer_id);
        }
        if (isset($voice_text)){
            $shop_item_list = $shop_item_list->orderByRaw('jans.name like "%'.$voice_text.'%" desc');
        }
        $shop_item_list =$shop_item_list->groupBy('customer_items.jan')->get();

/*csv order list*/
//$wh = 'ORDER BY all_orders.total_quantity DESC,all_orders.name like "%'.$voice_text.'%" desc,makers.maker_name like "%'.$voice_text.'%" desc';
$wh = 'ORDER BY all_orders.total_quantity DESC,all_orders.name like "%'.$voice_text.'%" desc,makers.maker_name like "%'.$voice_text.'%" desc';
$wh2 = 'ORDER BY jans.name like "%'.$voice_text.'%" DESC';
$orderByMakername = 'ORDER BY all_orders.name like "%'.$voice_text.'%" DESC, makers.maker_name like "%'.$voice_text.'%" DESC,all_orders.order_frequency_num DESC,all_orders.total_quantity DESC';
$online_order = collect(\DB::select("
select all_orders.*,
makers.maker_name
from(
select 
customer_shipments.confirm_quantity,
customer_order_details.cost_price,
customer_order_details.selling_price,
customer_order_details.inputs,
customer_order_details.update_status,
customer_order_details.quantity,
customer_order_details.last_qty,
customer_order_details.jan,
customer_order_details.customer_item_id,
customer_order_details.customer_order_detail_id,
customer_orders.*,stock_items.case_quantity,
 stock_items.ball_quantity, stock_items.unit_quantity,jans.name,
(CASE WHEN customer_order_details.inputs = 'ケース' THEN jans.case_inputs*customer_order_details.quantity WHEN customer_order_details.inputs = 'ボール' THEN jans.ball_inputs*customer_order_details.quantity WHEN customer_order_details.inputs = 'バラ' THEN customer_order_details.quantity END) AS total_quantity,
customer_orders.order_frequency_num*customer_order_details.quantity as total_frequency,
(case WHEN length(customer_order_details.jan)>8 then SUBSTRING(customer_order_details.jan,3,5) when length(customer_order_details.jan)=8 then SUBSTRING(customer_order_details.jan,1,5) end) as mk_code
from customer_orders
 inner join customer_order_details on customer_orders.customer_order_id = customer_order_details.customer_order_id
            inner join jans on jans.jan = customer_order_details.jan
            inner join vendor_items on jans.jan=vendor_items.jan
left join stock_items on vendor_items.vendor_item_id = stock_items.vendor_item_id
left join customer_shipments on customer_shipments.customer_order_detail_id = customer_order_details.customer_order_detail_id
             where customer_orders.customer_id = '".$id."' and customer_orders.customer_shop_id='".$shop_id."' and (customer_orders.status='未出荷' || customer_orders.status='確定済み') and customer_orders.category = 'edi' group by customer_orders.customer_order_id $wh2) as all_orders
             left join makers on makers.maker_code= all_orders.mk_code group by all_orders.customer_order_id $orderByMakername 
            "));
            $order_array =array();
            if($online_order){
                foreach($online_order as $order){
                    $order_array[$order->jan][]=$order;
                }
            }
/*csv order list*/

        $result = response()->json(['shop_item_list' => $online_order,'order_item'=>$shop_item_list]);
        return $result;
    }
    public function get_shop_updated_item_list_by_customer_id(Request $request)
    {
        $customer_id = $request->customer_id;
        $id = $request->customer_id;
        $shop_id = $request->shop_id;
        $voice_text = $request->voice_text;
        $shop_item_list = customer_item::Join('jans', 'jans.jan', '=', 'customer_items.jan');
        if($customer_id!=0){
            $shop_item_list = $shop_item_list->where('customer_items.customer_id',$customer_id);
        }
        if (isset($request->voice_text)){
           // $shop_item_list = $shop_item_list->orderByRaw('jans.name like %'.$request->voice_text.'%');
            $shop_item_list = $shop_item_list->orderByRaw('jans.name like "%'.$request->voice_text.'%" desc');
        }
        $shop_item_list =$shop_item_list->groupBy('customer_items.jan')->limit(3)->get();
        /*csv order list*/
        $wh = 'ORDER BY all_orders.total_quantity DESC,all_orders.name like "%'.$voice_text.'%" desc,makers.maker_name like "%'.$voice_text.'%" desc';
        $wh2 = 'ORDER BY jans.name like "%'.$voice_text.'%" desc';
        $orderByMakername = 'ORDER BY all_orders.name like "%'.$voice_text.'%" desc,makers.maker_name like "%'.$voice_text.'%" DESC,all_orders.order_frequency_num DESC,all_orders.total_quantity DESC';
        $online_order = collect(\DB::select("
        select all_orders.*,
        makers.maker_name
        from(
        select 
        customer_shipments.confirm_quantity,
        customer_order_details.cost_price,
        customer_order_details.selling_price,
        customer_order_details.inputs,
        customer_order_details.update_status,
        customer_order_details.quantity,
        customer_order_details.last_qty,
        customer_order_details.jan,
        customer_order_details.customer_item_id,
        customer_order_details.customer_order_detail_id,
        customer_orders.*,stock_items.case_quantity,
         stock_items.ball_quantity, stock_items.unit_quantity,jans.name,
        (CASE WHEN customer_order_details.inputs = 'ケース' THEN jans.case_inputs*customer_order_details.quantity WHEN customer_order_details.inputs = 'ボール' THEN jans.ball_inputs*customer_order_details.quantity WHEN customer_order_details.inputs = 'バラ' THEN customer_order_details.quantity END) AS total_quantity,
        customer_orders.order_frequency_num*customer_order_details.quantity as total_frequency,
        (case WHEN length(customer_order_details.jan)>8 then SUBSTRING(customer_order_details.jan,3,5) when length(customer_order_details.jan)=8 then SUBSTRING(customer_order_details.jan,1,5) end) as mk_code
        from customer_orders
         inner join customer_order_details on customer_orders.customer_order_id = customer_order_details.customer_order_id
                    inner join jans on jans.jan = customer_order_details.jan
                    inner join vendor_items on jans.jan=vendor_items.jan
        left join stock_items on vendor_items.vendor_item_id = stock_items.vendor_item_id
        left join customer_shipments on customer_shipments.customer_order_detail_id = customer_order_details.customer_order_detail_id
                     where customer_orders.customer_id = '".$id."' and customer_orders.customer_shop_id='".$shop_id."' and (customer_orders.status='未出荷' || customer_orders.status='確定済み') and customer_orders.category = 'edi' and customer_order_details.update_status='1' group by customer_orders.customer_order_id $wh2) as all_orders
                     left join makers on makers.maker_code= all_orders.mk_code group by all_orders.customer_order_id $orderByMakername
                    "));
                    $order_array =array();
                    if($online_order){
                        foreach($online_order as $order){
                            $order_array[$order->jan][]=$order;
                        }
                    }
/*csv order list*/
        $result = response()->json(['shop_item_list' =>$online_order,'order_item'=>$shop_item_list]);
        return $result;
    }
    public function get_customer_janinfo(Request $request)
    {
        $jancode = $request->jancode;
        $customer_id = $request->customer_id;
        $products =collect(\DB::select("select customer_items.*,stock_items.*,jans.name from customer_items left join jans on jans.jan = customer_items.jan left join vendor_items on vendor_items.jan = customer_items.jan left join stock_items on stock_items.vendor_item_id = vendor_items.vendor_item_id where customer_items.jan='".$jancode."' and customer_items.customer_id='".$customer_id."'"))->first();
        $result = response()->json(['products_list' => $products]);
        return $result;
    }

    public function customer_manul_order_insert(Request $request){
        $customer_id = $request->customer_id;
        $customer_item_id = $request->customer_item_id;
        $delivery_qty = $request->delivery_qty;
        $inputs_type = $request->inputs_type;
        $shipment_qty = $request->shipment_qty;
        $shipment_inputs_type = $request->shipment_inputs_type;
        $info = collect(\DB::select("select customer_items.jan,customer_items.selling_price,vendor_items.cost_price from customer_items left join vendor_items on vendor_items.jan  = vendor_items.jan where customer_items.customer_item_id='".$customer_item_id."'"))->first();
        $customer_order = array(
            'customer_id'=>$customer_id,
            'category'=>'manual',
            'status'=>'確定済み',
            'shipment_number'=>rand(),
            'voucher_number'=>rand(),
            'order_date'=>date('Y-m-d H:i:s'),
            'shipment_date'=>date('Y-m-d')
        );
        $customer_order_id = customer_order::insertGetId($customer_order);
        $c_order_details = array(
            'customer_order_id'=>$customer_order_id,
            'customer_item_id'=>$customer_item_id,
            'jan'=>$info->jan,
            'inputs'=>$inputs_type,
            'quantity'=>$delivery_qty,
            'cost_price'=>$info->cost_price,
            'selling_price'=>$info->selling_price
        );
        $customer_order_detail_id = customer_order_detail::insertGetId($c_order_details);
        if($shipment_qty!=0 || $shipment_qty!=''){
            customer_shipment::insert(['customer_id'=>$customer_id,'customer_order_id'=>$customer_order_id,'customer_order_detail_id'=>$customer_order_detail_id,'shipment_date'=>date('Y-m-d'),'inputs'=>$shipment_inputs_type,'confirm_quantity'=>$shipment_qty]);
        }
        $result = response()->json(['message' => 'insert_success']);
        return $result;
    }
    function get_customer_base_manual_order_item(Request $request){
        $shop_list = array();
        $online_order = array();
        $id = $request->c_id;
        $jan = $request->jan;
        $order_category = $request->order_category;
        $wh = '';
        if($jan!=''){
            $wh = ' and customer_order_details.jan='.$jan.'';

        }
        $manual_orderable = 0;
       if($id!=null){
           if($id>0){
            $shop_list =customer_shop::where('customer_id',$id)->orderBy('customer_shop_id', 'asc')->get();

            $online_order = collect(\DB::select("select customer_shipments.confirm_quantity,customer_order_details.*,customer_orders.*,stock_items.case_quantity, stock_items.ball_quantity, stock_items.unit_quantity,jans.name from customer_orders inner join customer_order_details on customer_orders.customer_order_id = customer_order_details.customer_order_id
            inner join jans on jans.jan = customer_order_details.jan
            inner join vendor_items on jans.jan=vendor_items.jan
left join stock_items on vendor_items.vendor_item_id = stock_items.vendor_item_id
left join customer_shipments on customer_shipments.customer_order_detail_id = customer_order_details.customer_order_detail_id
             where customer_orders.customer_id = '".$id."' and (customer_orders.status='未出荷' || customer_orders.status='確定済み') and customer_orders.category = '".$order_category."' $wh ORDER BY customer_orders.customer_shop_id ASC
            "));
            $order_array =array();
            if($online_order){
                foreach($online_order as $order){
                    $order_array[$order->jan][]=$order;
                }
            }
            if($shop_list){

                if($jan!='' && empty($order_array)){

                        $manual_orderable = 1;
                        $order_array = collect(\DB::select("select jans.jan,jans.name from customer_items inner join jans on jans.jan=customer_items.jan where customer_items.jan='".$jan."' and customer_items.customer_id='".$id."'"));

                }
                return $result = response()->json(['shop_list' => $shop_list,'success'=>1,'manual_orderable'=>$manual_orderable,'online_order'=>$order_array]);
            }else{
                $result = response()->json(['shop_list' => $shop_list,'success'=>0,'manual_orderable'=>$manual_orderable,'online_order'=>$order_array]);
            }

           }else{
            $result = response()->json(['shop_list' => $shop_list,'success'=>0,'manual_orderable'=>$manual_orderable,'online_order'=>$order_array]);
           }
       }else{
        $result = response()->json(['shop_list' => $shop_list,'success'=>0,'manual_orderable'=>$manual_orderable,'online_order'=>$order_array]);
       }

       return $result;

    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
