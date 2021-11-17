<?php

namespace App\Http\Controllers;

use App\customer;
use App\CustomMisthsumuryProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class CustomMisthsumuryProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orderBy = $request->orderBy;
        $user_id = Auth::user()->id;
        $cus_info = customer::where('user_id',$user_id)->first();

        if($cus_info){
            $products = CustomMisthsumuryProduct::where('customer_id',$cus_info->customer_id)->with('vendor_item')
                ->orderBy('updated_at',$orderBy)->get();
        }else{
            $products =array();
        }
        try {

            $url = "https://ryutu-van.dev.jacos.jp/rv3_tonyav1/api/customer-shops/".$cus_info->customer_id;
            $shops = Http::get($url);
            return  response()->json(['products'=> $products,'shops' => $shops['shops']]);
        } catch (\Exception $exception) {

        }
        return  response()->json(['products'=> $products]);
    }

    public function allCustomProductsMaster(Request $request)
    {
        $orderBy = $request->orderBy;
        $user_id = Auth::user()->id;
        $cus_info = customer::where('user_id',$user_id)->first();

        if($cus_info){
            $products = CustomMisthsumuryProduct::query()->where('customer_id',$cus_info->customer_id)
                ->whereHas('vendor_item')
                ->orderBy('updated_at',$orderBy)->get();
        }else{
            $products =array();
        }
        try {

            $url = "https://ryutu-van.dev.jacos.jp/rv3_tonyav1/api/customer-shops/".$cus_info->customer_id;
            $shops = Http::get($url);
            return  response()->json(['products'=> $products,'shops' => $shops['shops']]);
        } catch (\Exception $exception) {

        }
        return  response()->json(['products'=> $products]);
    }

    public function allCustomProductOrders(Request $request)
    {
        $orderBy = $request->orderBy;
        $user_id = Auth::user()->id;
        $cus_info = customer::where('user_id',$user_id)->first();

        if($cus_info){
            $products = CustomMisthsumuryProduct::query()->where('customer_id',$cus_info->customer_id)
                ->whereHas('vendor_item')
                ->orderBy('updated_at',$orderBy)->get();
        }else{
            $products =array();
        }
        try {
            $url = "https://ryutu-van.dev.jacos.jp/rv3_tonyav1/api/customer-shops/".$cus_info->customer_id;
            $shops = Http::get($url);
            return  response()->json(['products'=> $products,'shops' => $shops['shops']]);
        } catch (\Exception $exception) {

        }
        return  response()->json(['products'=> $products]);
    }

    public function custom_products_master()
    {
        $title = "Dashboard";
        $active = 'handy_receive_custom_mitshumori';
        return view('backend.handy_pages.custom_master_product', compact('title', 'active'));
//

    }

    public function custom_product_order_master()
    {
        $title = "Dashboard";
        $active = 'handy_receive_custom_mitshumori';
        return view('backend.handy_pages.custom_product_orders', compact('title', 'active'));
//

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
     * @param  \App\CustomMisthsumuryProduct  $customMisthsumuryProduct
     * @return \Illuminate\Http\Response
     */
    public function show(CustomMisthsumuryProduct $customMisthsumuryProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CustomMisthsumuryProduct  $customMisthsumuryProduct
     * @return \Illuminate\Http\Response
     */
    public function edit(CustomMisthsumuryProduct $customMisthsumuryProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CustomMisthsumuryProduct  $customMisthsumuryProduct
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CustomMisthsumuryProduct $customMisthsumuryProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CustomMisthsumuryProduct  $customMisthsumuryProduct
     * @return \Illuminate\Http\Response
     */
    public function destroy(CustomMisthsumuryProduct $customMisthsumuryProduct)
    {
        //
    }
}
