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
                    <span class="pull-left"> 入荷</span>
                    <a href="{{Config::get('app.url').'/handy_order_receive_list'}}" class="btn btn-success pull-right"
                       style="float:right"> 入荷一覧</a>
                </div>
                <div class="form-horizontal" id="handy_order_form">
                    <input type="hidden" id="product_category" class="product_category" value="1" name="">
                    <input type="hidden" class="v_ids_v" value="0" name="supplier_id">
                    <input type="hidden" id="set_jan_valu_in_hidden" class="set_jan_valu_in_hidden" value=""
                           name="set_jan_valu_in_hidden">

                    <div class="form-group">
                        <div class="col-md-4 col-xs-12 scan_btn">
                            <input style="color: #000; font-size: 20px; height: 45px;" type="tel"
                                   data_field_name="reck_no" class="form-control show " maxlength="3" id="reck_code"
                                   placeholder="スキャン仮置き棚番号(3桁）">
                            <input style="color: #000; font-size: 20px; height: 45px;" type="tel"
                                   data_field_name="get_handy_receive_order_jan" class="form-control"
                                   id="vendor_master_jancode" placeholder="JANコード（13桁）">

                            <!--scan added to -->
                            <button class="btn btn-success hidden-md hidden-lg jan_scaning btn-sm" type="button"
                                    onclick="barcodeScanning('janmaster_handy')" style="display: inline-block;"><i
                                    class="material-icons">
                                    border_inner
                                </i></button>
                            <input type="hidden" data_page="janmaster_handy" data_br_sp_id="" id="get_janCode" value=""
                                   name="get_janCode">
                            <input type="hidden" class="order_inputs_quantitys" value="0" data_inputs_type=""
                                   vendor_order_detail_id="" vendor_order_id="" voucher_number="" vendor_item_id=""
                                   vendor_id="">
                            <!--scan added to -->
                        </div>

                    </div>
                    <div class="form-group">
                        <p id="search_product_name" class="product_name_aria"><span
                                style="color: #999; font-size: 30px;">商品名</span></p>
                    </div>
                    <div class="clearfix"></div>
                    <div class="form-group" style="margin-bottom: 0">
                        <div class="col-6 text-center pullleft_custom_no_padding">
                            <h4 class="buttongroup_top_title">予定数量</h4>
                            <div class="btn-group-vertical customvertical_btn">
                                <!-- <button type="button" class="btn btn-default custom_border_color">1</button> -->
                                <input type="tel" value="" class="form-control order_quantity" readonly>
                                <button type="button" input_state="1"
                                        class="btn change_config_recevied common_state btn-secondary">ケース
                                </button>
                            </div>
                        </div>
                        <div class="col-6 text-center pullleft_custom_no_padding">
                            <h4 class="buttongroup_top_title">入荷数量</h4>
                            <div class="btn-group-vertical customvertical_btn">
                                <!-- <button type="button" class="btn btn-default custom_border_color"></button> -->
                                <input type="tel" data_field_name="receive_order_arrival" value=""
                                       class="form-control receive_quantity">
                                <button type="button" class="btn common_state arrival_state_conf btn-secondary">ケース
                                </button>
                            </div>
                        </div>
                        <!--<div class="col-md-4 col-xs-12 padding_0">
                            <table class="table table-bordered physical_handy_tabls">
                                <thead>
                                    <tr>
    <th style="width: 50px; text-align: center;">ケース</th>
    <th style="width: 50px;text-align: center;">ボール</th>
    <th style="width: 50px;text-align: center;">バラ</th>
</tr>
                                </thead>
                                <tbody class="physicaltbody">
                                    <tr>
                                    <td><input type="tel" class="form-control cmn_num_formt case_invent_order scanner cmn_physical_cl" data_field_name="case_invent_receiveorder_qty" value="" data_attr_code="" data_attr_row_id="" ><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon_handy">入数</div><input type="tel" class="form-control cmn_num_formt case_law_qty" value="" readonly></div></td>

                                    <td><input type="tel" class="form-control cmn_num_formt bol_invent_order scanner cmn_physical_cl" value="" data_field_name="bol_invent_receiveorder_qty" data_attr_code="" data_attr_row_id="" ><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon_handy">入数</div><input type="tel" class="form-control cmn_num_formt bol_law_qty" value="" readonly></div></td>

                                    <td><input type="tel" class="form-control cmn_num_formt individual_invent_order scanner cmn_physical_cl" value="" data_field_name="individual_invent_receiveorder_qty"  data_attr_code="" data_attr_row_id=""><div class="input-group rsinput_group" style="display: none;"><div class="input-group-addon rsgrp_adon_handy">入数</div><input type="tel" class="form-control cmn_num_formt sep_law_qty" value="" readonly></div></td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>-->
                    </div>
                    <div class="form-group row">
                        <?php
                        $after_one_month = date("Y-m-d", strtotime('+1 months'));
                        $after_2weeks = date("Y/m/d", strtotime('+14 days'));
                        ?>
                        <label class="col-4 cstm_cl_label col-form-label">
                            消費期限:
                        </label>
                        <div class="col-6 padding_0">
                            <input style="color: #000; font-size: 20px; height: 40px;" type="text"
                                   class="form-control note_1" value="{{$after_2weeks}}" id="expire_date"
                                   placeholder="賞味期間" readonly>
                        </div>
                        <div class="col-2 cstm_cl_label_icon">
                            <i class="fa fa-2x fa-calendar " aria-hidden="true"></i>
                        </div>
                    </div>
                    <!--<div class="form-group row">
                    <label class="col-4 col-form-label cstm_cl_label">
                    棚番号:
                        </label>
                        <div class="col-5 padding_0">
                            <input style="color: #000; font-size: 20px; height: 40px;" data_field_name="reck_no" type="number" class="form-control show " id="reck_code" maxlength="4" placeholder="">
                            <select name="reck_number" class="form-control hide reck_number"></select>
                        </div>
                        <div class="col-3 cstm_cl_label_icon">
                        <button rect_status="0" class="btn btn-info  change_rack">新規</button>
                        </div>
                    </div>-->
                    <button id="vendor_arival_insert_recv_order" class="btn btn-primary pull-right" style="float:right">
                        次の商品へ
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 handdy_error hide hide_enter_outside close_aria"
         style="position: fixed; bottom: 0px; right: 0px; padding: 4px;">
        <div class="panel panel-danger"
             style="margin-bottom: 2px; border: solid 2px red; border-top: solid 5px red; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
            <div class="panel-body" style="padding:10px">
                <p style="margin: 0; font-size: 20px;" class="text-danger handy_error_msg text-center"></p>
            </div>
        </div>
    </div>
@endsection
