<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ApiController;
use App\jan;
use App\vendor;
use App\customer;
use App\maker;
use App\vendor_item;
use App\in_company;
use App\customer_item;
use App\vendor_order;
use App\vendor_order_detail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Session;
use DB;

class VendorController extends Controller
{
    private $api_request;

    public function __construct()
    {
        $this->api_request = new ApiController();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $vendor_id = $request->vendor_id;
        $result = '';
        if ($vendor_id != null) {
            $specific_vendor_info = vendor::where('vendor_id', $vendor_id)->first();
            $result = response()->json(['specific_vendor_info' => $specific_vendor_info]);
        } else {
            $all_vendor_list = vendor::where('is_deleted', 0)->get();
            $result = response()->json(['all_vendor_list' => $all_vendor_list]);
        }
        return $result;
        // $api_data=$this->api_data->get_api_data('4909411070557');
    }

    public function vendorList()
    {

        $all_vendor_list = vendor::where('is_deleted', 0)->get();
        return response()->json(['all_vendor_list' => $all_vendor_list]);
        return $result;
        // $api_data=$this->api_data->get_api_data('4909411070557');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        \Log::info('function Start');

        // return $request->all();
        $vendor_id = $request->vendor_id;
        \Log::info('Vendor Id= ' . $vendor_id);
        if (!(Validator::make($request->all(), ['vendor_name' => 'required|max:50'])->passes())) {
            return response()->json(['message' => 'name_required']);
        }
        \Log::info('Name Passed');
        if (!(Validator::make($request->all(), ['vendor_code' => 'required|max:20'])->passes())) {
            return response()->json(['message' => 'vendor_code_required']);
        }
        \Log::info('Code passed');
        if (!(Validator::make($request->all(), ['vendor_phone' => 'required|min:6|max:20'])->passes())) {
            return response()->json(['message' => 'phone_required']);
        }
        \Log::info('Phone passed');
        $vendor_name = $request->vendor_name;
        $vendor_code = $request->vendor_code;
        $vendor_phone = $request->vendor_phone;
        $vendor_item_id = $request->vendor_item_id;
        $maker_id = $request->maker_id;
        $vendor_info = array(
            "name" => $vendor_name,
            "partner_code" => $vendor_code,
            "phone" => $vendor_phone,
        );
        \Log::info('Data array bind');
        if ($vendor_id == null) {
            if (vendor::where('partner_code', $vendor_code)->first()) {
                \Log::info('Code exists');
                return response()->json(['message' => 'code_exists']);
            } else {
                $vendor_id = vendor::insertGetId($vendor_info);
                \Log::info('Insert done');
                if (isset($maker_id) && $maker_id != '') {
                    vendor_item::where('maker_id', $maker_id)->update(['vendor_id' => $vendor_id]);
                    maker::where('maker_id', $maker_id)->update(['vendor_id' => $vendor_id]);
                }
                return response()->json(['message' => 'insert_success', 'vendor_id' => $vendor_id]);
            }
            \Log::info('Insert end');
        } else {
// update
            \Log::info('Update Start');
            $vendor_all_info = vendor::where('vendor_id', '=', $vendor_id)->first();
            $original_vendor_code = $vendor_all_info->partner_code;
            if ($original_vendor_code != $vendor_code) {
                if (vendor::where('partner_code', '=', $vendor_code)->first()) {
                    return response()->json(['message' => 'code_exists']);
                }
            }
            vendor::where('vendor_id', '=', $vendor_id)->update($vendor_info);
            return response()->json(['message' => 'update_success', 'vendor_id' => $vendor_id]);
        }
    }

    public function vendor_master_update_by_vendor_id(Request $request)
    {
        $vendor_id = $request->vendor_id;
        $maker_id = $request->maker_id;
        $vendor_item_id = $request->vendor_item_id;
        if ($vendor_id != '' && $maker_id != '') {

            vendor_item::where('maker_id', $maker_id)->update(['vendor_id' => $vendor_id]);
            maker::where('maker_id', $maker_id)->update(['vendor_id' => $vendor_id]);

        }
        return response()->json(['message' => 'update_success', 'vendor_id' => $vendor_id]);
    }

    public function get_all_vendor_list_for_select2(Request $request)
    {
        $vendor_name = $request->searchTerm;
        $results = vendor::select('vendor_id as id', 'name as text')->where('is_deleted', 0)->where('name', 'like', "%{$vendor_name}%")->get();
        return response()->json(['results' => $results]);
        //$searchTerm = $request->
    }

    public function get_all_customer_list_for_select2(Request $request)
    {
        $vendor_name = $request->searchTerm;
        $results = customer::select('customer_id as id', 'name as text')->where('is_deleted', 0)->where('name', 'like', "%{$vendor_name}%")->get();
        return response()->json(['results' => $results]);
        //$searchTerm = $request->
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $vendor_id = $request->vendor_id;
        vendor::where('vendor_id', $vendor_id)->update(['is_deleted' => 1]);
        return $result = response()->json(['message' => 'delete_success']);
    }

