<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\QRGenController;
use Rap2hpoutre\FastExcel\FastExcel;
use App\customer;
use App\jan;
use App\maker;
use App\customer_order;
use App\customer_shop;
use App\customer_order_detail;
use App\customer_shipment;

use App\customer_item;
use App\vendor_item;
use App\estimate_item;
use Session;
class Eestimate_itemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $products = estimate_item::with('janinfo')->groupBy('jan')->get();
        return  response()->json(['products'=> $products]);
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
        //return $request->all();
        $item_info = $request->item_info;
        $super_info = $request->super_info;
        if(empty($super_info)){
            return response()->json(['status' => 401, 'message' => "Super not found"]);
        }
        if(empty($item_info)){
            return response()->json(['status' => 401, 'message' => "Item not found"]);
        }
        foreach($super_info as $super){
            foreach($item_info as $item){
                $item_insertedarr = $item;
                $item_insertedarr['customer_id']=$super;
                unset( $item_insertedarr['janinfo'],$item_insertedarr['img'],$item_insertedarr['vendor_item_id'] );
                
                $exitsItme = estimate_item::where(['customer_id'=>$super,'jan'=>$item_insertedarr['jan']])->first();
                $exitsVendor = vendor_item::where(['jan'=>$item_insertedarr['jan']])->first();
                $exitsJan = jan::where('jan',$item_insertedarr['jan'])->first();
                if($exitsItme){

                    estimate_item::where(['customer_id'=>$super,'jan'=>$item_insertedarr['jan']])->update($item_insertedarr);
                }else{

                    estimate_item::insert($item_insertedarr);
                }
                if(!$exitsVendor){

                    vendor_item::insert($item_insertedarr);
                }
                $janInfo = $item['janinfo'];
                if($exitsJan){
                   
                    unset( $janInfo['jan_id']);
                    jan::where('jan',$janInfo['jan'])->update($janInfo);
                }else{
                    jan::insert($janInfo);
                }
            }
        }

        return response()->json(['status' => 200, 'message' => "successfully sent to super"]);
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
}
