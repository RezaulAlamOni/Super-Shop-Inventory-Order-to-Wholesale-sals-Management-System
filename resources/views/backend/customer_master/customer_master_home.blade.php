@extends('backend.layouts.master')
@section('title')
<title>Customer Master</title>
@endsection

@section('content')
@include('backend.flash_message.flash_message')
<div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-4">
        <div class="col-md-3">
        <h2><input type="text" readonly value="" class="supplier_name_input" name="">&nbsp;&nbsp;&nbsp;殿 <div class="btn-group jcs_grp">
                  <!-- <button type="button" class="btn btn-success">販売先マスター</button>
                  <button type="button" class="btn btn-default deflt_design"><span class="ext_title">メンテ画面</span></button> -->
                  <!-- <button type="button" class="btn btn-info"><a class="page_manage" style="color:#fff;text-decoration:none" href="{{Config::get('app.url').'/vendor_master'}}">仕入先マスター</a></button> -->
                  
                </div></h2>
                <input type="hidden" value="0" class="c_ids_v">
        </div>
        <div class="col-md-4 text-center">
            <h2 class="master_page_titles text-center">販売先マスターメンテ画面</h2>
        </div>
        <div class="col-md-5 text-right">
        <a href="{{Config::get('app.url').'/vendor_master'}}" class="btn btn-primary  btn-lg pull-right">仕入先マスター</a>
        <button class="btn btn-danger deletes_customer_item  btn-lg pull-right" customer_item_delete_enable="0">行削除</button>
        <a href="javascript:history.back();" class="btn btn-info  btn-lg pull-right">戻る</a>
        <a href="{{Config::get('app.url').'/home'}}" class="btn btn-danger  btn-lg pull-right goto_homepages">業務選択</a>
        
        </div>
    </div>
    <!-- End Page Header -->
    <!-- Small Stats Blocks -->
    <div class="row">
        <div id="flash_message"></div>
        
    </div>
  
    <div class="row">
        <div class="col-md-12 estimate_product_table_delivery">
            <table class="table table-striped table-bordered product-table" id="product_table_delivery">
                <thead>
                    <tr>
                    <th rowspan="2" width="15%" nowrap="nowrap" style="vertical-align: middle; text-align: center;" colspan="2">
						<input autofocus type="tel" style="ime-mode: disabled;" name="jancode" id="jancode" placeholder="JANコード（13桁）" class="form-control customer_ins_jancode jancode">
						</th>
						<th rowspan="2" width="20%" nowrap style="vertical-align: middle; text-align: center;" >品名・メーカー・規格</th>
						<th rowspan="2" width="5%" nowrap="nowrap" style="text-align: center;">区分</th>
						<th nowrap colspan="3" width="15%" style="text-align: center;">入数</th>
						<th nowrap style="text-align: center;" rowspan="2" width="150px">a<br>原価<br>コスト</th>
						<th nowrap style="text-align: center;" width="150px" rowspan="2">b<br>スパー<br>売価<br>セール</th>
						<th nowrap style="text-align: center;" width="150px" rowspan="2">ｃ<br>粗利</th>
						<th nowrap style="text-align: center;" width="80px" rowspan="2">％</th>
						<th nowrap style="text-align: center;" rowspan="2">備考</th>
					</tr>
					<tr>
						<th nowrap style="text-align: center;" width="5%">ケース</th>
						<th nowrap style="text-align: center;" width="5%">ボール</th>
							<th nowrap style="text-align: center;" width="5%">バラ</th>
                    </tr>
                </thead>
                <tbody id="customer_item_table_bodys" class="customer_item_table_body">
                   
                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection