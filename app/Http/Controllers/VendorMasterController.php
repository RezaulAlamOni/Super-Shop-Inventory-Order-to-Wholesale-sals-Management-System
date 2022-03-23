<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\customer_item;
use App\jan;
use App\vendor_item;
use App\vendor;
use App\customer;
use DB;

class VendorMasterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($id = null)
    {
        $title = "小売マスタ";
        $active = 'vendor_master';
        return view('backend.vendor_master.vendor_master_home', compact('title', 'active'));
    }


    public function vendor_master_item($id = null)
    {
        $title = "小売マスタ";
        $active = 'vendor_master';

        // return  $id;
        $vendor_items_data_temp = vendor_item::select('vendor_items.*', 'in_companies.in_company_code','jans.name as product_name', 'jans.case_inputs','jans.ball_inputs', 'vendors.name')
            ->join('jans', 'vendor_items.jan', '=', 'jans.jan')
            ->leftjoin('in_companies', 'in_companies.jan', '=', 'vendor_items.jan')
            ->leftJoin('vendors', 'vendor_items.vendor_id', '=', 'vendors.vendor_id');
        if ($id != null) {
            if ($id != 0) {
                $vendor_items_data = $vendor_items_data_temp->where('vendor_items.vendor_id', $id)->orderBy('vendor_items.vendor_item_id', 'desc')->get();
            } else {
                $vendor_items_data = $vendor_items_data_temp->orderBy('vendor_items.vendor_item_id', 'desc')->get();
            }
        } else {
            $vendor_items_data = $vendor_items_data_temp->orderBy('vendor_items.vendor_item_id', 'desc')->get();
        }

        return $vendor_items_data;
    }

    public function get_all_vendor_master_item(Request $request){
        $id = $request->vendor_id;
        $jan = $request->jan;
        $in_company_code = $request->in_company_code;
        $order_by_maker_name = $request->order_by_maker_name;
        $num_of_order = $request->num_of_order;
//        dd($order_by_maker_name);
        $order_by_tonya = $request->order_by_tonya;
        $is_special = $request->is_special;
        $vendor_items_data_temp = vendor_item::select('vendor_items.*', 'in_companies.in_company_code','jans.name as product_name', 'jans.case_inputs','jans.ball_inputs', 'vendors.name', 'makers.maker_name','makers.maker_code',DB::raw('count(vendor_order_details.vendor_item_id) as num_of_order'))
        ->join('jans', 'vendor_items.jan', '=', 'jans.jan')
        ->leftJoin('makers', 'makers.maker_id', '=', 'vendor_items.maker_id')
        ->leftJoin('in_companies', 'in_companies.jan', '=', 'vendor_items.jan')
        ->leftJoin('vendors', 'vendor_items.vendor_id', '=', 'vendors.vendor_id')
        ->leftJoin('vendor_order_details', 'vendor_order_details.vendor_item_id', '=', 'vendor_items.vendor_item_id')
        ->groupBy('vendor_items.vendor_item_id')
        ->where('is_special',$is_special);

        if ($id != 0) {
            $vendor_items_data_temp->where('vendor_items.vendor_id', $id);
        }
        if($jan!=''){
            $vendor_items_data_temp->where('vendor_items.jan', $jan);
//            $vendor_items_data_temp->orderBy('vendor_items.jan', 'desc',$jan);
        }
        if($in_company_code!=''){
            $vendor_items_data_temp->where('in_companies.in_company_code', $in_company_code);
        }

        if($order_by_maker_name != '0'){
            $vendor_items_data_temp->orderBy('makers.maker_code', $order_by_maker_name);
        }
        if($order_by_tonya != '0'){
            $vendor_items_data_temp->orderBy('vendor_items.vendor_id', $order_by_tonya);
        }
        if($num_of_order != '0' ){
           $vendor_items_data_temp->orderBy('num_of_order', $num_of_order);
        }

        // for no sorting only
        if($order_by_tonya == '0' && $order_by_maker_name == '0' && $num_of_order == '0'){
            $vendor_items_data_temp->orderBy('vendor_items.vendor_item_id', 'desc');
        }
        //filter by shop and super
        /*
        if(auth()->user()->user_type=='shop'){
            $customer_id = auth()->user()->CustomerId;
           
            $shop_id = auth()->user()->ShopId;
            $vendor_items_data_temp->where('vendor_items.customer_shop_id', $shop_id);
        }
        */
        $vendor_items_data = $vendor_items_data_temp->get();

        return $vendor_items_data;
    }

    public function customerMaster($id = null)
    {
        $title = "Dashboard";
        $active = 'customer_master';

        return view('backend.customer_master.customer_master_home', compact('title', 'active'));
    }

    public function customer_master_item($id = null)
    {
        $title = "Dashboard";
        $active = 'customer_master';
        $id = ($id==null?0:$id);
        $customer_item_data = customer_item::select('customer_items.*', 'jans.name as product_name','jans.case_inputs','jans.ball_inputs', 'customers.name', 'vendors.name as vendor_name','vendor_items.sale_cost_price')
            ->join('jans', 'customer_items.jan', '=', 'jans.jan')
            ->leftJoin('customers', 'customer_items.customer_id', '=', 'customers.customer_id')
            ->leftJoin('vendors', 'customer_items.vendor_id', '=', 'vendors.vendor_id')
            ->leftJoin('vendor_items', 'vendor_items.jan', '=', 'customer_items.jan');

        // if($id!=null){
        //     if ($id != 0) {
        //         $customer_items_data = $customer_item_data->where('customer_items.customer_id', $id)->orderBy('customer_items.customer_item_id', 'desc')->get();
        //     } else {

        //         $customer_items_data = $customer_item_data->orderBy('customer_items.customer_item_id', 'desc')->get();
        //     }

        // } else {
        //     $customer_items_data = $customer_item_data->orderBy('customer_items.customer_item_id', 'desc')->get();
        // }
        if($id!=0){
            $customer_items_data = $customer_item_data->where('customer_items.customer_id', $id)->orderBy('customer_items.customer_item_id', 'desc')->get();

        }else{
            $customer_items_data = $customer_item_data->orderBy('customer_items.customer_item_id', 'desc')->groupBy('customer_items.jan')->get();

        }
        return $customer_items_data;
    }

    public function get_all_vendor_master_sorting_item(Request $request){
        $id = $request->vendor_id;
        $jan = $request->jan;
        $in_company_code = $request->in_company_code;
        $order_by_maker_name = $request->order_by_maker_name;
        $order_by_tonya = $request->order_by_tonya;
        $vendor_item_id_order = $request->vendor_item_id_order;
        $is_special = $request->is_special;
        $vendor_items_data_temp = vendor_item::select('vendor_items.*', 'in_companies.in_company_code','jans.name as product_name', 'jans.case_inputs','jans.ball_inputs', 'vendors.name', 'makers.maker_name','makers.maker_code')
            ->join('jans', 'vendor_items.jan', '=', 'jans.jan')
            ->leftJoin('makers', 'makers.maker_id', '=', 'vendor_items.maker_id')
            ->leftJoin('in_companies', 'in_companies.jan', '=', 'vendor_items.jan')
            ->leftJoin('vendors', 'vendor_items.vendor_id', '=', 'vendors.vendor_id')
            ->where('is_special',$is_special);

        if ($id != 0) {
            $vendor_items_data_temp->where('vendor_items.vendor_id', $id);
        }
        if($jan!=''){
            $vendor_items_data_temp->where('vendor_items.jan', $jan);
        }
        if($in_company_code!=''){
            $vendor_items_data_temp->where('in_companies.in_company_code', $in_company_code);
        }
        if($order_by_maker_name!=0){
            $vendor_items_data_temp->orderBy('makers.maker_code', $order_by_maker_name);
        }

        if($order_by_tonya!=0){
            $vendor_items_data_temp->orderBy('vendor_items.vendor_id', $order_by_tonya);
        }

        if($vendor_item_id_order!=0){
            $vendor_items_data_temp->orderBy('vendor_items.vendor_item_id', $vendor_item_id_order);
        }

        $vendor_items_data = $vendor_items_data_temp->get();
        return $vendor_items_data;
    }

}