    /**
     * Get Jan information from Storage or an URL.
     *
     * @return \Illuminate\Http\Response
     */
    public function get_maker_info_by_maker_code_super($jan_code, $data_resource, $vendor_item_data, $api_data)
    {
        // $maker_code = substr($jan_code, 0, 7);
        // $m_infos = array();
        // $vendor_id = 0;
        // if (maker::where('maker_code', $maker_code)->first()) {
        //     $api_datas = maker::where('maker_code', $maker_code)->first();
        //     $maker_resource = 'database';
        //     $maker_id = $api_datas->maker_id;
        // } else {
        //     $maker_name = ($api_data->maker_name!=''?$api_data->maker_name:'テストメーカー');
        //     $maker_name = str_replace('株式会社','',$maker_name);
        //     $maker_id = maker::insertGetId(['maker_code'=>$maker_code,'vendor_id'=>$vendor_id,'maker_name'=>$maker_name]);

        // }
        // return $maker_id;
        $janLenght = strlen($jan_code);
        if($janLenght=='8'){
            $maker_code = substr($jan_code, 0, 5);
        }else{
            $maker_code = substr($jan_code, 2, 5);
        }
        $m_infos = array();
        $vendor_id = 0;
        $maker_id = 0;
        if (maker::where('maker_code', $maker_code)->first()) {
            $api_data = maker::where('maker_code', $maker_code)->first();
            $maker_resource = 'database';
            $vendor_id = $api_data->vendor_id;
            $maker_id = $api_data->maker_id;
        } else {
            $maker_name = ($api_data->maker_name != '' ? $api_data->maker_name : 'テストメーカー');
            $maker_name = str_replace('株式会社', '', $maker_name);
            $maker_id = maker::insertGetId(['maker_code' => $maker_code, 'vendor_id' => $vendor_id, 'maker_name' => $maker_name]);
        }
        $m_infos = array($vendor_id, $maker_id);
        return $m_infos;
    }

    public function get_maker_info_by_maker_code($jan_code, $data_resource, $vendor_item_data, $api_data)
    {
        $janLenght = strlen($jan_code);
        if($janLenght=='8'){
            $maker_code = substr($jan_code, 0, 5);
        }else{
            $maker_code = substr($jan_code, 2, 5);
        }
        $m_infos = array();
        $vendor_id = 0;
        if (maker::where('maker_code', $maker_code)->first()) {
            $api_datas = maker::where('maker_code', $maker_code)->first();
            $maker_resource = 'database';
            //$m_infos = array('maker_info'=>$api_data,'m_source'=>$maker_resource);
            $vendor_id = $api_datas->vendor_id;
        } else {
            $maker_name = ($api_data->maker_name != '' ? $api_data->maker_name : 'テストメーカー');
            $maker_name = str_replace('株式会社', '', $maker_name);
            if (vendor::where('partner_code', $maker_code)->first()) {
                $api_datas = vendor::where('partner_code', $maker_code)->first();
                $vendor_id = $api_datas->vendor_id;
            } else {
                $vendor_id = vendor::insertGetId(['name' => $maker_name, 'partner_code' => $maker_code, 'phone' => '34534533454']);
                maker::insert(['maker_code' => $maker_code, 'vendor_id' => $vendor_id, 'maker_name' => $maker_name]);
            }

        }
        return $vendor_id;
    }

    public function get_vendor_name_by_vendor_id($vendor_id)
    {
        $vendor_name = '';
        if ($vendor_id != 0) {
            if (vendor::where('vendor_id', $vendor_id)->first()) {
                $api_data = vendor::where('vendor_id', $vendor_id)->first();
                $vendor_name = $api_data->name;
            }
        }
        return $vendor_name;
    }

    public function item_search_by_name(Request $request)
    {
        $name = $request->name;
        $type = isset($request->type) ? 1 : 0;
        $name = str_replace(' ', '', $name);
        // $result = jan::select('jans.jan','jans.name')->join('vendor_items', 'vendor_items.jan', '=', 'jans.jan')->where('vendor_items.is_special','0')->where('REPLACE (jans.name," ","")','like', DB::raw("'%$name%'"))->get();
        $result = jan::select('jans.jan', 'jans.name')
            ->join('vendor_items', 'vendor_items.jan', '=', 'jans.jan')
            ->where('vendor_items.is_special', '0');
        if ($type) {
            $result = $result->where('vendor_items.vendor_id', '!=', '0');
        }
        $result = $result->WhereRaw('REPLACE (jans.name," ","") LIKE "%' . $name . '%"')
            ->get();

//        $sql = $type ? "and `vendor_id` != 0" : "";
//
//
//        $result = DB::select("select `jans`.`jan`, `jans`.`name`, `vendor_id` from `jans` inner join `vendor_items` on `vendor_items`.`jan` = `jans`.`jan` where `vendor_items`.`is_special` = '0' " . $sql . " and REPLACE (jans.name,' ','')  LIKE '%" . $name . "%'");
        return $result = response()->json(['name_list' => $result]);
    }

