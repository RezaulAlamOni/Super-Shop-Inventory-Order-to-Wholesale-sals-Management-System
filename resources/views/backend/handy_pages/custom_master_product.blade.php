@extends('backend.layouts.master')
@section('title')
    <title>見積り</title>
@endsection
<style>
    td>input {
        text-align: center;
    }
</style>

@section('content')

    <handy-custom-master-products base_url="{{config('app.url')}}"></handy-custom-master-products>

@endsection
