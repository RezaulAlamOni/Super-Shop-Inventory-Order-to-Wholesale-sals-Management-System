<?php

namespace App\Http\Controllers;

use App\customer;
use Illuminate\Http\Request;
use App\jan;
use App\stock_item;
use App\vendor_item;
use App\vendor;
use App\vendor_order;
use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Mail;

class ReceiveorderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id = null)
    {
        $title = "Receive Order";
        $active = 'receiveorder';

        $all_receive_order_info = $this->receive_order_query($id);

        if ($id != null) {
            return $all_receive_order_info;
        }

        return view('backend.order.receiveorder_home', compact('title', 'active'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // return $request->all();
        $vendor_item_id = $request->vendor_item_id;

        $case_input = $request->case_input;
        $ball_input = $request->ball_input;

        $case_quantity = $request->case_quantity;
        $ball_quantity = $request->ball_quantity;
        $unit_quantity = $request->unit_quantity;

        $jan_code = $request->jan_code;

        $total_inventory = $request->total_inventory;

        jan::where('jan', $jan_code)->update([
            'case_inputs' => $case_input,
            'ball_inputs' => $ball_input,
        ]);
        stock_item::where('vendor_item_id', $vendor_item_id)->update([
            'case_quantity' => $case_quantity,
            'ball_quantity' => $ball_quantity,
            'unit_quantity' => $unit_quantity
        ]);
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

    public function receive_order_query($id)
    {
        /* remove GROUP BY vi_all.jan by */
        $where = '';
        if ($id != null) {
            if ($id > 0) {
                $where = 'where vi_all.vendor_id="' . $id . '"';
            }
        }
        /*
        if($where!=''){
            if(auth()->user()->user_type=='shop'){
                $customer_id = auth()->user()->CustomerId;
               
                $shop_id = auth()->user()->ShopId;
                $where .=  ' and vi_all.customer_shop_id="' . $shop_id . '"';
            }
        }else{
            if(auth()->user()->user_type=='shop'){
                $customer_id = auth()->user()->CustomerId;
               
                $shop_id = auth()->user()->ShopId;
                $where .=  ' where vi_all.customer_shop_id="' . $shop_id . '"';
            }
        }*/
        $result = DB::select("SELECT
        vi_all.*,
        va.today_case_arrival_qty,
        va.today_ball_arrival_qty,
        va.today_unit_arrival_qty,
        vod.order_case_quantity,
        vod.order_ball_quantity,
        vod.order_unit_quantity,
        vod.status as order_status,
        vod.order_date
    FROM
    (
    SELECT
        vi.vendor_item_id,
        vi.cost_price,
        vi.selling_price,
        vi.created_at,
        vi.vendor_id,
        jans.name as item_name,
        IFNULL(jans.case_inputs,0) as case_inputs,
        IFNULL(si.case_quantity,0) as case_quantity,
        IFNULL(jans.ball_inputs,0) as ball_inputs,
        IFNULL(si.ball_quantity,0) as ball_quantity,
        IFNULL(si.unit_quantity,0) as unit_quantity,
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
    LEFT JOIN (
SELECT vendor_orders.order_case_quantity,vendor_orders.order_ball_quantity,vendor_orders.order_unit_quantity,vendor_orders.vendor_item_id,vendor_orders.status,vendor_orders.order_date FROM `vendor_orders` where vendor_orders.status='未入荷' GROUP BY vendor_orders.vendor_item_id
    ) AS vod on vod.vendor_item_id=vi_all.vendor_item_id
    LEFT JOIN (
        SELECT SUM(vendor_arrivals.arrival_case_quantity) as today_case_arrival_qty,SUM(vendor_arrivals.arrival_ball_quantity) as today_ball_arrival_qty,SUM(vendor_arrivals.arrival_unit_quantity) as today_unit_arrival_qty,vendor_orders.vendor_item_id FROM `vendor_arrivals` INNER JOIN vendor_orders on vendor_orders.vendor_order_id = vendor_arrivals.vendor_order_id WHERE date(`vendor_arrivals`.`arrival_date`)=CURDATE() GROUP BY vendor_orders.vendor_item_id) as va on va.vendor_item_id = vi_all.vendor_item_id
    $where
    GROUP BY vi_all.rack_number,vi_all.vendor_item_id
    ORDER BY FIELD(vod.status, '未入荷', '入荷済み') DESC,vod.order_date DESC, vi_all.vendor_item_id DESC,vi_all.vendor_name ASC,item_name ASC
    ");
        // $result = json_decode(json_encode($result, true));
        //     // $unique = array_unique($result);
        //     // $dupes = array_diff_key( $result, $unique );
        // echo '<pre>';
        //     print_r($result);exit;
        $newarr = array();
        $duplicates = array();
        $arr = array();
        foreach ($result as $key => $vl) {

            if (in_array($vl->jan, $newarr)) {
                $row = array_search($vl->jan, array_column($arr, 'jan'));
                $arr[$row]->rack_number = $vl->rack_number . ',' . $arr[$row]->rack_number;
                $arr[$row]->case_quantity = $vl->case_quantity + $arr[$row]->case_quantity;
                $arr[$row]->ball_quantity = $vl->ball_quantity + $arr[$row]->ball_quantity;
                $arr[$row]->unit_quantity = $vl->unit_quantity + $arr[$row]->unit_quantity;
                $total_stock_quantity = (($arr[$row]->case_quantity*$vl->case_inputs)+($arr[$row]->ball_quantity*$vl->ball_inputs)+$arr[$row]->unit_quantity);
                $arr[$row]->total_stock =$total_stock_quantity;
                $duplicates[] = $vl->jan;

            } else {

                $total_stock_quantity = (($vl->case_quantity*$vl->case_inputs)+($vl->ball_quantity*$vl->ball_inputs)+$vl->unit_quantity);
                $vl->total_stock=$total_stock_quantity;
                $arr[] = $vl;

            }
            $newarr[] = $vl->jan;
        }
        $tStockTotal = array_column($arr, 'total_stock');
array_multisort($tStockTotal, SORT_DESC, $arr);
        //print_r($arr);
        return $arr;
    }

    // oni
    public function orderInfoForHandy($jan)
    {
        /* remove GROUP BY vi_all.jan by */
        if (!vendor_item::where('jan', $jan)->first()){
            return response()->json(['status' => 401]);
        }
        $where = '';
        if ($jan != null) {
            if ($jan >= 13) {
                $where = 'where vi_all.jan="' . $jan . '"';
            }
        }

        $user_id = Auth::user()->id;
        $cus_info = customer::where('user_id', $user_id)->first();
        $url = "https://ryutu-van.dev.jacos.jp/rv3_tonyav1/api/customer-shops/" . $cus_info->customer_id;
        $shops = Http::get($url);

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
    LEFT JOIN (
SELECT vendor_orders.order_case_quantity,vendor_orders.order_ball_quantity,vendor_orders.order_unit_quantity,vendor_orders.vendor_item_id FROM `vendor_orders` where vendor_orders.status='未入荷' GROUP BY vendor_orders.vendor_item_id
    ) AS vod on vod.vendor_item_id=vi_all.vendor_item_id
    LEFT JOIN (
        SELECT SUM(vendor_arrivals.arrival_case_quantity) as today_case_arrival_qty,SUM(vendor_arrivals.arrival_ball_quantity) as today_ball_arrival_qty,SUM(vendor_arrivals.arrival_unit_quantity) as today_unit_arrival_qty,vendor_orders.vendor_item_id FROM `vendor_arrivals` INNER JOIN vendor_orders on vendor_orders.vendor_order_id = vendor_arrivals.vendor_order_id WHERE date(`vendor_arrivals`.`arrival_date`)=CURDATE() GROUP BY vendor_orders.vendor_item_id) as va on va.vendor_item_id = vi_all.vendor_item_id
    $where
    ORDER BY vi_all.vendor_item_id DESC,vi_all.vendor_name ASC,item_name ASC
    ");
        // $result = json_decode(json_encode($result, true));
        //     // $unique = array_unique($result);
        //     // $dupes = array_diff_key( $result, $unique );
        // echo '<pre>';
        //     print_r($result);exit;
        $newarr = array();
        $duplicates = array();
        $arr = array();
        foreach ($result as $key => $vl) {

            if (in_array($vl->jan, $newarr)) {
                $row = array_search($vl->jan, array_column($arr, 'jan'));
                $arr[$row]->rack_number = $vl->rack_number . ',' . $arr[$row]->rack_number;
                $arr[$row]->case_quantity = $vl->case_quantity + $arr[$row]->case_quantity;
                $arr[$row]->ball_quantity = $vl->ball_quantity + $arr[$row]->ball_quantity;
                $arr[$row]->unit_quantity = $vl->unit_quantity + $arr[$row]->unit_quantity;
                $duplicates[] = $vl->jan;

            } else {
                $arr[] = $vl;
            }
            $newarr[] = $vl->jan;
        }
        $get_last_order_info=vendor_order::join('vendor_items','vendor_orders.vendor_item_id','vendor_items.vendor_item_id')->leftJoin('makers','makers.maker_id','vendor_items.maker_id')->where('vendor_items.jan',$jan)->orderBy('vendor_orders.vendor_order_id','DESC')->first();
       if(!$get_last_order_info){
            $get_last_order_info = array();
        }
        //print_r($arr);
        if (count($arr) > 0) {
            return response()->json(['status' => 200,'shops' => $shops['shops'], 'data' => $arr,'get_last_order_info'=>$get_last_order_info]);
        } else {
            $product = jan::where('jan', $jan)->get();
            return response()->json(['status' => 200,'shops' => $shops['shops'], 'data' => $product,'get_last_order_info'=>$get_last_order_info]);
        }
    }

    // oni
    public function ReceiveOrderData()
    {
        $result = DB::select("SELECT
        c.name AS customer_name,
        co.shipment_date,
        co.shipment_number,
        co.voucher_number,
        co.status
    FROM customer_orders AS co
    INNER JOIN customers AS c ON c.customer_id = co.customer_id
    WHERE DATE(co.shipment_date)=CURDATE()
    GROUP BY co.shipment_date,co.voucher_number
    ORDER BY c.name");

        return $result;
    }

    public function receive_order_data_popup(Request $request)
    {
        $vendor_id = $request->vendor_id;
        $wh = '';
        if ($vendor_id != 0) {
            $wh = ' and vo.vendor_id="' . $vendor_id . '"';
        }
        $result = DB::select("SELECT
 vo.vendor_order_id,v.name,vo.shipment_date,vo.voucher_number,vo.`status`
 FROM vendor_orders AS vo
 INNER JOIN vendors AS v ON vo.vendor_id=v.vendor_id
WHERE vo.`status`='未入荷' $wh
ORDER BY vo.shipment_date desc");

        return $result;
    }

    public function update_receive_order_item_content(Request $request)
    {
        $order_type = $request->order_type;
        $field_type = $request->field_type;
        $quantity = $request->quantity;
        $vendor_item_id = $request->vendor_item_id;
        $updtes = array(
            'order_point_case_quantity' => $request->order_point_case_quantity,
            'order_point_ball_quantity' => $request->order_point_ball_quantity,
            'order_point_unit_quantity' => $request->order_point_unit_quantity,
            'order_lot_case_quantity' => $request->order_lot_case_quantity,
            'order_lot_ball_quantity' => $request->order_lot_ball_quantity,
            'order_lot_unit_quantity' => $request->order_lot_unit_quantity
        );
        vendor_item::where('vendor_item_id', $vendor_item_id)->update($updtes);
        return $result = response()->json(['message' => 'update_success']);
    }

    /*handy vendor order query*/
    public function get_vendor_order_details_by_vendor_jan(Request $request)
    {
        $jan = $request->janCode;
        $vendor_items = vendor_item::where('jan', $jan)->first();
        if (empty($vendor_items)) {
            return $result = response()->json(['vendor_order' => 0, 'error_message' => '商品の登録がありません。']);
        }
        $where = 'where vi_all.jan="' . $jan . '"';
        $result = collect(\DB::select("SELECT
        vi_all.*,
        vod.inputs AS order_inputs,
        vod.vendor_order_detail_id,
        vod.vendor_order_id,
        vod.quantity
    FROM
    (
    SELECT
        vi.vendor_item_id,
        vi.cost_price,
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
SELECT SUM(quantity) as quantity,vendor_orders.status as vendor_order_status,vendor_order_details.vendor_order_id,vendor_order_details.vendor_item_id,vendor_order_details.inputs,vendor_order_details.vendor_order_detail_id FROM `vendor_orders` LEFT JOIN vendor_order_details on vendor_orders.vendor_order_id=vendor_order_details.vendor_order_id where vendor_orders.status='未入荷' GROUP BY vendor_order_details.vendor_item_id
    ) AS vod on vod.vendor_item_id=vi_all.vendor_item_id
    $where GROUP BY vi_all.jan
    ORDER BY quantity DESC,vi_all.vendor_name ASC,item_name ASC
    "))->first();
        $arrival_qty = collect(\DB::select("SELECT SUM(vendor_arrivals.quantity) as a_quantity FROM `vendor_arrivals` INNER join vendor_order_details as vod on vod.vendor_order_detail_id = vendor_arrivals.vendor_order_detail_id INNER join vendor_orders as vo on vo.vendor_order_id = vendor_arrivals.vendor_order_id inner join vendor_items on vendor_items.vendor_item_id = vod.vendor_item_id where vo.status='未入荷' and vendor_items.jan='" . $jan . "'"))->first();

        if ($arrival_qty) {
            $a_quantity = $arrival_qty->a_quantity;
        } else {
            $a_quantity = 0;
        }

        $all_reck = collect(\DB::select("SELECT `rack_number` FROM `stock_items` LEFT JOIN vendor_items on vendor_items.vendor_item_id=stock_items.vendor_item_id where vendor_items.jan='" . $jan . "'"));
        if ($all_reck) {
            $all_reck_total = $all_reck;
        } else {
            $all_reck_total = 0;
        }
        if ($result) {
            return $result = response()->json(['vendor_order' => $result, 'a_quantity' => $a_quantity, 'reck_total' => $all_reck_total]);
        } else {
            return $result = response()->json(['vendor_order' => 0, 'error_message' => 'この商品は、入荷予定ではありません。']);
        }
    }

    public function get_tonya_order_list_by_id($vendor_id)
    {
        $where = '';
        if ($vendor_id != null) {
            if ($vendor_id > 0) {
                $where = 'where vi_all.vendor_id="' . $vendor_id . '"';
            }
        }
        $result = DB::select("SELECT
        vi_all.*,
        va.today_case_arrival_qty,
        va.today_ball_arrival_qty,
        va.today_unit_arrival_qty,
        vod.order_case_quantity,
        vod.order_ball_quantity,
        vod.order_date,
        vod.shipment_date,
        vod.quantity,
        vod.voucher_number,
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
SELECT vendor_orders.order_case_quantity,vendor_orders.order_ball_quantity,vendor_orders.order_unit_quantity,vendor_orders.vendor_item_id,vendor_orders.voucher_number,vendor_orders.order_date,vendor_orders.shipment_date,vendor_orders.quantity FROM `vendor_orders` where vendor_orders.status='未入荷' GROUP BY vendor_orders.vendor_item_id
    ) AS vod on vod.vendor_item_id=vi_all.vendor_item_id
    LEFT JOIN (
        SELECT SUM(vendor_arrivals.arrival_case_quantity) as today_case_arrival_qty,SUM(vendor_arrivals.arrival_ball_quantity) as today_ball_arrival_qty,SUM(vendor_arrivals.arrival_unit_quantity) as today_unit_arrival_qty,vendor_orders.vendor_item_id FROM `vendor_arrivals` INNER JOIN vendor_orders on vendor_orders.vendor_order_id = vendor_arrivals.vendor_order_id WHERE date(`vendor_arrivals`.`arrival_date`)=CURDATE() GROUP BY vendor_orders.vendor_item_id) as va on va.vendor_item_id = vi_all.vendor_item_id
    $where
    ORDER BY vi_all.vendor_item_id DESC,vi_all.vendor_name ASC,item_name ASC
    ");

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
//        dd($data);
        return $data;
    }

    public function haccuListBytonya($vendor_id = 0)
    {
        $title = "小売マスタ";
        $active = 'vendor_master';
        /*hacchu order list*/
        $result = $this->get_tonya_order_list_by_id($vendor_id);
        $total = count($result);
        /*hacchu order list*/
        $tonya_name = '';
        $tonya_id = 0;
        $tonyaInfo = vendor::where('vendor_id', $vendor_id)->first();
        if ($tonyaInfo) {
            $tonya_name = $tonyaInfo->name;
            $tonya_id = $tonyaInfo->vendor_id;
        }
        // print_r($result);exit;
        return view('backend.order.hacchu_list_by_tonya', compact('title', 'active', 'tonya_name', 'tonya_id', 'result'));
    }
    public function haccuListBytonyaHandy($vendor_id = 0)
    {
        $title = "小売マスタ";
        $active = 'vendor_master';
        /*hacchu order list*/
        $result = $this->get_tonya_order_list_by_id($vendor_id);
        $total = count($result);
        /*hacchu order list*/
        $tonya_name = '';
        $tonya_id = 0;
        $tonyaInfo = vendor::where('vendor_id', $vendor_id)->first();
        if ($tonyaInfo) {
            $tonya_name = $tonyaInfo->name;
            $tonya_id = $tonyaInfo->vendor_id;
        }
        return $result = response()->json(['results' => $result, 'tonya_name'=>$tonya_name,'tonya_id'=>$tonya_id]);

        // print_r($result);exit;
        //return view('backend.order.hacchu_list_by_tonya', compact('title', 'active', 'tonya_name', 'tonya_id', 'result'));
    }

    public function exportCsvByTonya($vendor_id)
    {
        $tonyaInfo = vendor::where('vendor_id', $vendor_id)->first();
        if (!$tonyaInfo) {
           // return response()->json(['success' => 0,'message'=>'メールを送信するにはtonyaを選択してください']);
            return redirect()->back()->with('message', 'メールを送信するにはtonyaを選択してください');
        }
        $filename = storage_path('app/public/All_csv/file.csv');
        $handle = fopen($filename, 'w+');
        $tonyaInfo = vendor::where('vendor_id', $vendor_id)->first();
        $result = $this->get_tonya_order_list_by_id($vendor_id);
        /*
            prepare csv
        */
        $new_row = array();
        if ($result) {
            foreach ($result as $value) {
                $new_row[] = array(
                    "super_name" => 'Super A',
                    "shop_name" => 'Demo shop',
                    "shop_code" => '654321',
                    "partner_code" => '123456',
                    "voucher_number" => $value->voucher_number,
                    "order_date" => $value->order_date,
                    "devlivery_date" => $value->shipment_date,
                    "name" => $value->item_name,
                    "jan" => $value->jan,
                    "inputs" => 'ケース',
                    "quantity" => $value->quantity,
                    "cost_price" => $value->cost_price,
                    "store_price" => $value->cost_price
                );
            }
        }

        fputcsv($handle, array("super_name", "shop_name", "shop_code", "partner_code", "voucher_number", "order_date", "devlivery_date", "item.name", "jan", "inputs", "quantity", "cost_price", "store_price"), ",", '"');
        foreach ($new_row as $type => $row) {
            fputcsv($handle, $row, ",", '"');
        }

        fclose($handle);
        $headers = array(
            'Content-Type' => 'text/csv',
        );
        return response()->download($filename, $tonyaInfo->name . date("d-m-Y H:i") . '.csv', $headers);
    }

    public function emailCsvByTonya($vendor_id)
    {
        $tonyaInfo = vendor::where('vendor_id', $vendor_id)->first();
        if (!$tonyaInfo) {
           // return response()->json(['success' => 0,'message'=>'メールを送信するにはtonyaを選択してください']);
            return redirect()->back()->with('message', 'メールを送信するにはtonyaを選択してください');
        }
        // $filename = storage_path('app/public/All_csv/file.csv');
        $filename = public_path('backend/csv/file.csv');
        $handle = fopen($filename, 'w+');
        $result = $this->get_tonya_order_list_by_id($vendor_id);
        /*
            prepare csv
        */
        $new_row = array();
        if ($result) {
            foreach ($result as $value) {
                $new_row[] = array(
                    "super_name" => 'Super A',
                    "shop_name" => 'Demo shop',
                    "shop_code" => '654321',
                    "partner_code" => '123456',
                    "voucher_number" => $value->voucher_number,
                    "order_date" => $value->order_date,
                    "devlivery_date" => $value->shipment_date,
                    "name" => $value->item_name,
                    "jan" => $value->jan,
                    "inputs" => 'ケース',
                    "quantity" => $value->quantity,
                    "cost_price" => $value->cost_price,
                    "store_price" => $value->cost_price
                );
            }
        }

        fputcsv($handle, array("super_name", "shop_name", "shop_code", "partner_code", "voucher_number", "order_date", "devlivery_date", "item.name", "jan", "inputs", "quantity", "cost_price", "store_price"), ",", '"');

        foreach ($new_row as $type => $row) {
            fputcsv($handle, $row, ",", '"');
        }

        //fclose($handle);
        $headers = array(
            'Content-Type' => 'text/csv',
        );
        /*send mail*/
        $data["email"] = "shakilreyan9397@gmail.com";
        $data["title"] = "From Dhaka Jacos";
        $data["body"] = "This is Demo";

        $files = [
            $filename
        ];
        fclose($handle);
        Mail::send('backend.email_template.thank_you', $data, function ($message) use ($data, $files) {
            $message->to($data["email"], $data["email"])
                ->subject($data["title"]);
            // $message->attach($filename);
            foreach ($files as $file) {
                $message->attach($file);
            }

        });
        return redirect()->back()->with('message', 'メールはtonyaに正常に送信されました');
    }

    public function sendTomailportal($vendor_id)
    {
        //set_time_limit(0);
        $csrfToken = csrf_token();
        $tonyaInfo = vendor::where('vendor_id', $vendor_id)->first();
        if (!$tonyaInfo) {
            return response()->json(['success' => 0,'message'=>'メールを送信するにはtonyaを選択してください']);
           // return redirect()->back()->with('message', 'メールを送信するにはtonyaを選択してください');
        }
        // $filename = storage_path('app/public/All_csv/file.csv');
       $fname = 'file.csv';
       $fnameH = 'hacchu_file.csv';
        $filename = public_path('backend/csv/').$fname;
        $hacchu_file = public_path('backend/csv/').$fnameH;
        $handle = fopen($filename, 'w+');
        $handle2 = fopen($hacchu_file, 'w+');

        $result = $this->get_tonya_order_list_by_id($vendor_id);
        $fileUrl =  url('/').'/backend/csv/file.csv';
        $haccufileUrl =  url('/').'/backend/csv/hacchu_file.csv';
        /*
            prepare csv
        */

        $new_row = array();
        $new_row2 = array();
        $super_name = 'Super A';
        $shop_name = 'Demo shop';
        $shop_code = '654321';
        $partner_code = '123456';
        $csv = "super_name, shop_name, shop_code, partner_code, voucher_number, order_date, devlivery_date, item.name, jan, inputs, quantity, cost_price, store_price\n";
        $csv2 = "NO, 画像, 品名・メーカー・規格, 区分, ケース, ボール, バラ, a原価コスト, 取引先名\n";
        if ($result) {
            $s = 1;
            foreach ($result as $value) {
                $csv .= $super_name.','.$shop_name.','.$shop_code.','.$partner_code.','.$value->voucher_number.','.$value->order_date.','.$value->shipment_date.','.$value->item_name.','.$value->jan.',ケース,'.$value->quantity.','.$value->cost_price.','.$value->cost_price."\n";

                $new_row[] = array(
                    "super_name" => 'Super A',
                    "shop_name" => 'Demo shop',
                    "shop_code" => '654321',
                    "partner_code" => '123456',
                    "voucher_number" => $value->voucher_number,
                    "order_date" => $value->order_date,
                    "devlivery_date" => $value->shipment_date,
                    "name" => $value->item_name,
                    "jan" => $value->jan,
                    "inputs" => 'ケース',
                    "quantity" => $value->quantity,
                    "cost_price" => $value->cost_price,
                    "store_price" => $value->cost_price
                );
                $csv2 .= $s.',画像<br>なし,'.$value->item_name.',定,'.$value->case_inputs.','.$value->ball_inputs.',,'.$value->cost_price.','.$tonyaInfo->name."\n";
                $new_row2[] = array(
                    "NO" => $s,
                    "logo" => '画像<br>なし',
                    "name" => $value->item_name,
                    "order_type" => '定',
                    "case_inputs" => $value->case_inputs,
                    "ball_inputs" => $value->ball_inputs,
                    "unit_input" => '',
                    "cost_price" => $value->cost_price,
                    "vendor_name" => $tonyaInfo->name,

                );
                $s++;

            }
        }

        fputcsv($handle, array("super_name", "shop_name", "shop_code", "partner_code", "voucher_number", "order_date", "devlivery_date", "item.name", "jan", "inputs", "quantity", "cost_price", "store_price"), ",", '"');
        fputcsv($handle2, array("NO", "画像", "品名・メーカー・規格", "区分", "ケース", "ボール", "バラ", "a原価コスト", "取引先名"), ",", '"');

        foreach ($new_row as $type => $row) {
            fputcsv($handle, $row, ",", '"');
        }

        foreach ($new_row2 as $type => $row) {
            fputcsv($handle2, $row, ",", '"');
        }

        //fclose($handle);
        $headers = array(
            'Content-Type' => 'text/csv',
        );

        $files = [
            $filename,
            $hacchu_file
        ];
      /*  echo 'OKKKKKK<br>';

        echo 'OK';

        $handle = fopen(public_path('backend/csv/').$fname, 'w');
        $handle2 = fopen(public_path('backend/csv/').$fnameH, 'w');
        fwrite($handle, mb_convert_encoding($csv, 'sjis-win', 'utf-8'));
        fwrite($handle2, mb_convert_encoding($csv2, 'sjis-win', 'utf-8')); */
        fclose($handle);
        fclose($handle2);
        $new_file_url1 = \Config::get('app.url') . "/public/backend/csv/" . $fname;
        $new_file_url2 = \Config::get('app.url') . "/public/backend/csv/" . $fnameH;
        $ch = curl_init();
       // print_r($result);exit;
        // $skipper = "luxury assault recreational vehicle";
        //$fields = array( 'jan'=> $code_value);
        $fields = array('jan' => '93434435345345');
        // $postvars = '';
        // foreach($fields as $key=>$value) {
        //     $postvars .= $key . "=" . $value . "&";
        // }
        $post_array = array(
            //'file' => 'https://ryutu-van.dev.jacos.jp/rv3_tonyav1/public/backend/csv/file.csv',//$fileUrl,
            //'hacchu_file' => 'https://ryutu-van.dev.jacos.jp/rv3_tonyav1/public/backend/csv/file.csv',//$haccufileUrl,
            'file' => $new_file_url1,
            'hacchu_file' => $new_file_url2,
            // 'file' => '@' . realpath($filename),
            // 'hacchu_file' => '@' . realpath($hacchu_file),
            'receiver_name' => $tonyaInfo->name,
            'receiver_id' => $tonyaInfo->vendor_id,
            'receiver_phone' => $tonyaInfo->phone,
            'receiver_partner_code' => $tonyaInfo->partner_code,
            'subject' => 'CSVファイル仕入先名別発注リスト',
            'sender_name' => 'A スーパー',
            'sender_id' => '1',
            'sender_phone' => '987654321543',
            'sender_partner_code' => '909090',
        );
        $fields_string = http_build_query($post_array);
        $postvars = '';
        foreach($post_array as $key=>$value) {
            $postvars .= $key . "=" . $value . "&";
        }
       // echo $fields_string;exit;
        // $headers = array();
        // $headers[] = "Cookie: X-CSRF-Token=$csrfToken";
        // $headers[] = "Cookie: X-CSRF-Token=$csrfToken";
        $url = "https://keipro.development.dhaka10.dev.jacos.jp/mail/index.php/api/File_send/mail_send";
       /* curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);                //0 for a get request
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postvars);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_TIMEOUT, 0);//500 second
        //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        //$headers[] = 'Content-Type: application/json';
   // curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);

        $err = curl_error($ch);
        curl_close($ch);
        if ($err) {
            echo "cURL Error #:" . $err;exit;
          } else {
            echo json_decode($response);exit;
          }
        print_r($response);
        */
        //echo $fields_string;exit;
            curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_POST, 1);                //0 for a get request
            curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch,CURLOPT_CONNECTTIMEOUT ,3);
            curl_setopt($ch,CURLOPT_TIMEOUT, 500);
            $response = curl_exec($ch);
            curl_close ($ch);
             $rep_data = json_decode($response);

        return response()->json(['success' => 1,'message'=>'メールはtonyaに正常に送信されました']);
    }
}
