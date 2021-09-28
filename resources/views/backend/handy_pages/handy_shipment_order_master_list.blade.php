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
						<span class="pull-left"> 出荷一覧</span>
						<!-- <button id="handy_shipment_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button>&nbsp;-->
						<a href="{{Config::get('app.url').'/android_home'}}" class="btn btn-primary pull-right" style="float:right"> メニュー</a> 
						
					</div>
					<div class="form-horizontal" id="handy_order_form_list">
						
						<div class="clearfix"></div>
						<div class="form-group" style="margin-bottom: 0">
							<div class="col-md-4 col-xs-12 padding_0">
								<table class="table table-bordered physical_handy_tabls">
									<thead>
										<tr>
		<th style="width: 150px; text-align: center;">商品名</th>
		<th style="width: 50px;text-align: center;">注文タイプ</th>
		<th style="width: 30px;text-align: center;">数量</th>
	</tr>
									</thead>
									<tbody class="physicaltbody">
										@forelse($data as $vl)
										<tr>
											<td>{{$vl->name}}</td>
											<td style="text-align: right;vertical-align:middle !important;">{{$vl->inputs}}</td>
											<td style="text-align: right;vertical-align:middle !important;">{{$vl->total_confirm_quantity}}</td>
										</tr>
										@empty
											<tr><td colspan="3" style="text-align: center;">データ無し</td></tr>
										@endforelse
									</tbody>
								</table>
							</div>
						</div>
						<!-- <a href="{{Config::get('app.url').'/handy_order_shipment'}}" class="btn btn-warning pull-right" style="float:right"> 検収開始</a> -->
						<a href="{{Config::get('app.url').'/handy_order_shipment_scan_sohin'}}" class="btn btn-warning pull-right" style="float:right"> 検収開始</a>
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