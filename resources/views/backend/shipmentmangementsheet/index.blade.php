@extends('backend.layouts.master')
@section('title')
    <title>Shipment Management Sheet</title>
@endsection

@section('content')
    @include('backend.flash_message.flash_message')
    <div id="managementshipment_message"></div>
    <iframe id="my_iframe" type="application/pdf" style="display:none;"></iframe>
    <div class="main-content-container container-fluid px-4">
        <!-- Page Header -->
        <div class="page-header row no-gutters py-4">

            <div class="col-md-4 col-sm-4 mb-0">
                <div class="jcs_rcv_title divs_pages">
                    <span style="font-size:40px;font-weight:bold;color:#000;">売掛金　管理表</span>
                    <?php
                    $frms_d = explode("/", $shipment_start_date);
                    $to_d = explode("/", $shipment_end_date);

                    $date_vl = $frms_d[0] . '年' . $frms_d[1] . '月' . $frms_d[2] . '日 ～' . $to_d[0] . '年' . $to_d[1] . '月' . $to_d[2] . '日';

                    ?>
                    <span class="jcs_splyr_mngesmnet_date_shows"><br><?=$date_vl?></span>
                </div>
                <input type="hidden" value="0" class="c_ids_v">
                <input type="hidden" class="form-control customer_arrival_date" id="shipment_start_date"
                       name="shipment_start_date" value="{{$shipment_start_date}}">
                <input type="hidden" class="form-control customer_arrival_date" id="shipment_end_date"
                       name="shipment_end_date" value="{{$shipment_end_date}}">
            </div>
            <div class="col-md-4 col-sm-4 mb-0 text-center">
                <span style="font-size:26px; font-weight:normal;color:#000;">残高 a+増加 b-減少 c=新残 d</span>
{{--                <span class="default_byr_syplr_mangentsht">合計</span><span class="jcs_splyr_mngesmnet">0,000</span><span--}}
{{--                    class="default_byr_syplr_mangentsht">円</span>--}}
            </div>

            <div class="col-md-4 col-sm-4 mb-0">

                <ul class="top_page_btn_list_jacos list-inline text-right">
                    <li><a href="#" class="btn btn-info btn-lg clcikstates">日付順</a></li>
                    <li><a href="#" class="btn btn-success btn-lg gotomanagementsht">買掛管理</a></li>
                    <li><a href="home" class="btn btn-lg btn-danger">業務選択</a></li>
                    <li><a href="javascript:history.back();" class="btn btn-info btn-lg pull-right mt-1 ">戻る</a></li>
                </ul>

            </div>
        </div>
        <!-- End Page Header -->
        <div class="row">
            <div class="col-md-12 estimate_product_table">
                <img src="{{Config::get('app.url').'/public/loader/ajax-loader.gif'}}" class="loading_image" style="display:none;"/>
                <div id="management_sheet_table" style="margin:0;">
                    <table class="table table-striped table-bordered shipment_sheet_table table-freeze-multi"
                           cellpadding="0" cellspacing="0" data-scroll-height="550" data-cols-number="">
                        <colgroup>
                            <col>
                            <col>
                            <col>
                            <col>
                            <col>
                            <col>
                            <col>
                            <col>
                        </colgroup>
                        <thead>
                        <tr style="background: #eff5f1;">
                            <th style="width: 30px">NO</th>
                            <th style="font-size: 24px;;width: 110px">入力日</th>
                            <th style="font-size: 24px;;width: 180px;">取引先名</th>
                            <th style="font-size: 24px;vertical-align: top !important;width: 100px"><p style="color:red;">A</p>前残</th>
                            <th style="font-size: 24px;vertical-align: top !important;width: 100px"><p style="color:red;">B</p> 出荷 <br>増加</th>
                            <th style="font-size: 24px;vertical-align: top !important;width: 100px"><p style="color:red;">C</p> 入金<br>減少</th>
                            <th style="font-size: 24px;vertical-align: top !important;width: 100px;border-right: 4px double #044f90;"><p style="color:red; ">D</p>
                                t新規残高<br>(売掛金) <br>新残
                            </th>
                            <th style="font-size: 24px;;width: 300px;">メモ</th>
                        </tr>

                        </thead>
                        <tbody id="shipment_table_dataddd" class="shipment_itemdata_table">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
    <!-- payment show list modal -->
    <div class="modal fade" id="payment_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="maker_modal_heading"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="payment_message_shown"></div>
                        </div>
                        <div class="col-sm-12 customer_heading">
                            <h3 class="text-center">入金情報設定</h3>

                        </div>
                        <div class="clearfix"></div>
                        <div class="col-sm-12 text-center">
                            伝票番号:<span data_c_v_id="0" data_p_amount="0" data_o_id="0" data_p_type=""
                                       class="payment_voucher"></span>
                        </div>
                        <div class="clearfix"></div>
                        <div id="payment_message_success"></div>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="modal-body">
                    <div class="panel-body buyrslisst_overflow">
                        <table class="table table-striped table-bordered buyrslisst_overflow">
                            <thead>
                            <tr>
                                <th>入金日</th>
                                <th>入金額</th>
                                <th>削除</th>
                            </tr>
                            </thead>
                            <tbody class="payment_table_dataddd">

                            </tbody>
                        </table>
                        <div class="">
                            <form class="form-inline">
                                <label for="p_amount" class="mr-sm-2">入金額入力:</label>
                                <input type="number" class="form-control mb-2 mr-sm-2" id="p_amount">
                                <input type="hidden" class="already_given_total" value="0">
                                <button type="submit" class="btn btn-primary mb-2 insert_payment">入金</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                            data-dismiss="modal">{{__('messages.close')}}</button>
                </div>
            </div>
        </div>
    </div>
    <!--show payment modal-->
@endsection
