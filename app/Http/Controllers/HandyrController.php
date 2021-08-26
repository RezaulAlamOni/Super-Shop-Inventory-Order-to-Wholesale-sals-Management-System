<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\customer;
use App\vendor;
use App\customer_item;
use App\customer_order;
use App\customer_order_detail;
use App\jan;
use App\vendor_item;
use App\vendor_order;
use App\vendor_order_detail;
use App\stock_item;
use App\stock_item_detail;
use App\vendor_arrival;
use App\customer_shipment;
use App\customer_invoice;
use App\vendor_invoice;
use DB;
use Session;

class HandyrController extends Controller
{
    public function inventoryUpdate()
    {
        $title = "Dashboard";
        $active = 'inventoryentrybyhandy';
        return view('backend.handy_pages.product_jan_scan', compact('title', 'active'));
    }

    public function inventoryReturn()
    {
        $title = "Dashboard";
        $active = 'inventoryReturn';
        return view('backend.handy_pages.inventory_return', compact('title', 'active'));
    }

    public function order_shipment_list()
    {
        $title = "Dashboard";
        $active = 'OrderShipmentList';
        return view('backend.handy_pages.handy-order-shipment-list', compact('title', 'active'));
    }

    public function inventoryInquiry()
    {
        $title = "Dashboard";
        $active = 'inventoryentrybyhandy';
        return view('backend.handy_pages.inventory_inquiry', compact('title', 'active'));
    }

    public function mitsumury()
    {
        $title = "Mitsumury";
        $active = 'Mitsumury';
        return view('backend.handy_pages.mitsumury', compact('title', 'active'));
    }

    public function inventoryentrybyhandy()
    {
        $title = "Dashboard";
        $active = 'inventoryentrybyhandy';
        return view('backend.handy_pages.product_scan_form', compact('title', 'active'));
    }

    public function handy_vendor_master()
    {
        $title = "Dashboard";
        $active = 'handy_vendor_master';
        return view('backend.handy_pages.handy_vendor_master', compact('title', 'active'));
    }

    public function handy_customer_master()
    {
        $title = "Dashboard";
        $active = 'handy_customer_master';
        return view('backend.handy_pages.handy_customer_master', compact('title', 'active'));
    }

    public function handy_order_receive()
    {
        $title = "Dashboard";
        $active = 'handy_order_receive';
        return view('backend.handy_pages.handy_receive_order_master', compact('title', 'active'));
    }

    public function handy_order_receive_scan_jan()
    {
        $title = "Dashboard";
        $active = 'inventoryentrybyhandy';
        return view('backend.handy_pages.product_order_receive_by_jan', compact('title', 'active'));
//        return view('backend.handy_pages.ordered_product_scan_form', compact('title', 'active'));
    }

