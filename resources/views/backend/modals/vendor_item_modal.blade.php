<!-- add item modal -->
<div class="modal fade" id="vendor_item_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title v_item_title" id="maker_modal_heading">新規商品登録</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                
                <div id="vendor_message"></div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body add_item_body">
                    <form>
                        <input type="hidden" name="vendor_item_id" id="vendor_item_id" value="">
                        <div class="form-group row">
                            <label for="m_name" class="col-sm-4 col-form-label">仕入先名</label>
                            <div class="col-sm-8">
                                <div class="jacos_select_field">
                                <select class="form-control selectpicker" name="m_name" id="m_name">
                                    
                                </select>
                                </div>
                            <!-- <div class="row">
                            <div class="col-md-4">
                            <input type="text" class="form-control-plaintext" name="m_code" id="m_code"
                                    value="" disabled>
                            </div>
                            <div class="col-md-8">
                                <select class="form-control" name="m_name" id="m_name">
                                    
                                </select>
                            </div>
                            </div> -->
                            </div>
                        </div>
                        <!-- <div class="form-group row">
                            <label for="m_code" class="col-sm-4 col-form-label">仕入先コード</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control-plaintext" name="m_code" id="m_code"
                                    value="" disabled>
                            </div>
                        </div> -->
                        <div class="form-group row">
                            <label for="jan_code" class="col-sm-4 col-form-label">JANコード</label>
                            <div class="col-sm-8">
                                <input type="tel" maxlength="13" class="form-control-plaintext" id="jan_code" name="jan_code"
                                    value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="item_name" class="col-sm-4 col-form-label">商品名</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control-plaintext" id="item_name" name="item_name"
                                    value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="case_qty" class="col-sm-4 col-form-label">入数</label>
                            <div class="col-sm-8">
                                <div class="row">
                                    <div class="col-md-6">
                                    <div class="form-group row">
                                        <label for="case_qty" class="col-sm-6 col-form-label">ケース</label>
                                        <div class="col-sm-6">
                                        <input type="tel" maxlength="4" class="form-control-plaintext" id="case_qty" name="case_qty"
                                    value="">
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label for="ball_qty" class="col-sm-6 col-form-label">ボール</label>
                                            <div class="col-sm-6">
                                                <input type="tel" maxlength="4" class="form-control-plaintext" id="ball_qty" name="ball_qty"
                                    value="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <!-- new sec -->
                        
                        <hr> <div class="form-group row"><label for="price" class="col-sm-4 col-form-label">区分</label> <div class="col-sm-8">
    <div class="row">
        <div class="col-sm-6">定番</div>
        <div class="col-sm-6">特売</div>
    </div>
</div></div>
<div class="form-group row" style="
    margin-bottom: 0.5rem;
"><label for="price" class="col-sm-4 col-form-label">原価</label> 
    <div class="col-sm-8">
        <div class="row">
    <div class=" col-sm-6">
    <input type="number" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==12) return false;" step="0.01" id="price" name="price" value="" class="form-control" style="width: 85%;margin: 0px;display: initial;padding-left: 0;padding-right: 6px;text-align: right;">円
        </div>
    <div class=" col-sm-6">
<input type="number" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==12) return false;" step="0.01" id="sale_price" name="sale_price" value="" class="form-control" style="
    width: 85%;
    margin: 0px;
    display: initial;
    padding-left: 0;
    padding-right: 6px;
    text-align: right;
">円
        </div>
        </div>
    </div>
</div>
<div class="form-group row" style="
    margin-bottom: 0.1rem;
"><label for="basic_start_date" class="col-sm-4 col-form-label">開始日</label> <div class="col-sm-8">
    <div class="row">
        <div class="col-sm-6">
<input class="form-control" id="basic_start_date" name="basic_start_date" type="tel" style="
    padding-left: 0;
    padding-right: 6px;
    text-align: right;
">            
</div>
        <div class="col-sm-6">
<input class="form-control" id="sale_start_date" name="sale_start_date" type="tel" style="
    padding-left: 0;
    padding-right: 6px;
    text-align: right;
">            
</div>
</div>
    </div></div>
<div class="form-group row" style="
    margin-bottom: 0.1rem;
"><label for="basic_end_date" class="col-sm-4 col-form-label">終了日</label> <div class="col-sm-8">
    
    <div class="row">
        <div class="col-sm-6">
<input class="form-control" id="basic_end_date" name="basic_end_date" type="tel" style="
    padding-left: 0;
    padding-right: 6px;
    text-align: right;
">            
</div>
        <div class="col-sm-6">
<input class="form-control" id="sale_end_date" name="sale_end_date" type="tel" style="
    padding-left: 0;
    padding-right: 6px;
    text-align: right;
">            
</div>
</div>
</div></div> <hr>
                         <!-- new sec -->
                        
                        <div class="form-group row">
                            <label for="vendor_order_point_unit" class="col-sm-4 col-form-label">発注点</label>
                            <div class="col-sm-8">
                                <div class="row">
                                    <div class="col-md-6">
                                    <select class="form-control" id="vendor_order_point_unit" name="vendor_order_point_unit">
                                    <option value="ケース">ケース</option>
                                    <option value="ボール">ボール</option>
                                    <option value="バラ">バラ</option>
                                </select>
                                    </div>
                                    <div class="col-md-6">
                                    <input type="number" class="form-control" id="vendor_order_point_quantity" name="vendor_order_point_quantity"
                                    value="1">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <label for="vendor_order_lot_unit" class="col-sm-4 col-form-label">発注ロット</label>
                            <div class="col-sm-8">
                                <div class="row">
                                    <div class="col-md-6">
                               <select class="form-control" id="vendor_order_lot_unit" name="vendor_order_lot_unit">
                                <option value="ケース">ケース</option>
                                <option value="ボール">ボール</option>
                                <option value="バラ">バラ</option>
                            </select>
                            </div>
                            <div class="col-md-6">
                            <input type="number" class="form-control" id="vendor_order_lot_quantity" name="vendor_order_lot_quantity" value="1">
                            </div>
                            </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer" id="footer">
                
            </div>
        </div>
    </div>
</div>