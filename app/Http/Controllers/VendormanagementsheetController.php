<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\vendor_item;
use App\jan;
use App\customer;
use App\customer_order;
use App\customer_item;
use App\customer_shipment;
use App\customer_payment;
use App\vendor;
use App\vendor_order;
use App\vendor_arrival;
use App\vendor_payment;
use App\vendor_due_blance;
use DB;
class VendormanagementsheetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $title = "Vendor Management Sheet";
        $active = 'vendormangementsheet';
        $vendor_start_date = date('Y/m/01');
        $vendor_end_date = date('Y/m/t');
        if(isset($request->from_dte)){
            $vendor_start_date = $request->from_dte;
        }
        if(isset($request->t_dte)){
            $vendor_end_date = $request->t_dte;
        }

        return view('backend.vendormangementsheet.index', compact('title', 'active','vendor_start_date','vendor_end_date'));
    }
    public function vendor_order_detail_by_tonya($vendor_id)
    {

        $title = "Vendor Management Sheet";
        $active = 'vendormangementsheet';
        $vendor_start_date = date('Y/m/01');
        $vendor_end_date = date('Y/m/t');
        if(isset($request->from_dte)){
            $vendor_start_date = $request->from_dte;
        }
        if(isset($request->t_dte)){
            $vendor_end_date = $request->t_dte;
        }
        $tonyaInfo = vendor::where('vendor_id',$vendor_id)->first();
        return view('backend.vendormangementsheet.blanceSheetByTonya', compact('title', 'active','vendor_start_date','vendor_end_date','tonyaInfo'));
    }

    public function vendor_order_detail($vendor_id,$invoice_date,$vendor_invoice_id)
    {
        $title = "Vendor Management Sheet";
        $active = 'vendormangementsheet';
        $shipment_items_data=collect(\DB::select("SELECT
        vi.invoice_date,
        v.name,
        j.name as jan_name,
        vit.jan,
        va.quantity-va.damage_quantity as t_qty,
        va.quantity*vit.cost_price as total_cost_price,
        
        vod.unit_cost_price,
        v.vendor_id,
        vi.invoice_amount,
        vp.payment,
        vp.payment_date
        FROM
        vendor_invoices AS vi
        INNER JOIN vendors AS v ON v.vendor_id=vi.vendor_id
        INNER JOIN vendor_orders AS vod ON vod.vendor_order_id=vi.voucher_number
        LEFT JOIN vendor_arrivals AS va ON va.vendor_order_id=vi.voucher_number
        INNER JOIN vendor_items AS vit ON vit.vendor_item_id=vod.vendor_item_id
        INNER JOIN jans AS j ON j.jan=vit.jan
        left JOIN vendor_payments AS vp ON vp.vendor_invoice_id=vi.vendor_invoice_id
        WHERE
        vi.invoice_date= '".$invoice_date."' and vi.vendor_invoice_id= '".$vendor_invoice_id."' and vi.vendor_id='".$vendor_id."' group by vit.jan"));
        // dd($shipment_items_data);
        return view('backend.vendormangementsheet.vendor_order_detail', compact('title', 'active','shipment_items_data'));
    }

    public function vendormanagement_data_filter(Request $request){
        $shipment_start_date=$request->shipment_start_date;
        $shipment_end_date=$request->shipment_end_date;
        $vendor_id=$request->vendor_id;
        if($shipment_start_date==''){
            $shipment_start_date = date('Y/m/01');
        }
        if($shipment_end_date==''){
            $shipment_end_date = date('Y/m/t');
        }
        $wh = '';
        if($vendor_id!=0){
            $wh = ' and vi.vendor_id="'.$vendor_id.'"';
        }
        $shipment_items_data=collect(\DB::select("SELECT
        vi.invoice_date,
        vi.vendor_invoice_id,
        v.name,
        v.vendor_id,
        vi.invoice_amount,
        vp.payment,
        va.quantity-va.damage_quantity as quantity,
        va.arrival_case_quantity,
        va.arrival_ball_quantity,
        va.arrival_unit_quantity,
        vo.unit_cost_price,
        j.name as item_name,
        j.case_inputs,
        j.ball_inputs,
        vi.invoice_amount-vp.payment as due_payment,
        vp.payment_date
        FROM
        vendor_invoices AS vi
        INNER JOIN vendors AS v ON v.vendor_id=vi.vendor_id
        left JOIN vendor_payments AS vp ON vp.vendor_invoice_id=vi.vendor_invoice_id
        inner JOIN vendor_arrivals AS va ON va.vendor_order_id=vi.voucher_number
        inner JOIN vendor_orders AS vo ON vo.vendor_order_id=va.vendor_order_id
        inner JOIN vendor_items AS vit ON vit.vendor_item_id=vo.vendor_item_id
        inner JOIN jans AS j ON j.jan=vit.jan
        WHERE
        vi.invoice_date BETWEEN '".$shipment_start_date."' and '".$shipment_end_date."' order by v.vendor_id ASC,vi.vendor_invoice_id DESC"));

        $previous_due = vendor_due_blance::all();

        return $result = response()->json(['all_data' => $shipment_items_data,'previous_dues'=>$previous_due]);
    }

    public function vendormanagement_data_filter_by_tonya(Request $request){
        $shipment_start_date=$request->shipment_start_date;
        $shipment_end_date=$request->shipment_end_date;
        $vendor_id=$request->vendor_id;
        if($shipment_start_date==''){
            $shipment_start_date = date('Y/m/01');
        }
        if($shipment_end_date==''){
            $shipment_end_date = date('Y/m/t');
        }
        $wh = '';
        if($vendor_id!=0){
            $wh = ' and vi.vendor_id="'.$vendor_id.'"';
        }
        $shipment_items_data=collect(\DB::select("SELECT
        vi.invoice_date,
        vi.vendor_invoice_id,
        v.name,
        v.vendor_id,
        vi.invoice_amount,
        vp.payment,
        va.quantity-va.damage_quantity as quantity,
        va.arrival_case_quantity,
        va.arrival_ball_quantity,
        va.arrival_unit_quantity,
        vo.unit_cost_price,
        j.case_inputs,
        j.ball_inputs,
        j.name as item_name,
        vi.invoice_amount-vp.payment as due_payment,
        vp.payment_date
        FROM
        vendor_invoices AS vi
        INNER JOIN vendors AS v ON v.vendor_id=vi.vendor_id
        left JOIN vendor_payments AS vp ON vp.vendor_invoice_id=vi.vendor_invoice_id
        inner JOIN vendor_arrivals AS va ON va.vendor_order_id=vi.voucher_number
        inner JOIN vendor_orders AS vo ON vo.vendor_order_id=va.vendor_order_id
        inner JOIN vendor_items AS vit ON vit.vendor_item_id=vo.vendor_item_id
        inner JOIN jans AS j ON j.jan=vit.jan
        WHERE
        vi.invoice_date BETWEEN '".$shipment_start_date."' and '".$shipment_end_date."' $wh order by v.vendor_id ASC,vi.vendor_invoice_id DESC"));

        $previous_due = vendor_due_blance::all();

        return $result = response()->json(['all_data' => $shipment_items_data,'previous_dues'=>$previous_due]);
    }

    public function get_all_vendor_order_item_by_voucher(Request $request){
        $voucher_number=$request->voucher_number;
        return $shipment_items_data=collect(\DB::select("SELECT vo.voucher_number,jans.jan,jans.name,jans.case_inputs,jans.ball_inputs,va.quantity,vit.cost_price FROM vendor_orders AS vo INNER JOIN vendor_items AS vit ON vit.vendor_item_id=vo.vendor_item_id INNER JOIN vendor_arrivals AS va ON va.vendor_order_id=vo.vendor_order_id INNER JOIN jans ON jans.jan = vit.jan where vo.voucher_number='".$voucher_number."' ORDER BY vo.voucher_number,vit.jan"));

    }

    public function get_vendor_payments_by_vendor_order_id(Request $request){
        $vendor_id=$request->vendor_id;
        $vendor_order_id=$request->vendor_order_id;
        return $shipment_items_data=collect(\DB::select("select * from `vendor_payments` where vendor_id='".$vendor_id."' and vendor_order_id='".$vendor_order_id."' order by `payment_date` desc"));
    }

    public function insert_vendor_payment(Request $request){
        $payment = array();
        $payment['vendor_id']=$request->vendor_id;
        $payment['vendor_order_id']=$request->vendor_order_id;
        $payment['payment']=$request->vendor_amount;
        $payment['profit']=$request->vendor_profit;
        $payment['payment_date']=date('Y-m-d');
        vendor_payment::insert($payment);
        return $result = response()->json(['message' => 'insert_success']);
    }

    public function delete_vendor_payment(Request $request){
        $vendor_id=$request->vendor_id;
        $vendor_order_id=$request->vendor_order_id;
        $payment_id = $request->payment_id;
        vendor_payment::where(['vendor_id'=>$vendor_id,'vendor_order_id'=>$vendor_order_id,'vendor_payment_id'=>$payment_id])->delete();
        return $result = response()->json(['message' => 'delete_success']);
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

    public function vendor_payment_insert_update(Request $request){
        $vendor_id  = $request->vendor_id;
        $invoice_id = $request->invoice_id;
        $amount     = $request->amount;

        $o = vendor_payment::updateOrInsert([
            'vendor_invoice_id' =>$invoice_id,
            'vendor_id'=>$vendor_id
        ],[
            'vendor_invoice_id' =>$invoice_id,
            'vendor_id'=>$vendor_id,
            'payment'=>$amount
        ]);

        return response()->json(['status' => 200]);
    }

    public function vendor_due_payment_insert_update(Request $request){
        $vendor_id  = $request->vendor_id;
        $invoice_id = $request->invoice_id;
        $amount     = $request->amount;

        $o = vendor_due_blance::updateOrInsert([
            'vendor_id'=>$vendor_id
        ],[
            'vendor_id'=>$vendor_id,
            'opening_due_amount'=>$amount
        ]);

        return response()->json(['status' => 200]);
    }
}
