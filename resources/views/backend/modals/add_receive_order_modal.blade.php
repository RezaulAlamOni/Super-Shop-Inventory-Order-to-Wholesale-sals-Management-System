<!-- add item modal -->

<div class="modal fade" id="add_receive_order_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">発注</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="panel-heading">
                
                <div class="form-group row">
                    <div class="col-sm-6"></div>
                    <label for="order_receive_date" class="col-sm-3 text-right col-form-label">指定納品日</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="order_receive_date" name="order_receive_date">
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="modal-body">
                <div class="panel-body receive_order_body">
                   <table class="table table-bordered table-striped">
                       <thead>
                           <tr>
                               <th>商品名</th>
                               <th>JAN</th>
                               <th>仕入先</th>
                               <th>発注単位</th>
                               <th>発注数量</th>
                               <th>削除</th>
                           </tr>
                       </thead>
                       <tbody class="receive_order_list">

                       </tbody>
                   </table>
                </div>
            </div>
            <div class="modal-footer" id="footer">
                <button type="button" class="btn btn-success update_receive_order_info">発注確定</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">閉じる</button>
            </div>
        </div>
    </div>
</div>