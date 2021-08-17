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

    <handy-order-shipment-list base_url="{{config('app.url')}}" read_only="1"></handy-order-shipment-list>

@endsection
