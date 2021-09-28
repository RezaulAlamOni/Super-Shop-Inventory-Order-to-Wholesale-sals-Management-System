<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\QRGenController;
use App\jan;
use App\customer;
use App\customer_order;
use App\customer_item;
use App\customer_shipment;
use App\customer_payment;
use App\vendor;
use App\vendor_item;
use App\vendor_order;
use App\vendor_arrival;
use App\vendor_payment;
use App\invoice;
use PDF;
use DB;

class ReportGenerateController extends Controller
{
    private $QR_var;
    public function __construct()
    {
        $this->QR_var=new QRGenController();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $paper_size="A4";
        $page_name='demo';
        return $this->pdf_gen($paper_size,$page_name);
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function deliveryOrderReport($id){
        $page_name='delivery_order_report';
        $shipment_number=$id;
        // return $shipment_number;

        $delivery_order_info=DB::select("SELECT
        c.name AS customer_name,
        co.delivery_date,
        co.shipment_number,
        j.name AS jan_name,
        j.jan,
        si.rack_number,
        case
            when cod.inputs='ケース' then
                cod.quantity
            ELSE 0
        end AS c_quantity,
        case
            when cod.inputs='ボール' then
                cod.quantity
            ELSE 0
        end AS b_quantity,
        case
            when cod.inputs='バラ' then
                cod.quantity
            ELSE 0
        end AS u_quantity
        
        FROM customer_orders AS co
        INNER JOIN customer_order_details AS cod ON co.customer_order_id=cod.customer_order_id
        INNER JOIN customers AS c ON c.customer_id=co.customer_id
        INNER JOIN jans AS j ON j.jan=cod.jan
        INNER JOIN vendor_items AS vi ON vi.jan = j.jan
        LEFT JOIN stock_items AS si ON si.vendor_item_id= vi.vendor_item_id
        
        WHERE co.shipment_number='$shipment_number'");
        //return $delivery_order_info;
        if(empty($delivery_order_info)){
            return redirect()->back()->with(['message'=>'You have not enough data','class_name'=>'alert-danger']);
        }

        return $this->pdf_gen_shipment('',$page_name,$delivery_order_info);
    } 
    public function receiveOrderReport($id){
        $page_name='receive_order_report';
        $vendor_order_id=$id;
        // return $shipment_number;

        $delivery_order_info=DB::select("SELECT
        v.name AS vendor_name,
        vo.shipment_date,
        vo.voucher_number,
        j.name AS jan_name,
        j.jan,
        si.rack_number,
        case
            when vod.inputs='ケース' then
                vod.quantity
            ELSE 0
        end AS c_quantity,
        case
            when vod.inputs='ボール' then
                vod.quantity
            ELSE 0
        end AS b_quantity,
        case
            when vod.inputs='バラ' then
                vod.quantity
            ELSE 0
        end AS u_quantity
        
        FROM vendor_orders AS vo
        INNER JOIN vendor_order_details AS vod ON vo.vendor_order_id=vod.vendor_order_id
        INNER JOIN vendors AS v ON v.vendor_id=vo.vendor_id
        INNER JOIN vendor_items AS vi ON vi.vendor_item_id = vod.vendor_item_id
        INNER JOIN jans AS j ON j.jan=vi.jan
        
        LEFT JOIN stock_items AS si ON si.vendor_item_id= vi.vendor_item_id
        
        WHERE vo.vendor_order_id='$vendor_order_id'");
        //return $delivery_order_info;
        if(empty($delivery_order_info)){
            return redirect()->back()->with(['message'=>'You have not enough data','class_name'=>'alert-danger']);
        }

        return $this->pdf_gen('',$page_name,$delivery_order_info);
    }
    public function pdf_gen($paper_size='A4',$page_name,$delivery_order_info)
    {
        $this->QR_var->folder_create('fonts');
        $this->QR_var->folder_create('/app/public/All_Report');
        
        $file_name = $delivery_order_info[0]->voucher_number.'.pdf';
        //return $file_name;
        $pdf = PDF::loadView('backend.report.'.$page_name,compact('delivery_order_info'));
        $pdf->setPaper($paper_size, 'portrait'); //landscape

        // $pdf->save(storage_path().'/app/public/All_Report/'.$file_name);
        
        \Log::info('Pdf list End');
        // return $pdf->download('itsolutionstuff.pdf');
        return $pdf->stream($file_name);
        \Log::info('Pdf list view');
    }   
    public function pdf_gen_shipment($paper_size='A4',$page_name,$delivery_order_info)
    {
        $this->QR_var->folder_create('fonts');
        $this->QR_var->folder_create('/app/public/All_Report');
        
        $file_name = $delivery_order_info[0]->shipment_number.'.pdf';
        //return $file_name;
        $pdf = PDF::loadView('backend.report.'.$page_name,compact('delivery_order_info'));
        $pdf->setPaper($paper_size, 'portrait'); //landscape

        // $pdf->save(storage_path().'/app/public/All_Report/'.$file_name);
        
        \Log::info('Pdf list End');
        // return $pdf->download('itsolutionstuff.pdf');
        return $pdf->stream($file_name);
        \Log::info('Pdf list view');
    }

    public function management_sheet_report_both(Request $request){
        $u_id = $request->c_v_id;
        $types = $request->invoice_type;
        $start_date = $request->start_date;
        $end_date = $request->end_date;
        $page_name = 'management_sheet';
        
        $delivery_order_info = array();
        $invoice_info = invoice::get()->first();
        
        if($types ==1 ){
            $wh = '';
            if($u_id!=0){
                $wh = ' and vendor_orders.vendor_id="'.$u_id.'"';
            }
            $delivery_order_info = collect(\DB::select("select vendor_arrivals.arrival_date as management_date, `vendor_arrivals`.`quantity`, `vendors`.`name`,  jans.name as jan_name, `vendor_orders`.`voucher_number`,vendor_orders.vendor_id, vendor_orders.vendor_order_id,vendor_items.cost_price as s_price, vendor_arrivals.quantity*vendor_items.cost_price as `profit`,(select SUM(payment) from vendor_payments where vendor_payments.vendor_order_id=vendor_orders.vendor_order_id) as total_amount from `vendor_arrivals` inner join `vendor_orders` on `vendor_arrivals`.`vendor_order_id` = `vendor_orders`.`vendor_order_id` inner join `vendor_items` on `vendor_orders`.`vendor_item_id` = `vendor_items`.`vendor_item_id` inner join `vendors` on `vendor_arrivals`.`vendor_id` = `vendors`.`vendor_id` inner join `jans` on `jans`.`jan` = `vendor_items`.`jan` where (`vendor_arrivals`.`arrival_date` between '".$start_date."' and '".$end_date."') $wh order by `vendor_arrivals`.`arrival_date` desc"));
            $specific_customer_vendor_info=vendor::where('vendor_id',$u_id)->first();
        }else{
            $wh = '';
            if($u_id!=0){
                $wh = ' and customer_orders.customer_id="'.$u_id.'"';
            }
          
             $delivery_order_info=collect(\DB::select("select customer_shipments.shipment_date as management_date, `customer_shipments`.`quantity`, `customers`.`name`, jans.name as jan_name, `customer_orders`.`voucher_number`,customer_orders.customer_id, customer_orders.customer_order_id,customer_items.selling_price as s_price,customer_shipments.inputs, customer_shipments.quantity*customer_items.selling_price as `profit` from `customer_shipments` inner join `customer_orders` on `customer_shipments`.`customer_order_id` = `customer_orders`.`customer_order_id` inner join `customer_order_details` on `customer_order_details`.`customer_order_id` = `customer_orders`.`customer_order_id` inner join `customer_items` on `customer_order_details`.`customer_item_id` = `customer_items`.`customer_item_id` inner join `customers` on `customer_shipments`.`customer_id` = `customers`.`customer_id` inner join `jans` on `jans`.`jan` = `customer_items`.`jan` where (`customer_shipments`.`shipment_date` between '".$start_date."' and '".$end_date."') $wh order by `customer_orders`.`order_date`,`customer_orders`.`voucher_number`,`customer_order_details`.`jan` desc"));
            
            $specific_customer_vendor_info=customer::where('customer_id',$u_id)->first();
            
        }
        
        if(empty($delivery_order_info)){
            return response()->json(['error_found'=>1,'message' => 'No data found','class_name'=>'alert-danger']);
        }
        
        $total_profit = collect(\DB::select("SELECT SUM(invoice_amount) as total_profit FROM customer_invoices AS ci WHERE ci.invoice_date = ( SELECT MAX(ci.invoice_date) FROM customer_invoices AS ci )"))->first();
        
        $total_payment = collect(\DB::select("SELECT SUM(cp.payment) as total_payment FROM customer_invoices AS ci INNER JOIN customer_payments AS cp ON ci.customer_invoice_id=cp.customer_invoice_id WHERE ci.invoice_date = ( SELECT MAX(ci.invoice_date) FROM customer_invoices AS ci )"))->first();
        
        $total_profit_amount = ($total_profit->total_profit!=null?$total_profit->total_profit:0);
        $total_payment_amount = ($total_payment->total_payment!=null?$total_payment->total_payment:0);
        // $this->QR_var->folder_create('fonts');
        // $this->QR_var->folder_create('/app/public/All_Report');
       
        $file_name = 'management_sheet_pdf.pdf';
        $pdf = PDF::loadView('backend.report.'.$page_name,compact('delivery_order_info','specific_customer_vendor_info','invoice_info','total_profit_amount','total_payment_amount'));
        $pdf->setPaper('A4', 'portrait'); //landscape portrait
        
        return $pdf->download($file_name);

    }


    public function demo_management_sheet_report_both(){
        $u_id = 3;;
        $types = 1;
        $start_date = '2019-01-01';
        $end_date = '2019-12-01';
        $page_name = 'management_sheet';
        $delivery_order_info = array();
        $invoice_info = invoice::get()->first();
        if($types ==1 ){
            $wh = '';
            if($u_id!=0){
                $wh = ' and vendor_orders.vendor_id="'.$u_id.'"';
            }
            $delivery_order_info = collect(\DB::select("select vendor_arrivals.arrival_date as management_date, `vendor_arrivals`.`quantity`, `vendors`.`name`,  jans.name as jan_name, `vendor_orders`.`voucher_number`,vendor_orders.vendor_id, vendor_orders.vendor_order_id,vendor_items.cost_price as s_price, vendor_arrivals.quantity*vendor_items.cost_price as `profit`,(select SUM(amount) from vendor_payments where vendor_payments.vendor_order_id=vendor_orders.vendor_order_id) as total_amount from `vendor_arrivals` inner join `vendor_orders` on `vendor_arrivals`.`vendor_order_id` = `vendor_orders`.`vendor_order_id` inner join `vendor_items` on `vendor_orders`.`vendor_item_id` = `vendor_items`.`vendor_item_id` inner join `vendors` on `vendor_arrivals`.`vendor_id` = `vendors`.`vendor_id` inner join `jans` on `jans`.`jan` = `vendor_items`.`jan` where (`vendor_arrivals`.`arrival_date` between '".$start_date."' and '".$end_date."') $wh order by `vendor_arrivals`.`arrival_date` desc"));
            $specific_customer_vendor_info=vendor::where('vendor_id',$u_id)->first();
        }else{
            $wh = '';
            if($u_id!=0){
                $wh = ' and customer_orders.customer_id="'.$u_id.'"';
            }
            $delivery_order_info=collect(\DB::select("select customer_shipments.shipment_date as management_date, `customer_shipments`.`quantity`, `customers`.`name`, jans.name as jan_name, `customer_orders`.`voucher_number`,customer_orders.customer_id, customer_orders.customer_order_id,customer_items.selling_price as s_price, customer_shipments.quantity*customer_items.selling_price as `profit`,(select SUM(amount) from customer_payments where customer_payments.customer_order_id=customer_orders.customer_order_id) as total_amount from `customer_shipments` inner join `customer_orders` on `customer_shipments`.`customer_order_id` = `customer_orders`.`customer_order_id` inner join `customer_items` on `customer_orders`.`customer_item_id` = `customer_items`.`customer_item_id` inner join `customers` on `customer_shipments`.`customer_id` = `customers`.`customer_id` inner join `jans` on `jans`.`jan` = `customer_items`.`jan` where (`customer_shipments`.`shipment_date` between '".$start_date."' and '".$end_date."') $wh order by `customer_shipments`.`shipment_date` desc"));
            $specific_customer_vendor_info=customer::where('customer_id',$u_id)->first();
        }
        if(empty($delivery_order_info)){
            return redirect()->back()->with(['message'=>'You have not enough data']);
        }
        // $this->QR_var->folder_create('fonts');
        // $this->QR_var->folder_create('/app/public/All_Report');
        
        $file_name = 'management_sheet_pdf.pdf';
        $pdf = PDF::loadView('backend.report.'.$page_name,compact('delivery_order_info','specific_customer_vendor_info','invoice_info'));
        $pdf->setPaper('A4', 'portrait'); //landscape

        //  $pdf->save(storage_path().'/app/public/All_Report/'.$file_name);

        \Log::info('Pdf list End');
//         header('Content-Type: application/octet-stream; charset=utf-8');
// header('Content-Disposition: attachment; filename="'.$file_name.'"');
//header('Content-Type: application/octet-stream'); 
       // return $url_down = \Config::get('app.url').'storage/app/public/All_Report/'.$file_name;
        //return redirect()->back()->with(['rspurl'=>$url_down,'file_name'=>$file_name]);
        //return $url_down;
        //return $pdf->download($file_name);
        return $pdf->stream($file_name);
        \Log::info('Pdf list view');
        //return $this->pdf_gen('',$page_name,$delivery_order_info);

    }

    public function management_sheet_pdf(){
        // $page_name = 'management_sheet';
        $delivery_order_info = array();
        // $this->QR_var->folder_create('fonts');
        // $this->QR_var->folder_create('/app/public/All_Report');
        
        $file_name = 'management_sheet_pdf.pdf';
        $pdf = PDF::loadView('backend.report.management_sheet',compact('delivery_order_info'));
        $pdf->setPaper('A4', 'portrait'); //landscape

        // $pdf->save(storage_path().'/app/public/All_Report/'.$file_name);
        
        \Log::info('Pdf list End');
        // $pdf->download('itsolutionstuff.pdf');
        return $pdf->stream($file_name);
        \Log::info('Pdf list view');
    } 

}
