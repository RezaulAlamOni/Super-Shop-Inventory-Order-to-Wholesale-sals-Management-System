<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\customer;
use App\customer_item;
use App\vendor_item;
use App\jan;
use Session;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $customer_id=$request->customer_id;
        $result='';
        if($customer_id!=null){
            $specific_customer_info=customer::where('customer_id',$customer_id)->first();
            $result = response()->json(['specific_customer_info' => $specific_customer_info]);
        }else{
            $all_customer_list=customer::where('is_deleted', 0)->get();
            $result = response()->json(['all_customer_list' => $all_customer_list]);
        }
        return $result;

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

    public function add_update_customer_item(Request $request){
        //return $request->all();
        $customer_item_id = $request->customer_item_data_id;
        if (!(Validator::make($request->all(), ['c_name' => 'required'])->passes())) {
            return $result = response()->json(['message' => 'customer name is required']);
        }
        if (!(Validator::make($request->all(), ['v_name' => 'required'])->passes())) {
            return $result = response()->json(['message' => 'vendor name is required']);
        }
        if (!(Validator::make($request->all(), ['j_code' => 'required'])->passes())) {
            return $result = response()->json(['message' => 'Jan code is required']);
        }
        if (!(Validator::make($request->all(), ['customer_item_name' => 'required'])->passes())) {
            return $result = response()->json(['message' => 'Jan name is required']);
        }
        if (!(Validator::make($request->all(), ['basic_selling_price' => 'required'])->passes())) {
            return $result = response()->json(['message' => '売価を入力してください']);
        }

        $jan_ins_array=array(
            "jan"=>$request->j_code,
            "name"=>$request->customer_item_name,
            "case_inputs"=>$request->c_qty,
            "ball_inputs"=>$request->b_qty,
            "jan_start_date"=>date('Y-m-d H:i:s'),
            "jan_end_date"=>date('Y-m-d H:i:s'),
        );

        /* jan insert */
            if (jan::where('jan', $request->j_code)->exists()) {
                $jan_update_array = array(
                    "name" => $request->customer_item_name,
                    "case_inputs" => $request->c_qty,
                    "ball_inputs" => $request->b_qty,
                );

                jan::where('jan', '=', $request->j_code)->update($jan_update_array);
                //return $result = response()->json(['message' => 'update_success']);
            } else {
                jan::insert($jan_ins_array);
                //return $result = response()->json(['message' => 'insert_success']);
            }

        /* jan insert */

        $customer_data_ins_array = array(
            'customer_id'=>$request->c_name,
            'vendor_id'=>$request->v_name,
            'jan'=>$request->j_code,
            'sale_selling_price'=>$request->sale_selling_price,
            'selling_price'=>$request->basic_selling_price,
            "start_date"=>$request->start_date,
            "end_date"=>$request->end_date,
        );

        if($customer_item_id==0){
            if(customer_item::where('jan',$request->j_code)->where('customer_id',$request->c_name)->exists()){
                return $result = response()->json(['message' => '既に登録済みです']);
            }else{
                customer_item::insert($customer_data_ins_array);
                return $result = response()->json(['message' => 'insert_success']);
            }

        }else{

            $customer_data_update_array = array(
                'selling_price' => $request->basic_selling_price,
                'sale_selling_price' => $request->sale_selling_price,
                "start_date"=>$request->start_date,
                "end_date"=>$request->end_date,
            );
            customer_item::where('customer_item_id', '=', $customer_item_id)->update($customer_data_update_array);
            //Session::flash('message', 'Data update!');
            //Session::flash('class_name', 'alert-success');

            return $result = response()->json(['message' => 'update_success']);


        }

    }
    public function add_customer_item_data_by_jan(Request $request){
        $cost_price = customer_item::where('jan',$request->jan_code)->where('customer_id',0)->value('cost_price');
        if($cost_price){
            $cost_price = $cost_price;
        }else{
            $cost_price = 100;
        }
        $gross_profit_margin = ($cost_price > 0 ? 30 : 0);
        $selling_price = $cost_price + (($cost_price* $gross_profit_margin) / 100);
        $selling_price = round($selling_price, 2);
        $gross_profit = $selling_price - $cost_price;

        $customer_data_ins_array = array(
            'customer_id'=>$request->customer_id,
            'vendor_id'=>$request->vendor_id,
            'jan'=>$request->jan_code,
            'sale_selling_price'=>0,
            'cost_price'=>$selling_price,
            'selling_price'=>$selling_price,
            'gross_profit' => $gross_profit,
            'gross_profit_margin' => $gross_profit_margin,
            "start_date"=>'2019-01-01',
            "end_date"=>'2022-01-01',
        );


        if(customer_item::where('jan',$request->jan_code)->where('customer_id',$request->customer_id)->exists()){
            return $result = response()->json(['message' => 'update_success']);
        }else{
            customer_item::insert($customer_data_ins_array);
            return $result = response()->json(['message' => 'insert_success']);
        }
    }
    public function update_customer_master_item_content(Request $request){
        $jan = $request->jan;
        $cost_price = $request->cost_price;
        $selling_price = $request->selling_price;
        $gross_profit = $request->gross_profit;
        $gross_profit_margin = $request->gross_profit_margin;
        customer_item::where('jan', '=', $jan)->update(['cost_price'=>$cost_price,'selling_price'=>$selling_price,'gross_profit'=>$gross_profit,'gross_profit_margin'=>$gross_profit_margin]);
        return $result = response()->json(['message' => 'update_success']);
    }
    public function handy_update_customer_master_item_content(Request $request){
        $jan = $request->jan;
        $cost_price = $request->price;
        $selling_price = $request->selling_price;
        $gross_profit = $request->gross_profit;
        $gross_profit_margin = $request->gross_profit_margin;
        jan::where('jan',$jan)->update(['case_inputs'=>$request->case_qty,'ball_inputs'=>$request->ball_qty]);
        customer_item::where('jan', '=', $jan)->update(['cost_price'=>$cost_price,'selling_price'=>$selling_price,'gross_profit'=>$gross_profit,'gross_profit_margin'=>$gross_profit_margin]);
        return $result = response()->json(['message' => 'update_success']);
    }
    public function get_customer_list_item_by_id(Request $request){
        $item_id = $request->c_list_item_id;
        $customer_item_data = customer_item::select('customer_items.*', 'jans.*','jans.name as product_name', 'customers.name')
    ->join('jans', 'customer_items.jan', '=', 'jans.jan')
    ->join('customers', 'customer_items.customer_id', '=', 'customers.customer_id')->where('customer_items.customer_item_id',$item_id)->first();
        return $result = response()->json(['customer_item_data' =>$customer_item_data]);

    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return $request->all();
        $customer_id=$request->customer_id;
        // $customer_id=1;

        if (!(Validator::make($request->all(), ['customer_name' => 'required|max:50'])->passes())) {
            return $result = response()->json(['message' => 'name_required']);
        }
        if (!(Validator::make($request->all(), ['customer_code' => 'required|max:20'])->passes())) {
            return $result = response()->json(['message' => 'code_required']);
        }
        if (!(Validator::make($request->all(), ['customer_phone' => 'required|min:6|max:20'])->passes())) {
            return $result = response()->json(['message' => '電話番号を入力してください']);
        }
        $customer_name=$request->customer_name;
        $customer_code=$request->customer_code;
        $customer_phone=$request->customer_phone;
        $customer_info=array(
            "name"=>$customer_name,
            "partner_code"=>$customer_code,
            "phone"=>$customer_phone,
        );

        if($customer_id==null){
            if(customer::where('partner_code',$customer_code)->exists()){
                return $result = response()->json(['message' => 'code_exists']);
            }else{
                customer::insert($customer_info);
                return $result = response()->json(['message' => 'insert_success']);
            }

        }else{
// update
                $customer_all_info = customer::where('customer_id', '=', $customer_id)->first();
                $original_customer_code = $customer_all_info->partner_code;
                if ($original_customer_code != $customer_code) {
                    if (customer::where('partner_code', '=', $customer_code)->exists()) {
                        return $result = response()->json(['message' => 'code_exists']);
                    }
                }
                customer::where('customer_id', '=', $customer_id)->update($customer_info);
                return $result = response()->json(['message' => 'update_success']);
        }
    }

    public function get_all_vendor_data_by_vendor_id(Request $request){
        //return $request->all();
        $vendor_id = $request->v_id;
        $searchValue = $request->term;
        //$vendor_item_data = vendor_item::select('vendor_items.vendor_item_id as id','vendor_items.vendor_jan as label','vendor_items.vendor_jan as value')->where('vendor_id', $vendor_id)->where('vendor_jan', 'LIKE', "%{$searchValue}%")->get();
        $vendor_item_data = vendor_item::select('vendor_items.vendor_item_id as id','vendor_items.jan as label','vendor_items.jan as value','vendor_items.cost_price as vendor_cost_price','vendor_items.sale_cost_price as vendor_sale_cost_price','jans.name','jans.case_inputs','jans.ball_inputs')
        ->join('jans', 'vendor_items.jan', '=', 'jans.jan')
        ->where('vendor_id', $vendor_id)->where('vendor_items.jan', 'LIKE', "%{$searchValue}%")->orderBy('vendor_items.created_at', 'desc')->get();

        return $result = response()->json($vendor_item_data);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $customer_id=$request->customer_id;
        customer::where('customer_id',$customer_id)->update(['is_deleted'=>1]);
        return $result = response()->json(['message' => 'delete_success']);
    }
  public function update_customer_item_by_customer_item_id(Request $request)
    {
        $customer_item_id=$request->item_id;
        $sale_selling_price=$request->sale_selling_price;
        $selling_price=$request->basic_selling_price;
        $customer_data_update_array = array('selling_price'=>$selling_price,'sale_selling_price'=>$sale_selling_price);
        customer_item::where('customer_item_id', '=', $customer_item_id)->update($customer_data_update_array);
            return $result = response()->json(['message' => 'update_success']);
    }

    public function delete_customer_itms_by_id(Request $request)
    {
        $customer_itms_id=$request->customer_itms_id;
        customer_item::where('customer_item_id',$customer_itms_id)->delete();

       // Session::flash('message', 'Data has been delete!');
        //Session::flash('class_name', 'alert-success');

        return $result = response()->json(['message' => 'delete_success']);
    }
    public function handy_customer_master_item_get_by_jan_code($jan){
        if (!customer_item::where('jan', $jan)->exists()) {
            return response()->json(['status' => 400, 'message' => "ベンダーマスターからjanを挿入してください"]);
        }
        $result = customer_item::select('customer_items.*','customer_items.gross_profit_margin as profit_margin','vendor_items.vendor_id','vendor_items.vendor_item_id','vendor_items.maker_id','jans.case_inputs','jans.ball_inputs','jans.name as item_name')->join('jans','jans.jan','=','customer_items.jan')->join('vendor_items','vendor_items.jan','=','customer_items.jan')->where('customer_items.jan',$jan)->get();
        return response()->json(['status' => 200, 'result'=>$result]);
    }
}
