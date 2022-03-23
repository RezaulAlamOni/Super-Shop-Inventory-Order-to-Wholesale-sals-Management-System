@extends('backend.layouts.master')
@section('title')
    <title> 発注リスト</title>
@endsection
<style>
    td>input {
        text-align: center;
    }
</style>

@section('content')

    <handy-custom-master-products-orders base_url="{{config('app.url')}}"></handy-custom-master-products-orders>

@endsection
