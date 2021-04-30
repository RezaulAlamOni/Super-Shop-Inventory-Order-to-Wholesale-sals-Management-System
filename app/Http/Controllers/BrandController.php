<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\customer;
use App\customer_item;
use App\vendor_item;
use App\jan;
use Session;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $title = "Oline Order";
        $active = 'onlinerder';
        $all_customer_list=customer::where('is_deleted', 0)->get();

        $brands = [
            'コカ・コーラ(Coca-Cola)',
            'ポカリスエット',
            'スターバックス',
            'ネスカフェ',
            'アサヒビール',
            'BOSS(ボス)',
            '明治乳業',
            'サントリー',
            'カゴメ',
            'ピカイチ野菜くん'
        ];


        return view('backend.brand-order', compact('title', 'active','brands','all_customer_list'));
    }
    public function brand_details($id)
    {
        $title = "Oline Order";
        $active = 'onlinerder';
        $all_customer_list=customer::where('is_deleted', 0)->get();
        $specific_customer_info=customer::where('customer_id',$id)->first();
        $brands = [
            'コカ・コーラ(Coca-Cola)',
            'ポカリスエット',
            'スターバックス',
            'ネスカフェ',
            'アサヒビール',
            'BOSS(ボス)',
            '明治乳業',
            'サントリー',
            'カゴメ',
            'ピカイチ野菜くん'
        ];


        return view('backend.brand-order-detail', compact('title', 'active','brands','all_customer_list','specific_customer_info'));
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
