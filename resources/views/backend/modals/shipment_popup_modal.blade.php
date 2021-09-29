<!-- add item modal -->
<div class="modal fade" id="shipment_popup_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">伝票出力</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="panel-body">
                   <table class="table table-bordered table-striped">
                       <thead>
                           <tr>
                               <th>販売先名</th>
                               <th>出荷日</th>
                               <th>伝票番号</th>
                               <th>ステータス</th>
                               <th>伝票出力</th>
                           </tr>
                       </thead>
                       <tbody class="shipment_popup_data">

                       </tbody>
                   </table>
                </div>
            </div>
            <div class="modal-footer" id="footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">閉じる</button>
            </div>
        </div>
    </div>
</div>

<!-- add item modal -->
<div class="modal fade" id="received_popup_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="maker_modal_heading">伝票出力</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="panel-body">
                   <table class="table table-bordered table-striped">
                       <thead>
                           <tr>
                               <th>仕入先名</th>
                               <th>入荷日</th>
                               <th>伝票番号</th>
                               <th>ステータス</th>
                               <th>伝票出力</th>
                           </tr>
                       </thead>
                       <tbody class="receive_popup_data">

                       </tbody>
                   </table>
                </div>
            </div>
            <div class="modal-footer" id="footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">閉じる</button>
            </div>
        </div>
    </div>
</div>