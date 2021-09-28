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
                    <span class="pull-left"> 棚・入庫</span>
                    <!-- <button id="handy_vendor_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button> -->
                    <a href="{{Config::get('app.url').'/android_home'}}" class="btn btn-success pull-right"
                       style="float:right"> メニュー</a>
                </div>
                <div class="form-horizontal" id="handy_order_form">
                    <input type="hidden" id="product_category" class="product_category" value="1" name="">
                    <input type="hidden" class="v_ids_v" value="0" name="supplier_id">
                    <input type="hidden" id="set_jan_valu_in_hidden" class="set_jan_valu_in_hidden" value=""
                           name="set_jan_valu_in_hidden">

                    <div class="form-group" style="margin-bottom: 5px !important; margin-top: 5px; ">
                        <p id="search_product_name" class="product_name_aria"><span
                                style="color: #999; font-size: 20px;">{{$result[0]->item_name}}</span></p>
                    </div>
                    <div class="">
                        <div class="col-md-4 col-xs-12 scan_btn">
                        <!--<select class="form-control @if($all_rack) show @else hide @endif select_a_rack all_rack_list_item" style="font-size:24px;height:45px;float:left;width:350px;">
									@if($all_rack)
                            <option value="">棚番号を選択してください</option>
@foreach($all_rack as $rack)
                                <option value="{{$rack->rack_number}}">{{$rack->rack_number}}</option>
										@endforeach
                        @endif
                            </select>
                        <input type="tel" style="color: #000; font-size: 20px; height: 45px;float:left;width:350px;" class="form-control @if($all_rack) hide @else show @endif" id="scan_by_shelf_number" minlength="4" placeholder="スキャン入庫棚番号（4桁）">
							<button data_status="@if($all_rack) 1 @else 2 @endif" class="btn btn-primary change_rack_type" style="height:45px;">@if($all_rack) 新しい棚番号 @else 棚番号を選択 @endif</button>-->
                            <input type="hidden" class="form-control" id="jcs_stock_details_by_jan" value="{{$jan}}">

                        </div>

                    </div>

                    <div class="form-group" style="margin-bottom: 0">
                        <div class="col-md-4 col-xs-12 padding_0">
                            <table class="table table-bordered physical_handy_tabls">
                                <thead>
                                <tr>
                                    <th style="width: 50px; text-align: center;padding: 05px">ケース
                                        入数 24
                                    </th>
                                    <th style="width: 50px; text-align: center;padding: 05px">ボール 入数 6

                                    </th>
                                    <th style="width: 50px; text-align: center;padding: 05px;">バラ</th>
                                    <th style="width: 50px; text-align: center;padding: 05px">入庫
                                        棚no
                                    </th>
                                </tr>
                                </thead>
                                <tbody class="physicaltbody">
                                @if($result)
                                    <?php $i = 0;
                                    $j = 0;
                                    $total_rwspan = count($result);
                                    $total_rack_stock = 0;
                                    $total_jaiko_stock = 0;
                                    ?>

                                    @foreach($result as $value)
                                        @if($value->stock_item_id!='' && strlen($value->rack_number)=='3')
                                            <?php
                                            $total_rack_stock = ($value->case_quantity * $value->case_inputs) + ($value->ball_quantity * $value->ball_inputs) + $value->unit_quantity;
                                            $total_jaiko_stock += $total_rack_stock;
                                            ?>
                                            <tr>
                                                {{--                                                @if($loop->first)--}}
                                                {{--                                                    <td style="vertical-align: middle !important;background: rgb(179, 255, 179);"--}}
                                                {{--                                                        rowspan="{{$total_rwspan}}"--}}
                                                {{--                                                        class="total_stock_jaiko jaiko_{{$value->stock_item_id}}">{{$total_jaikos_stock}}</td>--}}
                                                {{--                                                @endif--}}

                                                {{--                                                <td style="vertical-align: middle !important;"--}}
                                                {{--                                                    class="total_stock_rack rack_number_{{$value->stock_item_id}}">{{$total_rack_stock}}</td>--}}
                                                <td><input type="tel" case_invent_qty=""
                                                           class="form-control cmn_num_formt case_invent_qty_rack cmn_physical_cl"
                                                           data_field_name="case_invent"
                                                           id="case{{ $i }}"
                                                           value="{{$value->case_quantity}}"
                                                           data_attr_v_item_id="{{$value->vendor_item_id}}"
                                                           data_attr_v_id="{{$value->vendor_id}}"
                                                           data_attr_rack_number="{{$value->rack_number}}"
                                                           data_attr_row_id="{{$value->stock_item_id}}" readonly>
                                                    {{--                                                    <div class="input-group rsinput_group">--}}
                                                    {{--                                                        <div class="input-group-addon rsgrp_adon_handy">入数</div>--}}
                                                    {{--                                                        <input type="tel"--}}
                                                    {{--                                                               class="form-control cmn_num_formt case_law_qty"--}}
                                                    {{--                                                               value="{{$value->case_inputs}}" readonly></div>--}}
                                                </td>

                                                <td><input type="tel" bol_invent_qty=""
                                                           class="form-control cmn_num_formt bol_invent_qty_rack cmn_physical_cl"
                                                           value="{{$value->ball_quantity}}"
                                                           id="bol{{ $i }}"
                                                           data_field_name="bol_invent"
                                                           data_attr_v_item_id="{{$value->vendor_item_id}}"
                                                           data_attr_v_id="{{$value->vendor_id}}"
                                                           data_attr_rack_number="{{$value->rack_number}}"
                                                           data_attr_row_id="{{$value->stock_item_id}}" readonly>
                                                    {{--                                                    <div class="input-group rsinput_group">--}}
                                                    {{--                                                        <div class="input-group-addon rsgrp_adon_handy">入数</div>--}}
                                                    {{--                                                        <input type="tel" class="form-control cmn_num_formt bol_law_qty"--}}
                                                    {{--                                                               value="{{$value->ball_inputs}}" readonly></div>--}}
                                                </td>

                                                <td><input type="tel" unit_invent_qty=""
                                                           class="form-control cmn_num_formt unit_invent_qty_rack cmn_physical_cl"
                                                           data_field_name="individual_invent"
                                                           value="{{$value->unit_quantity}}"
                                                           id="bara{{ $i }}"
                                                           data_attr_v_item_id="{{$value->vendor_item_id}}"
                                                           data_attr_v_id="{{$value->vendor_id}}"
                                                           data_attr_rack_number="{{$value->rack_number}}"
                                                           data_attr_row_id="{{$value->stock_item_id}}" readonly>
                                                    {{--                                                    <div class="input-group rsinput_group" style="display: none;">--}}
                                                    {{--                                                        <div class="input-group-addon rsgrp_adon_handy">入数</div>--}}
                                                    {{--                                                        <input type="tel" class="form-control cmn_num_formt sep_law_qty"--}}
                                                    {{--                                                               value="" readonly></div>--}}
                                                </td>
                                                <td style="vertical-align: middle !important;text-align:center"><input
                                                        type="tel"
                                                        class="form-control @if(strlen($value->rack_number)=='3') update_rack_code_exec @endif "
                                                        value="{{strlen($value->rack_number) == 3 ? ( $last_rack ? $last_rack : $value->rack_number) : $value->rack_number}}"
                                                        data_existing_rack="{{$value->rack_number}}"
                                                        data_index="{{$i}}" data_j="{{$j}}"
                                                        @if(strlen($value->rack_number)=='3') id="rack{{$j}}" @endif
                                                        style="border-radius:0;text-align:center;"
                                                        @if(strlen($value->rack_number)=='3')  @else readonly @endif>
                                                </td>
                                            </tr>
                                            <?php $i++; if (strlen($value->rack_number) == '3') {
                                                $j++;
                                            } ?>

                                        @endif
                                    @endforeach
                                @endif
                                @if($i <= 0)
                                    <tr>
                                        <td style="font-size:16px;background: #f4c8c8;text-align:center;vertical-align:0;"
                                            colspan="6">
                                            データが見つかりませんでした。
                                        </td>
                                    </tr>
                                @endif

                                </tbody>
                            </table>
                            <!-- <button stock_item_id="0" class="btn btn-primary update_stock_item_by_jan_by_handy pull-right" style="float:right"> 次の商品へ</button> -->
                        <!--{{Config::get('app.url').'/inventoryentrybyhandy'}}-->
                            {{--                            <a href="{{Config::get('app.url').'/handy_stock_update_scan_product'}}"--}}
                            {{--                               class="btn btn-primary pull-right" style="float:right"> 次の商品へ</a>--}}
                            <a href="javascript:void(0)" onclick="updateTemporaryTana()"
                               class="btn btn-primary pull-right custom-btn" id="tana-erako-button"
                               style="float:right;margin-top: -10px"> 次の商品へ</a>

                        </div>
                    </div>


                    <div class="" style="width: 100%;">
                        <div class="input-group mb-2"
                             style="border: 0.5px solid #b8b7b7;border-radius: 5px;margin-top: -10px;width: 48%; height: 44px;">
                            <div class="input-group-prepend"
                                 style=" color: black;    /* padding: 0px 0px; */">
                                <div class="input-group-text"
                                     style="color: black;font-weight: bold;padding: 0 5px;font-size: 16px;">在庫合計
                                </div>
                            </div>
                            <input type="tel" class="total_stock_jaiko_new jaiko_ form-control" readonly=""
                                   value="{{$total_jaikos_stock ? $total_jaikos_stock : 0}}"
                                   style="padding: 5px 5px;font-size: 16px;">
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    {{--                    <div class="form-group" style="    margin-bottom: 8px;margin-top: 0px  ">--}}
                    {{--                        <p id="search_product_name" class="product_name_aria"><span--}}
                    {{--                                style="color: #999; font-size: 20px;">{{$result[0]->item_name}}</span></p>--}}
                    {{--                    </div>--}}
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

    <div class="jn nav_disp" style="z-index: 9999;width: 270px; right: 15px; bottom: 15px;" id="handy-navi">
        <div class="card card-warning jn_old_popup " style="padding: 6px">

            <div class="card-body">
                <a class="btn btn-light float-right" href="javascript:void(0)" onclick="$('#handy-navi').hide()">戻る</a>
                <ol id="handy-navi-body">
                    <li>棚番スキャンして<br>ください。</li>
                </ol>

            </div>
        </div>
    </div>
@endsection
