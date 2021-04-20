@extends('backend.layouts.master')
@section('title')
<title>Product Search Information</title>
@endsection

@section('content')

<div class="main-content-container container-fluid px-4">
    <!-- Small Stats Blocks -->
  <div class="row">
      <div class="col-md-offset-2 col-md-8 col-centereds">
                <div class="row">
					<h2 class="titlle handy_page_title" style="text-align: center;margin: 0 auto;">商品情報検索商品スキャン</h2>
				</div>
				<div class="row custom_p_scan">
					<form class="p_scn_form text-right">

						<div class="form-group row">
							<label for="search_jans" class="col-md-2 customlabel col-form-label">JAN</label>
							<div class="col-md-10 customfiled">
								<input type="tel" data_field_name="stock_check_reck_by_rack" class="form-control scanner" id="search_jan" placeholder="">
							</div>
						</div>
						<div class="stock_item_info_body hide">
						<hr>	
								<div class="form-group row">
									<label for="stock_bin" class="col-md-2 customlabel col-form-label">棚番</label>
									<div class="col-md-10 customfiled">
										<input type="text" class="form-control" id="stock_bin" value="" placeholder="" readonly>
									</div>
								</div>
								<div class="form-group row">
									<label for="jans_jan" class="col-md-2 customlabel col-form-label">JAN</label>
									<div class="col-md-10 customfiled">
										<input type="text" class="form-control" id="jans_jan" value="" placeholder="" readonly>
									</div>
								</div>
								<div class="form-group row">
									<label for="jans_name" class="col-md-2 customlabel col-form-label">商品名</label>
									<div class="col-md-10 customfiled">
										<input type="text" class="form-control" id="jans_name" value="" placeholder="" readonly>
									</div>
								</div>
								<div class="form-group row">
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
												<td class="c_qtys"></td>
											</tr>
											<tr>
												<td>ボール</td>
												<td class="d_b_qtys"></td>
												<td class="b_qtys"></td>
											</tr>
											<tr>
												<td>バラ</td>
												<td class="d_u_qtys"></td>
												<td class="u_qtys"></td>
											</tr>
											
										</tbody>
									</table>
								</div>
							</div>
					</form>
					
				</div>
				
                </div>
  </div>
</div>
@endsection