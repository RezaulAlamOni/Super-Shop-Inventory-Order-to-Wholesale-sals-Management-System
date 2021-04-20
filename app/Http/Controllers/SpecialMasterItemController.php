<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\customer_item;
use App\jan;
use App\vendor_item;
use App\vendor;
use App\customer;
class SpecialMasterItemController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index($id = null)
    {
        $title = "小売マスタ";
        $active = 'vendor_master';
        return view('backend.vendor_master.vendor_special_master_home', compact('title', 'active'));
    }

}
