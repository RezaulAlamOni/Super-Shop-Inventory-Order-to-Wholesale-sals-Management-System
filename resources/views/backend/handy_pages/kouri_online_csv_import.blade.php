@extends('backend.layouts.master')
@section('title')
    <title>オンライン受注</title>
@endsection
<style>
    td>input {
        text-align: center;
    }
</style>

@section('content')

    <handy-product-online-order-kouri base_url="{{config('app.url')}}"></handy-product-online-order-kouri>

@endsection
