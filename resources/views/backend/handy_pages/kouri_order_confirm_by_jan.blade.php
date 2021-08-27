@extends('backend.layouts.master')
@section('title')
    <title>小売 Product Scan Form</title>
@endsection
<style>
    td>input {
        text-align: center;
    }
</style>

@section('content')

    <handy-product-order-confirm-kouri base_url="{{config('app.url')}}"></handy-product-order-confirm-kouri>

@endsection
