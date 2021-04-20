<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\customer;
use App\customer_item;
use App\jan;
use App\vendor_item;
use App\vendor_order;
use App\customer_order;
class ShipmenthandyController extends Controller
{
       
    public function shipment_add_handy()
    {
        $title = "Shipment Handy";
        $active = 'shipmentaddhandy';
        return view('backend.handy_pages.shipment_product_add_form', compact('title', 'active'));
    }
    
    public function handy_shipmetproduct_list()
    {
        $title = "Dashboard";
        $active = 'handyshipmentproductlist';
        
        return view('backend.handy_pages.shipment_product_list_handy', compact('title', 'active'));
    }
    
    public function get_all_customer_order_by_voucher_number(Request $request)
    {
        $voucher_number = $request->voucher_number;
        $vendor_order_list = DB::select("SELECT
  customers.NAME,
    jans.NAME AS item_name,
    vo.inputs AS order_inputs,
    case when vo.inputs = 'case' then jans.case_inputs
        when vo.inputs = 'ball' then jans.ball_inputs
        when vo.inputs = 'unit' then 1
    END AS inputs,
    vo.quantity    
FROM
customer_orders AS co
INNER JOIN vendor_items AS vi ON vo.vendor_item_id=vi.vendor_item_id
INNER JOIN jans ON vi.jan = jans.jan
INNER JOIN vendors ON vo.vendor_id=vendors.vendor_id
WHERE vo.voucher_number = '".$voucher_num."'");
return $result = response()->json(['all_customer_order' =>$customer_order_list ]);
        
    }
  
}
