@extends('backend.layouts.master')
@section('title')
<title>Handy Product Scan Form</title>
@endsection

@section('content')

<div class="main-content-container container-fluid px-4">
    <!-- Small Stats Blocks -->
  <div class="row">
  <div class="well" style="border: 3px solid #428bca;">
					<div class="header col-md-12 col-xs-12" style="font-size: 18px; padding: 10px;">
						<span class="pull-left"> 棚・入庫</span>
						<!-- <button id="handy_shipment_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button>&nbsp;-->
						<a href="{{Config::get('app.url').'/android_home'}}" class="btn btn-primary pull-right" style="float:right"> メニュー</a>

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
					<form id="stock_detail_by_jan_form" class="p_scn_form text-right" method="post" action="handy_stock_product_store_rack_code">
					@csrf
						<div class="form-group row">
{{--							<label for="scan_bybin" class="col-md-2 customlabel col-form-label">JANコード</label>--}}
							<div class="col-md-12 "> <!--customfiled-->
								<!-- <input type="tel" data_field_name="stock_update_reck_jan" class="form-control scanner" id="scan_bybin" placeholder="JANコードスキャン"> -->
								<input type="tel" data_field_name="stock_update_reck_jan" class="form-control custom-input " name="scan_by_jan_for_stock_detail" id="scan_by_jan_for_stock_detail" placeholder="JANコードスキャン（13桁）">
							</div>
						</div>
						<button type="submit" class="btn btn-primary scan_bybin_search pull-right text-right show_inline custom-btn">次へ</button>
						<div class="stock_item_update_body hide">
						<hr>
								<div class="form-group row">
									<label for="b_jancode" class="col-md-2 customlabel col-form-label">JAN</label>
									<div class="col-md-10 customfiled">
										<input type="tel" data_field_name="b_jan_code" class="form-control scanner" id="b_jancode" value="" placeholder="">
									</div>
								</div>
								<div class="form-group row">
									<input type="hidden" vendor_id="0" value="0" id="v_i_id">
									<table class="table table-bordered table-striped custom_stock_item_table">
										<thead>
											<th></th>
											<th>入数</th>
											<th>数量</th>
										</thead>
										<tbody>
											<tr>
												<td>ケース</td>
												<td class="d_c_qtys"></td>
												<td contenteditable="true" class="c_qtys"></td>
											</tr>
											<tr>
												<td>ボール</td>
												<td class="d_b_qtys"></td>
												<td contenteditable="true" class="b_qtys"></td>
											</tr>
											<tr>
												<td>バラ</td>
												<td class="d_u_qtys"></td>
												<td contenteditable="true" class="u_qtys"></td>
											</tr>

										</tbody>
									</table>
								</div>

								<button data_types="1" class="btn btn-primary update_stock_item_by_jan pull-right text-right">次棚</button>
								<button data_types="2" class="btn btn-primary update_stock_item_by_jan pull-right text-right">次商品</button>
						</div>
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

        <div class="card-body">
            <a class="btn btn-light float-right" href="javascript:void(0)" onclick="$('#handy-navi').hide()">戻る</a>
            <ol id="handy-navi-body">
                <li>JANコードスキャンして<br>【次へ】押してください。</li>
            </ol>

        </div>
    </div>
</div>
@endsection
