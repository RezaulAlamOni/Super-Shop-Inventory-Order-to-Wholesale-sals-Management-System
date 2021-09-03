@extends('backend.layouts.master')
@section('title')
    <title>仕入先名別発注リスト</title>
@endsection
<style>
    td>input {
        text-align: center;
    }
</style>

@section('content')

    <handy-product-order-mail base_url="{{config('app.url')}}"></handy-product-order-mail>

@endsection
