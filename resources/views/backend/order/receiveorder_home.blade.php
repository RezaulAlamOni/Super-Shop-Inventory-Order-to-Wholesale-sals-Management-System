@extends('backend.layouts.master')
@section('title')
    <title>Receive Order Page</title>
@endsection

@section('content')
    @include('backend.flash_message.flash_message')
    <div class="main-content-container container-fluid px-4">
        <!-- Page Header -->
        <div class="page-header row no-gutters py-1">

            <div class="col-md-5 col-sm-5 mb-0">
                <!-- <span class="text-uppercase page-subtitle">Dashboard</span>  -->
                <h2 class="new_page_title">棚卸在庫・発注画面</h2>
                <input type="tel" style="ime-mode: disabled;" name="jn_codes"
                       class="form-control recive_order_page_jn jcs_jan_code" value="" placeholder="JANまたはインストア入力">
{{--                <span class="byrs_syplr_titles"></span>--}}
                <bar-code-scan base_url="{{config('app.url')}}" page="re"></bar-code-scan>
                <input type="hidden" value="0" class="v_ids_v">
            </div>
            <div class="col-md-7 col-sm-7 pull-right text-right">

                <ul class="top_page_btn_list_jacos list-inline">
                    <!-- <li class="custom_u_name">Tonnaya</li> -->
                    <li class="custom_date_show">
                        <span><?php echo date('Y');?></span>年<span><?php echo date('m');?></span>月<span><?php echo date('d');?></span>日
                    </li>
                <!-- <li><a class="btn btn-lg btn-info" href="{{Config::get('app.url').'logout'}}">サインアウト</a></li> -->
                </ul>
                <ul class="bottom_page_btn_list_jacos list-inline">
                    <li><a href="{{ route('hacchu.order.list') }}" class="btn btn-success  btn-lg">仕入先名別発注リスト</a></li>

                    <li><a href="#" delete_st="0" class="btn btn-lg btn-danger delete_entry">行削除</a></li>
                    <li>
                        <button class="btn btn-lg receive_order_dflt_nav_btn btn-success">発注</button>
                    </li>
                    <li>
                        <button class="btn btn-lg btn-primary vendor_list_show_popup">仕入先</button>
                    </li>
                    <li><a href="#" id="left" class="btn btn-info btn-lg scroll_to_right">左へ移動</a></li>
                    <li><a href="#" id="right" class="btn btn-info btn-lg scroll_to_left mt-1">右へ移動</a></li>
                    <li><a href="{{Config::get('app.url').'/home'}}" class="btn btn-danger btn-lg mt-1">業務選択</a></li>
                    <li><a href="javascript:history.back();" class="btn btn-info btn-lg pull-right mt-1 ">戻る</a></li>
                </ul>
            </div>

        </div>
        <!-- End Page Header -->
        <!-- Small Stats Blocks -->
        <div class="row">
            <div id="receive_order_message_success"></div>
        </div>
        <div class="row">

            <div class="col-md-12 order_receive_table">
                <div id="inventory_details_qty_bysuplierid" style="0">
                    <table class="table table-striped table-bordered table-freeze-multi" cellpadding="0" cellspacing="0" data-scroll-height="550" data-cols-number="">
                    <!-- <table class="table table-striped table-bordered">-->
                        <colgroup>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
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
                        <tr>
                            <th rowspan="2" style="width: 200px">品名</th>
                            <th rowspan="2" style="width: 90px;border-left: 5px solid #000 !important;">在庫<br>バラ<br>合計<BR> A</th>
                            <th colspan="3" style="width: 180px;">在庫内訳<br>A</th>
                            <th rowspan="2" style="width: 90px;border-left: 5px solid #000 !important;">ハンディ<br>発注<br>バラ</th>
                            <th colspan="3" style="width: 180px;">ハンディ<br>発注</th>
                            <th rowspan="2" style="width: 90px;border-left: 5px solid #000 !important;">発注点<br>バラ<br> X</th>
                            <th colspan="3" style="width: 180px;">発注点<br> X</th>
                            <th rowspan="2" style="width: 90px;border-left: 5px solid #000 !important;">発注<br>バラ<br> Y</th>
                            <th colspan="3" style="width: 180px;">発注ロット<br> Y</th>

                            <th colspan="3" style="width: 180px;">納入実績<br>(買掛金)
                            </th>
                            <th rowspan="2" style="width: 80px;vertical-align: middle;">入庫<br>棚no</th>
                            <th rowspan="2" style="width: 80px;">a<br>原価<br>コスト</th>
                            <th rowspan="2" style="width: 80px;">b<br>売価<br>セール</th>
                            <!-- <th rowspan="2" style="width: 50px;">金額 c</th> -->

                            <th rowspan="2" style="width: 80px;">ｃ<br>粗利</th>
                            <th rowspan="2" style="width: 80px;">%</th>
                            <th rowspan="2" style="width: 80px;">返品数量</th>
                            <th rowspan="2" style="width: 80px;">破損</th>

                            <th rowspan="2" style="width: 120px;vertical-align: middle;">JAN</th>
                        </tr>
                        <tr>
                            <th style="width: 60px;padding-left:0;padding-right:0;">ケース</th>
                            <th style="width: 60px;padding-left:0;padding-right:0;">ボール</th>
                            <th style="width: 60px;padding-left:0;padding-right:0;">バラ</th>

                            <th style="width: 60px;padding-left:0;padding-right:0;">ケース</th>
                            <th style="width: 60px;padding-left:0;padding-right:0;">ボール</th>
                            <th style="width: 60px;padding-left:0;padding-right:0;">バラ</th>

                            <th style="width: 60px;padding-left:0;padding-right:0;">ケース</th>
                            <th style="width: 60px;padding-left:0;padding-right:0;">ボール</th>
                            <th style="width: 60px;padding-left:0;padding-right:0;">バラ</th>

                            <th style="width: 60px;padding-left:0;padding-right:0;">ケース</th>
                            <th style="width: 60px;padding-left:0;padding-right:0;">ボール</th>
                            <th style="width: 60px;padding-left:0;padding-right:0;">
                                バラ
                            </th>

                            <th style="width: 60px;padding-left:0;padding-right:0;">ケース</th>
                            <th style="width: 60px;padding-left:0;padding-right:0;">ボール</th>
                            <th style="width: 60px;padding-left:0;padding-right:0;">バラ</th>

                        </tr>

                        </thead>
                        <tbody id="order_receive_bodys" class="order_receive_body">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
@endsection
