<!-- maker show list modal -->
<div class="modal fade" id="vendor_show_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">仕入先一覧</h5>
                <ul class="list-inline custom_header_button">
                    <li><button sup_buyer_type="1" class="btn btn-primary pull-right add_new_vendor">追加</button></li>
                    <li> <button sup_buyer_type="1" class="btn btn-danger pull-right delete_new_vendor">削除</button></li>
                    <li><button type="button" data-dismiss="modal" class="btn btn-warning pull-right ">戻る</button></li>
                </ul>




            </div>
            <div class="panel-heading">
                <div class="row">
                    <div class="col-sm-4 customer_heading">
                    </div>
                    <div class="col-sm-8 customer_btn text-right pull-right">

                    </div>

                </div>
                <div id="vendor_message_success"></div>
            </div>
            <div class="modal-body">

                <div class="panel-body buyrslisst_overflow">
                    <table class="table table-striped table-bordered buyrslisst_overflow">
                        <thead>
                            <tr>
                                <th class="change_table_th_title">仕入先名</th>
                                <th>電話</th>
                                <th>コード</th>
                            </tr>
                        </thead>
                        <tbody class="vendor_list_item">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- vendor show list modal -->
<div class="modal fade" id="customer_show_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">販売先一覧</h5>
                <ul class="list-inline custom_header_button">
                        <button sup_buyer_type="1" class="btn btn-secondary pull-right customer_shop">店舗一覧</button>
                        <button sup_buyer_type="1" class="btn btn-primary pull-right add_new_customer">追加</button>
                        <button sup_buyer_type="1" class="btn btn-danger pull-right delete_new_vendor">削除</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal">{{__('messages.close')}}</button>
                </ul>
            </div>
            <div class="panel-heading">
                <div id="customer_message_success"></div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyrslisst_overflow">
                    <table class="table table-striped table-bordered buyrslisst_overflow">
                        <thead>
                            <tr>
                                <th class="change_table_th_title">販売先名</th>
                                <th>電話</th>
                                <th>コード</th>
                            </tr>
                        </thead>
                        <tbody class="customer_list_item">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- add edit vendor modal -->
<div class="modal fade" id="vendor_reg_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">仕入先情報</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                <div class="row">
                    {{-- <div class="col-sm-12 add_item_heading">
                        <p class="text-center change_table_top_title"></p>
                    </div> --}}
                    <div class="col-sm-12 add_item_heading">
                        <div id="add_vendor_message"></div>
                        <div id="add_vendor_error"></div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyer_reg_body">
                    <form>
                        <div class="form-group row">
                            <label for="vendor_name" class="col-sm-4 col-form-label">仕入先名</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control-plaintext" id="vendor_name" name="vendor_name"
                                    value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="vendor_code" class="col-sm-4 col-form-label">仕入先コード</label>
                            <div class="col-sm-8">
                                <input type="tel" maxlength="6" class="form-control-plaintext" name="vendor_code" id="vendor_code"
                                    value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="vendor_phone" class="col-sm-4 col-form-label">電話番号</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control-plaintext" id="vendor_phone"
                                    name="vendor_phone" value="">
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info add_vendor_regs">{{__('messages.add_product')}}</button>
                <button type="button"
                    class="btn btn-secondary close_vendor_reg_update">{{__('messages.close')}}</button>

            </div>
        </div>
    </div>
</div>
<!-- add edit vendor modal -->
<div class="modal fade" id="vendor_update_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                    <div class="col-sm-12 add_item_heading">
                        <p class="text-center change_table_top_title">仕入先情報</p>
                        <div id="update_vendor_message_fail"></div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyer_reg_body">
                    <form>
                        <input type="hidden" value="" id="vendor_id_update">
                        <div class="form-group row">
                            <label for="vendor_name_update" class="col-sm-4 col-form-label">仕入先名</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control-plaintext" id="vendor_name_update"
                                    name="vendor_name_update" value="販売先A">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="vendor_code_update" class="col-sm-4 col-form-label">仕入先コード</label>
                            <div class="col-sm-8">
                                <input type="tel" maxlength="6" class="form-control-plaintext" name="vendor_code_update"
                                    id="vendor_code_update" value="53211">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="vendor_phone_update" class="col-sm-4 col-form-label">電話番号</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control-plaintext" id="vendor_phone_update"
                                    name="vendor_phone_update" value="490123587565">
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success update_vendor_info">{{__('messages.btn_update')}}</button>
                <button type="button" data_vendor_delete_id=""
                    class="btn btn-danger delete_vendor_info">{{__('messages.btn_delete')}}</button>
                <button type="button"
                    class="btn btn-secondary close_vendor_reg_update">{{__('messages.close')}}</button>

            </div>
        </div>
    </div>
