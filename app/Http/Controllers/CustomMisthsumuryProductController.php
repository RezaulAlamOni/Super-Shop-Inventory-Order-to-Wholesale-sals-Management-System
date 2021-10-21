<?php

namespace App\Http\Controllers;

use App\CustomMisthsumuryProduct;
use Illuminate\Http\Request;

class CustomMisthsumuryProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $title = "Custom Mitsumury";
        $active = 'custom-mitsumury';
        return view('backend.handy_pages.custom-mitsumury', compact('title', 'active'));
    }


    public function getAllMistumury()
    {
        $products = CustomMisthsumuryProduct::all();
        return response()->json(['products' => $products]);
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $files = $request->image;
        dd($files);
        $extension = $file->extension();
        $name = pathinfo($file->getClientOriginalName(),PATHINFO_FILENAME).time().mt_rand();
        if (!file_exists('/public/images/'.$type)) {
            mkdir('/public/images/'.$type, 0777, true);
        }
        $file->storeAs('/public/images/'.$type, $name .".".$extension);
        $file_ = Storage::url($name .".".$extension);


        CustomMisthsumuryProduct::create([
            'name' => $request->title,
            'cost_price' => $request->cost,
            'selling_price' => $request->sell,
            'gross_profit' => $request->sell - $request->cost,
            'gross_profit_margin' => $request->profit_margin,
            'case_unit' => 24,
            'ball_unit' => 6
        ] );

        return response()->json(['status' => 200]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\CustomMisthsumuryProduct $customMisthsumuryProduct
     * @return \Illuminate\Http\Response
     */
    public function show(CustomMisthsumuryProduct $customMisthsumuryProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\CustomMisthsumuryProduct $customMisthsumuryProduct
     * @return \Illuminate\Http\Response
     */
    public function edit(CustomMisthsumuryProduct $customMisthsumuryProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\CustomMisthsumuryProduct $customMisthsumuryProduct
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CustomMisthsumuryProduct $customMisthsumuryProduct)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\CustomMisthsumuryProduct $customMisthsumuryProduct
     * @return \Illuminate\Http\Response
     */
    public function destroy(CustomMisthsumuryProduct $customMisthsumuryProduct)
    {
        //
    }
}
