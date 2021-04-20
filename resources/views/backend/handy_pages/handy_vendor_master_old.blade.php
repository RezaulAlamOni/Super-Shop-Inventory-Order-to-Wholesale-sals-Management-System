@extends('backend.layouts.master')
@section('title')
    <title>Handy Product Scan Form</title>
@endsection

@section('content')

    <div class="main-content-container container-fluid px-4">
        <!-- Small Stats Blocks -->
        <div class="row">
            <div class="well" style="border: 3px solid #428bca;">
                <div class="header col-md-12 col-xs-12" style="font-size: 18px; padding:25px 10px;height:80px;">
                    <span class="pull-left"> 仕入先マスター</span>
                    <button id="handy_vendor_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信
                    </button>
                    <a href="{{Config::get('app.url').'/android_home'}}" class="btn btn-success pull-right"
                       style="float:right"> メニュー</a>
                </div>
                <div class="form-horizontal" id="handy_order_form">
                    <input type="hidden" id="product_category" class="product_category" value="1" name="">
                    <input type="hidden" class="v_ids_v" value="0" name="supplier_id">
                    <input type="hidden" id="set_jan_valu_in_hidden" class="set_jan_valu_in_hidden" value=""
                           name="set_jan_valu_in_hidden">

                    <div class="form-group">
                        <div class="col-md-4 col-xs-12 scan_btn">
                            <input style="color: #000; font-size: 20px; height: 45px;" type="tel"
                                   data_field_name="get_handy_vendor_master_jan" class="form-control"
                                   id="handy_vendor_master_jancode_registration" placeholder="JANコード（13桁）">
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
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 handdy_error hide hide_enter_outside close_aria"
         style="position: fixed; bottom: 0px; right: 0px; padding: 4px;">
        <div class="panel panel-danger"
             style="margin-bottom: 2px; border: solid 2px red; border-top: solid 5px red; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
            <div class="panel-body" style="padding:10px">
                <p style="margin: 0; font-size: 20px;" class="text-danger handy_error_msg text-center"></p>
            </div>
        </div>
    </div>

    <div class="jn nav_disp" style="z-index: 9999;width: 270px; right: 15px; bottom: 15px;" id="handy-navi">
        <div class="card card-warning jn_old_popup " style="padding: 6px">
            <div class="card-body">
                <a class="btn btn-light float-right" href="javascript:void(0)"
                   onclick="$('#handy-navi').hide()">戻る</a>
                <ol id="handy-navi-body">
                    JANコードスキャンして<br>【次へ】押してください。
                </ol>
            </div>
        </div>
    </div>

@endsection
@section('content')
    <script>
        $('#handy-navi').show()
    </script>
@endsection
