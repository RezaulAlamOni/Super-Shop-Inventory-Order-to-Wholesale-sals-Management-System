
     {{-- Delete User  Modal Start --}}
    <div class="modal fade" id="delete_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="delete_heading"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
               
                <div class="modal-body">
                    <input type="hidden" id="delete_id" value="">
                    <input type="hidden" id="delete_type" value="">
                    <p id="delete_msg"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{__('messages.close')}}</button>
                    <button type="submit" class="btn btn-danger" id="delete_from_modal">{{__('messages.delete')}}</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    {{-- Delete User modal End --}}
    
<!--     <div class="modal custom_postion_yes_no fade" data-backdrop="static" data-keyboard="false" id="yes_no_confirmation_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content modal_cntent_body">
      <div class="modal-body text-center message_body_content">
       
      </div>
      <div class="modal-footer modal_bottom_button text-center">
        
        <button type="button" class="btn btn-danger">はい</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal">いいえ</button>
      </div>
    </div>
  </div>
</div>

<div class="modal custom_postion fade" id="success_error_confirmation_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content modal_cntent_body">
      <div class="modal-body text-center message_body_content">
       
      </div>
      <div class="modal-footer modal_bottom_button text-center">
        
        <button type="button" class="btn btn-danger">はい</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal">いいえ</button>
      </div>
    </div>
  </div>
</div> -->



