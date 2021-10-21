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

    <handy-custom-mitshu-mori-received-item base_url="{{config('app.url')}}"></handy-custom-mitshu-mori-received-item>

@endsection
