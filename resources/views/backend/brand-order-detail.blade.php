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
                    <button type="button" class="btn btn-success">手書き受注</button>
                    <button type="button" class="btn btn-default deflt_design_adjust">
                        <input type="tel" style="ime-mode: disabled;float:left;border:1px solid #ddd;" data-type="jan"
                               class="form-control jan_inpts_ jan_inpts_online_order_ brand-order-search" placeholder="ＪＡＮまたはインストア入力">
                    </button>

                    <button type="button" class="btn btn-info"><a class="page_manage custom_online_order"
                                                                  style="color:#fff" href="manualOrder">手書</a></button>

                </div>
                <p class="hmdate" style="margin-bottom:10px;">納品日　<?php echo date("m", time());?>月<?php echo date("d", time());?>日</p>
                <h1 class="brandPageTitlte">入力完了画面</h1>
{{--                <div style="display: flex">--}}
{{--                    <p class="shps_byrsplrs">販売先名<span data_page_num="0" class="jcs_main_hand_title"></span>殿 </p>--}}
{{--                    <bar-code-scan base_url="{{config('app.url')}}" page="brand-order"></bar-code-scan>--}}
{{--                </div>--}}

            </div>
            <div class="col-md-7 col-sm-7 mb-0 text-right">
                <input type="hidden" value="0" class="c_ids_v">
                <input type="hidden" value="" class="c_ids_name">
                <input type="hidden" value="0" class="s_ids_v">
                <input type="hidden" value="" class="s_ids_name">
                <input type="hidden" value="0" class="customer_manual_order_status">
                <div class="top_btn_list">
                    <ul class="top_page_btn_list_jacos list-inline">
                        <li><a href="home" class="btn btn-danger btn-lg">業務選択</a></li>
                        <li><a href="shipment" class="btn btn-success btn-lg">履歴</a></li>
                         <li>
                            <button class="btn customer_list_show_popup btn-warning btn-lg">店舗</button>
                        </li> 
                        <!--<li><a href="#" id="left" class="btn btn-info btn-lg scroll_to_right">左へ移動</a></li>
                        <li><a href="#" id="right" class="btn btn-primary btn-lg scroll_to_left">右へ移動</a></li>-->
                        <li><a href="{{config('app.url').'/brand-order'}}" class="btn btn-info backToBrandOrder btn-lg pull-right ">戻る</a></li>

                    </ul>


                </div>
            </div>
            <!-- <div class="col-md-12 col-sm-5 mb-0 text-left">
                 <div style="display: flex">
                    <p class="shps_byrsplrs">販売先名<span data_page_num="0" class="jcs_main_hand_title"></span>殿 </p>
                   <bar-code-scan base_url="{{config('app.url')}}" page="brand-order"></bar-code-scan> 
                </div>
            </div> -->
        </div>
        <!-- End Page Header -->
        <!-- Small Stats Blocks -->
        <div class="row">
            <div class="col-md-5 text-left">
            <p class="shps_byrsplrs">販売先名<span data_page_num="0" class="jcs_main_hand_title"></span>殿 </p>
            </div>
            <div class="col-md-4">
                <div class="text-center">
                    <div class="input-group">
                            <input type="tel" class="form-control voice_reading_text" placeholder="メーカー名入力してください"
                            aria-describedby="basic-addon2">
                                                    <span class="input-group-addon voice_icon_group" id="basic-addon2">
                                <span id="voice_reset_btn" class="material-icons show voice_start custom_voice_img">
                                settings_voice
                                </span>
                                <span class="voice_recoding hide custom_voice_img" id="stop_rec_btn">
                                <img src="{{Config::get('app.url').'/public/backend/images/voice_rec.gif'}}" class="voice_recoring">
                                </span>
                                </span>
                        <span class="voice_text_c">音声</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>
        <br>
        <div class="row">

        <!-- menual_order_tble -->

            <div class="clearboth"></div>
            <div class="col-md-12 menual_order_receive_table">
                <div id="brand_order_table_entry" style="margin:0">
                    <table class="table table-bordered table-freeze-multi" data-scroll-height="680"
                           data-cols-number="5">

                        <thead class="brand_tble_header_content"
                               style="background-color: #F5F6F8; color: #077BEF; font-size:15px; text-align: center;">
                        <tr>
                            <!-- <th width="100px">#</th> -->
                            <th width="40%">品名・メーカー・規格 </th>
                            <th width="10%">数量</th>
                            <th width="10%">売価</th>
                            <th width="10%">原価</th>
                            <th width="10%" style="padding:0">頻度順</th>
                            <th width="40%">品名・メーカー・規格</th>
                            <th width="10%" style="padding:0">数量</th>
                            <th width="10%">売価</th>
                            <th width="10%">原価</th>
                            <th width="10%">頻度順</th>
                        </tr>

                        </thead>
                        <tbody class="brand_order_updated_tble">


                        <!-- @foreach ($all_customer_list as $key => $customer)
                            <tr>
                                <td width="100px" class="text-center">{{ $key+1 }}</td>
                                <td><a href="{{config('app.url')}}/brand-order-detail/{{$customer->customer_id}}">{{ $customer->name }}</a></td>
                            </tr>
                        @endforeach -->

                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>

    </div>
@endsection
