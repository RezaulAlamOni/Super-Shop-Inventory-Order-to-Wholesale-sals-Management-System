<?php

namespace App\Http\Controllers;

use App\CustomMisthsumuryProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $image = $request->image;
        $extension = $image->extension();
        $name = pathinfo($image->getClientOriginalName(),PATHINFO_FILENAME).time().mt_rand();
        if (!file_exists('/public/backend/images/mistumury')) {
            mkdir('/public/backend/images/mistumury', 0777, true);
        }
        $image->storeAs('/public/backend/images/mistumury', $name .".".$extension);

        CustomMisthsumuryProduct::create([
            'name' => $request->title,
            'cost_price' => $request->cost,
            'selling_price' => $request->sell,
            'gross_profit' => $request->sell - $request->cost,
            'gross_profit_margin' => $request->profit_margin,
            'case_unit' => 24,
            'ball_unit' => 6,
            'image' => $name .".".$extension
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
        $custom_estimate_item = $customMisthsumuryProduct->find($request->id);
        $custom_estimate_item->cost_price = $request->cost;
        $custom_estimate_item->selling_price = $request->sell;
        $custom_estimate_item->gross_profit = $request->sell - $request->cost;
        $custom_estimate_item->gross_profit_margin = $request->gross_profit_margin;
        $custom_estimate_item->save();

        return response()->json(['status' => 200]);
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