    public function getJanInfo(Request $request)
    {
        $jan_code = $request->jan_code;
        $api_data = '';
        $data_resource = '';
        $vendor_item_data = 0;
        $vendor_id = 0;
        if (jan::where('jan', $jan_code)->first()) {
            $api_data = jan::where('jan', $jan_code)->first();
            if (vendor_item::where('jan', $jan_code)->first()) {
                $item_info = vendor_item::where('jan', $jan_code)->first();
                $vendor_item_data = 1;
                $vendor_id = $item_info->vendor_id;
            }
            $data_resource = 'database';
        } else {
            $api_response = $this->api_request->get_api_data($jan_code);
            //print_r($api_response->data);exit;
            $api_data_check = json_decode(json_encode($api_response->data));

            if (is_null($api_data_check->jan_code) || $api_data_check->jan_code=='') {
                $api_data = 'invalid_jan_code';
                $data_resource = 'api_invalid';
                return $result = response()->json(['api_data' => $api_data, 'data_resource' => $data_resource, 'vendor_item_data' => $vendor_item_data]);
            } else {
                $api_data = $api_data_check;
                if (vendor_item::where('jan', $jan_code)->first()) {
                    $item_info = vendor_item::where('jan', $jan_code)->first();
                    $vendor_item_data = 1;
                    $vendor_id = $item_info->vendor_id;
                }
                $data_resource = 'api';
            }

        }
        // $vendor_id = $this->get_maker_info_by_maker_code($jan_code,$data_resource,$vendor_item_data,$api_data);//for auto vendor
        $maker_vendor_info = $this->get_maker_info_by_maker_code_super($jan_code, $data_resource, $vendor_item_data, $api_data);
        $vendor_id = $maker_vendor_info[0];
        $maker_id = $maker_vendor_info[1];
        $vendor_name = $this->get_vendor_name_by_vendor_id($vendor_id);
        return $result = response()->json(['api_data' => $api_data, 'data_resource' => $data_resource, 'vendor_item_data' => $vendor_item_data, 'vendor_id' => $vendor_id, 'maker_id' => $maker_id, 'vendor_name' => $vendor_name]);
    }

