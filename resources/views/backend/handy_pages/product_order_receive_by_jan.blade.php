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

    <handy-product-receive  base_url="{{config('app.url')}}" data=""></handy-product-receive>

@endsection
