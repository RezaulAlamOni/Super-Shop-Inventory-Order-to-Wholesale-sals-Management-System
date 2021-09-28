<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\customer_shipment;
use App\vendor_arrival;
use DB;
use Session;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function index()
    {
        $title = "Dashboard";
        $active = 'dashboard';
        return view('backend.home', compact('title', 'active'));

    }

    public function android_home()
    {
        $title = "Dashboard";
        $active = 'android_home';
        return view('backend.android_home', compact('title', 'active'));

    }
    public function check_is_reload_required_page(Request $request){
        $page_url = $request->page_url;
        if($page_url=='receiveorder'){
            // $reload = session('reload_receive_order_page');
            $reload = vendor_arrival::where('reload_status','1')->first();
            if($reload){
            if($reload->reload_status =='1'){
                session(['reload_receive_order_page' => '0']);
                vendor_arrival::where('reload_status','1')->update(['reload_status'=>'2']);
                return $result = response()->json(['message' =>'success','refresh_status'=>1 ]); 
            }
        }
        }else if($page_url=='shipment'){
            // $reload = session('reload_shipment_order_page');
            $reload = customer_shipment::where('reload_status','1')->first();
            if($reload){
            if($reload->reload_status =='1'){
                session(['reload_shipment_order_page' => '0']);
                customer_shipment::where('reload_status','1')->update(['reload_status'=>'0']);
                return $result = response()->json(['message' =>'success','refresh_status'=>1 ]); 
            }
        }
        }
        return $result = response()->json(['message' =>'fail','refresh_status'=>0 ]); 
    }
}