    public function addVendorItem(Request $request)
    {
        // return $request->all();
        if (!(Validator::make($request->all(), ['vendor_id' => 'required'])->passes())) {
            return $result = response()->json(['message' => 'Vendor id is required']);
        }
        if (!(Validator::make($request->all(), ['jan_code' => 'required'])->passes())) {
            return $result = response()->json(['message' => 'Jan code is required']);
        }
        // if (!(Validator::make($request->all(), ['item_name' => 'required|max:100'])->passes())) {
        //     return $result = response()->json(['message' => 'Jan Name is required']);
        // }
        if (!(Validator::make($request->all(), ['case_qty' => 'required|max:4'])->passes())) {
            return $result = response()->json(['message' => 'Case inputs is required']);
        }
        if (!(Validator::make($request->all(), ['ball_qty' => 'required|max:4'])->passes())) {
            return $result = response()->json(['message' => 'Ball inputs is required']);
        }
        if (!(Validator::make($request->all(), ['price' => 'required|max:20'])->passes())) {
            return $result = response()->json(['message' => 'Vendor cost price is required']);
        }
        if (!(Validator::make($request->all(), ['order_point_unit' => 'required|max:10'])->passes())) {
            return $result = response()->json(['message' => 'Order point unit is required']);
        }
        if (!(Validator::make($request->all(), ['order_point_quantity' => 'required|max:10'])->passes())) {
            return $result = response()->json(['message' => 'Order point quantity is required']);
        }
        if (!(Validator::make($request->all(), ['order_lot_unit' => 'required|max:10'])->passes())) {
            return $result = response()->json(['message' => 'Order lot unit is required']);
        }
        if (!(Validator::make($request->all(), ['order_lot_quantity' => 'required|max:10'])->passes())) {
            return $result = response()->json(['message' => 'Order lot quantity is required']);
        }

        $maker_id = $request->maker_id;
        $is_special = isset($request->is_special) ? $request->is_special : '0';
        $vendor_id = $request->vendor_id;
        $jan_code = $request->jan_code;

        $janLenght = strlen($jan_code);
        if($janLenght=='8'){
            $maker_code = substr($jan_code, 0, 5);
        }else{
            $maker_code = substr($jan_code, 2, 5);
        }

        $item_name = $request->item_name;
        $case_qty = $request->case_qty;
        $ball_qty = $request->ball_qty;
        $price = $request->price;
        $vendor_item_id = $request->vendor_item_id;
        $sale_price = $request->sale_price;
        $basic_start_date = $request->basic_start_date;
        $basic_end_date = $request->basic_end_date;
        $sale_start_date = $request->sale_start_date;
        $sale_end_date = $request->sale_end_date;
        $order_point_unit = $request->order_point_unit;
        $order_point_quantity = $request->order_point_quantity;
        $order_lot_unit = $request->order_lot_unit;
        $order_lot_quantity = $request->order_lot_quantity;
        $api_maker_name = $request->api_maker_name;
        if ($is_special == 0) {
            $profit_percent = ($price > 0 ? 20 : 0);
        } else {
            $profit_percent = ($price > 0 ? 20 : 0);
        }
        $selling_price = $price + (($price * $profit_percent) / 100);
        $selling_price = round($selling_price, 2);
        // $profit = $selling_price - $price;
        $profit = ($profit_percent/$selling_price)*100;
        $profit = round($profit, 2);


        //  jan insert
        $jan_ins_array = array(
            "jan" => $jan_code,
            "name" => $item_name,
            "jan_start_date" => date('Y-m-d H:i:s'),
            "jan_end_date" => date('Y-m-d H:i:s'),
        );
        if ($case_qty != 0) {
            $jan_ins_array['case_inputs'] = $case_qty;
        }

        if ($ball_qty != 0) {
            $jan_ins_array['ball_inputs'] = $ball_qty;
        }
        if (jan::where('jan', $jan_code)->first()) {
            $jan_update_array = array(
                "name" => $item_name,
            );

            if ($case_qty != 0) {
                $jan_update_array['case_inputs'] = $case_qty;
            }

            if ($ball_qty != 0) {
                $jan_update_array['ball_inputs'] = $ball_qty;
            }

            jan::where('jan', '=', $jan_code)->update($jan_update_array);
            // return $result = response()->json(['message' => 'Jan code duplicated','class_name'=>'alert-danger']);
        } else {
            jan::insert($jan_ins_array);
            //return $result = response()->json(['message' => 'insert_success']);
        }


        if (maker::where('maker_code', $maker_code)->first()) {
            $api_data = maker::where('maker_code', $maker_code)->first();
            $maker_resource = 'database';
            $maker_id = $api_data->maker_id;
            if ($vendor_id != 0) {
                maker::where('maker_code', $maker_code)->update(['vendor_id' => $vendor_id]);
            }
        }


        $vendor_data_ins_array = array(
            'maker_id' => $maker_id,
            'vendor_id' => $vendor_id,
            'is_special' => $is_special,
            'jan' => $jan_code,
            'cost_price' => $price,
            'sale_cost_price' => $sale_price,
            'selling_price' => $selling_price,
            'gross_profit' => $profit,
            'gross_profit_margin' => $profit_percent,
            "start_date" => $basic_start_date,

            "order_point_inputs" => $order_point_unit,
            "order_point_quantity" => $order_point_quantity,
            "order_lot_inputs" => $order_lot_unit,
            "order_lot_quantity" => $order_lot_quantity,
        );

//        dd($vendor_data_ins_array);

        if ($basic_end_date != '') {
            $vendor_data_ins_array['end_date'] = $basic_end_date;
        }
        if ($sale_start_date != '') {
            $vendor_data_ins_array['sale_start_date'] = $sale_start_date;
        }
        if ($sale_end_date != '') {
            $vendor_data_ins_array['sale_end_date'] = $sale_end_date;
        }
        /* add to customer item */
        $customer_item_array = array(
            'c_name' => 0,
            'v_name' => $vendor_id,
            'j_code' => $jan_code,
            'cost_price' => $selling_price
        );
        $add_to = $this->add_auto_customer_item($customer_item_array);
        /* add to customer item */
        if ($vendor_item_id == null) {
            if (vendor_item::where('jan', $jan_code)->first()) {
                return $result = response()->json(['message' => __('messages.jan_code_exists')]);
            } else {
                if (vendor_item::where('jan', $jan_code)->first()) {
                    return $result = response()->json(['message' => __('messages.jan_code_exists')]);
                }else{
                    vendor_item::insert($vendor_data_ins_array);
                    return $result = response()->json(['message' => 'insert_success']);
                }

            }
        } else {
            $vendor_data_update_array = array(
                'cost_price' => $price,
                "start_date" => $basic_start_date,
                "order_point_inputs" => $order_point_unit,
                "order_point_quantity" => $order_point_quantity,
                "order_lot_inputs" => $order_lot_unit,
                "order_lot_quantity" => $order_lot_quantity,
            );

            if ($basic_end_date != '') {
                $vendor_data_update_array['end_date'] = $basic_end_date;
            }
            if ($sale_price != '') {
                $vendor_data_update_array['sale_cost_price'] = $sale_price;
            }
            if ($sale_start_date != '') {
                $vendor_data_update_array['sale_start_date'] = $sale_start_date;
            }
            if ($sale_end_date != '') {
                $vendor_data_update_array['sale_end_date'] = $sale_end_date;
            }

            vendor_item::where('vendor_item_id', '=', $vendor_item_id)->update($vendor_data_update_array);
            return $result = response()->json(['message' => 'update_success']);
        }
        // jan insert

    }

