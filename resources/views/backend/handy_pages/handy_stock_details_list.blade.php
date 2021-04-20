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
						<span class="pull-left"> 商品検索</span>
						<!-- <button id="handy_shipment_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button>&nbsp;-->
						<a href="{{Config::get('app.url').'/android_home'}}" class="btn btn-primary pull-right" style="float:right"> メニュー</a> 
						
					</div>
					<div class="heading_info" style="margin-bottom: 15px;">
					<select name="filter_by_v" class="form-control filter_by_vnames">
						<option value="0">全取引先</option>
						@foreach($vendor_lsit as $val)
						<option value="{{$val->vendor_id}}">{{$val->name}}</option>
						@endforeach

					</select>
					<input type="text" name="filter_by_jcode" class="form-control filter_by_jcodes" value="0" placeholder="JANコード">
					<!-- <select name="filter_by_jcode" class="form-control filter_by_jcodes">
						<option value="0"></option>
						@foreach($jan_list as $val)
						<option value="{{$val->jan}}">{{$val->jan}}</option>
						@endforeach

					</select> -->
						<span class="num_total pull-right text-right" data_unreceived_total="" style="text-align: right;"> 0件</span>
					</div>
					<div class="form-horizontal" id="handy_order_form_list">
						
						<div class="clearfix"></div>

						
						<div class="form-group" style="margin-bottom: 0">
							<div class="col-md-4 col-xs-12 padding_0">
								<div class="tableFixHead">
								<table class="table table-bordered fixed_table physical_handy_tabls">
									<thead>
										<tr>
		<th class="name_to_jan" data_status="0"style="width: 150px; text-align: center;">商品名/JAN</th>
		<th style="width: 50px;text-align: center;">棚番</th>
		<th style="width: 30px;text-align: center;">在庫数</th>
	</tr>
									</thead>
									<tbody class="physicaltbody">

										
										
									</tbody>
								</table>
								</div>
							</div>
						</div>
						<!-- <button id="receive_inventorys_to_handy_recv_screen" class="btn btn-warning pull-right" style="float:right"> 検品開始</button> -->
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