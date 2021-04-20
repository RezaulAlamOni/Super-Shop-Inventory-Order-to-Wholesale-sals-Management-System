@extends('backend.layouts.master')
@section('title')
    <title>Handy Product Scan Form</title>
@endsection
<style>
    td>input {
        text-align: center;
    }
</style>

@section('content')

    <handy-product-inventory-update base_url="{{config('app.url')}}"></handy-product-inventory-update>

@endsection
