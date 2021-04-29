@extends('backend.layouts.master')
@section('title')
<title>Shipment Page</title>
@endsection

@section('content')
@include('backend.flash_message.flash_message')
<div id="shipment_js_message"></div>
<div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-1">
    <div class="col-md-5 col-sm-5 mb-0">
            <!-- <span class="text-uppercase page-subtitle">Dashboard</span>  -->
            <h2 class="new_page_title">棚卸在庫・出荷画面<span class="jcs_splyr"></span><span class="default_byr_syplr">殿</span></h2>

            <input type="number" style="ime-mode: disabled;" name="jn_codes" class="form-control shipment_page_jn jcs_jan_code" value="" placeholder="JANまたはインストア入力">

        </div>
        <div class="col-md-7 col-sm-7 pull-right text-right">
        <ul class="top_page_btn_list_jacos list-inline">
            <li class="custom_date_show"><span><?php echo date('Y');?></span>年<span><?php echo date('m');?></span>月<span><?php echo date('d');?></span>日</li>
            <!-- <li><a class="btn btn-lg btn-info" href="{{Config::get('app.url').'logout'}}">サインアウト</a></li> -->
        </ul>
        <ul class="bottom_page_btn_list_jacos list-inline">
            <li><a href="{{ route('brand') }}" class="btn btn-lg btn-info"> 手書</a></li>
            <li><a href="{{Config::get('app.url').'/onlineorder'}}" class="btn btn-lg btn-warning">オンライン受注</a></li>
            <!-- <li><a href="{{Config::get('app.url').'manualOrder'}}" class="btn btn-lg btn-warning">手書受注</a></li> -->
            <li><a href="#" delete_st="0" class="btn btn-lg btn-danger delete_entry">行削除</a></li>
            <li><button class="btn btn-lg customer_list_show_popup btn-primary">販売先</button></li>
            <li><a href="#" id="left" class="btn btn-info btn-lg scroll_to_right">左へ移動</a></li>
            <li><a href="#" id="right" class="btn btn-info btn-lg scroll_to_left">右へ移動</a></li>
            <li><a href="{{Config::get('app.url').'/home'}}" class="btn btn-danger btn-lg">業務選択</a></li>
		</ul>
		</div>
    </div>
    <!-- End Page Header -->
    <!-- Small Stats Blocks -->
    <div class="row" style="display: none;">
        <div class="col-md-4">
           <div class="btn-group custom_grp_btns mb-3" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary customer_list_show_popup border_right_d">販売先一覧</button>
            <button type="button" class="btn btn-secondary customer_list_show">全販売先</button>
            <input type="hidden" value="0" class="c_ids_v">
        </div>
        <div class="input-group">
            <div class="input-group-prepend"><span class="input-group-text">JANコード検索</span></div> <input type="text" value=""
                class="form-control get_jan_info_shipment">
        </div>

        </div>
        <div class="col-md-2"></div>

        <div class="col-md-6 text-right">



        </div>
    </div>
    <div class="row">
        <div class="col-md-12 order_receive_table">
        <div id="inventory_dlvr_details_qty" style="margin:0">
            <table class="table table-bordered table-freeze-multi" cellpadding="0" cellspacing="0" data-scroll-height="550" data-cols-number="">
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
					</colgroup>
                <thead>
                <tr>
							<th rowspan="2" style="width: 200px">品名</th>
							<th rowspan="2" style="width: 90px;">在庫<br>合計 a</th>
							<th colspan="3" style="width: 180px;">在庫内訳</th>
							<th rowspan="2" style="width: 90px;">出荷<br>数量 a</th>
							<th colspan="3" style="width: 180px;">出荷内訳<br>（売掛金）</th>
							<th colspan="3" style="width: 90px;">受注数<br>（出荷予定）</th>
							<th rowspan="2" style="width: 80px;">a<br>原価<br>コスト</th>

							<th rowspan="2" style="width: 70px;">b<br>スパー<br>売価<br>セール</th>
							<th rowspan="2" style="width: 90px;">ｃ<br>粗利</th>
							<th rowspan="2" style="width: 50px;">%</th>
							<th rowspan="2" style="width: 80px;">金額 c</th>
							<th rowspan="2" style="width: 60px;">返品<br>数量</th>
							<th rowspan="2" style="width: 60px;">破損</th>
							<th rowspan="2" style="width: 60px;vertical-align: middle;">棚 No</th>
							<th rowspan="2" style="width: 130px;vertical-align: middle;">JAN</th>
							<th rowspan="2" style="width: 90px;vertical-align: middle;">備考</th>
						</tr>

						<tr>
							<th style="width: 60px;padding-left:0;padding-right:0;">ケース</th>
							<th style="width: 60px;padding-left:0;padding-right:0;">ボール</th>
							<th style="width: 60px;padding-left:0;padding-right:0;">バラ</th>
							<th style="width: 60px;padding-left:0;padding-right:0;">ケース</th>
							<th style="width: 60px;padding-left:0;padding-right:0;">ボール</th>
							<th style="width: 60px;padding-left:0;padding-right:0;">バラ</th>
							<th style="width: 50px;padding-left:0;padding-right:0;">ケース</th>
							<th style="width: 50px;padding-left:0;padding-right:0;">ボール</th>
							<th style="width: 50px;padding-left:0;padding-right:0;">バラ</th>
						</tr>
                </thead>
                <tbody id="" class="order_shipment_body">
                </tbody>
            </table>
</div>
        </div>
    </div>

</div>
@endsection