    public function update_vendor_itms_by_vendor_id(Request $request)
    {
        $vendor_id = $request->vendor_id;
        $vendor_item_id = $request->vendor_item_id;
        $vendor_info = vendor_item::where('vendor_item_id', $vendor_item_id)->first();
        $janLenght = strlen($vendor_info->jan);
        if($janLenght=='8'){
            $maker_code = substr($vendor_info->jan, 0, 5);
        }else{
            $maker_code = substr($vendor_info->jan, 2, 5);
        }
        //$vendor_name = $this->get_vendor_name_by_vendor_id($vendor_id);
        $api_response = $this->api_request->get_api_data($vendor_info->jan);
        $api_maker_name = $api_response->data->maker_name;
        if (maker::where('maker_code', $maker_code)->first()) {
            maker::where('maker_code', $maker_code)->update(['vendor_id' => $vendor_id]);
        } else {
            if ($vendor_id != 0) {
                $maker_ins_array = array(
                    'vendor_id' => $vendor_id,
                    'maker_name' => $api_maker_name,
                    'maker_code' => $maker_code,
                );
                maker::insert($maker_ins_array);
            }
        }
        vendor_item::where('vendor_item_id', '=', $vendor_item_id)->update(['vendor_id' => $vendor_id]);
        customer_item::where('jan', '=', $vendor_info->jan)->update(['vendor_id' => $vendor_id]);

        return $result = response()->json(['message' => 'update_success']);
    }

    public function add_auto_customer_item($data)
    {
        $gross_profit_margin = ($data['cost_price'] > 0 ? 30 : 0);
        $selling_price = $data['cost_price'] + (($data['cost_price'] * $gross_profit_margin) / 100);
        $selling_price = round($selling_price, 2);
        // $gross_profit = $selling_price - $data['cost_price'];
        $gross_profit = ($gross_profit_margin/$selling_price)*100;
        $gross_profit = round($gross_profit, 2);



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
        if (customer_item::where('jan', $data['j_code'])->first()) {
            return 'item already registered';
        } else {
            $customer_list = customer::where('is_deleted', 0)->get();
            if ($customer_list) {
                foreach ($customer_list as $customer) {
                    $customer_data_ins_array['customer_id'] = $customer->customer_id;
                    customer_item::insert($customer_data_ins_array);
                }
            }


            return 'item registered success';
        }
    }

    public function update_vendor_item_estimate_items(Request $request) {
        $jan = $request->jan;
        $price = $request->price;
        $selling_price = $request->selling_price;
        $gross_profit_margin = $request->gross_profit_margin;
        $sale_selling_price = $request->sale_selling_price;
        $gross_profit = $request->gross_profit;

        /*update in_cmpany*/
        vendor_item::where('jan', '=', $jan)
            ->update([
                'cost_price' => $price,
                'selling_price' => $selling_price,
                'gross_profit_margin' => $gross_profit_margin,
                'gross_profit' => $gross_profit,
                'sale_selling_price' => $sale_selling_price
            ]);
        return  response()->json(['message' => 'update_success']);
    }

    public function update_vendor_master_item_content(Request $request)
    {
        $vendor_item_id = $request->vendor_item_id;
        $price = $request->price;
        $selling_price = $request->selling_price;
        $gross_profit = $request->gross_profit;
        $gross_profit_margin = $request->gross_profit_margin;
        $case_qty = $request->case_qty;
        $ball_qty = $request->ball_qty;
        $item_name = $request->product_name;
        $vendor_info = vendor_item::where('vendor_item_id', $vendor_item_id)->first();
        $jan_update_array = array(
            "name" => $item_name,
            "case_inputs" => $case_qty,
            "ball_inputs" => $ball_qty,
        );

        jan::where('jan', '=', $vendor_info->jan)->update($jan_update_array);

        /*update in_cmpany*/
        vendor_item::where('vendor_item_id', '=', $vendor_item_id)->update(['cost_price' => $price,'selling_price' => $selling_price, 'gross_profit' => $gross_profit, 'gross_profit_margin' => $gross_profit_margin]);

        if (isset($request->sale_selling_price)) {
            vendor_item::where('vendor_item_id', '=', $vendor_item_id)->update(['sale_selling_price'=>$request->sale_selling_price]);
        }

        $selling_price = floatval($selling_price);
        if ($selling_price > 0) {
            $customer_cost_price = $selling_price;
            $customer_profit_margin = 30;
            $customer_selling_price = $selling_price + (($selling_price * $customer_profit_margin) / 100);
            $customer_selling_price = round($customer_selling_price);
            $customer_profit = $customer_selling_price - $customer_cost_price;
            $check_customer_item = customer_item::where('jan', '=', $vendor_info->jan)->first();
            if ($check_customer_item) {
                if ($check_customer_item->cost_price == '0.00') {
                    customer_item::where('jan', '=', $vendor_info->jan)
                        ->update([
                            'selling_price' => $customer_selling_price,
                            'cost_price' => $customer_cost_price,
                            'gross_profit' => $customer_profit,
                            'gross_profit_margin' => $customer_profit_margin
                        ]);
                }
            }
        }
        return $result = response()->json(['message' => 'update_success']);
    }