</div>

<!-- add edit maker modal -->
<div class="modal fade" id="customers_reg_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">販売先情報</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                <div class="row">
                    <div class="col-sm-12 add_item_heading"></div>
                </div>
                <div id="add_customer_message"></div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyer_reg_body">
                    <form>
                        <div class="form-group row">
                            <label for="customer_name" class="col-sm-4 col-form-label">販売先名</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control-plaintext" id="customer_name"
                                    name="customer_name" value="A1メーカー">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="customer_code" class="col-sm-4 col-form-label">販売先コード</label>
                            <div class="col-sm-8">
                                <input type="tel" maxlength="6" class="form-control-plaintext" name="customer_code"
                                    id="customer_code" value="53211">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="customer_phone" class="col-sm-4 col-form-label">電話番号</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control-plaintext" id="customer_phone"
                                    name="customer_phone" value="01936755674">
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info add_customer_info">{{__('messages.add_product')}}</button>
                <button type="button"
                    class="btn btn-secondary close_customer_reg_update">{{__('messages.close')}}</button>

            </div>
        </div>
    </div>
</div>

<!-- add edit maker modal -->
<div class="modal fade" id="customers_update_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">販売先情報</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                <div class="row">
                    <div class="col-sm-12 add_item_heading"></div>
                </div>
                <div id="update_customer_message_fail"></div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyer_reg_body">
                    <form>
                        <input type="hidden" id="customer_id_update" value="">
                        <div class="form-group row">
                            <label for="customer_name_update" class="col-sm-4 col-form-label">販売先名</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control-plaintext" id="customer_name_update"
                                    name="customer_name_update" value="A1メーカー">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="customer_code_update" class="col-sm-4 col-form-label">販売先コード</label>
                            <div class="col-sm-8">
                                <input type="tel" maxlength="6" class="form-control-plaintext" name="customer_code_update"
                                    id="customer_code_update" value="53211">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="customer_phone_update" class="col-sm-4 col-form-label">電話番号</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control-plaintext" id="customer_phone_update"
                                    name="customer_phone_update" value="01936755674">
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button"
                    class="btn btn-success update_customer_info">{{__('messages.btn_update')}}</button>
                <button type="button" data_customer_delete_id=""
                    class="btn btn-danger delete_custmer_info">{{__('messages.btn_delete')}}</button>
                <button type="button"
                    class="btn btn-secondary close_customer_reg_update">{{__('messages.close')}}</button>
            </div>
        </div>
    </div>
</div>

<!-- add item modal -->
<div class="modal fade" id="add_update_customer_items_modal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
   <!--  <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title c_item_title" id="maker_modal_heading">新規商品登録</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                <div class="row">

                    <div class="col-sm-12 messgage text-center">
                        <p id="customer_item_ins_up_error"></p>
                    </div>

                </div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body add_item_body">
                    <form id="customer_item_form">
                        <input type="hidden" class="" id="update_customer_item_id" value="0">
                        <div class="form-group row">
                            <label for="c_name" class="col-sm-4 col-form-label">販売先名</label>
                            <div class="col-sm-8">
                                <select class="form-control customer_list_item_select_field" name="c_name" id="c_name">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="c_code" class="col-sm-4 col-form-label">販売先コード</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="c_code" id="c_code" value=""
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="v_name" class="col-sm-4 col-form-label">仕入先名</label>
                            <div class="col-sm-8">
                                <select class="form-control vendor_list_item_select_field" name="v_name" id="v_name">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="v_code" class="col-sm-4 col-form-label">仕入先コード</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="v_code" name="v_code" value=""
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="j_code" class="col-sm-4 col-form-label">JANコード</label>
                            <div class="col-sm-8">
                                {{-- <input type="number" class="form-control-plaintext" id="j_code" name="j_code"
                                    value=""> --}}
                                <div class="ui-widget">
                                    <select class="combobox"></select>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="customer_item_name" class="col-sm-4 col-form-label">商品名</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="customer_item_name"
                                    name="customer_item_name" value="" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="c_qty" class="col-sm-4 col-form-label">ケース入数</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="c_qty" name="c_qty" value=""
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="b_qty" class="col-sm-4 col-form-label">ボール入数</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="b_qty" name="b_qty" value=""
                                    readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="c_price" class="col-sm-4 col-form-label">原価</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control common_price cost_price" id="c_price"
                                    name="c_price" value="" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="c_selling_price" class="col-sm-4 col-form-label">売価</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control-plaintext common_price selling_price"
                                    id="c_selling_price" name="c_selling_price" value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="gross_profits" class="col-sm-4 col-form-label">粗利</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="gross_profits"
                                    name="gross_profits" value="" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="profit_margins" class="col-sm-4 col-form-label">粗利率</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="profit_margins"
                                    name="profit_margins" value="" readonly>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer customer_item_modal_footer">
                <button type="button" data_c_item_id="0"
                    class="btn btn-info update_customer_item_data">{{__('messages.add_product')}}</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{__('messages.close')}}</button>

            </div>
        </div>
    </div> -->
