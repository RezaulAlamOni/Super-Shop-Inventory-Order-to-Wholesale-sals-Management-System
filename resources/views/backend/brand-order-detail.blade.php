@extends('backend.layouts.master')
@section('title')
    <title>Shipment Page</title>
@endsection

@section('content')
    @include('backend.flash_message.flash_message')
    <div id="m_order_message"></div>
    <div class="main-content-container container-fluid px-4">
        <!-- Page Header -->
        <div class="page-header row no-gutters py-1">
            <div class="col-md-5 col-sm-5 mb-0 text-left">
                <div class="btn-group jcs_grp">
                    <button type="button" class="btn btn-success">オンライン受注画面</button>
                    <button type="button" class="btn btn-default deflt_design_adjust">
                        <input type="tel" style="ime-mode: disabled;float:left;border:1px solid #ddd;"
                               class="form-control jan_inpts_ jan_inpts_online_order_" placeholder="ＪＡＮまたはインストア入力">
                    </button>

                    <button type="button" class="btn btn-info"><a class="page_manage custom_online_order"
                                                                  style="color:#fff" href="manualOrder">手書</a></button>

                </div>
                <p class="hmdate">納品日　<?php echo date("m", time());?>月<?php echo date("d", time());?>日</p>
                <div style="display: flex">
                    <p class="shps_byrsplrs">販売先名<span class="jcs_main_hand_title">{{$specific_customer_info->name}}</span>殿 </p>
{{--                    <bar-code-scan base_url="{{config('app.url')}}" page="online"></bar-code-scan>--}}
                </div>

            </div>
            <div class="col-md-7 col-sm-7 mb-0 text-right">
                <input type="hidden" value="{{$specific_customer_info->customer_id}}" class="c_ids_v">
                <input type="hidden" value="0" class="customer_manual_order_status">
                <div class="top_btn_list">
                    <ul class="top_page_btn_list_jacos list-inline">
                        <li><a href="#" delete_st="0" class="btn btn-danger btn-lg delete_entry">行削除</a></li>
                        <li><a href="home" class="btn btn-danger btn-lg">業務選択</a></li>
                        <li><a href="shipment" class="btn btn-warning btn-lg">履歴</a></li>
                        <li><a href="#" class="btn btn-warning btn-lg">完了</a></li>
                        <!-- <li>
                            <button class="btn customer_list_show_popup btn-warning btn-lg">店舗</button>
                        </li> -->
                        <li><a href="#" id="left" class="btn btn-info btn-lg scroll_to_right">左へ移動</a></li>
                        <li><a href="#" id="right" class="btn btn-primary btn-lg scroll_to_left">右へ移動</a></li>
                    </ul>


                </div>
            </div>
        </div>
        <!-- End Page Header -->
        <!-- Small Stats Blocks -->
        <div class="row">

        </div>
        <br>
        <div class="row">

        <!-- menual_order_tble -->

            <div class="clearboth"></div>
            <div class="col-md-12 menual_order_receive_table">
                <div id="manual_order_table_entry" style="margin:0">
                    <table class="table table-bordered table-freeze-multi" data-scroll-height="680"
                           data-cols-number="5">

                        <thead class="brand_tble_header_content"
                               style="background-color: #F5F6F8; color: #077BEF; font-size:15px; text-align: center;">
                        <tr>
                            <th width="100px">#</th>
                            <th>題名</th>
                        </tr>

                        </thead>
                        <tbody class="brand_order_tble">

                        
                        @foreach ($brands as $key => $brand)
                            <tr>
                                <td width="100px" class="text-center">{{ $key+1 }}</td>
                                <td>{{ $brand }}</td>
                            </tr>
                        @endforeach

                        </tbody>
                    </table>
                </div>

            </div>
        </div>

    </div>
@endsection