    public function update_in_company_code(Request $request)
    {
        $in_company_code = $request->in_company_code;
        $vendor_item_id = $request->vendor_item_id;
        $vendor_info = vendor_item::where('vendor_item_id', $vendor_item_id)->first();
        $duplicate_company_code = 0;
        if ($in_company_code != '') {

            if (in_company::where('in_company_code', $in_company_code)->first()) {
                $duplicate_company_code = 1;
            } else {
                if (in_company::where('jan', $vendor_info->jan)->first()) {
                    in_company::where('jan', $vendor_info->jan)->update(['in_company_code' => $in_company_code]);
                } else {
                    in_company::insert(['jan' => $vendor_info->jan, 'in_company_code' => $in_company_code]);
                }
            }
        }
        return $result = response()->json(['message' => 'update_success', 'duplicate_company_code' => $duplicate_company_code]);

    }

//update vendor item
    public function updateVendorItem(Request $request)
    {
        $jan_code = $request->jan_code;
        $case_qty = $request->case_qty;
        $ball_qty = $request->ball_qty;
        $price = $request->price;
        $vendor_item_id = $request->vendor_item_id;
        $sale_price = $request->sale_price;
        $basic_start_date = $request->start_date;
        $basic_end_date = $request->end_date;
        $sale_start_date = $request->sale_start_date;
        $sale_end_date = $request->sale_end_date;
        $item_name = $request->item_name;
        if (jan::where('jan', $jan_code)->first()) {
            $jan_update_array = array(
                "case_inputs" => $case_qty,
                "ball_inputs" => $ball_qty,
                "name" => $item_name,
            );

            jan::where('jan', '=', $jan_code)->update($jan_update_array);
        }


        $vendor_data_update_array = array(
            'cost_price' => $price,
            'sale_cost_price' => $sale_price,
            "start_date" => $basic_start_date,
            "end_date" => $basic_end_date,
            "sale_start_date" => $sale_start_date,
            "sale_end_date" => $sale_end_date
        );
        vendor_item::where('vendor_item_id', '=', $vendor_item_id)->update($vendor_data_update_array);
        // Session::flash('message', '修正が完了しました。');
        // Session::flash('class_name', 'alert-success');
        return $result = response()->json(['message' => 'update_success']);
    }

    public function vendorItemDelete(Request $request)
    {
        $vendor_item_id = $request->vendor_item_id;
        $p_name = $request->p_name;
        vendor_item::where('vendor_item_id', $vendor_item_id)->delete();
        //Session::flash('message', $p_name.'<br>この商品を削除しました。');
        // Session::flash('class_name', 'alert-success');
        \Log::info('Item Deleted');
        return $result = response()->json(['message' => 'delete_success']);
    }

    public function update_order_info_by_id(Request $request)
    {
        $vendor_item_id = $request->row_id;
        $vendor_data_update_array = array(
            'order_point_inputs' => $request->order_point_unit,
            'order_point_quantity' => $request->order_point_quantity,
            'order_lot_inputs' => $request->order_lot_unit,
            'order_lot_quantity' => $request->order_lot_quantity,
        );
        vendor_item::where('vendor_item_id', '=', $vendor_item_id)->update($vendor_data_update_array);
        return $result = response()->json(['message' => 'update_success']);

    }

    public function vendor_order_insert(Request $request)
    {
        $data_array = $request->data_array;
        $vendor_data_update_array = array();
        //return $data_array;
        $order_id = vendor_order::insertGetId(['vendor_id' => $data_array[0][2], 'shipment_date' => $data_array[0][4],
            'voucher_number' => $data_array[0][5], 'destination' => 0, 'source' => 0]);
        //return $order_id;
        foreach ($data_array as $key => $data_arr) {
            $demo['vendor_item_id'] = $data_arr[3];
            $demo['vendor_order_id'] = $order_id;
            $demo['inputs'] = $data_arr[1];
            $demo['quantity'] = $data_arr[0];
            $vendor_data_update_array[] = $demo;
        }
        $inserted_voucher_numbers = array();
        foreach ($data_array as $key => $update_data_arr) {
            $inserted_voucher_numbers[] = $update_data_arr[5];
            vendor_item::where('vendor_item_id', '=', $update_data_arr[3])->update(['order_lot_quantity' => $update_data_arr[0]]);
        }

        vendor_order_detail::insert($vendor_data_update_array);

        $voucher_array_unique = array_unique($inserted_voucher_numbers);
        $voucher_string = implode(', ', $voucher_array_unique);
        Session::flash('message', '発注番号: ' . $voucher_string);
        Session::flash('class_name', 'alert-success');

        return $result = response()->json(['message' => 'insert_success']);
        //}
    }

