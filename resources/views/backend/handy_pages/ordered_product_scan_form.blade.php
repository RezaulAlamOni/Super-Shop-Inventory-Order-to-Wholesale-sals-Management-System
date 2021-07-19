@extends('backend.layouts.master')
@section('title')
    <title>Handy Product Scan Form</title>
@endsection

@section('content')

    <div class="main-content-container container-fluid px-4">
        <!-- Small Stats Blocks -->
        <div class="row">
            <div class="well" style="border: 3px solid #428bca;">
                <div class="header col-md-12 col-xs-12" style="font-size: 16px; padding: 10px;">
                    <span class="pull-left"> 検品・仮置き（入荷一覧)</span>
                    <!-- <button id="handy_shipment_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button>&nbsp;-->
                    <a href="{{Config::get('app.url').'/android_home'}}" class="btn btn-primary pull-right" style="position: absolute; right: 0;
    padding: 6px 7px;"> メニュー</a>

                </div>
                <div class="col-md-offset-2 col-md-8 col-centereds">

                    <div class="row custom_p_scan">
                        <br>
                        <br>
                        <form id="stock_detail_by_jan_form" class="p_scn_form text-right" method="post" action="handy_received_product_detail_by_jan_code">
                            @csrf
                            <div class="form-group row">
{{--                                <label for="scan_bybin" class="col-md-2 customlabel col-form-label">JANコード</label>--}}
                                <div class="col-md-10 customfiled" style="width: 100%">
                                    <!-- <input type="tel" data_field_name="stock_update_reck_jan" class="form-control scanner" id="scan_bybin" placeholder="JANコードスキャン"> -->
                                    <input  type="tel" pattern="\d*" maxlength="13" data_field_name="jan_code" class="form-control custom-input" name="jan_code" id="scan_by_jan_for_order_receive" placeholder="JANコードスキャン（13桁）">
                                </div>
                                <div class="offset-2 col-md-10 text-left">
                                    @if($errors->any())
                                        <h6 class="text-danger">{{$errors->first()}}</h6>
                                    @endif
                                </div>

                            </div>

{{--                            <a href="{{Config::get('app.url').'/handy_order_receive_list'}}" style="float: left;" class="btn btn-primary text-right show_inline"> 発注一覧表</a>--}}
                            <button type="submit" class="btn btn-primary scan_bybin_search pull-right text-right show_inline custom-btn">次へ</button>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 handdy_error hide hide_enter_outside close_aria" style="position: fixed; bottom: 0px; right: 0px; padding: 4px;">
        <div class="panel panel-danger" style="margin-bottom: 2px; border: solid 2px red; border-top: solid 5px red; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
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
