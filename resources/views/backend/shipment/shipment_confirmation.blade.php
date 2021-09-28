@extends('backend.layouts.master')
@section('title')
<title>Shipment Page</title>
@endsection

@section('content')
@include('backend.flash_message.flash_message')
<div id="m_confirmation_message"></div>
<div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
   
    <div class="page-header row no-gutters py-1">
         <div class="col-md-3"></div>
        <div class="col-md-6 col-sm-6 text-center text-sm-center mb-0">
            <!-- <span class="text-uppercase page-subtitle">Dashboard</span>  -->
            <h3 class="page-title shipment_confirmation_page">{{$title}}</h3>
        </div>
        <div class="col-md-3"></div>
    </div>
    
    <!-- End Page Header -->
    <!-- Small Stats Blocks -->
    <div class="row">

    </div>
    <br>
    <div class="row">
    <div class="col-md-4">
    <form class="menual_order_forms">
    <div class="form-group row">
    <label for="slct_cust" class="col-sm-4 col-form-label">販売先</label>
    <div class="col-sm-8">
      <select name="select_customer" id="slct_cust" class="form-control select_customer">
        <option value="">販売先選択</option>
        @foreach($customer_list as $customer)
            <option value="{{$customer->customer_id}}">{{$customer->name}}</option>
        @endforeach
      </select>
    </div>
  </div>
  <div class="form-group row">
    <label for="slct_shop" class="col-sm-4 col-form-label">店舗</label>
    <div class="col-sm-8">
    <select name="select_shop" id="slct_shop" class="form-control select_shop">
      </select>
    </div>
  </div>
  <div class="form-group row">
    <label for="voucher_num" class="col-sm-4 col-form-label">伝票番号</label>
    <div class="col-sm-8">
      <input type="tel" class="form-control voucher_m_number" id="voucher_num" placeholder="">
    </div>
  </div>
  <div class="form-group row">
    <label for="shipment_conf_date" class="col-sm-4 col-form-label">納品日</label>
    <div class="col-sm-8">
      <input type="tel" class="form-control shipment_conf_date" id="shipment_conf_date" placeholder="">
      <i class="material-icons clear_date">
clear
</i>
      <br>
      <button class="btn btn-success pull-right filter_confirmation_data">検索</button>
    </div>
    
  </div>
</form>
    </div>
        <div class="col-md-12 menual_order_receive_table">
            <table class="table table-striped table-bordered" id="menual_order_tble">
                <thead>
                    <tr>
                        <th rowspan="2">販売先</th>
                        <th rowspan="2">店舗</th>
                        <th rowspan="2">伝票番号</th>
                        <th rowspan="2">納品日</th>
                        <th rowspan="2">確定</th>
                        <th rowspan="2">JANコード</th>
                        <th rowspan="2">商品名</th>
                        <th rowspan="2">ケース入数</th>
                        <th rowspan="2">ボール入数</th>
                        <th colspan="3">在庫数量</th>
                        <th rowspan="2">納品単位</th>
                        <th rowspan="2">発注数量</th>
                        <th rowspan="2">納品数量</th>
                        
                    </tr>
                    <tr><th>ケース</th>
                        <th>ボール</th>
                        <th>バラ</th></tr>
                </thead>
                <tbody class="shipment_confirmation_tble">

                </tbody>
            </table>
            <div class="pull-right text-right">
            <!-- <button type="button" class="btn btn-primary add_new_rows">商品追加</button> -->
<!-- <button type="button" class="btn btn-success save_all_shipmentconfirmation_order">完了</button> -->
            </div>
        </div>
    </div>

</div>
@endsection