    public function vendor_order_insert_new(Request $request)
    {
        $data_array = $request->data_array;
        $newrrr = array();
        $vendor_data_update_array = array();
        $inserted_voucher_numbers = array();
        foreach ($data_array as $key => $val) {
            $check_order_exist = vendor_order::where(['status' => '未入荷', 'vendor_item_id' => $val[4]])->first();
            $item_info = vendor_item::join('jans', 'jans.jan', '=', 'vendor_items.jan')->where('vendor_item_id', $val[4])->first();
            if ($item_info->case_inputs > 0 || $item_info->ball_inputs > 0) {
                $case_order_qty = ($val[0] == '' ? 0 : $val[0]);
                $ball_order_qty = ($val[1] == '' ? 0 : $val[1]);
                $unit_order_qty = ($val[2] == '' ? 0 : $val[2]);
                vendor_item::where('vendor_item_id', $val[4])->update([
                    'order_lot_case_quantity' => $case_order_qty,
                    'order_lot_ball_quantity' => $ball_order_qty,
                    'order_lot_unit_quantity' => $unit_order_qty,
                ]);
                $totalLotInventory = (($case_order_qty * $item_info->case_inputs) + ($ball_order_qty * $item_info->ball_inputs) + $unit_order_qty);
                if (!$check_order_exist) {

                    $order_id = vendor_order::insertGetId([
                        'order_case_quantity' => $case_order_qty,
                        'order_ball_quantity' => $ball_order_qty,
                        'order_unit_quantity' => $unit_order_qty,
                        'vendor_id' => $val[3],
                        'shipment_date' => $val[5],
                        'voucher_number' => $val[6],
                        'destination' => 0,
                        'vendor_item_id' => $val[4],
                        'unit_cost_price' => $item_info->cost_price,
                        'quantity' => $totalLotInventory,
                        'source' => 0]);
                } else {
                    $order_id = vendor_order::where('vendor_order_id', $check_order_exist->vendor_order_id)
                        ->update([
                            'order_case_quantity' => $case_order_qty,
                            'order_ball_quantity' => $ball_order_qty,
                            'order_unit_quantity' => $unit_order_qty,
                            'vendor_id' => $val[3],
                            'shipment_date' => $val[5],
                            'voucher_number' => $val[6],
                            'destination' => 0,
                            'vendor_item_id' => $val[4],
                            'unit_cost_price' => $item_info->cost_price,
                            'quantity' => $totalLotInventory,
                            'source' => 0,
                            'order_date' => date('Y-m-d H:i:s')
                        ]);
                }
            }
        }
        // Session::flash('message', '発注番号: ' . $voucher_string);
        // Session::flash('class_name', 'alert-success');

        return $result = response()->json(['message' => 'insert_success']);
    }

    public function vendor_order_insert_new_auto_order_by_last_order(Request $request)
    {
        $data_array = $request->data_array;
        $newrrr = array();
        $vendor_data_update_array = array();
        $inserted_voucher_numbers = array();
        foreach ($data_array as $key => $val) {
            $check_order_exist = vendor_order::where(['status' => '未入荷', 'vendor_item_id' => $val[4]])->first();
            $lastOrderInfo = vendor_order::where(['status' => '入荷済み', 'vendor_item_id' => $val[4]])->orderBy('vendor_order_id','DESC')->first();
            $item_info = vendor_item::join('jans', 'jans.jan', '=', 'vendor_items.jan')->where('vendor_item_id', $val[4])->first();
            if ($lastOrderInfo && ($item_info->case_inputs > 0 || $item_info->ball_inputs > 0)) {
                $case_order_qty = ($lastOrderInfo->order_case_quantity == '' ? 0 : $lastOrderInfo->order_case_quantity);
                $ball_order_qty = ($lastOrderInfo->order_ball_quantity == '' ? 0 : $lastOrderInfo->order_ball_quantity);
                $unit_order_qty = ($lastOrderInfo->order_unit_quantity == '' ? 0 : $lastOrderInfo->order_unit_quantity);
                // vendor_item::where('vendor_item_id', $val[4])->update([
                //     'order_lot_case_quantity' => $case_order_qty,
                //     'order_lot_ball_quantity' => $ball_order_qty,
                //     'order_lot_unit_quantity' => $unit_order_qty,
                // ]);
                $totalLotInventory = (($case_order_qty * $item_info->case_inputs) + ($ball_order_qty * $item_info->ball_inputs) + $unit_order_qty);
                if (!$check_order_exist) {

                    $order_id = vendor_order::insertGetId([
                        'order_case_quantity' => $case_order_qty,
                        'order_ball_quantity' => $ball_order_qty,
                        'order_unit_quantity' => $unit_order_qty,
                        'vendor_id' => $val[3],
                        'shipment_date' => $val[5],
                        'voucher_number' => $val[6],
                        'destination' => 0,
                        'vendor_item_id' => $val[4],
                        'unit_cost_price' => $item_info->cost_price,
                        'quantity' => $totalLotInventory,
                        'source' => 0]);
                } else {
                    $order_id = vendor_order::where('vendor_order_id', $check_order_exist->vendor_order_id)
                        ->update([
                            'order_case_quantity' => $case_order_qty,
                            'order_ball_quantity' => $ball_order_qty,
                            'order_unit_quantity' => $unit_order_qty,
                            'vendor_id' => $val[3],
                            'shipment_date' => $val[5],
                            'voucher_number' => $val[6],
                            'destination' => 0,
                            'vendor_item_id' => $val[4],
                            'unit_cost_price' => $item_info->cost_price,
                            'quantity' => $totalLotInventory,
                            'source' => 0,
                            'order_date' => date('Y-m-d H:i:s')
                        ]);
                }
            }
        }
        // Session::flash('message', '発注番号: ' . $voucher_string);
        // Session::flash('class_name', 'alert-success');

        return $result = response()->json(['message' => 'insert_success']);
    }

