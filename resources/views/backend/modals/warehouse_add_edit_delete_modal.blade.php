<!-- vendor show list modal -->
<div class="modal fade" id="warehouse_show_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">倉庫一覧</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                <div class="row">
                    <div class="col-sm-4 customer_heading">
                    </div>
                    <div class="col-sm-8 customer_btn text-right pull-right">
                        <button data_type="0" class="btn btn-primary pull-right add_new_warehouse">追加</button>
                    </div>
                    <div class="clearfix"></div>
                    
                </div>
                <div id="warehouse_message_success"></div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyrslisst_overflow">
                    <table class="table table-striped table-bordered buyrslisst_overflow">
                        <thead>
                            <tr>
                                <th class="change_table_th_title">倉庫名</th>
                                <th>電話</th>
                                <th>住所</th>
                                <th>設定</th>
                            </tr>
                        </thead>
                        <tbody class="warehouse_list_item">
                           
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{__('messages.close')}}</button>
            </div>
        </div>
    </div>
</div>

<!-- add edit vendor modal -->
<div class="modal fade" id="warehouse_add_edit_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title warehouse_modal_change" id="maker_modal_heading">新規倉庫追加</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                <div class="row">
                    
                    <div class="col-sm-12 add_item_heading">
                        <div id="warehouse_add_updated_message"></div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyer_reg_body">
                    <form>
                    <input type="hidden" value="0" class="warehouse_id">
                        <div class="form-group row">
                            <label for="warehouse_name" class="col-sm-4 col-form-label">倉庫名</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="warehouse_name" name="warehouse_name"
                                    value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="warehouse_address" class="col-sm-4 col-form-label">住所</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="warehouse_address" id="warehouse_address"
                                    value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="warehouse_phone" class="col-sm-4 col-form-label">電話番号</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control" id="warehouse_phone"
                                    name="vendor_phone" value="">
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info add_warehouse_regs">{{__('messages.add')}}</button>
                <button type="button" warehouse_id="0" class="btn btn-danger delete_warehouse">{{__('messages.delete')}}</button>
                <button type="button" class="btn btn-secondary close_warehouse_update">{{__('messages.close')}}</button>

            </div>
        </div>
    </div>
</div>


<!--show payment modal-->

<!-- payment show list modal -->
<div class="modal fade" id="vendor_payment_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                    <div class="col-sm-12 customer_heading">
                        <h3 class="text-center">入金情報設定</h3>
                        
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-sm-12 text-center">
                    伝票番号:<span data_v_id="0" data_p_amount="0" data_o_id="0" class="payment_voucher"></span>
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
                                <th>入金日</th>
                                <th>入金額</th>
                                <th>削除</th>
                            </tr>
                        </thead>
                        <tbody class="payment_table_dataddd">
                           
                        </tbody>
                    </table>
                    <div class="">
                    <form class="form-inline">
  <label for="vendor_p_amount" class="mr-sm-2">入金額入力:</label>
  <input type="number" class="form-control mb-2 mr-sm-2" id="vendor_p_amount">
  <input type="hidden" class="already_given_total" value="0">
  <button type="submit" class="btn btn-primary mb-2 insert_vendor_payment">入金</button>
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

<!-- invoice table -->
<div class="modal fade" id="invoice_add_edit_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">請求情報設定</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                <div class="clearfix"></div>
                <div id="invoice_message"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyer_reg_body">
                    <form>
                    <input type="hidden" value="0" id="invoice_id">
                        <div class="form-group row">
                            <label for="company_name" class="col-sm-4 col-form-label">自社名</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="company_name" name="company_name"
                                    value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="bank_name" class="col-sm-4 col-form-label">銀行名</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="bank_name" id="bank_name"
                                    value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="bank_branch" class="col-sm-4 col-form-label">銀行支店名</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="bank_branch"
                                    name="bank_branch" value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="bank_account_number" class="col-sm-4 col-form-label">口座番号</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="bank_account_number"
                                    name="bank_account_number" value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="bank_account_name" class="col-sm-4 col-form-label">口座名義</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="bank_account_name"
                                    name="bank_account_name" value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="address" class="col-sm-4 col-form-label">住所</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="address"
                                    name="address" value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="invoice_postal_code" class="col-sm-4 col-form-label">郵便番号</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="invoice_postal_code"
                                    name="invoice_postal_code" value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="tel" class="col-sm-4 col-form-label">電話番号</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="tel"
                                    name="tel" value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="fax" class="col-sm-4 col-form-label">FAX番号</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="fax"
                                    name="fax" value="">
                            </div>
                        </div>


                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info update_invoice_table">登録</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{__('messages.close')}}</button>

            </div>
        </div>
    </div>
</div>


<!-- show list modal by voucher -->
<div class="modal fade" id="show_product_list_by_voucher_number" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                    <div class="col-sm-12 customer_heading">
                        <h3 class="text-center">伝票明細</h3>
                        
                    </div>
                    <div class="clearfix"></div>
                    <div class="col-sm-12 text-center">
                    </div>
                    <div class="clearfix"></div>
                    <div id="voucher_list_message_success"></div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyrslisst_overflow">
                    <table class="table table-striped table-bordered voucher_list_tables">
                        <thead>
                            <tr>
                                <th>商品名</th>
                                <th>ケース 入数</th>
                                <th>ボール 入数</th>
                                <th>発汪数量</th>
                                <th>原価</th>
                                <th>金額</th>
                            </tr>
                        </thead>
                        <tbody class="voucher_product_list_table_dataddd">
                            
                        </tbody>
                        <tfoot class="voucher_foot">
                        <tr>
                            <td colspan="5" style="text-align:right;">合計</td>
                            <td class="total_amount_invoice"></td>
                        </tr>   
                        </tfoot>
                        
                    </table>
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{__('messages.close')}}</button>
            </div>
        </div>
    </div>
</div>
<!--show voucher modal-->
<!-- Password change Modal -->
<div class="modal fade" id="user_change_password_modal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ __('messages.change_password') }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <div id="user_change_password_message"></div>
                        <form method="POST" id="user_change_password" class="">
                            @csrf
                            <input type="hidden" name="user_id" id="user_id">
                            <div class="form-group row">
                                <label for="user_new_password"
                                    class="col-md-4 col-form-label">{{ __('messages.new_password') }}</label>
                                <div class="col-md-8">
                                    <input id="user_new_password" type="password" class="form-control"
                                        name="user_new_password" placeholder="{{ __('messages.new_password') }}"
                                        autocomplete="New Password" required>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="user_new_password_confirm"
                                    class="col-md-4 col-form-label">{{ __('messages.confirm_password') }}</label>
                                <div class="col-md-8">
                                    <input id="user_new_password_confirm" type="password" class="form-control"
                                        name="user_new_password_confirm"
                                        placeholder="{{ __('messages.confirm_password') }}"
                                        autocomplete="Confirm Password" required>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                            data-dismiss="modal">{{ __('messages.close') }}</button>
                        <button type="submit" class="btn btn-primary"
                            id="user_change_password_save">{{ __('messages.save') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Password change Modal End -->
