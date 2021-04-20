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

    <div class="main-content-container container-fluid px-4">
        <!-- Small Stats Blocks -->
        <div class="row">
            <div class="well" style="border: 3px solid #428bca;">
                <div class="header col-md-12 col-xs-12" style="font-size: 18px; padding: 10px;">
                    <span class="pull-left"> 棚卸棚番スキャン</span>
                    <!-- <button id="handy_shipment_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button>&nbsp;-->
                    <a href="{{Config::get('app.url').'/android_home'}}" class="btn btn-primary pull-right"
                       style="float:right"> メニュー</a>

                </div>
                <div class="col-md-offset-2 col-md-8 col-centereds">
                    @if (Session::has('message'))
                        <div class="alert alert-danger alert-block">
                            <button type="button" class="close" data-dismiss="alert">×</button>
                            <strong>{{Session::get('message')  }}</strong>
                        </div>
                    @endif
                    <div class="row custom_p_scan">
                        <br>
                        <br>
                        <form class="p_scn_form text-right">
                            <div class="form-group row">
                                <div class="col-md-12">
                                    <input type="tel" data_field_name="stock_update_reck_jan" class="form-control custom-input"
                                           name="scan_by_jan_for_stock_detail" id="scan_by_jan_for_stock_detail_handy"
                                           placeholder="JANコードスキャン（13桁）" autofocus>
                                </div>
                            </div>
                            <button type="submit"
                                    class="btn btn-primary scan_bybin_search_new pull-right text-right show_inline custom-btn">次へ
                            </button>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    </div>


    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
         aria-hidden="true" id="stock-inventory-show-by-jan">
        <div class="modal-dialog modal-lg mt-0">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <div class="main-content-container container-fluid">
                        <div class="row">
                            <div class="well" style="border: 3px solid rgb(66, 139, 202);">
                                <div id="handy_order_form_by_jan" class="form-horizontal">

                                </div>
                            </div>
                        </div>
                    </div>
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
{{--            <div class="card-heading">--}}
{{--                <a class="btn btn-light float-right" href="javascript:void(0)" onclick="$('#handy-navi').hide()">戻る</a>--}}
{{--            </div>--}}
            <div class="card-body">
                <a class="btn btn-light float-right" href="javascript:void(0)" onclick="$('#handy-navi').hide()">戻る</a>
                <ol id="handy-navi-body">
                    <li>JANコードスキャンして<br>【次へ】押してください。</li>
                </ol>

            </div>
        </div>
    </div>
@endsection
