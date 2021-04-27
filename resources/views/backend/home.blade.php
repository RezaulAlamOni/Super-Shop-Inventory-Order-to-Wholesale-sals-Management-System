@extends('backend.layouts.master')
@section('title')
<title>{{__('messages.dashboard_text')}}</title>
@endsection

@section('content')

<div class="main-content-container homepage_body container-fluid px-4">
	<!-- Page Header -->
	<div class="home_page">
	<div class="page-header custom_header_bottom row no-gutters py-4 mb-3">
	<div class="col-md-2">

		<h4 class="owner_title"> 問屋用 </h4>
	</div>
		<div class="col-10 col-sm-10 text-center text-sm-right mb-15">

			<!-- <a href="#" class="btn btn-primary btn-lg" style="margin-right: 5px;">イメージテキスト</a>
			<a href="#" class="btn btn-primary btn-lg" style="margin-right: 5px;">イメージファクス注文</a>
			<a href="#" class="btn btn-primary btn-lg" style="margin-right: 5px;">音声</a>
			<a href="#" class="btn btn-primary btn-lg" style="margin-right: 5px;">ファクス注文</a> -->
			<a href="{{Config::get('app.url').'/android_home'}}" class="btn btn-info btn-lg" style="margin-right: 5px;">ハンディー</a>
			<a href="{{Config::get('app.url').'/logout'}}" class="btn btn-danger btn-lg" onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">終了</a>
										<form id="logout-form" action="{{Config::get('app.url').'/logout'}}" method="POST"
                        style="display: none;">
                        @csrf
                    </form>


		</div>
	</div>
	<!-- End Page Header -->
	<!-- Small Stats Blocks -->
	<div class="row">
		<div class="col-md-offset-1 col-md-10 col-centereds">
			<div class="row">
				<h2 class="titlle" style="text-align: left;padding-left: 15px;">業務を選択してください。</h2>
			</div>
			<div class="row">
			<!-- <div class="col-md-2"></div> -->
				<div class="col-md-4">
					<a href="{{Config::get('app.url').'/vendor_master'}}" class="btn btn-success common_goto"
						data_num_link="1" id="jan_manter_handy_btn">
						<div class="left_num pull-left" style="padding: 0; margin: 0;">1</div>
						<div class="col-md-12 text-center" style="padding: 0; margin: 0;">販売先マスター作成</div>
					</a>
					<p class="submessg">（取引先・商品登録）</p>
					<h4 class="btom_content_home"  style="padding-top:15px">①定番 マスターを作成</h4>
				</div>
				<div class="col-md-4">
					<a href="{{Config::get('app.url').'/receiveorder'}}" class="btn btn-success common_goto"
						data_num_link="2" id="jan_manter_handy_btn">
						<div class="left_num pull-left" style="padding: 0; margin: 0;">2</div>
						<div class="col-md-12 text-center" style="padding: 0; margin: 0;">棚卸・発注・入荷</div>
					</a>
					<p class="submessg">（仕入発注）<a href="{{Config::get('app.url').'/vendormangementsheet'}}" class="btn btn-success btn-sm receiveablebtn common_goto_sheet"
							data_num_link="11" id="size_setting_btn" style="margin-bottom: 0">
							買掛
</a></p>
<h4 class="btom_content_home" style="padding-top:15px">②定番 商品を棚卸で、在庫 不足を、補充して発注</h4>
				</div>
				<!-- <div class="col-md-2"></div> -->
				<div class="col-md-4">
					<a href="{{Config::get('app.url').'/shipment'}}" class="btn btn-success common_goto"
						data_num_link="3" id="jan_manter_handy_btn">
						<div class="left_num pull-left" style="padding: 0; margin: 0;">3</div>
						<div class="col-md-12 text-center" style="padding: 0; margin: 0;">販売先マスター・出荷</div>
					</a>
					<p class="submessg">（受注・確定）<a href="{{Config::get('app.url').'/shipmentmangementsheet'}}"
							class="btn btn-success btn-sm deliverablebtn common_goto_sheet" data_num_link="12"
							id="size_setting_btn" style="margin-bottom: 0">
							売掛
						</a></p>
						<h4 class="btom_content_home" style="padding-top:55px">③000000000</h4>
				</div>

			</div>
		</div>
	</div>
</div>
</div>
@endsection
