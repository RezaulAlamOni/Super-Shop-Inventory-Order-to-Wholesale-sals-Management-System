@extends('backend.layouts.master')
@section('title')
<title>Shipment Product List</title>
@endsection

@section('content')

<div class="main-content-container container-fluid px-4">
    <!-- Small Stats Blocks -->
  <div class="row">
      <div class="col-md-offset-2 col-md-8 col-centereds">
                <div class="row">
					<h2 class="titlle shipment_h_title_change handy_page_title" style="text-align: center;margin: 0 auto;">出荷作業伝票
</h2>
					</div>
				<hr>
				<div class="row custom_p_scan">
					<form class="p_scn_form text-right">
						<div class="form-group row">
							<label for="slf_no" class="col-md-2 customlabel col-form-label">出荷番号
</label>
							<div class="col-md-10 customfiled">
								<input type="tel" data_field_name="slf_nos" class="form-control scanner" name="slf_no" id="slf_no" value="" placeholder="">
							</div>
						</div>
						<div class="form-group row">
							<label for="vname" class="col-md-2 customlabel col-form-label">販売先名</label>
							<div class="col-md-10 customfiled">
								<input type="text" class="form-control" customer_id="0" name="cname" id="cname" value="" placeholder="" readonly>
							</div>
						</div>
						<div class="form-group row">
							<label for="cvoucher_no" class="col-md-2 customlabel col-form-label">伝票番号</label>
							<div class="col-md-10 customfiled">
								<input type="text" class="form-control" customer_id="0" name="cvoucher_no" id="cvoucher_no" value="" placeholder="" readonly>
							</div>
						</div>
<div class="shipment_table_area show">
	
						<table class="table shipment_ordr_table table-bordered table-striped">
							<thead>
								<th>商品名</th>
								<th>棚番</th>
								<th>単位</th>
								<th>数量</th>
							</thead>
							<tbody class="shipment_order_item_body">
							
								
							</tbody>
						</table>
						<a href="#" class="btn btn-primary add_customer_order_item_by_voucher show_inline pull-right text-right">検品開始</a>
					</div>
						<div class="shipment_order_form_by_voucher hide">
							<input type="hidden" class="customer_order_id" value="" />
							<input type="hidden" class="customer_id" value="" />
							<input type="hidden" class="totall_row" value="0" />
							<input type="hidden" class="inputs_types" data_stock_case_qty="" data_stock_ball_qty="" data_stock_unit_qty="" value="" />
							<hr>
							<div class="form-group row">
								<label for="jcode" class="col-md-2 customlabel col-form-label">JAN</label>
								<div class="col-md-10 customfiled">
									<input type="tel" data_field_name="jcodes" class="form-control scanner" id="jcode" value="" placeholder="">
								</div>
							</div>
							<div class="form-group row">
								<label for="pname" class="col-md-2 customlabel col-form-label">商品名</label>
								<div class="col-md-10 customfiled">
									<input type="text" class="form-control" id="pname" value="" placeholder="">
								</div>
							</div>
							<div class="form-group row">
								<label for="shipment_quantity" class="col-md-2 customlabel col-form-label">数量</label>
								<div class="col-md-10 customfiled">
									<input type="tel" data_field_name="shipment_quantitys" class="form-control scanner" id="shipment_quantity" value="" placeholder="">
								</div>
							</div>
							<button id="insert_shipment" class="btn btn-primary pull-right shipment_ordr_insertion text-right">完了</button>
						</div>
					</form>
					
				</div>
				
                </div>
  </div>
</div>
@endsection