@extends('backend.layouts.master')
@section('title')
<title>Handy Product List</title>
@endsection

@section('content')

<div class="main-content-container container-fluid px-4">
    <!-- Small Stats Blocks -->
  <div class="row">
      <div class="col-md-offset-2 col-md-8 col-centereds">
                <div class="row">
					<h2 class="titlle handy_page_title" style="text-align: center;margin: 0 auto;">入荷作業伝票</h2>
					</div>
				<hr>
				<div class="row custom_p_scan">
					<form class="p_scn_form text-right">
						<div class="form-group row">
							<label for="v_no" class="col-md-2 customlabel col-form-label">伝票番号
</label>
							<div class="col-md-10 customfiled">
								<input type="tel" data_field_name="v_numbers" class="form-control scanner" name="v_no" id="v_no" value="" placeholder="">
							</div>
						</div>
						<div class="form-group row">
							<label for="vname" class="col-md-2 customlabel col-form-label">仕入先名</label>
							<div class="col-md-10 customfiled">
								
							<input type="text" class="form-control" name="vname" vendor_id="" id="vname" value="" placeholder="" readonly>
									</div>
						</div>
						<div class="vendor_order_list_area show">
						<table class="table ordr_list_table table-bordered table-striped">
							<thead>
								<th>商品名</th>
								<th>単位</th>
								<th>入数</th>
								<th>数量</th>
							</thead>
							<tbody class="newka_list">
								<?php $i=1;?>
								@foreach ($vendor_order_list as $item)
									<tr>
										<td>{{$item->item_name}}</td>
										<td>{{$item->order_inputs}}</td>
										<td>
											{{$item->inputs}}
										</td>
										<td>{{$item->quantity}}</td>
									</tr>
								@endforeach
								
								
							</tbody>
						</table>
						<a href="#" class="btn btn-primary vendor_arival_add pull-right text-right">検品開始</a>
						</div>
						<div class="vendor_order_arival_form hide">
							<hr>
							<input type="hidden" class="totall_row" value="0">
							<div class="form-group row">
								<label for="vjcode" class="col-md-2 customlabel col-form-label">JAN</label>
								<div class="col-md-10 customfiled">
									<input type="tel" data_field_name="vjcodes" class="form-control scanner" id="vjcode" value="" placeholder="">
								</div>
							</div>
							<div class="form-group row">
								<label for="pname" class="col-md-2 customlabel col-form-label">商品名</label>
								<div class="col-md-10 customfiled">
									<input type="text" class="form-control" id="pname" value="" placeholder="" readonly>
								</div>
							</div>
							<div class="form-group row">
								<label for="c_quantity" class="col-md-2 customlabel col-form-label">数量</label>
								<div class="col-md-10 customfiled">
									<input type="tel" data_field_name="c_quantitys" class="form-control scanner" id="c_quantity" value="" placeholder="" readonly>
								</div>
							</div>
							<div class="form-group row">
								<label for="expire_date" class="col-md-2 customlabel col-form-label">賞味期限</label>
								<div class="col-md-10 customfiled">
									<input type="text"  class="form-control" id="expire_date" value="" placeholder="" readonly>
								</div>
							</div>
							<div class="form-group row">
								<label for="bin" class="col-md-2 customlabel col-form-label">棚番</label>
								<div class="col-md-10 customfiled">
									<input type="tel" data_field_name="bins" class="form-control scanner" id="bin" value="" placeholder="" readonly>
								</div>
							</div>
							<button class="btn btn-primary vendor_arival_insert pull-right text-right">完了</button>
							</form>
						</div>
					</form>
					
				</div>
				
                </div>
  </div>
</div>
@endsection