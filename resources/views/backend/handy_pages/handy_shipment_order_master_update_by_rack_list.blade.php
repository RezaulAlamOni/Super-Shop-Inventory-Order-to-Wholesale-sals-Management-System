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
						<span class="pull-left"> 出荷</span>
						<!-- <button id="handy_shipment_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button>&nbsp; -->
						<a href="{{Config::get('app.url').'/handy_order_shipment_list'}}" class="btn btn-info pull-right" style="float:right"> 出荷一覧</a>
						
					</div>
					<div class="form-horizontal" id="handy_order_form">
						<input type="hidden" id="product_category" class="product_category" value="1" name="">
						<input type="hidden" class="c_ids_v" value="0" name="supplier_id">
						<input type="hidden" class="order_inputs_quantitys" customer_shipment_id="{{$result->customer_shipment_id}}" value="{{$result->total_confirm_quantity}}" data_inputs_type="{{$result->inputs}}" customer_order_detail_id="{{$result->customer_order_detail_id}}" customer_order_id="{{$result->customer_order_id}}" voucher_number="" customer_item_id="{{$result->customer_item_id}}" customer_id="{{$result->customer_id}}">
						<input type="hidden" id="set_jan_valu_in_hidden" class="set_jan_valu_in_hidden" value="" name="set_jan_valu_in_hidden">

						<div class="form-group">
							<div class="col-md-4 col-xs-12 scan_btn">
							
								<input type="hidden" class="form-control" value="{{$jan}}" id="shipment_master_jancode" placeholder="JANコード（13桁）">
								<!-- <input style="color: #000; font-size: 20px; height: 45px;" type="tel" data_field_name="get_handy_shipment_order_jan" class="form-control" id="shipment_master_jancode" placeholder="JANコード（13桁）"> -->
								<input style="color: #000; font-size: 20px; height: 40px;" data_field_name="reck_no" type="number" class="form-control note_2 " placeholder="棚番号">
								<!-- <select class="form-control note_2 all_rack_list_item" style="font-size:24px;height:45px;">
									@if($all_rack)
										@foreach($all_rack as $rack)
										<option value="{{$rack->rack_number}}">{{$rack->rack_number}}</option>
										@endforeach
									@endif
								</select> -->
							</div>
							
						</div>
						<div class="form-group">
							<p id="search_product_name" class="product_name_aria"><span style="color: #999; font-size: 30px;">{{$result->name}}</span></p>							
						</div>
						<div class="clearfix"></div>
						<div class="form-group" style="margin-bottom: 0">
							<div class="col-6 text-center pullleft_custom_no_padding">
								<h4 class="buttongroup_top_title">予定数量</h4>
							<div class="btn-group-vertical customvertical_btn">
							<!-- <button type="button" class="btn btn-default custom_border_color">1</button> -->
							<input type="tel" value="{{$result->total_confirm_quantity}}" class="form-control order_quantity" readonly>
  <button type="button" input_state="1" class="btn change_config_recevied common_state btn-secondary">{{$result->inputs}}</button>
</div>
							</div>
							<div class="col-6 text-center pullleft_custom_no_padding">
							<h4 class="buttongroup_top_title">出荷数量</h4>
							<div class="btn-group-vertical customvertical_btn">
							<!-- <button type="button" class="btn btn-default custom_border_color"></button> -->
							<input type="tel" data_field_name="receive_order_arrival" value="" class="form-control receive_quantity">
  <button type="button" class="btn common_state arrival_state_conf btn-secondary">{{$result->inputs}}</button>
</div>
							</div>
</div>
<div class="form-group row">
						
							<label class="col-4 cstm_cl_label col-form-label">
							消費期限:
							</label>
							<div class="col-8">
								<input style="color: #000; font-size: 20px; height: 40px;" type="text" class="form-control shipment_note_1 note_1" value="" placeholder="">
							</div>						
						</div>
					
						<button id="handy_shipment_item_insert" class="btn btn-primary pull-right" style="float:right"> 次の商品へ</button>
						
						
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