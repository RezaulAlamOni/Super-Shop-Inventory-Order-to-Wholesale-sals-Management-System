@extends('backend.layouts.master')
@section('title')
<title>Shipment Page</title>
@endsection

@section('content')
@include('backend.flash_message.flash_message')
<div id="shipment_js_message"></div>
<div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-1">
        <div class="col-md-3">
             <div class="btn-group custom_grp_btns mb-3" role="group" aria-label="Basic example">
            <!-- <button type="button" class="btn btn-secondary border_right_d">倉庫</button> -->
            <button type="button" class="btn btn-secondary warehouse_list_show">全倉庫</button>
        </div>
        <div class="input-group">
            <div class="input-group-prepend"><span class="input-group-text">JANコード検索</span></div> <input type="text" value="" class="form-control get_jan_info_warehouse">
        </div>
        </div>
        <div class="col-md-6 col-sm-6 text-center text-sm-center mb-0">
            <!-- <span class="text-uppercase page-subtitle">Dashboard</span>  -->
            <h3 class="page-title warehouse_page_title">倉庫</h3>
        </div>
        <div class="col-md-3"></div>
    </div>
    <!-- End Page Header -->
    <!-- Small Stats Blocks -->
    <div class="row">
        <div class="col-md-4">
          <!--  <div class="btn-group custom_grp_btns mb-3" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary border_right_d">倉庫</button>
            <button type="button" class="btn btn-secondary warehouse_list_show">全倉庫</button>
        </div>
        <div class="input-group">
            <div class="input-group-prepend"><span class="input-group-text">JANコード検索</span></div> <input type="text" value="" class="form-control get_jan_info_warehouse">
        </div> -->
            
        </div>
        <div class="col-md-2"></div>

        <div class="col-md-6 text-right">
            
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 order_receive_table">
            <table class="table table-striped table-bordered product-table" id="shipment_table_data">
                <thead>
                    <tr>
                        <th rowspan="2" width="10%" style="vertical-align: middle; text-align: center;">倉庫名</th>
                        <th rowspan="2" width="10%" style="vertical-align: middle; text-align: center;">品名</th>
                        
                        <th colspan="3" width="20%" class="table_border_2px" nowrap="nowrap"
                            style="text-align: center;">在庫数</th>

                        <th rowspan="2" width="5%" style="vertical-align: middle; text-align: center;">棚No</th>
                        <th rowspan="2" width="5%" style="vertical-align: middle; text-align: center;">JAN</th>
                        
                    </tr>
                    <tr>
                        
                        <th style="text-align: center;">ケース</th>
                        <th style="text-align: center;">ボール</th>
                        <th style="text-align: center;">バラ</th>

                    </tr>

                </thead>
                <tbody id="" class="ware_house_body">
                 

                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection