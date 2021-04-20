@extends('backend.layouts.master')
@section('title')
<title>発注</title>
@endsection

@section('content')
<!-- @include('backend.flash_message.flash_message') -->
<div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
        <div class="col-md-12">
        @if(session()->has('message'))
    <div class="alert alert-success">
        {{ session()->get('message') }}
    </div>
@endif
        </div>
        <div class="col-md-3">
            <h2><input type="text" readonly value="{{$tonya_name}}" class="supplier_name_input" name="">&nbsp;&nbsp;&nbsp;殿 <div
                    class="btn-group jcs_grp">
                    <!-- <button type="button" class="btn btn-success">仕入先マスター</button>
                    <button type="button" class="btn btn-default deflt_design"><span
                            class="ext_title">メンテ画面</span></button>
                    <button type="button" class="btn btn-info"><a class="page_manage"
                            style="color:#fff;text-decoration:none"
                            href="{{Config::get('app.url').'/customer_master'}}">販売先マスター</a></button> -->

                </div>
            </h2>
            <input type="hidden" is_new_item="0" value="{{$tonya_id}}" class="v_ids_v">
        </div>
        <div class="col-md-4 text-center">
            <h2 class="master_page_titles text-center">仕入先名別発注リスト</h2>
            <div class="input-group">
  <input type="text" class="form-control voice_reading_text" placeholder="品名" aria-describedby="basic-addon2">
  <span class="input-group-addon voice_icon_group" id="basic-addon2">
  <span id="voice_reset_btn" class="material-icons show voice_start custom_voice_img">
settings_voice
</span>
<span class="voice_recoding hide custom_voice_img" id="stop_rec_btn">
<img src="{{Config::get('app.url').'/public/backend/images/voice_rec.gif'}}" class="voice_recoring">
</span>
</span>
</div>
        </div>
        <div class="col-md-5 text-right">
        <!-- <a class="btn btn-primary  btn-lg pull-right" href="{{Config::get('app.url').'/customer_master'}}">販売先マスター</a> -->
            <!-- <button class="btn btn-danger show_tonya_list_for_haccu  btn-lg pull-right">tonya list</button> -->
            <button class="btn btn-primary show_tonya_list_for_haccu  btn-lg pull-right">仕入先一覧</button>

            <a href="{{Config::get('app.url').'/sendTomailportal/'.$tonya_id}}" class="btn btn-primary  btn-lg pull-right">
メールポータルに送信</a>
            <a href="{{Config::get('app.url').'/exportCsvByTonya/'.$tonya_id}}" class="btn btn-primary  btn-lg pull-right">csvを送信</a>
            <button class="btn btn-danger deletes_vendor_item  btn-lg pull-right"
                vendor_item_delete_enable="0">行削除</button>
            <a href="javascript:history.back();" class="btn btn-info  btn-lg pull-right">戻る</a>
            <a href="{{Config::get('app.url').'/home'}}"
                class="btn btn-danger  btn-lg pull-right goto_homepages">業務選択</a>
<br>
<div class="clearfix"></div>
<div class="orderDate">
<span><?php echo date('Y');?></span>年<span><?php echo date('m');?></span>月<span><?php echo date('d');?></span>日
        </div>
        </div>
    </div>
    <!-- End Page Header -->
    <!-- Small Stats Blocks -->


    <div class="row">
        <div id="flash_message"></div>
        <div class="col-md-6">

        </div>
        <div class="col-md-6 text-right">
            <div class="btn_right_are" style="display: none;">
                <ul class="custom_brder_top_right">
                    <li>
                        <button type="button" class="btn dflt_jacos_btn">商 品</button></li>
                    <li>
                        <button type="button" data-tippy-content="商品の登録を行います。"
                            class="btn btn-warning v_new_item_btn_top add_new_item pull-right">登録</button>
                        <button type="button" data-tippy-content="商品の修正を行います。" vendor_item_edit_enable="0"
                            class="btn btn-primary edits_vendor_item pull-right">修正</button>
                        <button type="button" data-tippy-content="商品の削除を行います。" vendor_item_delete_enable="0"
                            class="btn btn-danger deletes_vendor_item pull-right">削除</button></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 haccu_list_by_tonya_table">
            <table class="table table-striped table-bordered product-table" id="product-table">
                <thead>
                    <tr>
                        <th rowspan="2" width="7%" nowrap="nowrap" style="vertical-align: middle; text-align: center;"
                            colspan="2">
                            <input autofocus type="tel" style="ime-mode: disabled;" name="jancode" id="jancode"
                                placeholder="JANコード（13桁）" class="form-control vandor_ins_jancode jancode" disabled>
        <!-- <input type="tel" style="ime-mode: disabled;background:#F3F885; color:#000;width:175px !important;" class="form-control search_by_in_company_code" value="" placeholder="自社コード（5桁）"> -->
                        </th>
                        <th rowspan="2" width="30%" nowrap style="vertical-align: middle; text-align: center;">
                            品名・メーカー・規格

                            </th>
                        <th rowspan="2" width="2%" nowrap="nowrap" style="text-align: center;">区分</th>
                        <th nowrap colspan="3" width="15%" style="text-align: center;">入数</th>
                        <th nowrap style="text-align: center;" width="6%" rowspan="2">a<br>原価<br>コスト</th>
                        <th nowrap style="text-align: center;" width="10%" class="tonya_name" data_c_type="1" rowspan="2">
                        取引先名</th>
                        <!-- <th nowrap style="text-align: center;" width="6%" rowspan="2">b<br>売価<br>セール</th>
                        <th nowrap style="text-align: center;" width="6%" rowspan="2">ｃ<br>粗利</th>
                        <th nowrap style="text-align: center;" width="6%" rowspan="2">％</th>
                        <th nowrap style="text-align: center;" width="5%" rowspan="2">自社コード</th>

                        <th nowrap style="text-align: center;padding:0;" class="filter_supplier_jan" data_c_type="1" rowspan="2">
                        メーカー名＆ＪＡＮコード</th> -->
                    </tr>
                    <tr>
                        <th width="5%" style="text-align:center;" nowrap>ケース</th>
                        <th width="5%" style="text-align:center;" nowrap>ボール</th>
                        <th width="5%" style="text-align:center;" nowrap>バラ</th>
                    </tr>

                </thead>
                <tbody id="vendor_estimate_table_dataddd" class="vendor_itemdata_table">
                    @if($result)
                    <?php $i=1;?>
                        @foreach($result as $value)
                            <tr class="hacchu_list_row row_by_vendor{{$value->vendor_id}}" data_vendor_item_id="{{$value->vendor_item_id}}" data_vendor_id="{{$value->vendor_id}}">
                                <td rowspan="2">{{$i}}</td>

                                <td rowspan="2"><img data_cost_price="{{$value->cost_price}}" data_quantity="" src="{{Config::get('app.url').'/public/backend/images/products/cocacola.jpg'}}" class="itemImagesContr"/></td>
                                <td rowspan="2">{{$value->item_name}}</td>
                                <td rowspan="2">定</td>
                                <td style="text-align: right">{{$value->order_case_quantity}}</td>
                                <td style="text-align: right">{{$value->order_ball_quantity}}</td>
                                <td style="text-align: right">{{$value->order_unit_quantity}}</td>

                                <td rowspan="2">{{$value->cost_price}}</td>
                                <td rowspan="2" style="text-align:left;">{{$value->vendor_name}}</td>
                            </tr>
                            <tr class="hacchu_list_row row_by_vendor{{$value->vendor_id}}" data_vendor_item_id="{{$value->vendor_item_id}}" data_vendor_id="{{$value->vendor_id}}">
                                <td style="text-align: right">{{$value->case_inputs}}</td>
                                <td style="text-align: right">{{$value->ball_inputs}}</td>
                                <td style="text-align: right">0</td>
                            </tr>
                            <?php $i++;?>
                        @endforeach
                        @else
                        <tr><td colspan="8">注文が見つかりません</td></tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>

</div>
    <style>

    </style>
@endsection
