<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\customer;
use App\customer_item;
use App\jan;
use App\vendor_item;
use App\vendor_order;
use App\customer_order;
use App\customer_shipment;
use DB;
use Session;
class ShipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id=null)
    {
        $title = "Shipment";
        $active = 'shipment';
        $all_shipments=$this->shipment_query($id);
        if($id!=null){
           return $all_shipments;
        }
        return view('backend.shipment.shipment_home', compact('all_shipments','title', 'active'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
         return $request->all();
         $customer_item_id=$request->customer_item_id;

         $case_input=$request->case_input;
         $ball_input=$request->ball_input;
 
         $case_quantity=$request->case_quantity;
         $ball_quantity=$request->ball_quantity;
         $unit_quantity=$request->unit_quantity;
 
         $jan_code=$request->jan_code;
 
         $total_inventory=$request->total_inventory;
         
         jan::where('jan',$jan_code)->update([
             'case_inputs'=>$case_input,
             'ball_inputs'=>$ball_input,
         ]);
         stock_item::where('customer_item_id',$customer_item_id)->update([
             'case_quantity'=>$case_quantity,
             'ball_quantity'=>$ball_quantity,
             'unit_quantity'=>$unit_quantity
         ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function shipment_query($id){
        $where = '';
         $custom_order_by = '';
        if($id!=null){
            if($id>0){
                $where = 'where ci.customer_id="'.$id.'"';
            }
        }
        $result = DB::select("SELECT
        jans.name,
        (case when si.case_quantity IS not NULL then si.case_quantity * jans.case_inputs ELSE 0 END +
        case when si.ball_quantity IS not NULL then si.ball_quantity * jans.ball_inputs ELSE 0 END +
        case when si.unit_quantity IS not NULL then si.unit_quantity ELSE 0 END 
        ) AS stock_unit_total,
        si.case_quantity,si.ball_quantity,si.unit_quantity,
        jans.case_inputs,jans.ball_inputs,
        cst.shipment_case_quantity,
        cst.shipment_ball_quantity,
        cst.shipment_unit_quantity,
        (case when cst.shipment_case_quantity IS not NULL then cst.shipment_case_quantity * jans.case_inputs ELSE 0 END +
        case when cst.shipment_ball_quantity IS not NULL then cst.shipment_ball_quantity * jans.case_inputs ELSE 0 END +
        case when cst.shipment_unit_quantity IS not NULL then cst.shipment_unit_quantity ELSE 0 END 
        ) AS shipment_quantity_total,
        ct.shipment_case_confirm_quantity,ct.shipment_ball_confirm_quantity,ct.shipment_unit_confirm_quantity,
        /*ct.order_case_quantity,ct.order_ball_quantity,ct.order_unit_quantity,*/
        ((case when si.case_quantity IS not NULL then si.case_quantity * jans.case_inputs ELSE 0 END +
        case when si.ball_quantity IS not NULL then si.ball_quantity * jans.ball_inputs ELSE 0 END +
        case when si.unit_quantity IS not NULL then si.unit_quantity ELSE 0 END 
        ) * ci.cost_price) AS stock_cost_price,
        ci.cost_price,
        ci.selling_price,
        (ci.selling_price - ci.cost_price) AS margin,
        ci.gross_profit_margin AS margin_percentage,
        si.rack_number,
        ci.jan
        FROM
        customer_items AS ci
        INNER JOIN vendor_items AS vi ON vi.jan=ci.jan
        INNER JOIN jans ON jans.jan = ci.jan
        LEFT JOIN 
        (
        SELECT 
        cod.jan,
        SUM(case when cs.inputs = 'ケース' then cs.confirm_quantity end) AS shipment_case_confirm_quantity,
        SUM(case when cs.inputs = 'ボール' then cs.confirm_quantity end) AS shipment_ball_confirm_quantity,
        SUM(case when cs.inputs = 'バラ' then cs.confirm_quantity end) AS shipment_unit_confirm_quantity
         FROM
        customer_shipments AS cs
        INNER JOIN customer_order_details AS cod ON cod.customer_order_detail_id= cs.customer_order_detail_id
        INNER JOIN customer_orders AS co ON co.customer_order_id= cod.customer_order_id
        WHERE cs.shipment_date=CURRENT_DATE() AND co.`status`='確定済み'
        GROUP BY cs.shipment_date,cod.jan,cs.inputs
        ) AS ct ON ct.jan=ci.jan
        LEFT JOIN 
        (
        SELECT 
        cod.jan,
        SUM(case when cs.inputs = 'ケース' then cs.quantity end) AS shipment_case_quantity,
        SUM(case when cs.inputs = 'ボール' then cs.quantity end) AS shipment_ball_quantity,
        SUM(case when cs.inputs = 'バラ' then cs.quantity end) AS shipment_unit_quantity
         FROM
        customer_shipments AS cs
        INNER JOIN customer_order_details AS cod ON cod.customer_order_detail_id= cs.customer_order_detail_id
        INNER JOIN customer_orders AS co ON co.customer_order_id= cod.customer_order_id
        WHERE cs.shipment_date=CURRENT_DATE() AND co.`status`='出荷済み'
        GROUP BY cs.shipment_date,cod.jan,cs.inputs
        ) AS cst ON cst.jan=ci.jan
        left JOIN stock_items AS si ON si.vendor_item_id=vi.vendor_item_id group by ci.jan $where");
        return $result;
    }
    /*
    public function shipment_query($id){
        $where = '';
         $custom_order_by = '';
        if($id!=null){
            if($id>0){
                $where = 'where co_all.customer_id="'.$id.'"';
            }
        }
    $query = DB::select("SELECT
    co_all.customer_name,
    co_all.cost_price,
    co_all.selling_price,
    co_all.customer_id,
  co_all.customer_item_id,
  co_all.jan_name,
  co_all.case_quantity,
  co_all.ball_quantity,
  co_all.unit_quantity,
  co_all.case_inputs,
  co_all.ball_inputs,
  co_all.unit_inputs,
  co_all.rack_number,
  co_all.jan,
  co_all.vendor_name,
  co_all.status,
  sum(co_all.case_order_quantity) AS case_order_quantity,
  sum(co_all.ball_order_quantity) AS ball_order_quantity,
  sum(co_all.unit_order_quantity) AS unit_order_quantity,
  sum(co_all.case_shipment_quantity) AS case_shipment_quantity,
  sum(co_all.ball_shipment_quantity) AS ball_shipment_quantity,
  sum(co_all.unit_shipment_quantity) AS unit_shipment_quantity
  from
(
SELECT
  ci_all.*,
  cd.shipment_date,
  cd.status,
  case
   when co.inputs='ケース' then
      co.quantity
   ELSE null
  END AS case_order_quantity,
  case
   when co.inputs='ボール' then
      co.quantity
   ELSE null
  END AS ball_order_quantity,
  case
   when co.inputs='バラ' then
      co.quantity
   ELSE null
  END AS unit_order_quantity,
  case
   when cs.inputs='ケース' then
      cs.quantity
   ELSE null
  END AS case_shipment_quantity,
  case
   when cs.inputs='ボール' then
      cs.quantity
   ELSE null
  END AS ball_shipment_quantity,
  case
   when cs.inputs='バラ' then
      cs.quantity
   ELSE null
  END AS unit_shipment_quantity

FROM
(
SELECT
 c.NAME AS customer_name,
ci.customer_item_id,
ci.customer_id,
ci.selling_price,
vi.cost_price,
  jans.NAME AS jan_name,
  si.case_quantity,
  si.ball_quantity,
  si.unit_quantity,
  jans.case_inputs,
  jans.ball_inputs,
  1 AS unit_inputs,
  si.rack_number,
  jans.jan,
  vendors.NAME AS vendor_name

FROM customer_items AS ci
INNER JOIN customers AS c ON c.customer_id=ci.customer_id
INNER JOIN jans on ci.jan=jans.jan
INNER JOIN vendor_items AS vi ON vi.jan=ci.jan
INNER JOIN vendors ON vendors.vendor_id=vi.vendor_id
left JOIN stock_items AS si ON si.vendor_item_id=vi.vendor_item_id
GROUP BY jans.jan,c.customer_id
) AS ci_all
left JOIN customer_order_details AS co ON co.customer_item_id=ci_all.customer_item_id
left JOIN customer_orders AS cd ON cd.customer_order_id=co.customer_order_id AND cd.shipment_date = CURDATE()
left JOIN customer_shipments AS cs ON cs.customer_order_id=co.customer_order_id
)as co_all $where
GROUP BY co_all.jan,co_all.customer_name
ORDER BY $custom_order_by co_all.vendor_name,co_all.jan_name");
    return $query;
    }*/

    public function shipmentconfirmation(){
        $title = "受注確定";
        $active = 'shipment';
        $customer_list = customer::get();
        return view('backend.shipment.shipment_confirmation', compact('title', 'active','customer_list'));
    }

    public function get_customer_order_details_by_customer_jan(Request $request){
        $jan = $request->janCode;
        // $result = collect(\DB::select("SELECT customer_shipments.customer_shipment_id,SUM(customer_shipments.confirm_quantity) as total_confirm_quantity,customer_shipments.inputs,customer_shipments.customer_order_detail_id,customer_order_details.customer_order_id,jans.name,jans.case_inputs,jans.ball_inputs,customer_orders.customer_id,customer_order_details.customer_item_id FROM `customer_shipments` INNER JOIN customer_order_details on customer_order_details.customer_order_detail_id= customer_shipments.customer_order_detail_id INNER JOIN customer_orders ON customer_orders.customer_order_id = customer_order_details.customer_order_id inner join jans on jans.jan = customer_order_details.jan WHERE customer_shipments.shipment_date=CURRENT_DATE AND customer_order_details.jan = '".$jan."' and customer_orders.status = '確定済み'"))->first();
        /*
            Current shipment date  removed
        */
        $result = collect(\DB::select("SELECT customer_shipments.customer_shipment_id,SUM(customer_shipments.confirm_quantity) as total_confirm_quantity,customer_shipments.inputs,customer_shipments.customer_order_detail_id,customer_order_details.customer_order_id,jans.name,jans.case_inputs,jans.ball_inputs,customer_orders.customer_id,customer_order_details.customer_item_id FROM `customer_shipments` INNER JOIN customer_order_details on customer_order_details.customer_order_detail_id= customer_shipments.customer_order_detail_id INNER JOIN customer_orders ON customer_orders.customer_order_id = customer_order_details.customer_order_id inner join jans on jans.jan = customer_order_details.jan WHERE customer_order_details.jan = '".$jan."' and customer_orders.status = '確定済み'"))->first();
        if($result){
            return $result = response()->json(['customer_order' => $result,'error_message'=>'この商品は、出荷予定では ありません。']);            
        }else{
            return $result = response()->json(['customer_order' => 0,'error_message'=>'この商品は、出荷予定では ありません。']);
        }
    }

    public function get_all_customer_in_confirm(Request $request){
        $customer_id=$request->customer_id;
        $shop_id = $request->shop_id;
        $voucher_number = $request->voucher_number;
        $curr_date = $request->curr_date;
        $wh = '';
        if($customer_id!=0 && $customer_id!=''){
            $wh .= ' and customer_orders.customer_id="'.$customer_id.'"';
        }
        if($shop_id!=''){
            $wh .= ' and customer_orders.customer_shop_id="'.$shop_id.'"';
        }
        if($voucher_number!=''){
            $wh .= ' and customer_orders.voucher_number="'.$voucher_number.'"';
        }
        if($curr_date!=''){
            $wh .= ' and customer_orders.delivery_date="'.$curr_date.'"';
        }
        $customer_order_list = collect(\DB::select("SELECT customer_orders.*,customer_order_details.*,jans.name as product_name,jans.case_inputs,jans.ball_inputs,customers.name,customer_shops.shop_name,stock_items.case_quantity,stock_items.ball_quantity,stock_items.unit_quantity FROM `customer_orders` left join customer_order_details on customer_order_details.customer_order_id=customer_orders.customer_order_id inner join jans on jans.jan=customer_order_details.jan left join vendor_items on vendor_items.jan = customer_order_details.jan left join stock_items on stock_items.vendor_item_id = vendor_items.vendor_item_id inner join customers on customers.customer_id=customer_orders.customer_id left join customer_shops on customer_shops.customer_shop_id = customer_orders.customer_shop_id where (customer_orders.status = '未出荷' or customer_orders.status = '確定済み') $wh"));
        
        $result = response()->json(['customer_order_list' => $customer_order_list]);
        return $result;
    }

    public function shipment_confirmation_update(Request $request){
        $order_infos = $request->order_infos;
        $data = array();
        if($order_infos){
        foreach($order_infos as $key=>$val){
            $customer_order_id = $val['customer_order_id'];
            $quantity = $val['quantity'];
            $data['customer_order_id']= $customer_order_id;
            $data['quantity']= $quantity;
            customer_order::where('customer_order_id',$customer_order_id)->update([
                'status'=>'確定済み'
            ]);
            customer_shipment::where('customer_order_id',$customer_order_id)->update([
                'quantity'=>$quantity
            ]);
        }
        }
        Session::flash('message', '確定が完了しました'); 
        Session::flash('class_name', 'alert-success'); 
        return $result = response()->json(['message' => 'update_success']);
    }


    public function shipment_conf_delete(Request $request){
        $customer_order_id= $request->customer_order_id;
        customer_order::where('customer_order_id',$customer_order_id)->update([
            'status'=>'未出荷'
        ]);
        Session::flash('message', '確定を取消しました'); 
        Session::flash('class_name', 'alert-success'); 
        return $result = response()->json(['message' => 'update_success']);
    }
    
}