    public function handy_received_product_detail_by_jan_code(Request $request)
    {
        $jan = $request->jan_code;
        $vendor_items = vendor_item::where('jan', $jan)->first();
        if (empty($vendor_items)) {
            return response()->json(['status' => 505]);
            return Redirect::back()->withErrors(['msg' => 'このJanコードのスケジュールが見つかりません']);
        }
        $where = 'where vi_all.jan="' . $jan . '"';
        $result = collect(\DB::select("SELECT
        vi_all.*,
        vod.order_case_quantity,
        vod.order_ball_quantity,
        vod.order_unit_quantity,
        vod.order_status,
        vod.vendor_order_id
    FROM
    (
    SELECT
        vi.vendor_item_id,
        vi.cost_price,
        vi.selling_price,
        vi.created_at,
        vi.vendor_id,
        jans.name as item_name,
        jans.case_inputs,
        si.case_quantity,
        jans.ball_inputs,
        si.ball_quantity,
        si.unit_quantity,
        si.rack_number,
        jans.jan,
        vendors.name AS vendor_name,
        vi.order_point_inputs,
        vi.order_point_case_quantity,
        vi.order_point_ball_quantity,
        vi.order_point_unit_quantity,
        vi.order_point_quantity,
        vi.order_lot_inputs,
        vi.order_lot_case_quantity,
        vi.order_lot_ball_quantity,
        vi.order_lot_unit_quantity,
        vi.order_lot_quantity
    FROM
    vendor_items AS vi
    INNER JOIN vendors ON vendors.vendor_id=vi.vendor_id
    INNER JOIN jans ON vi.jan=jans.jan
    left JOIN stock_items AS si ON si.vendor_item_id= vi.vendor_item_id
    ) AS vi_all
    INNER JOIN (
SELECT vendor_orders.status as order_status,vendor_orders.vendor_order_id,vendor_orders.order_case_quantity,vendor_orders.order_ball_quantity,vendor_orders.order_unit_quantity,vendor_orders.vendor_item_id FROM `vendor_orders` where vendor_orders.status='未入荷' GROUP BY vendor_orders.vendor_item_id
    ) AS vod on vod.vendor_item_id=vi_all.vendor_item_id
    $where
    ORDER BY vi_all.vendor_item_id DESC,vi_all.vendor_name ASC,item_name ASC
    "))->first();

        if (!$result) {
            return response()->json(['status' => 501]);
            return Redirect::back()->withErrors(['msg' => 'このJanコードのスケジュールが見つかりません']);
        }

        $last_temp_rack = stock_item::join('vendor_items', 'stock_items.vendor_item_id', 'vendor_items.vendor_item_id')
            ->select('stock_items.temp_rack_number')
            ->where('vendor_items.jan', $jan)
            ->orderBy('stock_items.stock_item_id', 'desc')
            ->first();

        $get_last_order_info=vendor_order::join('vendor_items','vendor_orders.vendor_item_id','vendor_items.vendor_item_id')->leftJoin('makers','makers.maker_id','vendor_items.maker_id')->where('vendor_items.jan',$jan)->where('vendor_orders.status','入荷済み')->orderBy('vendor_orders.vendor_order_id','DESC')->first();
        $skip=0;
        $get_last_order_list=vendor_order::select('vendor_orders.*','jans.name','vendor_arrivals.car_rack_number','vendor_arrivals.quantity as arrival_qty')->join('vendor_items','vendor_orders.vendor_item_id','vendor_items.vendor_item_id')->leftJoin('makers','makers.maker_id','vendor_items.maker_id')->join('jans','jans.jan','vendor_items.jan')->join('vendor_arrivals','vendor_arrivals.vendor_order_id','vendor_orders.vendor_order_id')->where('vendor_items.jan',$jan)->where('vendor_orders.status','入荷済み')->orderBy('vendor_orders.vendor_order_id','DESC')->skip($skip)->take(10)->get();
        if(!$get_last_order_info){
            $get_last_order_info = array();
        }
        if ($last_temp_rack) {
            $temp_rack = $last_temp_rack->temp_rack_number;
        } else {
//            $last_rack = rand(pow(10, 4-1), pow(10, 4)-1);
            $temp_rack = '';
        }

        $data = ['status' => 200,'result' =>$result, 'temp_rack' => $temp_rack,'last_order_info'=>$get_last_order_info,'get_last_order_list'=>$get_last_order_list];

        return response()->json($data);


        return view('backend.handy_pages.handy_receive_order_master_new', compact('result', 'car_racks', 'a_quantity', 'temp_rack'));

    }

    public function handy_received_product_detail_by_jan_code_for_order_list(Request $request){
        $skip=$request->skip_val;
        $jan = $request->jan_code;
        $get_last_order_list=vendor_order::select('vendor_orders.*','jans.name','vendor_arrivals.car_rack_number','vendor_arrivals.quantity as arrival_qty')->join('vendor_items','vendor_orders.vendor_item_id','vendor_items.vendor_item_id')->leftJoin('makers','makers.maker_id','vendor_items.maker_id')->join('jans','jans.jan','vendor_items.jan')->join('vendor_arrivals','vendor_arrivals.vendor_order_id','vendor_orders.vendor_order_id')->where('vendor_items.jan',$jan)->where('vendor_orders.status','入荷済み')->orderBy('vendor_orders.vendor_order_id','DESC')->skip($skip)->take(10)->get();
        return response()->json(['get_last_order_list'=>$get_last_order_list]);
    }

    public function handy_order_shipment()
    {
        $title = "Dashboard";
        $active = 'handy_order_shipment';
        return view('backend.handy_pages.handy_shipment_order_master', compact('title', 'active'));
    }

    public function stock_item_rack_check(Request $request)
    {
        $rack_number = $request->self_no;
        if (stock_item::where('rack_number', $rack_number)->first()) {
            session(['rack_num' => $rack_number]);
            $value = session('rack_num');
            return $result = response()->json(['message' => '既に登録済みです', 'rack_num' => $value]);
        } else {
            session(['rack_num' => '']);
            return $result = response()->json(['message' => 'invalid_rack_code']);
        }
    }

    public function handy_order_shipment_list()
    {
        $title = "Dashboard";
        $active = 'handy_order_shipment_list';
        $data = collect(\DB::select("SELECT customer_shipments.customer_shipment_id,SUM(customer_shipments.confirm_quantity) as total_confirm_quantity,customer_shipments.inputs,customer_shipments.customer_order_detail_id,customer_order_details.customer_order_id,jans.name,jans.case_inputs,jans.ball_inputs,customer_orders.customer_id,customer_order_details.customer_item_id FROM `customer_shipments` INNER JOIN customer_order_details on customer_order_details.customer_order_detail_id= customer_shipments.customer_order_detail_id INNER JOIN customer_orders ON customer_orders.customer_order_id = customer_order_details.customer_order_id inner join jans on jans.jan = customer_order_details.jan WHERE customer_shipments.quantity=0 and customer_orders.status = '確定済み' GROUP BY customer_order_details.jan order by customer_order_details.customer_item_id desc"));
        return view('backend.handy_pages.handy_shipment_order_master_list', compact('title', 'active', 'data'));
    }

    public function handy_order_shipment_scan_sohin()
    {
        $title = "Dashboard";
        $active = 'handy_order_shipment_scan_sohin';
        return view('backend.handy_pages.shipment_product_scan_form', compact('title', 'active'));
    }

    public function handy_shipment_product_by_rack_code(Request $request)
    {
        $title = "Dashboard";
        $active = 'handy_order_shipment';
        $jan = $request->scan_by_jan_for_stock_detail;
        // $result = collect(\DB::select("SELECT customer_shipments.customer_shipment_id,SUM(customer_shipments.confirm_quantity) as total_confirm_quantity,customer_shipments.inputs,customer_shipments.customer_order_detail_id,customer_order_details.customer_order_id,jans.name,jans.case_inputs,jans.ball_inputs,customer_orders.customer_id,customer_order_details.customer_item_id FROM `customer_shipments` INNER JOIN customer_order_details on customer_order_details.customer_order_detail_id= customer_shipments.customer_order_detail_id INNER JOIN customer_orders ON customer_orders.customer_order_id = customer_order_details.customer_order_id inner join jans on jans.jan = customer_order_details.jan WHERE customer_shipments.shipment_date=CURRENT_DATE AND customer_order_details.jan = '".$jan."' and customer_orders.status = '確定済み'"))->first();
        /*
            Current shipment date  removed
        */
        $result = collect(\DB::select("SELECT customer_shipments.customer_shipment_id,SUM(customer_shipments.confirm_quantity) as total_confirm_quantity,customer_shipments.inputs,customer_shipments.customer_order_detail_id,customer_order_details.customer_order_id,jans.name,jans.case_inputs,jans.ball_inputs,customer_orders.customer_id,customer_order_details.customer_item_id FROM `customer_shipments` INNER JOIN customer_order_details on customer_order_details.customer_order_detail_id= customer_shipments.customer_order_detail_id INNER JOIN customer_orders ON customer_orders.customer_order_id = customer_order_details.customer_order_id inner join jans on jans.jan = customer_order_details.jan WHERE customer_order_details.jan = '" . $jan . "' and customer_orders.status = '確定済み'"))->first();


        if ($result->customer_shipment_id == '') {
            Session::flash('message', "この商品は、出荷予定では ありません。");
            return Redirect::back();
            // return Redirect::back()->with(['error', 'この商品は、出荷予定では ありません。']);
            // return $result = response()->json(['customer_order' => 0,'error_message'=>'この商品は、出荷予定では ありません。']);
        }

        $all_rack = collect(\DB::select("SELECT rack_number FROM `stock_items` INNER JOIN vendor_items ON vendor_items.vendor_item_id = stock_items.vendor_item_id  WHERE vendor_items.jan='" . $jan . "'"));
        return view('backend.handy_pages.handy_shipment_order_master_update_by_rack_list', compact('title', 'active', 'result', 'all_rack', 'jan'));
    }

    public function handy_order_receive_list($id = 0)
    {
        $title = "Dashboard";
        $active = 'handy_order_receive_list';
        /*$data = collect(\DB::select("(SELECT
        vo.vendor_order_id,
        v.name,
        vod.vendor_order_detail_id,
        vi.vendor_item_id,
        jans.name,
        jans.jan,
        vo.voucher_number,
        vo.`status`,
        vo.order_date,
        vo.shipment_date,
        vod.inputs,
        vod.quantity AS ordered_quantity,
        va.quantity AS received_quantity,
        va.arrival_date
        from vendor_orders AS vo
       INNER JOIN vendor_order_details AS vod ON vo.vendor_order_id=vod.vendor_order_id
       left JOIN vendor_arrivals AS va ON vod.vendor_order_detail_id= va.vendor_order_detail_id
       INNER JOIN vendor_items AS vi ON vi.vendor_item_id=vod.vendor_item_id
       INNER JOIN vendors AS v ON v.vendor_id= vo.vendor_id
       INNER JOIN jans ON vi.jan = jans.jan
       WHERE vo.`status`='未入荷'
       ORDER BY vi.vendor_item_id,vo.vendor_id,vo.order_date
       LIMIT 10000
       )
       UNION
       (
       SELECT
        vo.vendor_order_id,
        v.name,
        vod.vendor_order_detail_id,
        vi.vendor_item_id,
        jans.name,
        jans.jan,
        vo.voucher_number,
        vo.`status`,
        vo.order_date,
        vo.shipment_date,
        vod.inputs,
        vod.quantity AS ordered_quantity,
        va.quantity AS received_quantity,
        va.arrival_date
        from vendor_orders AS vo
       INNER JOIN vendor_order_details AS vod ON vo.vendor_order_id=vod.vendor_order_id
       left JOIN vendor_arrivals AS va ON vod.vendor_order_detail_id= va.vendor_order_detail_id
       INNER JOIN vendor_items AS vi ON vi.vendor_item_id=vod.vendor_item_id
       INNER JOIN vendors AS v ON v.vendor_id= vo.vendor_id
       INNER JOIN jans ON vi.jan = jans.jan
       WHERE date_format(va.arrival_date,'%Y-%m-%d') = CURRENT_DATE()
       ORDER BY vi.vendor_item_id,vo.vendor_id,vo.order_date
       LIMIT 10000)"));

       //print_r($data);exit;
       $totalrow = collect(\DB::select("(SELECT
       count(*) as total_row
        from vendor_orders AS vo
       INNER JOIN vendor_order_details AS vod ON vo.vendor_order_id=vod.vendor_order_id
       left JOIN vendor_arrivals AS va ON vod.vendor_order_detail_id= va.vendor_order_detail_id
       INNER JOIN vendor_items AS vi ON vi.vendor_item_id=vod.vendor_item_id
       INNER JOIN vendors AS v ON v.vendor_id= vo.vendor_id
       INNER JOIN jans ON vi.jan = jans.jan
       WHERE vo.`status`='未入荷' AND (va.quantity=0 OR va.quantity IS null)
       ORDER BY vo.vendor_id,vo.order_date,vi.vendor_item_id
       LIMIT 10000
       )
       UNION
       (
       SELECT
         count(*) as total_row
        from vendor_orders AS vo
       INNER JOIN vendor_order_details AS vod ON vo.vendor_order_id=vod.vendor_order_id
       left JOIN vendor_arrivals AS va ON vod.vendor_order_detail_id= va.vendor_order_detail_id
       INNER JOIN vendor_items AS vi ON vi.vendor_item_id=vod.vendor_item_id
       INNER JOIN vendors AS v ON v.vendor_id= vo.vendor_id
       INNER JOIN jans ON vi.jan = jans.jan
       WHERE date_format(va.arrival_date,'%Y-%m-%d') = CURRENT_DATE() AND (va.quantity=0 OR va.quantity IS null)
       ORDER BY vo.vendor_id,vo.order_date,vi.vendor_item_id
       LIMIT 10000)"))->first();
       $total = $totalrow->total_row;
       */
        $vendor_lsit = vendor::where('is_deleted', 0)->get();
        $where = '';
        if ($id != null) {
            if ($id > 0) {
                $where = 'where vi_all.vendor_id="' . $id . '"';
            }
        }
        $result = DB::select("SELECT
        vi_all.*,
        vod.inputs AS order_inputs,
        vod.quantity,
        vod.vendor_order_status,
        va.quantity as arraival_quantity,
        va.inputs as arrival_inputs,
        vaq.a_quantity,
        case when vaq.a_quantity IS NULL THEN vod.quantity
        ELSE
        if(vod.quantity>=vaq.a_quantity,vod.quantity-vaq.a_quantity,0)
        END as pending_order_quantity
    FROM
    (
    SELECT
        vi.vendor_item_id,
        vi.cost_price,
        vi.selling_price,
        vi.created_at,
        vi.vendor_id,
        jans.name as item_name,
        jans.case_inputs,
        si.case_quantity,
        jans.ball_inputs,
        si.ball_quantity,
        si.unit_quantity,
        si.rack_number,
        jans.jan,
        vendors.name AS vendor_name,
        vi.order_point_inputs,
        vi.order_point_quantity,
        vi.order_lot_inputs,
        vi.order_lot_quantity
    FROM
    vendor_items AS vi
    INNER JOIN vendors ON vendors.vendor_id=vi.vendor_id
    INNER JOIN jans ON vi.jan=jans.jan
    left JOIN stock_items AS si ON si.vendor_item_id= vi.vendor_item_id
    ) AS vi_all
    LEFT JOIN (
SELECT SUM(quantity) as quantity,vendor_orders.status as vendor_order_status,vendor_order_details.vendor_order_id,vendor_order_details.vendor_item_id,vendor_order_details.inputs FROM `vendor_orders` LEFT JOIN vendor_order_details on vendor_orders.vendor_order_id=vendor_order_details.vendor_order_id where vendor_orders.status='未入荷' GROUP BY vendor_order_details.vendor_item_id
    ) AS vod on vod.vendor_item_id=vi_all.vendor_item_id
    LEFT JOIN (
        SELECT SUM(vendor_arrivals.quantity) AS quantity,vendor_order_details.inputs,vendor_order_details.vendor_item_id FROM `vendor_arrivals` LEFT JOIN vendor_order_details on vendor_order_details.vendor_order_detail_id = vendor_arrivals.vendor_order_detail_id WHERE date(`vendor_arrivals`.`arrival_date`)=CURDATE() GROUP BY vendor_order_details.vendor_item_id) as va on va.vendor_item_id = vi_all.vendor_item_id
    LEFT JOIN (
        SELECT SUM(vendor_arrivals.quantity) as a_quantity, vods.vendor_item_id as vid FROM `vendor_arrivals` INNER join vendor_order_details as vods on vods.vendor_order_detail_id = vendor_arrivals.vendor_order_detail_id INNER join vendor_orders as vos on vos.vendor_order_id = vendor_arrivals.vendor_order_id where vos.status='未入荷' group by vods.vendor_item_id) as vaq on vaq.vid = vi_all.vendor_item_id
    $where
    ORDER BY vi_all.vendor_item_id DESC
    ");
        // $result = json_decode(json_encode($result, true));
        //     // $unique = array_unique($result);
        //     // $dupes = array_diff_key( $result, $unique );
        // echo '<pre>';
        //     print_r($result);exit;
        $newarr = array();
        $duplicates = array();
        $data = array();
        foreach ($result as $key => $vl) {
            //if($vl->pending_order_quantity>0){
            if (in_array($vl->jan, $newarr)) {
                $row = array_search($vl->jan, array_column($data, 'jan'));
                $data[$row]->rack_number = $vl->rack_number . ',' . $data[$row]->rack_number;
                $data[$row]->case_quantity = $vl->case_quantity + $data[$row]->case_quantity;
                $data[$row]->ball_quantity = $vl->ball_quantity + $data[$row]->ball_quantity;
                $data[$row]->unit_quantity = $vl->unit_quantity + $data[$row]->unit_quantity;
                $duplicates[] = $vl->jan;

            } else {
                $data[] = $vl;
            }
            $newarr[] = $vl->jan;
            //}
        }
        $total = count($data);
//        dd($data);
        return view('backend.handy_pages.handy_receive_order_master_list', compact('title', 'active', 'data', 'total', 'vendor_lsit'));
    }

    public function stock_details_by_handy()
    {
        $vendor_lsit = vendor::where('is_deleted', 0)->get();
        $jan_list = collect(\DB::select("SELECT vendor_items.jan FROM `stock_items` INNER JOIN vendor_items ON vendor_items.vendor_item_id = stock_items.vendor_item_id"));
        $title = "Dashboard";
        $active = 'handy_order_receive_list';
        return view('backend.handy_pages.handy_stock_details_list', compact('title', 'active', 'vendor_lsit', 'jan_list'));
    }

    public function getall_stock_items_list(Request $request)
    {
        $jan = $request->jan;
        $vendor_id = $request->vendor_id;
        $wh = '';
        if ($jan != 0 && $vendor_id != 0) {
            $wh = 'where stock_items.vendor_id="' . $vendor_id . '" and jans.jan="' . $jan . '"';
        } else {
            if ($jan != 0) {
                $wh = 'where jans.jan="' . $jan . '"';
            }
            if ($vendor_id != 0) {
                $wh = 'where stock_items.vendor_id="' . $vendor_id . '"';
            }
        }
        /*
        SELECT stock_items.rack_number,(stock_items.case_quantity*jans.case_inputs+stock_items.ball_quantity*jans.ball_inputs+stock_items.unit_quantity*1) as t_qty,jans.jan,jans.name FROM `stock_items` INNER JOIN vendor_items ON vendor_items.vendor_item_id = stock_items.vendor_item_id INNER JOIN jans ON jans.jan = vendor_items.jan order by stock_items.updated_at DESC
        */
        $stock_details_list = collect(\DB::select("SELECT
        (CASE WHEN stock_items.case_quantity !=0 THEN jans.case_inputs*stock_items.case_quantity ELSE 0 END+
        CASE WHEN stock_items.ball_quantity !=0 THEN jans.ball_inputs*stock_items.ball_quantity ELSE 0 END+
        CASE WHEN stock_items.unit_quantity !=0 THEN 1*stock_items.unit_quantity ELSE 0 END) as t_qty,
        stock_items.rack_number,jans.jan,jans.name FROM `vendor_items` LEFT JOIN stock_items ON vendor_items.vendor_item_id = stock_items.vendor_item_id INNER JOIN jans ON jans.jan = vendor_items.jan $wh GROUP BY stock_items.rack_number,stock_items.vendor_item_id order by stock_items.updated_at DESC,vendor_items.vendor_id ASC,vendor_items.jan ASC"));

        $totals = count($stock_details_list);
        return $result = response()->json(['items' => $stock_details_list, 'total_rw' => $totals]);
    }

    public function getall_receiveable_items_list(Request $request)
    {
        $id = $request->vendor_id;
        /*$wh = '';
        if($vendor_id!=0){
            $wh = ' and v.vendor_id='.$vendor_id;
        }

        $title = "Dashboard";
        $active = 'handy_order_receive_list';
        $data = collect(\DB::select("(SELECT
        vo.vendor_order_id,
        v.name,
        vod.vendor_order_detail_id,
        vi.vendor_item_id,
        jans.name,
        jans.jan,
        vo.voucher_number,
        vo.`status`,
        vo.order_date,
        vo.shipment_date,
        vod.inputs,
        vod.quantity AS ordered_quantity,
        va.quantity AS received_quantity,
        va.arrival_date
        from vendor_orders AS vo
       INNER JOIN vendor_order_details AS vod ON vo.vendor_order_id=vod.vendor_order_id
       left JOIN vendor_arrivals AS va ON vod.vendor_order_detail_id= va.vendor_order_detail_id
       INNER JOIN vendor_items AS vi ON vi.vendor_item_id=vod.vendor_item_id
       INNER JOIN vendors AS v ON v.vendor_id= vo.vendor_id
       INNER JOIN jans ON vi.jan = jans.jan
       WHERE vo.`status`='未入荷' $wh
       ORDER BY vo.vendor_id,vo.order_date,vi.vendor_item_id
       LIMIT 10000
       )
       UNION
       (
       SELECT
        vo.vendor_order_id,
        v.name,
        vod.vendor_order_detail_id,
        vi.vendor_item_id,
        jans.name,
        jans.jan,
        vo.voucher_number,
        vo.`status`,
        vo.order_date,
        vo.shipment_date,
        vod.inputs,
        vod.quantity AS ordered_quantity,
        va.quantity AS received_quantity,
        va.arrival_date
        from vendor_orders AS vo
       INNER JOIN vendor_order_details AS vod ON vo.vendor_order_id=vod.vendor_order_id
       left JOIN vendor_arrivals AS va ON vod.vendor_order_detail_id= va.vendor_order_detail_id
       INNER JOIN vendor_items AS vi ON vi.vendor_item_id=vod.vendor_item_id
       INNER JOIN vendors AS v ON v.vendor_id= vo.vendor_id
       INNER JOIN jans ON vi.jan = jans.jan
       WHERE date_format(va.arrival_date,'%Y-%m-%d') = CURRENT_DATE() $wh
       ORDER BY vo.vendor_id,vo.order_date,vi.vendor_item_id
       LIMIT 10000)"));
       $total_row = collect(\DB::select("(SELECT
       count(*) as total_row
        from vendor_orders AS vo
       INNER JOIN vendor_order_details AS vod ON vo.vendor_order_id=vod.vendor_order_id
       left JOIN vendor_arrivals AS va ON vod.vendor_order_detail_id= va.vendor_order_detail_id
       INNER JOIN vendor_items AS vi ON vi.vendor_item_id=vod.vendor_item_id
       INNER JOIN vendors AS v ON v.vendor_id= vo.vendor_id
       INNER JOIN jans ON vi.jan = jans.jan
       WHERE vo.`status`='未入荷' AND (va.quantity=0 OR va.quantity IS null) $wh
       ORDER BY vo.vendor_id,vo.order_date,vi.vendor_item_id
       LIMIT 10000
       )
       UNION
       (
       SELECT
         count(*) as total_row
        from vendor_orders AS vo
       INNER JOIN vendor_order_details AS vod ON vo.vendor_order_id=vod.vendor_order_id
       left JOIN vendor_arrivals AS va ON vod.vendor_order_detail_id= va.vendor_order_detail_id
       INNER JOIN vendor_items AS vi ON vi.vendor_item_id=vod.vendor_item_id
       INNER JOIN vendors AS v ON v.vendor_id= vo.vendor_id
       INNER JOIN jans ON vi.jan = jans.jan
       WHERE date_format(va.arrival_date,'%Y-%m-%d') = CURRENT_DATE() AND (va.quantity=0 OR va.quantity IS null) $wh
       ORDER BY vo.vendor_id,vo.order_date,vi.vendor_item_id
       LIMIT 10000)"))->first();
       */
        $where = '';
        if ($id != null) {
            if ($id > 0) {
                $where = 'where vi_all.vendor_id="' . $id . '"';
            }
        }
        $result = DB::select("SELECT
        vi_all.*,
        vod.inputs AS order_inputs,
        vod.quantity,
        vod.vendor_order_status,
        va.quantity as arraival_quantity,
        va.inputs as arrival_inputs,
        vaq.a_quantity,
        case when vaq.a_quantity IS NULL THEN vod.quantity
        ELSE
        if(vod.quantity>=vaq.a_quantity,vod.quantity-vaq.a_quantity,0)
        END as pending_order_quantity
    FROM
    (
    SELECT
        vi.vendor_item_id,
        vi.cost_price,
        vi.selling_price,
        vi.created_at,
        vi.vendor_id,
        jans.name as item_name,
        jans.case_inputs,
        si.case_quantity,
        jans.ball_inputs,
        si.ball_quantity,
        si.unit_quantity,
        si.rack_number,
        jans.jan,
        vendors.name AS vendor_name,
        vi.order_point_inputs,
        vi.order_point_quantity,
        vi.order_lot_inputs,
        vi.order_lot_quantity
    FROM
    vendor_items AS vi
    INNER JOIN vendors ON vendors.vendor_id=vi.vendor_id
    INNER JOIN jans ON vi.jan=jans.jan
    left JOIN stock_items AS si ON si.vendor_item_id= vi.vendor_item_id
    ) AS vi_all
    LEFT JOIN (
SELECT SUM(quantity) as quantity,vendor_orders.status as vendor_order_status,vendor_order_details.vendor_order_id,vendor_order_details.vendor_item_id,vendor_order_details.inputs FROM `vendor_orders` LEFT JOIN vendor_order_details on vendor_orders.vendor_order_id=vendor_order_details.vendor_order_id where vendor_orders.status='未入荷' GROUP BY vendor_order_details.vendor_item_id
    ) AS vod on vod.vendor_item_id=vi_all.vendor_item_id
    LEFT JOIN (
        SELECT SUM(vendor_arrivals.quantity) AS quantity,vendor_order_details.inputs,vendor_order_details.vendor_item_id FROM `vendor_arrivals` LEFT JOIN vendor_order_details on vendor_order_details.vendor_order_detail_id = vendor_arrivals.vendor_order_detail_id WHERE date(`vendor_arrivals`.`arrival_date`)=CURDATE() GROUP BY vendor_order_details.vendor_item_id) as va on va.vendor_item_id = vi_all.vendor_item_id
    LEFT JOIN (
        SELECT SUM(vendor_arrivals.quantity) as a_quantity, vods.vendor_item_id as vid FROM `vendor_arrivals` INNER join vendor_order_details as vods on vods.vendor_order_detail_id = vendor_arrivals.vendor_order_detail_id INNER join vendor_orders as vos on vos.vendor_order_id = vendor_arrivals.vendor_order_id where vos.status='未入荷' group by vods.vendor_item_id) as vaq on vaq.vid = vi_all.vendor_item_id
    $where
    ORDER BY quantity DESC,vi_all.vendor_name ASC,item_name ASC
    ");
        $newarr = array();
        $duplicates = array();
        $data = array();
        foreach ($result as $key => $vl) {
            if ($vl->pending_order_quantity > 0) {
                if (in_array($vl->jan, $newarr)) {
                    $row = array_search($vl->jan, array_column($data, 'jan'));
                    $data[$row]->rack_number = $vl->rack_number . ',' . $data[$row]->rack_number;
                    $data[$row]->case_quantity = $vl->case_quantity + $data[$row]->case_quantity;
                    $data[$row]->ball_quantity = $vl->ball_quantity + $data[$row]->ball_quantity;
                    $data[$row]->unit_quantity = $vl->unit_quantity + $data[$row]->unit_quantity;
                    $duplicates[] = $vl->jan;

                } else {
                    $data[] = $vl;
                }
                $newarr[] = $vl->jan;
            }
        }
        $totals = count($data);
        return $result = response()->json(['items' => $data, 'total_rw' => $totals]);
    }

    public function handy_stock()
    {
        $title = "Dashboard";
        $active = 'handy_stock';
        return view('backend.handy_pages.handy_stock_inventory', compact('title', 'active'));
    }

    public function handy_stock_update_scan_product()
    {
        $title = "Dashboard";
        $active = 'handy_stock';
        return view('backend.handy_pages.handy_stock_update_scan_product', compact('title', 'active'));
    }

    public function handyStockProduct()
    {
        $title = "Dashboard";
        $active = 'handy_stock';
        return view('backend.handy_pages.handy_stock_update_product', compact('title', 'active'));
    }

    public function handy_stock_product_store_rack_code(Request $request)
    {
        $title = "Dashboard";
        $active = 'handy_stock';
        $jan = $request->scan_by_jan_for_stock_detail;
        if (!vendor_item::where('jan', $jan)->first()) {
            Session::flash('message', "ベンダーマスターからjanを挿入してください");
            return Redirect::back();
        }
        $where = '';
        if ($jan != '') {
            $where = 'where vi_all.jan="' . $jan . '" AND LENGTH(vi_all.rack_number) = 3 group by vi_all.rack_number,vi_all.vendor_item_id';

        }
        $result = DB::select("SELECT
        vi_all.*
    FROM
    (
    SELECT
        vi.vendor_item_id,
        vi.cost_price,
        vi.selling_price,
        vi.created_at,
        vi.vendor_id,
        jans.name as item_name,
        jans.case_inputs,
        si.stock_item_id,
        si.case_quantity,
        jans.ball_inputs,
        si.ball_quantity,
        si.unit_quantity,
        si.rack_number,
        jans.jan,
        vendors.name AS vendor_name,
        vi.order_point_inputs,
        vi.order_point_case_quantity,
        vi.order_point_ball_quantity,
        vi.order_point_unit_quantity,
        vi.order_point_quantity,
        vi.order_lot_inputs,
        vi.order_lot_case_quantity,
        vi.order_lot_ball_quantity,
        vi.order_lot_unit_quantity,
        vi.order_lot_quantity
    FROM
    vendor_items AS vi
    INNER JOIN vendors ON vendors.vendor_id=vi.vendor_id
    INNER JOIN jans ON vi.jan=jans.jan
    INNER JOIN stock_items AS si ON si.vendor_item_id= vi.vendor_item_id
    ) AS vi_all
    $where
    ORDER BY vi_all.vendor_item_id DESC,vi_all.vendor_name ASC,item_name ASC
    ");
        $total_jaiko = collect(\DB::select("SELECT
    (jans.case_inputs*SUM(stock_items.case_quantity)+
        jans.ball_inputs*SUM(stock_items.ball_quantity)+
        1*SUM(stock_items.unit_quantity)) as t_qty
     from stock_items inner join vendor_items on vendor_items.vendor_item_id = stock_items.vendor_item_id inner join jans on jans.jan = vendor_items.jan where vendor_items.jan = '" . $jan . "'"))->first();
        $total_jaikos_stock = 0;
        if ($total_jaiko) {
            $total_jaikos_stock = $total_jaiko->t_qty;
        }
        $all_rack = collect(\DB::select("SELECT rack_number FROM `stock_items` INNER JOIN vendor_items ON vendor_items.vendor_item_id = stock_items.vendor_item_id  WHERE vendor_items.jan='" . $jan . "'"));
        $last_rack = stock_item::join('vendor_items', 'stock_items.vendor_item_id', 'vendor_items.vendor_item_id')
            ->select('stock_items.rack_number')
            ->where('vendor_items.jan', $jan)
            ->whereRaw('LENGTH(stock_items.rack_number) > 3')
            ->orderBy('stock_items.stock_item_id', 'desc')
            ->first();

        if ($last_rack) {
            $last_rack = $last_rack->rack_number;
        } else {
//            $last_rack = rand(pow(10, 4-1), pow(10, 4)-1);
            $last_rack = null;
        }
        return response()->json([
            'title'=> $title,
            'active'=> $active,
            'result'=> $result,
            'total_jaikos_stock'=> $total_jaikos_stock,
            'all_rack'=> $all_rack,
            'jan'=> $jan,
            'last_rack'=> $last_rack
        ]);

        if (count($result) <= 0) {
            Session::flash('message', "ベンダーマスターからjanを挿入してください");
            return Redirect::back();
        }
//        return view('backend.handy_pages.handy_stock_inventory_by_tana', compact('title', 'active', 'result', 'total_jaikos_stock', 'all_rack', 'jan'));
        return view('backend.handy_pages.handy_stock_inventory_by_tana', compact('title', 'active', 'result', 'total_jaikos_stock', 'all_rack', 'jan', 'last_rack'));
    }

    public function handy_stock_detail_by_rack()
    {
        $title = "Dashboard";
        $active = 'handy_stock';
        return view('backend.handy_pages.handy_stock_inventory_by_reck', compact('title', 'active'));
    }

    public function handy_stock_detail_by_jan_code(Request $request)
    {
        $title = "Dashboard";
        $active = 'handy_stock';
        $jan = $request->scan_by_jan_for_stock_detail;
        if (!vendor_item::where('jan', $jan)->first()) {
            Session::flash('message', "ベンダーマスターからjanを挿入してください");
            return Redirect::back();
        }
        $where = '';
        if ($jan != '') {
            $where = 'where vi_all.jan="' . $jan . '"';

        }
        $result = DB::select("SELECT
        vi_all.*,
        vod.inputs AS order_inputs,
        vod.quantity,
        vod.vendor_order_status,
        va.quantity as arraival_quantity,
        va.inputs as arrival_inputs,
        vaq.a_quantity,
        case when vaq.a_quantity IS NULL THEN vod.quantity
        ELSE
        if(vod.quantity>=vaq.a_quantity,vod.quantity-vaq.a_quantity,0)
        END as pending_order_quantity
    FROM
    (
    SELECT
        vi.vendor_item_id,
        vi.cost_price,
        vi.selling_price,
        vi.created_at,
        vi.vendor_id,
        jans.name as item_name,
        jans.case_inputs,
        si.case_quantity,
        jans.ball_inputs,
        si.stock_item_id,
        si.ball_quantity,
        si.unit_quantity,
        si.rack_number,
        jans.jan,
        vendors.name AS vendor_name,
        vi.order_point_inputs,
        vi.order_point_quantity,
        vi.order_lot_inputs,
        vi.order_lot_quantity
    FROM
    vendor_items AS vi
    INNER JOIN vendors ON vendors.vendor_id=vi.vendor_id
    INNER JOIN jans ON vi.jan=jans.jan
    left JOIN stock_items AS si ON si.vendor_item_id= vi.vendor_item_id
    ) AS vi_all
    LEFT JOIN (
SELECT SUM(quantity) as quantity,vendor_orders.status as vendor_order_status,vendor_order_details.vendor_order_id,vendor_order_details.vendor_item_id,vendor_order_details.inputs FROM `vendor_orders` LEFT JOIN vendor_order_details on vendor_orders.vendor_order_id=vendor_order_details.vendor_order_id where vendor_orders.status='未入荷' GROUP BY vendor_order_details.vendor_item_id
    ) AS vod on vod.vendor_item_id=vi_all.vendor_item_id
    LEFT JOIN (
        SELECT SUM(vendor_arrivals.quantity) AS quantity,vendor_order_details.inputs,vendor_order_details.vendor_item_id FROM `vendor_arrivals` LEFT JOIN vendor_order_details on vendor_order_details.vendor_order_detail_id = vendor_arrivals.vendor_order_detail_id WHERE date(`vendor_arrivals`.`arrival_date`)=CURDATE() GROUP BY vendor_order_details.vendor_item_id) as va on va.vendor_item_id = vi_all.vendor_item_id
    LEFT JOIN (
        SELECT SUM(vendor_arrivals.quantity) as a_quantity, vods.vendor_item_id as vid FROM `vendor_arrivals` INNER join vendor_order_details as vods on vods.vendor_order_detail_id = vendor_arrivals.vendor_order_detail_id INNER join vendor_orders as vos on vos.vendor_order_id = vendor_arrivals.vendor_order_id where vos.status='未入荷' group by vods.vendor_item_id) as vaq on vaq.vid = vi_all.vendor_item_id
    $where
    ORDER BY vi_all.vendor_item_id DESC,quantity DESC,vi_all.vendor_name ASC,item_name ASC
    ");
        $total_jaiko = collect(\DB::select("SELECT
        (jans.case_inputs*SUM(stock_items.case_quantity)+
            jans.ball_inputs*SUM(stock_items.ball_quantity)+
            1*SUM(stock_items.unit_quantity)) as t_qty
         from stock_items inner join vendor_items on vendor_items.vendor_item_id = stock_items.vendor_item_id inner join jans on jans.jan = vendor_items.jan where vendor_items.jan = '" . $jan . "'"))->first();
        $total_jaikos_stock = 0;
        if ($total_jaiko) {
            $total_jaikos_stock = $total_jaiko->t_qty;
        }
        //     dd($result);
        return view('backend.handy_pages.handy_stock_inventory_by_jan_code', compact('title', 'active', 'result', 'total_jaikos_stock'));
    }

    // Oni 26.01.2021
    public function handy_stock_detail_get_by_jan_code($jan)
    {
        $active = 'handy_stock';
        if (!vendor_item::where('jan', $jan)->first()) {
            return response()->json(['status' => 400, 'status_code' => 400,'message' => "ベンダーマスターからjanを挿入してください"]);
        }
        $where = '';
        if ($jan != '') {
            $where = 'where vi_all.jan="' . $jan . '"';

        }
        // add left join
        $result = DB::select("SELECT
        vi_all.*,
        va.today_case_arrival_qty,
        va.today_ball_arrival_qty,
        va.today_unit_arrival_qty,
        vod.order_case_quantity,
        vod.order_ball_quantity,
        vod.order_unit_quantity
    FROM
    (
    SELECT
        vi.vendor_item_id,
        vi.cost_price,
        vi.selling_price,
        vi.created_at,
        vi.vendor_id,
        jans.name as item_name,
        jans.case_inputs,
        si.case_quantity,
        jans.ball_inputs,
        si.stock_item_id,
        si.ball_quantity,
        si.unit_quantity,
        si.rack_number,
        jans.jan,
        vendors.name AS vendor_name,
        vi.order_point_inputs,
        vi.order_point_case_quantity,
        vi.order_point_ball_quantity,
        vi.order_point_unit_quantity,
        vi.order_point_quantity,
        vi.order_lot_inputs,
        vi.order_lot_case_quantity,
        vi.order_lot_ball_quantity,
        vi.order_lot_unit_quantity,
        vi.order_lot_quantity,
        vi.maker_id,
        vi.gross_profit_margin as profit_margin
    FROM
    vendor_items AS vi
    LEFT JOIN vendors ON vendors.vendor_id=vi.vendor_id
    LEFT JOIN jans ON vi.jan=jans.jan
    left JOIN stock_items AS si ON si.vendor_item_id= vi.vendor_item_id
    ) AS vi_all
    LEFT JOIN (
SELECT vendor_orders.order_case_quantity,vendor_orders.order_ball_quantity,vendor_orders.order_unit_quantity,vendor_orders.vendor_item_id FROM `vendor_orders` GROUP BY vendor_orders.vendor_item_id
    ) AS vod on vod.vendor_item_id=vi_all.vendor_item_id
    LEFT JOIN (
        SELECT SUM(vendor_arrivals.arrival_case_quantity) as today_case_arrival_qty,SUM(vendor_arrivals.arrival_ball_quantity) as today_ball_arrival_qty,SUM(vendor_arrivals.arrival_unit_quantity) as today_unit_arrival_qty,vendor_orders.vendor_item_id FROM `vendor_arrivals` INNER JOIN vendor_orders on vendor_orders.vendor_order_id = vendor_arrivals.vendor_order_id WHERE date(`vendor_arrivals`.`arrival_date`)=CURDATE() GROUP BY vendor_orders.vendor_item_id) as va on va.vendor_item_id = vi_all.vendor_item_id
    $where
    GROUP BY vi_all.rack_number
    ORDER BY vi_all.vendor_item_id DESC,vi_all.vendor_name ASC,item_name ASC
    ");
        $total_jaiko = collect(\DB::select("SELECT
        (jans.case_inputs*SUM(stock_items.case_quantity)+
            jans.ball_inputs*SUM(stock_items.ball_quantity)+
            1*SUM(stock_items.unit_quantity)) as t_qty
         from stock_items inner join vendor_items on vendor_items.vendor_item_id = stock_items.vendor_item_id inner join jans on jans.jan = vendor_items.jan where vendor_items.jan = '" . $jan . "'"))->first();
        $total_jaikos_stock = 0;
        if ($total_jaiko) {
            $total_jaikos_stock = $total_jaiko->t_qty;
        }
        if ($result == null) {
            return response()->json(['status' => 400,'status_code' => 400, 'message' => "ベンダーマスターからjanを挿入してください"]);
        }
        $title = "";
        $view = view('backend.handy_pages.handy_stock_inventory_get_by_jan_code', compact('title', 'active', 'result', 'total_jaikos_stock'))->render();
        return response()->json(['status' => 200, 'status_code' => 200, 'view' => $view,'result'=>$result]);


        return view('backend.handy_pages.handy_stock_inventory_by_jan_code', compact('title', 'active', 'result', 'total_jaikos_stock'));
    }

    public function handy_get_last_order_by_jan_code($jan){
        if (!vendor_item::where('jan', $jan)->first()) {
            return response()->json(['status' => 400, 'message' => "ベンダーマスターからjanを挿入してください"]);
        }
        $result = vendor_arrival::select('jans.name as item_name','jans.case_inputs','jans.ball_inputs','vendor_orders.status','vendor_orders.unit_cost_price','vendor_orders.vendor_item_id','vendor_arrivals.*','stock_items.rack_number','stock_items.temp_rack_number')
        ->join('vendor_orders','vendor_orders.vendor_order_id','=','vendor_arrivals.vendor_order_id')
        ->join('vendor_items','vendor_items.vendor_item_id','=','vendor_orders.vendor_item_id')
        ->join('jans','jans.jan','=','vendor_items.jan')
        ->join('stock_items','stock_items.vendor_item_id','=','vendor_orders.vendor_item_id')
        ->where(['vendor_orders.status'=>'入荷済み','vendor_items.jan'=>$jan])
        ->orderBy('vendor_arrivals.vendor_order_id','desc')
        ->skip(0)
        ->take('1')
        ->get();
        if ($result == null) {
            return response()->json(['status' => 400, 'message' => "ベンダーマスターからjanを挿入してください"]);
        }
        return response()->json(['status' => 200, 'result'=>$result]);
    }

    public function handy_quotation()
    {
        $title = "Dashboard";
        $active = 'handy_quotation';
        return view('backend.handy_pages.handy_quotation_master', compact('title', 'active'));
    }

    public function handy_store_order()
    {
        $title = "Dashboard";
        $active = 'handy_store_order';
        return view('backend.handy_pages.product_order_place_by_jan', compact('title', 'active'));
//        return view('backend.handy_pages.handy_store_order', compact('title', 'active'));
    }

    public function handy_kouri_order()
    {
        $title = "Dashboard";
        $active = 'handy_kouri_order';
        return view('backend.handy_pages.kouri_order_place_by_jan', compact('title', 'active'));
//        return view('backend.handy_pages.handy_store_order', compact('title', 'active'));
    }

    public function inventoryentrybyjancode()
    {
        $title = "Dashboard";
        $active = 'inventoryentrybyjancode';
        return view('backend.handy_pages.product_jan_form', compact('title', 'active'));
    }

    public function product_add_handy()
    {
        $title = "Dashboard";
        $active = 'productaddhandy';
        return view('backend.handy_pages.product_add_form', compact('title', 'active'));
    }

    public function stock_inventory_update_rack(Request $request)
    {
        $stock_item_id = $request->stock_item_id;
        $case_quantity = $request->case_quantity;
        $ball_quantity = $request->ball_quantity;
        $unit_quantity = $request->unit_quantity;
        $rack_number = $request->rack_number;
        $vendor_item_id = $request->vendor_item_id;
        $vendor_id = $request->vendor_id;
        if (stock_item::where('vendor_item_id', $vendor_item_id)->where('rack_number', $rack_number)->first()) {
            $stock_info = stock_item::where('vendor_item_id', $vendor_item_id)->where('rack_number', $rack_number)->first();
            $stock_update_array = array(
                'case_quantity' => $case_quantity + $stock_info->case_quantity,
                'ball_quantity' => $ball_quantity + $stock_info->ball_quantity,
                'unit_quantity' => $unit_quantity + $stock_info->unit_quantity
            );
            stock_item::where('vendor_item_id', $vendor_item_id)->where('rack_number', $rack_number)->update($stock_update_array);
            stock_item::where('stock_item_id', $stock_item_id)->delete();
            return $result = response()->json(['message' => 'success', 'stock_item_id' => $stock_info->stock_item_id]);
        } else {
            $case_quantity = ($case_quantity != '' ? $case_quantity : 0);
            $ball_quantity = ($ball_quantity != '' ? $ball_quantity : 0);
            $unit_quantity = ($unit_quantity != '' ? $unit_quantity : 0);
            $insarray = array(
                'rack_number' => $rack_number,
                'vendor_item_id' => $vendor_item_id,
                'vendor_id' => $vendor_id,
                'case_quantity' => $case_quantity,
                'ball_quantity' => $ball_quantity,
                'unit_quantity' => $unit_quantity
            );
            stock_item::where('stock_item_id', $stock_item_id)->delete();
            $stock_item_id = stock_item::insertGetId($insarray);

            return $result = response()->json(['message' => 'success', 'stock_item_id' => $stock_item_id]);

        }

    }

    // oni 10.02.2021
    public function stock_inventory_update_rack_multiple(Request $request)
    {
        $datas = $request->data;
        $stock_item_id = '';

        foreach ($datas as $data) {
            $stock_item_id = $data['stock_item_id'];
            $case_quantity = $data['case_quantity'];
            $ball_quantity = $data['ball_quantity'];
            $unit_quantity = $data['unit_quantity'];
            $rack_number = $data['rack_number'];
            $vendor_item_id = $data['vendor_item_id'];
            $vendor_id = $data['vendor_id'];

            $last_temp_rack = stock_item::select('stock_items.temp_rack_number')
                ->where('vendor_item_id', $vendor_item_id)
                ->orderBy('stock_items.stock_item_id', 'desc')
                ->first();

            if (stock_item::where('vendor_item_id', $vendor_item_id)->where('rack_number', $rack_number)->first()) {
                $stock_info = stock_item::where('vendor_item_id', $vendor_item_id)->where('rack_number', $rack_number)->first();
                $stock_update_array = array(
                    'case_quantity' => $case_quantity + $stock_info->case_quantity,
                    'ball_quantity' => $ball_quantity + $stock_info->ball_quantity,
                    'unit_quantity' => $unit_quantity + $stock_info->unit_quantity,
                    'temp_rack_number' => $last_temp_rack->temp_rack_number
                );
                stock_item::where('vendor_item_id', $vendor_item_id)->where('rack_number', $rack_number)->update($stock_update_array);
                stock_item::where('stock_item_id', $stock_item_id)->delete();

                $stock_item_id = $stock_info->stock_item_id;

            } else {

                $case_quantity = ($case_quantity != '' ? $case_quantity : 0);
                $ball_quantity = ($ball_quantity != '' ? $ball_quantity : 0);
                $unit_quantity = ($unit_quantity != '' ? $unit_quantity : 0);
                $insarray = [
                    'rack_number' => $rack_number,
                    'temp_rack_number' => $last_temp_rack->temp_rack_number,
                    'vendor_item_id' => $vendor_item_id,
                    'vendor_id' => $vendor_id,
                    'case_quantity' => $case_quantity,
                    'ball_quantity' => $ball_quantity,
                    'unit_quantity' => $unit_quantity
                ];
//                dd($insarray);
                stock_item::where('stock_item_id', $stock_item_id)->delete();
                $stock_item_id = stock_item::insertGetId($insarray);
            }
        }
        return $result = response()->json(['message' => 'success', 'stock_item_id' => $stock_item_id]);

    }

    public function stockproductinfo()
    {
        $title = "Dashboard";
        $active = 'productaddhandy';
        return view('backend.handy_pages.product_search_info', compact('title', 'active'));
    }

    public function get_stock_info_by_jans(Request $request)
    {
        $jan = $request->jan;
        $rack_number = session('rack_num');
        $vendor_items = vendor_item::where('jan', $jan)->first();
        if (empty($vendor_items)) {
            return $result = response()->json(['api_data' => '', 'error_message' => '商品の登録がありません。']);
        }
        $resutl = collect(\DB::select("SELECT jans.*,stock_items.* from stock_items inner join vendor_items on vendor_items.vendor_item_id = stock_items.vendor_item_id inner join jans on jans.jan = vendor_items.jan where vendor_items.jan = '" . $jan . "' and stock_items.rack_number='" . $rack_number . "'"))->first();
        if (!empty($resutl)) {
            return $results = response()->json(['api_data' => $resutl]);
        } else {
            $resutl = array();
            return $results = response()->json(['api_data' => '', 'error_message' => '']);
        }


    }

    public function get_stock_info_by_jans_and_rack_code(Request $request)
    {
        $jan = $request->jan;
        $rack_code = $request->rack_code;

        $rack_number = session('rack_num');
        $wh = '';
        if ($rack_number != '' && $rack_code == '') {
            $wh = ' and stock_items.rack_number="' . $rack_number . '"';
        }

        $vendor_items = vendor_item::where('jan', $jan)->first();
        $invalid_rack = 0;
        $resutl = array();
        if (empty($vendor_items)) {
            return $result = response()->json(['api_data' => '', 'error_message' => '商品の登録がありません。']);
        }
        $resutl = collect(\DB::select("SELECT jans.*,stock_items.* from stock_items inner join vendor_items on vendor_items.vendor_item_id = stock_items.vendor_item_id inner join jans on jans.jan = vendor_items.jan where vendor_items.jan = '" . $jan . "' $wh"))->first();
        // echo "SELECT jans.*,stock_items.* from stock_items inner join vendor_items on vendor_items.vendor_item_id = stock_items.vendor_item_id inner join jans on jans.jan = vendor_items.jan where vendor_items.jan = '" . $jan . "' $wh";exit;
        if (!empty($resutl)) {

            if ($rack_code != '') {
                if ($resutl->rack_number != '') {
                    if ($resutl->rack_number != $rack_code) {
                        $invalid_rack = 1;
                    }
                } else {
                    stock_item::where('stock_item_id', $resutl->stock_item_id)->update(['rack_number' => $rack_code]);
                }
            }

            return $results = response()->json(['api_data' => $resutl, 'invalid_rack' => $invalid_rack]);
        } else {

            return $results = response()->json(['api_data' => '', 'error_message' => '', 'invalid_rack' => $invalid_rack]);
        }


    }

    public function handy_product_list()
    {
        $title = "Dashboard";
        $active = 'handyproductlist';
        $vendor_order_list = DB::select("SELECT
  vendors.NAME,
    jans.NAME AS item_name,
    vod.inputs AS order_inputs,
    case when vod.inputs = 'case' then jans.case_inputs
        when vod.inputs = 'ball' then jans.ball_inputs
        when vod.inputs = 'unit' then 1
    END AS inputs,
    vod.quantity
FROM
vendor_orders AS vo
LEFT JOIN vendor_order_details AS vod ON vod.vendor_order_id=vo.vendor_order_id
INNER JOIN vendor_items AS vi ON vod.vendor_item_id=vi.vendor_item_id
INNER JOIN jans ON vi.jan = jans.jan
INNER JOIN vendors ON vo.vendor_id=vendors.vendor_id
WHERE vo.voucher_number = ''");
        return view('backend.handy_pages.product_list_handy', compact('title', 'active', 'vendor_order_list'));
    }

    public function vendor_order_list_by_voucher_number(Request $request)
    {
        $title = "Dashboard";
        $active = 'handyproductlist';
        $voucher_num = $request->voucher_numer;
        $vendor_order_list = DB::select("SELECT
  vendors.NAME,
  vendors.vendor_id,
    jans.NAME AS item_name,
    vod.inputs AS order_inputs,
    case when vod.inputs = 'ケース' then jans.case_inputs
        when vod.inputs = 'ボール' then jans.ball_inputs
        when vod.inputs = 'バラ' then 1
    END AS inputs,
    vod.quantity
FROM
vendor_orders AS vo
LEFT JOIN vendor_order_details AS vod ON vod.vendor_order_id=vo.vendor_order_id
INNER JOIN vendor_items AS vi ON vod.vendor_item_id=vi.vendor_item_id
INNER JOIN jans ON vi.jan = jans.jan
INNER JOIN vendors ON vo.vendor_id=vendors.vendor_id
WHERE vo.voucher_number = '" . $voucher_num . "' and vo.status = '未入荷'");
        return $result = response()->json(['all_vendor_order' => $vendor_order_list]);

    }

    public function get_customer_order_by_voucer(Request $request)
    {
        $title = "Dashboard";
        $active = 'handyproductlist';
        $voucher_num = $request->voucher_number;
        $handy_flag = $request->status;
        $wh = '';
        if ($handy_flag == 0) {
            $wh = ' and co.status="未出荷"';
        }

        $customer_order_list = DB::select("SELECT
    c.NAME AS customer_name,
    co.voucher_number,
    co.customer_order_id,
    co.customer_id,
    jans.NAME as jan_name,
    si.rack_number,
    cod.inputs,
    cod.quantity
FROM customer_orders AS co
LEFT JOIN customer_order_details AS cod ON co.customer_order_id= cod.customer_order_id
INNER JOIN customers AS c ON c.customer_id = co.customer_id
INNER JOIN jans ON cod.jan=jans.jan
INNER JOIN vendor_items AS vi ON vi.jan=jans.jan
LEFT JOIN stock_items AS si ON si.vendor_item_id= vi.vendor_item_id
WHERE DATE(co.shipment_date) = CURDATE()
    AND co.shipment_number = '" . $voucher_num . "' $wh");


        $upd = array('status' => '出荷中');
        if ($handy_flag == 1) {
            $dates = date('Y-m-d');
            customer_order::where(['shipment_number' => $voucher_num, 'shipment_date' => $dates])->update($upd);
            return $result = response()->json(['message' => 'success']);
        }
        return $result = response()->json(['all_customer_order' => $customer_order_list]);

    }

    public function get_shipment_order_info(Request $request)
    {
        $shipment_number = $request->shipment_number;
        $jcode = $request->jcode;
        $customer_id = $request->customer_id;
        $shipment_order_list = collect(\DB::select("SELECT jans.name,customer_orders.customer_order_id,customer_orders.customer_id,customer_order_details.inputs from customer_orders left join customer_order_details on customer_orders.customer_order_id=customer_order_details.customer_order_id inner join jans on jans.jan = customer_order_details.jan where customer_orders.shipment_number = '" . $shipment_number . "' and customer_order_details.jan = '" . $jcode . "'"))->first();
        $stock_info = collect(\DB::select("select * from jans inner join vendor_items on jans.jan=vendor_items.jan inner join stock_items on vendor_items.vendor_item_id = stock_items.vendor_item_id where jans.jan = '" . $jcode . "'"))->first();

        if ($shipment_order_list) {
            return $result = response()->json(['all_customer_order_shipment' => $shipment_order_list, 'stock_info' => $stock_info]);

        } else {
            return $result = response()->json(['all_customer_order_shipment' => 'customer_not_found']);

        }


    }

    public function shipment_arival_insert_handy_shipmentorder(Request $request)
    {
        //print_r($request->all());
        //exit;
        $jan_code = $request->jan_code;
        $c_quantity = $request->c_quantity;
        $customer_id = $request->customer_id;
        $customer_item_id = $request->customer_item_id;
        $customer_order_id = $request->customer_order_id;
        $customer_order_detail_id = $request->customer_order_detail_id;
        $inputs_type = $request->inputs_type;
        $customer_shipment_id = $request->customer_shipment_id;
        $rack_number = $request->rack_number;

        /*decrease stock quantity*/
        $stock_info = collect(\DB::select("select * from stock_items inner join vendor_items on stock_items.vendor_item_id=vendor_items.vendor_item_id inner join jans on jans.jan = vendor_items.jan where vendor_items.jan = '" . $jan_code . "' and stock_items.rack_number='" . $rack_number . "'"))->first();
        if ($stock_info) {
            $stock_items = array();
            if ($inputs_type == 'ケース') {
                if ($c_quantity > $stock_info->case_quantity) {
                    return $result = response()->json(['message' => 'stock_over_qty']);
                }
                $vl = $stock_info->case_quantity - $c_quantity;
                $vl = ($vl < 0 ? 0 : $vl);
                $stock_items['case_quantity'] = $vl;
            } else if ($inputs_type == 'ボール') {
                if ($c_quantity > $stock_info->ball_quantity) {
                    return $result = response()->json(['message' => 'stock_over_qty']);
                }
                $vl = $stock_info->ball_quantity - $c_quantity;
                $vl = ($vl < 0 ? 0 : $vl);
                $stock_items['ball_quantity'] = $vl;
            } else {
                if ($c_quantity > $stock_info->unit_quantity) {
                    return $result = response()->json(['message' => 'stock_over_qty']);
                }
                $vl = $stock_info->unit_quantity - $c_quantity;
                $vl = ($vl < 0 ? 0 : $vl);
                $stock_items['unit_quantity'] = $vl;
            }
            stock_item::where(['vendor_item_id' => $stock_info->vendor_item_id, 'rack_number' => $rack_number])->update($stock_items);
            customer_shipment::where('customer_shipment_id', $request->customer_shipment_id)->update(['quantity' => $request->c_quantity, 'reload_status' => '1']);
            customer_order::where('customer_order_id', $request->customer_order_id)->update(['status' => '出荷済み']);
            $insert_invoice = array(
                'invoice_amount' => $request->total_quantity_vls_price,
                'customer_id' => $request->customer_id,
                'customer_shipment_id' => $request->customer_shipment_id,
                'invoice_date' => date('Y-m-d'),
            );

            customer_invoice::insert($insert_invoice);
        } else {
            return $result = response()->json(['message' => 'stock_over_qty']);
        }
        /*decrease stock quantity

        $data = collect(\DB::select("select customer_shipments.customer_order_id,customer_shipments.customer_shipment_id,customer_shipments.confirm_quantity,customer_shipments.quantity,jans.name,customer_orders.status,stock_items.rack_number from customer_shipments LEFT JOIN customer_order_details ON customer_order_details.customer_order_detail_id=customer_shipments.customer_order_detail_id
        INNER JOIN customer_orders ON customer_orders.customer_order_id=customer_shipments.customer_order_id
        LEFT JOIN jans ON jans.jan=customer_order_details.jan
        LEFT JOIN vendor_items ON vendor_items.jan=customer_order_details.jan
        LEFT JOIN stock_items ON stock_items.vendor_item_id=vendor_items.vendor_item_id
        WHERE customer_shipments.quantity=0 and customer_orders.status='確定済み' and customer_order_details.jan='" . $jan_code . "'"));
        if ($data) {
            foreach ($data as $ordr) {
                $insertableqty = 0;
                if ($c_quantity > $ordr->confirm_quantity) {
                    $c_quantity = $c_quantity - $ordr->confirm_quantity;
                    $insertableqty = $ordr->confirm_quantity;
                } else {
                    $insertableqty = $c_quantity;
                    $c_quantity = 0;
                }

                customer_shipment::where('customer_shipment_id', $ordr->customer_shipment_id)->update(['quantity' => $insertableqty, 'reload_status' => '1']);
                customer_order::where('customer_order_id', $ordr->customer_order_id)->update(['status' => '出荷済み']);
                if ($insertableqty != 0) {
                    $invoice_amount = 0;
                    $amount = collect(\DB::select("SELECT (
                     case when customer_shipments.inputs = 'ケース' THEN jans.case_inputs*customer_shipments.quantity*customer_items.cost_price ELSE 0 END+
                        case when customer_shipments.inputs = 'ボール' THEN jans.ball_inputs*customer_shipments.quantity*customer_items.cost_price ELSE 0 END+
                 case when customer_shipments.inputs = 'バラ' THEN 1*customer_shipments.quantity*customer_items.cost_price ELSE 0 END) as total_invoice_amount FROM `customer_shipments`
                  INNER join customer_order_details on customer_order_details.customer_order_detail_id = customer_shipments.customer_order_detail_id
                   inner join customer_items on customer_items.customer_item_id = customer_order_details.customer_item_id
                   INNER JOIN jans on jans.jan = customer_order_details.jan  WHERE customer_shipments.customer_shipment_id='" . $ordr->customer_shipment_id . "'"))->first();
                    if ($amount) {
                        $invoice_amount = $amount->total_invoice_amount;
                    }
                    $insert_invoice = array(
                        'invoice_amount' => $invoice_amount,
                        'customer_id' => $customer_id,
                        'customer_shipment_id' => $ordr->customer_shipment_id,
                        'invoice_date' => date('Y-m-d'),
                    );

                    customer_invoice::insert($insert_invoice);
                }
            }
        }
*/

        return $result = response()->json(['message' => 'success']);
    }

    public function insert_shipment_order_info(Request $request)
    {
        $shipment_number = $request->shipment_number;
        $jcode = $request->jcode;
        $customer_id = $request->customer_id;
        $customer_order_id = $request->customer_order_id;
        $quantity = $request->c_quantity;
        $inputs = $request->inputs;
        $insarray = array(
            'inputs' => $inputs,
            'customer_id' => $customer_id,
            'customer_order_id' => $customer_order_id,
            'quantity' => $quantity,
        );
        $upd = array('status' => '出荷済み');
        customer_shipment::insert($insarray);

        $stock_info = collect(\DB::select("select * from jans inner join vendor_items on jans.jan=vendor_items.jan inner join stock_items on vendor_items.vendor_item_id = stock_items.vendor_item_id where jans.jan = '" . $jcode . "'"))->first();
        if ($stock_info) {
            $stock_items = array();
            if ($inputs == 'ケース') {
                $vl = $stock_info->case_quantity - $quantity;
                $vl = ($vl < 0 ? 0 : $vl);
                $stock_items['case_quantity'] = $vl;
            } else if ($inputs == 'ボール') {
                $vl = $stock_info->ball_quantity - $quantity;
                $vl = ($vl < 0 ? 0 : $vl);
                $stock_items['ball_quantity'] = $vl;
            } else {
                $vl = $stock_info->unit_quantity - $quantity;
                $vl = ($vl < 0 ? 0 : $vl);
                $stock_items['unit_quantity'] = $vl;
            }

            stock_item::where(['vendor_item_id' => $stock_info->vendor_item_id])->update($stock_items);

        }
        return $result = response()->json(['message' => 'success']);


    }

    public function insert_customer_invoice_by_shipment(Request $request)
    {
        $shipment_number = $request->shipment_number;
        $customer_id = $request->customer_id;
        $invoice_amount = 0;

        $result = collect(\DB::select("SELECT SUM(customer_shipments.quantity*jans.case_inputs*jans.ball_inputs*customer_items.selling_price) as invoice_amount FROM `customer_orders` left join customer_order_details on customer_orders.customer_order_id=customer_order_details.customer_order_id INNER JOIN customer_items ON customer_items.customer_item_id=customer_order_details.customer_item_id INNER JOIN customer_shipments ON customer_shipments.customer_order_id = customer_orders.customer_order_id INNER JOIN jans ON jans.jan=customer_items.jan WHERE customer_orders.shipment_number='" . $shipment_number . "'"))->first();
        if ($result) {
            $invoice_amount = $result->invoice_amount;
        }
        $insert_invoice = array(
            'invoice_amount' => $invoice_amount,
            'customer_id' => $customer_id,
            'shipment_number' => $shipment_number,
            'invoice_date' => date('Y-m-d'),
        );

        customer_invoice::insert($insert_invoice);
        customer_order::where(['shipment_number' => $shipment_number, 'status' => '出荷中'])->update(['status' => '出荷済み']);
        return $result = response()->json(['message' => 'success']);
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function get_jan_info_from_vendor_order(Request $request)
    {
        $vendor_id = $request->vendor_id;
        $voucher_num = $request->v_no;
        $jan_code = $request->jan_code;
        $jan_infos = collect(\DB::select("SELECT jans.jan,jans.name from vendor_orders left join vendor_order_details on vendor_order_details.vendor_order_id = vendor_orders.vendor_order_id inner join vendor_items on vendor_items.vendor_item_id = vendor_order_details.vendor_item_id inner join jans on jans.jan = vendor_items.jan where jans.jan='" . $jan_code . "' and vendor_orders.vendor_id='" . $vendor_id . "' and vendor_orders.voucher_number='" . $voucher_num . "'"))->first();
        if ($jan_infos) {
            return $result = response()->json(['api_data' => $jan_infos]);
        } else {
            return $result = response()->json(['api_data' => 'invalid_jan_code']);

        }

    }

    /*handy receive order*/
    public function vendor_arival_insert_handy_receiveorder(Request $request)
    {
        $bin = $request->bin;
        $rack_number = $bin;
        $vendor_id = $request->vendor_id;
        $vendor_item_id = $request->vendor_item_id;
        $vendor_order_id = $request->vendor_order_id;
        $case_quantaty=$request->case_quantaty;
        $ball_quantaty=$request->ball_quantaty;
        $unit_quantaty=$request->unit_quantaty;
        $item_info = vendor_item::join('jans', 'jans.jan', '=', 'vendor_items.jan')->where('vendor_item_id', $vendor_item_id)->first();
        $totalLotInventory = (($case_quantaty*$item_info->case_inputs)+($ball_quantaty*$item_info->ball_inputs)+$unit_quantaty);
        $totalInvoiceAmmount = 0;
        $totalInvoiceAmmount = $totalLotInventory*$item_info->cost_price;
                /*stock update*/
                $stock_items = array(
                    'vendor_id' => $vendor_id,
                    'vendor_item_id' => $vendor_item_id,
                    'rack_number' => $rack_number,
                    'temp_rack_number' => $rack_number,
                    'expiration_date' => date('Y-m-d H:i:s')
                );
                if (stock_item::where('vendor_item_id', $vendor_item_id)->where('rack_number', $rack_number)->first()) {
                    $row = stock_item::where('vendor_item_id',$vendor_item_id)->where('rack_number', $rack_number)->first();

                        $stock_items['case_quantity'] = $row->case_quantity + $case_quantaty;

                        $stock_items['ball_quantity'] = $row->ball_quantity + $ball_quantaty;

                        $stock_items['unit_quantity'] = $row->unit_quantity + $unit_quantaty;


                    stock_item::where(['vendor_item_id' => $vendor_item_id, 'vendor_id' => $vendor_id, 'rack_number' => $rack_number])->update($stock_items);


                } else {

                    $stock_items['case_quantity'] = $case_quantaty;
                    $stock_items['ball_quantity'] = $ball_quantaty;
                    $stock_items['unit_quantity'] = $unit_quantaty;
                    stock_item::insert($stock_items);
                }
                /*stock update*/
                /*execute vendor arrival insert*/
                $vndor_arival = array(
                    'vendor_id' => $vendor_id,
                    'vendor_order_id' => $vendor_order_id,
                    'vendor_order_detail_id' => $vendor_order_id,
                    'arrival_case_quantity'=>$case_quantaty,
                    'arrival_ball_quantity'=>$ball_quantaty,
                    'arrival_unit_quantity'=>$unit_quantaty,
                    'quantity' => $totalLotInventory,
                    'car_rack_number' => $bin,
                    'reload_status' => '1'
                );
                vendor_arrival::insert($vndor_arival);
                vendor_order::where(['vendor_id' => $vendor_id, 'vendor_order_id' => $vendor_order_id])->update(['status' => '入荷済み']);
                $data_arr = array(
                    'vendor_id' => $vendor_id,
                    'voucher_number' => $vendor_order_id,
                    'invoice_amount' => $totalInvoiceAmmount,
                    'invoice_date' => date('Y-m-d'),
                    'payment_due_date' => date("Y-m-t", strtotime("+1 month")),
                );
                vendor_invoice::insert($data_arr);
        return $result = response()->json(['message' => 'success']);
    }

    /*handy tana ere*/
    public function vendor_item_insert_into_shelf(Request $request)
    {
        $jan = $request->jan;
        $rack_number = $request->rack_code;
        $item_info = vendor_item::where('jan', $jan)->first();
        if (empty($item_info)) {
            return $result = response()->json(['api_data' => '', 'error_message' => '商品の登録がありません。']);
        }
        $vendor_item_id = $item_info->vendor_item_id;
        $order_detail_list = DB::table('vendor_arrivals')
            ->join('vendor_orders', 'vendor_orders.vendor_order_id', '=', 'vendor_arrivals.vendor_order_id')
            ->join('vendor_order_details', 'vendor_order_details.vendor_order_detail_id', '=', 'vendor_arrivals.vendor_order_detail_id')
            ->join('vendor_items', 'vendor_items.vendor_item_id', '=', 'vendor_order_details.vendor_item_id')
            ->orderByDesc('vendor_arrivals.vendor_arrival_id')
            ->select('vendor_arrivals.*', 'vendor_orders.status', 'vendor_orders.vendor_order_id', 'vendor_order_details.vendor_item_id', 'vendor_order_details.inputs')
            ->where('vendor_order_details.vendor_item_id', $vendor_item_id)
            ->where('vendor_orders.status', '入荷済み')
            ->where('vendor_arrivals.reload_status', '0')
            ->first();

        if ($order_detail_list) {

            $insertable_qty = $order_detail_list->quantity;
            $stock_items = array(
                'vendor_id' => $order_detail_list->vendor_id,
                'vendor_item_id' => $order_detail_list->vendor_item_id,
                'rack_number' => $rack_number,
                'expiration_date' => date('Y-m-d H:i:s')
            );
            if (stock_item::where('vendor_item_id', $order_detail_list->vendor_item_id)->where('rack_number', $rack_number)->first()) {
                $row = stock_item::where('vendor_item_id', $order_detail_list->vendor_item_id)->where('rack_number', $rack_number)->first();
                if ($order_detail_list->inputs == 'ケース') {
                    $stock_items['case_quantity'] = $row->case_quantity + $insertable_qty;
                } else if ($order_detail_list->inputs == 'ボール') {
                    $stock_items['ball_quantity'] = $row->ball_quantity + $insertable_qty;
                } else {
                    $stock_items['unit_quantity'] = $row->unit_quantity + $insertable_qty;
                }

                stock_item::where(['vendor_item_id' => $order_detail_list->vendor_item_id, 'vendor_id' => $order_detail_list->vendor_id, 'rack_number' => $rack_number])->update($stock_items);


            } else {
                if ($order_detail_list->inputs == 'ケース') {
                    $stock_items['case_quantity'] = $insertable_qty;
                    $stock_items['ball_quantity'] = 0;
                    $stock_items['unit_quantity'] = 0;
                } else if ($order_detail_list->inputs == 'ボール') {
                    $stock_items['case_quantity'] = 0;
                    $stock_items['ball_quantity'] = $insertable_qty;
                    $stock_items['unit_quantity'] = 0;

                } else {
                    $stock_items['case_quantity'] = 0;
                    $stock_items['ball_quantity'] = 0;
                    $stock_items['unit_quantity'] = $insertable_qty;
                }

                stock_item::insert($stock_items);
            }
            session(['reload_receive_order_page' => '1']);
            vendor_arrival::where('vendor_arrival_id', $order_detail_list->vendor_arrival_id)->update(['reload_status' => '1']);

            /*if availabe stock then insert customer shipment*/
            $customer_order_detail = collect(\DB::select("SELECT co.status,co.customer_id,cod.*,si.* from customer_orders AS co
                    INNER join customer_order_details as cod on cod.customer_order_id = co.customer_order_id
                    INNER join vendor_items as vi on vi.jan = cod.jan
                    INNER join stock_items as si on si.vendor_item_id = vi.vendor_item_id
                WHERE co.status = '未出荷' AND cod.jan='" . $jan . "'"));
            if ($customer_order_detail) {
                foreach ($customer_order_detail as $order) {
                    $shiptment['customer_id'] = $order->customer_id;
                    $shiptment['customer_order_id'] = $order->customer_order_id;
                    $shiptment['customer_order_detail_id'] = $order->customer_order_detail_id;
                    $shiptment['shipment_date'] = date('Y-m-d H:i:s');
                    $shiptment['inputs'] = $order->inputs;
                    $shiptment['confirm_quantity'] = $order->quantity;
                    if ($order->inputs == 'ケース' && $order->quantity <= $order->case_quantity) {
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id', $order->customer_order_id)->update(['status' => '確定済み']);
                    } else if ($order->inputs == 'ボール' && $order->quantity <= $order->ball_quantity) {
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id', $order->customer_order_id)->update(['status' => '確定済み']);
                    } else if ($order->inputs == 'バラ' && $order->quantity <= $order->unit_quantity) {
                        customer_shipment::insert($shiptment);
                        customer_order::where('customer_order_id', $order->customer_order_id)->update(['status' => '確定済み']);
                    }
                }
            }
            /*if availabe stock then insert customer shipment*/

            $payment_due_date = date("Y-m-t", strtotime("+1 month"));
            $invoice_amount = 0;
            $result = collect(\DB::select("SELECT SUM(vendor_arrivals.quantity) as total_quantity,vendor_order_details.inputs,jans.jan,vendor_items.cost_price,(CASE WHEN vendor_order_details.inputs='ケース' THEN jans.case_inputs*SUM(vendor_arrivals.quantity)*vendor_items.cost_price ELSE 0 END+CASE WHEN vendor_order_details.inputs='ボール' THEN jans.ball_inputs*SUM(vendor_arrivals.quantity)*vendor_items.cost_price ELSE 0 END+CASE WHEN vendor_order_details.inputs='バラ' THEN 1*SUM(vendor_arrivals.quantity)*vendor_items.cost_price ELSE 0 END)as invoice_amount FROM `vendor_arrivals` INNER join vendor_order_details ON vendor_order_details.vendor_order_id = vendor_arrivals.vendor_order_id INNER JOIN vendor_items on vendor_items.vendor_item_id = vendor_order_details.vendor_item_id INNER JOIN jans on jans.jan = vendor_items.jan WHERE vendor_arrivals.vendor_order_id='" . $order_detail_list->vendor_order_id . "' group by jans.jan"))->first();
            if ($result) {
                $invoice_amount = $result->invoice_amount;
            }

            $data_arr = array(
                'vendor_id' => $order_detail_list->vendor_id,
                'voucher_number' => $order_detail_list->vendor_order_id,
                'invoice_amount' => $invoice_amount,
                'invoice_date' => date('Y-m-d'),
                'payment_due_date' => $payment_due_date,
            );
            vendor_invoice::insert($data_arr);
        }
        $invalid_rack = 0;
        $resutl = collect(\DB::select("SELECT jans.*,stock_items.* from stock_items inner join vendor_items on vendor_items.vendor_item_id = stock_items.vendor_item_id inner join jans on jans.jan = vendor_items.jan where vendor_items.jan = '" . $jan . "' and stock_items.rack_number='" . $rack_number . "'"))->first();
        if (!empty($resutl)) {
            return $results = response()->json(['api_data' => $resutl, 'invalid_rack' => $invalid_rack]);
        } else {
            return $results = response()->json(['api_data' => '', 'error_message' => '', 'invalid_rack' => $invalid_rack]);
        }
    }

    /*handy tana ere*/
    public function check_order_exists(Request $request)
    {
        //ORDER TYPE 1=RECEIVE;2=SHIPMENT
        if ($request->order_type == 1) {
            $total_row = collect(\DB::select("SELECT SUM(quantity) as quantity,vendor_orders.status as vendor_order_status,vendor_order_details.vendor_order_id,vendor_order_details.vendor_item_id,vendor_order_details.inputs FROM `vendor_orders` LEFT JOIN vendor_order_details on vendor_orders.vendor_order_id=vendor_order_details.vendor_order_id where vendor_orders.status='未入荷' GROUP BY vendor_order_details.vendor_item_id"));
            if ($total_row) {
                $totals = count($total_row);
            } else {
                $totals = 0;
            }
        }
        return $result = response()->json(['message' => 'success', 'totals' => $totals]);
    }

    /*web insert*/
    public function vendor_arival_insert_web_receiveorder(Request $request)
    {
        $jan_code = $request->jan_code;
        $c_quantity = $request->c_quantity;
        $expire_date = '';
        $bin = '';
        $vendor_id = $request->vendor_id;
        $vendor_item_id = $request->vendor_item_id;
        $vendor_order_id = $request->vendor_order_id;
        $vendor_order_detail_id = $request->vendor_order_detail_id;
        $inputs_type = $request->inputs_type;

        $get_v_order_list = DB::select("SELECT vendor_orders.*,vendor_order_details.* from vendor_orders left join vendor_order_details on vendor_order_details.vendor_order_id = vendor_orders.vendor_order_id INNER JOIN vendor_items on vendor_items.vendor_item_id = vendor_order_details.vendor_item_id where vendor_orders.status='未入荷' and vendor_items.jan = '" . $jan_code . "' ORDER BY order_date ASC");

        if ($get_v_order_list) {

            foreach ($get_v_order_list as $order_detail_list) {

                $insertable_qty = 0;
                $insert_loop = 0;
                if ($c_quantity >= $order_detail_list->quantity) {
                    $insertable_qty = $order_detail_list->quantity;
                    $c_quantity = $c_quantity - $order_detail_list->quantity;
                    //vendor_order_detail::where('vendor_order_detail_id',$order_detail_list->vendor_order_detail_id)->update(['quantity'=>0]);
                } else {
                    $insertable_qty = $c_quantity;
                    //$detailt_qty_will_be = $order_detail_list->quantity-$c_quantity;
                    //vendor_order_detail::where('vendor_order_detail_id',$order_detail_list->vendor_order_detail_id)->update(['quantity'=>$detailt_qty_will_be]);
                    $insert_loop = 1;
                }

                /*execute vendor arrival insert*/
                $vndor_arival = array(
                    'vendor_id' => $order_detail_list->vendor_id,
                    'vendor_order_id' => $order_detail_list->vendor_order_id,
                    'vendor_order_detail_id' => $order_detail_list->vendor_order_detail_id,
                    'quantity' => $insertable_qty,
                );
                vendor_arrival::insert($vndor_arival);
                /*execute vendor arrival insert*/
                /* stck increase*/
                $stock_items = array(
                    'vendor_id' => $order_detail_list->vendor_id,
                    'vendor_item_id' => $order_detail_list->vendor_item_id,
                    'rack_number' => $bin,
                    'expiration_date' => $expire_date
                );


                if (stock_item::where('vendor_item_id', $order_detail_list->vendor_item_id)->first()) {
                    $row = stock_item::where('vendor_item_id', $order_detail_list->vendor_item_id)->first();
                    if ($order_detail_list->inputs == 'ケース') {
                        $stock_items['case_quantity'] = $row->case_quantity + $insertable_qty;
                    } else if ($order_detail_list->inputs == 'ボール') {
                        $stock_items['ball_quantity'] = $row->ball_quantity + $insertable_qty;
                    } else {
                        $stock_items['unit_quantity'] = $row->unit_quantity + $insertable_qty;
                    }

                    stock_item::where(['vendor_item_id' => $order_detail_list->vendor_item_id, 'vendor_id' => $order_detail_list->vendor_id])->update($stock_items);


                } else {
                    if ($order_detail_list->inputs == 'ケース') {
                        $stock_items['case_quantity'] = $insertable_qty;
                        $stock_items['ball_quantity'] = 0;
                        $stock_items['unit_quantity'] = 0;
                    } else if ($order_detail_list->inputs == 'ボール') {
                        $stock_items['case_quantity'] = 0;
                        $stock_items['ball_quantity'] = $insertable_qty;
                        $stock_items['unit_quantity'] = 0;

                    } else {
                        $stock_items['case_quantity'] = 0;
                        $stock_items['ball_quantity'] = 0;
                        $stock_items['unit_quantity'] = $insertable_qty;
                    }

                    stock_item::insert($stock_items);
                }
                /* stck increase*/


                $order_arrival_count = collect(\DB::select("SELECT SUM(quantity) as total_quantity FROM `vendor_order_details` WHERE vendor_order_id ='" . $order_detail_list->vendor_order_id . "'"))->first();
                $vendor_order_detail_count = collect(\DB::select("SELECT SUM(quantity) as total_quantity FROM `vendor_arrivals` WHERE vendor_order_id ='" . $order_detail_list->vendor_order_id . "'"))->first();
                if ($order_arrival_count->total_quantity == $vendor_order_detail_count->total_quantity) {
                    vendor_order::where(['vendor_id' => $order_detail_list->vendor_id, 'vendor_order_id' => $order_detail_list->vendor_order_id])->update(['status' => '入荷済み']);
                    /*create invoice*/
                    $payment_due_date = date("Y-m-t", strtotime("+1 month"));
                    $invoice_amount = 0;
                    $result = collect(\DB::select("SELECT SUM(vendor_arrivals.quantity) as total_quantity,vendor_order_details.inputs,jans.jan,vendor_items.cost_price,(CASE WHEN vendor_order_details.inputs='ケース' THEN jans.case_inputs*SUM(vendor_arrivals.quantity)*vendor_items.cost_price ELSE 0 END+CASE WHEN vendor_order_details.inputs='ボール' THEN jans.ball_inputs*SUM(vendor_arrivals.quantity)*vendor_items.cost_price ELSE 0 END+CASE WHEN vendor_order_details.inputs='バラ' THEN 1*SUM(vendor_arrivals.quantity)*vendor_items.cost_price ELSE 0 END)as invoice_amount FROM `vendor_arrivals` INNER join vendor_order_details ON vendor_order_details.vendor_order_id = vendor_arrivals.vendor_order_id INNER JOIN vendor_items on vendor_items.vendor_item_id = vendor_order_details.vendor_item_id INNER JOIN jans on jans.jan = vendor_items.jan WHERE vendor_arrivals.vendor_order_id='" . $order_detail_list->vendor_order_id . "' group by jans.jan"))->first();
                    if ($result) {
                        $invoice_amount = $result->invoice_amount;
                    }

                    $data_arr = array(
                        'vendor_id' => $order_detail_list->vendor_id,
                        'voucher_number' => $order_detail_list->vendor_order_id,
                        'invoice_amount' => $invoice_amount,
                        'invoice_date' => date('Y-m-d'),
                        'payment_due_date' => $payment_due_date,
                    );
                    vendor_invoice::insert($data_arr);

                }
                if ($insert_loop == 1) {
                    break;
                }
            }
        }
        Session::flash('message', 'arrival_inserted');
        return $result = response()->json(['message' => 'success']);
    }

    /*web insert*/

    public function vendor_arival_insert(Request $request)
    {
        $voucher_num = $request->v_no;
        $jan_code = $request->jan_code;
        $c_quantity = $request->c_quantity;
        $expire_date = $request->expire_date;
        $bin = $request->bin;
        $v_no = $request->v_no;
        $vendor_id = $request->vendor_id;
        $vendor_item_id = collect(\DB::select("SELECT vendor_item_id from vendor_items where jan='" . $jan_code . "' and vendor_id='" . $vendor_id . "'"))->first();
        $vendor_order_id = collect(\DB::select("SELECT vendor_orders.vendor_order_id,vendor_order_details.inputs from vendor_orders left join vendor_order_details on vendor_orders.vendor_order_id = vendor_order_details.vendor_order_id where vendor_order_details.vendor_item_id='" . $vendor_item_id->vendor_item_id . "' and vendor_orders.voucher_number='" . $v_no . "' and vendor_id='" . $vendor_id . "'"))->first();

        $vndor_arival = array(
            'vendor_id' => $vendor_id,
            'vendor_order_id' => $vendor_order_id->vendor_order_id,
            'quantity' => $c_quantity,
        );

        $stock_items = array(
            'vendor_id' => $vendor_id,
            'vendor_item_id' => $vendor_item_id->vendor_item_id,
            'rack_number' => $bin,
            'expiration_date' => $expire_date
        );

        $statusupdate = array(
            'status' => '入荷済み'
        );
        if (stock_item::where('vendor_item_id', $vendor_item_id->vendor_item_id)->first()) {
            $row = stock_item::where('vendor_item_id', $vendor_item_id->vendor_item_id)->first();
            if ($vendor_order_id->inputs == 'ケース') {
                $stock_items['case_quantity'] = $row->case_quantity + $c_quantity;
            } else if ($vendor_order_id->inputs == 'ボール') {
                $stock_items['ball_quantity'] = $row->ball_quantity + $c_quantity;
            } else {
                $stock_items['unit_quantity'] = $row->unit_quantity + $c_quantity;
            }

            stock_item::where(['vendor_item_id' => $vendor_item_id->vendor_item_id, 'vendor_id' => $vendor_id])->update($stock_items);


        } else {
            if ($vendor_order_id->inputs == 'ケース') {
                $stock_items['case_quantity'] = $c_quantity;
                $stock_items['ball_quantity'] = 0;
                $stock_items['unit_quantity'] = 0;
            } else if ($vendor_order_id->inputs == 'ボール') {
                $stock_items['case_quantity'] = 0;
                $stock_items['ball_quantity'] = $c_quantity;
                $stock_items['unit_quantity'] = 0;

            } else {
                $stock_items['case_quantity'] = 0;
                $stock_items['ball_quantity'] = 0;
                $stock_items['unit_quantity'] = $c_quantity;
            }

            stock_item::insert($stock_items);
        }
        vendor_order::where(['vendor_id' => $vendor_id, 'voucher_number' => $voucher_num])->update($statusupdate);
        vendor_arrival::insert($vndor_arival);
        return $result = response()->json(['message' => 'success']);
    }

    public function create_vendor_invoice_by_voucher(Request $request)
    {
        $v_no = $request->v_no;
        $vendor_id = $request->vendor_id;
        $payment_due_date = date("Y-m-t", strtotime("+1 month"));
        $invoice_amount = 0;
        $result = collect(\DB::select("SELECT SUM(vendor_arrivals.quantity*jans.case_inputs*jans.ball_inputs*vendor_items.cost_price) as invoice_amount FROM `vendor_orders` INNER JOIN vendor_order_details ON vendor_orders.vendor_order_id=vendor_order_details.vendor_order_id INNER JOIN vendor_items ON vendor_items.vendor_item_id=vendor_order_details.vendor_item_id INNER JOIN vendor_arrivals ON vendor_arrivals.vendor_order_id = vendor_orders.vendor_order_id INNER JOIN jans ON jans.jan=vendor_items.jan  WHERE `voucher_number`='" . $v_no . "'"))->first();
        if ($result) {
            $invoice_amount = $result->invoice_amount;
        }

        $data_arr = array(
            'vendor_id' => $vendor_id,
            'voucher_number' => $v_no,
            'invoice_amount' => $invoice_amount,
            'invoice_date' => date('Y-m-d'),
            'payment_due_date' => $payment_due_date,
        );
        vendor_invoice::insert($data_arr);
        return $result = response()->json(['message' => 'success']);
    }

    public function check_self_no_is_exists(Request $request)
    {
        $self_no = $request->self_no;
        if (stock_item::where('rack_number', $self_no)->first()) {
            return $result = response()->json(['message' => 'success']);
        } else {
            return $result = response()->json(['message' => 'invalid']);
        }
    }

    public function stock_item_insert_update(Request $request)
    {
        $self_no = $request->self_no;
        $b_jancode = $request->b_jancode;
        $jan_infos = collect(\DB::select("SELECT jans.jan,jans.name,jans.case_inputs,jans.ball_inputs,vendor_items.vendor_item_id,vendor_items.vendor_id,stock_items.case_quantity,stock_items.ball_quantity,stock_items.unit_quantity from vendor_items left join stock_items on vendor_items.vendor_item_id = stock_items.vendor_item_id inner join jans on jans.jan = vendor_items.jan where jans.jan='" . $b_jancode . "'"))->first();
        if ($jan_infos) {
            return $result = response()->json(['api_data' => $jan_infos]);
        } else {
            return $result = response()->json(['api_data' => 'invalid_jan_code']);

        }

    }

    public function update_stock_item_by_jan_by_handy(Request $request)
    {
        $self_no = session('rack_num');
        $b_jancode = $request->b_jancode;
        $stock_item_id = $request->stock_item_id;
        $case_quantity = $request->case_quantity;
        $ball_quantity = $request->ball_quantity;
        $unit_quantity = $request->unit_quantity;
        $uparray = array(
            'case_quantity' => $case_quantity,
            'ball_quantity' => $ball_quantity,
            'unit_quantity' => $unit_quantity,
        );

        if (stock_item::where('stock_item_id', $stock_item_id)->first()) {
            stock_item::where(['stock_item_id' => $stock_item_id])->update($uparray);
            return $result = response()->json(['message' => 'success']);
        }


        return $result = response()->json(['message' => 'error']);


    }

    public function stock_item_update_final_insert(Request $request)
    {
        $self_no = $request->self_no;
        $b_jancode = $request->b_jancode;
        $vendor_item_id = $request->vendor_item_id;
        $vendor_id = $request->vendor_id;
        $case_quantity = $request->case_quantity;
        $ball_quantity = $request->ball_quantity;
        $unit_quantity = $request->unit_quantity;
        $uparray = array(
            'rack_number' => $self_no,
            'vendor_id' => $vendor_id,
            'case_quantity' => $case_quantity,
            'ball_quantity' => $ball_quantity,
            'unit_quantity' => $unit_quantity,
        );

        $insarray = array(
            'rack_number' => $self_no,
            'vendor_id' => $vendor_id,
            'vendor_item_id' => $vendor_item_id,
            'case_quantity' => $case_quantity,
            'ball_quantity' => $ball_quantity,
            'unit_quantity' => $unit_quantity,
        );


        if (stock_item::where('vendor_item_id', $vendor_item_id)->first()) {
            stock_item::where(['vendor_item_id' => $vendor_item_id])->update($uparray);
            return $result = response()->json(['message' => 'success']);
        } else {
            stock_item::insert($insarray);
            return $result = response()->json(['message' => 'success']);
        }


        return $result = response()->json(['message' => 'success']);


    }

    public function stock_inventory_rack_code_add(Request $request)
    {
        $stock_item_id = $request->stock_item_id;
        $case_quantity = $request->case_quantity;
        $ball_quantity = $request->ball_quantity;
        $unit_quantity = $request->unit_quantity;
        $rack_number = $request->rack_number;
        $previous_rack_number = $request->previous_rack_number;
        $vendor_item_id = $request->vendor_item_id;
        $vendor_id = $request->vendor_id;
        $previous_stock_item_info=stock_item::where('vendor_item_id', $vendor_item_id)->where('rack_number', $previous_rack_number)->first();
        $temp_rack_number = '';
        if($previous_stock_item_info){
            $temp_rack_number = $previous_stock_item_info->temp_rack_number;
        }

        if (stock_item::where('vendor_item_id', $vendor_item_id)->where('rack_number', $rack_number)->first()) {
            stock_item::where('vendor_item_id', $vendor_item_id)->where('rack_number', $previous_rack_number)->delete();
            $stock_item_info = stock_item::where('vendor_item_id', $vendor_item_id)->where('rack_number', $rack_number)->first();

            if ($stock_item_info->case_quantity!=null) {
                $case_quantity = $case_quantity+$stock_item_info->case_quantity;
            }

            if ($stock_item_info->ball_quantity!=null) {
                $ball_quantity = $ball_quantity+$stock_item_info->ball_quantity;
            }

            if ($stock_item_info->unit_quantity!=null) {
                $unit_quantity = $unit_quantity+$stock_item_info->unit_quantity;
            }

            $updatearr=array(
                'case_quantity' => $case_quantity,
                'ball_quantity' => $ball_quantity,
                'unit_quantity' => $unit_quantity
            );

            if($stock_item_info->temp_rack_number==null){
                $updatearr['temp_rack_number']=$temp_rack_number;
            }
            stock_item::where('stock_item_id', $stock_item_info->stock_item_id)->update($updatearr);
            return $result = response()->json(['message' => 'success', 'stock_item_id' => $stock_item_info->stock_item_id]);
        } else {
            $case_quantity = ($case_quantity != '' ? $case_quantity : 0);
            $ball_quantity = ($ball_quantity != '' ? $ball_quantity : 0);
            $unit_quantity = ($unit_quantity != '' ? $unit_quantity : 0);
            $insarray = array(
                'rack_number' => $rack_number,
                'temp_rack_number' => $temp_rack_number,
                'vendor_item_id' => $vendor_item_id,
                'vendor_id' => $vendor_id,
                'case_quantity' => $case_quantity,
                'ball_quantity' => $ball_quantity,
                'unit_quantity' => $unit_quantity
            );
            if($stock_item_id!='0'){
                stock_item::where('stock_item_id',$stock_item_id)->update($insarray);
            }else{
                $stock_item_id = stock_item::insertGetId($insarray);
            }

            return $result = response()->json(['message' => 'success', 'stock_item_id' => $stock_item_id]);

        }

    }

    public function update_stock_by_rack_by_handy(Request $request)
    {
        $stock_item_id = $request->stock_item_id;
        $case_quantity = $request->case_quantity;
        $ball_quantity = $request->ball_quantity;
        $unit_quantity = $request->unit_quantity;
        $stock_item_info = stock_item::where('stock_item_id', $stock_item_id)->first();

        if ($case_quantity != $stock_item_info->case_quantity) {
            if ($case_quantity > $stock_item_info->case_quantity) {
                $inc_dec = '1';
                $inc_dec_qty = $case_quantity - $stock_item_info->case_quantity;
            } else {
                $inc_dec = '0';
                $inc_dec_qty = $stock_item_info->case_quantity - $case_quantity;
            }
            stock_item_detail::insert(['stock_item_id' => $stock_item_id, 'inc_dec_status' => $inc_dec, 'inc_dec_inputs' => 'ケース', 'inc_dec_quantity' => $inc_dec_qty, 'actual_quantity' => $stock_item_info->case_quantity]);
            stock_item::where('stock_item_id', $stock_item_id)->update(['case_quantity' => $case_quantity]);
        }


        if ($ball_quantity != $stock_item_info->ball_quantity) {
            if ($ball_quantity > $stock_item_info->ball_quantity) {
                $inc_dec = '1';
                $inc_dec_qty = $ball_quantity - $stock_item_info->ball_quantity;
            } else {
                $inc_dec = '0';
                $inc_dec_qty = $stock_item_info->ball_quantity - $ball_quantity;
            }
            stock_item_detail::insert(['stock_item_id' => $stock_item_id, 'inc_dec_status' => $inc_dec, 'inc_dec_inputs' => 'ボール', 'inc_dec_quantity' => $inc_dec_qty, 'actual_quantity' => $stock_item_info->ball_quantity]);
            stock_item::where('stock_item_id', $stock_item_id)->update(['ball_quantity' => $ball_quantity]);
        }

        if ($unit_quantity != $stock_item_info->unit_quantity) {
            if ($unit_quantity > $stock_item_info->unit_quantity) {
                $inc_dec = '1';
                $inc_dec_qty = $unit_quantity - $stock_item_info->unit_quantity;
            } else {
                $inc_dec = '0';
                $inc_dec_qty = $stock_item_info->unit_quantity - $unit_quantity;
            }
            stock_item_detail::insert(['stock_item_id' => $stock_item_id, 'inc_dec_status' => $inc_dec, 'inc_dec_inputs' => 'ボール', 'inc_dec_quantity' => $inc_dec_qty, 'actual_quantity' => $stock_item_info->unit_quantity]);
            stock_item::where('stock_item_id', $stock_item_id)->update(['unit_quantity' => $unit_quantity]);
        }
        return $result = response()->json(['message' => 'success']);
    }

    public function item_return_to_tonya(Request $request){
        $requestAll = $request->order_data;
        $return_data = $request->return_data;
        $damage_quantity = $return_data['returnTotalQty'];
        $damage_case_quantity = $return_data['retrunCaseQty'];
        $damage_ball_quantity = $return_data['retrunBallQty'];
        $damage_unit_quantity = $return_data['retrunUnitQty'];
        foreach($requestAll as $req){
            $stock_item_info = stock_item::where('rack_number', $req['rack_number'])->where('vendor_item_id',$req['vendor_item_id'])->first();
            if($stock_item_info){
            if($stock_item_info->unit_quantity>=$damage_quantity){
                $unit_quantity = $stock_item_info->unit_quantity-$damage_quantity;
                stock_item::where('stock_item_id', $stock_item_info->stock_item_id)->update(['unit_quantity' => $unit_quantity]);
            }else{

                $total_stock = (($stock_item_info->case_quantity*$req['case_inputs'])+($stock_item_info->ball_quantity*$req['ball_inputs'])+$stock_item_info->unit_quantity);
                $total_stock = $total_stock-$damage_quantity;
                if($req['case_inputs']!=0){
                    $case_quantity = floor($total_stock/$req['case_inputs']);
                }else{
                    $case_quantity = 0;
                }
                if($req['ball_inputs']!=0){
                    $ball_quantity = floor(($total_stock-($case_quantity*$req['case_inputs']))/$req['ball_inputs']);
                }else{
                    $ball_quantity = 0;
                }
                $unit_quantity = ($total_stock-(($case_quantity*$req['case_inputs'])+($ball_quantity*$req['ball_inputs'])));
                stock_item::where('stock_item_id', $stock_item_info->stock_item_id)->update(['unit_quantity' => $unit_quantity,'case_quantity'=>$case_quantity,'ball_quantity'=>$ball_quantity]);
            }
        }

            $existingArivalInfo = vendor_arrival::where('vendor_order_id',$req['vendor_order_id'])->first();
            if($existingArivalInfo){
                $existDamageQty = $existingArivalInfo->damage_quantity;
                $returnQty=$existDamageQty+$damage_quantity;

                $newQty = $req['quantity']-$returnQty;
                $invoice_amount = $req['unit_cost_price']*$newQty;
                vendor_invoice::where('voucher_number',$req['vendor_order_id'])->update(['invoice_amount'=>$invoice_amount]);
                vendor_arrival::where('vendor_order_id',$req['vendor_order_id'])->update(['damage_quantity'=>$returnQty,'damage_case_quantity'=>$damage_case_quantity+$existingArivalInfo->damage_case_quantity,'damage_ball_quantity'=>$existingArivalInfo->damage_ball_quantity+$damage_ball_quantity,'damage_unit_quantity'=>$damage_unit_quantity+$existingArivalInfo->damage_unit_quantity]);
            }
        }


        return $result = response()->json(['message' => 'success']);
    }

    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /* cache clear and reload */
    public function cacheClearAndReload($rdn_code){
        \Artisan::call('config:cache');
        \Artisan::call('view:clear');
        \Artisan::call('cache:clear');
        return response()->json(['true',$rdn_code]);
    }
}
