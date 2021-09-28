<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\jan;
use App\customer;
use App\customer_order;
use App\customer_item;
use App\customer_shipment;
use App\customer_payment;
use App\vendor;
use App\vendor_item;
use App\vendor_order;
use App\vendor_arrival;
use App\vendor_payment;
use App\invoice;
use PDF;
use DB;
class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $result = invoice::get()->first();
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
        $data = array();
        $data['company_name'] = $request->company_name;
        $data['bank_name'] = $request->bank_name;
        $data['bank_branch'] = $request->bank_branch;
        $data['bank_account_number'] = $request->bank_account_number;
        $data['bank_account_name'] = $request->bank_account_name;
        $data['address'] = $request->address;
        $data['postal_code'] = $request->postal_code;
        $data['tel'] = $request->tel;
        $data['fax'] = $request->fax;

        if($request->invoice_id==0){
            invoice::insert($data);
            return $result = response()->json(['message' => 'success']);
        }else{
            invoice::where('invoice_id', '=', $request->invoice_id)->update($data);
            return $result = response()->json(['message' => 'success']);
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
    public function destroy($id)
    {
        //
    }
}
