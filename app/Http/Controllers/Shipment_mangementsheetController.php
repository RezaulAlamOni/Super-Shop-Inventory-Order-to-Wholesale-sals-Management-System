<?php

namespace App\Http\Controllers;

use App\customer_due_blance;
use Illuminate\Http\Request;
use App\vendor_item;
use App\jan;
use App\customer;
use App\customer_order;
use App\customer_item;
use App\customer_shipment;
use App\customer_payment;
use App\customer_invoice;
use App\vendor_payment;

use DB;


class Shipment_mangementsheetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $title = "Shipment Management Sheet";
        $active = 'shipmentmangementsheet';
        $shipment_start_date = date('Y/m/01');
        $shipment_end_date = date('Y/m/t');
        if(isset($request->from_dte)){
            $shipment_start_date = $request->from_dte;
        }
        if(isset($request->t_dte)){
            $shipment_end_date = $request->t_dte;
        }
        return view('backend.shipmentmangementsheet.index', compact('title', 'active','shipment_end_date','shipment_start_date'));
    }

    public function customer_order_detail($customer_id,$invoice_date,$customer_invoice_id){
        $title = "Customer Management Sheet";
        $active = 'customermangementsheet';
        $shipment_items_data=collect(\DB::select("SELECT
        ci.invoice_date,
        ci.customer_invoice_id,
        c.name,
        j.jan,
        j.name as jan_name,
        cs.inputs,
        ct.selling_price,
        SUM(cs.quantity) as qty,
       cs.quantity as t_qty,
        ci.invoice_amount,
        ci.customer_id,
        cp.payment,
        cp.payment_date
        FROM
        customer_invoices AS ci
        INNER JOIN customers AS c ON c.customer_id=ci.customer_id
        INNER JOIN customer_shipments AS cs ON cs.customer_shipment_id=ci.customer_shipment_id
        INNER JOIN customer_order_details AS cod ON cod.customer_order_detail_id=cs.customer_order_detail_id
        INNER JOIN customer_items AS ct ON ct.customer_item_id=cod.customer_item_id
        INNER JOIN jans AS j ON j.jan=ct.jan
        left JOIN customer_payments AS cp ON cp.customer_invoice_id=ci.customer_invoice_id
        WHERE
        ci.invoice_date= '".$invoice_date."' and ci.customer_invoice_id='".$customer_invoice_id."' and ci.customer_id='".$customer_id."' group by ct.jan"));
        return view('backend.shipmentmangementsheet.customer_order_detail', compact('title', 'active','shipment_items_data'));
    }

    public function shipment_items_data(Request $request){
        $shipment_start_date=$request->shipment_start_date;
        $shipment_end_date=$request->shipment_end_date;
        $customer_id=$request->customer_id;
        if($shipment_start_date==''){
            $shipment_start_date = date('Y/m/01');
        }
        if($shipment_end_date==''){
            $shipment_end_date = date('Y/m/t');
        }
        $wh = '';
        if($customer_id!=0){
            $wh = ' and ci.customer_id="'.$customer_id.'"';
        }
        $shipment_items_data=collect(\DB::select("SELECT
        ci.invoice_date,
        ci.customer_invoice_id,
        c.name,
        ci.invoice_amount,
        ci.customer_id,
        cp.payment,
        cp.payment_date
        FROM
        customer_invoices AS ci
        INNER JOIN customers AS c ON c.customer_id=ci.customer_id
        left JOIN customer_payments AS cp ON cp.customer_invoice_id=ci.customer_invoice_id
        WHERE
        ci.invoice_date BETWEEN '".$shipment_start_date."' and '".$shipment_end_date."' $wh order By ci.customer_id asc,ci.customer_invoice_id DESC"));

        $customer_dues = customer_due_blance::all();
        return $result = response()->json(['all_data' => $shipment_items_data,'previous_dues'=> $customer_dues]);
    }

    public function get_payment_info_by_invoice_id(Request $request){
        $invoice_id=$request->invoice_id;
        $payment_type=$request->payment_type;
        if($payment_type=='vendor_payments'){
            $result=collect(\DB::select("select payment,payment_date,vendor_payment_id as payment_id from vendor_payments where vendor_invoice_id='".$invoice_id."' order by `payment_date` desc"));
        }else{
            $result=collect(\DB::select("select payment,payment_date,customer_payment_id as payment_id from customer_payments where  customer_invoice_id='".$invoice_id."' order by `payment_date` desc"));
        }
        return $result;

    }

    public function insert_payment(Request $request){
        $payment = array();
        $payment_type = $request->payment_type;
        if($payment_type =='vendor_payments'){
            $payment['vendor_id']=$request->customer_id;
            $payment['vendor_invoice_id']=$request->invoice_id;
            $payment['payment']=$request->customer_amount;
            $payment['payment_date']=date('Y-m-d');
            vendor_payment::insert($payment);
        }else{
            $payment['customer_id']=$request->customer_id;
            $payment['customer_invoice_id']=$request->invoice_id;
            $payment['payment']=$request->customer_amount;
            $payment['payment_date']=date('Y-m-d');
            customer_payment::insert($payment);
        }
        return $result = response()->json(['message' => 'insert_success']);
    }

    public function delete_payment(Request $request){
        $payment_type=$request->payment_type;
        $payment_id = $request->payment_id;
        if($payment_type=='vendor_payments'){
            vendor_payment::where(['vendor_payment_id'=>$payment_id])->delete();
        }else{
            customer_payment::where(['customer_payment_id'=>$payment_id])->delete();
        }
        return $result = response()->json(['message' => 'delete_success']);
    }

    public function customer_due_payment_insert_update(Request $request)
    {
        $customer_id = $request->customer_id;
        $amount = $request->amount;

        $o = customer_due_blance::updateOrInsert([
            'customer_id' => $customer_id
        ], [
            'customer_id' => $customer_id,
            'opening_due_amount' => $amount
        ]);

        return response()->json(['status' => 200]);
    }

    public function customer_payment_insert_update(Request $request)
    {
        $customer_id  = $request->customer_id;
        $invoice_id = $request->invoice_id;
        $amount     = $request->amount;
//        return $request->all();

        customer_payment::updateOrInsert([
            'customer_id'=>$customer_id,
            'customer_invoice_id' =>$invoice_id
        ],[
            'customer_id' => $customer_id,
            'customer_invoice_id' => $invoice_id,
            'payment' => $amount
        ]);

        return response()->json(['status' => 200]);
    }


}