</div>


<!-- add edit vendor modal -->
<div class="modal fade" id="vendor_reg_modal_inner_page" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">仕入先情報</h5>
                <button type="button" class="close close_vendor_reg_update_inner_page" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                <div class="row">
                    {{-- <div class="col-sm-12 add_item_heading">
                        <p class="text-center change_table_top_title"></p>
                    </div> --}}
                    <div class="col-sm-12 add_item_heading">
                        <div id="add_vendor_message"></div>
                        <div id="add_vendor_error"></div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyer_reg_body">
                    <form>
                        <div class="form-group row">
                            <label for="vendor_name" class="col-sm-4 col-form-label">仕入先名</label>
                            <div class="col-sm-8">
                                <input type="hidden" class="inner_page_vendor_item_id" value="0">
                                <input type="hidden" class="inner_page_maker_id" value="0">
                                <input type="text" class="form-control-plaintext" id="vendor_name_m" name="vendor_name_m"
                                    value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="vendor_code" class="col-sm-4 col-form-label">仕入先コード</label>
                            <div class="col-sm-8">
                                <input type="tel" maxlength="6" class="form-control-plaintext" name="vendor_code_m" id="vendor_code_m"
                                    value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="vendor_phone" class="col-sm-4 col-form-label">電話番号</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control-plaintext" id="vendor_phone_m"
                                    name="vendor_phone_m" value="">
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info add_vendor_regs_inner_page">{{__('messages.add_product')}}</button>
                <button type="button"
                    class="btn btn-secondary close_vendor_reg_update_inner_page">{{__('messages.close')}}</button>

            </div>
        </div>
    </div>
</div>
<!-- add edit vendor touroko modal -->

<!-- add edit vendor modal -->
<div class="modal fade" id="productImgZoomerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <!-- <h5 class="modal-title" id="maker_modal_heading">仕入先情報</h5> -->
                <button type="button" class="close closeZoomer" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                <div class="row">
                    {{-- <div class="col-sm-12 add_item_heading">
                        <p class="text-center change_table_top_title"></p>
                    </div> --}}
                    <div class="col-sm-12 add_item_heading">
                        <div id="add_vendor_message"></div>
                        <div id="add_vendor_error"></div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body" style="margin: auto">
                <div class="panel-body zoomerBody" style="display: -webkit-box;">
                    <div class="imgArea" style="padding-right: 20px;">
                        <img src="" class="productImgZoomer productImgZoomerWithDetails"/>
                    </div>
                    <div class="productInfo" style="margin-top: 40px;">
                        <h4 class="productPrice">価格 :<span class="pPrice"></span></h4>
                        <h4 class="productPrice">量 :<span class="pQunatity"></span></h4>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-info add_vendor_regs_inner_page">{{__('messages.add_product')}}</button> -->
                <button type="button"
                    class="btn btn-secondary closeZoomer">{{__('messages.close')}}</button>

            </div>
        </div>
    </div>
</div>
<!-- add edit vendor touroko modal -->
<div class="modal fade" id="customer_shop_list_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">店一覧</h5>
                <ul class="list-inline custom_header_button">
                        <button sup_buyer_type="1" class="btn btn-secondary pull-right customer_shop">店舗一覧</button>
                        <button type="button" class="btn btn-warning" data-dismiss="modal">{{__('messages.close')}}</button>
                </ul>
            </div>
            <div class="panel-heading">
                <div id="customer_message_success"></div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyrslisst_overflow">
                    <table class="table table-striped table-bordered buyrslisst_overflow">
                        <thead>
                            <tr>
                                <th class="change_table_th_title">店名</th>
                                <th>電話</th>
                                <th>コード</th>
                            </tr>
                        </thead>
                        <tbody class="customer_shop_list_item">
                            <tr class="shopListitem">
                                <td>店 A</td>
                                <td>0165685555</td>
                                <td>2343221</td>
                            </tr>
                            <tr class="shopListitem">
                                <td>店 B</td>
                                <td>0165685555</td>
                                <td>2343221</td>
                            </tr>
                            <tr class="shopListitem">
                                <td>店 C</td>
                                <td>0165685555</td>
                                <td>2343221</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>