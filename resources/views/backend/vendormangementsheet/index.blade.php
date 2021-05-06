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
        <div class="page-header row no-gutters py-1">

            <div class="col-md-4 col-sm-4 mb-0">
                <div class="jcs_rcv_title divs_pages">
                    <span style="font-size:40px;color:#000;font-weight:bold;">買掛金 管理表 全体</span>
                    <?php
                    $frms_d = explode("/", $vendor_start_date);
                    $to_d = explode("/", $vendor_end_date);

                    $date_vl = $frms_d[0] . '年' . $frms_d[1] . '月' . $frms_d[2] . '日 ～ ' . $to_d[0] . '年' . $to_d[1] . '月' . $to_d[2] . '日';

                    ?>
                    <input type="hidden" class="form-control vendor_arrival_date" id="vendor_start_date"
                           name="vendor_start_date" value="{{$vendor_start_date}}">
                    <input type="hidden" class="form-control vendor_arrival_date" id="vendor_end_date"
                           name="vendor_end_date" value="{{$vendor_end_date}}">
                    <span class="jcs_splyr_mngesmnet_date_shows"><br> <?=$date_vl?></span>
                </div>
                <input type="hidden" value="0" class="v_ids_v">
            </div>
            <div class="col-md-4 col-sm-4 mb-0 text-center">
                <span style="font-size:26px; font-weight:normal;color:#000;">残高 a+増加 b-減少 c=新残 d</span>
{{--                <span class="default_byr_syplr_mangentsht">合計</span><span class="jcs_splyr_mngesmnet">0,000</span>--}}
{{--                <span class="default_byr_syplr_mangentsht">円</span>--}}
            </div>

            <div class="col-md-4 col-sm-4 mb-0">

                <ul class="top_page_btn_list_jacos list-inline text-right">
                    <!--<li><a href="#" class="btn btn-info btn-lg clcikstates">日付順</a></li>
                    <li><a href="#" class="btn btn-success btn-lg gotomanagementsht">売掛管理</a></li>-->
                    <li style="font-weight:bold;color:red;font-size:24px;">合計:<span class="TotalBlance"></span></li>
                    <li><a href="{{Config::get('app.url').'/home'}}" class="btn btn-lg btn-danger">業務選択</a></li>
                    <li><a href="javascript:history.back();" class="btn btn-info btn-lg pull-right ml-1 ">戻る</a></li>

                </ul>

            </div>
        </div>
        <!-- End Page Header -->
        <!-- Small Stats Blocks -->
        <div class="row">
            <div class="col-md-12">
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
                            <th style="width: 50px">NO</th>
                            <th style="width: 80px">入力日</th>
                            <th style="width: 80px;">取引先名</th>
                            <th style="vertical-align:top !important;width: 60px"><p style="color:red;">A</p>前残</th>
                            <th style=";vertical-align:top !important;width: 60px"><p style="color:red;">B</p>入荷<br>増加</th>
                            <th style=";vertical-align:top !important;width: 60px"><p style="color:red;">C</p>支払<br>減少</th>
                            <th style=";vertical-align:top !important;width: 60px;border-right: 4px double #044f90;"><p style="color:red; ">D</p>
                                新規残高<br>(買掛金)<br>新残
                            </th>
                            <th style="font-size: 24px;vertical-align:top !important;width: 300px">メモ</th>
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
                            <h3 class="text-center">出金情報設定</h3>

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
                                <th>出金日</th>
                                <th>出金額</th>
                                <th>削除</th>
                            </tr>
                            </thead>
                            <tbody class="payment_table_dataddd">

                            </tbody>
                        </table>
                        <div class="">
                            <form class="form-inline">
                                <label for="p_amount" class="mr-sm-2">出金額入力:</label>
                                <input type="number" class="form-control mb-2 mr-sm-2" id="p_amount">
                                <input type="hidden" class="already_given_total" value="0">
                                <button type="submit" class="btn btn-primary mb-2 insert_payment">出金</button>
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
