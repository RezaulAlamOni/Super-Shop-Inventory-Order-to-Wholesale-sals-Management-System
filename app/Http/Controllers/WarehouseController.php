<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\jan;
use App\stock_item;
use App\vendor_item;
use App\ware_house;

class WarehouseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $title = "warehouse";
        $active = 'warehouse';


        return view('backend.warehouse.warehouse_home', compact('title', 'active'));
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
    public function get_warehouse_list(Request $request)
    {
        $ware_house_id = $request->warehouse_id;
        $result='';
        if($ware_house_id!=null){
            $specific_ware_info=ware_house::where('ware_house_id',$ware_house_id)->first();
            $result = response()->json(['specific_warehouse_info' => $specific_ware_info]); 
        }else{
            $all_ware_list=ware_house::get();
        $result = response()->json(['all_warehouse_list' => $all_ware_list]);
        }
        return $result;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ware_id = $request->ware_id;
        $data = array();
        $data['ware_house_name']=$request->ware_house_name;
        $data['phone']=$request->phone;
        $data['address']=$request->address;
        $data['email']='';
        if (!(Validator::make($request->all(), ['ware_house_name' => 'required|max:50'])->passes())) {
            return response()->json(['message' => 'すべての欄に入力してください','class_name'=>'alert-danger']);
        }
        if (!(Validator::make($request->all(), ['phone' => 'required|max:30'])->passes())) {
            return response()->json(['message' => 'すべての欄に入力してください','class_name'=>'alert-danger']);
        }
        if (!(Validator::make($request->all(), ['address' => 'required|max:80'])->passes())) {
            return response()->json(['message' => 'すべての欄に入力してください','class_name'=>'alert-danger']);
        }
        if($ware_id==0){
            ware_house::insert($data);
            return response()->json(['message' => 'success','class_name'=>'alert-success','type'=>0]);
        }else{
            ware_house::where('ware_house_id',$ware_id)->update($data);
            return response()->json(['message' => 'success','class_name'=>'alert-success','type'=>$ware_id]);
        }

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
    public function destroy(Request $request)
    {
        $id = $request->id;
        ware_house::where('ware_house_id',$id)->delete();
        return response()->json(['message' => 'warehouse deleted','class_name'=>'alert-success']);
    }

    public function wareHouseQuery(Request $request){
        // $ware_house_info = DB::select("SELECT ware_houses.*,stock_items.*,vendor_items.*,jans.* from stock_items
        // INNER JOIN ware_houses ON ware_houses.ware_house_id=stock_items.ware_house_id
        // INNER JOIN vendor_items ON vendor_items.vendor_item_id=stock_items.vendor_item_id
        // INNER JOIN jans ON jans.jan=vendor_items.jan ");
        $ware_house_id=$request->ware_house_id;
        $ware_house_query =stock_item::select('ware_houses.ware_house_id','ware_houses.ware_house_name',
        'ware_houses.phone','jans.jan','jans.name','jans.case_inputs','jans.ball_inputs','stock_items.rack_number',
        'stock_items.case_quantity','stock_items.ball_quantity','stock_items.unit_quantity','vendor_items.cost_price')
        ->join('ware_houses','ware_houses.ware_house_id','=','stock_items.ware_house_id')
        ->join('vendor_items','vendor_items.vendor_item_id','=','stock_items.vendor_item_id')
        ->join('jans','jans.jan','=','vendor_items.jan')
        ->orderBy('ware_houses.ware_house_id','desc')
        ->orderBy('jans.jan','desc');
        if($ware_house_id==null){
            $ware_house_info=$ware_house_query->get();
        }else{
            $ware_house_info=$ware_house_query->where('ware_houses.ware_house_id',$ware_house_id)->get();
        }
        return $ware_house_info;
    }
}
