{{-- Shop show modal --}}
<div class="modal fade" id="customer_shop_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">店舗一覧</h5>
                <button type="button" class="close custom_shop_close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                <div class="row">
                    <div class="col-sm-4 customer_heading"></div>
                    <div class="col-sm-8 customer_btn text-right pull-right">
                        <button sup_buyer_type="1" class="btn btn-primary pull-right add_new_shop">追加</button>
                    </div>
                    <div class="clearfix"></div>
                    
                </div>
                <div id="shop_message_success"></div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body buyrslisst_overflow">
                    <table class="table table-striped table-bordered buyrslisst_overflow">
                        <thead>
                            <tr>
                                <th>販売先名</th>
                                <th>店コード</th>
                                <th>店舗名</th>
                                <th>設定</th>
                            </tr>
                        </thead>
                        <tbody class="shop_list_item">
                           
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary custom_shop_close" data-dismiss="modal">{{__('messages.close')}}</button>
            </div>
        </div>
    </div>
</div>

{{-- Shop add Modal --}}
<div class="modal fade" id="shop_reg_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                    <h5 class="modal-title change_table_top_title">新規店舗追加</h5>
                {{-- <h5 class="modal-title" id="maker_modal_heading"></h5> --}}
                <button type="button" class="close close_shop_reg_update" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="add_shop_message"></div>
            <div class="clearfix"></div>
            <div class="modal-body">
                <div class="panel-body buyer_reg_body">
                       
                    <form id="shop_create_form">
                        <input type="hidden" name="shop_update_id" id="shop_update_id" value="">
                        <div class="form-group row">
                            <label for="customer_list" class="col-sm-4 col-form-label">販売先(※)</label>
                            <div class="col-sm-8">
                                <select name="customer_list" id="customer_list" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="shop_code" class="col-sm-4 col-form-label">店舗コード(※)</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control-plaintext" name="shop_code" id="shop_code"
                                    value="" placeholder="ショップコードを入力してください">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="shop_name" class="col-sm-4 col-form-label">店舗名(※)</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control-plaintext" id="shop_name" name="shop_name"
                                    value="" placeholder="ショップ名を入力してください">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="shop_address" class="col-sm-4 col-form-label">住所</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control-plaintext" id="shop_address" name="shop_address"
                                    value="" placeholder="ショップの住所を入力してください">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="postal_code" class="col-sm-4 col-form-label">郵便番号</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control-plaintext" id="postal_code" name="postal_code"
                                    value="" placeholder="ショップの郵便番号を入力してください">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="phone" class="col-sm-4 col-form-label">電話番号(※)</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control-plaintext" id="phone" name="phone"
                                    value="" placeholder="電話番号を入力してください">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-sm-4 col-form-label">Email(※)</label>
                            <div class="col-sm-8">
                                <input type="email" class="form-control-plaintext" id="email" name="email"
                                    value="" placeholder="メールアドレスを入力してください">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="delivery_cycle" class="col-sm-4 col-form-label">納品サイクル(※)</label>
                            <div class="col-sm-8">
                                <input type="number" class="form-control-plaintext" id="delivery_cycle" name="delivery_cycle"
                                    value="" placeholder="配送サイクル">
                            </div>
                        </div>

                        <div class="form-group row" style="margin-bottom:0;">
                            <label for="reqired_fiel" class="col-sm-12 col-form-label">注意）※印は必須です。</label>
                            
                        </div>

                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-info add_shop_info">{{__('messages.add')}}</button>
                <button type="button" class="btn btn-danger d-none delete_shop_info">{{__('messages.delete')}}</button>
                <button type="button" class="btn btn-secondary close_shop_reg_update">{{__('messages.close')}}</button>

            </div>
        </div>
    </div>
</div>