    public function vendor_order_insert_handy(Request $request)
    {
        $data_array = $request->data_array;
        $newrrr = array();
        $vendor_data_update_array = array();
        $inserted_voucher_numbers = array();
        $data = [];
        foreach ($data_array as $key => $val) {
            $check_order_exist = vendor_order::where(['status' => '未入荷', 'vendor_item_id' => $val[4]])->first();
            $item_info = vendor_item::join('jans', 'jans.jan', '=', 'vendor_items.jan')->where('vendor_item_id', $val[4])->first();
            $case_order_qty = ($val[0] == '' ? 0 : $val[0]);
            $ball_order_qty = ($val[1] == '' ? 0 : $val[1]);
            $unit_order_qty = ($val[2] == '' ? 0 : $val[2]);

            $totalLotInventory = (($case_order_qty * $item_info->case_inputs) + ($ball_order_qty * $item_info->ball_inputs) + $unit_order_qty);
            if (!$check_order_exist) {

                $order_id = vendor_order::insertGetId([
                    'order_case_quantity' => $case_order_qty,
                    'order_ball_quantity' => $ball_order_qty,
                    'order_unit_quantity' => $unit_order_qty,
                    'vendor_id' => $val[3],
                    'shipment_date' => $val[5],
                    'voucher_number' => $val[6],
                    'destination' => 0,
                    'vendor_item_id' => $val[4],
                    'unit_cost_price' => $item_info->cost_price,
                    'quantity' => $totalLotInventory,
                    'source' => 0]);
                $order_ = vendor_order::where('vendor_order_id',$order_id)->first();
            }
            else {
                $order_id = vendor_order::where('vendor_order_id', $check_order_exist->vendor_order_id)
                    ->update([
                        'order_case_quantity' => $case_order_qty,
                        'order_ball_quantity' => $ball_order_qty,
                        'order_unit_quantity' => $unit_order_qty,
                        'vendor_id' => $val[3],
                        'shipment_date' => $val[5],
                        'voucher_number' => $val[6],
                        'destination' => 0,
                        'vendor_item_id' => $val[4],
                        'unit_cost_price' => $item_info->cost_price,
                        'quantity' => $totalLotInventory,
                        'source' => 0,
                        'order_date' => date('Y-m-d H:i:s')
                    ]);
                $order_ = vendor_order::where('vendor_order_id',$check_order_exist->vendor_order_id)->first();
            }

            $order_->item_ifo = $item_info;
            array_push($data,$order_);

        }

        $ch = curl_init();
        $url = "https://ryutu-van.dev.jacos.jp/rv3_tonyav1/api/orders";
//        $url = "http://localhost/rv3_tonyav1/api/orders";
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_POST, 1);                //0 for a get request
        curl_setopt($ch,CURLOPT_POSTFIELDS,['data' => json_encode($data)]);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch,CURLOPT_CONNECTTIMEOUT ,3);
        curl_setopt($ch,CURLOPT_TIMEOUT, 20);
        $response = curl_exec($ch);
        curl_close ($ch);
        // Session::flash('message', '発注番号: ' . $voucher_string);
        // Session::flash('class_name', 'alert-success');

        return response()->json(['message' => 'insert_success']);
    }

    public function singleVendorItem(Request $request)
    {
        $vendor_item_id = $request->vendor_item_id;
        $vendor_items_data = vendor_item::select('vendor_items.*', 'jans.name as product_name', 'jans.*', 'vendors.name')
            ->join('jans', 'vendor_items.jan', '=', 'jans.jan')
            ->join('vendors', 'vendor_items.vendor_id', '=', 'vendors.vendor_id')
            ->where('vendor_item_id', $vendor_item_id)->first();
        return $vendor_items_data;
    }
}
// 4909411070557
