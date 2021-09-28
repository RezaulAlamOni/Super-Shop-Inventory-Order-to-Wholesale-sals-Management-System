<?php

namespace App\Http\Controllers\API;

use App\customer_item;
use App\customer_order;
use App\customer_order_detail;
use App\customer_shipment;
use App\Http\Controllers\Controller;
use App\jan;
use App\vendor_item;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function insertOrderFromSuper(Request $request)
    {
        $orders = $request->data;
        $orders_ = json_decode($orders);
        foreach ($orders_ as $order) {

            $customer_id = $order->vendor_id;
            $jan_code = $order->item_ifo->jan;
            $items_info = customer_item::where('jan', $jan_code)->where('customer_id', $customer_id)->first();
            $vendoritems_info = vendor_item::where('jan', $jan_code)->first();
            $janInfo = jan::where('jan', $jan_code)->first();

            $case_order_quantity = $order->order_case_quantity;
            $ball_order_quantity = $order->order_ball_quantity;
            $unit_order_quantity = $order->order_unit_quantity;
            $total_quantity = $unit_order_quantity + ($ball_order_quantity * $janInfo->ball_inputs) + ($case_order_quantity * $janInfo->case_inputs);
            $c_quantity = $total_quantity;
            $customer_order_demo['customer_id'] = $customer_id;
            $customer_order_demo['shipment_number'] = rand();
            $customer_order_demo['category'] = 'manual';
            $customer_order_demo['voucher_number'] = rand();
            $customer_order_demo['order_date'] = date('Y-m-d H:i:s');
            $customer_order_demo['shipment_date'] = date('Y-m-d');
            $customer_order_demo['delivery_date'] = date('Y-m-d H:i:s');

            $customer_order_demo_detail['customer_item_id'] = $order->item_ifo->vendor_item_id;
            $customer_order_demo_detail['jan'] = $jan_code;
            $customer_order_demo_detail['inputs'] = 'ケース';
            $customer_order_demo_detail['quantity'] = $c_quantity;
            $customer_order_demo_detail['order_case_quantity'] = $case_order_quantity;
            $customer_order_demo_detail['order_ball_quantity'] = $ball_order_quantity;
            $customer_order_demo_detail['order_unit_quantity'] = $unit_order_quantity;
            $customer_order_demo_detail['cost_price'] = $order->item_ifo->cost_price;
            $customer_order_demo_detail['selling_price'] = $order->item_ifo->selling_price;
            $customer_order_id = customer_order::insertGetId($customer_order_demo);
            $customer_order_demo_detail['customer_order_id'] = $customer_order_id;
            $customer_order_detail_id = customer_order_detail::insertGetId($customer_order_demo_detail);
            $stock_info = $this->get_stock_info($jan_code);
            return $stock_info;
            $shiptment['customer_id'] = $customer_id;
            $shiptment['customer_order_id'] = $customer_order_id;
            $shiptment['customer_order_detail_id'] = $customer_order_detail_id;
            $shiptment['shipment_date'] = date('Y-m-d H:i:s');
            $shiptment['inputs'] = 'ケース';
            $shiptment['confirm_case_quantity'] = $case_order_quantity;
            $shiptment['confirm_ball_quantity'] = $ball_order_quantity;
            $shiptment['confirm_unit_quantity'] = $unit_order_quantity;
            $shiptment['confirm_quantity'] = $c_quantity;


            if ($stock_info) {
                $shiptment['rack_number'] = $stock_info->rack_number;
                if ($stock_info->case_quantity >= $case_order_quantity && $stock_info->ball_quantity >= $ball_order_quantity && $stock_info->unit_quantity >= $unit_order_quantity) {
                    customer_shipment::insert($shiptment);
                    customer_order::where('customer_order_id', $customer_order_id)->update(['status' => '確定済み']);
                }

            }

        }

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
}
