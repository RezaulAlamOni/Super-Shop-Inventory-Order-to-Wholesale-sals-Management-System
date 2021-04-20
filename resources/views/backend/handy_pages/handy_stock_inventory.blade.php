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
						<!-- <button id="handy_vendor_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button> -->
						<a href="{{Config::get('app.url').'/android_home'}}" class="btn btn-success pull-right" style="float:right"> メニュー</a>
					</div>
					<div class="form-horizontal" id="handy_order_form">
						<input type="hidden" id="product_category" class="product_category" value="1" name="">
						<input type="hidden" class="v_ids_v" value="0" name="supplier_id">
						<input type="hidden" id="set_jan_valu_in_hidden" class="set_jan_valu_in_hidden" value="" name="set_jan_valu_in_hidden">

						<div class="form-group">
							<div class="col-md-4 col-xs-12 scan_btn">
							<input type="tel" style="color: #000; font-size: 20px; height: 45px;" class="form-control" id="scan_by_shelf_number" minlength="4" placeholder="スキャン入庫棚番号（4桁）">
								<input style="color: #000; font-size: 20px; height: 45px;" type="tel" data_field_name="get_stock_detail_by_jan" class="form-control" id="jcs_stock_details_by_jan" placeholder="JANコード（13桁）">
								<div class="mobile_code"></div>
								<div class="error_mobile_code"></div>
								<!--scan added to -->
								<button class="btn btn-success hidden-md hidden-lg jan_scaning btn-sm" type="button" onclick="barcodeScanning('janmaster_handy')" style="display: inline-block;"><i class="material-icons">
border_inner
</i></button>
<input type="hidden" data_page="janmaster_handy" data_br_sp_id="" id="get_janCode" value="" name="get_janCode">
								<!--scan added to -->
							</div>
							
						</div>
						<div class="form-group">
							<p id="search_product_name" class="product_name_aria"><span style="color: #999; font-size: 30px;">商品名</span></p>							
						</div>
						<div class="clearfix"></div>
						<div class="form-group" style="margin-bottom: 0">
							<div class="col-md-4 col-xs-12 padding_0">
								<table class="table table-bordered physical_handy_tabls">
									<thead>
										<tr>
		<th style="width: 50px; text-align: center;">棚どうり<br>在庫バラ<br>合計</th>
		<th style="width: 50px; text-align: center;">ケース</th>
		<th style="width: 50px;text-align: center;">ボール</th>
		<th style="width: 50px;text-align: center;">バラ</th>
	</tr>
									</thead>
									<tbody class="physicaltbody">
										<tr>
											<td class="total_inventory_of_stock digits_td" style="vertical-align:middle!important;text-align:center;background:#B3FFB3;"></td>
										<td><input type="tel" case_invent_qty="" class="form-control cmn_num_formt case_invent_qty cmn_physical_cl" data_field_name="case_invent" value="" data_attr_code="" data_attr_row_id="" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon_handy">入数</div><input type="tel" class="form-control cmn_num_formt case_law_qty" value="" readonly></div></td>

										<td><input type="tel" bol_invent_qty="" class="form-control cmn_num_formt bol_invent_qty cmn_physical_cl" value="" data_field_name="bol_invent" data_attr_code="" data_attr_row_id="" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon_handy">入数</div><input type="tel" class="form-control cmn_num_formt bol_law_qty" value="" readonly></div></td>

										<td><input type="tel" unit_invent_qty="" class="form-control cmn_num_formt unit_invent_qty cmn_physical_cl" data_field_name="individual_invent" value="" data_attr_code="" data_attr_row_id="" readonly><div class="input-group rsinput_group" style="display: none;"><div class="input-group-addon rsgrp_adon_handy">入数</div><input type="tel" class="form-control cmn_num_formt sep_law_qty" value="" readonly></div></td>

										</tr>
									</tbody>
								</table>
								<!-- <button stock_item_id="0" class="btn btn-primary update_stock_item_by_jan_by_handy pull-right" style="float:right"> 次の商品へ</button> -->
							</div>
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
@endsection