<div class="form-horizontal" id="handy_order_form">
    <input type="hidden" id="product_category" class="product_category" value="1" name="">
    <input type="hidden" class="v_ids_v" value="0" name="supplier_id">
    <input type="hidden" id="set_jan_valu_in_hidden" class="set_jan_valu_in_hidden" value=""
           name="set_jan_valu_in_hidden">

    <div class="form-group">
        <div class="col-md-4 col-xs-12 scan_btn">
            <!-- <input style="color: #000; font-size: 20px; height: 45px;" type="tel" data_field_name="get_stock_detail_by_jan" class="form-control scanner" id="jcs_stock_details_by_jan" placeholder="JANコード（13桁）"> -->
            <div class="mobile_code"></div>
            <div class="error_mobile_code"></div>
            <!--scan added to -->
            <button class="btn btn-success hidden-md hidden-lg jan_scaning btn-sm" type="button"
                    onclick="barcodeScanning('janmaster_handy')" style="display: inline-block;"><i
                    class="material-icons">
                    border_inner
                </i></button>
            <input type="hidden" data_page="janmaster_handy" data_br_sp_id="" id="get_janCode" value=""
                   name="get_janCode">
            <!--scan added to -->
        </div>

    </div>

    <div class="form-group" style="border-radius: 5px;margin-bottom: 1px;margin-top: 0px">
        @if($result)
            <p id="search_product_name" class="product_name_aria"><span
                    style="color: #999; font-size: 20px;">{{$result[0]->item_name}}</span></p>
        @endif
    </div>

    <div class="form-group" style="margin-bottom: 0">
        <div class="col-md-12 col-xs-12 padding_0">
            <table class="table table-bordered physical_handy_tabls">
                <thead>
                <tr>
                    <th style="width: 50px; text-align: center;padding: 05px">ケース<br>
                        (入数 {{ $result[0]->case_inputs }})
                    </th>
                    <th style="width: 50px; text-align: center;padding: 05px">ボール <br>(入数 {{ $result[0]->ball_inputs }})

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
                    $total_rwspan = count($result);
                    $total_rack_stock = 0;
                    $total_jaiko_stock = 0;
                    $is_case_and_ball_base_set = 0;
                    if ($result[0]->case_inputs > 0 || $result[0]->ball_inputs > 0) {
                        $is_case_and_ball_base_set = 1;
                    }
                    ?>

                    @foreach($result as $key => $value)
                        @if($value->stock_item_id!='')
                            <?php
                            $total_rack_stock = ($value->case_quantity * $value->case_inputs) + ($value->ball_quantity * $value->ball_inputs) + $value->unit_quantity;
                            $total_jaiko_stock += $total_rack_stock;
                            ?>
                            <tr>
                                {{--                                @if($loop->first)--}}
                                {{--                                    <td style="vertical-align: middle !important;background: rgb(179, 255, 179);"--}}
                                {{--                                        rowspan="{{$total_rwspan}}"--}}
                                {{--                                        class="total_stock_jaiko jaiko_{{$value->stock_item_id}}">{{$total_jaikos_stock}}</td>--}}
                                {{--                                @endif--}}

                                {{--                                <td style="vertical-align: middle !important;"--}}
                                {{--                                    class="total_stock_rack rack_number_{{$value->stock_item_id}}">{{$total_rack_stock}}</td>--}}
                                <td>
                                    <input type="tel" case_invent_qty="" onkeypress="saveAndGoNext(event,{{$key}},0)"
                                           onclick="$(this).select()" onblur="updateInventory({{$key}},0,{{ $is_case_and_ball_base_set }})"
                                           class="form-control cmn_num_formt case_invent_qty_{{$key}} cmn_physical_cl inputs"
                                           data_field_name="case_invent" id="case{{ $key }}"
                                           value="{{$value->case_quantity == null ? 0 : $value->case_quantity}}"
                                           data_attr_v_item_id="{{$value->vendor_item_id}}"
                                           data_attr_v_id="{{$value->vendor_id}}"
                                           data_attr_rack_number="{{$value->rack_number}}"
                                           data_attr_row_id="{{$value->stock_item_id}}" autofocus="true"  >

                                    <input type="tel"
                                           class="form-control cmn_num_formt case_law_qty case_inputs_"
                                           value="{{$value->case_inputs}}" readonly hidden>
                                </td>

                                <td><input type="tel" bol_invent_qty="" onkeypress="saveAndGoNext(event,{{$key}},1)"
                                           onclick="$(this).select()" onblur="updateInventory({{$key}},0,{{ $is_case_and_ball_base_set }})"
                                           class="form-control cmn_num_formt bol_invent_qty_{{$key}} cmn_physical_cl inputs"
                                           value="{{$value->ball_quantity == null ? 0 : $value->ball_quantity}}"
                                           data_field_name="bol_invent" id="boll{{ $key }}"
                                           data_attr_v_item_id="{{$value->vendor_item_id}}"
                                           data_attr_v_id="{{$value->vendor_id}}"
                                           data_attr_rack_number="{{$value->rack_number}}"
                                           data_attr_row_id="{{$value->stock_item_id}}"  >

                                    <input type="tel" class="form-control cmn_num_formt bol_law_qty boll_inputs_"
                                           value="{{$value->ball_inputs}}" readonly hidden>
                                </td>

                                <td><input type="tel" unit_invent_qty="" onkeypress="saveAndGoNext(event,{{$key}},2)"
                                           onclick="$(this).select()" onblur="updateInventory({{$key}},0,{{ $is_case_and_ball_base_set }})"
                                           class="form-control cmn_num_formt unit_invent_qty_{{$key}} cmn_physical_cl inputs"
                                           data_field_name="individual_invent" id="bara{{ $key }}"
                                           value="{{$value->unit_quantity == null ? 0 : $value->unit_quantity}}"
                                           data_attr_v_item_id="{{$value->vendor_item_id}}"
                                           data_attr_v_id="{{$value->vendor_id}}"
                                           data_attr_rack_number="{{$value->rack_number}}"
                                           data_attr_row_id="{{$value->stock_item_id}}" >
                                    <div class="input-group rsinput_group" style="display: none;" >
                                        <div class="input-group-addon rsgrp_adon_handy">入数</div>
                                        <input type="tel" class="form-control cmn_num_formt sep_law_qty"
                                               value="" readonly></div>
                                </td>
                                <td style="vertical-align: middle !important;text-align:center"><input
                                        type="tel" class="form-control new_rack_entry"
                                        value="{{$value->rack_number}}"
                                        style="border-radius:0;text-align:center;" ></td>
                            </tr>
                            <?php $i++;?>
                        @else
                            @for($i=0;$i<=0;$i++) <!-- Its looping for 3 time -->
                            <tr>
                                {{--                                    @if($i==0)--}}
                                {{--                                        <td style="vertical-align: middle !important;" rowspan="3"--}}
                                {{--                                            class="total_stock_jaiko jaiko_{{$value->stock_item_id}}">0--}}
                                {{--                                        </td>--}}
                                {{--                                    @endif--}}
                                {{--                                    <td style="vertical-align: middle !important;"--}}
                                {{--                                        class="total_stock_rack rack_number_{{$i}}">0--}}
                                {{--                                    </td>--}}
                                <td><input type="tel" case_invent_qty="" onkeypress="saveAndGoNext(event,{{$i}},0)"
                                           onclick="$(this).select()" onblur="updateInventory({{$i}},1,{{ $is_case_and_ball_base_set }})"
                                           class="form-control cmn_num_formt case_invent_qty_{{ $i }} cmn_physical_cl inputs"
                                           data_field_name="case_invent" id="case{{ $i }}"
                                           value="{{$value->case_quantity == null ? 0 : $value->case_quantity}}"
                                           data_attr_v_item_id="{{$value->vendor_item_id}}"
                                           data_attr_v_id="{{$value->vendor_id}}"
                                           data_attr_rack_number="" data_attr_row_id="0" autofocus="true">
                                    <input type="tel"
                                           class="form-control cmn_num_formt case_law_qty case_inputs_"
                                           value="{{$value->case_inputs}}" readonly hidden>
                                </td>

                                <td><input type="tel" bol_invent_qty="" onkeypress="saveAndGoNext(event,{{$i}},1)"
                                           onclick="$(this).select()" onblur="updateInventory({{$i}},1,{{ $is_case_and_ball_base_set }})"
                                           class="form-control cmn_num_formt bol_invent_qty_{{ $i }} cmn_physical_cl  inputs"
                                           value="{{$value->ball_quantity == null ? 0 : $value->ball_quantity}}"
                                           data_field_name="bol_invent" id="boll{{ $i }}"
                                           data_attr_v_item_id="{{$value->vendor_item_id}}"
                                           data_attr_v_id="{{$value->vendor_id}}"
                                           data_attr_rack_number="" data_attr_row_id="0">
                                    <input type="tel" class="form-control cmn_num_formt bol_law_qty boll_inputs_"
                                           value="{{$value->ball_inputs}}" readonly hidden>
                                </td>

                                <td><input type="tel" unit_invent_qty="" onkeypress="saveAndGoNext(event,{{$i}},2)"
                                           onclick="$(this).select()" onblur="updateInventory({{$i}},1,{{ $is_case_and_ball_base_set }})"
                                           class="form-control cmn_num_formt unit_invent_qty_{{ $i }} cmn_physical_cl inputs"
                                           data_field_name="individual_invent" id="bara{{ $i }}"
                                           value="{{$value->unit_quantity == null ? 0 : $value->unit_quantity}}"
                                           data_attr_v_item_id="{{$value->vendor_item_id}}"
                                           data_attr_v_id="{{$value->vendor_id}}"
                                           data_attr_rack_number="" data_attr_row_id="0"></td>
                                <td style="vertical-align: middle !important;text-align:center;padding:0;">
                                    <input type="tel" class="form-control new_rack_entry{{ $i }}" value=""
                                           onkeypress="saveAndGoNext(event,{{$i}},3)"
                                           onkeyup="saveAndExit(event,{{$i}},3)" onclick="$(this).select()"
                                           onblur="updateInventory({{$i}},1,{{ $is_case_and_ball_base_set }})"
                                           style="border-radius:0;text-align:center;" id="rack{{ $i }}"></td>
                            </tr>
                            @endfor
                        @endif
                    @endforeach
                @else
                    <tr>
                        <td style="font-size:24px;text-align:center;vertical-align:0;" colspan="6">
                            レコードが見つかりません
                        </td>
                    </tr>
                @endif
                </tbody>
            </table>

            <a href="javascript:void(0)" class="btn btn-primary scan_tanarosi_sohin custom-btn pull-right"
               onclick="hideModelAndClearInput()" style="float:right;margin-top: -10px">
                次の商品へ</a>
        </div>
    </div>

    <div class="" style="width: 100%;margin-top: -10px">
        <div class="input-group mb-2"
             style="border: .5px solid #b8b7b7;border-radius: 5px;width: 50%;height: 45px;">
            <div class="input-group-prepend"
                 style=" color: black;    /* padding: 0px 0px; */">
                <div class="input-group-text"
                     style="color: black;font-weight: bold;padding: 0 11px;font-size: 16px;">在庫合計
                </div>
            </div>
            <input type="text" class="total_stock_jaiko_new jaiko_ form-control" readonly=""
                   value="{{$total_jaikos_stock ? $total_jaikos_stock : 0}}"
                   style="padding: 5px 5px;    font-size: 16px;">
        </div>
    </div>

    {{--    <div class="form-group" style="border-radius: 5px;margin-bottom: 10px;margin-top: 20px">--}}
    {{--        @if($result)--}}
    {{--            <p id="search_product_name" class="product_name_aria"><span--}}
    {{--                    style="color: #999; font-size: 20px;">{{$result[0]->item_name}}</span></p>--}}
    {{--        @endif--}}
    {{--    </div>--}}

</div>

