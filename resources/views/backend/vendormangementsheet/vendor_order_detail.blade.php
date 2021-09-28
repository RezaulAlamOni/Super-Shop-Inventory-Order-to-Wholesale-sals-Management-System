@extends('backend.layouts.master')
@section('title')
<title>Shipment Management Sheet</title>
@endsection

@section('content')
@include('backend.flash_message.flash_message')
<div id="managementshipment_message"></div>
<iframe id="my_iframe" type="application/pdf" style="display:none;"></iframe>
<div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-1">
        
        <div class="col-md-5 col-sm-5 mb-0">
            <div class="jcs_rcv_title divs_pages">
            <h2 class="new_page_title">買掛明細画面<span class="jcs_splyr">{{$shipment_items_data[0]->name}}</span><span class="default_byr_syplr">殿</span></h2>
            <input type="number" name="jn_codes" value="" placeholder="JANまたはインストア入力" class="form-control jcs_jan_code">
   
            <input type="hidden" class="form-control vendor_arrival_date" id="vendor_start_date" name="vendor_start_date" value="">
            <input type="hidden" class="form-control vendor_arrival_date" id="vendor_end_date" name="vendor_end_date"  value="">
            <span class="jcs_splyr_mngesmnet_date_shows"></span>
        </div>
        <input type="hidden" value="0" class="v_ids_v">
        </div>
        <div class="col-md-3 col-sm-3 mb-0">
	        <!-- <span style="font-size:16px;">残高 a+増加 b-減少 c=新残 d</span> -->
            <span class="default_byr_syplr_mangentsht">合計</span><span class="jcs_splyr_mngesmnet digits_td">{{$shipment_items_data[0]->invoice_amount}}</span><span class="default_byr_syplr_mangentsht">円</span>	
    	</div>
        
        <div class="col-md-4 col-sm-4 mb-0">
       
        <ul class="top_page_btn_list_jacos list-inline text-right">
			<li><a href="javascript:window.history.go(-1)" class="btn btn-info btn-lg clcikstates">戻る</a></li>
            <li><a href="{{Config::get('app.url').'/home'}}" class="btn btn-lg btn-danger">業務選択</a></li>
		</ul>
        
        </div>
    </div>
    <!-- End Page Header -->
    <!-- Small Stats Blocks -->
    <div class="row">
        <div class="col-md-12">
        <div id="inventory_perchase_qty_mangements_shets_receive" style="margin:0">
<table class="table table-bordered jcs_stock_qty_table table-freeze-multi" data-scroll-height="550" data-cols-number="">
	<colgroup>
		<col>
		<col>
		<col>
		<col>
		<col>
		<col>
		<col>
		<col>
	</colgroup>
	<thead class="jcs_stock_header1">
	<tr>
		<th style="width: 120px">入力日</th>
		<th style="width: 150px">品名</th>
		<th style="width: 100px;">数量 a</th>
		<th style="width: 100px;">単価 b</th>
		<th style="width: 100px;">返品額</th>
		<th style="width: 100px;">金額 c</th>
		<th style="width: 120px;vertical-align: middle;">JAN</th>
		<th style="width: 150px;vertical-align: middle;">備考</th>
	</tr>
	</thead>
                <tbody id="shipment_table_dataddd" class="shipment_itemdata_table">
                @if($shipment_items_data)
                    @foreach($shipment_items_data as $val)
                   <tr>
                   <td>{{$val->invoice_date}}</td>
                   <td>{{$val->jan_name}}</td>
                   <td class="digits_td">{{$val->t_qty}}</td>
                   <td class="cst_price text-right" >{{$val->unit_cost_price}}</td>
                   <td></td>
                   <td class="digits_td">{{$val->invoice_amount}}</td>
                   <td>{{$val->jan}}</td>
                   <td></td>
                   </tr>
                   @endforeach
                @endif
                </tbody>
            </table>
            </div>
        </div>
    </div>

</div>
<!-- payment show list modal -->
<div class="modal fade" id="payment_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-12"><div id="payment_message_shown"></div></div>
                    <div class="col-sm-12 customer_heading">
                        <h3 class="text-center">出金情報設定</h3>
                        
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-sm-12 text-center">
                    伝票番号:<span data_c_v_id = "0" data_p_amount="0" data_o_id="0" data_p_type="" class="payment_voucher"></span>
                    </div>
                    <div class="clearfix"></div>
                    <div id="payment_message_success"></div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyrslisst_overflow">
                    <table class="table table-striped table-bordered buyrslisst_overflow">
                        <thead>
                            <tr>
                                <th>出金日</th>
                                <th>出金額</th>
                                <th>削除</th>
                            </tr>
                        </thead>
                        <tbody class="payment_table_dataddd">
                           
                        </tbody>
                    </table>
                    <div class="">
                    <form class="form-inline">
  <label for="p_amount" class="mr-sm-2">出金額入力:</label>
  <input type="number" class="form-control mb-2 mr-sm-2" id="p_amount">
  <input type="hidden" class="already_given_total" value="0">
  <button type="submit" class="btn btn-primary mb-2 insert_payment">出金</button>
</form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{__('messages.close')}}</button>
            </div>
        </div>
    </div>
</div>
<!--show payment modal-->
@endsection
