@extends('backend.layouts.master')
@section('title')
    <title>Handy Product Scan Form</title>
@endsection

@section('content')
    <handy-customer-master base_url="{{config('app.url')}}" read_only="1"></handy-customer-master>
@endsection
@section('content')
@endsection
