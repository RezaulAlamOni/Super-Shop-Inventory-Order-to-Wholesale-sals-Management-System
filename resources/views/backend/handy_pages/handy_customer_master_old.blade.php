@extends('backend.layouts.master')
@section('title')
    <title>Handy Product Scan Form</title>
@endsection

@section('content')

    <div class="main-content-container container-fluid px-4">
        <!-- Small Stats Blocks -->
        <div class="row">
            <div class="well" style="border: 3px solid #428bca;">
                <div class="header col-md-12 col-xs-12" style="font-size: 18px; padding: 10px;">
                    <span class="pull-left">  販売先マスター</span>
                    <a href="{{Config::get('app.url').'/android_home'}}" class="btn btn-primary pull-right"
                       style="float:right"> メニュー</a>
{{--                    <button id="handy_stimation" class="btn btn-primary pull-right" style="float:right"> 送信</button>--}}
                </div>
                <div class="form-horizontal" id="handy_order_form">
                    <input type="hidden" id="product_category" class="product_category" value="1" name="">
                    <input type="hidden" class="c_ids_v" value="0" name="supplier_id">
                    <input type="hidden" id="set_jan_valu_in_hidden" class="set_jan_valu_in_hidden" value=""
                           name="set_jan_valu_in_hidden">

                    <div class="form-group">
                        <div class="col-md-4 col-xs-12 scan_btn">
                            <input style="color: #000; font-size: 20px; height: 45px;" type="tel"
                                   data_field_name="get_handy_customer_master_jan" class="form-control scanner"
                                   id="customer_master_jancode" placeholder="JANコード（13桁）">
                            <div class="mobile_code"></div>
                            <div class="error_mobile_code"></div>
                            <!--scan added to -->
                            <button class="btn btn-success hidden-md hidden-lg jan_scaning btn-sm" type="button"
                                    onclick="barcodeScanning('janmaster_handy')" style="display: inline-block;"><i
                                    class="material-icons">
                                    border_inner
                                </i></button>
                            <input type="hidden" data_page="janmaster_handy" data_br_sp_id="" id="get_janCode" value=""
                                   name="get_janCode">
                            <!--scan added to -->
                        </div>

                    </div>
                    <div class="form-group">
                        <p id="search_product_name" class="product_name_aria"><span
                                style="color: #999; font-size: 30px;">商品名</span></p>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
@endsection
