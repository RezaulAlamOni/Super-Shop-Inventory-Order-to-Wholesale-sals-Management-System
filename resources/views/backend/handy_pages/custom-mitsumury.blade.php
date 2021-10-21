@extends('backend.layouts.master')
@section('title')
    <title>Handy Custom Mitsumury</title>
@endsection
<style>
    td>input {
        text-align: center;
    }
</style>

@section('content')

    <handy-product-custom-mistumury base_url="{{config('app.url')}}" read_only="0"></handy-product-custom-mistumury>

@endsection
