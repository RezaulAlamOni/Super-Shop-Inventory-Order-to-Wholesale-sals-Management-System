@extends('backend.layouts.master')
@section('title')
    <title>Handy Mitsumury</title>
@endsection
<style>
    td>input {
        text-align: center;
    }
</style>

@section('content')

    <handy-product-inventory-mistumury base_url="{{config('app.url')}}" read_only="0"></handy-product-inventory-mistumury>

@endsection
