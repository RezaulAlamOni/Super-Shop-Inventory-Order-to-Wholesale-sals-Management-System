 $(document).ready(function() {

     $('#role_click').on('click', function(event) {
         event.preventDefault();
         var role_id = $("#role_id").val();
         if (role_id == 0) {
             alert("Please select a Role");
             return false;
         }
         var permission = [];
         $('#permission:checked').each(function() {
             permission.push($(this).val());
         });
         console.log(permission);
         // return false;
         $.ajax({
             headers: {
                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
             },
             url: 'assign_permission_role',
             type: 'POST',
             dataType: 'JSON',
             data: { role_id: role_id, permission: permission },
             success: function(response) {
                 alert(response.message);
             }
         })
     })
     $('#user_click').on('click', function(event) {
             event.preventDefault();
             var user_id = $("#user_id_for_role").val();
             // alert(user_id);
             // return 0;
             if (user_id == 0) {
                 $('#assign_role_message').html('<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fas fa-times"></i> <strong>' + Globals.messaage + ':' + ' </strong>' + Globals.user_select + '</div>');
                 return false;
             }
             var roles = [];
             $('#role:checked').each(function() {
                 roles.push($(this).val());
             });
             // console.log(roles);
             // return false;
             $.ajax({
                 headers: {
                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                 },
                 url: 'assign_model_role',
                 type: 'POST',
                 dataType: 'JSON',
                 data: { user_id: user_id, roles: roles },
                 success: function(response) {
                     $('#assign_role_message').html('<div class="alert alert-success alert-dismissible fade show mb-0" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fa fa-check mx-2"></i><strong>' + Globals.message + ':' + '</strong>' + Globals.set_up + '</div>');
                 }
             })
         })
         // Assign permission to Model/User
     $('#save_permission').on('click', function(event) {
             // $( document ).delegate( "save_permission", "click", function() {
             event.preventDefault();

             var user_id = $("#user_id_for_permission").val();
             // alert(user_id);
             // return 0;
             if (user_id == 0) {
                 $('#assign_permission_message').html('<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fas fa-times"></i> <strong>' + Globals.message + ':' + '</strong>' + Globals.user_select + '</div>');
                 return false;
             }
             var permission = [];
             $('#permission:checked').each(function() {
                 permission.push($(this).val());
             });
             // console.log(user_id);
             // console.log(permission);
             // return false;
             $.ajax({
                 headers: {
                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                 },
                 url: 'assign_permission_model',
                 type: 'POST',
                 dataType: 'JSON',
                 data: { user_id: user_id, permission: permission },
                 success: function(response) {
                     $('#assign_permission_message').html('<div class="alert alert-success alert-dismissible fade show mb-0" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fa fa-check mx-2"></i><strong>' + Globals.message + ':' + '</strong>' + response.message + '</div>');
                     //   $("#div").load(" #div > *");
                 }
             })
         })
         // Permission Delete 
     function delete_permission_data(permission_id) {

         $.ajax({
             url: "permission_delete/" + permission_id,
             method: "GET",
             success: function(data) {
                 $('#permission_main_message').html('');
                 $('#permission_main_message').html('<div class="alert alert-success alert-dismissible fade show mb-0" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fa fa-check mx-2"></i>' + Globals.message + ':' + '</strong> ' + data.permission_name + ' ' + data.message + '</div>');
                 $("#permission_list").load(" #permission_list > *");
             }
         });
     }

     $(document).on('click', '.permission_delete', function() {
         var permission_id_for_modal = $(this).attr("id");
         $('#delete_id').val('');
         $('#delete_id').val(permission_id_for_modal);

         $('#delete_type').val('');
         $('#delete_type').val('permission_delete');

         $('#delete_heading').html('');
         $('#delete_heading').html(Globals.permission_delete);
         var permission_name = $('#permission_name' + permission_id_for_modal).val();
         $('#delete_msg').html(Globals.permission_delete_confirm + ':' + permission_name);

         $('#delete_modal').modal('show');
     });




     //User Create
     $('#new_user_save').on('click', function(event) {
             event.preventDefault();
             // alert("Hi");
             // return false;
             var name = $("#name").val();
             var email = $("#email").val();
             var password = $("#password").val();
             var password_confirm = $("#password-confirm").val();
             if (name == "" || email == "" || password == "" || password_confirm == "") {
                 $('#user_message').html('<h3 class="text-danger">' + Globals.all_fields_required + '</h3>');
                 return false;
             }
             if (password != password_confirm) {
                 $('#user_message').html('<h3 class="text-danger">' + Globals.password_not_match + '</h3>');
                 return false;
             }

             $.ajax({
                 headers: {
                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                 },
                 url: 'user_create',
                 type: 'POST',
                 dataType: 'JSON',
                 data: { name: name, email: email, password: password },
                 success: function(response) {
                     console.log(response.message);

                     if (response.message == 'success') {
                         $("#div").load(" #div > *");
                         $('#new_user_modal').modal('hide');
                         $('#user_main_message').html('<div class="alert alert-success alert-dismissible fade show mb-0" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fa fa-check mx-2"></i><strong>' + Globals.message + ':' + '</strong>' + Globals.user_created + '</div>');
                     } else if (response.message == 'invalid') {
                         $('#user_message').html('<h4 class="text-danger">' + Globals.email_already_database + '</h4>');
                     } else if (response.message == 'name_required') {
                         $('#user_message').html('<h4 class="text-danger">' + Globals.name_length + '</h4>');
                     } else if (response.message == 'email_required') {
                         $('#user_message').html('<h4 class="text-danger">' + Globals.email_length + '</h4>');
                     } else if (response.message == 'pass_required') {
                         $('#user_message').html('<h4 class="text-danger">' + Globals.password_length + '</h4>');
                     }
                 }
             })
         })
         //User Create End


     // Add new User
     $(document).on('click', '#create_new', function() {
         $('#user_message').html('');
         $("#user_create")[0].reset();
         $('#new_user_modal').modal('show');
     });
     // Add new user end

     //User Delete

     function delete_user_data(user_id) {
         $.ajax({
             url: "user_delete/" + user_id,
             method: "GET",
             success: function(data) {
                 $('#user_main_message').html('');
                 $('#user_main_message').html('<div class="alert alert-success alert-dismissible fade show mb-0" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fa fa-check mx-2"></i><strong>' + Globals.message + ':' + '</strong>' + data.user_name + ' ' + data.message + '</div>');
                 $("#div").load(" #div > *");
             }
         });
     }

     $(document).on('click', '.user_delete', function() {
         var user_id_for_modal = $(this).attr("id");
         $('#delete_id').val('');
         $('#delete_id').val(user_id_for_modal);
         $('#delete_type').val('');
         $('#delete_type').val('user_delete');

         $('#delete_heading').html('');
         $('#delete_heading').html(Globals.user_delete);
         var user_name = $('#user_name' + user_id_for_modal).val();
         // alert(user_name);
         // return 0;
         $('#delete_msg').html(Globals.user_delete_confirm + ': ' + user_name);

         $('#delete_modal').modal('show');
     });



     //role Delete
     function delete_role_data(role_id) {
         var role_delete_url = Globals.base_url + '/role_delete/';
         $.ajax({
             url: role_delete_url + role_id,
             method: "GET",
             success: function(response) {
                 $('#role_main_message').html('');
                 $('#role_main_message').html('<div class="alert ' + response.class_name + ' alert-dismissible fade show mb-0" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fa fa-check mx-2"></i><strong>' + Globals.message + ':' + '</strong>' + response.role_name + ' ' + response.message + '</div>');
                 $("#role_list").load(" #role_list > *");
             }
         });
     }

     $(document).on('click', '.role_delete', function() {
         var role_id_for_modal = $(this).attr("id");
         // alert(role_id_for_modal);
         // return 0;
         $('#delete_id').val('');
         $('#delete_id').val(role_id_for_modal);

         $('#delete_type').val('');
         $('#delete_type').val('role_delete');

         $('#delete_heading').html('');
         $('#delete_heading').html(Globals.role_delete);
         var role_name = $('#role_name' + role_id_for_modal).val();
         $('#delete_msg').html(Globals.role_delete_confirm + ':' + role_name);

         $('#delete_modal').modal('show');
     });

     $(document).on('click', '#delete_from_modal', function() {
         var delete_id = $('#delete_id').val();
         var delete_type = $('#delete_type').val();
         if (delete_type == 'role_delete') {
             delete_role_data(delete_id);
         } else if (delete_type == 'permission_delete') {
             delete_permission_data(delete_id);
         } else if (delete_type == 'user_delete') {
             delete_user_data(delete_id);
         }
         $('#delete_modal').modal('hide');
     })

     //role Delete End


     // User Update

     $('#update_user').on('submit', function(event) {
         event.preventDefault();
         // alert("Hi");
         // return false;
         var message_id = 'user_update_message';
         var danger_class = 'alert-danger';
         flash_message_hide()
         var fileInput = $("#image").val();

         if (fileInput != "") {
             var ext = checkFileExt(fileInput);
             if (ext == "jpg" || ext == "jpeg" || ext == "png") {

             } else {
                 error_message(message_id, danger_class, Globals.select_image);
                 return false;
             }
             var file_size = $("#image")[0].files[0].size / 1024 / 1024;
             if (file_size >= 1) {
                 alert(Globals.select_image);
                 return false;
             }

         }
         // var APP_URL = {!! json_encode(url('/')) !!}
         var APP_URL = Globals.base_url + 'update_user';
         $.ajax({
             method: 'POST',
             url: APP_URL,
             data: new FormData(this),
             dataType: 'JSON',
             processData: false,
             cache: false,
             contentType: false,
             success: function(response) {
                 if (response.message == "no_permission") {
                     error_message(message_id, danger_class, Globals.no_permission_change_email);
                 } else if (response.message == "fname_required") {
                     error_message(message_id, danger_class, Globals.fname_required);
                 } else if (response.message == "lname_required") {
                     error_message(message_id, danger_class, Globals.lname_required);
                 } else if (response.message == "full_name_required") {
                     error_message(message_id, danger_class, Globals.full_name_required);
                 } else if (response.message == "email_required") {
                     error_message(message_id, danger_class, Globals.email_required);
                 } else if (response.message == "phone_required") {
                     error_message(message_id, danger_class, Globals.phone_required);
                 } else if (response.message == "dob_required") {
                     error_message(message_id, danger_class, Globals.dob_required);
                 } else if (response.message == "image_required") {
                     error_message(message_id, danger_class, Globals.select_image);
                 } else if (response.message == "postal_required") {
                     error_message(message_id, danger_class, Globals.postal_required);
                 } else if (response.message == "exist") {
                     error_message(message_id, danger_class, Globals.email_exist);
                 } else if (response.message == "success") {
                     location.reload();
                 }
             }
         }).fail(function() {
             flash_message_hide()
             error_message(message_id, danger_class, Globals.check_internet_connection);
         });
     });

     // User Update end

     // Extention check function
     function checkFileExt(filename) {
         filename = filename.toLowerCase();
         return filename.split('.').pop();
     }
     // Extention check function End

     // Password Change
     $(document).on('click', '.password_change', function() {
         var user_id = $(this).attr("id");
         // alert(user_id);
         // return false;
         $('#change_password_message').html('');
         $('#change_pass_user_id').val(user_id);
         $('#new_password').val('');
         $('#new_password_confirm').val('');

         $('#change_password_modal').modal('show');
     });


     $('#change_password_save').on('click', function(event) {
             event.preventDefault();

             var user_id = $("#change_pass_user_id").val();
             // alert(user_id);
             // return false;
             var password = $("#new_password").val();
             var password_confirm = $("#new_password_confirm").val();
             if (password == "" || password_confirm == "") {
                 $('#change_password_message').html('<h3 class="text-danger">' + Globals.all_fields_required + '</h3>');
                 return false;
             }
             if (password != password_confirm) {
                 $('#change_password_message').html('<h3 class="text-danger">' + Globals.password_not_match + '</h3>');
                 return false;
             }

             $.ajax({
                 headers: {
                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                 },
                 url: 'change_password',
                 type: 'POST',
                 dataType: 'JSON',
                 data: { user_id: user_id, password: password },
                 success: function(response) {
                     // console.log(response.message);
                     // return false;
                     if (response.message == 'success') {
                         $('#change_password_message').html('<h3 class="text-success">' + Globals.password_changed + '</h3>');
                         $("#div").load(" #div > *");
                     } else if (response.message == 'invalid') {
                         $('#change_password_message').html('<h3 class="text-danger">' + Globals.password_length + '</h3>');
                     }
                 }
             })
         })
         // Password change End

     //Permission show by user
     $(document).on('click', '.permission_view', function() {
         $('#all_permission_show').html('');
         var user_id = $(this).attr('id');
         var user_name = $('#user_name' + user_id).val();
         $('#permission_modal_heading').html('Permissions for the user: ' + user_name);
         permission_search(user_id);
         // alert(user_name);
         // return false;
         $('#permission_show_modal').modal('show');
     });

     function permission_search(user_id) {
         var permission_search_url = Globals.base_url + 'permission_search';
         $.ajax({
             headers: {
                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
             },
             type: "post",
             url: permission_search_url,
             data: { user_id: user_id },
             dataType: "JSON",
             success: function(response) {
                 $('#total_permission').html('<h4>Total Permissions: ' + response.permission_count + '</h4>');
                 if (response.permission_implosed == '') {
                     $('#all_permission_show').html('This user has no permission');
                 } else {
                     $('#all_permission_show').html(response.permission_implosed);
                 }
             }
         });

     }
     $(document).on('click', '#single_permission_name', function(e) {
         e.preventDefault();
     });
     //Permission show by user end

     // changed password by user
     $(document).on('click', '.pc', function() {
         var user_id = $(this).attr("id");
         // alert(user_id);
         // return false;
         $('#user_change_password_message').html('');
         $('#user_id').val(user_id);
         $('#user_new_password').val('');
         $('#user_new_password_confirm').val('');

         $('#user_change_password_modal').modal('show');
     });



     $('#user_change_password_save').on('click', function(event) {
         event.preventDefault();

         var user_id = $("#user_id").val();
         // alert(user_id);
         // return false;
         var password = $("#user_new_password").val();
         var password_confirm = $("#user_new_password_confirm").val();
         // alert(password);
         // return false;
         if (password == "" || password_confirm == "") {
             $('#user_change_password_message').html('<h3 class="text-danger">' + Globals.all_fields_required + '</h3>');
             return false;
         }
         if (password != password_confirm) {
             $('#user_change_password_message').html('<h3 class="text-danger">' + Globals.password_not_match + '</h3>');
             return false;
         }

         $.ajax({
             headers: {
                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
             },
             url: 'change_password',
             type: 'POST',
             dataType: 'JSON',
             data: { user_id: user_id, password: password },
             success: function(response) {
                 // console.log(response.message);
                 // return false;
                 if (response.message == 'success') {
                     $('#user_change_password_message').html('<h3 class="text-success">' + Globals.password_changed + '</h3>');
                     $("#div").load(" #div > *");
                 } else if (response.message == 'invalid') {
                     $('#user_change_password_message').html('<h3 class="text-danger">' + Globals.password_length + '</h3>');
                 }
             }
         })
     })

     // changed password by user end 
     //    Select2 Use
     $('.js-example-basic-multiple').select2();
     $("#user_id_for_permission").change(function(e) {
         e.preventDefault();
         var user_id = $(this).val();
         if (user_id == 0) {
             $('#permissions').html(Globals.no_selected_user);
             $('#previus_permissions').html(Globals.no_selected_user);
             return 0;
         }
         var get_permission_model = Globals.base_url + 'get_permission_model';
         $.ajax({
             headers: {
                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
             },
             type: "post",
             url: get_permission_model,
             data: { user_id: user_id },
             dataType: "JSON",
             success: function(response) {
                 if (response.not_matches.length == 0) {
                     $('#permissions').html(Globals.no_pemission_left);
                 } else {
                     var html = '';
                     var not_match_permissions = response.not_matches;
                     for (var i = 0; i < not_match_permissions.length; i++) {
                         html += '<div class="checkbox">';
                         html += '<label>';
                         html += '<input type="checkbox" name="permission[]" id="permission" value="' + not_match_permissions[i].id + '" ' + ($.inArray(not_match_permissions[i].id, response.permissions_exist_id) == -1 ? '' : 'checked') + '>' + not_match_permissions[i]['name'];
                         html += '</label>';
                         html += '</div>';
                     }
                     $('#permissions').html(html);
                     // $('#save_button').html('');
                     var permissions_html = '';
                     permissions_html += '<ol>';
                     var permissions_array = response.all_permissions_for_user_array;
                     for (var j = 0; j < permissions_array.length; j++) {
                         permissions_html += '<a href="" id="single_permission_name">';
                         permissions_html += '<li>';
                         permissions_html += permissions_array[j];
                         permissions_html += '</li>';
                         permissions_html += '</a>';
                     }
                     permissions_html += '</ol>';
                     // console.log(response.all_permissions_for_user_array);
                     $('#previus_permissions').html(permissions_html);
                 }
             }
         });
     });
     $("#user_id_for_role").change(function(e) {
         e.preventDefault();
         var user_id = $(this).val();
         show_role(user_id);
     });

     function show_role(user_id) {
         $('#role').load('get_role/' + user_id);
     }


 });

 function flash_message_hide() {
     $('.alert_msg').removeClass('show');
     $('.alert_msg').addClass('hide');
 }
/*
    popup templete custom design
*/
var yes_no_confirmation_popup_template = `
        <div class="panel panel-warning nav_popup" style="margin-bottom: 2px; border: solid 2px rgb(56, 93, 138); box-shadow: 0 2px 6px #31B0D5; background:{{background}};">
            <div class="panel-body">
                <ul>
                    {{#message_list}}
                    <li>
                        {{{message}}}
                    </li>
                    {{/message_list}}
                </ul>
                <center>
                {{#button_list}}
                    {{{buttons}}}
                {{/button_list}}
                </center>
            </div>
        </div>
    `;
/*
    success popup message
*/
function success_message(message_id, class_name, message) {
    $('#navigation_message').removeClass('show').addClass('hide');
    $('#navi_icons').removeClass('show').addClass('hide');
    $('.navIcon').css('opacity', '0');
     var ide_ele = 'close_success_error_navi';
    if(class_name=='alert-success' || class_name=='alert-danger'){
        ide_ele = 'close_success_error_navi_open_default';
    }
    var message = [{ message: message }];
    var buttons = [{ buttons: '<button type="button" id="'+ide_ele+'" class="btn btn-info btn-sm">確認</button>' }];
    action_popup_navigations(message, buttons,'success_error_confirmation_popup',1);
}

/*
    Error popup message
*/
function error_message(message_id, class_name, message) {
   $('#navigation_message').removeClass('show').addClass('hide');
    $('#navi_icons').removeClass('show').addClass('hide');
    $('.navIcon').css('opacity', '0');
    var ide_ele = 'close_success_error_navi';
    if(class_name=='alert-success' || class_name=='alert-danger'){
        ide_ele = 'close_success_error_navi_open_default';
    }
    var message = [{ message: message }];
    var buttons = [{ buttons: '<button type="button" id="'+ide_ele+'" class="btn btn-info btn-sm">確認</button>' }];
    action_popup_navigations(message, buttons,'success_error_confirmation_popup',1);
}

/*
    action success or error again confirmation popup message
    //just passed message nad button like this
    var message = [{ message: message }];
    var buttons = [{ buttons: '<button type="button" id="'+ide_ele+'" class="btn btn-info btn-sm">確認</button>' }];
*/
function success_error_confirmation_popup(message = "メッセージ無し", buttons = '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">確認</button>', font_size = 20, font_color = 'red', background_color = '#dcf3f1', fade_out_time = 5000, display_positionX = 0, display_positionY = 0) {

    action_popup_navigations(message,buttons,'success_error_confirmation_popup',1);
}

/*
    editable confirmation after action popup message
    //just passed message nad button like this
    var message = [{ message: message }];
    var buttons = [{ buttons: '<button type="button" id="'+ide_ele+'" class="btn btn-info btn-sm">確認</button>' }];
*/
function editablebg_modal(message = "メッセージ無し", buttons = '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">確認</button>', font_size = 20, font_color = 'red', background_color = '#dcf3f1', fade_out_time = 5000, display_positionX = 0, display_positionY = 0) {
    action_popup_navigations(message,buttons,'editablebg_modal');
}

/*
    final navigation popup
*/
function action_popup_navigations(message = "メッセージ無し", buttons = '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">確認</button>',id_element='navigation_message',is_zindex = 0,font_size = 20, font_color = '#000', background_color = '#dcf3f1', fade_out_time = 5000, display_positionX = '15px', display_positionY = '15px'){
    $('#'+id_element).css("right", display_positionY);
    $('#'+id_element).css("bottom", display_positionX);
    if(is_zindex==1){
        $('#'+id_element).css("z-index", 9999);
    }
     var data = {
        "background": background_color,
        "font_size": font_size,
        "font_color": font_color,
        "message_list": message,
        "button_list": buttons
    }
    var html = Mustache.render(yes_no_confirmation_popup_template, data);
    $('#'+id_element).html(html);
    $('#'+id_element).removeClass('hide').addClass('show');
}
/*
    custom template popup
*/
function custom_popup_template(custom_template,data,is_zindex=0,id_element='success_error_confirmation_popup',display_positionX = '15px', display_positionY = '15px'){
    $('#'+id_element).css("right", display_positionY);
    $('#'+id_element).css("bottom", display_positionX);
    if(is_zindex==1){
        $('#'+id_element).css("z-index", 9999);
    }
    var html = Mustache.render(custom_template, data);
    $('#'+id_element).html(html);
    $('#'+id_element).removeClass('hide').addClass('show');
}
/*
    simple only html template popup
*/
function simple_custom_popup_template(custom_template,is_zindex=0,id_element='success_error_confirmation_popup',display_positionX = '15px', display_positionY = '15px'){
    $('#'+id_element).css("right", display_positionY);
    $('#'+id_element).css("bottom", display_positionX);
    if(is_zindex==1){
        $('#'+id_element).css("z-index", 9999);
    }
    var data = {};
    var html = Mustache.render(custom_template, data);
    $('#'+id_element).html(html);
    $('#'+id_element).removeClass('hide').addClass('show');
}

/*
    hide editable modal
*/
function hide_editablebg_modal(){
    $('#editablebg_modal').removeClass('show').addClass('hide');
}

/*
    hide success_error_confirmation_popup
*/
function hide_success_error_confirmation_popup(){
    $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
}

/*
    hide yes_no_confirmation_popup
*/
function hide_yes_no_confirmation_popup(){
    $('#yes_no_navigation_message').removeClass('show').addClass('hide');
}
/*
    //call this function to control navigation message and icon
    show_hide_default_navigation(0,0);//to off both navigation and navi icon
    show_hide_default_navigation(1,0);//to show only navaigation and to off navi icon
    show_hide_default_navigation(0,1);//to show only navi icon and to off navigation message
*/
function show_hide_default_navigation(message_show=1,icon_show=0){
    if(message_show==1 && icon_show==0){
        $("#navi_icons").animate({
            // width: "0px",
            opacity: 0,
            display: 'none'

        }, 500);
        $("#navigation_message").animate({
            // width: "300px",
            opacity: 1,
            display: 'block'

        }, 500);
        $('#navigation_message').removeClass('hide').addClass('show');
        $('#navi_icons').removeClass('show').addClass('hide');
    }else if(message_show==0 && icon_show==1){
        $("#navigation_message").animate({
            // width: "0px",
            opacity: 0,
            display: 'none'

        }, 500);
        $("#navi_icons").animate({
            // width: "80px",
            opacity: 1,
            display: 'block'

        }, 500);
        $('#navi_icons').removeClass('hide').addClass('show');
        $('#navigation_message').removeClass('show').addClass('hide'); 
    }else if(message_show==0 && icon_show==0){
         $("#navigation_message").animate({
            // width: "0px",
            opacity: 0,
            display: 'none'

        }, 500);
        $("#navi_icons").animate({
            // width: "80px",
            opacity: 0,
            display: 'none'

        }, 500);
        $('#navi_icons').removeClass('show').addClass('hide');
        $('#navigation_message').removeClass('show').addClass('hide');
    }else{
        $("#navi_icons").animate({
            // width: "0px",
            opacity: 0,
            display: 'none'

        }, 500);
        $("#navigation_message").animate({
            // width: "300px",
            opacity: 1,
            display: 'block'

        }, 500);
        $('#navigation_message').removeClass('hide').addClass('show');
        $('#navi_icons').removeClass('show').addClass('hide');
    }
}
$.fn.digits_vl = function () {
    return this.each(function () {
        $(this).val($(this).val().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $(this).css('text-align', 'right');
    });
}
/*
$.fn.digits_td = function() {
    return this.each(function() {
        $(this).text($(this).text().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $(this).css('text-align', 'right');
    })
}*/
$.fn.digits_td = function () {
    return this.each(function () {
        var x = $(this).text().split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        x1 = x1.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $(this).text(x1 + x2);
        $(this).css('text-align', 'right');
    })
}
$.fn.digits = function () {
    return this.each(function () {
        var x = $(this).val().split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        x1 = x1.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        $(this).val(x1 + x2);
        $(this).css('text-align', 'right');
    })
}

let tonoya_order = 0;
let maker_order = 0;
let num_order = 0;

$(document).ready(function () {
    /*test custom popu*/
    //custom_navi_design();
    //custom_navi_design2();
    $('.digits_td').digits_td();
    $('.digits').digits();
    // Initialize tooltip component
    var currentURL = window.location.href;
    var url_array = currentURL.split("/");
    var url_last_element = $(url_array).last()[0];
    var lastEl = url_array.slice(-2)[0]; // 4
    // console.log(lastEl);
    // console.log(url_last_element);
    if (url_last_element == 'vendormangementsheet') {
        var start_date = $('#vendor_start_date').val();
        var end_date = $('#vendor_end_date').val();
        get_management_vendor_data_list(vendor_id = 0, start_date, end_date, mesg_status = 0, order_by = 0);
    } else if (url_last_element == 'shipmentmangementsheet') {
        var start_date = $('#shipment_start_date').val();
        var end_date = $('#shipment_end_date').val();
        get_management_shipment_data_list(customer_id = 0, start_date, end_date, mesg_status = 0, order_by = 0);
    } else if (url_last_element == 'shipmentconfirmation') {
        get_all_customer_data_list(customer_id = 0, shop_id = null, voucher_number = null, curr_date = null, mesg_status = 0);
    } else if (url_last_element == 'receiveorder') {
        get_vendor_list_item_by_vendor_id(0, 0);
        if (url_last_element == 'receiveorder') {
            setInterval(check_is_reload_required, 10000);
        }
    } else if (url_last_element == 'vendor_master' || url_last_element == 'special_master_item') {
        get_vendor_master_item_list();
    } else if (url_last_element == 'customer_master' || url_last_element == 'shipment') {
        view_customer_master_by_customer_id(0, 0);
        if (url_last_element == 'shipment') {
            setInterval(check_is_reload_required, 200000);
        }
    } else if (url_last_element == 'manualOrder' || url_last_element == 'manualorder') {
        get_manual_order_item(0, 0);
    } else if (url_last_element == 'onlineorder') {
        get_manual_order_item(0, 0);
    } else if (url_last_element == 'warehouse') {
        filter_by_warehouse();
    } else if (url_last_element == 'stock_details_by_handy') {
        stock_details_by_handy();

    } else if (url_last_element == 'handy_stock_detail_by_jan_code') {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };
    }else if(lastEl == 'vendor_order_detail_by_tonya'){
        var vendor_id = url_last_element;
        var start_date = $('#vendor_start_date').val();
        var end_date = $('#vendor_end_date').val();
        get_management_vendor_data_list_tonya(vendor_id , start_date, end_date, mesg_status = 0, order_by = 0);
    }

    $('.change_rack_type').click(function (e) {
        var curr_status = parseInt($(this).attr('data_status'));
        if (curr_status == 1) {
            $(this).attr('data_status', 2);
            $('.select_a_rack').removeClass('show').addClass('hide');
            $('#scan_by_shelf_number').removeClass('hide').addClass('show');
        } else {
            $(this).attr('data_status', 1);
            $('#scan_by_shelf_number').removeClass('show').addClass('hide');
            $('.select_a_rack').removeClass('hide').addClass('show');

        }
    });
    $('.select_a_rack').change(function (e) {
        store_tana_update();
    });
    /*insert payment*/
    $(document).delegate('.insert_vendor_payments', 'focus', function (e) {
        $(this).select();
    })
    $(document).delegate('.insert_vendor_payments', 'keypress', function (e) {
        if (e.keyCode == 13) {
            $(this).blur();
        }
    })
    $(document).delegate('.closeZoomer', 'click', function () {
        $('#productImgZoomerModal').modal('hide');
    })
    $(document).delegate('.itemImagesContr', 'click', function () {
        var img = $(this).attr('src');
        var cost_price = $(this).attr('data_cost_price');
        var quantity = $(this).attr('data_quantity');
        console.log(img);
        console.log(cost_price);
        console.log(quantity);
        $('#productImgZoomerModal').modal('show');
        $('.productImgZoomer').attr('src',img);
        if(quantity!=''){
            $('.pPrice').text(cost_price);
            $('.pQunatity').text(quantity);
            $('.productInfo').removeClass('hide').addClass('show');
        }else{
            $('.productInfo').removeClass('show').addClass('hide');
        }
    })
    $(document).delegate('.insert_vendor_payments', 'blur', function () {
        let vendor_id = $(this).attr('data_vendor_id');
        let invoice_id = $(this).attr('data_invoice_id');
        var rowT = $(this);
        let data_current_amount = $(this).attr('data_current_amount');
        let amount = $(this).val();
        let amount_a = $('#amount_a' + invoice_id).val();
        let amount_b = $('#amount_b' + invoice_id).text();
        amount_a = amount_a.replace(',', '');
        amount_b = amount_b.replace(',', '');
        let d = parseFloat(amount_a) + parseFloat(amount_b) - amount
        if (amount > 0 && amount <= parseFloat(amount_a) + parseFloat(amount_b)) {
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                type: "POST",
                url: "vendor_payment_insert_update",
                data: {
                    invoice_id: invoice_id,
                    vendor_id: vendor_id,
                    amount: amount
                },
                dataType: "JSON",
                success: function (response) {
                    console.log(response);
                    // $('#amount_d'+invoice_id).text(d);
                    // rowT.attr('data_current_amount',amount);
                    var start_date = $('#vendor_start_date').val();
                    var end_date = $('#vendor_end_date').val();
                    get_management_vendor_data_list(vendor_id = 0, start_date, end_date, mesg_status = 0, order_by = 0);
                }
            });
        } else {
            $(this).val(data_current_amount);
        }


    })

    /*insert payment*/

    /*insert payment*/
    $(document).delegate('.vendor_due_blance', 'focus', function (e) {
        $(this).select();
    })
    $(document).delegate('.vendor_due_blance', 'keypress', function (e) {
        if (e.keyCode == 13) {
            $(this).blur();
        }
    })
    $(document).delegate('.voice_reading_text', 'keypress', function (e) {
        if (e.keyCode == 13) {
            var name = $(this).val();
            var page_url = url_search();
            
            if(page_url=='brand-order' || page_url=='brand-order#'){
                var cId_val = $('.c_ids_v').val();
                var cus_name = $('.c_ids_name').val();
                get_brand_shop_brand_list(cId_val,cus_name,name);
            }else{
                jan_list_search_by_name(name);
            }
            
        }
    })
    $(document).delegate('.vendor_due_blance', 'blur', function () {
        let vendor_id = $(this).attr('data_vendor_id');
        let invoice_id = $(this).attr('data_invoice_id');
        var rowT = $(this);
        let data_current_amount = $(this).attr('data_current_amount');
        let amount = $(this).val();
        let amount_a = $('#amount_a' + invoice_id).text();
        let amount_b = $('#amount_b' + invoice_id).text();
        amount_a = amount_a.replace(',', '');
        amount_b = amount_b.replace(',', '');
        let d = parseFloat(amount_a) + parseFloat(amount_b) - amount

        if (amount > 0) {
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                type: "POST",
                url: "vendor_due_payment_insert_update",
                data: {
                    invoice_id: invoice_id,
                    vendor_id: vendor_id,
                    amount: amount
                },
                dataType: "JSON",
                success: function (response) {
                    console.log(response);
                    // $('#amount_d'+invoice_id).text(d);
                    // rowT.attr('data_current_amount',amount);
                    var start_date = $('#vendor_start_date').val();
                    var end_date = $('#vendor_end_date').val();
                    get_management_vendor_data_list(vendor_id = 0, start_date, end_date, mesg_status = 0, order_by = 0);
                }
            });
        } else {
            $(this).val(data_current_amount);
        }


    })

    /*insert payment*/
    /*insert payment*/
    $(document).delegate('.customer_due_blance', 'focus', function (e) {
        $(this).select();
    })
    $(document).delegate('.customer_due_blance', 'keypress', function (e) {
        if (e.keyCode == 13) {
            $(this).blur();
        }
    })
    $(document).delegate('.customer_due_blance', 'blur', function () {
        let customer_id = $(this).attr('data_customer_id');
        let invoice_id = $(this).attr('data_invoice_id');
        var rowT = $(this);
        let data_current_amount = $(this).attr('data_current_amount');
        let amount = $(this).val();
        amount = amount.replace(',', '');

        if (amount > 0) {
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                type: "POST",
                url: "customer_due_payment_insert_update",
                data: {
                    customer_id: customer_id,
                    amount: amount
                },
                dataType: "JSON",
                success: function (response) {
                    // console.log(response);
                    // rowT.attr('data_current_amount',amount);
                    var start_date = $('#vendor_start_date').val();
                    var end_date = $('#vendor_end_date').val();
                    get_management_shipment_data_list(vendor_id = 0, start_date, end_date, mesg_status = 0, order_by = 0);
                }
            });
        } else {
            $(this).val(data_current_amount);
        }


    })

    /*insert payment*/
    /*insert payment*/
    /*insert payment*/
    $(document).delegate('.insert_payment_to_customer', 'focus', function (e) {
        $(this).select();
    })
    $(document).delegate('.insert_payment_to_customer', 'keypress', function (e) {
        if (e.keyCode == 13) {
            $(this).blur();
        }
    })
    $(document).delegate('.insert_payment_to_customer', 'blur', function () {
        let customer_id = $(this).attr('data_customer_id');
        let invoice_id = $(this).attr('data_invoice_id');
        var rowT = $(this);
        let data_current_amount = $(this).attr('data_current_amount');
        let amount = $(this).val();
        let amount_a = $('#amount_a' + invoice_id).val();
        let amount_b = $('#amount_b' + invoice_id).text();
        amount_a = amount_a.replace(',', '');
        amount_b = amount_b.replace(',', '');

        console.log({
            invoice_id: invoice_id,
            customer_id: customer_id,
            amount: amount
        })
        // return false
        if (amount > 0 && amount <= parseFloat(amount_a) + parseFloat(amount_b)) {
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                type: "POST",
                url: "customer_payment_insert_update",
                data: {
                    invoice_id: invoice_id,
                    customer_id: customer_id,
                    amount: amount
                },
                dataType: "JSON",
                success: function (response) {
                    console.log(response);
                    // $('#amount_d'+invoice_id).text(d);
                    // rowT.attr('data_current_amount',amount);
                    var start_date = $('#vendor_start_date').val();
                    var end_date = $('#vendor_end_date').val();
                    get_management_shipment_data_list(vendor_id = 0, start_date, end_date, mesg_status = 0, order_by = 0);
                }
            });
        } else {
            $(this).val(data_current_amount);
        }


    })

    /*insert payment*/


    $('#order_receive_date,#shipment_start_date,#shipment_end_date,#vendor_start_date,#vendor_end_date,#basic_start_date,#basic_end_date,#sale_start_date,#sale_end_date,.common_date_type_field').datepicker({
        dateFormat: 'yy/mm/dd'
    });
    $("#order_receive_date").datepicker("setDate", "1");
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
    get_v_handy();
    get_c_handy();

    /*comma separator*/
    //$('.vendor_itemdata_table tr td:nth-child(6)').digits_td();
    $('.customer_item_table_body tr td:nth-child(6)').digits_td();
    $('.customer_item_table_body tr td:nth-child(7)').digits_td();
    /*comma separator*/

    // Initialize popover component
    $(function () {
        $('[data-toggle="popover"]').popover();
    });
    $(document).delegate('.close_custom_popups', 'click', function (e) {
        e.preventDefault();
        $('.custom_popup_content').custom_popup_onoff("none");
    })
    $(document).delegate('.show_invoice_table', 'click', function (e) {
        e.preventDefault();
        get_invoice_detail();
        $('#invoice_add_updated_message').html('');
        $('#invoice_message').html('');
        $('#invoice_add_edit_modal').modal('show');
    })

    $('.update_invoice_table').on('click', function (e) {
        e.preventDefault();
        var invoice_id = $('#invoice_id').val();
        var postal_code = $('#invoice_postal_code').val();
        var tel = $('#tel').val();
        var fax = $('#fax').val();
        var address = $('#address').val();
        var company_name = $('#company_name').val();
        var bank_name = $('#bank_name').val();
        var bank_branch = $('#bank_branch').val();
        var bank_account_number = $('#bank_account_number').val();
        var bank_account_name = $('#bank_account_name').val();
        if (postal_code == '' || tel == '' || fax == '' || address == '' || company_name == '' || bank_name == '' || bank_branch == '' || bank_account_number == '' || bank_account_name == '') {
            error_message('invoice_message', 'alert-danger', 'すべての欄に入力してください')
            return false;
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "insert_invoice_data",
            data: {
                invoice_id: invoice_id,
                bank_account_name: bank_account_name,
                bank_account_number: bank_account_number,
                bank_branch: bank_branch,
                bank_name: bank_name,
                company_name: company_name,
                address: address,
                fax: fax,
                tel: tel,
                postal_code: postal_code
            },
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                if (response.message != 'success') {
                    error_message('invoice_message', response.class_name, response.message)
                    // $('#invoice_add_updated_message').html('<h3 class="' + response.class_name + '">' + response.message + '</h3>');
                } else {
                    $('#invoice_add_edit_modal').modal('hide');
                    if (invoice_id == 0) {
                        success_message('managementshipment_message', 'alert-success', 'invoice Added')
                        // $('#managementshipment_message').html('<h3 class="' + response.class_name + '">invoice Added</h3>');
                    } else {
                        success_message('managementshipment_message', 'alert-success', '請求設定を更新しました')
                        // $('#managementshipment_message').html('<h3 class="' + response.class_name + '">Invoice updated</h3>');
                    }

                }

            }
        });
    });
    $(document).delegate('.sum_of_o_d_qty', 'keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });

    $(document).delegate('.sum_of_o_d_qty', 'blur', function (e) {
        var inputs_type = $(this).attr('field_type');
        $('.sum_of_o_d_qty').removeClass('active_shipment_qty');
        if (inputs_type == 'ケース') {
            $(this).closest('tr').find('.stock_ball_qty').val('');
            $(this).closest('tr').find('.stock_unit_qty').val('');
        } else if (inputs_type == 'ボール') {
            $(this).closest('tr').find('.stock_case_qty').val('');
            $(this).closest('tr').find('.stock_unit_qty').val('');
        } else {
            $(this).closest('tr').find('.stock_case_qty').val('');
            $(this).closest('tr').find('.stock_ball_qty').val('');
        }
        $(this).addClass('active_shipment_qty');
    });

    $(document).delegate('.sum_of_o_qty', 'keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    })
    $(document).delegate('.sum_of_o_qty', 'blur', function (e) {
        $('.sum_of_o_qty').removeClass('active_order_qty');
        var delivery_qty = $(this).val();
        var inputs_type = $(this).attr('field_type');
        var customer_item_id = $(this).closest('tr').find('.gett_attr').attr('customer_item_id');
        var customer_id = $(this).closest('tr').find('.gett_attr').attr('customer_id');
        var jan = $(this).closest('tr').find('.gett_attr').attr('jan');
        var checkable_qty = 0;
        if (inputs_type == 'ケース') {
            $(this).closest('tr').find('.b_o_d_qty').val('');
            $(this).closest('tr').find('.u_o_d_qty').val('');
            checkable_qty = $('.next_row').find('.stock_case_qty').val();
        } else if (inputs_type == 'ボール') {
            $(this).closest('tr').find('.c_o_d_qty').val('');
            $(this).closest('tr').find('.u_o_d_qty').val('');
            checkable_qty = $('.next_row').find('.stock_ball_qty').val();
        } else {
            $(this).closest('tr').find('.b_o_d_qty').val('');
            $(this).closest('tr').find('.c_o_d_qty').val('');
            checkable_qty = $('.next_row').find('.stock_unit_qty').val();
        }
        $(this).addClass('active_order_qty');
        /*
                if (delivery_qty > checkable_qty) {
                    const tempmsg = {
                        exceed_over_qty: {
                            message: [
                                { message: jan + 'の商品は、在庫が足りていません。 ' }
                            ],
                            buttons: [{ button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>' }]
                        }
                    }
                    nav_width = '300px';
                    display_positionX = '15px';
                    display_positionY = '15px';
                    error_nav = view(tempmsg['exceed_over_qty'], def_center_mesg_template);
                    show_hide_nav_icn(0);
                    $(this).val('');
                    return false;
                }
                $(this).addClass('active_order_qty');
        */
    })
    $(document).delegate('.success_error_close_open_ico', 'click', function (e) {
        e.preventDefault();
        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        show_hide_default_navigation(0, 1);

    })
    $(document).delegate('.order_confirm', 'click', function (e) {
        e.preventDefault();
        var vendor_id = $('.v_ids_v').val();
        if (vendor_id == 0) {
            $('#navigation_message').removeClass('show').addClass('hide');
            var message = [{message: '仕入先を選択してください'}];
            var buttons = [{buttons: '<button type="button" class="btn success_error_close_open_ico btn-info btn-sm">確認</button>'}]
            success_error_confirmation_popup(message, buttons);
            return false;
        }
        var id = vendor_id;
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "receive_order_query/" + id,
            type: "GET",
            dataType: "JSON",
            success: function (response) {
                var htmls = '<tr><td colspan="6" style="text-align:center;">No Record Found</td></tr>';
                if (response) {
                    $(".receive_order_list").html("");
                    var htmls = '';
                    $.each(response, function (idx, obj) {
                        console.log(obj);
                        var comapre_qty = 0;
                        if (obj.order_point_inputs == 'ケース') {
                            comapre_qty = obj.case_quantity;
                        } else if (obj.order_point_inputs == 'ボール') {
                            comapre_qty = obj.ball_quantity;
                        } else {
                            comapre_qty = obj.unit_quantity;
                        }
                        if (obj.order_point_quantity >= comapre_qty) {
                            htmls +=
                                '<tr class="rows_order"><td vendor_item_id="' +
                                obj.vendor_item_id + '" class="recev_order_list">' +
                                obj.item_name + '</td><td>' + obj.jan + '</td><td>' + obj.vendor_name +
                                '</td><td>' + obj.order_lot_inputs +
                                '</td><td vendor_item_id="' +
                                obj.vendor_item_id +
                                '" vendor_id="' +
                                obj.vendor_id +
                                '" contenteditable="true" type="tel">' +
                                obj.order_lot_quantity +
                                '</td><td><a href="#" vendor_item_id="' +
                                obj.vendor_item_id +
                                '" class="remove_order_from_list"><i class="material-icons">delete_forever</i></a></td></tr>';
                        }
                    });

                }
                $(".receive_order_list").html(htmls);
            }
        });
        $("#add_receive_order_modal").modal("show");
    });

    $(document).delegate('.update_receive_order_info', 'click', function (e) {
        e.preventDefault();
        var shipment_date = $('#order_receive_date').val();
        var voucher_number = Math.floor(100000 + Math.random() * 900000);
        var data_array = [];
        $('.rows_order').each(function () {
            var unit_type = $(this).find("td:nth-child(4)").text();
            var quantity = $(this).find("td:nth-child(5)").text();
            var vendor_id = $(this).find("td:nth-child(5)").attr('vendor_id');
            var vendor_item_id = $(this).find("td:nth-child(5)").attr('vendor_item_id');
            if (data_array.length != 0) {
                if (vendor_id == data_array[data_array.length - 1][2]) {
                    voucher_number = voucher_number;
                } else {
                    voucher_number = Math.floor(100000 + Math.random() * 900000);
                }
            } else {
                voucher_number = voucher_number;
            }
            var single_data = [
                quantity,
                unit_type,
                vendor_id,
                vendor_item_id,
                shipment_date,
                voucher_number

            ];
            data_array.push(single_data);
            // console.log(data_array.length);

        });
        // console.log(data_array);
        // console.log(data_array.length);
        // return 0;

        // Ajax
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "vendor_order_insert",
            type: "POST",
            dataType: "JSON",
            data: {data_array: data_array},
            success: function (response) {
                console.log(response);
                // $('#add_receive_order_modal').modal('hide');
                location.reload(true);
            }
        });
        // Ajax
    })

    $(document).delegate('.vendor_arival_add', 'click', function (e) {
        e.preventDefault();
        var v_no = $('#v_no').val();
        var vname = $('#vname').val();

        if (v_no != '' && vname != '') {
            $('.vendor_order_list_area').removeClass('show').addClass('hide');
            $('.vendor_order_arival_form ').removeClass('hide').addClass('show');
            $('#vjcode').focus();
            $('#vjcode').blur();
        } else {
            alert('伝票番号をスキャンしてください');
        }

    });

    $(document).delegate('.add_customer_order_item_by_voucher', 'click', function (e) {
        e.preventDefault();
        var v_no = $('#slf_no').val();
        var cname = $('#cname').val();

        if (v_no != '' && cname != '') {
            $('.shipment_table_area').removeClass('show').addClass('hide');
            $('.shipment_order_form_by_voucher ').removeClass('hide').addClass('show');

            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                url: "get_customer_order_by_voucer",
                type: "POST",
                dataType: "JSON",
                data: {
                    voucher_number: v_no,
                    status: 1
                },
                success: function (response) {
                    console.log('success');
                    $('#jcode').focus();
                    $('#jcode').blur();
                }
            });


        } else {
            alert('出荷番号をスキャンしてください');
        }

    });

    $('#expire_date').on("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            e.stopPropagation();
            $('#bin').focus();
            $('#bin').blur();
            e.preventDefault();
        }
    })

    $('#jan_code').on("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    })

    $('#expire_date').on("change", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#bin').focus();
        $('#bin').blur();
        e.preventDefault();
    })
    $('.vendor_arival_insert').on('click', function (e) {

        e.preventDefault();
        var vjcode = $('#vjcode').val();
        var pname = $('#pname').val();
        var c_quantity = $('#c_quantity').val();
        var expire_date = $('#expire_date').val();
        var bin = $('#bin').val();
        var v_no = $('#v_no').val();
        var vendor_id = $('#vname').attr('vendor_id');
        if (vjcode == '') {
            alert('jan code required');
            return false;
        }
        if (c_quantity == '') {
            alert('quantity required');
            return false;
        }
        if (expire_date == '') {
            alert('Expire date required');
            return false;
        }
        if (bin == '') {
            alert('self no required');
            return false;
        }
        if (v_no == '') {
            alert('伝票番号を入力してください');
            return false;
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "vendor_arival_insert",
            type: "POST",
            dataType: "JSON",
            data: {
                jan_code: vjcode,
                pname: pname,
                c_quantity: c_quantity,
                expire_date: expire_date,
                bin: bin,
                v_no: v_no,
                vendor_id: vendor_id,
            },
            success: function (response) {
                if (response.message == 'stock_item_exists') {
                    alert('stock item already exists');
                } else {
                    var is_finsished = $('.totall_row').val();
                    var result_list = is_finsished - 1;
                    $('.totall_row').val(result_list);
                    $('#vjcode').val('');
                    $('#vjcode').focus();
                    $('#vjcode').blur();
                    $('#pname').val('');
                    $('#c_quantity').val('');
                    $('#expire_date').val('');
                    $('#bin').val('');

                    if (result_list == 0) {
                        /*create vendor invoice*/
                        $.ajax({
                            headers: {
                                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                            },
                            url: "create_vendor_invoice_by_voucher",
                            type: "post",
                            dataType: "JSON",
                            data: {v_no: v_no, vendor_id: vendor_id},
                            success: function (response) {
                                console.log(response);
                            }
                        });
                        /*create vendor invoice*/
                        handy_page_popup('', "受信完了");
                    }


                }
            }
        })
    });
    $('#vendor_arival_insert_recv_order').on('click', function (e) {

        e.preventDefault();
        var vjcode = $('#vendor_master_jancode').val();
        var inputs_type = $('.order_inputs_quantitys').attr('data_inputs_type');
        var pname = $('.product_name_aria').text();
        var rack_status = $('.change_rack').attr('rect_status');
        var c_quantity = 0;
        // if (inputs_type == 'ケース') {
        //     c_quantity = $('.case_invent_order').val();
        // } else if (inputs_type == 'ボール') {
        //     c_quantity = $('.bol_invent_order').val();
        // } else if (inputs_type == 'バラ') {
        //     c_quantity = $('.individual_invent_order').val();
        // }
        c_quantity = $('.receive_quantity').val();
        var expire_date = $('#expire_date').val();
        var bin = $('#car_rack_code').val();
        /*
        if (rack_status == 0) {
            var bin = $('#reck_code').val();
        } else {
            var bin = $('.reck_number').val();
        }
*/
        var quantity = $('.order_inputs_quantitys').val();
        var vendor_order_detail_id = $('.order_inputs_quantitys').attr('vendor_order_detail_id');
        var vendor_order_id = $('.order_inputs_quantitys').attr('vendor_order_id');
        var vendor_id = $('.order_inputs_quantitys').attr('vendor_id');
        var vendor_item_id = $('.order_inputs_quantitys').attr('vendor_item_id');
        if (bin == '') {
            alert('棚番号を選択してください');
            return false;
        }
        if (vjcode == '') {
            alert('jan code required');
            return false;
        }
        if (c_quantity == '') {
            alert('必要な数量');
            return false;
        }
        if (expire_date == '') {
            alert('有効期限が必要です');
            return false;
        }

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "vendor_arival_insert_handy_receiveorder",
            type: "POST",
            dataType: "JSON",
            data: {
                jan_code: vjcode,
                pname: pname,
                c_quantity: c_quantity,
                expire_date: expire_date,
                bin: bin,
                vendor_id: vendor_id,
                vendor_item_id: vendor_item_id,
                vendor_order_id: vendor_order_id,
                vendor_order_detail_id: vendor_order_detail_id,
                inputs_type: inputs_type,
            },
            success: function (response) {
                // console.log(response);
                window.location.href = 'handy_order_receive_scan_jan';
                // if (response.totals == 0) {
                //     window.location.href = 'handy_order_receive_list';
                // }
                if (response.message == 'stock_item_exists') {
                    alert('stock item already exists');
                } else {
                    $('#reck_code').val('');
                    $('#vendor_master_jancode').val('');
                    $('#reck_code').focus();
                    $("#search_product_name").html('<span style="color: #999; font-size: 30px;">商品名</span>');
                    $('.order_quantity').val('');
                    $('.receive_quantity').val('');
                    $('.common_state').text('ケース');
                    $('#expire_date').val('');

                    // $('.reck_number').html('');
                    // $('#reck_code').removeClass('hide').addClass('show');
                    // $('.reck_number').removeClass('show').addClass('hide');
                    // $('.change_rack').attr('rect_status', 0);
                    // $('.change_rack').text('新規');
                    $('#vendor_arival_insert_recv_order').css({'border': 'none', 'box-shadow': 'none'});
                    $('input,select,button').removeClass('active_input');
                    $('#reck_code').addClass('active_input');
                    // $('.reck_number').css({ 'border': 'none', 'box-shadow': 'none' });
                    if (response.create_invoice == 1) {
                        /*create vendor invoice*/
                        console.log('invoice created');
                    }
                }
            }
        })
    });

    $('#handy_shipment_item_insert').on('click', function (e) {

        e.preventDefault();
        var vjcode = $('#shipment_master_jancode').val();
        var inputs_type = $('.order_inputs_quantitys').attr('data_inputs_type');
        var pname = $('.product_name_aria').text();
        var c_quantity = 0;
        var rack_number = $('.note_2').val();
        c_quantity = $('.receive_quantity').val();
        var quantity = $('.order_inputs_quantitys').val();
        var customer_order_detail_id = $('.order_inputs_quantitys').attr('customer_order_detail_id');
        var customer_order_id = $('.order_inputs_quantitys').attr('customer_order_id');
        var customer_id = $('.order_inputs_quantitys').attr('customer_id');
        var customer_item_id = $('.order_inputs_quantitys').attr('customer_item_id');
        var customer_shipment_id = $('.order_inputs_quantitys').attr('customer_shipment_id');
        if (vjcode == '') {
            $('.handy_error_msg').text('jan code ください。');
            $('.handdy_error').removeClass('hide').addClass('show');
            return false;
        }
        if (c_quantity == '') {
            $('.handy_error_msg').text('数量入力してください。');
            $('.handdy_error').removeClass('hide').addClass('show');
            return false;
        }
        if (rack_number == '') {
            $('.handy_error_msg').text('棚番号入力してください。');
            $('.handdy_error').removeClass('hide').addClass('show');
            return false;
        }

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "shipment_arival_insert_handy_shipmentorder",
            type: "POST",
            dataType: "JSON",
            data: {
                jan_code: vjcode,
                pname: pname,
                c_quantity: c_quantity,
                customer_id: customer_id,
                customer_item_id: customer_item_id,
                customer_order_id: customer_order_id,
                customer_order_detail_id: customer_order_detail_id,
                inputs_type: inputs_type,
                customer_shipment_id: customer_shipment_id,
                rack_number: rack_number
            },
            success: function (response) {
                console.log(response);
                if (response.message == 'stock_over_qty') {
                    $('.handy_error_msg').text('在庫量不足。');
                    $('.handdy_error').removeClass('hide').addClass('show');
                    return false;
                } else {
                    window.location.href = 'handy_order_shipment_scan_sohin';
                    $('#shipment_master_jancode').val('');
                    $('.note_2').focus();
                    $("#search_product_name").html('<span style="color: #999; font-size: 30px;">商品名</span>');
                    $('.case_invent_order').val('');
                    $('.bol_invent_order').val('');
                    $('.individual_invent_order').val('');
                    $('.case_law_qty').val('');
                    $('.bol_law_qty').val('');
                    $('.shipment_note_1').val('');
                    $('.note_2').val('');
                    $('.order_quantity').val('');
                    $('.receive_quantity').val('');
                    $('input,select,button').removeClass('active_input');
                    $('.note_2').addClass('active_input');
                }
            }
        })
    });

    $(document).delegate('.remove_order_from_list', 'click', function (e) {
        e.preventDefault();
        $(this).closest('tr').remove();
    })

    $(document).delegate('.vendor_list_show_popup', 'click', function (e) {

        close_all_navi_msg();
        show_hide_nav_icn(0);
        get_vendor_list();

        $("#vendor_message_success").html("");
        $("#vendor_show_modal").modal("show");
    });
    $(document).delegate('.show_tonya_list_for_haccu', 'click', function (e) {

        close_all_navi_msg();
        show_hide_nav_icn(0);
        get_tonya_list();

        $("#vendor_message_success").html("");
        $("#vendor_show_modal").modal("show");
    });

    $(document).delegate('.customer_list_show_popup', 'click', function (e) {
        close_all_navi_msg();
        show_hide_nav_icn(0);
        get_customer_list();
        $('#customer_message_success').html('');
        $("#add_customer_message").html('');
        $("#update_customer_message_fail").html('');
        $("#customer_show_modal").modal("show");
    });

    $(document).delegate('.add_new_vendor', 'click', function (e) {
        e.preventDefault();
        $("#vendor_show_modal").modal("hide");
        $("#vendor_reg_modal").modal("show");
        $("#vendor_name").val("");
        $("#vendor_code").val("");
        $("#vendor_phone").val("");
        $("#add_vendor_error").html("");
        $("#vendor_message_success").html("");
    });

    $(document).delegate('.add_new_customer', 'click', function (e) {
        e.preventDefault();
        $("#customer_show_modal").modal("hide");
        $("#customers_reg_modal").modal("show");
        $("#customer_name").val("");
        $("#customer_code").val("");
        $("#customer_phone").val("");
        $("#add_customer_message").html("");
    });

    $(".close_vendor_reg_update").click(function (e) {
        e.preventDefault();
        $("#vendor_show_modal").modal("show");
        $("#vendor_reg_modal").modal("hide");
        $("#vendor_update_modal").modal("hide");
    });

    $(".close_vendor_reg_update_inner_page").click(function (e) {
        e.preventDefault();
        $("#vendor_reg_modal_inner_page").modal("hide");
        $("#vendor_update_modal").modal("hide");
        get_vendor_master_item_list();
    });

    $(".close_customer_reg_update").click(function (e) {
        e.preventDefault();
        $("#customer_show_modal").modal("show");
        $("#customers_reg_modal").modal("hide");
        $("#customers_update_modal").modal("hide");
    });
    $(document).delegate(".vendor_info_edit", "click", function (e) {
        e.preventDefault();
        var vendor_id = $(this).attr("data_vendor_id");
        get_vendor_list(vendor_id);
        $("#vendor_show_modal").modal("hide");
        $("#vendor_update_modal").modal("show");
    });
    $(document).delegate(".customer_info_edit", "click", function (e) {
        e.preventDefault();
        $('#customer_message_success').html('');
        $("#add_customer_message").html('');
        $("#update_customer_message_fail").html('');
        var customer_id = $(this).attr("data_customer_id");
        get_customer_list(customer_id);
        $("#customer_show_modal").modal("hide");
        $("#customers_update_modal").modal("show");
    });

    /*dele customr and vendor*/
    $(document).delegate(".delete_vendor_info", "click", function (e) {
        e.preventDefault();
        show_hide_default_navigation(0, 0);
        var vendor_id = $(this).attr("data_vendor_delete_id");
        var message = [{message: 'この仕入先を削除しますか？'}];
        var buttons = [{buttons: '<button type="button" data_vendor_delete_id="' + vendor_id + '" class="btn btn-danger delete_vendor_info_ok btn-sm">はい</button>'}, {buttons: '<button type="button" id="close_success_error_navi_open_default" class="btn btn-info btn-sm">いいえ</button>'}]
        success_error_confirmation_popup(message, buttons);
    });
    $(document).delegate(".delete_custmer_info", "click", function (e) {
        e.preventDefault();
        show_hide_default_navigation(0, 0);
        var customer_id = $(this).attr("data_customer_delete_id");
        var message = [{message: 'この販売先を削除しますか？'}];
        var buttons = [{buttons: '<button type="button" data_customer_delete_id="' + customer_id + '" class="btn btn-danger delete_custmer_info_ok btn-sm">はい</button>'}, {buttons: '<button type="button" id="close_success_error_navi_open_default" class="btn btn-info btn-sm">いいえ</button>'}]
        success_error_confirmation_popup(message, buttons);
    });

    $(document).delegate(".delete_vendor_info_ok", "click", function (e) {
        e.preventDefault();
        var vendor_id = $(this).attr("data_vendor_delete_id");
        delete_customer_vendor(vendor_id, 1);

    });
    $(document).delegate(".delete_custmer_info_ok", "click", function (e) {
        e.preventDefault();
        var customer_id = $(this).attr("data_customer_delete_id");
        delete_customer_vendor(customer_id, 2);

    });
    /*dele customr and vendor*/

    // brand order
    $('.brand-order-search').blur(function (e) {
        let val = $(this).val();
        let data_type = $(this).attr('data-type')
        searchBrandOrderByText(val)
        if (data_type == 'jan'){

        } else {
            // searchBrandOrderByText(val)
        }

    })


    /*vendor add update delete*/
    $(".add_vendor_regs").click(function (e) {
        e.preventDefault();

        var vendor_name = $("#vendor_name").val();
        var vendor_code = $("#vendor_code").val();
        var vendor_phone = $("#vendor_phone").val();
        var vendor_id = null;
        var user_type = 1;
        if (vendor_name == "" || vendor_code == "" || vendor_phone == "") {
            error_message('add_vendor_error', 'alert-danger', Globals.vendor_reg_error);
            return false;
        }

        if (vendor_phone.length < 6) {
            error_message('add_vendor_error', 'alert-danger', '電話番号を入力してください');
            return false;
        }

        vendor_add_edit(
            vendor_id,
            vendor_name,
            vendor_code,
            vendor_phone,
            user_type
        );
    });
    $(".add_vendor_regs_inner_page").click(function (e) {
        e.preventDefault();

        var vendor_name = $("#vendor_name_m").val();
        var vendor_code = $("#vendor_code_m").val();
        var vendor_phone = $("#vendor_phone_m").val();
        var vendor_item_id = $('.inner_page_vendor_item_id').val();
        var maker_id = $('.inner_page_maker_id').val();
        var vendor_id = null;
        var user_type = 1;
        if (vendor_name == "" || vendor_code == "" || vendor_phone == "") {
            error_message('add_vendor_error', 'alert-danger', Globals.vendor_reg_error);
            return false;
        }

        if (vendor_phone.length < 6) {
            error_message('add_vendor_error', 'alert-danger', '電話番号を入力してください');
            return false;
        }

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "vendor_add_edit",
            type: "POST",
            dataType: "JSON",
            data: {
                vendor_item_id: vendor_item_id,
                vendor_id: vendor_id,
                vendor_name: vendor_name,
                vendor_code: vendor_code,
                vendor_phone: vendor_phone,
                maker_id: maker_id
            },
            success: function (response) {
                console.log(response);
                if (vendor_id == null) {
                    if (response.message == "name_required" || response.message == "vendor_code_required" || response.message == "phone_required" || response.message == 'code_exists') {
                        //error_message('add_vendor_error', 'alert-danger', response.message);
                        const tempmsg = {
                            exceed_overs_qty: {
                                message: [
                                    {message: 'スーパーようコードはすでに存在するか、より多くの情報が必要です'}
                                ],
                                buttons: [{button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
                            }
                        }
                        nav_width = '300px';
                        display_positionX = '15px';
                        display_positionY = '15px';
                        error_nav = view(tempmsg['exceed_overs_qty'], def_center_mesg_template);
                        show_hide_nav_icn(0);
                        return false;
                    }
                    //success_message('vendor_message_success', 'alert-success', '登録が完了しました');
                    $("#vendor_reg_modal_inner_page").modal("hide");
                    get_vendor_master_item_list();
                } else {

                    if (response.message == 'code_exists') {
                        error_message('add_vendor_error', 'alert-danger', 'Vendor partner code exists');
                        const tempmsg = {
                            exceed_overs_qty: {
                                message: [
                                    {message: 'スーパーようコードはすでに存在します'}
                                ],
                                buttons: [{button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
                            }
                        }
                        nav_width = '300px';
                        display_positionX = '15px';
                        display_positionY = '15px';
                        error_nav = view(tempmsg['exceed_overs_qty'], def_center_mesg_template);
                        show_hide_nav_icn(0);
                        return false;
                    } else {
                        success_message('vendor_message_success', 'alert-success', '変更しました');
                    }
                    $("#vendor_reg_modal_inner_page").modal("hide");
                }

                //$(this).find('[value="'+response.vendor_id+'"]').replaceWith('<option selected value="'+response.vendor_id+'">'+e.params.data.text+'</option>');
            }
        });
    });

    $(".update_vendor_info").click(function (e) {
        e.preventDefault();

        var vendor_id = $("#vendor_id_update").val();
        var vendor_name = $("#vendor_name_update").val();
        var vendor_code = $("#vendor_code_update").val();
        var vendor_phone = $("#vendor_phone_update").val();
        var user_type = 1;
        if (vendor_name == "" || vendor_code == "" || vendor_phone == "") {
            error_message('update_vendor_message_fail', 'alert-danger', Globals.vendor_update_error);
            return false;
        }

        if (vendor_phone.length < 6) {
            error_message('update_vendor_message_fail', 'alert-danger', '電話番号を入力してください');
            return false;
        }

        vendor_add_edit(
            vendor_id,
            vendor_name,
            vendor_code,
            vendor_phone,
            user_type
        );
    });
    /*vendor add update delete*/

    /*customer add update delete*/
    $(".add_customer_info").click(function (e) {
        e.preventDefault();
        $('#customer_message_success').html('');
        $("#add_customer_message").html('');
        var customer_name = $("#customer_name").val();
        var customer_code = $("#customer_code").val();
        var customer_phone = $("#customer_phone").val();
        var customer_id = null;
        var user_type = 2;
        if (
            customer_name == "" ||
            customer_code == "" ||
            customer_phone == ""
        ) {
            error_message('add_customer_message', 'alert-danger', Globals.customer_reg_error);
            return false;
        }

        if (customer_phone.length < 6) {
            error_message('add_customer_message', 'alert-danger', '電話番号を入力してください');
            return false;
        }
        customer_add_edit(
            customer_id,
            customer_name,
            customer_code,
            customer_phone,
            user_type
        );
    });

    $(".update_customer_info").click(function (e) {
        e.preventDefault();
        $('#customer_message_success').html('');
        $("#add_customer_message").html('');
        $("#update_customer_message_fail").html('');
        var customer_id = $("#customer_id_update").val();
        var customer_name = $("#customer_name_update").val();
        var customer_code = $("#customer_code_update").val();
        var customer_phone = $("#customer_phone_update").val();
        var user_type = 2;
        if (
            customer_name == "" ||
            customer_code == "" ||
            customer_phone == ""
        ) {
            error_message('update_customer_message_fail', 'alert-danger', Globals.customer_update_error);
            return false;
        }

        if (customer_phone.length < 6) {
            error_message('update_customer_message_fail', 'alert-danger', '電話番号を入力してください');
            return false;
        }

        customer_add_edit(
            customer_id,
            customer_name,
            customer_code,
            customer_phone,
            user_type
        );
    });
    /*customer add update delete*/

    //add vendor
    function vendor_add_edit(
        vendor_id = null,
        vendor_name = null,
        vendor_code = null,
        vendor_phone = null,
        user_type = null
    ) {

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "vendor_add_edit",
            type: "POST",
            dataType: "JSON",
            data: {
                vendor_id: vendor_id,
                vendor_name: vendor_name,
                vendor_code: vendor_code,
                vendor_phone: vendor_phone,
                user_type: user_type
            },
            success: function (response) {
                // console.log(response);
                // return 0;
                get_vendor_list();
                if (vendor_id == null) {
                    if (response.message == "name_required" || response.message == "vendor_code_required" || response.message == "phone_required") {
                        error_message('add_vendor_error', 'alert-danger', response.message);
                        return 0;
                    }
                    success_message('vendor_message_success', 'alert-success', '登録が完了しました');
                    $("#vendor_show_modal").modal("show");
                    $("#vendor_reg_modal").modal("hide");
                } else {

                    if (response.message == 'code_exists') {
                        error_message('add_vendor_error', 'alert-danger', 'Vendor partner code exists');
                        return 0;
                    } else {
                        success_message('vendor_message_success', 'alert-success', '変更しました');
                    }
                    $("#vendor_show_modal").modal("show");
                    $("#vendor_update_modal").modal("hide");
                }
            }
        });
    }

    //add customer

    function customer_add_edit(
        vendor_id = null,
        vendor_name = null,
        vendor_code = null,
        vendor_phone = null,
        user_type = null
    ) {
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "customer_add_edit",
            type: "POST",
            dataType: "JSON",
            data: {
                customer_id: vendor_id,
                customer_name: vendor_name,
                customer_code: vendor_code,
                customer_phone: vendor_phone,
                user_type: user_type
            },
            success: function (response) {
                get_customer_list();
                if (vendor_id == null) {
                    $("#customer_show_modal").modal("show");
                    $("#customers_reg_modal").modal("hide");
                    success_message('customer_message_success', 'alert-success', '登録が完了しました')
                    // $("#customer_message_success").html(
                    //     '<div class="alert alert-success alert-dismissible fade show mb-0" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fa fa-check mx-2"></i><strong>' +
                    //     Globals.message +
                    //     ":" +
                    //     "</strong>" +
                    //     Globals.customer_add_success +
                    //     "</div>"
                    // );
                } else {
                    $("#customer_show_modal").modal("show");
                    $("#customers_update_modal").modal("hide");
                    success_message('customer_message_success', 'alert-success', '変更しました')
                    // $("#customer_message_success").html(
                    //     '<div class="alert alert-success alert-dismissible fade show mb-0" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fa fa-check mx-2"></i><strong>' +
                    //     Globals.message +
                    //     ":" +
                    //     "</strong>" +
                    //     Globals.customer_update_success +
                    //     "</div>"
                    // );
                }
            }
        });
    }


    function get_tonya_list(vendor_id = null) {
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: Globals.base_url + "/vendorList",
            type: "get",
            dataType: "JSON",
            success: function (response) {
                if (vendor_id == null) {
                    $(".vendor_list_item").html("");
                    var htmls = '';
                    //var htmls ='<tr><td colspan="3" data_vendor_id="0" class="filter_by_vendor_id" style="text-align:center;">全仕入先</td></tr>';
                    $.each(response.all_vendor_list, function (idx, obj) {
                        htmls +=
                            '<tr><td data_vendor_id="' +
                            obj.vendor_id + '" class="filter_by_tonya_id"><a href="' + Globals.base_url + '/haccu-list-by-tonya/' + obj.vendor_id + '">' +
                            obj.name +
                            "</a></td><td>" +
                            obj.phone +
                            '</td><td>' + obj.partner_code + '</td></tr>';
                    });
                    var last_urls = url_search();
                    if (last_urls != 'vendor_master') {
                        $('.add_new_vendor').hide();
                    }
                    $(".vendor_list_item").html(htmls);
                } else {
                    $(".delete_vendor_info").attr(
                        "data_vendor_delete_id",
                        response.specific_vendor_info.vendor_id
                    );
                    $("#vendor_id_update").val(
                        response.specific_vendor_info.vendor_id
                    );
                    $("#vendor_name_update").val(
                        response.specific_vendor_info.name
                    );
                    $("#vendor_code_update").val(
                        response.specific_vendor_info.partner_code
                    );
                    $("#vendor_phone_update").val(
                        response.specific_vendor_info.phone
                    );
                }
            }
        });
    }

    function get_invoice_detail(invoice_id = null) {
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "get_invoice_detail",
            type: "post",
            dataType: "JSON",
            data: {invoice_id: invoice_id},
            success: function (response) {
                console.log(response);
                $('#invoice_id').val(response.invoice_id);
                $('#invoice_postal_code').val(response.postal_code);
                $('#tel').val(response.tel);
                $('#fax').val(response.fax);
                $('#address').val(response.address);
                $('#company_name').val(response.company_name);
                $('#bank_name').val(response.bank_name);
                $('#bank_branch').val(response.bank_branch);
                $('#bank_account_number').val(response.bank_account_number);
                $('#bank_account_name').val(response.bank_account_name);
            }
        });
    }

    function delete_customer_vendor(id, types) {
        if (types == 1) {
            var urls = "vendor_delete";
        } else {
            var urls = "customer_delete";
        }

        if (types == 1) {
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    )
                },
                url: urls,
                type: "POST",
                dataType: "JSON",
                data: {vendor_id: id},
                success: function (response) {
                    get_vendor_list();
                    $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
                    $("#vendor_show_modal").modal("show");
                    $("#vendor_update_modal").modal("hide");
                    success_message('vendor_message_success', 'alert-success', Globals.vendor_delete_success)

                }
            });
        } else {
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $(
                        'meta[name="csrf-token"]'
                    ).attr("content")
                },
                url: urls,
                type: "POST",
                dataType: "JSON",
                data: {customer_id: id},
                success: function (response) {
                    get_customer_list();
                    $("#yes_no_confirmation_modal").modal("hide");
                    $("#customer_show_modal").modal("show");
                    $("#customers_update_modal").modal("hide");
                    success_message('customer_message_success', 'alert-success', Globals.customer_delete_success)

                }
            });
        }


    }

    $(document).delegate(".add_customer_item", "click", function (e) {
        $('#customer_item_ins_up_error').html('');
        var c_list_item_id = $(this).attr('data_customer_list_item_id');
        var vendor_id = null;
        var customer_id = $('.c_ids_v').val();
        var basic_shows_cost = '';
        var sale_shows_cost = '';
        var basic_shows_sell = '';
        var sale_shows_sell = '';
        if ($('.customer_basic_sale_mode_cost_price').is(':checked')) {
            var basic_shows_cost = 'show';
            var sale_shows_cost = 'hide';
        } else {
            var basic_shows_cost = 'hide';
            var sale_shows_cost = 'show';
        }

        if ($('.customer_basic_sale_mode_sale_price').is(':checked')) {
            var basic_shows_sell = 'show';
            var sale_shows_sell = 'hide';
        } else {
            var basic_shows_sell = 'hide';
            var sale_shows_sell = 'show';
        }

        get_c_list(customer_id);
        get_v_list(vendor_id);

        var tr_rows_add = '<tr class="active_edit">';
        tr_rows_add += '<td></td>';
        tr_rows_add += '<td><select class="form-control customer_list_item_select_field" name="c_name" id="c_name"></select></td>';
        tr_rows_add += '<td><select class="form-control vendor_list_item_select_field" name="v_name" id="v_name"></select></td>';
        tr_rows_add += '<td><div class="form-group"><div class="ui-widget"><select class="combobox"></select></div></div></td>';
        tr_rows_add += '<td><input type="text" class="form-control" id="customer_item_name" name="customer_item_name" value="" readonly></td>';
        tr_rows_add += '<td><input type="number" class="form-control" id="c_qty" name="c_qty" value="" readonly></td>';
        tr_rows_add += '<td><input type="number" class="form-control" id="b_qty" name="b_qty" value="" readonly></td>';
        tr_rows_add += '<td><input type="number" class="form-control common_price cost_price ' + basic_shows_cost + '" id="c_price" name="c_price" value="" readonly><input type="number" class="form-control common_price sale_cost_price ' + sale_shows_cost + '" id="s_c_price" name="s_c_price" value="" readonly></td>';
        tr_rows_add += '<td><input type="number" class="form-control common_price selling_price ' + basic_shows_sell + '" id="c_selling_price" name="c_selling_price" value=""><input type="number" class="form-control common_price sale_selling_price ' + sale_shows_sell + '" id="sale_c_selling_price" name="sale_c_selling_price" value=""></td>';
        tr_rows_add += '<td></td>';
        tr_rows_add += '<td></td>';
        tr_rows_add += '<td><input type="tel" class="form-control common_date_type_field" id="c_i_start_date" name="c_i_start_date" value="" placeholder="開始"><input type="tel" class="form-control common_date_type_field" id="c_i_end_date" name="c_i_end_date" value="" placeholder="終了"></td>';

        tr_rows_add += '<tr>';

        $('.customer_item_table_body').prepend(tr_rows_add);
        $("#c_name").prop('disabled', false);
        $("#v_name").prop('disabled', false);
        $(".combobox").combobox();
        $('.custom-combobox-input').attr('readonly', false);
        $('.custom-combobox-toggle').on('click');
        $('.common_date_type_field').datepicker();
        show_hide_default_navigation(0, 0);
        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        var message = [{message: '商品登録：完了を押すと、登録されます。'}];
        var buttons = [{buttons: '<button type="button" data_c_item_id="0" class="btn btn-info add_done_btn update_customer_item_data btn-sm">完了</button>'}, {buttons: '<button type="button" class="btn btn-danger cancel_new_customer_item_dta btn-sm">キャンセル</button>'}]
        editablebg_modal(message, buttons);
        return false;
        if (c_list_item_id == 0) {
            $('#customer_item_form')[0].reset();
            $("#c_name").prop('disabled', false);
            $("#v_name").prop('disabled', false);
            $('.custom-combobox-input').attr('readonly', false);
            $('.custom-combobox-toggle').on('click');
            $('.add_customer_item_data').remove();
            $('.c_item_title').text('新規商品登録');
            var edit_delete_btn = '<button type="button" data_c_item_id="' + c_list_item_id + '" class="btn btn-success update_customer_item_data">追加</button><button type="button" data-dismiss="modal" class="btn btn-secondary">閉じる</button>';
            $('.customer_item_modal_footer').html(edit_delete_btn);
            var v_id = $("#v_name").find(":selected", this).val();
        } else {
            get_set_customer_info_val(c_list_item_id);
            $('.add_customer_item_data').remove();
            $('.c_item_title').text('商品情報');
            var edit_delete_btn = '<button type="button" data_c_item_id="' + c_list_item_id + '" class="btn btn-success update_customer_item_data">変更</button><button type="button" data_c_item_id="' + c_list_item_id + '" class="btn btn-danger delete_customer_item_data">削除</button><button type="button" data-dismiss="modal" class="btn btn-secondary">閉じる</button>';
            $('.customer_item_modal_footer').html(edit_delete_btn);
        }
        $("#add_update_customer_items_modal").modal("show");
    });

    $('.customer_basic_sale_mode_cost_price').change(function () {
        var cost_price_isopen = $('.cost_price').length;
        if (cost_price_isopen >= 1) {
            if ($(this).is(':checked')) {
                $('.cost_price').removeClass('hide').addClass('show');
                $('.sale_cost_price').removeClass('show').addClass('hide');
            } else {
                $('.cost_price').removeClass('show').addClass('hide');
                $('.sale_cost_price').removeClass('hide').addClass('show');
            }
        }
        $('.customer_item_table_body tr').each(function (index, el) {
            var basic_cost_price = $(this).children('td:nth-child(8)').attr('data_basic_cost_price');
            var sale_cost_price = $(this).children('td:nth-child(8)').attr('data_sale_cost_price');

            if ($('.customer_basic_sale_mode_cost_price').is(':checked')) {
                $(this).children('td:nth-child(8)').text(basic_cost_price);
            } else {
                $(this).children('td:nth-child(8)').text(sale_cost_price);
            }
        });
        gross_profit_calculations();
    })
    $('.customer_basic_sale_mode_sale_price').change(function () {
        var cost_price_isopen = $('.selling_price').length;
        if (cost_price_isopen >= 1) {
            if ($(this).is(':checked')) {
                $('.selling_price').removeClass('hide').addClass('show');
                $('.sale_selling_price').removeClass('show').addClass('hide');
            } else {
                $('.selling_price').removeClass('show').addClass('hide');
                $('.sale_selling_price').removeClass('hide').addClass('show');
            }
        }
        $('.customer_item_table_body tr').not(".active_edit").each(function (index, el) {
            var basic_sale_price = $(this).children('td:nth-child(9)').attr('data_basic_selling_price');
            var sale_selling_price = $(this).children('td:nth-child(9)').attr('data_sale_selling_price');

            if ($('.customer_basic_sale_mode_sale_price').is(':checked')) {
                $(this).children('td:nth-child(9)').text(basic_sale_price);
            } else {
                $(this).children('td:nth-child(9)').text(sale_selling_price);
            }
        });
        gross_profit_calculations();
    });
    $(document).delegate(".selling_price,.sale_selling_price", "blur", function (e) {
        gross_profit_calculations();
    });
    $(document).delegate(".cancel_new_customer_item_dta", "click", function (e) {
        $('.cost_price').closest('tr').remove();
        $('#editablebg_modal').removeClass('show').addClass('hide');
        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        show_hide_default_navigation(0, 1);
    });
    $('.customer_list_item_select_field').change(function () {
        var option_code = $('option:selected', this).attr('data_c_code');
        $('#c_code').val(option_code);
    })

    $(document).delegate(".vendor_list_item_select_field", "change", function (e) {
        e.preventDefault();

        var option_code_v = $('option:selected', this).attr('data_v_code');
        $('#v_code').val(option_code_v);
        $("#j_code").val('');
        $(".custom-combobox-input").val('');
        $("#customer_item_name").val('');
        $("#c_qty").val('');
        $("#b_qty").val('');
        $("#c_price").val('');
        $("#s_c_price").val('');
        $("#c_selling_price").val('');
        $("#sale_c_selling_price").val('');
        $(this).closest('tr').find("td:nth-child(10)").text('');
        $(this).closest('tr').find("td:nth-child(11)").text('');
    })

    // update add customer item

    $(document).delegate(".edit_order_lot_info", "click", function (e) {
        e.preventDefault();
        var order_point_unit = $(this).closest('tr').children('td:nth-child(12)').text();
        var order_point_quantity = $(this).closest('tr').children('td:nth-child(13)').text();
        var order_lot_unit = $(this).closest('tr').children('td:nth-child(14)').text();
        var order_lot_quantity = $(this).closest('tr').children('td:nth-child(15)').text();
        var row_id = $(this).closest('tr').children('input[type=hidden]').val();
        $('.row_id').val(row_id);
        $('#order_point_quantity').val(order_point_quantity);
        $('#order_lot_quantity').val(order_lot_quantity);
        if (order_point_unit != '') {
            $('#order_point_unit').val(order_point_unit);
            $('#order_point_unit').prop('selected', true);
        }
        if (order_lot_unit != '') {
            $('#order_lot_unit').val(order_lot_unit);
            $('#order_lot_unit').prop('selected', true);
        }
        $('#order_lot_modal').modal('show');
    })

    $(document).delegate(".update_order_lot_info", "click", function (e) {
        e.preventDefault();
        var row_id = $(this).attr('data_r_item_id');
        var order_point_unit = $('#order_point_unit').val();
        var order_point_quantity = $('#o_p_q').val();
        var order_lot_unit = $('#order_lot_unit').val();
        var order_lot_quantity = $('#o_l_q').val();
        var v_ids_v = $('.v_ids_v').val();
        var v_name = $('.vendor_list_show').text();
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "update_order_info_by_id",
            data: {
                row_id: row_id,
                order_point_unit: order_point_unit,
                order_point_quantity: order_point_quantity,
                order_lot_unit: order_lot_unit,
                order_lot_quantity: order_lot_quantity,
            },
            dataType: "JSON",
            success: function (response) {
                var updated_tr_row = $('#order_point_unit').closest('tr');
                updated_tr_row.children('td:nth-child(12)').text(order_point_unit);
                updated_tr_row.children('td:nth-child(13)').text(order_point_quantity);
                updated_tr_row.closest('tr').children('td:nth-child(14)').text(order_lot_unit);
                updated_tr_row.closest('tr').children('td:nth-child(15)').text(order_lot_quantity);
                $('#editablebg_modal').removeClass('show').addClass('hide');
                var message = [{message: '修正が完了しました。'}];
                var buttons = [{buttons: '<button type="button" class="btn btn-info update_order_received cmn_dft_dgn btn-sm">商品選択</button>'}, {buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn cancel_receive_order_edition btn-sm">終了</button>'}]
                success_error_confirmation_popup(message, buttons);
                // success_message('receive_order_message_success', 'alert-success', '変更しました');
                // get_vendor_list_item_by_vendor_id(v_ids_v, v_name);

            }
        });
        $('#order_lot_modal').modal('hide');
    })
    $(document).delegate(".delete_customer_data_id", "click", function (e) {
        e.preventDefault();
        var customer_itms_id = $(this).attr("data_c_item_id");
        var data_p_name = $(this).attr('data_p_name');
        var p_name = $(this).attr('data_p_name');
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "delete_customer_itms_by_id",
            data: {
                customer_itms_id: customer_itms_id
            },
            dataType: "JSON",
            success: function (response) {

                if (response.message == 'delete_success') {
                    // $('#editablebg_modal').removeClass('show').addClass('hide');
                    // var message = [{ message: data_p_name + '<br>この商品を削除しました。' }];
                    // var buttons = [{ buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn deletes_customer_item btn-sm">商品選択</button>' }, { buttons: '<button type="button" class="btn btn-info cmn_dft_dgn cancel_customer_item_deletion btn-sm">終了</button>' }]
                    // success_error_confirmation_popup(message, buttons);
                    nav_list[delete_item_delete_final].hide();
                    show_hide_nav_icn(0);
                    const customer_item_delete_success_msg = {

                        customer_item_delete_success: {
                            message: [
                                {message: '「' + p_name + '」を削除しました。 '},
                            ],
                            buttons: [
                                {button: '<center><button type="button" class="btn btn-info cmn_dft_dgn customer_item_deletion_success btn-sm">確認</button></center>'}
                            ]
                        },
                    }
                    delete_item_delete_success = view(customer_item_delete_success_msg['customer_item_delete_success'], def_center_mesg_template);
                    var row = $('tr[data-id="' + customer_itms_id + '"]');
                    row.remove();
                    //$("#add_update_customer_items_modal").modal("hide");
                    //location.reload();
                }
            }
        });

    });
    $(document).delegate(".delete_customer_item_data", "click", function (e) {
        e.preventDefault();
        var customer_item_id = $(this).attr('data_c_item_id');
        var message = [{message: 'この商品を削除しますか？'}];
        var buttons = [{buttons: '<button type="button" data_c_item_id="' + customer_item_id + '" class="btn btn-danger delete_customer_data_id btn-sm">はい</button>'}, {buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">いいえ</button>'}]

        action_popup_navigations(message, buttons, 'yes_no_navigation_message');
    })
    $(document).delegate(".update_customer_item_data", "click", function (e) {
        e.preventDefault();
        var customer_itm_id = $(this).attr("data_c_item_id");
        var customer_item_data_id = $('#update_customer_item_id').val();
        var c_name = $('#c_name').val();
        var customer_name = $('#c_name option:selected').text();
        var v_name = $('#v_name').val();
        var j_code = $('.custom-combobox-input').val(); //$('#j_code').val();
        var customer_item_name = $('#customer_item_name').val();
        var c_qty = $('#c_qty').val();
        var b_qty = $('#b_qty').val();
        var basic_selling_price = $('#c_selling_price').val();
        var sale_selling_price = $('#sale_c_selling_price').val();
        var start_date = $('#c_i_start_date').val();
        var end_date = $('#c_i_end_date').val();
        if (c_name == '' || v_name == '' || j_code == '' ||
            customer_item_name == '' || c_qty == '' ||
            b_qty == '' || c_price == '' || start_date == '') {
            error_message('customer_item_ins_up_error', 'alert-warning', 'すべての欄に入力してください')
            // popup_message('customer_item_ins_up_error', 'text-danger', 'please fill up all field');
            return 0;
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "add_update_customer_item",
            type: "POST",
            dataType: "JSON",
            data: {
                customer_item_data_id: customer_item_data_id,
                c_name: c_name,
                v_name: v_name,
                j_code: j_code,
                customer_item_name: customer_item_name,
                c_qty: c_qty,
                b_qty: b_qty,
                basic_selling_price: basic_selling_price,
                sale_selling_price: sale_selling_price,
                start_date: start_date,
                end_date: end_date,
            },
            success: function (response) {
                var ms_message = response.message;
                if (response.message == 'insert_success' || response.message == 'update_success') {
                    $('#editablebg_modal').removeClass('show').addClass('hide');
                    view_customer_master_by_customer_id(c_name, customer_name);
                    var new_msg = (response.message == 'insert_success' ? '登録が完了しました' : '変更しました');
                    var ms_message = response.message;
                    if (ms_message == "insert_success") {
                        //success_message('flash_message', 'alert-success', '登録が完了しました');
                        var message = [{message: customer_item_name + 'を登録しました。'}];
                        var buttons = [{buttons: '<button type="button" data_customer_list_item_id="0" class="btn btn-info add_customer_item btn-sm">商品登録</button>'}, {buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn cancel_new_customer_item_dta btn-sm">終了</button>'}]
                        success_error_confirmation_popup(message, buttons);
                    } else if (ms_message == "update_success") {
                        //success_message('flash_message', 'alert-success', '変更しました');
                        var message = [{message: '変更しました'}];
                        var buttons = [{buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">確認</button>'}]
                        success_error_confirmation_popup(message, buttons);
                    } else {
                        error_message(message_id, 'alert-danger', ms_message)
                    }
                } else {
                    error_message('customer_item_ins_up_error', 'alert-danger', response.message)
                    // popup_message('customer_item_ins_up_error', 'text-danger', response.message);
                    return 0;
                }
            }
        });

    });

    $('.common_price').change(function () {
        var c_price = $('#c_price').val();
        var c_selling_price = $('#c_selling_price').val();
        c_price = parseInt(c_price);
        c_selling_price = parseInt(c_selling_price);
        if ((c_price != '' && c_selling_price != '') && c_selling_price > c_price) {
            var gross_profits = c_selling_price - c_price;
            var profit_margins = gross_profits / c_selling_price * 100;
            profit_margins = profit_margins.toFixed(2);
            $('#gross_profits').val(gross_profits);
            $('#profit_margins').val(profit_margins);
        } else {
            $('#gross_profits').val('');
            $('#profit_margins').val('');
        }
    });

    $("#j_code").autocomplete({

        source: function (request, response) {
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                url: "get_all_vendor_data_by_vendor_id",
                type: 'POST',
                dataType: "json",
                data: {
                    term: request.term,
                    v_id: $("#v_name").find(":selected", this).val()
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            $("#j_code").val(ui.item.value);
            $("#customer_item_name").val(ui.item.name);
            $("#c_qty").val(ui.item.case_inputs);
            $("#b_qty").val(ui.item.ball_inputs);
            $("#c_price").val(ui.item.vendor_cost_price);
            //console.log(ui.item);
            //set_vendor_item_info_by_jan(ui.item.id, ui.item.value);
        }
    });

    function set_vendor_item_info_by_jan(item_id = null, jan_code = null) {

    }

    function get_c_list(customer_id = null) {
        $(".vendor_list_item_select_field").html("");
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "get_customer_list",
            type: "POST",
            dataType: "JSON",
            data: {
                customer_id: null
            },
            success: function (response) {

                var htmls = '';
                $.each(response.all_customer_list, function (
                    idx,
                    obj
                ) {
                    var selected_val = '';
                    if (obj.customer_id == customer_id) {
                        selected_val = 'selected';
                    }
                    htmls += '<option value="' + obj.customer_id + '" data_c_code="' + obj.partner_code + '" ' + selected_val + '>' + obj.name + '</option>';
                });
                $(".customer_list_item_select_field").html(htmls);
                var patnar_code = $(".customer_list_item_select_field").find(":selected", this).attr('data_c_code');
                $('#c_code').val(patnar_code);

            }
        });
    }

    function get_v_list(vendor_id = null) {
        $("#v_name").html("");
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "/get_vendor_list",
            type: "POST",
            dataType: "JSON",
            data: {
                vendor_id: vendor_id
            },
            success: function (response) {
                if (vendor_id == null) {

                    var htmls =
                        '';
                    $.each(response.all_vendor_list, function (idx, obj) {
                        htmls += '<option value="' + obj.vendor_id + '" data_v_code="' + obj.partner_code + '">' + obj.name + '</option>';

                    });
                    $("#v_name").html(htmls);
                    var patnar_code = $("#v_name").find(":selected", this).attr('data_v_code');
                    $('#v_code').val(patnar_code);

                } else {

                }
            }
        });
    }

    function get_v_handy(vendor_id = null) {
        $(".vendor_list_items_data").html("");
        var get_vendor_list_url = Globals.base_url + '/get_vendor_list';
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: get_vendor_list_url,
            type: "POST",
            dataType: "JSON",
            data: {
                vendor_id: vendor_id
            },
            success: function (response) {
                if (vendor_id == null) {

                    var htmls =
                        '';
                    $.each(response.all_vendor_list, function (idx, obj) {
                        htmls += '<option value="' + obj.vendor_id + '" data_v_code="' + obj.partner_code + '">' + obj.name + '</option>';

                    });
                    $(".vendor_list_items_data").html(htmls);


                } else {

                }
            }
        });
    }


    function get_c_handy(customer_id = null) {
        $(".customer_list_items_data").html("");
        var get_customer_list_url = Globals.base_url + '/get_customer_list';
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: get_customer_list_url,
            type: "POST",
            dataType: "JSON",
            data: {
                customer_id: customer_id
            },
            success: function (response) {

                if (customer_id == null) {

                    var htmls =
                        '';
                    $.each(response.all_customer_list, function (
                        idx,
                        obj
                    ) {
                        htmls += '<option value="' + obj.customer_id + '" data_c_code="' + obj.partner_code + '">' + obj.name + '</option>';
                    });
                    $(".customer_list_items_data").html(htmls);

                } else {

                }
            }
        });
    }


    function get_set_customer_info_val(c_list_item_id) {
        var get_customer_list_item_by_id_url = Globals.base_url + 'get_customer_list_item_by_id';
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: get_customer_list_item_by_id_url,
            type: "POST",
            dataType: "JSON",
            data: {
                c_list_item_id: c_list_item_id
            },
            success: function (response) {
                if (response) {
                    $("#c_name").val(response.customer_item_data.customer_id).change();
                    $("#c_name").prop('disabled', true);
                    $("#v_name").val(response.customer_item_data.vendor_id).change();
                    $("#v_name").prop('disabled', true);
                    $('#update_customer_item_id').val(response.customer_item_data.customer_item_id);
                    $('.custom-combobox-input').val(response.customer_item_data.jan);
                    $('.custom-combobox-input').attr('readonly', true);
                    $('.custom-combobox-toggle').off('click');
                    //$("#j_code").attr('readonly', true);
                    //$('#j_code').val(response.customer_item_data.jan);
                    //$("#j_code").attr('readonly', true);
                    $('#customer_item_name').val(response.customer_item_data.product_name);
                    $('#c_qty').val(response.customer_item_data.case_inputs);
                    $('#b_qty').val(response.customer_item_data.ball_inputs);
                    $('#c_price').val(response.customer_item_data.shop_price);
                    $('#c_selling_price').val(response.customer_item_data.selling_price);
                    $('#gross_profits').val(response.customer_item_data.gross_profit);
                    $('#profit_margins').val(response.customer_item_data.gross_profit_margin);

                } else {

                }
            }
        });
    }

    /* filter by vendor_id */
    $(document).delegate(".filter_by_vendor_id", "click", function (e) {
        e.preventDefault();
        var v_name = $(this).text();
        var v_id = $(this).attr('data_vendor_id');
        var currentURL = window.location.href;
        var url_array = currentURL.split("/");
        var url_last_element = $(url_array).last()[0];
        if (url_last_element == 'receiveorder') {
            v_name = (v_name == 0 ? '' : v_name);
            $('.vendor_list_show').text(v_name);
            $('.byrs_syplr_titles').text(v_name);
            $('.supplier_name_input').val(v_name);
            $('.v_ids_v').val(v_id);
            $('#vendor_show_modal').modal('hide');
            get_vendor_list_item_by_vendor_id(v_id, v_name);
        } else if (url_last_element == 'vendormangementsheet') {
            var vendor_id = v_id;
            var start_date = $('#vendor_start_date').val();
            var end_date = $('#vendor_end_date').val();
            $('.vendor_list_show').text(v_name);
            $('.v_ids_v').val(v_id);
            $('#vendor_show_modal').modal('hide');
            get_management_vendor_data_list(vendor_id, start_date, end_date, mesg_status = 0);
            return false;
        } else {
            console.log(temp_vendor_insert_status);
            var is_new_item = $('.v_ids_v').attr('is_new_item');

            $('#vendor_show_modal').modal('hide');
            if (is_new_item == 1) {
                var vendor_item_id = $('.vendor_itemdata_table tr:first-child').attr('data-id');
                $.ajax({
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                    },
                    type: "POST",
                    url: "update_vendor_itms_by_vendor_id",
                    data: {
                        vendor_item_id: vendor_item_id,
                        vendor_id: v_id,
                    },
                    dataType: "JSON",
                    success: function (response) {
                        $('.v_ids_v').attr('is_new_item', 0);
                        get_vendor_master_item_list();

                    }
                });
            } else {
                $('.vendor_list_show').text(v_name);
                $('.supplier_name_input').val(v_name);
                $('.byrs_syplr_titles').text(v_name);
                $('.v_ids_v').val(v_id);
                get_vendor_master_item_list();
            }
            show_hide_nav_icn(1);
            temp_vendor_insert_status = 0;
        }

    })


    /* filter by vendor_id */

    /* filter by customer_id */
    $(document).delegate(".filter_by_customer_id", "click", function (e) {
        e.preventDefault();
        var c_name = $(this).text();
        var c_id = $(this).attr('data_customer_id');
        var currentURL = window.location.href;
        var url_array = currentURL.split("/");
        var url_last_element = $(url_array).last()[0];
        if (url_last_element == 'shipment') {
            view_customer_master_by_customer_id(c_id, c_name);
        } else if (url_last_element == 'shipmentmangementsheet') {
            var customer_id = c_id;
            var shipment_start_date = $('#shipment_start_date').val();
            var shipment_end_date = $('#shipment_end_date').val();
            $('.customer_list_show').text(c_name);
            $('.c_ids_v').val(c_id);
            $('#customer_show_modal').modal('hide');
            get_management_shipment_data_list(customer_id, shipment_start_date, shipment_end_date, mesg_status = 0);
            return false;
        } else if (url_last_element == 'manualOrder' || url_last_element == 'manualorder') {
            $('.c_ids_v').val(c_id);
            $('.jcs_main_hand_title').text(c_name);
            get_manual_order_item(c_id, c_name);
        } else if (url_last_element == 'onlineorder') {
            $('.c_ids_v').val(c_id);
            $('.jcs_main_hand_title').text(c_name);
            get_manual_order_item(c_id, c_name);
        } else if (url_last_element == 'brand-order' || url_last_element == 'brand-order#') {
            $('.c_ids_v').val(c_id);
            $('.jcs_main_hand_title').text(c_name);
            $('.jcs_main_hand_title').attr('data_page_num',2);
            get_brand_item_list(c_id, c_name);
        } else {
            view_customer_master_by_customer_id(c_id, c_name);
        }
        show_hide_nav_icn(1);
    });


    /* filter by customer_id */


    $(document).delegate(".update_stock_item_by_jan_by_handy", "click", function (e) {
        e.preventDefault();
        return false;
        var b_jancode = $('#vendor_master_jancode').val();
        var case_quantity = $('.case_invent_qty').val();
        var ball_quantity = $('.bol_invent_qty').val();
        var unit_quantity = $('.unit_invent_qty').val();
        var case_quantity_a = $('.case_invent_qty').attr('case_invent_qty');
        var ball_quantity_a = $('.bol_invent_qty').attr('bol_invent_qty');
        var unit_quantity_a = $('.unit_invent_qty').attr('unit_invent_qty');
        if (case_quantity == case_quantity_a && ball_quantity == ball_quantity_a && unit_quantity == unit_quantity_a) {
            $('.update_stock_item_by_jan_by_handy').attr('stock_item_id', 0);
            $("#vendor_master_jancode").val("");
            $("#vendor_master_jancode").focus();
            $("#vendor_master_jancode")[0].focus();
            $("#vendor_master_jancode").blur();
            $('.case_invent_qty').val('');
            $('.bol_invent_qty').val('');
            $('.unit_invent_qty').val('');
            $('.case_invent_qty').attr('case_invent_qty', 0);
            $('.bol_invent_qty').attr('bol_invent_qty', 0);
            $('.unit_invent_qty').attr('unit_invent_qty', 0);
            $(".case_law_qty").val('');
            $(".bol_law_qty").val('');
            $("#search_product_name").html('<span style="color: #999; font-size: 30px;">商品名</span>');
            return false;
        }
        var stock_item_id = $('.update_stock_item_by_jan_by_handy').attr('stock_item_id');
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "update_stock_item_by_jan_by_handy",
            type: "POST",
            dataType: "JSON",
            data: {
                b_jancode: b_jancode,
                stock_item_id: stock_item_id,
                case_quantity: case_quantity,
                ball_quantity: ball_quantity,
                unit_quantity: unit_quantity,
            },
            success: function (response) {
                if (response.message != 'invalid_jan_code') {
                    $('.update_stock_item_by_jan_by_handy').attr('stock_item_id', 0);
                    $("#vendor_master_jancode").val("");
                    $("#vendor_master_jancode").focus();
                    $("#vendor_master_jancode")[0].focus();
                    $("#vendor_master_jancode").blur();
                    $('.case_invent_qty').val('');
                    $('.bol_invent_qty').val('');
                    $('.unit_invent_qty').val('');
                    $('.case_invent_qty').attr('case_invent_qty', 0);
                    $('.bol_invent_qty').attr('bol_invent_qty', 0);
                    $('.unit_invent_qty').attr('unit_invent_qty', 0);
                    $(".case_law_qty").val('');
                    $(".bol_law_qty").val('');
                    $("#search_product_name").html('<span style="color: #999; font-size: 30px;">商品名</span>');
                } else {
                    alert('JANコードを選択してください');
                }
            }
        });
    })


    $(document).delegate(".update_stock_item_by_jan", "click", function (e) {
        e.preventDefault();
        var submit_type = $(this).attr('data_types');
        var vendor_item_id = $('#v_i_id').val();
        var vendor_id = $('#v_i_id').attr('vendor_id');
        var self_no = $('#scan_bybin').val();
        var b_jancode = $('#b_jancode').val();
        var case_quantity = $('.c_qtys').text();
        var ball_quantity = $('.b_qtys').text();
        var unit_quantity = $('.u_qtys').text();
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "stock_item_update_final_insert",
            type: "POST",
            dataType: "JSON",
            data: {
                vendor_item_id: vendor_item_id,
                vendor_id: vendor_id,
                self_no: self_no,
                b_jancode: b_jancode,
                case_quantity: case_quantity,
                ball_quantity: ball_quantity,
                unit_quantity: unit_quantity,
            },
            success: function (response) {
                if (response.message != 'invalid_jan_code') {
                    if (submit_type == 2) {
                        $('#b_jancode').val('');
                        $('#b_jancode').focus();
                        $('#b_jancode').blur();
                        $('#v_i_id').val('');
                        $('#v_i_id').attr('vendor_id', '');
                        $('.d_c_qtys').text('');
                        $('.c_qtys').text('');
                        $('.d_b_qtys').text('');
                        $('.b_qtys').text('');
                        $('.d_u_qtys').text('');
                        $('.u_qtys').text('');
                    } else {
                        location.reload();
                    }
                } else {
                    alert('JANコードを選択してください');
                }
            }
        });
    })

    $(document).delegate("#insert_shipment", "click", function (e) {
        e.preventDefault();
        var shipment_number = $('#slf_no').val();
        var jcode = $('#jcode').val();
        var c_quantity = $('#shipment_quantity').val();
        var customer_id = $('#cname').attr('customer_id');
        var customer_order_id = $('.customer_order_id').val();
        var inputs = $('.inputs_types').val();
        var stock_case_qty = $('.inputs_types').attr('data_stock_case_qty');
        stock_case_qty = parseInt(stock_case_qty);
        var stock_ball_qty = $('.inputs_types').attr('data_stock_ball_qty');
        stock_ball_qty = parseInt(stock_ball_qty);
        var stock_unit_qty = $('.inputs_types').attr('data_stock_unit_qty');
        stock_unit_qty = parseInt(stock_unit_qty);
        c_quantity = parseInt(c_quantity);
        if (jcode == '') {
            alert('jan required');
            return false;
        }
        if (c_quantity == '') {
            alert('shipment quantity required');
            return false;
        }

        if (inputs == 'ケース') {
            if (c_quantity > stock_case_qty) {
                alert('your stock quantity is ' + stock_case_qty + ' you can not input more than your stock quantity');
                return false;
            }
        }

        if (inputs == 'ボール') {
            if (c_quantity > stock_ball_qty) {
                alert('your stock quantity is ' + stock_ball_qty + ' you can not input more than your stock quantity');
                return false;
            }
        }


        if (inputs == 'バラ') {
            if (c_quantity > stock_unit_qty) {
                alert('your stock quantity is ' + stock_unit_qty + ' you can not input more than your stock quantity');
                return false;
            }
        }

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "insert_shipment_order_info",
            type: "POST",
            dataType: "JSON",
            data: {
                shipment_number: shipment_number,
                jcode: jcode,
                customer_id: customer_id,
                customer_order_id: customer_order_id,
                c_quantity: c_quantity,
                inputs: inputs,
            },
            success: function (response) {
                if (response.message = 'success') {
                    $('.customer_order_id').val('');
                    var is_finsished = $('.totall_row').val();
                    var result_list = is_finsished - 1;
                    $('.totall_row').val(result_list);
                    $('#jcode').val('');
                    $('#jcode').focus();
                    $('#jcode').blur();
                    $('#pname').val('');
                    $('#shipment_quantity').val('');
                    $('.inputs_types').val('');
                    if (result_list == 0) {
                        $.ajax({
                            headers: {
                                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                            },
                            type: "post",
                            url: "insert_customer_invoice_by_shipment",
                            data: {shipment_number: shipment_number, customer_id: customer_id},
                            dataType: "JSON",
                            success: function (response) {
                                console.log(response);
                            }
                        });
                        handy_page_popup('', "出荷作業が完了しました。");
                    }
                } else {
                    alert('shipment insert fail');
                }
            }
        });
    })
    /* shipment order js */

    $(document).delegate('.get_jan_info_estimate,.get_jan_info_salesmaster,.get_jan_info_receive,.get_jan_info_shipment,.get_jan_info_warehouse', 'keypress', function (e) {
        var keynum = e.which;
        if (keynum == 13) {
            $(this).blur();
        }
    })


    $(document).delegate('#price', 'keyup', function (e) {
        var keynum = e.which;
        if (keynum == 13) {
            var price = $(this).val();
            $('#sale_price').val(price);
            $('#sale_price').focus();
        }
    })

    $(document).delegate('#basic_start_date', 'change', function (e) {
        e.preventDefault();
        var start_d = $(this).val();
        $('#sale_start_date').val(start_d).focus();
    })
    $(document).delegate('#basic_end_date', 'change', function (e) {
        e.preventDefault();
        var start_d = $(this).val();
        $('#sale_end_date').val(start_d).focus();
    })

    $(document).delegate('.get_jan_info_estimate', 'blur', function (e) {
        e.preventDefault();
        var jan = $(this).val();
        var rows = $('.vendor_itemdata_table tr').filter(function () {
            $(this).toggle($(this).find('td:nth-child(3)').text().indexOf(jan) > -1);
            return $(this).find('td:nth-child(3)').text().indexOf(jan) > -1;
        });
        $(this).val('');
        if (rows.length == 0) {
            $('.vendor_itemdata_table').html('<tr><td colspan="10" class="text-center">商品がありません。</td></tr>');
        }
    });
    $(document).delegate('.get_jan_info_salesmaster', 'blur', function (e) {
        e.preventDefault();
        var jan = $(this).val();
        var rows = $('.customer_item_table_body tr').filter(function () {
            $(this).toggle($(this).find('td:nth-child(11)').text().indexOf(jan) > -1);
            return $(this).find('td:nth-child(11)').text().indexOf(jan) > -1;
        });
        $(this).val('');
        if (rows.length == 0) {
            $('.customer_item_table_body').html('<tr><td colspan="12" class="text-center">商品がありません。</td></tr>');
        }
    });
    $(document).delegate('.get_jan_info_receive', 'blur', function (e) {
        e.preventDefault();
        var jan = $(this).val();
        var rows = $('.order_receive_body tr').filter(function () {
            $(this).toggle($(this).find('td:nth-child(10)').text().indexOf(jan) > -1);
            return $(this).find('td:nth-child(10)').text().indexOf(jan) > -1;
        });
        $(this).val('');
        if (rows.length == 0) {
            $('.order_receive_body').html('<tr><td colspan="15" class="text-center">商品がありません。</td></tr>');
        }
    });
    $(document).delegate('.get_jan_info_shipment', 'blur', function (e) {
        e.preventDefault();
        var jan = $(this).val();
        var rows = $('.order_shipment_body tr').filter(function () {
            $(this).toggle($(this).find('td:nth-child(12)').text().indexOf(jan) > -1);
            return $(this).find('td:nth-child(12)').text().indexOf(jan) > -1;
        });
        $(this).val('');
        if (rows.length == 0) {
            $('.order_shipment_body').html('<tr><td colspan="13" class="text-center">商品がありません。</td></tr>');
        }
    });

    $(document).delegate('.get_jan_info_warehouse', 'blur', function (e) {
        e.preventDefault();
        var jan = $(this).val();
        var rows = $('.ware_house_body tr').filter(function () {
            $(this).toggle($(this).find('td:nth-child(7)').text().indexOf(jan) > -1);
            return $(this).find('td:nth-child(7)').text().indexOf(jan) > -1;
        });
        $(this).val('');
        if (rows.length == 0) {
            $('.ware_house_body').html('<tr><td colspan="7" class="text-center">商品がありません。</td></tr>');
        }
    });

    $(document).delegate('.delete_vendor_payment', 'click', function (e) {
        e.preventDefault();
        var vendor_id = $(this).attr('data_vendor_id');
        var vendor_order_id = $(this).attr('data_vendor_order_id');
        var payment_id = $(this).attr('data_payment_id');
        $("#vendor_payment_modal").modal("hide");
        var v_id = $('.v_ids_v').val();
        var vendor_start_date = $('#vendor_start_date').val();
        var vendor_end_date = $('#vendor_end_date').val();
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: "delete_vendor_payment",
            data: {vendor_order_id: vendor_order_id, vendor_id: vendor_id, payment_id: payment_id},
            dataType: "JSON",
            success: function (response) {
                get_management_vendor_data_list(v_id, vendor_start_date, vendor_end_date, mesg_status = 2);
            }
        });
    });

    $(document).delegate('.delete_payment', 'click', function (e) {
        e.preventDefault();
        var payment_type = $(this).attr('data_payment_type');
        var payment_id = $(this).attr('data_payment_id');
        $("#payment_modal").modal("hide");
        if (payment_type == 'vendor_payments') {
            var c_id = $('.v_ids_v').val();
            var shipment_start_date = $('#vendor_start_date').val();
            var shipment_end_date = $('#vendor_end_date').val();
        } else {
            var c_id = $('.c_ids_v').val();
            var shipment_start_date = $('#shipment_start_date').val();
            var shipment_end_date = $('#shipment_end_date').val();
        }

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: "delete_payment",
            data: {payment_type: payment_type, payment_id: payment_id},
            dataType: "JSON",
            success: function (response) {
                if (payment_type == 'vendor_payments') {
                    get_management_vendor_data_list(c_id, shipment_start_date, shipment_end_date, mesg_status = 2);
                } else {
                    get_management_shipment_data_list(c_id, shipment_start_date, shipment_end_date, mesg_status = 2);
                }
            }
        });
    });
    $(document).delegate('.insert_payment', 'click', function (e) {
        e.preventDefault();
        var payment_type = $('.payment_voucher').attr('data_p_type');
        var customer_id = $('.payment_voucher').attr('data_c_v_id');
        var invoice_id = $('.payment_voucher').attr('data_o_id');
        var customer_profit = $('.payment_voucher').attr('data_p_amount');

        var already_given_total = $('.already_given_total').val();
        var customer_amount = $('#p_amount').val();
        var c_id = 0;
        if (payment_type == 'vendor_payments') {
            c_id = $('.v_ids_v').val();
            var shipment_start_date = $('#vendor_start_date').val();
            var shipment_end_date = $('#vendor_end_date').val();
        } else {
            c_id = $('.c_ids_v').val();
            var shipment_start_date = $('#shipment_start_date').val();
            var shipment_end_date = $('#shipment_end_date').val();
        }

        if (customer_amount == '') {
            success_message('payment_message_shown', 'alert-danger', '金額を入力してください。');
            return false;
        }

        var due_amount = customer_profit - already_given_total;
        if (due_amount < customer_amount) {
            success_message('payment_message_shown', 'alert-danger', 'you can not payment more');
            return false;
        }
        $("#payment_modal").modal("hide");
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: "insert_payment",
            data: {
                invoice_id: invoice_id,
                customer_id: customer_id,
                customer_amount: customer_amount,
                payment_type: payment_type
            },
            dataType: "JSON",
            success: function (response) {
                if (payment_type == 'vendor_payments') {
                    get_management_vendor_data_list(c_id, shipment_start_date, shipment_end_date, mesg_status = 1);
                } else {
                    get_management_shipment_data_list(c_id, shipment_start_date, shipment_end_date, mesg_status = 1);
                }

            }
        });
    });

    $(document).delegate('.add_payment', 'click', function (e) {
        var invoice_id = $(this).attr('data_invoice_id');
        var data_number = $(this).attr('data_number');
        var invoice_amount = $(this).attr('data_invoice_amount');
        var payment_type = $(this).attr('data_payment_type');
        var customer_vendor_id = $(this).attr('data_customer_vendor_id');

        $('.payment_voucher').attr('data_p_type', payment_type);
        $('.payment_voucher').attr('data_c_v_id', customer_vendor_id);
        $('.payment_voucher').attr('data_o_id', invoice_id);
        $('.payment_voucher').attr('data_p_amount', invoice_amount);
        $('.payment_voucher').text(data_number);
        $('#p_amount').val('');
        $("#payment_modal").modal("show");
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: "get_payment_info_by_invoice_id",
            data: {payment_type: payment_type, invoice_id: invoice_id},
            dataType: "JSON",
            success: function (response) {
                var html = '';
                var given_amount = 0;
                for (var i = 0; i < response.length; i++) {
                    given_amount += parseFloat(response[i]['payment']);
                    html += '<tr>';
                    html += '<td>' + response[i]['payment_date'] + '</td>';
                    html += '<td>' + response[i]['payment'] + '</td>';
                    html += '<td><button data_payment_id="' + response[i]['payment_id'] + '" data_payment_type="' + payment_type + '" class="btn btn-success delete_payment">削除</button></td>';
                    html += '</tr>';
                }
                $('.already_given_total').val(given_amount);
                $('.payment_table_dataddd').html(html);
                $('.payment_table_dataddd tr td:nth-child(2)').digits_td();
            }
        });
    });

    $(document).delegate('.shipment_date', 'change', function (e) {
        var shipment_start_date = $('#shipment_start_date').val();
        var shipment_end_date = $('#shipment_end_date').val();
        var customer_id = $('.c_ids_v').val();
        get_management_shipment_data_list(customer_id, shipment_start_date, shipment_end_date, mesg_status = 0);
    })

    $(document).delegate('.vendor_arrival_date', 'change', function (e) {
        var vendor_start_date = $('#vendor_start_date').val();
        var vendor_end_date = $('#vendor_end_date').val();
        var vendor_id = $('.v_ids_v').val();
        get_management_vendor_data_list(vendor_id, vendor_start_date, vendor_end_date, mesg_status = 0);
    })

    function get_management_shipment_data_list(customer_id, shipment_start_date, shipment_end_date, mesg_status) {
        var data = {
            shipment_start_date: shipment_start_date,
            shipment_end_date: shipment_end_date,
            customer_id: customer_id
        };
        // var shipment_data_filter = Globals.base_url + 'shipment_data_filter';
        var sumation_of_profit = 0;
        var sumation_of_payment_amount = 0;
        var sumation_of_invoice_amount = 0;
        var sumation_of_payment_amount_a = 0;
        var sumation_of_payment_amount_d = 0;
        var payment_amount_diff = 0;
        var sum_payment_amount_diff = 0;
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: "shipment_data_filter",
            data: data,
            dataType: "JSON",
            success: function (response_all) {
                var response = response_all.all_data;
                var previous_due = response_all.previous_dues;
                var html = '';
                var j = 1;
                var d_amount_a = 0;
                var customer_list = [];
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {
                        var total_amount = 0;
                        var amount_a = 0;
                        var amount_d = 0;
                        previous_due.map(function (e) {
                            if (parseInt(e.customer_id) == parseInt(response[i].customer_id)) {
                                if (jQuery.inArray(response[i].customer_id, customer_list) == -1) {
                                    amount_a = e.opening_due_amount;
                                }
                            }
                        })

                        if (response[i].payment != null) {
                            total_amount = parseInt(response[i].payment);
                        }
                        if (response[i].invoice_amount != null) {
                            sumation_of_profit += parseInt(response[i].invoice_amount);
                            payment_amount_diff = response[i].invoice_amount - total_amount;
                            sum_payment_amount_diff += response[i].invoice_amount - total_amount;
                        }
                        sumation_of_payment_amount += total_amount;
                        sumation_of_payment_amount_a += amount_a;
                        sumation_of_invoice_amount += html += '<tr>';
                        html += '<td>' + j + '</td>';
                        html += '<td><a href="' + Globals.base_url + '/shipment_order_detail/' + response[i].customer_id + '/' + response[i].invoice_date + '/' + response[i].customer_invoice_id + '">' + response[i].invoice_date + '</a></td>';
                        html += '<td>' + response[i].name + '</td>';
                        console.log(d_amount_a)
                        if (jQuery.inArray(response[i].customer_id, customer_list) != -1) {
                            // console.log("is in array");

                            html += '<td><input type="tel" id="amount_a' + response[i].customer_invoice_id + '"  data_current_amount="' + amount_a + '" data_vendor_id = "' + response[i].customer_id + '" data_invoice_id="' + response[i].customer_invoice_id + '" value="' + d_amount_a + '" class="form-control digits" readonly></td>';
                            amount_d = parseFloat(response[i].invoice_amount) + parseFloat(d_amount_a) - total_amount;
                            d_amount_a = amount_d;

                        } else {

                            amount_d = parseFloat(response[i].invoice_amount) + parseFloat(amount_a) - total_amount;
                            // console.log("is NOT in array");
                            customer_list.push(response[i].customer_id);
                            html += '<td><input type="tel" id="amount_a' + response[i].customer_invoice_id + '"  data_current_amount="' + amount_a + '" data_customer_id = "' + response[i].customer_id + '" data_invoice_id="' + response[i].customer_invoice_id + '" value="' + amount_a + '" class="form-control digits customer_due_blance"></td>';
                            d_amount_a = amount_d;
                        }


                        html += '<td class="digits_td"  id="amount_b' + response[i].customer_invoice_id + '">' + response[i].invoice_amount + '</td>';
                        html += '<td><input data_customer_id = "' + response[i].customer_id + '" data_invoice_id="' + response[i].customer_invoice_id + '" type="tel" data_current_amount="' + total_amount + '" class="form-control digits insert_payment_to_customer customer_due_balance" value="' + total_amount + '"></td>';
                        html += '<td class="digits_td">' + amount_d + '</td>';
                        html += '<td></td>';
                        html += '</tr>';
                        j++;
                        sumation_of_payment_amount_d += amount_d;
                    }
                    html += '<tr><td colspan="3" style="text-align:right;">合計</td><td></td><td class="digits_td">' + sumation_of_profit + '</td><td class="digits_td">' + sumation_of_payment_amount + '</td><td class="digits_td">' + sumation_of_payment_amount_d + '</td><td></td></tr>';
                } else {
                    html += '<tr><td colspan="8" style="text-align:center;">データ無し</td></tr>';
                }
                $('#shipment_table_dataddd').html(html);
                $('.digits_td').digits_td();
                $('.digits').digits();
                if (mesg_status != 0) {
                    if (mesg_status == 1) {
                        success_message('managementshipment_message', 'alert-success', '入金処理が完了しました。');
                    } else if (mesg_status == 2) {
                        success_message('managementshipment_message', 'alert-success', 'payment delete successfully');
                    }
                }
            }
        });
    }

    function get_management_vendor_data_list(vendor_id, shipment_start_date, shipment_end_date, mesg_status, order_by = 0) {
        var data = {
            shipment_start_date: shipment_start_date,
            shipment_end_date: shipment_end_date,
            vendor_id: vendor_id
        };
        // var vendormanagement_data_filter = Globals.base_url + 'vendormanagement_data_filter';
        var sumation_of_profit = 0;
        var sumation_of_payment_amount = 0;
        var sumation_of_invoice_amount = 0;
        var sumation_of_payment_amount_a = 0;
        var sumation_of_payment_amount_d = 0;
        var payment_amount_diff = 0;
        var sum_payment_amount_diff = 0;
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: "vendormanagement_data_filter",
            data: data,
            dataType: "JSON",
            success: function (response_all) {
                var response = response_all.all_data;
                var previous_due = response_all.previous_dues;
                var html = '';
                var j = 1;

                var d_amount_a = 0;
                var d_calculation = 0;
                var vendor_list = [];
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {
                        var total_amount = 0;
                        var amount_a = 0;
                        previous_due.map(function (e) {
                            if (parseInt(e.vendor_id) == parseInt(response[i].vendor_id)) {
                                if (jQuery.inArray(response[i].vendor_id, vendor_list) == -1) {
                                    amount_a = e.opening_due_amount;
                                }
                            }
                        })
                        var amount_d = 0;
                        if (response[i].payment != null) {
                            total_amount = parseInt(response[i].payment);
                        }
                        if (response[i].invoice_amount != null) {
                            sumation_of_profit += parseInt(response[i].invoice_amount);
                            payment_amount_diff = response[i].invoice_amount - total_amount;
                            sum_payment_amount_diff += response[i].invoice_amount - total_amount;
                        }
                        amount_d = parseFloat(response[i].invoice_amount) + parseFloat(amount_a) - total_amount;
                        sumation_of_payment_amount += total_amount;
                        sumation_of_payment_amount_a += amount_a;
                        sumation_of_payment_amount_d += amount_d;
                        sumation_of_invoice_amount +=
                            html += '<tr>';
                        html += '<td>' + j + '</td>';
                        html += '<td><a href="' + Globals.base_url + '/vendor_order_detail/' + response[i].vendor_id + '/' + response[i].invoice_date + '/' + response[i].vendor_invoice_id + '">' + response[i].invoice_date + '</a></td>';
                        html += '<td><a href="' + Globals.base_url + '/vendor_order_detail_by_tonya/' + response[i].vendor_id + '">' + response[i].name + '<a/></td>';


                        if (jQuery.inArray(response[i].vendor_id, vendor_list) != -1) {
                            // console.log("is in array");
                            html += '<td><input type="tel" id="amount_a' + response[i].vendor_invoice_id + '"  data_current_amount="' + amount_a + '" data_vendor_id = "' + response[i].vendor_id + '" data_invoice_id="' + response[i].vendor_invoice_id + '" value="' + d_amount_a + '" class="form-control digits" readonly></td>';
                            amount_d = parseFloat(response[i].invoice_amount) + parseFloat(d_amount_a) - total_amount;
                            d_amount_a = amount_d;

                        } else {

                            // console.log("is NOT in array");
                            vendor_list.push(response[i].vendor_id);
                            html += '<td><input type="tel" id="amount_a' + response[i].vendor_invoice_id + '"  data_current_amount="' + amount_a + '" data_vendor_id = "' + response[i].vendor_id + '" data_invoice_id="' + response[i].vendor_invoice_id + '" value="' + amount_a + '" class="form-control digits vendor_due_blance"></td>';
                            d_amount_a = amount_d;
                            amount_d = parseFloat(response[i].invoice_amount) + parseFloat(amount_a) - total_amount;
                        }

                        html += '<td class="digits_td"  id="amount_b' + response[i].vendor_invoice_id + '">' + response[i].invoice_amount + '</td>';
                        html += '<td><input type="tel" class="form-control digits insert_vendor_payments" data_vendor_id = "' + response[i].vendor_id + '" data_current_amount="' + total_amount + '" data_invoice_id="' + response[i].vendor_invoice_id + '"  value="' + total_amount + '"></td>';
                        html += '<td class="digits_td existing_due_amount" id="amount_d' + response[i].vendor_invoice_id + '">' + amount_d + '</td>';
                       // html += '<td>'+response[i].arrival_case_quantity+'*'+response[i].case_inputs+'+'+response[i].arrival_ball_quantity+'*'+response[i].ball_inputs+'+'+response[i].arrival_unit_quantity+'='+response[i].quantity+'*'+response[i].unit_cost_price+'='+response[i].invoice_amount+'</td>';
                       html += '<td>原価'+response[i].unit_cost_price+'円ｘバラ数量'+response[i].quantity+'＝'+response[i].invoice_amount+'円</td>';
                       html += '</tr>';
                        j++;

                    }
                    html += '<tr><td colspan="3" style="text-align:right;">合計</td><td></td><td class="digits_td">' + sumation_of_profit + '</td><td class="digits_td">' + sumation_of_payment_amount + '</td><td class="digits_td">' + sumation_of_payment_amount_d + '</td><td></td></tr>';
                    $('.TotalBlance').text(sumation_of_payment_amount_d);
                    $('.TotalBlance').digits_td();
                } else {
                    html += '<tr><td colspan="8" style="text-align:center;font-size:24px">データ無し</td></tr>';
                }
                $('#shipment_table_dataddd').html(html);
                $('.digits_td').digits_td();
                $('.digits').digits();
                if (mesg_status != 0) {
                    if (mesg_status == 1) {
                        success_message('managementshipment_message', 'alert-success', '入金設定が完了しました。');
                    } else if (mesg_status == 2) {
                        success_message('managementshipment_message', 'alert-success', 'payment delete successfully');
                    }
                }
            }
        });
    }

    function get_management_vendor_data_list_tonya(vendor_id, shipment_start_date, shipment_end_date, mesg_status, order_by = 0) {

        var data = {
            shipment_start_date: shipment_start_date,
            shipment_end_date: shipment_end_date,
            vendor_id: vendor_id
        };
        // var vendormanagement_data_filter = Globals.base_url + 'vendormanagement_data_filter';
        var sumation_of_profit = 0;
        var sumation_of_payment_amount = 0;
        var sumation_of_invoice_amount = 0;
        var sumation_of_payment_amount_a = 0;
        var sumation_of_payment_amount_d = 0;
        var payment_amount_diff = 0;
        var sum_payment_amount_diff = 0;
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: Globals.base_url+"/vendormanagement_data_filter_by_tonya",
            data: data,
            dataType: "JSON",
            success: function (response_all) {
                var response = response_all.all_data;
                var previous_due = response_all.previous_dues;
                var html = '';
                var j = 1;

                var d_amount_a = 0;
                var d_calculation = 0;
                var vendor_list = [];
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {
                        var total_amount = 0;
                        var amount_a = 0;
                        previous_due.map(function (e) {
                            if (parseInt(e.vendor_id) == parseInt(response[i].vendor_id)) {
                                if (jQuery.inArray(response[i].vendor_id, vendor_list) == -1) {
                                    amount_a = e.opening_due_amount;
                                }
                            }
                        })
                        var amount_d = 0;
                        if (response[i].payment != null) {
                            total_amount = parseInt(response[i].payment);
                        }
                        if (response[i].invoice_amount != null) {
                            sumation_of_profit += parseInt(response[i].invoice_amount);
                            payment_amount_diff = response[i].invoice_amount - total_amount;
                            sum_payment_amount_diff += response[i].invoice_amount - total_amount;
                        }
                        amount_d = parseFloat(response[i].invoice_amount) + parseFloat(amount_a) - total_amount;
                        sumation_of_payment_amount += total_amount;
                        sumation_of_payment_amount_a += amount_a;
                        sumation_of_payment_amount_d += amount_d;
                        sumation_of_invoice_amount +=
                            html += '<tr>';
                        html += '<td>' + j + '</td>';
                        html += '<td><a href="' + Globals.base_url + '/vendor_order_detail/' + response[i].vendor_id + '/' + response[i].invoice_date + '/' + response[i].vendor_invoice_id + '">' + response[i].invoice_date + '</a></td>';
                        //html += '<td><a href="' + Globals.base_url + '/vendor_order_detail_by_tonya/' + response[i].vendor_id + '">' + response[i].name + '<a/></td>';


                        if (jQuery.inArray(response[i].vendor_id, vendor_list) != -1) {
                            // console.log("is in array");
                            html += '<td><input type="tel" id="amount_a' + response[i].vendor_invoice_id + '"  data_current_amount="' + amount_a + '" data_vendor_id = "' + response[i].vendor_id + '" data_invoice_id="' + response[i].vendor_invoice_id + '" value="' + d_amount_a + '" class="form-control digits" readonly></td>';
                            amount_d = parseFloat(response[i].invoice_amount) + parseFloat(d_amount_a) - total_amount;
                            d_amount_a = amount_d;

                        } else {

                            // console.log("is NOT in array");
                            vendor_list.push(response[i].vendor_id);
                            html += '<td><input type="tel" id="amount_a' + response[i].vendor_invoice_id + '"  data_current_amount="' + amount_a + '" data_vendor_id = "' + response[i].vendor_id + '" data_invoice_id="' + response[i].vendor_invoice_id + '" value="' + amount_a + '" class="form-control digits vendor_due_blance"></td>';
                            d_amount_a = amount_d;
                            amount_d = parseFloat(response[i].invoice_amount) + parseFloat(amount_a) - total_amount;
                        }

                        html += '<td class="digits_td"  id="amount_b' + response[i].vendor_invoice_id + '">' + response[i].invoice_amount + '</td>';
                        html += '<td><input type="tel" class="form-control digits insert_vendor_payments" data_vendor_id = "' + response[i].vendor_id + '" data_current_amount="' + total_amount + '" data_invoice_id="' + response[i].vendor_invoice_id + '"  value="' + total_amount + '"></td>';
                        html += '<td class="digits_td existing_due_amount" id="amount_d' + response[i].vendor_invoice_id + '">' + amount_d + '</td>';
                       // html += '<td>'+response[i].arrival_case_quantity+'*'+response[i].case_inputs+'+'+response[i].arrival_ball_quantity+'*'+response[i].ball_inputs+'+'+response[i].arrival_unit_quantity+'='+response[i].quantity+'*'+response[i].unit_cost_price+'='+response[i].invoice_amount+'</td>';
                       html += '<td>原価'+response[i].unit_cost_price+'円ｘバラ数量'+response[i].quantity+'＝'+response[i].invoice_amount+'円</td>';

                       html += '</tr>';
                        j++;

                    }
                    html += '<tr><td colspan="2" style="text-align:right;">合計</td><td></td><td class="digits_td">' + sumation_of_profit + '</td><td class="digits_td">' + sumation_of_payment_amount + '</td><td class="digits_td">' + sumation_of_payment_amount_d + '</td><td></td></tr>';

                    $('.TotalBlance').text(sumation_of_payment_amount_d);
                    $('.TotalBlance').digits_td();
                } else {
                    html += '<tr><td colspan="7" style="text-align:center;font-size:24px">データ無し</td></tr>';
                }
                $('#shipment_table_dataddd').html(html);
                // $('.TotalBlance').text(sumation_of_payment_amount);
                $('.digits_td').digits_td();

                $('.digits').digits();
                if (mesg_status != 0) {
                    if (mesg_status == 1) {
                        success_message('managementshipment_message', 'alert-success', '入金設定が完了しました。');
                    } else if (mesg_status == 2) {
                        success_message('managementshipment_message', 'alert-success', 'payment delete successfully');
                    }
                }
            }
        });
    }

    $(document).delegate('.view_p_list_by_voucher', 'click', function () {
        $('#show_product_list_by_voucher_number').modal("show");
        var voucher_number = $(this).text();
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: "get_all_vendor_order_item_by_voucher",
            data: {voucher_number: voucher_number},
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                var html = '';
                var sum_of_totals = 0;
                for (var i = 0; i < response.length; i++) {
                    var cse_inputs = (response[i]['case_inputs'] > 0 ? response[i]['case_inputs'] : 1);
                    var bl_inputs = (response[i]['ball_inputs'] > 0 ? response[i]['ball_inputs'] : 1);
                    var total_amount = parseInt(response[i]['quantity']) * parseInt(response[i]['cost_price']) * parseInt(cse_inputs) * parseInt(bl_inputs);
                    sum_of_totals += total_amount;
                    html += '<tr>';
                    html += '<td>' + response[i]['name'] + '</td>';
                    html += '<td>' + response[i]['case_inputs'] + '</td>';
                    html += '<td>' + response[i]['ball_inputs'] + '</td>';
                    html += '<td>' + response[i]['quantity'] + '</td>';
                    html += '<td>' + response[i]['cost_price'] + '</td>';
                    html += '<td>' + total_amount + '</td>';
                    html += '</tr>';
                }
                $('.total_amount_invoice').text(sum_of_totals);
                $('.voucher_product_list_table_dataddd').html(html);
            }
        });
    });
    /* managementshett invoice generator */
    $(document).delegate('.create_invoice', 'click', function (e) {
        e.preventDefault();
        var invoice_type = $(this).attr('data_type');
        if (invoice_type == 1) {
            var msgs = 'please select a vendor';
            var c_v_id = $('.v_ids_v').val();
            var start_date = $('#vendor_start_date').val();
            var end_date = $('#vendor_end_date').val();
        } else {
            var msgs = '販売先を選択してください';
            var c_v_id = $('.c_ids_v').val();
            var start_date = $('#shipment_start_date').val();
            var end_date = $('#shipment_end_date').val();
        }
        if (c_v_id != 0) {

            generate_management_sheet_pdf(invoice_type, c_v_id, start_date, end_date);
            return false;
        } else {
            alert(msgs);
            return false;
        }
    });
    $(document).delegate('.save_all_shipmentconfirmation_order', 'click', function (e) {
        e.preventDefault();
        var order_infos = [];
        $('.shipment_confirmation_tble tr').each(function () {
            var customer_order_id = $(this).find('.d_quantity').attr('data_customer_order_id');
            var delivery_able_quantity = $(this).find('.d_quantity').val();
            order_infos.push({'customer_order_id': customer_order_id, 'quantity': delivery_able_quantity});
        });
        // console.log(order_infos);
        // console.log(order_infos[0].quantity);
        // return false;
        if (order_infos.length == 1 && typeof order_infos[0].customer_order_id == 'undefined') {
            alert('確定する商品がありません。');
            return false;
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: "shipment_confirmation_update",
            data: {order_infos: order_infos},
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                window.location.reload(true);
            }
        });
        //console.log(order_infos);
    })

    function generate_management_sheet_pdf(invoice_type, c_v_id, start_date, end_date) {
        var management_sheet_report_both = Globals.base_url + 'management_sheet_report_both';
        var yourdata = {invoice_type: invoice_type, c_v_id: c_v_id, start_date: start_date, end_date: end_date};
        $('.loading_image').show();
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: 'POST',
            cache: false,
            xhrFields: {
                responseType: 'blob'
            },
            url: management_sheet_report_both,
            data: yourdata,
            success: function (response, status, xhr) {
                console.log(response);

                if (response.error_found == 1) {
                    success_message('managementshipment_message', 'alert-danger', 'pdf generate fail');
                } else {
                    var filename = "";
                    var disposition = xhr.getResponseHeader('Content-Disposition');

                    if (disposition) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        var matches = filenameRegex.exec(disposition);
                        if (matches !== null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                    }
                    var linkelem = document.createElement('a');
                    try {
                        var blob = new Blob([response], {type: 'application/octet-stream'});

                        if (typeof window.navigator.msSaveBlob !== 'undefined') {
                            //   IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                            window.navigator.msSaveBlob(blob, filename);
                        } else {
                            var URL = window.URL || window.webkitURL;
                            var downloadUrl = URL.createObjectURL(blob);

                            if (filename) {
                                // use HTML5 a[download] attribute to specify filename
                                var a = document.createElement("a");

                                // safari doesn't support this yet
                                if (typeof a.download === 'undefined') {
                                    window.location = downloadUrl;
                                } else {
                                    a.href = downloadUrl;
                                    a.download = filename;
                                    document.body.appendChild(a);
                                    a.target = "_blank";
                                    a.click();
                                }
                            } else {
                                window.location = downloadUrl;
                            }
                        }

                    } catch (ex) {
                        console.log(ex);
                    }
                    $('.loading_image').hide();
                }
            }
        });
        return false;
    }

    /* managementshett invoice generator */
    function downloadFile(url) {
        var iframe;
        iframe = document.getElementById("download-container");
        if (iframe === null) {
            iframe = document.createElement('iframe');
            iframe.id = "download-container";
            iframe.style.visibility = 'hidden';
            document.body.appendChild(iframe);
        }
        iframe.src = url;
    }


    //get all order
    $('.filter_confirmation_data').click(function (e) {
        e.preventDefault();
        var customer_id = $('#slct_cust').val();
        var shop_id = $('#slct_shop').val();
        var voucher_number = $('#voucher_num').val();
        var curr_date = $('#shipment_conf_date').val();
        get_all_customer_data_list(customer_id, shop_id, voucher_number, curr_date, mesg_status = 0);
    })

    function get_all_customer_data_list(customer_id = 0, shop_id = null, voucher_number = null, curr_date = null, mesg_status = 0) {
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: "get_all_customer_in_confirm",
            data: {customer_id: customer_id, shop_id: shop_id, voucher_number: voucher_number, curr_date: curr_date},
            dataType: "JSON",
            success: function (response) {
                console.log(response.customer_order_list);
                var order_list = '';
                if (response.customer_order_list.length > 0) {
                    for (var i = 0; i < response.customer_order_list.length; i++) {
                        var case_stock = (response.customer_order_list[i].case_quantity == null ? 0 : response.customer_order_list[i].case_quantity);
                        var ball_stock = (response.customer_order_list[i].ball_quantity == null ? 0 : response.customer_order_list[i].ball_quantity);
                        var unit_stock = (response.customer_order_list[i].unit_quantity == null ? 0 : response.customer_order_list[i].unit_quantity);
                        var quantity = response.customer_order_list[i].quantity;
                        var delivery_able_quantity = '';
                        if (response.customer_order_list[i].inputs == 'ケース') {
                            delivery_able_quantity = (case_stock > quantity ? quantity : case_stock);
                        } else if (response.customer_order_list[i].inputs == 'ボール') {
                            delivery_able_quantity = (ball_stock > quantity ? quantity : ball_stock);
                        } else {
                            delivery_able_quantity = (unit_stock > quantity ? quantity : unit_stock);
                        }

                        order_list += '<tr>';
                        order_list += '<td>' + response.customer_order_list[i].name + '</td>';
                        order_list += '<td>' + response.customer_order_list[i].shop_name + '</td>';

                        order_list += '<td>' + response.customer_order_list[i].voucher_number + '</td>';
                        order_list += '<td>' + response.customer_order_list[i].delivery_date + '</td>';
                        order_list += '<td>' + response.customer_order_list[i].status + '</td>';
                        order_list += '<td>' + response.customer_order_list[i].jan + '</td>';
                        order_list += '<td>' + response.customer_order_list[i].product_name + '</td>';
                        order_list += '<td>' + response.customer_order_list[i].case_inputs + '</td>';
                        order_list += '<td>' + response.customer_order_list[i].ball_inputs + '</td>';


                        order_list += '<td>' + case_stock + '</td>';
                        order_list += '<td>' + ball_stock + '</td>';
                        order_list += '<td>' + unit_stock + '</td>';
                        order_list += '<td>' + response.customer_order_list[i].inputs + '</td>';
                        order_list += '<td>' + response.customer_order_list[i].quantity + '</td>';
                        if (response.customer_order_list[i].status == "確定済み") {
                            order_list += '<td>' + delivery_able_quantity + '</td>';
                        } else {
                            order_list += '<td><input type="text" name="delivery_quantity" data_customer_order_id="' + response.customer_order_list[i].customer_order_id + '" class="form-control d_quantity" value="' + delivery_able_quantity + '"></td>';
                        }
                        if (response.customer_order_list[i].status == "確定済み") {
                            //order_list += '<td class="shipment_conf_action" data_customer_order_id="' + response.customer_order_list[i].customer_order_id + '"><i class="material-icons cancel_shipment_popup">settings</i></td>';
                        } else {
                            //order_list += '<td class="shipment_conf_action_not" data_customer_order_id="' + response.customer_order_list[i].customer_order_id + '"><i class="material-icons cancel_shipment_popup">settings</i></td>';
                        }


                        order_list += '</tr>';
                    }

                } else {
                    order_list += '<tr><td colspan="15" style="text-align:center">商品がありません。</td></tr>';

                }
                $('.shipment_confirmation_tble').html(order_list);
            }
        });
    }

    //get all order
    $(document).delegate('.shipment_conf_action', 'click', function (e) {
        e.preventDefault();

        var customer_order_id = $(this).attr("data_customer_order_id");
        var message = [{message: '確定を取消しますか？'}];
        var buttons = [{buttons: '<button type="button" data_customer_order_id="' + customer_order_id + '" class="btn btn-danger delete_shipment_conf_info_ok btn-sm">はい</button>'}, {buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">いいえ</button>'}]

        action_popup_navigations(message, buttons, 'yes_no_navigation_message');

    })

    $(document).delegate('.delete_shipment_conf_info_ok', 'click', function (e) {
        e.preventDefault();
        var customer_order_id = $(this).attr("data_customer_order_id");
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: "shipment_conf_delete",
            data: {customer_order_id: customer_order_id},
            dataType: "JSON",
            success: function (response) {
                window.location.reload();
            }
        });

    })

    $('.clear_date').click(function (event) {
        /* Act on the event */
        $('#delivery_date').val('');
        $('#shipment_conf_date').val('');
    });

    /*test2 jquery*/


    $(document).delegate('.warehouse_list_show', 'click', function (e) {
        e.preventDefault();
        get_warehouse_list();
        $('#warehouse_message_success').html('');
        $('#warehouse_show_modal').modal('show');
    })
    $('.close_warehouse_update').on('click', function () {
        get_warehouse_list();
        $('#warehouse_message_success').html('');
        $('#warehouse_add_edit_modal').modal('hide');
        $('#warehouse_show_modal').modal('show');
    })
    $(document).delegate('.delete_warehouse', 'click', function (e) {
        e.preventDefault();
        var warehouse_id = $(this).attr('warehouse_id');
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "post",
            url: "warehouse_delete",
            data: {id: warehouse_id},
            dataType: "JSON",
            success: function (response) {
                $('#warehouse_add_edit_modal').modal('hide');
                $('#warehouse_show_modal').modal('show');
                success_message('warehouse_message_success', 'alert-success', '削除しました');
                get_warehouse_list();

            }
        });

    })
    $(document).delegate('.filter_by_warehouse', 'click', function (e) {
        e.preventDefault();
        var data_warehouse_id = $(this).attr('data_warehouse_id');
        var warehouse_name = $(this).text();
        if (data_warehouse_id == 0) {
            $('#warehouse_show_modal').modal('hide');
            filter_by_warehouse();
        } else {
            $('#warehouse_show_modal').modal('hide');
            filter_by_warehouse(data_warehouse_id, warehouse_name);

        }
    })
    $(document).delegate('.add_new_warehouse', 'click', function (e) {
        e.preventDefault();
        var data_type = $(this).attr('data_type');
        if (data_type != 0) {
            $('.add_warehouse_regs').text('変更');
            $('.warehouse_modal_change').text('倉庫情報');
            $('.delete_warehouse').show();
            $('.delete_warehouse').attr('warehouse_id', data_type);
            get_warehouse_list(data_type);
        } else {
            $('.warehouse_id').val(0);
            $('#warehouse_name').val('');
            $('#warehouse_phone').val('');
            $('#warehouse_address').val('');
            $('.delete_warehouse').hide();
            $('.add_warehouse_regs').text('追加');
            $('.warehouse_modal_change').text('新規倉庫追加');
        }
        $('#warehouse_add_updated_message').html('');
        $('#warehouse_message_success').html('');
        $('#warehouse_show_modal').modal('hide');
        $('#warehouse_add_edit_modal').modal('show');
    })
    $('.add_warehouse_regs').on('click', function (e) {
        e.preventDefault();
        var ware_id = $('.warehouse_id').val();
        var ware_name = $('#warehouse_name').val();
        var ware_address = $('#warehouse_address').val();
        var ware_phone = $('#warehouse_phone').val();
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "warehouse_store",
            data: {ware_id: ware_id, ware_house_name: ware_name, address: ware_address, phone: ware_phone},
            dataType: "JSON",
            success: function (response) {
                // console.log(response);
                if (response.message != 'success') {
                    error_message('warehouse_add_updated_message', response.class_name, response.message)
                } else {
                    $('#warehouse_add_edit_modal').modal('hide');
                    if (ware_id == 0) {
                        success_message('warehouse_message_success', response.class_name, '登録が完了しました');
                        get_warehouse_list();
                    } else {
                        success_message('warehouse_message_success', response.class_name, '変更しました');
                        get_warehouse_list();
                    }
                    $('#warehouse_show_modal').modal('show');

                }

            }
        });
    })
    /*test1 jquery*/
    $('.customer_shop').on('click', function () {
        get_shop_list()
        $('#shop_message_success').html('');
        $('#customer_show_modal').modal('hide');
        $('#customer_shop_modal').modal('show');
    })

    $('.add_new_shop').on('click', function () {
        $('#add_shop_message').html('');
        $('#customer_shop_modal').modal('hide');
        customer_list_dropdown();
        all_fields_blunk()
        $(".add_shop_info").html('新規店舗追加');
        $(".change_table_top_title").html('新規店舗追加');
        $(".delete_shop_info").removeClass('d-block');
        $(".delete_shop_info").addClass('d-none');
        $('#shop_reg_modal').modal('show');
    })
    $('.add_shop_info').on('click', function () {
        var shop_update_id = $('#shop_update_id').val();
        var customer_id = $('#customer_list').val();
        var shop_code = $('#shop_code').val();
        var shop_name = $('#shop_name').val();
        var shop_address = $('#shop_address').val();
        var postal_code = $('#postal_code').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var delivery_cycle = $('#delivery_cycle').val();
        var data = {
            shop_update_id: shop_update_id,
            customer_id: customer_id,
            shop_code: shop_code,
            shop_name: shop_name,
            shop_address: shop_address,
            postal_code: postal_code,
            phone: phone,
            email: email,
            delivery_cycle: delivery_cycle
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "shop_store",
            data: data,
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                if (response.message != 'success') {
                    error_message('add_shop_message', response.class_name, response.message)
                } else {
                    $('#shop_reg_modal').modal('hide');
                    success_message('shop_message_success', response.class_name, response.mesg);
                    //          $('#navigation_message').removeClass('show').addClass('hide');
                    //         var message = [{ message: response.mesg }];
                    // var buttons = [{ buttons: '<button type="button" id="close_success_error_navi_open_default" class="btn btn-info btn-sm">確認</button>' }]
                    // success_error_confirmation_popup(message, buttons);
                    get_shop_list()
                    $('#customer_shop_modal').modal('show');

                }

            }
        });
    })
    $('.close_shop_reg_update').on('click', function () {
        $('#shop_reg_modal').modal('hide');
        all_fields_blunk()
        $('#customer_shop_modal').modal('show');
    })
    $('.custom_shop_close').on('click', function () {
        $('#customer_shop_modal').modal('hide');
        close_all_navi_msg();
        show_hide_nav_icn(0);
        get_customer_list();
        $('#customer_message_success').html('');
        $("#add_customer_message").html('');
        $("#update_customer_message_fail").html('');
        $("#customer_show_modal").modal("show");
    })

    $(document).delegate("#close_success_error_navi_open_default", "click", function (e) {
        e.preventDefault(0);

        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        show_hide_default_navigation(0, 1);

    })
    $(document).delegate("#shop_edit_button", "click", function (e) {
        e.preventDefault(0);
        var shop_id = $(this).attr('shop-id');
        var customer_id = $(this).attr('customer-id');

        customer_list_dropdown(customer_id);
        all_fields_blunk()
        $('#customer_shop_modal').modal('hide');
        get_shop_list(shop_id);

        $(".add_shop_info").text('更新');
        $(".change_table_top_title").text('店舗情報');
        $(".delete_shop_info").removeClass('d-none');
        $(".delete_shop_info").addClass('d-block');
        $('#shop_reg_modal').modal('show');

    });


    $(document).delegate(".delete_shop_data_id", "click", function (e) {
        var shop_id = $(this).attr('data-id');
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "delete_shop_info",
            data: {shop_id: shop_id},
            dataType: "JSON",
            success: function (response) {
                $('#shop_reg_modal').modal('hide');
                get_shop_list()
                $('#customer_shop_modal').modal('show');
                //$('#yes_no_navigation_message').removeClass('show').addClass('hide');
                //$('#yes_no_confirmation_modal').modal('hide');
                $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
                success_message('shop_message_success', 'alert-success', response.message);
            }
        });
        // alert(shop_id);
    })

    $(document).delegate(".delete_shop_info", "click", function (e) {
        e.preventDefault();
        show_hide_default_navigation(0, 0);
        var shop_id = $('#shop_update_id').val();
        var message = [{message: 'この商品を削除しますか？'}];
        var buttons = [{buttons: '<button type="button" data-id="' + shop_id + '" class="btn btn-danger delete_shop_data_id btn-sm">はい</button>'}, {buttons: '<button type="button" id="close_success_error_navi_open_default" class="btn btn-info btn-sm">いいえ</button>'}]
        success_error_confirmation_popup(message, buttons);
    })


    $(".name_to_jan").click(function () {
        var status = $(this).attr('data_status');
        if (status == 0) {
            $('.physicaltbody tr td:first-child').each(function () {
                $(this).text($(this).attr('data_jan'));
            });
            $(this).attr('data_status', 1);
        } else {
            $('.physicaltbody tr td:first-child').each(function () {
                $(this).text($(this).attr('data_name'));
            });
            $(this).attr('data_status', 0);
        }

    });
    $('.filter_by_jcodes').keypress(function (e) {
        if (e.keyCode == 13) {
            stock_details_by_handy();
            return false;
        }
    });
    $('.filter_by_vnames').change(function () {
        var vendor_id = $(this).val();
        var page_url = url_search();
        if (page_url == 'stock_details_by_handy') {
            stock_details_by_handy();
            return false;
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "getall_receiveable_items_list",
            data: {vendor_id: vendor_id},
            dataType: "JSON",
            success: function (response) {
                $('.physicaltbody').html('');
                var htms = '';
                var shw_status = $('.name_to_jan').attr('data_status');
                if (response.items.length > 0) {
                    for (var i = 0; i < response.items.length; i++) {
                        var name_txt = (shw_status == 0 ? response.items[i].item_name : response.items[i].jan);
                        var received_quantity = (response.items[i].arraival_quantity !== null ? response.items[i].arraival_quantity : '');
                        htms += "<tr>";
                        htms += "<td data_jan='" + response.items[i].jan + "' data_name='" + response.items[i].item_name + "'>" + name_txt + "</td>";
                        htms += '<td style="text-align: right;vertical-align:middle !important;">' + response.items[i].pending_order_quantity + '</td>';
                        htms += '<td style="text-align: right;vertical-align:middle !important;">' + received_quantity + '</td>';
                        htms += "</tr>";
                    }
                } else {
                    htms += "<tr><td colspan='3' style='text-align:center;'>データ無し</td></tr>";
                }
                $('.physicaltbody').html(htms);
                $('.num_total').text(response.total_rw + ' 件');
                $('.num_total').attr('data_unreceived_total', response.total_rw);
            }
        });
    })

    $('#receive_inventorys_to_handy_recv_screen').click(function () {

        window.location.href = 'handy_order_receive_scan_jan';
        return false;
        var totals = $('.num_total').attr('data_unreceived_total');
        // if (totals == 0) {
        //     $('.handy_error_msg').text('検品対象のデータがありません。');
        //     $('.handdy_error').removeClass('hide').addClass('show');
        //     return false;
        // } else {
        //     window.location.href = 'handy_order_receive';
        // }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "check_order_exists",
            type: "POST",
            dataType: "JSON",
            data: {order_type: 1},
            success: function (response) {
                // console.log(response.shop_details.length);
                if (response.totals == 0) {
                    $('.handy_error_msg').text('検品対象のデータがありません。');
                    $('.handdy_error').removeClass('hide').addClass('show');
                    return false;
                } else {
                    // window.location.href = 'handy_order_receive';
                    window.location.href = 'handy_order_receive_scan_jan';
                }

            }
        });

    });
    $(".change_config_recevied").click(function () {
        var state_vl = $(this).attr('input_state');
        var order_able_qty = $('.order_inputs_quantitys').val();
        var order_type = $('.order_inputs_quantitys').attr('data_inputs_type');
        $('.receive_quantity').val(0);
        switch (state_vl) {
            case '1':
                $('.common_state').text('ボール');
                $(this).attr('input_state', 2);
                if (order_type == 'ボール') {
                    $('.order_quantity').val(order_able_qty);
                    $('.receive_quantity').val(order_able_qty);
                } else {
                    $('.order_quantity').val(0);
                    $('.receive_quantity').val(0);
                }
                break;
            case '2':
                $('.common_state').text('バラ');
                $(this).attr('input_state', 3);
                if (order_type == 'バラ') {
                    $('.order_quantity').val(order_able_qty);
                    $('.receive_quantity').val(order_able_qty);
                } else {
                    $('.order_quantity').val(0);
                    $('.receive_quantity').val(0);
                }
                break;
            default:
                $('.common_state').text('ケース');
                $(this).attr('input_state', 1);
                if (order_type == 'ケース') {
                    $('.order_quantity').val(order_able_qty);
                    $('.receive_quantity').val(order_able_qty);
                } else {
                    $('.order_quantity').val(0);
                    $('.receive_quantity').val(0);
                }
                break;
        }
    });

    $('.change_rack').click(function () {
        var current_status = $(this).attr('rect_status');
        $('input,select').removeClass('active_input');
        if (current_status == 0) {
            if ($('.reck_number option').length > 0) {
                $('#reck_code').removeClass('show').addClass('hide');
                $('.reck_number').removeClass('hide').addClass('show');

                $('.reck_number').addClass('active_input');
                $('.change_rack').attr('rect_status', 1);
                $('.change_rack').text('既存');
            } else {
                $('.handy_error_msg').text('棚番号がみつかりません。');
                $('.handdy_error').removeClass('hide').addClass('show');
                return false;
            }
        } else {
            $('#reck_code').removeClass('hide').addClass('show');
            $('.reck_number').removeClass('show').addClass('hide');
            $('.change_rack').attr('rect_status', 0);
            $('.change_rack').text('新規');
            $("#reck_code").focus();
            $('#reck_code').addClass('active_input');

            if ($('#reck_code').hasClass('scanner')) {
                $("#reck_code").blur();
            }
        }
    })

    $(document).delegate(".color_row_new_color", "click", function (e) {
        $(this).removeClass('color_row_new_color');
    })


}); /*jquery end */
function get_shop_list(shop_id = null) {
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_shop_list",
        type: "POST",
        dataType: "JSON",
        data: {shop_id: shop_id},
        success: function (response) {
            // console.log(response.shop_details.length);
            // return 0;
            if (shop_id == null) {
                $(".shop_list_item").html("");
                var htmls = '';
                for (var i = 0; i < (response.shop_details.length); i++) {
                    htmls += '<tr>';
                    htmls += '<td>' + response.shop_details[i].customer_name + '</td>';
                    htmls += '<td>' + response.shop_details[i].shop_no + '</td>';
                    htmls += '<td>' + response.shop_details[i].shop_name + '</td>';
                    htmls += '<td><a href="" class="" id="shop_edit_button" shop-id="' + response.shop_details[i].customer_shop_id + '" customer-id="' + response.shop_details[i].customer_id + '"><i class="material-icons">settings</i></a></td>';
                    htmls += '</tr>';
                }

                $(".shop_list_item").html(htmls);
            } else {
                // console.log(response.shop_details);
                $('#shop_update_id').val(shop_id);
                $('#shop_code').val(response.shop_details.shop_no);
                $('#shop_name').val(response.shop_details.shop_name);
                $('#shop_address').val(response.shop_details.shop_address);
                $('#postal_code').val(response.shop_details.shop_postal_code);
                $('#phone').val(response.shop_details.phone);
                $('#email').val(response.shop_details.email);
                $('#delivery_cycle').val(response.shop_details.delivery_cycle);
            }
        }
    });
}

function customer_list_dropdown(customer_id = null) {
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        type: "POST",
        url: "get_customer_list",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            var html = '';
            for (var i = 0; i < response.all_customer_list.length; i++) {
                var selected = (response.all_customer_list[i].customer_id == customer_id ? 'selected' : '');
                html += '<option value="' + response.all_customer_list[i].customer_id + '"' + selected + '>' + response.all_customer_list[i].name + '</option>';
            }
            $('#customer_list').html(html);

        }
    });
}

function all_fields_blunk() {
    $('#add_shop_message').html('');
    $('#shop_message_success').html('');
    $('#shop_update_id').val('');
    $('#shop_code').val('');
    $('#shop_name').val('');
    $('#shop_address').val('');
    $('#postal_code').val('');
    $('#phone').val('');
    $('#email').val('');
    $('#delivery_cycle').val('');
}

function get_warehouse_list(warehouse_id = null) {
    var warehouselist = Globals.base_url + 'get_warehouse_list';
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: warehouselist,
        type: "POST",
        dataType: "JSON",
        data: {warehouse_id: warehouse_id},
        success: function (response) {
            if (warehouse_id == null) {
                $(".warehouse_list_item").html("");
                var htmls = '<tr><td colspan="4" data_warehouse_id="0" class="text-center filter_by_warehouse">すべての倉庫</td></tr>';
                for (var i = 0; i < (response.all_warehouse_list.length); i++) {
                    htmls += '<tr>';
                    htmls += '<td data_warehouse_id="' + response.all_warehouse_list[i].ware_house_id + '" class=" filter_by_warehouse">' + response.all_warehouse_list[i].ware_house_name + '</td>';
                    htmls += '<td>' + response.all_warehouse_list[i].phone + '</td>';
                    htmls += '<td>' + response.all_warehouse_list[i].address + '</td>';
                    htmls += '<td><a href="#" class="add_new_warehouse"  data_type="' + response.all_warehouse_list[i].ware_house_id + '"><i class="material-icons">settings</i></a></td>';
                    htmls += '</tr>';
                }
                $(".warehouse_list_item").html(htmls);
            } else {
                // console.log(response.specific_warehouse_info);
                $('.warehouse_id').val(response.specific_warehouse_info.ware_house_id);
                $('#warehouse_name').val(response.specific_warehouse_info.ware_house_name);
                $('#warehouse_phone').val(response.specific_warehouse_info.phone);
                $('#warehouse_address').val(response.specific_warehouse_info.address);
            }
        }
    });
}

function filter_by_warehouse(warehouse_id = null, warehouse_name = null) {
    var filterurl = Globals.base_url + 'wareHouseQuery';
    if (warehouse_id != null) {
        $('.warehouse_list_show').text(warehouse_name);
    } else {
        $('.warehouse_list_show').text('全倉庫');
    }
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: filterurl,
        type: "post",
        dataType: "JSON",
        data: {ware_house_id: warehouse_id},
        success: function (response) {
            $(".ware_house_body").html("");
            var htmls = '';
            if (response.length > 0) {
                for (var i = 0; i < (response.length); i++) {
                    htmls += '<tr>';
                    htmls += '<td>' + response[i].ware_house_name + '</td>';
                    htmls += '<td>' + response[i].name + '</td>';
                    htmls += '<td>' + response[i].case_quantity + '</td>';
                    htmls += '<td>' + response[i].ball_quantity + '</td>';
                    htmls += '<td>' + response[i].unit_quantity + '</td>';
                    htmls += '<td>' + response[i].rack_number + '</td>';
                    htmls += '<td>' + response[i].jan + '</td>';
                    htmls += '</tr>';
                }
            } else {
                htmls += '<tr><td colspan="7" class="text-center">商品がありません。</td></tr>';
            }
            $(".ware_house_body").html(htmls);

        }
    });
}

function get_vendor_list_item_by_vendor_id(v_id, v_name) {
    var currentURL = window.location.href;
    var url_array = currentURL.split("/");
    var url_last_element = $(url_array).last()[0];

    if (url_last_element == 'receiveorder') {
        var custom_url = "receiveorder/" + v_id;
    }

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: custom_url,
        type: "GET",
        success: function (response) {
            if (url_last_element == 'receiveorder') {
                $('.order_receive_body').html('');
                console.log(response);
                var j = 0;
                var htmls = '';
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {
                        var total_inventory = (response[i].case_inputs * response[i].case_quantity) + (response[i].ball_inputs * response[i].ball_quantity) + response[i].unit_quantity;
                        var curDate = get_current_date();
                        /*stock quantity*/
                        var rack_number = (response[i].rack_number == null ? '' : response[i].rack_number);
                        var case_quantity = (response[i].case_quantity == null ? 0 : response[i].case_quantity);
                        var ball_quantity = (response[i].ball_quantity == null ? 0 : response[i].ball_quantity);
                        var unit_quantity = (response[i].unit_quantity == null ? 0 : response[i].unit_quantity);
                        var case_inputs = (response[i].case_inputs == null || response[i].case_inputs == 0 ? '' : response[i].case_inputs);
                        var ball_inputs = (response[i].ball_inputs == null || response[i].ball_inputs == 0 ? '' : response[i].ball_inputs);
                        /*stock quantity*/


                        /*order point and lot area*/
                        var order_point_case_qty = '';
                        var order_point_ball_qty = '';
                        var order_point_unit_qty = '';
                        var order_lot_case_qty = '';
                        var order_lot_ball_qty = '';
                        var order_lot_unit_qty = '';
                        var todays_case_arrival = '';
                        var todays_ball_arrival = '';
                        var todays_unit_arrival = '';
                        var color_class_td = 'sufficant_quantity';
                        /*order lot*/
                        order_lot_case_qty = (response[i].order_lot_case_quantity == 0 ? '' : response[i].order_lot_case_quantity);
                         order_lot_ball_qty = (response[i].order_lot_ball_quantity == 0 ? '' : response[i].order_lot_ball_quantity);
                         order_lot_unit_qty = (response[i].order_lot_unit_quantity == 0 ? '' : response[i].order_lot_unit_quantity);
                        /*order lot*/
                        order_point_case_qty = (response[i].order_point_case_quantity == 0 ? '' : response[i].order_point_case_quantity);
                        order_point_ball_qty = (response[i].order_point_ball_quantity == 0 ? '' : response[i].order_point_ball_quantity);
                        order_point_unit_qty = (response[i].order_point_unit_quantity == 0 ? '' : response[i].order_point_unit_quantity);
                         //order logic change by sacho

                        var total_order_point_inventory_qty = (response[i].case_inputs * (order_point_case_qty==''?0:order_point_case_qty)) + (response[i].ball_inputs * (order_point_ball_qty==''?0:order_point_ball_qty)) + (order_point_unit_qty==''?0:order_point_unit_qty);
                        var total_order_lot_inventory_qty = (response[i].case_inputs * (order_lot_case_qty==''?0:order_lot_case_qty)) + (response[i].ball_inputs * (order_lot_ball_qty==''?0:order_lot_ball_qty)) + (order_lot_unit_qty==''?0:order_lot_unit_qty);
                        color_class_td = (total_inventory < total_order_point_inventory_qty ? 'insufficant_quantity' : 'sufficant_quantity');//logic change by sacho

                        /*order point and lot area*/

                        /*todays arrival*/
                            todays_case_arrival = (response[i].today_case_arrival_qty == null ? '' : response[i].today_case_arrival_qty);

                            todays_ball_arrival = (response[i].today_ball_arrival_qty == null ? '' : response[i].today_ball_arrival_qty);

                            todays_unit_arrival = (response[i].today_unit_arrival_qty == null ? '' : response[i].today_unit_arrival_qty);

                        /*todays arrival*/
                        var gross_profit = parseFloat(parseFloat(response[i].selling_price) - parseFloat(response[i].cost_price));
                        var cp = parseFloat(response[i].cost_price);
                        var gross_profit_margin = (gross_profit * 100) / cp;
                        gross_profit_margin = gross_profit_margin.toFixed(2);
                        if (isNaN(gross_profit_margin)) {
                            gross_profit_margin = 0;
                        }

                        /*color on lest item on 24hours*/
                        var row_colors = '';
                        let now = +new Date();
                        let createdAt = +new Date(Date.parse(response[i].created_at.toString()));
                        var oneDay = 24 * 60 * 60 * 1000;

                        if ((now - createdAt) < oneDay) {
                            //within 24h
                            row_colors = 'color_latest_item_yes';
                        }
                        /*color on lest item on 24hours*/

                        /*color haccu list*/
                        var haccuColorRow = '';
                        var ordDte = response[i].order_date;
                        if(ordDte!=null){
                        var ordDate = ordDte.split(" ");
                        console.log(ordDate);
                        // console.log(response.order_date);
                        if((response[i].order_status == '未入荷' || response[i].order_status == '入荷済み') && (i==0)){
                            haccuColorRow = 'haccuColorRowForTodays';
                        }
                    }
                        console.log(response);
                        /*color haccu list*/

                        /*rack code manage*/
                        // var shelf_number = '';
                        //    if(rack_number.indexOf(',')!=-1){
                        //     rack_number = rack_number.replace(",", "<hr style='border:2px solid red;color:red;margin:0;padding:0;'>");
                        //    }

                        var rack_list = rack_number.split(",");
                        rack_number = rack_list.sort(function (a, b) {
                            return a - b
                        });
                        console.log(rack_number[0]);
                        /*rack code manage*/


                        htmls += '<tr class="receive_items ' + row_colors + ' tr_' + color_class_td + ' tr_hacc'+haccuColorRow+'" vendor_id="' + response[i].vendor_id + '" row_id="' + response[i].vendor_item_id + '">';
                        htmls += '<td>' + response[i].item_name + '</td>';

                        htmls += '<td class="digits_td total_inventory_qty inventory_color">' + total_inventory + '</td>';
                        htmls += '<td><input type="tel" class="form-control t_case_invent case_invent" value="' + case_quantity + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon">入数</div><input type="tel" class="form-control cmn_num_formt case_law_qty case_law_qty" value="' + case_inputs + '"></div></td>';
                        htmls += '<td><input type="tel" class="form-control t_bol_invent bol_invent" value="' + ball_quantity + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon">入数</div><input type="tel" class="form-control bol_law_qty cmn_num_formt bol_law_qty" value="' + ball_inputs + '"></div></td>';
                        htmls += '<td><input type="tel" class="form-control t_individual_invent individual_invent" value="' + unit_quantity + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon"></div><input type="tel" class="form-control ind_law_qty cmn_num_formt ind_law_qty" value="" readonly></div></td>';

                        htmls += '<td class="digits_td inventory_color">' + (response[i].order_status == '未入荷' ? (response[i].order_case_quantity*response[i].case_inputs + response[i].order_ball_quantity*ball_inputs + response[i].order_unit_quantity ) : '') + '</td>';
                        htmls += '<td type="tel" order_type="order_lot" field_type="ケース" class="update_receive_order_lot_qty">' + (response[i].order_status == '未入荷' ? response[i].order_case_quantity  : '') + '</td>';
                        htmls += '<td type="tel" order_type="order_lot" field_type="ボール" class="update_receive_order_lot_qty">' + (response[i].order_status == '未入荷' ? response[i].order_ball_quantity : '') + '</td>';
                        htmls += '<td type="tel" order_type="order_lot" field_type="バラ" class="update_receive_order_lot_qty">' + (response[i].order_status == '未入荷' ? response[i].order_unit_quantity : '') + '</td>';


                        htmls += '<td class="digits_td total_order_point_inventory_qty inventory_color">' + total_order_point_inventory_qty + '</td>';
                        htmls += '<td contenteditable="true" type="tel" order_type="order_point" field_type="ケース" class="update_receive_order_point_qty ' + color_class_td + '">' + order_point_case_qty + '</td>';
                        htmls += '<td contenteditable="true" type="tel" order_type="order_point" field_type="ボール" class="update_receive_order_point_qty ' + color_class_td + '">' + order_point_ball_qty + '</td>';
                        htmls += '<td contenteditable="true" type="tel" order_type="order_point" field_type="バラ" class="update_receive_order_point_qty ' + color_class_td + '">' + order_point_unit_qty + '</td>';

                        htmls += '<td class="digits_td total_order_lot_inventory_qty inventory_color">' + total_order_lot_inventory_qty + '</td>';
                        htmls += '<td contenteditable="true" type="tel" order_type="order_lot" field_type="ケース" class="update_receive_order_lot_qty">' + order_lot_case_qty + '</td>';
                        htmls += '<td contenteditable="true" type="tel" order_type="order_lot" field_type="ボール" class="update_receive_order_lot_qty">' + order_lot_ball_qty + '</td>';
                        htmls += '<td contenteditable="true" type="tel" order_type="order_lot" field_type="バラ" class="update_receive_order_lot_qty">' + order_lot_unit_qty + '</td>';

                        // htmls += '<td class="hacchu_qty haccu_case ' + c_order_color + '">' + case_order_amount + '</td>';
                        // htmls += '<td class="hacchu_qty haccu_ball ' + b_order_color + '">' + ball_order_amount + '</td>';
                        // htmls += '<td class="hacchu_qty haccu_unit ' + u_order_color + '">' + unit_order_amount + '</td>';
                        htmls += '<td><input type="tel" class="form-control cmn_num_formt cmn_delivr_recv cmn_recv case_invent case_invent" data_inputs="ケース" value="' + todays_case_arrival + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon">入数</div><input type="tel" class="form-control cmn_num_formt case_law_qty case_law_qty" value="' + case_inputs + '" readonly></div></td>';
                        htmls += '<td><input type="tel" class="form-control cmn_num_formt cmn_delivr_recv cmn_recv bol_invent bol_invent" data_inputs="ボール" value="' + todays_ball_arrival + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon">入数</div><input type="tel" class="form-control bol_law_qty cmn_num_formt bol_law_qty" value="' + ball_inputs + '" readonly></div></td>';
                        htmls += '<td><input type="tel" class="form-control cmn_num_formt cmn_delivr_recv cmn_recv individual_invent individual_invent" data_inputs="バラ" value="' + todays_unit_arrival + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon"></div><input type="tel" class="form-control ind_law_qty cmn_num_formt ind_law_qty" value="" readonly></div></td>';
                        htmls += '<td class="shelf_stack">' + rack_number[0] + '</td>';
                        htmls += '<td class="digits_td">' + response[i].cost_price + '</td>';
                        htmls += '<td>' + response[i].selling_price + '</td>';

                        // htmls += '<td class="digits_td">' + totall_amount + '</td>';

                        htmls += '<td>' + gross_profit + '</td>';
                        htmls += '<td>' + gross_profit_margin + '</td>';
                        htmls += '<td></td>';
                        htmls += '<td></td>';

                        htmls += '<td>' + response[i].jan + '</td>';
                        htmls += '</tr>';
                        j++;
                    }
                } else {
                    htmls += '<tr><td colspan="28" class="text-center">商品がありません。</td></tr>';
                }
                $(".order_receive_body").html(htmls);
                $('.digits_td').digits_td();
                $('.digits').digits();

            }

        }
    });

}

function get_vendor_master_item_list() {
    var vendor_id = $('.v_ids_v').val();
    var jan = $('.jan_code_search').val();
    var in_company_code = $('.in_company_code_search').val();
    var order_by_tonya = tonoya_order;
    var order_by_maker_name = maker_order;
    var num_of_order = num_order;
    var is_special = 0;
    var urls = url_search();
    is_special = (urls == 'special_master_item' ? '1' : '0');
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: 'get_all_vendor_master_item',
        type: "post",
        data: {
            num_of_order :num_of_order,
            vendor_id: vendor_id,
            in_company_code: in_company_code,
            jan: jan,
            is_special: is_special,
            order_by_tonya: order_by_tonya,
            order_by_maker_name: order_by_maker_name,

        },
        success: function (response) {

            $(".vendor_itemdata_table").html("");
            var j = 0;
            var htmls = '';
            if (response.length > 0) {
                for (var i = 0; i < (response.length); i++) {
                    var vendor_name = (response[i].vendor_id == 0 ? '不明' : response[i].name);

                    // Create date from input value
                    var entryDate = new Date(response[i].created_at);
                    // Get today's date
                    var todaysDate = new Date();
                    // call setHours to take the time out of the comparison
                    var row_colors = 'no_color';
                    let now = +new Date();
                    let createdAt = +new Date(Date.parse(response[i].created_at.toString()));
                    var oneDay = 24 * 60 * 60 * 1000;
                    var new_colors = '';

                    if ((now - createdAt) < oneDay) {
                        //within 24h
                        row_colors = 'yes_color';
                    }
                    var date1 = new Date();
                    var date2 = new Date(response[i].created_at);
                    var diffMs = (date1 - date2);
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                    var diffS = ((diffMs % 86400000) % 3600000) / 60000; // s
                    // var diffDays = Math.floor(diffMs / 86400000); // days

                    if (diffS <= 0.255) {
                        new_colors = 'new_color';
                    }
                    // console.log(((diffMs % 86400000) % 3600000) / 60000)

                    var in_company_code = (response[i].in_company_code == null ? '' : response[i].in_company_code);
                    htmls += '<tr data_action_status="0" data-id="' + response[i].vendor_item_id + '" vendor-id="' + response[i].vendor_id + '" maker_id="' + response[i].maker_id + '" class="vendor_item_edit_delete_inline color_row_' + row_colors + ' color_row_' + new_colors + '" >';
                    htmls += '<td>' + (j + 1) + '</td>';
                    htmls += '<td><img data_cost_price="' + response[i].cost_price + '" data_quantity="" src="'+Globals.base_url+'/public/backend/images/products/cocacola.jpg" class="itemImagesContr"/></td>';
                    htmls += '<td class="p_name" data_field_type="product_name" contenteditable="true">' + response[i].product_name + '</td>';
                    htmls += '<td>定</td>';
                    htmls += '<td><input type="tel" onfocus="this.select();" value="' + response[i].case_inputs + '" data_field_type="case_inputs" class="form-control text-right v_case_inputs edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" onfocus="this.select();" value="' + response[i].ball_inputs + '" data_field_type="ball_inputs" class="form-control text-right v_ball_inputs edit_vendor_item"></td>';
                    htmls += '<td>0</td>';
                    htmls += '<td><input type="tel" value="' + response[i].cost_price + '" data_field_type="cost_price"  class="form-control text-right digits v_cost_price edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" value="' + response[i].selling_price + '" data_field_type="selling_price" class="form-control text-right digits v_selling_price edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" value="' + response[i].gross_profit + '" data_field_type="gross_profit" class="form-control text-right v_gross_profit edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" value="' + response[i].gross_profit_margin + '" data_field_type="gross_profit_margin" class="form-control text-right v_gross_profit_margin edit_vendor_item"></td>';
                    htmls += '<td><input type="number" data_current_vl="' + in_company_code + '"  data_field_type="company_code" value="' + in_company_code + '" class="form-control text-center v_in_company_code"></td>';
                    htmls += '<td style="padding:0px!important;"><span class="vendor_name vendor_name_control hide">' + vendor_name + '</span><span class="vendor_select vendor_name_control show"><select vendor_item_id="' + response[i].vendor_item_id + '" class="form-control vendor_select2"><option selected value="' + response[i].vendor_id + '">' + vendor_name + '</option></select></span></td>';
                    htmls += '<td style="padding:0px;">' + response[i].maker_name + ' ' + response[i].jan + '</td>';
                    htmls += '</tr>';
                    j++;
                }
            } else {
                htmls += '<tr><td colspan="14" class="text-center">商品がありません。</td></tr>';
            }
            $(".vendor_itemdata_table").html(htmls);
            $('.digits_td').digits_td();
            $('.digits').digits();
            setTimeout(function () {
                $('.vendor_item_edit_delete_inline').removeClass('color_row_new_color')
            }, 60000)

            if (vendor_id == 0) {
                $('.supplier_name_input').val('');
                $('.vendor_list_show').text('');
            }
            $('.v_ids_v').val(vendor_id);
            $('#vendor_show_modal').modal('hide');
            /*vendor dynamic select*/
            $('.vendor_select2').select2({
                tags: true,
                ajax: {
                    url: 'get_all_vendor_list_for_select2',
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        return {
                            searchTerm: params.term
                        };
                    },
                    processResults: function (response) {
                        console.log(response);
                        return {
                            results: response.results
                        };
                    },
                    cache: false
                },
                createTag: function (params) {
                    var term = $.trim(params.term);
                    if (term === '') {
                        return null;
                    }
                    return {
                        id: term,
                        text: term,
                        newTag: true // add additional parameters
                    };
                    /* var vendor_id = null;
                      var vendor_code = Math.floor(100000 + Math.random() * 900000);
                      var vendor_phone = Math.floor(100000000 + Math.random() * 900000000);
                      $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        },
                        url: "vendor_add_edit",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            vendor_id: vendor_id,
                            vendor_name: term,
                            vendor_code: vendor_code,
                            vendor_phone: vendor_phone
                        },
                        success: function (response) {
                            return {
                                id: response.vendor_id,
                                text: term,
                                newTag: true // add additional parameters
                              }
                        }
                    });*/

                }

                /* insertTag: function (data, tag) {

                    data.push(tag);
                    console.log(typeof data.selected);
                    console.log(data);
                    if (typeof data.selected !== 'undefined') {

                        var vendor_id = null;
                    var vendor_code = Math.floor(100000 + Math.random() * 900000);
                    var vendor_phone = Math.floor(100000000 + Math.random() * 900000000);
                    $.ajax({
                      headers: {
                          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                      },
                      url: "vendor_add_edit",
                      type: "POST",
                      dataType: "JSON",
                      data: {
                          vendor_id: vendor_id,
                          vendor_name: data.text,
                          vendor_code: vendor_code,
                          vendor_phone: vendor_phone
                      },
                      success: function (response) {
                          return {
                              id: response.vendor_id,
                              text: term,
                              newTag: true // add additional parameters
                            }
                      }
                  });
                    }

                  },*/
            }).on("select2:select", function (e) {
                console.log(e.params.data);
                var vendor_item_id = $(this).closest('tr').attr('data-id');
                var maker_id = $(this).closest('tr').attr('maker_id');
                if (e.params.data.newTag) {
                    // append the new option element prenamently:
                    $("#vendor_reg_modal_inner_page").modal("show");
                    $('#vendor_name_m').val(e.params.data.text);
                    $('.inner_page_vendor_item_id').val(vendor_item_id);
                    $('.inner_page_maker_id').val(maker_id);
                    return false;
                    // store the new tag:
                    var vendor_id = null;
                    var vendor_name = e.params.data.text;
                    console.log(vendor_name);
                    var vendor_code = Math.floor(100000 + Math.random() * 900000);
                    var vendor_phone = Math.floor(100000000 + Math.random() * 900000000);
                    $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        },
                        url: "vendor_add_edit",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            vendor_item_id: vendor_item_id,
                            vendor_id: vendor_id,
                            vendor_name: vendor_name,
                            vendor_code: vendor_code,
                            vendor_phone: vendor_phone
                        },
                        success: function (response) {
                            $(this).find('[value="' + response.vendor_id + '"]').replaceWith('<option selected value="' + response.vendor_id + '">' + e.params.data.text + '</option>');
                        }
                    });
                } else if (e.params.data.selected) {
                    console.log(vendor_item_id);
                    $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        },
                        url: "vendor_master_update_by_vendor_id",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            vendor_item_id: vendor_item_id,
                            vendor_id: e.params.data.id,
                            maker_id: maker_id
                        },
                        success: function (response) {
                            console.log(response);
                            get_vendor_master_item_list();
                        }
                    });
                }
            });
            /*vendor dynamic select*/
        }
    });
}

function get_current_date() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
        (('' + month).length < 2 ? '0' : '') + month + '-' +
        (('' + day).length < 2 ? '0' : '') + day;
    return output
}

function view_customer_master_by_customer_id(c_id, c_name) {

    var currentURL = window.location.href;
    var url_array = currentURL.split("/");
    var url_last_element = $(url_array).last()[0];
    if (url_last_element == 'shipment') {
        var custom_url = "shipment/" + c_id;
    } else {
        var custom_url = "customer_master_item/" + c_id;
    }
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: custom_url,
        type: "GET",
        success: function (response) {
            /* sukka list added */
            if (url_last_element == 'shipment') {
                console.log(response);
                //return false;
                $('.order_shipment_body').html('');
                var j = 0;
                var htmls = '';
                if (response.length > 0) {
                    for (var i = 0; i < response.length; i++) {


                        var cost_price = (response[i].cost_price == null ? "0.00" : response[i].cost_price);
                        var selling_price = response[i].selling_price;
                        var cost_pt = parseInt(cost_price);
                        var sale_pt = parseInt(selling_price);

                        var g_prft_open = response[i].margin; //sale_pt - cost_pt;
                        // var g_prft_margn_open = g_prft_open / sale_pt * 100;
                        // g_prft_margn_open = g_prft_margn_open.toFixed(2);
                        // g_prft_margn_open = (g_prft_open < 0 ? 0 : g_prft_margn_open);
                        // g_prft_margn_open = (g_prft_margn_open == "NaN" ? 0 : g_prft_margn_open);
                        var g_prft_margn_open = (response[i].margin_percentage == "NaN" || response[i].margin_percentage == null ? 0 : response[i].margin_percentage);


                        /*stock quantity*/
                        var rack_number = (response[i].rack_number == null ? '' : response[i].rack_number);
                        var case_quantity = (response[i].case_quantity == null ? 0 : response[i].case_quantity);
                        var ball_quantity = (response[i].ball_quantity == null ? 0 : response[i].ball_quantity);
                        var unit_quantity = (response[i].unit_quantity == null ? 0 : response[i].unit_quantity);

                        var shipment_case_confirm_quantity = (response[i].shipment_case_confirm_quantity == null ? 0 : response[i].shipment_case_confirm_quantity);
                        var shipment_ball_confirm_quantity = (response[i].shipment_ball_confirm_quantity == null ? 0 : response[i].shipment_ball_confirm_quantity);
                        var shipment_unit_confirm_quantity = (response[i].shipment_unit_confirm_quantity == null ? 0 : response[i].shipment_unit_confirm_quantity);


                        var case_inputs = (response[i].case_inputs == null || response[i].case_inputs == 0 ? '' : response[i].case_inputs);
                        var ball_inputs = (response[i].ball_inputs == null || response[i].ball_inputs == 0 ? '' : response[i].ball_inputs);
                        /*stock quantity*/

                        /*
                        today's stock
                        */
                        var shipment_case_quantity = (response[i].shipment_case_quantity == null ? 0 : response[i].shipment_case_quantity);
                        var shipment_ball_quantity = (response[i].shipment_ball_quantity == null ? 0 : response[i].shipment_ball_quantity);
                        var shipment_unit_quantity = (response[i].shipment_unit_quantity == null ? 0 : response[i].shipment_unit_quantity);

                        /*
                        today's stock
                        */

                        htmls += '<tr>';
                        htmls += '<td type="tel" class="p_name">' + response[i].name + '</td>';
                        htmls += '<td class="digits_td">' + response[i].stock_unit_total + '</td>';
                        htmls += '<td><input type="tel" class="form-control t_case_invent" value="' + case_quantity + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon">入数</div><input type="tel" class="form-control cmn_num_formt case_law_qty" value="' + case_inputs + '"></div></td>';
                        htmls += '<td><input type="tel" class="form-control bol_invent" value="' + ball_quantity + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon">入数</div><input type="tel" class="form-control cmn_num_formt bol_law_qty" value="' + ball_inputs + '"></div></td>';
                        htmls += '<td><input type="tel" class="form-control individual_invent" value="' + unit_quantity + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon"></div><input type="tel" class="form-control cmn_num_formt ind_law_qty" value="" readonly></div></td>';
                        htmls += '<td class="digits_td">' + response[i].shipment_quantity_total + '</td>';
                        htmls += '<td><input type="tel" class="form-control cmn_delivr_recv cmn_num_formt case_invent" value="' + shipment_case_quantity + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon">入数</div><input type="tel" class="form-control cmn_num_formt" value="' + case_inputs + '"></div></td>';
                        htmls += '<td><input type="tel" class="form-control cmn_delivr_recv cmn_num_formt bol_invent" value="' + shipment_ball_quantity + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon">入数</div><input type="tel" class="form-control cmn_num_formt bol_law_qty" value="' + ball_inputs + '"></div></td>';
                        htmls += '<td><input type="tel" class="form-control cmn_delivr_recv cmn_num_formt individual_invent" value="' + shipment_unit_quantity + '" readonly><div class="input-group rsinput_group"><div class="input-group-addon rsgrp_adon"></div><input type="tel" class="form-control cmn_num_formt ind_law_qty" value="" readonly></div></td>';
                        htmls += '<td>' + shipment_case_confirm_quantity + '</td>';
                        htmls += '<td>' + shipment_ball_confirm_quantity + '</td>';
                        htmls += '<td>' + shipment_unit_confirm_quantity + '</td>';

                        htmls += '<td class="digits_td">' + cost_price + '</td>';

                        htmls += '<td class="digits_td">' + selling_price + '</td>';
                        htmls += '<td class="text-right">' + g_prft_open + '</td>';
                        htmls += '<td class="text-right">' + g_prft_margn_open + '</td>';
                        htmls += '<td class="digits_td">' + response[i].stock_cost_price + '</td>';
                        htmls += '<td></td>';
                        htmls += '<td></td>';
                        htmls += '<td>' + rack_number + '</td>';
                        htmls += '<td>' + response[i].jan + '</td>';
                        htmls += '<td></td>';
                        htmls += '</tr>';
                        j++;
                    }
                } else {
                    htmls += '<tr><td colspan="22" class="text-center">商品がありません。</td></tr>';
                }
                $(".order_shipment_body").html(htmls);
                $('.digits_td').digits_td();
                $('.digits').digits();
            } else {
                $('.customer_item_table_body').html('');
                var j = 0;
                var htmls = '';
                if (response.length > 0) {
                    for (var i = 0; i < (response.length); i++) {

                        /*color on lest item on 24hours*/
                        var row_colors = 'no_color';
                        let now = +new Date();
                        let createdAt = +new Date(Date.parse(response[i].created_at.toString()));
                        var oneDay = 24 * 60 * 60 * 1000;

                        if ((now - createdAt) < oneDay) {
                            //within 24h
                            row_colors = 'yes_color';
                        }
                        /*color on lest item on 24hours*/


                        var cost_price = (response[i].cost_price == null ? "0.00" : response[i].cost_price);
                        var selling_price = (response[i].selling_price == null ? "0.00" : response[i].selling_price);
                        var gross_profit = (response[i].gross_profit == null ? "0.00" : response[i].gross_profit);
                        var gross_profit_margin = (response[i].gross_profit_margin == null ? "0.00" : response[i].gross_profit_margin);

                        htmls += '<tr data_action_status="0" data-id="' + response[i].customer_item_id + '" vendor-id="' + response[i].vendor_id + '" customer-id="' + response[i].customer_id + '" class="customer_item_edit_delete_inline color_row_' + row_colors + '">';
                        htmls += '<td>' + (j + 1) + '</td>';
                        htmls += '<td>画像<br>なし</td>';
                        htmls += '<td class="p_name">' + response[i].product_name + '</td>';
                        htmls += '<td>定</td>';
                        htmls += '<td>' + response[i].case_inputs + '</td>';
                        htmls += '<td>' + response[i].ball_inputs + '</td>';
                        htmls += '<td>0</td>';
                        // htmls += '<td class="digits_td">' + cost_price + '</td>';
                        htmls += '<td><input type="tel" value="' + cost_price + '" data_filed_type="cost_price" class="form-control digits text-right cmn_customer_pricing c_cost_price edit_customer_item"></td>';
                        htmls += '<td><input type="tel" value="' + selling_price + '" data_filed_type="selling_price" class="form-control digits text-right cmn_customer_pricing c_selling_price edit_customer_item"></td>';
                        htmls += '<td><input type="tel" value="' + gross_profit + '" data_filed_type="gross_profit" class="form-control digits text-right cmn_customer_pricing c_gross_profit edit_customer_item"></td>';
                        htmls += '<td><input type="tel" value="' + gross_profit_margin + '" data_filed_type="gross_profit_margin" class="form-control digits cmn_customer_pricing text-right c_gross_profit_margin edit_customer_item"></td>';
                        htmls += '<td>' + response[i].jan + '</td>';
                        htmls += '</tr>';
                        j++;
                    }
                } else {
                    htmls += '<tr><td colspan="12" class="text-center">商品がありません。</td></tr>';
                }
                $(".customer_item_table_body").html(htmls);
                $('.digits_td').digits_td();
                $('.digits').digits();

            }

            $('.c_ids_v').val(c_id);
            if (c_id != 0) {
                $('.customer_list_show').text(c_name);
                $('.supplier_name_input').val(c_name);
                $('.jcs_splyr').text(c_name);
                $('.jcs_splyr').css({"padding-left": "15px", "padding-right": "15px"});
            }

            $('#customer_show_modal').modal('hide');
        }
    });
}

function custom_navi_design() {
    var templates = `
    <div class="panel panel-warning nav_popup" style="margin-bottom: 2px; border: solid 2px rgb(56, 93, 138); box-shadow: 0 2px 6px #31B0D5; background:{{background}};">
            <div class="panel-body">
                <ul>
                    {{#message_list}}
                    <li>
                        {{{message}}}
                    </li>
                    {{/message_list}}
                </ul>
                <center>
                {{#button_list}}
                    {{{buttons}}}
                {{/button_list}}
                </center>
            </div>
        </div>`;


    var data = {
        "background": '#ddd',
        "message_list": [{message: 'this custome navi'}],
        "button_list": [{buttons: '<button type="button" id="close_success_error_navi" class="btn btn-info btn-sm">確認</button>'}]
    }
    custom_popup_template(templates, data, 1);
}

function custom_navi_design2() {
    var templates = `
    <div class="panel panel-warning nav_popup" style="margin-bottom: 2px; border: solid 2px rgb(56, 93, 138); box-shadow: 0 2px 6px #31B0D5; background:#dcf3f1;">
            <div class="panel-body">
                <ul>

                    <li>
                       custom html navigation popup
                    </li>

                </ul>
                <center>
                <button type="button" id="close_success_error_navi" class="btn btn-info btn-sm">確認</button>
                </center>
            </div>
        </div>`;
    simple_custom_popup_template(templates, 1);
}

function get_vendor_master_data(v_id = 0, v_name = '') {
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: 'vendor_master_item/' + v_id,
        type: "GET",
        success: function (response) {
            console.log(response);
            $(".vendor_itemdata_table").html("");
            var j = 0;
            var htmls = '';
            if (response.length > 0) {
                for (var i = 0; i < (response.length); i++) {
                    htmls += '<tr data_action_status="0" data-id="' + response[i].vendor_item_id + '" vendor-id="' + response[i].vendor_id + '" class="vendor_item_edit_delete_inline">';
                    htmls += '<td>' + (j + 1) + '</td>';
                    htmls += '<td>画像<br>なし</td>';
                    htmls += '<td contenteditable="true" type="tel" class="p_name">' + response[i].product_name + '</td>';
                    htmls += '<td>定</td>';
                    htmls += '<td contenteditable="true" type="tel">' + response[i].case_inputs + '</td>';
                    htmls += '<td contenteditable="true" type="tel">' + response[i].ball_inputs + '</td>';
                    htmls += '<td>0</td>';
                    htmls += '<td contenteditable="true" type="tel">' + response[i].cost_price + '</td>';
                    htmls += '<td>0</td>';
                    htmls += '<td>0</td>';
                    htmls += '<td>0</td>';
                    htmls += '<td>' + response[i].name + ' ' + response[i].jan + '</td>';
                    htmls += '</tr>';
                    j++;
                }
            } else {
                htmls += '<tr><td colspan="12" class="text-center">商品がありません。</td></tr>';
            }
            $(".vendor_itemdata_table").html(htmls);
            return false;
            $('.vendor_itemdata_table').html('');
            $('.vendor_itemdata_table').html(response);
            //$('.vendor_itemdata_table tr td:nth-child(6)').digits_td();
            $('.vendor_itemdata_table tr').each(function (index, el) {
                var basic_price = $(this).children('td:nth-child(7)').attr('basic_cost_price_val');
                var sale_price = $(this).children('td:nth-child(7)').attr('sale_cost_price_val');
                var sale_start_date = $(this).children('td:nth-child(8)').attr('sale_start_date_val');
                var sale_end_date = $(this).children('td:nth-child(9)').attr('sale_end_date_val');
                var basic_start_date = $(this).children('td:nth-child(8)').attr('basic_start_date_val');
                var basic_end_date = $(this).children('td:nth-child(9)').attr('basic_end_date_val');
                if ($('.basic_sale_mode').is(':checked')) {
                    $(this).children('td:nth-child(7)').text(basic_price);
                    $(this).children('td:nth-child(8)').text(basic_start_date);
                    $(this).children('td:nth-child(9)').text(basic_end_date);
                } else {
                    $(this).children('td:nth-child(7)').text(sale_price);
                    $(this).children('td:nth-child(8)').text(sale_start_date);
                    $(this).children('td:nth-child(9)').text(sale_end_date);
                }

            });


        }
    });
}

function get_manual_order_item(c_id = 0, c_name = '') {

    var c_id = $('.c_ids_v').val();
    var jan = $('.jan_inpts').val();
    var c_name = $('.jcs_main_hand_title').text();
    var page_url = url_search();
    if (page_url == 'onlineorder') {
        var order_category = 'edi';
    } else {
        var order_category = 'manual';
    }
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: 'get_customer_base_manual_order_item',
        type: "post",
        data: {c_id: c_id, jan: jan, order_category: order_category},
        success: function (response) {
            $('.custom_tble_header_content').html('');
            $('.custom_col_group').html('');
            console.log(response);
            $('.jan_inpts').val('');
            $('.customer_manual_order_status').val(response.manual_orderable);
            if (response.manual_orderable != '1') {
                var order = response.online_order;
                var online_order_count = Object.keys(order).length;
            } else {
                var online_order_count = response.online_order.length;
                var online_order = response.online_order;
            }
            var shop_name = '';
            var shop_count = 0;
            var shop_h_info = '';
            var shop_col_info = '';
            if (response.success != 0) {
                shop_count = response.shop_list.length;
                for (var k = 0; k < shop_count; k++) {
                    shop_name += '<th colspan="3" style="width:auto;text-align: center; border-right: 3px solid #ddd;">' + response.shop_list[k].shop_name + '</th>';
                }

                for (var j = 0; j < shop_count; j++) {
                    shop_h_info += `<th style="width:auto;text-align: center;">ｹｰｽ</th>
                    <th style="width:auto; text-align: center;">ﾎﾞｰﾙ</th>
                    <th style="width:auto;text-align: center; border-right: 3px solid #ddd;">ﾊﾞﾗ</th>`;
                }
            }
            var total_shop = shop_count * 3;
            total_shop = total_shop + 5;
            for (var m = 0; m < total_shop; m++) {
                shop_col_info += '<col>';
            }
            var htm = '';
            /*custome header content*/
            htm += `<tr>
							<th rowspan="2" style="min-width: 370px; text-align: center; vertical-align: middle;" nowrap>商品名</th>
							<th rowspan="2" style="min-width: 70px; width: 76px;"></th>
							<th colspan="3" style="width:auto; border-right: 3px solid #ddd; text-align: center; vertical-align:middle;" nowrap>全体</th>`;
            htm += shop_name;
            htm += '</tr>';
            htm += `<tr>
							<th style="width:auto;text-align: center;">ｹｰｽ</th>
							<th  style="width:auto; text-align: center;">ﾎﾞｰﾙ</th>
							<th style="width:auto;border-right: 3px solid #ddd; text-align: center;">ﾊﾞﾗ</th>`;
            htm += shop_h_info;
            htm += '</tr>';
            $('.custom_tble_header_content').html(htm);
            $('.custom_col_group').html(shop_col_info);
            /*custome header content*/
            $('.menual_order_tble').html('');
            var j = 0;
            var htmls = '';
            var sumation_arr = [];
            var sumation_confirm_arr = [];
            if (response.manual_orderable != 1) {
                if (online_order_count > 0) {
                    var i = 0;

                    $.each(order, function (key, online_order) {

                        var case_total = 0;
                        var ball_total = 0;
                        var unit_total = 0;
                        var case_confirm_total = 0;
                        var ball_confirm_total = 0;
                        var unit_confirm_total = 0;
                        htmls += '<tr data_jan="' + key + '">';
                        htmls += '<td class="pnames" rowspan="2" style="text-align: right; padding-right: 10px; padding-left: 10px;" nowrap><div class="productname">' + online_order[0].name + '</div>' + key + '</td>';
                        htmls += '<td style="text-align: left;">発注数</td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty"><input type="tel" class="form-control case_total case_total_' + online_order[0].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty"><input type="tel" class="form-control ball_total ball_total_' + online_order[0].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';
                        htmls += '<td style="border-right: 3px solid #ddd;" data_stock_total="" class="smOfordrqty"><input type="tel" class="form-control unit_total unit_total_' + online_order[0].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';
                        if (response.success != 0) {


                            for (var n = 0; n < shop_count; n++) {
                                var case_qty = '';
                                var ball_qty = '';
                                var unit_qty = '';


                                var idx = $.map(online_order, function (item, i) {
                                    if (item.customer_shop_id == response.shop_list[n].customer_shop_id)
                                        return i;
                                })[0];

                                //if (online_order[n].customer_shop_id) {
                                if (typeof idx != "undefined") {
                                    if (online_order[idx].inputs == 'ケース') {
                                        case_qty = online_order[idx].quantity;
                                        case_total += case_qty;
                                        ball_qty = '';
                                        unit_qty = '';
                                    } else if (online_order[idx].inputs == 'ボール') {
                                        case_qty = '';
                                        ball_qty = online_order[idx].quantity;
                                        ball_total += ball_qty;
                                        unit_qty = '';
                                    } else {
                                        case_qty = '';
                                        ball_qty = '';
                                        unit_qty = online_order[idx].quantity;
                                        unit_total += unit_qty;
                                    }
                                }
                                htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty"><input data_input_type="ケース" data_shop_id="' + response.shop_list[n].customer_shop_id + '" type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + case_qty + '"></td>';
                                htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty"><input data_input_type="ボール" data_shop_id="' + response.shop_list[n].customer_shop_id + '" type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + ball_qty + '"></td>';
                                htmls += '<td style="border-right: 3px solid #ddd;" data_stock_total="" class="smOfordrqty"><input data_input_type="バラ" data_shop_id="' + response.shop_list[n].customer_shop_id + '" type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + unit_qty + '"></td>';
                            }
                            sumation_arr[online_order[0].customer_order_detail_id] = [case_total, ball_total, unit_total];

                        }

                        htmls += '</tr>';

                        htmls += '<tr>';
                        htmls += '<td style="text-align: left;">確定</td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfcnfrmqty warning_custom"><input type="tel" class="form-control case_confirm_total case_confirm_total_' + online_order[0].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfcnfrmqty warning_custom"><input type="tel" class="form-control ball_confirm_total ball_confirm_total_' + online_order[0].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';
                        htmls += '<td style="border-right: 3px solid #ddd;" data_stock_total="" class="smOfcnfrmqty warning_custom"><input type="tel" class="form-control unit_confirm_total unit_confirm_total_' + online_order[0].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';

                        if (response.success != 0) {
                            for (var p = 0; p < shop_count; p++) {
                                var case_qty = '';
                                var ball_qty = '';
                                var unit_qty = '';
                                var case_qty_confirm = '';
                                var ball_qty_confirm = '';
                                var unit_qty_confirm = '';
                                var class_case_suffcient = '';
                                var class_ball_suffcient = '';
                                var class_unit_suffcient = '';
                                var idx_conf = $.map(online_order, function (item, i) {
                                    if (item.customer_shop_id == response.shop_list[p].customer_shop_id)
                                        return i;
                                })[0];
                                if (typeof idx_conf != "undefined") {

                                    if (online_order[idx_conf].inputs == 'ケース') {
                                        case_qty = online_order[idx_conf].quantity;

                                        if (online_order[idx_conf].confirm_quantity !== null) {
                                            case_qty_confirm = online_order[idx_conf].confirm_quantity;
                                            class_case_suffcient = (case_qty > case_qty_confirm ? 'insufcients_stocks' : 'sufcients_stocks');
                                            case_confirm_total += case_qty_confirm;
                                        } else if (case_qty != '') {
                                            class_case_suffcient = 'insufcients_stocks';
                                        }
                                    } else if (online_order[idx_conf].inputs == 'ボール') {
                                        ball_qty = online_order[idx_conf].quantity;
                                        if (online_order[idx_conf].confirm_quantity !== null) {
                                            ball_qty_confirm = online_order[idx_conf].confirm_quantity;
                                            class_ball_suffcient = (ball_qty > ball_qty_confirm ? 'insufcients_stocks' : 'sufcients_stocks');
                                            ball_confirm_total += ball_qty_confirm;
                                        } else if (ball_qty != '') {
                                            class_ball_suffcient = 'insufcients_stocks';
                                        }
                                    } else {
                                        unit_qty = online_order[idx_conf].quantity;
                                        if (online_order[idx_conf].confirm_quantity !== null) {
                                            unit_qty_confirm = online_order[idx_conf].confirm_quantity;
                                            class_unit_suffcient = (unit_qty > unit_qty_confirm ? 'insufcients_stocks' : 'sufcients_stocks');
                                            unit_confirm_total += unit_qty_confirm;
                                        } else if (unit_qty != '') {
                                            class_unit_suffcient = 'insufcients_stocks';
                                        }
                                    }
                                }

                                htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty ' + class_case_suffcient + '"><input type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + case_qty_confirm + '"></td>';
                                htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty ' + class_ball_suffcient + '"><input type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + ball_qty_confirm + '"></td>';
                                htmls += '<td style="border-right: 3px solid #ddd;" data_stock_total="" class="smOfordrqty ' + class_unit_suffcient + '"><input type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + unit_qty_confirm + '"></td>';
                            }
                            sumation_confirm_arr[online_order[0].customer_order_detail_id] = [case_confirm_total, ball_confirm_total, unit_confirm_total];
                        }
                        htmls += '</tr>';

                        j++;
                        i++;
                    });
                } else {
                    htmls += '<tr><td colspan="' + total_shop + '" style="text-align:center;">データ無し</td></tr>';
                }
            } else {
                /*manual order*/
                console.log(online_order);
                if (online_order[0].jan != null) {
                    for (var i = 0; i < online_order_count; i++) {
                        var case_total = 0;
                        var ball_total = 0;
                        var unit_total = 0;
                        var case_confirm_total = 0;
                        var ball_confirm_total = 0;
                        var unit_confirm_total = 0;
                        htmls += '<tr data_jan="' + online_order[i].jan + '">';
                        htmls += '<td class="pnames" rowspan="2" style="text-align: right; padding-right: 10px; padding-left: 10px;" nowrap><div class="productname">' + online_order[i].name + '</div>' + online_order[i].jan + '</td>';
                        htmls += '<td style="text-align: left;">発注数</td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty"><input type="tel" class="form-control case_total case_total_' + online_order[i].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty"><input type="tel" class="form-control ball_total ball_total_' + online_order[i].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';
                        htmls += '<td style="border-right: 3px solid #ddd;" data_stock_total="" class="smOfordrqty"><input type="tel" class="form-control unit_total unit_total_' + online_order[i].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';
                        if (response.success != 0) {


                            for (var n = 0; n < shop_count; n++) {
                                var case_qty = '';
                                var ball_qty = '';
                                var unit_qty = '';


                                if (response.shop_list[n].customer_shop_id == online_order[i].customer_shop_id) {

                                    if (online_order[i].inputs == 'ケース') {
                                        case_qty = online_order[i].quantity;
                                        case_total += case_qty;
                                        ball_qty = '';
                                        unit_qty = '';
                                    } else if (online_order[i].inputs == 'ボール') {
                                        case_qty = '';
                                        ball_qty = online_order[i].quantity;
                                        ball_total += ball_qty;
                                        unit_qty = '';
                                    } else {
                                        case_qty = '';
                                        ball_qty = '';
                                        unit_qty = online_order[i].quantity;
                                        unit_total += unit_qty;
                                    }
                                }
                                htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty"><input data_input_type="ケース" data_shop_id="' + response.shop_list[n].customer_shop_id + '" type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + case_qty + '"></td>';
                                htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty"><input data_input_type="ボール" data_shop_id="' + response.shop_list[n].customer_shop_id + '" type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + ball_qty + '"></td>';
                                htmls += '<td style="border-right: 3px solid #ddd;" data_stock_total="" class="smOfordrqty"><input data_input_type="バラ" data_shop_id="' + response.shop_list[n].customer_shop_id + '" type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + unit_qty + '"></td>';
                            }
                            sumation_arr[online_order[i].customer_order_detail_id] = [case_total, ball_total, unit_total];

                        }

                        htmls += '</tr>';
                        htmls += '<tr>';
                        htmls += '<td style="text-align: left;">確定</td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfcnfrmqty warning_custom"><input type="tel" class="form-control case_confirm_total case_confirm_total_' + online_order[i].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfcnfrmqty warning_custom"><input type="tel" class="form-control ball_confirm_total ball_confirm_total_' + online_order[i].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';
                        htmls += '<td style="border-right: 3px solid #ddd;" data_stock_total="" class="smOfcnfrmqty warning_custom"><input type="tel" class="form-control unit_confirm_total unit_confirm_total_' + online_order[i].customer_order_detail_id + ' cmn_o_d_qty sum_of_o_d_qty" value=""></td>';
                        if (response.success != 0) {
                            for (var p = 0; p < shop_count; p++) {
                                var case_qty = '';
                                var ball_qty = '';
                                var unit_qty = '';
                                var case_qty_confirm = '';
                                var ball_qty_confirm = '';
                                var unit_qty_confirm = '';
                                var class_case_suffcient = '';
                                var class_ball_suffcient = '';
                                var class_unit_suffcient = '';
                                if (response.shop_list[p].customer_shop_id == online_order[i].customer_shop_id) {

                                    if (online_order[i].inputs == 'ケース') {
                                        case_qty = online_order[i].quantity;
                                        if (online_order[i].confirm_quantity !== null) {
                                            case_qty_confirm = online_order[i].confirm_quantity;
                                            class_case_suffcient = (case_qty > case_qty_confirm ? 'insufcients_stocks' : 'sufcients_stocks');
                                            case_confirm_total += case_qty_confirm;
                                        }
                                    } else if (online_order[i].inputs == 'ボール') {
                                        ball_qty = online_order[i].quantity;
                                        if (online_order[i].confirm_quantity !== null) {
                                            ball_qty_confirm = online_order[i].confirm_quantity;
                                            class_ball_suffcient = (ball_qty > ball_qty_confirm ? 'insufcients_stocks' : 'sufcients_stocks');
                                            ball_confirm_total += ball_qty_confirm;
                                        }
                                    } else {
                                        unit_qty = online_order[i].quantity;
                                        if (online_order[i].confirm_quantity !== null) {
                                            unit_qty_confirm = online_order[i].confirm_quantity;
                                            class_unit_suffcient = (unit_qty > unit_qty_confirm ? 'insufcients_stocks' : 'sufcients_stocks');
                                            unit_confirm_total += unit_qty_confirm;
                                        }
                                    }
                                }

                                htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty ' + class_case_suffcient + '"><input type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + case_qty_confirm + '"></td>';
                                htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty ' + class_ball_suffcient + '"><input type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + ball_qty_confirm + '"></td>';
                                htmls += '<td style="border-right: 3px solid #ddd;" data_stock_total="" class="smOfordrqty ' + class_unit_suffcient + '"><input type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty" value="' + unit_qty_confirm + '"></td>';
                            }
                            sumation_confirm_arr[online_order[i].customer_order_detail_id] = [case_confirm_total, ball_confirm_total, unit_confirm_total];
                        }
                        htmls += '</tr>';
                        j++;
                    }
                } else {
                    htmls += '<tr><td colspan="' + total_shop + '" style="text-align:center;">データ無し</td></tr>';
                }
                /*manual order*/
            }

            $(".menual_order_tble").html(htmls);

            $.each(sumation_arr, function (index, value) {
                if (value) {
                    $('.case_total_' + index).val(value[0]);
                    $('.ball_total_' + index).val(value[1]);
                    $('.unit_total_' + index).val(value[2]);
                }
            });

            $.each(sumation_confirm_arr, function (index, value) {
                if (value) {
                    $('.case_confirm_total_' + index).val(value[0]);
                    $('.ball_confirm_total_' + index).val(value[1]);
                    $('.unit_confirm_total_' + index).val(value[2]);
                }
            });
        }
    });
    $('.c_ids_v').val(c_id);
    if (c_id != 0) {
        $('.jcs_main_hand_title').text(c_name);
    } else {
        $('.jcs_main_hand_title').text('');
    }

    $('#customer_show_modal').modal('hide');


}

function get_brand_item_list(c_id = 0, c_name = ''){
    var brand_name = '';
    //var currnt_brand_list= 'コカ・コーラ(Coca-Cola),ポカリスエット,スターバックス,ネスカフェ,アサヒビール,BOSS(ボス),明治乳業,サントリー,カゴメ,ピカイチ野菜くん';
    var currnt_brand_list= '店 A,店 B,店 C,店 D';
    var substr = currnt_brand_list.split(','); // array here

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_shop_list_by_customer_id",
        type: "POST",
        dataType: "JSON",
        data: {customer_id: c_id},
        success: function (response) {
                var htmls = '';
                for (var i = 0; i < (response.shop_list.length); i++) {
                    htmls += '<tr class="shopListitem" shop-id="' + response.shop_list[i].customer_shop_id + '" customer-id="' + response.shop_list[i].customer_id + '">';
                   // htmls += '<td>' + response.shop_details[i].customer_name + '</td>';
                   htmls += '<td>' + response.shop_list[i].shop_name + '</td>';
                   htmls += '<td>' + response.shop_list[i].shop_no + '</td>';
                   htmls += '<td>' + response.shop_list[i].phone + '</td>';
                    htmls += '<td></td>';
                    htmls += '</tr>';
                }
                htmls +='<tr><td colspan="3">店舗を選んで下さい </td></tr>';
                $(".customer_shop_list_item").html(htmls);

        }
    });

    // var p = 1;
    // for (var k = 0; k < substr.length; k++) {
    //     brand_name +='<tr class="shopListitem">';
    //     brand_name +='<td>'+ substr[k] +'</td>';
    //     brand_name +='<td>12354</td>';
    //     brand_name += '<td>036587458</td>';
    //     brand_name +='</tr>';
    // }
    // brand_name +='<tr><td colspan="3">店舗を選んで下さい </td></tr>';
    //$(".customer_shop_list_item").html(brand_name);
    $('#customer_show_modal').modal('hide');
    $('#customer_shop_list_modal').modal('show');
}

function get_brand_shop_brand_list(c_id = 0, c_name = '',voice_text=''){
    var brand_name = '';
    var currnt_brand_list= 'コカ・コーラ(Coca-Cola),ポカリスエット,スターバックス,ネスカフェ,アサヒビール,BOSS(ボス),明治乳業,サントリー,カゴメ,ピカイチ野菜くん';
   // var currnt_brand_list= '店 A,店 B,店 C,店 D';

   $.ajax({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    },
    url: "get_shop_item_list_by_customer_id",
    type: "POST",
    dataType: "JSON",
    data: {customer_id: c_id,voice_text:voice_text},
    success: function (response) {
            var brand_name = '';
            var p = 1;
            var numberOfOrder = 100;
            for (var i = 0; i < (response.shop_item_list.length); i++) {
                brand_name +='<tr class="shopBrandListitem">';
               // brand_name +='<td  width="100px" style="text-align: center;">'+ p++ +'</td>';
                //brand_name += '<td style="text-align: left;"><a href="'+base_url+'/brand-order-detail/'+p+'">' + substr[k] + '</a></td>';
                brand_name += '<td style="text-align: left; width:70%">' + response.shop_item_list[i].name + '</td>';
                brand_name += '<td style="text-align: right;width:10%">'+ Math.floor(Math.random() * 100); +'</td>';
                brand_name += '<td style="text-align: right;width:10%">'+ Math.floor(Math.random() * 100); +'</td>';
                brand_name += '<td style="text-align: right;width:10%">'+ numberOfOrder-- +'</td>';
                brand_name +='</tr>';
            }
            $(".brand_order_tble").html(brand_name);
            $('#customer_shop_list_modal').modal('hide');
            const temps_messagessss = {

                bran_item_list_show_message: {
                    message: [
                        {message: 'XXXXXXXXXXXXXXXXXXX'},
                    ],
                    buttons: [
                        {button: '<center><a href="javascript:close_default_page_navi(101)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}
                    ]
                },
            }
            success_nav = view(temps_messagessss['bran_item_list_show_message'], def_center_mesg_template);
    }
});



}

// brand order

function searchBrandOrderByText(text) {
    if (text.length <= 0) {
        return 0;
    }
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_shop_item_list_by_customer_id",
        type: "POST",
        dataType: "JSON",
        data: {customer_id: 0,text : text},
        success: function (response) {
            var brand_name = '';
            var p = 1;
            var numberOfOrder = 100;
            for (var i = 0; i < (response.shop_item_list.length); i++) {
                brand_name +='<tr class="" onclick="searchByJan('+response.shop_item_list[i].jan+')">';
                brand_name +='<td  width="100px" style="text-align: center;">'+ p++ +'</td>';
                //brand_name += '<td style="text-align: left;"><a href="'+base_url+'/brand-order-detail/'+p+'">' + substr[k] + '</a></td>';
                brand_name += '<td style="text-align: left;">' + response.shop_item_list[i].name + '</td>';
                brand_name += '<td style="text-align: left;">'+ numberOfOrder-- +'</td>';
                brand_name +='</tr>';
            }
            $(".customer_shop_list_item_from_search").html(brand_name);
            $('#customer_shop_item_list_from_search').modal('show');
        }

    })

}

function searchByJan(jan) {
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_shop_item_list_by_customer_id",
        type: "POST",
        dataType: "JSON",
        data: {jan : jan},
        success: function (response) {
            var brand_name = '';
            var p = 1;
            var numberOfOrder = 100;
            for (var i = 0; i < (response.shop_item_list.length); i++) {
                brand_name +='<tr class="shopBrandListitem">';
               // brand_name +='<td  width="100px" style="text-align: center;">'+ p++ +'</td>';
                //brand_name += '<td style="text-align: left;"><a href="'+base_url+'/brand-order-detail/'+p+'">' + substr[k] + '</a></td>';
                brand_name += '<td style="text-align: left;">' + response.shop_item_list[i].name + '</td>';
                brand_name += '<td style="text-align: left;">'+ numberOfOrder-- +'</td>';
                brand_name +='</tr>';
            }
            $(".brand_order_tble").html(brand_name);
            $('#customer_shop_item_list_from_search').modal('hide');
        }

    })
}

function close_all_navi_msg() {
    for (let key in nav_list) {
        nav_list[nav_list[key]['nav_id']].hide();
    }
}

function show_hide_nav_icn(show_values = 1) {
    $('#nav_icon').css('opacity', show_values);
}

function check_is_reload_required() {
    var currentURL = window.location.href;
    var url_array = currentURL.split("/");
    var url_last_element = $(url_array).last()[0];
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        type: "POST",
        url: "check_is_reload_required_page",
        data: {
            page_url: url_last_element,
        },
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            if (response.refresh_status == '1') {
                if (url_last_element == 'receiveorder') {
                    get_vendor_list_item_by_vendor_id(0, 0);
                } else if (url_last_element == 'shipment') {
                    view_customer_master_by_customer_id(0, 0);
                }
            }
        }
    });
}

function jan_info_jaiko_detail() {
    var jan = $('#scan_by_jan_for_stock_detail').val();
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "stock_item_rack_check",
        type: "POST",
        dataType: "JSON",
        data: {
            jan: jan,
        },
        success: function (response) {
            console.log(response);
            if (response.message != 'invalid_rack_code') {
                window.location.href = 'handy_stock_detail_by_rack';
            } else {
                $('#scan_bybin').val('');
                $('.handy_error_msg').text('JANコードりません');
                $('.handdy_error').removeClass('hide').addClass('show');
                return false;
            }
        }
    });
}

// Hide modal and and clear input // ONi 26.01.2021 // For handy

function hideModelAndClearInput() {
    $('#stock-inventory-show-by-jan').modal('toggle');
    $('#scan_by_jan_for_stock_detail_handy').val('');
    $('#scan_by_jan_for_stock_detail_handy').focus();

    $('#handy-navi').show()
    $('#handy-navi-body').html('<li>棚卸が完了しました。次のJANコードスキャンして【次へ】押してください。</li>')
}



// end Oni

// function jan_list_search_by_name(name) {
//     $.ajax({
//         headers: {
//             "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
//         },
//         url: "item_search_by_name",
//         type: "POST",
//         dataType: "JSON",
//         data: {
//             name: name,
//         },
//         success: function (response) {
//             console.log(response);
//             var msgHtml = '';
//             if (response.name_list) {
//                 for (var i = 0; i < response.name_list.length; i++) {
//                     msgHtml += '<li><a href="" class="pname_search">' + response.name_list[i].name + '</a></li>';
//                 }
//             } else {
//                 msgHtml = '<li>製品名が見つかりません</li>';
//             }
//             const tempmsg = {
//                 exceed_over_qty: {
//                     message: [
//                         { message: msgHtml }
//                     ],
//                     buttons: [{ button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>' }]
//                 }
//             }
//             nav_width = '400px';
//             display_positionX = '15px';
//             display_positionY = '15px';
//             error_nav = view(tempmsg['exceed_over_qty'], def_center_mesg_html_template);
//             show_hide_nav_icn(0);
//         }
//     });
// }

function jan_list_search_by_name(name) {
    close_all_navi_msg();
    show_hide_nav_icn(0);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "item_search_by_name",
        type: "POST",
        dataType: "JSON",
        data: {
            name: name,
        },
        success: function (response) {
            console.log(response.name_list.length);
            // console.log(name);
            var msgHtml = '';
            var btn = '';
            var mathod = "getProductFromJanMasterByName('" + name + "')";
            if (response.name_list.length > 0) {
                for (var i = 0; i < response.name_list.length; i++) {
                    msgHtml += `<li><a href="javascript:void(0)" class="pname_search" onclick="search_by_name_with_jancode('${response.name_list[i].jan}')">` + response.name_list[i].name + `</a></li>`;
                }
                btn = [{button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}];
            } else {
                msgHtml = 'この品名が見つかりません<br>この商品を追加しますか?<br>';
                btn = [{
                    button: '<br><center>' +
                        '<a href="javascript:javascript:void(0)" class="btn btn-primary" onclick="' + mathod + '">はい</a>' +
                        '<a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">いいえ</a>' +
                        '</center>'
                }];
            }
            const tempmsg = {
                voice_search: {
                    message: [
                        {message: msgHtml}
                    ],
                    buttons: btn
                }
            }
            nav_width = '400px';
            display_positionX = '15px';
            display_positionY = '15px';
            error_nav = view(tempmsg['voice_search'], def_center_mesg_html_template);
            show_hide_nav_icn(0);
        }
    });
}

function getProductFromJanMasterByName(name) {
    close_all_navi_msg();
    show_hide_nav_icn(0);

    var msgHtml = '<img src="'+Globals.base_url+'/public/backend/images/Magnify-1s-200px.gif"/>';
                btn = [{
                    button: '<br><center></center>'
                }];
                const tempmsg = {
                    voice_search_insert: {
                        message: [
                            {message: msgHtml}
                        ],
                        buttons: btn
                    }
                }
                nav_width = '400px';
                display_positionX = '15px';
                display_positionY = '15px';
                error_nav = view(tempmsg['voice_search_insert'], def_center_mesg_html_template);
                show_hide_nav_icn(0);
                // return false;

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "item_search_by_name_from_jan_master",
        type: "POST",
        dataType: "JSON",
        data: {
            name: name,
        },
        success: function (response) {
            close_all_navi_msg();
            console.log(response.api_data.data);
            var msgHtml = '';
            var btn = '';
            if (response.api_data.return==1 && response.api_data.data.product_list.length>0) {
                for(var i=0;i<response.api_data.data.product_list.length;i++){
                msgHtml += `<li><a href="javascript:void(0)" class="pname_search" onclick="save_by_new_jan('${response.api_data.data.product_list[i].jan_code}')">` + response.api_data.data.product_list[i].name + `</a></li>`;
            }
                btn = [{button: '<br><center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}];

            } else {
                msgHtml = '製品名が見つかりません<br>';
                btn = [{
                    button: '<br><center>' +
                        '<a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">戻る</a>' +
                        '</center>'
                }];

            }
            const tempmsg = {
                exceed_over_qty: {
                    message: [
                        {message: msgHtml}
                    ],
                    buttons: btn
                }
            }
            nav_width = '440px';
            display_positionX = '15px';
            display_positionY = '15px';
            error_nav = view(tempmsg['exceed_over_qty'], def_center_mesg_html_template);
            show_hide_nav_icn(0);
        }
    });
}

function save_by_new_jan(jan_code) {
    if (jan_code == '') {
        return false;
    }
    $('.vandor_ins_jancode').val(jan_code);
    $('.vandor_ins_jancode').blur();
    //alert(jan_code);
    return false;
    var vendor_id = $('.v_ids_v').val();
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        type: "POST",
        url: "get_jan_info",
        data: {jan_code: jan_code, vendor_id: vendor_id},
        dataType: "JSON",
        success: function (response) {
            close_all_navi_msg();
            show_hide_nav_icn(0);
            $('.vandor_ins_jancode').val('');
            var api_response = response.api_data;
            var data_resource = response.data_resource;
            if (api_response == 'invalid_jan_code') {
                nav_width = '300px';
                display_positionX = '15px';
                display_positionY = '15px';
                error_nav = view(temporary_message['invalid_jan_code'], def_center_mesg_template);
            } else {
                if (response.vendor_item_data == 1) {
                    // var rows = $('.vendor_itemdata_table tr').filter(function() {
                    //     $(this).toggle($(this).find('td:nth-child(12)').text().indexOf(jan_code) > -1);
                    //     return $(this).find('td:nth-child(12)').text().indexOf(jan_code) > -1;
                    // });
                    show_hide_nav_icn(1);
                    sortTable_by_jan('vendor_itemdata_table', jan_code, 12);
                    return false;
                }

                var item_name = api_response.name;
                var case_qty = 0;
                var ball_qty = 0;
                var api_maker_name = '';
                if (data_resource == 'database') {
                    case_qty = api_response.case_inputs;
                    ball_qty = api_response.ball_inputs;
                } else if (data_resource == 'api') {
                    api_maker_name = api_response.maker_name;
                }
                case_qty = 0;
                ball_qty = 0;
                vendor_id = response.vendor_id;
                var maker_id = response.maker_id;
                var price = 100;
                /*insert auto vendor item*/
                var order_point_unit = 'ケース';
                var order_point_quantity = 1;
                var order_lot_unit = 'ケース';
                var order_lot_quantity = 0;
                var vendor_item_id = null;
                var sale_price = 0;
                var basic_start_date = '2020-01-01';
                var basic_end_date = '2021-12-31';
                var sale_start_date = '2020-01-01';
                var sale_end_date = '2021-12-31';
                //maker id added for new realtions
                data = {
                    maker_id: maker_id,
                    vendor_id: vendor_id,
                    jan_code: jan_code,
                    item_name: item_name,
                    case_qty: case_qty,
                    ball_qty: ball_qty,
                    price: price,
                    vendor_item_id: vendor_item_id,
                    order_point_unit: order_point_unit,
                    order_point_quantity: order_point_quantity,
                    order_lot_unit: order_lot_unit,
                    order_lot_quantity: order_lot_quantity,
                    sale_price: sale_price,
                    basic_start_date: basic_start_date,
                    basic_end_date: basic_end_date,
                    sale_start_date: sale_start_date,
                    sale_end_date: sale_end_date,
                    api_maker_name: api_maker_name,
                    is_special: 0
                }
                $.ajax({
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                    },
                    type: "POST",
                    url: "add_vendor_item",
                    data: data,
                    dataType: "JSON",
                    success: function (response) {
                        var message_id = 'vendor_message';
                        var ms_message = response.message;
                        if (ms_message == "insert_success") {
                            const temp_message = {

                                vendor_item_add_success: {
                                    message: [
                                        {message: 'この商品 ' + jan_code + ' は、メーカー（仕入先）判別ができました。仕入先を自動で登録しました。 '},
                                    ],
                                    buttons: [
                                        {button: '<center><button class="btn btn-primary vendor_list_show_popup">仕入先別</button></center>'}
                                    ]
                                },
                            }
                            if (vendor_id != 0) {
                                temp_vendor_insert_status = 0;
                                success_nav = view(temp_message['vendor_item_add_success'], def_center_mesg_template);
                            } else {
                                temp_vendor_insert_status = 1;
                                $('.v_ids_v').attr('is_new_item', 1);
                                error_nav = view(temporary_message['select_a_vendor_to_add_item'], def_center_mesg_template);
                            }

                        } else if (ms_message == "update_success") {
                            success_nav = view(temporary_message['vendor_item_add_update'], def_center_mesg_template);
                        } else {
                            error_message(message_id, 'alert-danger', ms_message)
                            const temps_message = {

                                vendor_item_add_error: {
                                    message: [
                                        {message: ms_message},
                                    ],
                                    buttons: [
                                        {button: '<center><a href="javascript:close_default_page_navi(101)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}
                                    ]
                                },
                            }
                            success_nav = view(temps_message['vendor_item_add_error'], def_center_mesg_template);
                        }
                        //var vendor_name = response.vendor_name;
                        // get_vendor_list_item_by_vendor_id(0, '');
                        get_vendor_master_item_list();
                    }
                });
                /*insert auto vendor item*/


            }
            console.log(response);
        }
    });
}

function search_by_name_with_jancode(jan_code) {

    $('.jan_code_search').val(jan_code);
    close_all_navi_msg()
    show_hide_nav_icn(1);
    get_vendor_master_item_list();
    return false;
    var jan = jan_code;
    var vendor_id = $('.v_ids_v').val();
    var in_company_code = $('.in_company_code_search').val();
    var order_by_tonya = 0;
    var order_by_maker_name = 0;
    var is_special = 0;
    var urls = url_search();
    is_special = (urls == 'special_master_item' ? '1' : '0');
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: 'get_all_vendor_master_item',
        type: "post",
        data: {
            vendor_id: vendor_id,
            in_company_code: in_company_code,
            jan: jan,
            is_special: is_special,
            order_by_tonya: order_by_tonya,
            order_by_maker_name: order_by_maker_name
        },
        success: function (response) {

            $(".vendor_itemdata_table").html("");
            var j = 0;
            var htmls = '';
            if (response.length > 0) {
                for (var i = 0; i < (response.length); i++) {
                    var vendor_name = (response[i].vendor_id == 0 ? '不明' : response[i].name);

                    // Create date from input value
                    var entryDate = new Date(response[i].created_at);
                    // Get today's date
                    var todaysDate = new Date();
                    // call setHours to take the time out of the comparison
                    var row_colors = 'no_color';
                    let now = +new Date();
                    let createdAt = +new Date(Date.parse(response[i].created_at.toString()));
                    var oneDay = 24 * 60 * 60 * 1000;
                    var new_colors = '';

                    if ((now - createdAt) < oneDay) {
                        //within 24h
                        row_colors = 'yes_color';
                    }
                    var date1 = new Date();
                    var date2 = new Date(response[i].created_at);
                    var diffMs = (date1 - date2);
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                    var diffS = ((diffMs % 86400000) % 3600000) / 60000; // s
                    // var diffDays = Math.floor(diffMs / 86400000); // days

                    if (diffS <= 0.255) {
                        new_colors = 'new_color';
                    }
                    // console.log(((diffMs % 86400000) % 3600000) / 60000)

                    var in_company_code = (response[i].in_company_code == null ? '' : response[i].in_company_code);
                    htmls += '<tr data_action_status="0" data-id="' + response[i].vendor_item_id + '" vendor-id="' + response[i].vendor_id + '" maker_id="' + response[i].maker_id + '" class="vendor_item_edit_delete_inline color_row_' + row_colors + ' color_row_' + new_colors + '" >';
                    htmls += '<td>' + (j + 1) + '</td>';
                    htmls += '<td>画像<br>なし</td>';
                    htmls += '<td class="p_name" data_field_type="product_name" contenteditable="true">' + response[i].product_name + '</td>';
                    htmls += '<td>定</td>';
                    htmls += '<td><input type="tel" value="' + response[i].case_inputs + '" data_field_type="case_inputs" class="form-control text-right v_case_inputs edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" value="' + response[i].ball_inputs + '" data_field_type="ball_inputs" class="form-control text-right v_ball_inputs edit_vendor_item"></td>';
                    htmls += '<td>0</td>';
                    htmls += '<td><input type="tel" value="' + response[i].cost_price + '" data_field_type="cost_price"  class="form-control text-right digits v_cost_price edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" value="' + response[i].selling_price + '" data_field_type="selling_price" class="form-control text-right digits v_selling_price edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" value="' + response[i].gross_profit + '" data_field_type="gross_profit" class="form-control text-right v_gross_profit edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" value="' + response[i].gross_profit_margin + '" data_field_type="gross_profit_margin" class="form-control text-right v_gross_profit_margin edit_vendor_item"></td>';
                    htmls += '<td><input type="number" data_current_vl="' + in_company_code + '"  data_field_type="company_code" value="' + in_company_code + '" class="form-control text-center v_in_company_code"></td>';
                    htmls += '<td style="padding:0px!important;"><span class="vendor_name vendor_name_control hide">' + vendor_name + '</span><span class="vendor_select vendor_name_control show"><select vendor_item_id="' + response[i].vendor_item_id + '" class="form-control vendor_select2"><option selected value="' + response[i].vendor_id + '">' + vendor_name + '</option></select></span></td>';
                    htmls += '<td style="padding:0px;">' + response[i].maker_name + ' ' + response[i].jan + '</td>';
                    htmls += '</tr>';
                    j++;
                }
            } else {
                htmls += '<tr><td colspan="14" class="text-center">商品がありません。</td></tr>';
            }
            $(".vendor_itemdata_table").html(htmls);
            $('.digits_td').digits_td();
            $('.digits').digits();
            setTimeout(function () {
                $('.vendor_item_edit_delete_inline').removeClass('color_row_new_color')
            }, 60000)

            if (vendor_id == 0) {
                $('.supplier_name_input').val('');
                $('.vendor_list_show').text('');
            }
            $('.v_ids_v').val(vendor_id);
            $('#vendor_show_modal').modal('hide');
            /*vendor dynamic select*/
            $('.vendor_select2').select2({
                tags: true,
                ajax: {
                    url: 'get_all_vendor_list_for_select2',
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        return {
                            searchTerm: params.term
                        };
                    },
                    processResults: function (response) {
                        console.log(response);
                        return {
                            results: response.results
                        };
                    },
                    cache: false
                },
                createTag: function (params) {
                    var term = $.trim(params.term);
                    if (term === '') {
                        return null;
                    }
                    return {
                        id: term,
                        text: term,
                        newTag: true // add additional parameters
                    };
                    /* var vendor_id = null;
                      var vendor_code = Math.floor(100000 + Math.random() * 900000);
                      var vendor_phone = Math.floor(100000000 + Math.random() * 900000000);
                      $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        },
                        url: "vendor_add_edit",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            vendor_id: vendor_id,
                            vendor_name: term,
                            vendor_code: vendor_code,
                            vendor_phone: vendor_phone
                        },
                        success: function (response) {
                            return {
                                id: response.vendor_id,
                                text: term,
                                newTag: true // add additional parameters
                              }
                        }
                    });*/

                }

                /* insertTag: function (data, tag) {

                    data.push(tag);
                    console.log(typeof data.selected);
                    console.log(data);
                    if (typeof data.selected !== 'undefined') {

                        var vendor_id = null;
                    var vendor_code = Math.floor(100000 + Math.random() * 900000);
                    var vendor_phone = Math.floor(100000000 + Math.random() * 900000000);
                    $.ajax({
                      headers: {
                          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                      },
                      url: "vendor_add_edit",
                      type: "POST",
                      dataType: "JSON",
                      data: {
                          vendor_id: vendor_id,
                          vendor_name: data.text,
                          vendor_code: vendor_code,
                          vendor_phone: vendor_phone
                      },
                      success: function (response) {
                          return {
                              id: response.vendor_id,
                              text: term,
                              newTag: true // add additional parameters
                            }
                      }
                  });
                    }

                  },*/
            }).on("select2:select", function (e) {
                console.log(e.params.data);
                var vendor_item_id = $(this).closest('tr').attr('data-id');
                var maker_id = $(this).closest('tr').attr('maker_id');
                if (e.params.data.newTag) {
                    // append the new option element prenamently:
                    $("#vendor_reg_modal_inner_page").modal("show");
                    $('#vendor_name_m').val(e.params.data.text);
                    $('.inner_page_vendor_item_id').val(vendor_item_id);
                    $('.inner_page_maker_id').val(maker_id);
                    return false;
                    // store the new tag:
                    var vendor_id = null;
                    var vendor_name = e.params.data.text;
                    console.log(vendor_name);
                    var vendor_code = Math.floor(100000 + Math.random() * 900000);
                    var vendor_phone = Math.floor(100000000 + Math.random() * 900000000);
                    $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        },
                        url: "vendor_add_edit",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            vendor_item_id: vendor_item_id,
                            vendor_id: vendor_id,
                            vendor_name: vendor_name,
                            vendor_code: vendor_code,
                            vendor_phone: vendor_phone
                        },
                        success: function (response) {
                            $(this).find('[value="' + response.vendor_id + '"]').replaceWith('<option selected value="' + response.vendor_id + '">' + e.params.data.text + '</option>');
                        }
                    });
                } else if (e.params.data.selected) {
                    console.log(vendor_item_id);
                    $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        },
                        url: "vendor_master_update_by_vendor_id",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            vendor_item_id: vendor_item_id,
                            vendor_id: e.params.data.id,
                            maker_id: maker_id
                        },
                        success: function (response) {
                            console.log(response);
                            get_vendor_master_item_list();
                        }
                    });
                }
            });
            /*vendor dynamic select*/
        }
    });
}

function get_vendor_master_item_list_order(type) {
    if (type == 'tonoya') {
        maker_order=0;
        num_order=0;
        tonoya_order = tonoya_order == 0 ? "asc" : (tonoya_order == 'asc' ? 'desc' : 'asc') ;
    }
    if (type == 'maker') {
        tonoya_order = 0;
        num_order = 0;
        maker_order = maker_order == 0 ? 'asc' : (maker_order == 'asc' ? 'desc' : 'asc') ;
    }
    if (type == 'num_of_order') {
        tonoya_order = 0;
        maker_order = 0;
        num_order = num_order == 0 ? 'asc' : (num_order == 'asc' ? 'desc' : 'asc') ;
    }
    get_vendor_master_item_list();
}

function get_vendor_master_item_list_num_of_order() {
    num_of_order = num_of_order == 0 ? 1 : (num_of_order == 1 ? 2 : 1) ;

    let  order_by_tonya = 0;
    let  order_by_maker_name = 0;
    var vendor_id = $('.v_ids_v').val();
    var jan = $('.jan_code_search').val();
    var in_company_code = $('.in_company_code_search').val();
    var is_special = 0;
    var urls = url_search();
    is_special = (urls == 'special_master_item' ? '1' : '0');

    let data = {
        vendor_id: vendor_id,
        in_company_code: in_company_code,
        jan: jan,
        is_special: is_special,
        order_by_tonya: order_by_tonya,
        order_by_maker_name: order_by_maker_name,
        vendor_item_id_order: 0,
    };
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: 'get_all_vendor_master_sorting_item',
        type: "post",
        data: data,
        success: function (response) {

            $(".vendor_itemdata_table").html("");
            var j = 0;
            var htmls = '';
            if (response.length > 0) {
                for (var i = 0; i < (response.length); i++) {
                    var vendor_name = (response[i].vendor_id == 0 ? '不明' : response[i].name);

                    // Create date from input value
                    var entryDate = new Date(response[i].created_at);
                    // Get today's date
                    var todaysDate = new Date();
                    // call setHours to take the time out of the comparison
                    var row_colors = 'no_color';
                    let now = +new Date();
                    let createdAt = +new Date(Date.parse(response[i].created_at.toString()));
                    var oneDay = 24 * 60 * 60 * 1000;
                    var new_colors = '';

                    if ((now - createdAt) < oneDay) {
                        //within 24h
                        row_colors = 'yes_color';
                    }
                    var date1 = new Date();
                    var date2 = new Date(response[i].created_at);
                    var diffMs = (date1 - date2);
                    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                    var diffS = ((diffMs % 86400000) % 3600000) / 60000; // s
                    // var diffDays = Math.floor(diffMs / 86400000); // days

                    if (diffS <= 0.255) {
                        new_colors = 'new_color';
                    }
                    // console.log(((diffMs % 86400000) % 3600000) / 60000)

                    var in_company_code = (response[i].in_company_code == null ? '' : response[i].in_company_code);
                    htmls += '<tr data_action_status="0" data-id="' + response[i].vendor_item_id + '" vendor-id="' + response[i].vendor_id + '" maker_id="' + response[i].maker_id + '" class="vendor_item_edit_delete_inline color_row_' + row_colors + ' color_row_' + new_colors + '" >';
                    htmls += '<td>' + (j + 1) + '</td>';
                    htmls += '<td>画像<br>なし</td>';
                    htmls += '<td class="p_name" data_field_type="product_name" contenteditable="true">' + response[i].product_name + '</td>';
                    htmls += '<td>定</td>';
                    htmls += '<td><input type="tel" value="' + response[i].case_inputs + '" data_field_type="case_inputs" class="form-control text-right v_case_inputs edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" value="' + response[i].ball_inputs + '" data_field_type="ball_inputs" class="form-control text-right v_ball_inputs edit_vendor_item"></td>';
                    htmls += '<td>0</td>';
                    htmls += '<td><input type="tel" value="' + response[i].cost_price + '" data_field_type="cost_price"  class="form-control text-right digits v_cost_price edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" value="' + response[i].selling_price + '" data_field_type="selling_price" class="form-control text-right digits v_selling_price edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" value="' + response[i].gross_profit + '" data_field_type="gross_profit" class="form-control text-right v_gross_profit edit_vendor_item"></td>';
                    htmls += '<td><input type="tel" value="' + response[i].gross_profit_margin + '" data_field_type="gross_profit_margin" class="form-control text-right v_gross_profit_margin edit_vendor_item"></td>';
                    htmls += '<td><input type="number" data_current_vl="' + in_company_code + '"  data_field_type="company_code" value="' + in_company_code + '" class="form-control text-center v_in_company_code"></td>';
                    htmls += '<td style="padding:0px!important;"><span class="vendor_name vendor_name_control hide">' + vendor_name + '</span><span class="vendor_select vendor_name_control show"><select vendor_item_id="' + response[i].vendor_item_id + '" class="form-control vendor_select2"><option selected value="' + response[i].vendor_id + '">' + vendor_name + '</option></select></span></td>';
                    htmls += '<td style="padding:0px;">' + response[i].maker_name + ' ' + response[i].jan + '</td>';
                    htmls += '</tr>';
                    j++;
                }
            } else {
                htmls += '<tr><td colspan="14" class="text-center">商品がありません。</td></tr>';
            }
            $(".vendor_itemdata_table").html(htmls);
            $('.digits_td').digits_td();
            $('.digits').digits();
            setTimeout(function () {
                $('.vendor_item_edit_delete_inline').removeClass('color_row_new_color')
            }, 60000)

            if (vendor_id == 0) {
                $('.supplier_name_input').val('');
                $('.vendor_list_show').text('');
            }
            $('.v_ids_v').val(vendor_id);
            $('#vendor_show_modal').modal('hide');
            /*vendor dynamic select*/
            $('.vendor_select2').select2({
                tags: true,
                ajax: {
                    url: 'get_all_vendor_list_for_select2',
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        return {
                            searchTerm: params.term
                        };
                    },
                    processResults: function (response) {
                        console.log(response);
                        return {
                            results: response.results
                        };
                    },
                    cache: false
                },
                createTag: function (params) {
                    var term = $.trim(params.term);
                    if (term === '') {
                        return null;
                    }
                    return {
                        id: term,
                        text: term,
                        newTag: true // add additional parameters
                    };
                    /* var vendor_id = null;
                      var vendor_code = Math.floor(100000 + Math.random() * 900000);
                      var vendor_phone = Math.floor(100000000 + Math.random() * 900000000);
                      $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        },
                        url: "vendor_add_edit",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            vendor_id: vendor_id,
                            vendor_name: term,
                            vendor_code: vendor_code,
                            vendor_phone: vendor_phone
                        },
                        success: function (response) {
                            return {
                                id: response.vendor_id,
                                text: term,
                                newTag: true // add additional parameters
                              }
                        }
                    });*/

                }

                /* insertTag: function (data, tag) {

                    data.push(tag);
                    console.log(typeof data.selected);
                    console.log(data);
                    if (typeof data.selected !== 'undefined') {

                        var vendor_id = null;
                    var vendor_code = Math.floor(100000 + Math.random() * 900000);
                    var vendor_phone = Math.floor(100000000 + Math.random() * 900000000);
                    $.ajax({
                      headers: {
                          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                      },
                      url: "vendor_add_edit",
                      type: "POST",
                      dataType: "JSON",
                      data: {
                          vendor_id: vendor_id,
                          vendor_name: data.text,
                          vendor_code: vendor_code,
                          vendor_phone: vendor_phone
                      },
                      success: function (response) {
                          return {
                              id: response.vendor_id,
                              text: term,
                              newTag: true // add additional parameters
                            }
                      }
                  });
                    }

                  },*/
            }).on("select2:select", function (e) {
                console.log(e.params.data);
                var vendor_item_id = $(this).closest('tr').attr('data-id');
                var maker_id = $(this).closest('tr').attr('maker_id');
                if (e.params.data.newTag) {
                    // append the new option element prenamently:
                    $("#vendor_reg_modal_inner_page").modal("show");
                    $('#vendor_name_m').val(e.params.data.text);
                    $('.inner_page_vendor_item_id').val(vendor_item_id);
                    $('.inner_page_maker_id').val(maker_id);
                    return false;
                    // store the new tag:
                    var vendor_id = null;
                    var vendor_name = e.params.data.text;
                    console.log(vendor_name);
                    var vendor_code = Math.floor(100000 + Math.random() * 900000);
                    var vendor_phone = Math.floor(100000000 + Math.random() * 900000000);
                    $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        },
                        url: "vendor_add_edit",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            vendor_item_id: vendor_item_id,
                            vendor_id: vendor_id,
                            vendor_name: vendor_name,
                            vendor_code: vendor_code,
                            vendor_phone: vendor_phone
                        },
                        success: function (response) {
                            $(this).find('[value="' + response.vendor_id + '"]').replaceWith('<option selected value="' + response.vendor_id + '">' + e.params.data.text + '</option>');
                        }
                    });
                } else if (e.params.data.selected) {
                    console.log(vendor_item_id);
                    $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        },
                        url: "vendor_master_update_by_vendor_id",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            vendor_item_id: vendor_item_id,
                            vendor_id: e.params.data.id,
                            maker_id: maker_id
                        },
                        success: function (response) {
                            console.log(response);
                            get_vendor_master_item_list();
                        }
                    });
                }
            });
            /*vendor dynamic select*/
        }
    });
}

function get_customer_list(customer_id = null) {

    var page_url = url_search();
    if(page_url=='brand-order' || page_url=='brand-order#'){
        $('.navigation_message_for_brand').html('<p class="navpnavigation">ここは手書き受注画面です<br>スーパーを選んで下さい</p>');
    }else{
        $('.navigation_message_for_brand').html('');
    }

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_customer_list",
        type: "POST",
        dataType: "JSON",
        data: {
            customer_id: customer_id
        },
        success: function (response) {
            if (customer_id == null) {
                $(".customer_list_item").html("");
                var htmls = '';
                $.each(response.all_customer_list, function (
                    idx,
                    obj
                ) {
                    htmls +=
                        '<tr><td data_customer_id="' + obj.customer_id + '" class="filter_by_customer_id">' +
                        obj.name +
                        "</td><td>" +
                        obj.phone +
                        '</td><td>' + obj.partner_code + '</td></tr>';
                });
                var last_urls = url_search();
                if (last_urls != 'customer_master') {
                    $('.add_new_customer').hide();
                }
                $(".customer_list_item").html(htmls);
            } else {
                $(".delete_custmer_info").attr(
                    "data_customer_delete_id",
                    response.specific_customer_info
                        .customer_id
                );
                $("#customer_id_update").val(
                    response.specific_customer_info
                        .customer_id
                );
                $("#customer_name_update").val(
                    response.specific_customer_info
                        .name
                );
                $("#customer_code_update").val(
                    response.specific_customer_info
                        .partner_code
                );
                $("#customer_phone_update").val(
                    response.specific_customer_info
                        .phone
                );
            }
        }
    });
}

function get_vendor_list(vendor_id = null) {
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_vendor_list",
        type: "POST",
        dataType: "JSON",
        data: {
            vendor_id: vendor_id
        },
        success: function (response) {
            if (vendor_id == null) {
                $(".vendor_list_item").html("");
                var htmls = '';
                //var htmls ='<tr><td colspan="3" data_vendor_id="0" class="filter_by_vendor_id" style="text-align:center;">全仕入先</td></tr>';
                $.each(response.all_vendor_list, function (idx, obj) {
                    htmls +=
                        '<tr><td data_vendor_id="' +
                        obj.vendor_id + '" class="filter_by_vendor_id">' +
                        obj.name +
                        "</td><td>" +
                        obj.phone +
                        '</td><td>' + obj.partner_code + '</td></tr>';
                });
                var last_urls = url_search();
                if (last_urls != 'vendor_master') {
                    $('.add_new_vendor').hide();
                }
                $(".vendor_list_item").html(htmls);
            } else {
                $(".delete_vendor_info").attr(
                    "data_vendor_delete_id",
                    response.specific_vendor_info.vendor_id
                );
                $("#vendor_id_update").val(
                    response.specific_vendor_info.vendor_id
                );
                $("#vendor_name_update").val(
                    response.specific_vendor_info.name
                );
                $("#vendor_code_update").val(
                    response.specific_vendor_info.partner_code
                );
                $("#vendor_phone_update").val(
                    response.specific_vendor_info.phone
                );
            }
        }
    });
}

var error_nav;
var success_nav;
var delete_item_nav;
var delete_item_delete_final;
var delete_item_delete_success;
var receive_order_step_1_nav;
var receive_order_step_2_nav;
var receive_order_step_3_nav;
var receive_order_step_4_nav;
var receive_order_step_5_nav;
var goto_vendor_sheet_step_1;
var goto_customer_sheet_step_1;
var goto_vendor_sheet_step_2;
var goto_customer_sheet_step_2;
var goto_vendor_sheet_step_3;
var goto_customer_sheet_step_3;
var manual_order_exe_step_1;
var manual_order_exe_step_2;
var temp_vendor_insert_status = 0;
const temporary_message = {

    vendor_item_add_instruction: {
        message: [
            {message: '入力方法 '},
            {message: 'a, ＪＡＮコード入力（左上の黄色枠）'},
            {message: 'b, ハンディやスマホでスキャン入力'},
        ]
    },
    manual_orders_exe_step_2: {
        message: [
            {message: '出荷予定で確認できます。 '}
        ],
        buttons: [{button: '<center><a href="javascript:goto_shipment_page()" class="btn btn-success">出荷画面</a><a href="javascript:close_default_page_navi(8010)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
    },
    invalid_jan_code: {
        message: [
            {message: '商品が見つかりません。 '}
        ],
        buttons: [{button: '<center><a href="javascript:close_default_page_navi(404)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
    },
    invalid_cost_price: {
        message: [
            {message: '販売価格よりも少ない金額を入力してください'}
        ],
        buttons: [{button: '<center><a href="javascript:close_default_page_navi(404)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
    },
    invalid_gross_profit_margin: {
        message: [
            {message: '最初に利益率を入力してください'}
        ],
        buttons: [{button: '<center><a href="javascript:close_default_page_navi(404)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
    },
    invalid_selling_price: {
        message: [
            {message: '原価を入力するか、最初に原価を増やしてください'}
        ],
        buttons: [{button: '<center><a href="javascript:close_default_page_navi(404)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
    },
    invalid_profit_ammount: {
        message: [
            {message: '原価を入力して更新してください'}
        ],
        buttons: [{button: '<center><a href="javascript:close_default_page_navi(404)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
    },
    exceed_orderable_qty: {
        message: [
            {message: '入荷予定数を超えています。 '}
        ],
        buttons: [{button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
    },
    select_a_vendor_to_add_item: {
        message: [
            {message: 'この商品は、メーカー（仕入先）が判別できません。「仕入先」を指示してください。'}
        ],
        buttons: [
            {button: '<center><button class="btn btn-danger flash-button vendor_list_show_popup">仕入先別</button></center>'}
        ]
    },
    vendor_item_add_update: {
        message: [
            {message: '変更しました'},
        ],
        buttons: [
            {button: '<center><button class="btn btn-primary vendor_list_show_popup">仕入先別</button></center>'}
        ]
    },
    vendor_item_delete_notify: {
        message: [
            {message: '削除を行います。対象の行を選択してください。'},
        ],
        buttons: [
            {button: '<center><button class="btn btn-danger" id="close_all_navi">戻る</button></center>'}
        ]
    },
    customer_item_delete_notify: {
        message: [
            {message: '削除を行います。対象の行を選択してください。'},
        ],
        buttons: [
            {button: '<center><button class="btn btn-danger" id="close_all_navi">戻る</button></center>'}
        ]
    },
    customer_id_select_required: {
        message: [
            {message: 'スーパーを選択してください。'},
        ],
        buttons: [{button: '<center><a href="javascript:close_default_page_navi(404)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
    },
    yellow_item_order_notify: {
        message: [
            {message: '黄色の商品は、発注点に到達しました。'},
            {message: '仕入れする必要があります。'},
            {message: '発注しますか？'},
        ],
        buttons: [{button: '<center><button class="btn btn-success place_yellow_item_order">発注</button></button><a href="javascript:close_default_page_navi(4041)" class="btn btn-primary rsalrtconfirms">戻る</a></center>'}]
    },
    place_order_yellow_item_order_notify: {
        message: [
            {message: '発注する数量を確認してください。'},
            {message: '発注しますか？'},
        ],
        buttons: [{button: '<center><button class="btn btn-success place_yellow_item_order_confirm">発注</button></button><a href="javascript:close_default_page_navi(4042)" class="btn btn-primary rsalrtconfirms">戻る</a></center>'}]
    },
    place_order_yellow_item_order_confirmation: {
        message: [
            {message: '発注しますか？'},
        ],
        buttons: [{button: '<center><button class="btn btn-success place_yellow_item_order_done_action">発注</button></button><a href="javascript:close_default_page_navi(4043)" class="btn btn-primary rsalrtconfirms">戻る</a></center>'}]
    },
    place_order_yellow_item_order_success: {
        message: [
            {message: '発注が完了しました。'},
            {message: '入荷予定で確認できます。'},
        ],
        buttons: [{button: '<center><button class="btn btn-warning place_yellow_item_order_success">入荷予定</button></button><a href="javascript:close_default_page_navi(4044)" class="btn btn-primary rsalrtconfirms">戻る</a></center>'}]
    },
    place_order_yellow_item_order_success_done: {
        message: [
            {message: '入荷予定数は、黄色で表示されました。<br>確認してください。'},
            {message: 'ハンディ又は、スマホで入荷検品すると<br> 入荷内訳と在庫数に反映されます。'},
        ],
        buttons: [{button: '<center><a href="javascript:close_default_page_navi(101)" class="btn btn-warning place_yellow_item_order_success_dones">確認</a></center>'}]
    },
    vendor_managementsheetnavi_1: {
        message: [
            {message: '買掛集計の期間設定をしますか？'},
        ],
        buttons: [{button: '<center><a href="javascript:pl_custom_date_popup(1)" id="custom_date_pl" style="padding: 16px 38px; margin-right: 10px;" class="btn btn-info pull-left"><span class="dynamic_mange_btn_left">設定します</span></a><a href="vendormangementsheet" id="current_date_pl" class="btn btn-info pull-right"><span class="dynamic_mange_btn_right">設定しません <br>（直近分を表示します）</span></a></center>'}],
        top_return_btn_buttons: [
            {return_button: ' <button class="btn btn-danger close_sheet_v_nav_1 float-right">戻る</button>'}
        ]
    },
    customer_managementsheetnavi_1: {
        message: [
            {message: '売掛集計の期間設定をしますか？'},
        ],
        buttons: [{button: '<center><a href="javascript:pl_custom_date_popup(2)" id="custom_date_pl" style="padding: 16px 38px; margin-right: 10px;" class="btn btn-info pull-left"><span class="dynamic_mange_btn_left">設定します</span></a><a href="shipmentmangementsheet" id="current_date_pl" class="btn btn-info pull-right"><span class="dynamic_mange_btn_right">設定しません <br>（直近分を表示します）</span></a></center>'}],
        top_return_btn_buttons: [
            {return_button: ' <button class="btn btn-danger close_sheet_c_nav_1 float-right">戻る</button>'}
        ]
    },
    vendor_managementsheetnavi_2: {
        message: [
            {message: '期間設定ができます。'},
            {message: '修正してください。'},
            {message: '<input id="from_date" type="text" class="from_dates form-control get_dates" value=""><div style="max-width: 6%; float: left; display: inline-block;padding: 6px 0px;">～</div><input id="to_date" type="text" class="to_dates form-control get_dates" value="">'},
        ],
        buttons: [{button: '<center><a href="javascript:management_sheet_date_confirmations(1)" class="btn btn-info pull-left">完了</a></center>'}],
        top_return_btn_buttons: [
            {return_button: ' <button class="btn btn-danger close_sheet_v_nav_2 float-right">戻る</button>'}
        ]
    },
    customer_managementsheetnavi_2: {
        message: [
            {message: '期間設定ができます。'},
            {message: '修正してください。'},
            {message: '<input id="from_date" type="text" class="from_dates form-control get_dates" value=""><div style="max-width: 6%; float: left; display: inline-block;padding: 6px 0px;">～</div><input id="to_date" type="text" class="to_dates form-control get_dates" value="">'},
        ],
        buttons: [{button: '<center><a href="javascript:management_sheet_date_confirmations(2)" class="btn btn-info pull-left">完了</a></center>'}],
        top_return_btn_buttons: [
            {return_button: ' <button class="btn btn-danger close_sheet_c_nav_2 float-right">戻る</button>'}
        ]
    },
    search_result_message: {
        message: [
            {message: '検索結果を表示しました。'},
        ],
        buttons: [{button: '<center><a href="javascript:close_default_page_navi(101)" class="btn btn-warning place_yellow_item_order_success_dones">確認</a></center>'}]
    },
    search_result_message_else: {
        message: [
            {message: 'このJANコードはこの画面に入ってありません。'},
        ],
        buttons: [{button: '<center><a href="javascript:close_default_page_navi(101)" class="btn btn-warning place_yellow_item_order_success_dones">確認</a></center>'}]
    },
}
$(document).ready(function () {
    /*haccu list*/
    var vndorList = [];
    var clr = [];
    var l = 0;
    $('.hacchu_list_row').each(function (index) {
        var vendor_id = $(this).attr('data_vendor_id');

        if (jQuery.inArray(vendor_id, vndorList) != -1) {
            console.log("is in array");
            console.log(clr);
            console.log(l);
            $(this).css('background-color', clr[l - 1]);
        } else {
            vndorList.push($(this).attr('data_vendor_id'));

            // clr.push('#'+Math.floor(Math.random()*16777215).toString(16));
            clr.push('rgb(' +
                (Math.floor(Math.random() * 56) + 200) + ', ' +
                (Math.floor(Math.random() * 56) + 200) + ', ' +
                (Math.floor(Math.random() * 56) + 200) + ',0.9' +
                ')');
            $(this).css('background-color', clr[l]);
            l++;
            console.log("is NOT in array");

        }

    })
    /*haccu list*/
    /* $('.vendor_select2').select2({
         createTag: function (params) {
           var term = $.trim(params.term);
           console.log(term);
           if (term === '') {
             return null;
           }
           var vendor_id = null;
           var vendor_code = Math.floor(100000 + Math.random() * 900000);
           var vendor_phone = Math.floor(100000000 + Math.random() * 900000000);
           $.ajax({
             headers: {
                 "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
             },
             url: "vendor_add_edit",
             type: "POST",
             dataType: "JSON",
             data: {
                 vendor_id: vendor_id,
                 vendor_name: term,
                 vendor_code: vendor_code,
                 vendor_phone: vendor_phone
             },
             success: function (response) {
                 return {
                     id: response.vendor_id,
                     text: term,
                     newTag: true // add additional parameters
                   }
             }
         });

         }
       });  */
    /*
    vendor item search
    */
    $('.vendor_item_search').keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });
    $('.vendor_item_search').blur(function (e) {
        // get_vendor_master_item_list();
        let jan = $('.jan_code_search').val();
        sortTable_by_jan('vendor_itemdata_table', jan, 13);

    });
    /*
    vendor item search
    */

    if (WURFL.form_factor == 'Feature Phone') {
        $('.jan_scaning').hide();
    } else {
        $('.jan_scaning').show();
    }
    $("#receive_inventorys").click(function (event) {
        event.preventDefault();
        $('.content_popuparea').show();
        //receive_inventory_handy();
    });
    /*body click nav show example*/
    $(document).mouseup(function (e) {
        //var hide_enter_outside = $(".nav_disp,.ui-datepicker");
        var is_id_1 = $('.nav_disp').attr('id');
        //console.log(is_id_1);
        var hide_enter_outside = $("#jn_0,.ui-datepicker");
        // console.log(hide_enter_outside);
        // console.log('divs');

        if (!hide_enter_outside.is(e.target) && hide_enter_outside.has(e.target).length === 0 && is_id_1 == 'jn_0') {
            close_all_navi_msg();
            show_hide_nav_icn(1);
            // console.log('divs out click');
        }
    });
    /*case size setting handy*/

    $("#size_setting_btn").click(function (event) {

        $("#size_setting_aria").removeClass('hide').addClass('show')
    });
    $("#hide_size_setting_aria_close_btn").click(function (event) {
        $("#size_setting_aria").removeClass('show').addClass('hide')
    });

    $("#size_setting_case_btn").click(function (event) {
        event.preventDefault();
        $("#size_setting_ball_btn").addClass('btn-default').removeClass('btn-success');
        $("#size_setting_separate_btn").addClass('btn-default').removeClass('btn-success');
        $("#size_setting_case_btn").addClass('btn-success').removeClass('btn-default');
        $("#size_setting_name").text($(this).text());
        //set_default_size(1);
    });

    $("#size_setting_ball_btn").click(function (event) {
        event.preventDefault();
        $("#size_setting_case_btn").addClass('btn-default').removeClass('btn-success');
        $("#size_setting_separate_btn").addClass('btn-default').removeClass('btn-success');

        $("#size_setting_ball_btn").addClass('btn-success').removeClass('btn-default');
        $("#size_setting_name").text($(this).text());
        //set_default_size(2);
    });


    $("#size_setting_separate_btn").click(function (event) {
        event.preventDefault();
        $("#size_setting_case_btn").addClass('btn-default').removeClass('btn-success');
        $("#size_setting_ball_btn").addClass('btn-default').removeClass('btn-success');
        $("#size_setting_separate_btn").addClass('btn-success').removeClass('btn-default');
        $("#size_setting_name").text($(this).text());
        //set_default_size(3);
    });
    /*case size setting handy*/
    $('#vendor_show_modal,#customer_show_modal').on('hidden.bs.modal', function (e) {
        show_hide_nav_icn(1);
    })
    // $(document).mouseup(function(e) {
    //     var hide_enter_outside = $(".ui-datepicker");

    //     if (!hide_enter_outside.is(e.target) && hide_enter_outside.has(e.target).length === 0) {

    //     }
    // });

    /*body click nav show example*/
    $("#right").on("click", function (e) {
        e.preventDefault();
        var leftPos = $('.freeze-multi-scroll-table-body').scrollLeft();
        console.log(leftPos);
        $(".freeze-multi-scroll-table-body").animate({
            scrollLeft: leftPos + 450
        }, 800);
    });

    $("#left").on("click", function (e) {
        e.preventDefault();
        var leftPos = $('.freeze-multi-scroll-table-body').scrollLeft();
        console.log(leftPos);
        $(".freeze-multi-scroll-table-body").animate({
            scrollLeft: leftPos - 450
        }, 800);
    });
    /*yelow color order execute*/
    $('.customBackBtn').click(function(e){
        e.preventDefault();
        var page_slug_check =  $('.jcs_main_hand_title').attr('data_page_num');
        if(page_slug_check==1){
            var c_id=1;
            var c_name = 'A スーパー';
            $('.c_ids_v').val(c_id);
            $('.jcs_main_hand_title').text(c_name);
            $('.jcs_main_hand_title').attr('data_page_num',2);
            get_brand_item_list(c_id, c_name);
        }else if(page_slug_check==2){

            close_all_navi_msg();
            show_hide_nav_icn(0);
            get_customer_list();
            $('#customer_message_success').html('');
            $("#add_customer_message").html('');
            $("#update_customer_message_fail").html('');
            $("#customer_show_modal").modal("show");
            $('.jcs_main_hand_title').attr('data_page_num',0);
        }else{
            history.back();
        }
    })
    $(document).delegate('.shopListitem', 'click', function (e) {
        var cus_name =  $('.jcs_main_hand_title').text();
        var cId_val = $(this).closest('tr').attr('customer-id');
        var shpname = $(this).closest('tr').find('td:nth-child(1)').text();
        var cus_shpneame = cus_name+' ・ '+shpname;
        $('.jcs_main_hand_title').text('');
        $('.jcs_main_hand_title').text(cus_shpneame);
        $('.jcs_main_hand_title').attr('data_page_num',1);
        $('.c_ids_v').val(cId_val);
        $('.c_ids_name').val(cus_shpneame);
        get_brand_shop_brand_list(cId_val,cus_name);
    });
    $(document).delegate('.place_yellow_item_order_done_action', 'click', function (e) {
        e.preventDefault();

        var dtes = $.datepicker.formatDate('yy-mm-dd', new Date());
        var shipment_date = dtes;
        var voucher_number = Math.floor(100000 + Math.random() * 900000);
        var data_array = [];
        var data_array2 = [];
        var data_array3 = [];
        $('#inventory_details_qty_bysuplierid .table .order_receive_body .tr_insufficant_quantity').each(function () {
            var vendor_id = $(this).attr('vendor_id');
            var vendor_item_id = $(this).attr('row_id');
            var quantity_case = $(this).find("td:nth-child(11)").text();
            var quantity_ball = $(this).find("td:nth-child(12)").text();
            var quantity_unit = $(this).find("td:nth-child(13)").text();
            var total_order_lot_inventory_qty = $(this).find(".total_order_lot_inventory_qty").text();
            var cost_price = $(this).find("td:nth-child(18)").text();
            var quantity = 0;
            var unit_type = '';

            voucher_number = Math.floor(100000 + Math.random() * 900000);
            var single_data = [
                quantity_case,
                quantity_ball,
                quantity_unit,
                vendor_id,
                vendor_item_id,
                shipment_date,
                voucher_number,
                cost_price,
                total_order_lot_inventory_qty
            ];
            data_array.push(single_data);

        });
        // console.log(data_array);
        // console.log(data_array2);
        // return 0;
        var v_id = $('.v_ids_v').val();
        var v_name = $('.byrs_syplr_titles').text();
        // Ajax
        if (data_array.length > 0) {
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                url: "vendor_order_insert_new",
                type: "POST",
                dataType: "JSON",
                data: {data_array: data_array},
                success: function (response) {
                    console.log(response);
                    get_vendor_list_item_by_vendor_id(v_id, v_name);
                }
            });
        }
        // Ajax
    })
    /*yelow color order execute*/
    /*receive order nav flow*/
    $("body").on("click", ".to_dates", function () {
        $(this).datepicker({
            dateFormat: 'yy年mm月dd日',
            autoclose: true,
            todayHighlight: true,
            orientation: "auto",
            useCurrent: false,
            onSelect: function (selected) {
                console.log(44);
                $('.to_dates').val(selected);
            }
        });
        $(this).datepicker("show");
    });
    $(document).delegate('.from_dates', 'click', function (e) {
        e.preventDefault();

        $(this).datepicker({
            dateFormat: 'yy年mm月dd日',
            autoclose: true,
            todayHighlight: true,
            orientation: "auto",
            useCurrent: false,
            onSelect: function (dateText) {
                console.log(dateText);
                $('.from_dates').val(dateText);
                var new_dates = new Date();
                $(".to_dates").datepicker({
                    dateFormat: 'yy年mm月dd日'
                });
                $(".to_dates").datepicker("setDate", new Date());
            }
        })
        $(this).datepicker("show");
    })

    $(document).delegate('.close_sheet_v_nav_1', 'click', function (e) {
        nav_list[goto_vendor_sheet_step_1].hide();
        show_hide_nav_icn(1);
    });
    $(document).delegate('.close_sheet_c_nav_1', 'click', function (e) {
        nav_list[goto_customer_sheet_step_1].hide();
        show_hide_nav_icn(1);
    });

    $(document).delegate('.close_sheet_v_nav_2', 'click', function (e) {
        nav_list[goto_vendor_sheet_step_2].hide();
        nav_list[goto_vendor_sheet_step_1].show();
        show_hide_nav_icn(0);
    });
    $(document).delegate('.close_sheet_c_nav_2', 'click', function (e) {
        nav_list[goto_customer_sheet_step_2].hide();
        nav_list[goto_customer_sheet_step_1].show();
        show_hide_nav_icn(0);
    });


    $(document).delegate('.close_sheet_v_nav_3', 'click', function (e) {
        nav_list[goto_vendor_sheet_step_3].hide();
        nav_list[goto_vendor_sheet_step_2].show();
        show_hide_nav_icn(0);
    });
    $(document).delegate('.close_sheet_c_nav_3', 'click', function (e) {
        nav_list[goto_customer_sheet_step_3].hide();
        nav_list[goto_customer_sheet_step_2].show();
        show_hide_nav_icn(0);
    });
    $(document).delegate('.manual_order_exe', 'click', function (e) {
        e.preventDefault();
        var page = url_search();
        if (page == 'manualOrder') {
            var c_name = $('.jcs_main_hand_title').text();
            var c_id = $('.c_ids_v').val();
            if (c_id != 0) {
                close_all_navi_msg();
                show_hide_nav_icn(0);
                const manual_order_message = {
                    manual_orders_exe_step_1: {
                        message: [
                            {message: c_name + 'の確定を完了しますか？ '}
                        ],
                        buttons: [{button: '<center><a href="javascript:manual_order_exe2()" class="btn btn-primary btn-lg">はい</a><a href="javascript:close_default_page_navi(808)" class="btn btn-danger btn-lg">いいえ</a></center>'}]
                    }
                }

                nav_width = '390px';
                display_positionX = '15px';
                display_positionY = '15px';
                manual_order_exe_step_1 = view(manual_order_message['manual_orders_exe_step_1'], def_center_mesg_template);
            } else {
                alert('please select a super');
            }
        } else {
            console.log('it will work from manual page');
        }
    });


    $(document).delegate('.receiveablebtn', 'click', function (e) {
        e.preventDefault();
        close_all_navi_msg();
        show_hide_nav_icn(0);
        nav_width = '390px';
        display_positionX = '15px';
        display_positionY = '15px';
        goto_vendor_sheet_step_1 = view(temporary_message['vendor_managementsheetnavi_1'], def_old_nav_template_custom_close);
    });
    $(document).delegate('.deliverablebtn', 'click', function (e) {
        e.preventDefault();
        close_all_navi_msg();
        show_hide_nav_icn(0);
        nav_width = '390px';
        display_positionX = '15px';
        display_positionY = '15px';
        goto_customer_sheet_step_1 = view(temporary_message['customer_managementsheetnavi_1'], def_old_nav_template_custom_close);
    });
    $(document).delegate('.order_receive_body tr td[contenteditable=true]', 'keypress', function (e) {
        if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });
    $(document).delegate('.order_receive_body tr td[contenteditable=true]', 'blur', function () {
        var quantity = $(this).text();
        var field_type = $(this).attr('field_type');
        var order_type = $(this).attr('order_type');
        var vendor_item_id = $(this).closest('tr').attr('row_id');
        var order_point_case_quantity = $(this).closest('tr').find('td:nth-child(11)').text();
        var order_point_ball_quantity = $(this).closest('tr').find('td:nth-child(12)').text();
        var order_point_unit_quantity = $(this).closest('tr').find('td:nth-child(13)').text();
        var order_lot_case_quantity = $(this).closest('tr').find('td:nth-child(15)').text();
        var order_lot_ball_quantity = $(this).closest('tr').find('td:nth-child(16)').text();
        var order_lot_unit_quantity = $(this).closest('tr').find('td:nth-child(17)').text();
        var case_inputs = $(this).closest('tr').children('td').find('.case_law_qty').val();
        var ball_inputs = parseInt($(this).closest('tr').children('td').find('.bol_law_qty').val());
        var total_inventory = $(this).closest('tr').find('td.total_inventory_qty').text();
        total_inventory = parseInt(total_inventory);
        case_inputs = case_inputs ? case_inputs : 0
        ball_inputs = ball_inputs ? ball_inputs : 0
        case_inputs = parseInt(case_inputs);
        ball_inputs = parseInt(ball_inputs);
        order_point_case_quantity = parseInt((order_point_case_quantity == '' ? 0 : order_point_case_quantity));
        order_point_ball_quantity = parseInt((order_point_ball_quantity == '' ? 0 : order_point_ball_quantity));
        order_point_unit_quantity = parseInt((order_point_unit_quantity == '' ? 0 : order_point_unit_quantity));
        order_lot_case_quantity = parseInt((order_lot_case_quantity == '' ? 0 : order_lot_case_quantity));
        order_lot_ball_quantity = parseInt((order_lot_ball_quantity == '' ? 0 : order_lot_ball_quantity));
        order_lot_unit_quantity = parseInt((order_lot_unit_quantity == '' ? 0 : order_lot_unit_quantity));
        var rows_tr = $(this);
        console.log(total_inventory);
        var total_point_qty = 0;
        var total_lot_qty = 0;
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "update_receive_order_item_content",
            data: {
                vendor_item_id: vendor_item_id, field_type: field_type, order_type: order_type, quantity: quantity,
                order_point_case_quantity,
                order_point_ball_quantity,
                order_point_unit_quantity,
                order_lot_case_quantity,
                order_lot_ball_quantity,
                order_lot_unit_quantity
            },
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                total_point_qty = ((order_point_case_quantity * case_inputs) + (order_point_ball_quantity * ball_inputs) + parseInt(order_point_unit_quantity));
                rows_tr.closest('tr').find('td.total_order_point_inventory_qty').text(total_point_qty);
                color_class_td = (total_inventory < total_point_qty ? 'insufficant_quantity' : 'sufficant_quantity');//logic change by sacho
                rows_tr.closest('tr').find('td:nth-child(11)').removeClass('insufficant_quantity').removeClass('sufficant_quantity').addClass(color_class_td);
                rows_tr.closest('tr').find('td:nth-child(12)').removeClass('insufficant_quantity').removeClass('sufficant_quantity').addClass(color_class_td);
                rows_tr.closest('tr').find('td:nth-child(13)').removeClass('insufficant_quantity').removeClass('sufficant_quantity').addClass(color_class_td);
                rows_tr.closest('tr').removeClass('tr_insufficant_quantity').removeClass('tr_sufficant_quantity').addClass('tr_' + color_class_td);

                total_lot_qty = ((order_lot_case_quantity * case_inputs) + (order_lot_ball_quantity * ball_inputs) + parseInt(order_lot_unit_quantity));
                rows_tr.closest('tr').find('td.total_order_lot_inventory_qty').text(total_lot_qty);

                //var vendor_name = response.vendor_name;
                //get_vendor_list_item_by_vendor_id(0, '');
            }
        });

    });
    $(document).delegate('.receive_order_dflt_nav_btn', 'click', function () {
        close_all_navi_msg();
        show_hide_nav_icn(0);
        nav_width = '340px';
        display_positionX = '15px';
        display_positionY = '15px';
        receive_order_step_1_nav = view(temporary_message['yellow_item_order_notify'], def_center_mesg_template);
    });
    $(document).delegate('.place_yellow_item_order', 'click', function () {
        nav_list[receive_order_step_1_nav].hide();
        show_hide_nav_icn(0);
        nav_width = '300px';
        display_positionX = '15px';
        display_positionY = '15px';
        receive_order_step_2_nav = view(temporary_message['place_order_yellow_item_order_notify'], def_center_mesg_template);
    });
    $(document).delegate('.place_yellow_item_order_confirm', 'click', function () {
        nav_list[receive_order_step_2_nav].hide();
        show_hide_nav_icn(0);
        nav_width = '240px';
        display_positionX = '15px';
        display_positionY = '15px';
        receive_order_step_3_nav = view(temporary_message['place_order_yellow_item_order_confirmation'], def_center_mesg_template);
    });
    $(document).delegate('.place_yellow_item_order_done_action', 'click', function () {
        nav_list[receive_order_step_3_nav].hide();
        show_hide_nav_icn(0);
        nav_width = '340px';
        display_positionX = '15px';
        display_positionY = '15px';
        receive_order_step_4_nav = view(temporary_message['place_order_yellow_item_order_success'], def_center_mesg_template);
    });
    $(document).delegate('.place_yellow_item_order_success', 'click', function () {
        nav_list[receive_order_step_4_nav].hide();
        show_hide_nav_icn(0);
        nav_width = '370px';
        display_positionX = '15px';
        display_positionY = '15px';
        success_nav = view(temporary_message['place_order_yellow_item_order_success_done'], def_old_nav_template_without_return_btn);
    });
    $(document).delegate('.place_yellow_item_order_success_dones', 'click', function () {
        close_all_navi_msg();
        show_hide_nav_icn(1);
    });
    /*receive order nav flow*/
    $(document).delegate('.item_insert_navi', 'click', function () {
        nav_width = '340px';
        display_positionX = '550px';
        display_positionY = '15px';
        var add_instruction_nav = view(temporary_message['vendor_item_add_instruction'], def_left_list_mesg_template);
    });
    $(document).delegate(".vandor_ins_jancode", "keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });
    $(document).delegate(".jan_inpts", "keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });
    $(document).delegate(".jan_inpts", "blur", function (e) {

        var jancode = $(this).val();
        if (!isNumeric(jancode)) {
            if (jancode.length > 0) {
                jan_list_search_by_name_from_master(jancode)
            }
            return false;
        }
        var customer_id = $('.c_ids_v').val();
        var c_name = $('.jcs_main_hand_title').text();
        if (customer_id == 0) {
            const tempmsg = {
                exceed_overs_qty: {
                    message: [
                        {message: 'スーパーを選択してください。'}
                    ],
                    buttons: [{button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
                }
            }
            nav_width = '300px';
            display_positionX = '15px';
            display_positionY = '15px';
            error_nav = view(tempmsg['exceed_overs_qty'], def_center_mesg_template);
            show_hide_nav_icn(0);
            return false;
        }
        if (jancode != '') {
            /*
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                type: "POST",
                url: "get_customer_janinfo",
                data: { jancode: jancode, customer_id: customer_id },
                dataType: "JSON",
                success: function(response) {
                    var response = response.products_list;
                    console.log(response);
                    if (response == null) {
                        console.log('dddd');
                    }
                    if (response != null) {
                        $('.menual_order_tble').html('');
                        var j = 0;
                        var htmls = '';
                        htmls += '<tr>';
                        htmls += '<td class="pnames" rowspan="2" style="text-align: right; padding-right: 10px; padding-left: 10px;" nowrap><div class="productname text-left">' + response.name + '</div>' + response.jan + '</td>';
                        htmls += '<td customer_id="' + response.customer_id + '" customer_item_id="' + response.customer_item_id + '" jan="' + response.jan + '" class="gett_attr" style="text-align: left;">発注数</td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty"><input type="tel" field_type="ケース" class="form-control cmn_o_d_qty sum_of_o_qty c_o_d_qty" value=""></td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfordrqty"><input type="tel" field_type="ボール" class="form-control cmn_o_d_qty sum_of_o_qty b_o_d_qty" value=""></td>';
                        htmls += '<td style="border-right: 3px solid #ddd;" data_stock_total="" class="smOfordrqty"><input type="tel" field_type="バラ" class="form-control cmn_o_d_qty sum_of_o_qty u_o_d_qty" value=""></td>';

                        htmls += '</tr>';
                        htmls += '<tr class="next_row">';
                        htmls += '<td style="text-align: left;">確定</td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfcnfrmqty warning_custom"><input field_type="ケース" type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty stock_case_qty" value=""></td>';
                        htmls += '<td style="border-right: 1px solid #ddd;" data_stock_total="" class="smOfcnfrmqty warning_custom"><input field_type="ボール" type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty stock_ball_qty" value=""></td>';
                        htmls += '<td style="border-right: 3px solid #ddd;" data_stock_total="" class="smOfcnfrmqty warning_custom"><input field_type="バラ" type="tel" class="form-control cmn_o_d_qty sum_of_o_d_qty stock_unit_qty" value=""></td>';
                        htmls += '</tr>';

                        $(".menual_order_tble").html(htmls);
                    } else {
                        const tempmsgssss = {
                            exceed_over_qtysssss: {
                                message: [
                                    { message: jancode + 'の商品は、見つかりません。 ' }
                                ],
                                buttons: [{ button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>' }]
                            }
                        }
                        nav_width = '300px';
                        display_positionX = '15px';
                        display_positionY = '15px';
                        error_nav = view(tempmsgssss['exceed_over_qtysssss'], def_center_mesg_template);
                        show_hide_nav_icn(0);
                        console.log('fffff');
                    }
                }
            });
            */
            //$(this).val('');
            get_manual_order_item(customer_id, c_name);
        }
    });
    $(document).delegate(".goto_sheet_screen", "click", function (e) {
        e.preventDefault();
        var page_id = $(this).attr('data_goto');
        console.log(page_id);
        if (page_id == 1) {
            close_all_navi_msg();
            show_hide_nav_icn(0);
            nav_width = '390px';
            display_positionX = '15px';
            display_positionY = '15px';
            goto_vendor_sheet_step_1 = view(temporary_message['vendor_managementsheetnavi_1'], def_old_nav_template_custom_close);
        } else {
            close_all_navi_msg();
            show_hide_nav_icn(0);
            nav_width = '390px';
            display_positionX = '15px';
            display_positionY = '15px';
            goto_customer_sheet_step_1 = view(temporary_message['customer_managementsheetnavi_1'], def_old_nav_template_custom_close);
        }
    });
    $(document).delegate(".cmn_recv", "keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });
    $(document).delegate(".cmn_recv", "blur", function (e) {
        e.preventDefault();
        return false;
        var pname = '';
        var expire_date = '';
        var bin = '';
        var vendor_order_id = '';
        var vendor_order_detail_id = '';
        var vjcode = $(this).closest('tr').find('td:nth-child(21)').text();
        var vendor_item_id = $(this).closest('tr').attr('row_id');
        var vendor_id = $(this).closest('tr').attr('vendor_id');
        var c_quantity = $(this).val();
        var inputs_type = $(this).attr('data_inputs');
        var limit_order_qty = 0;
        if (inputs_type == 'ケース') {
            limit_order_qty = $(this).closest('tr').find('.haccu_case').text();
        } else if (inputs_type == 'ボール') {
            limit_order_qty = $(this).closest('tr').find('.haccu_ball').text();
        } else {
            limit_order_qty = $(this).closest('tr').find('.haccu_unit').text();
        }

        if (c_quantity > limit_order_qty) {
            $(this).val('');
            nav_width = '300px';
            display_positionX = '15px';
            display_positionY = '15px';
            error_nav = view(temporary_message['exceed_orderable_qty'], def_center_mesg_template);
            show_hide_nav_icn(0);
            return false;
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "vendor_arival_insert_web_receiveorder",
            type: "POST",
            dataType: "JSON",
            data: {
                jan_code: vjcode,
                pname: pname,
                c_quantity: c_quantity,
                expire_date: expire_date,
                bin: bin,
                vendor_id: vendor_id,
                vendor_item_id: vendor_item_id,
                vendor_order_id: vendor_order_id,
                vendor_order_detail_id: vendor_order_detail_id,
                inputs_type: inputs_type,
            },
            success: function (response) {
                console.log(response);
                window.location.reload(true);
            }
        })
    });


    $(document).delegate(".customer_ins_jancode", "keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });

    $(document).delegate(".recive_order_page_jn", "keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });

    $(document).delegate(".shipment_page_jn", "keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });
    $(document).delegate(".recive_order_page_jn", "blur", function (e) {
        e.preventDefault();
        var jan_code = $(this).val();
        sortTable_by_jan('order_receive_body', jan_code, 27);
        $(this).val('');
    });

    $(document).delegate(".shipment_page_jn", "blur", function (e) {
        e.preventDefault();
        var jan_code = $(this).val();
        sortTable_by_jan('order_shipment_body', jan_code, 20);
        $(this).val('');
    });


    $(document).delegate('.vendor_itemdata_table tr td[contenteditable=true],.edit_vendor_item', 'keypress', function (e) {

        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });

    function calculation_profit_pricing(filde_type, this_ele) {
        var cost_price = this_ele.closest('tr').children('td').find('.v_cost_price').val();
        var selling_price = this_ele.closest('tr').children('td').find('.v_selling_price').val();
        var gross_profit = this_ele.closest('tr').children('td').find('.v_gross_profit').val();
        var gross_profit_margin = this_ele.closest('tr').children('td').find('.v_gross_profit_margin').val();
        cost_price = cost_price.replace(',', "");
        selling_price = selling_price.replace(',', "");
        gross_profit = gross_profit.replace(',', "");
        gross_profit_margin = gross_profit_margin.replace(',', "");

        cost_price = parseFloat(cost_price);
        selling_price = parseFloat(selling_price);
        gross_profit = parseFloat(gross_profit);
        gross_profit_margin = parseFloat(gross_profit_margin);

        if (filde_type == 'cost_price') {
            cost_price = this_ele.val();
            cost_price = parseFloat(cost_price);
            if (selling_price == '0.00') {
                gross_profit_margin = 20;
                selling_price = cost_price + ((cost_price * gross_profit_margin) / 100);
                selling_price = parseFloat(selling_price);
                gross_profit = selling_price - cost_price;

                selling_price = selling_price.toFixed(2);
                cost_price = cost_price.toFixed(2);
            } else {
                if (gross_profit_margin > 0) {
                    selling_price = cost_price + ((cost_price * gross_profit_margin) / 100);
                    selling_price = parseFloat(selling_price);
                    gross_profit = selling_price - cost_price;
                    selling_price = selling_price.toFixed(2);
                    gross_profit = gross_profit.toFixed(2);
                    gross_profit_margin = gross_profit_margin.toFixed(2);
                    cost_price = cost_price.toFixed(2);
                } else {
                    show_hide_nav_icn(0);
                    nav_width = '400px';
                    display_positionX = '15px';
                    display_positionY = '15px';
                    error_nav = view(temporary_message['invalid_gross_profit_margin'], def_center_mesg_template);
                    this_ele.closest('tr').children('td').find('.v_selling_price').val('0.00');
                    this_ele.closest('tr').children('td').find('.v_gross_profit').val('0.00');
                    this_ele.closest('tr').children('td').find('.v_gross_profit_margin').val('0.00');
                    return false;
                }
            }
        } else if (filde_type == 'selling_price') {
            selling_price = this_ele.val();
            selling_price = parseFloat(selling_price);
            if (selling_price >= cost_price) {
                gross_profit = selling_price - cost_price;
                gross_profit_margin = (gross_profit * 100) / cost_price;
                gross_profit_margin = gross_profit_margin.toFixed(2);
                selling_price = selling_price.toFixed(2);
                gross_profit = gross_profit.toFixed(2);
                cost_price = cost_price.toFixed(2);
            } else {
                show_hide_nav_icn(0);
                nav_width = '400px';
                display_positionX = '15px';
                display_positionY = '15px';
                error_nav = view(temporary_message['invalid_selling_price'], def_center_mesg_template);
                this_ele.closest('tr').children('td').find('.v_selling_price').val('0.00');
                this_ele.closest('tr').children('td').find('.v_gross_profit').val('0.00');
                this_ele.closest('tr').children('td').find('.v_gross_profit_margin').val('0.00');
                return false;
            }
        } else if (filde_type == 'gross_profit') {
            gross_profit = this_ele.val();
            gross_profit = parseFloat(gross_profit);
            if (cost_price == '0.00') {
                show_hide_nav_icn(0);
                nav_width = '400px';
                display_positionX = '15px';
                display_positionY = '15px';
                error_nav = view(temporary_message['invalid_profit_amount'], def_center_mesg_template);
                this_ele.closest('tr').children('td').find('.v_gross_profit').val('0.00');
                return false;
            } else {
                selling_price = gross_profit + cost_price;
                gross_profit_margin = (gross_profit * 100) / cost_price;

                gross_profit_margin = parseFloat(gross_profit_margin);
                gross_profit_margin = gross_profit_margin.toFixed(2);
                selling_price = selling_price.toFixed(2);
                gross_profit = gross_profit.toFixed(2);
                cost_price = cost_price.toFixed(2);
            }
        } else if (filde_type == 'gross_profit_margin') {
            gross_profit_margin = this_ele.val();
            gross_profit_margin = parseFloat(gross_profit_margin);
            if (cost_price == '0.00') {
                show_hide_nav_icn(0);
                nav_width = '400px';
                display_positionX = '15px';
                display_positionY = '15px';
                error_nav = view(temporary_message['invalid_profit_amount'], def_center_mesg_template);
                this_ele.closest('tr').children('td').find('.v_gross_profit_margin').val('0.00');
                return false;
            } else {
                selling_price = cost_price + ((cost_price * gross_profit_margin) / 100);

                selling_price = parseFloat(selling_price);
                gross_profit = selling_price - cost_price;

                gross_profit = parseFloat(gross_profit);
                gross_profit = gross_profit.toFixed(2);
                selling_price = selling_price.toFixed(2);
                gross_profit_margin = gross_profit_margin.toFixed(2);
                cost_price = cost_price.toFixed(2);
            }
        }
        this_ele.closest('tr').children('td').find('.v_cost_price').val(cost_price);
        this_ele.closest('tr').children('td').find('.v_selling_price').val(selling_price);
        this_ele.closest('tr').children('td').find('.v_gross_profit').val(gross_profit);
        this_ele.closest('tr').children('td').find('.v_gross_profit_margin').val(gross_profit_margin);
    }

    $(document).delegate('.vendor_itemdata_table tr td[contenteditable=true],.edit_vendor_item', 'blur', function () {
        var this_ele = $(this);
        var filde_type = $(this).attr('data_field_type');


        if (filde_type == 'cost_price' || filde_type == 'selling_price' || filde_type == 'gross_profit' || filde_type == 'gross_profit_margin') {
            calculation_profit_pricing(filde_type, this_ele);
        }
        var product_name = $(this).closest('tr').find('td:nth-child(3)').text();
        var case_qty = $(this).closest('tr').find('.v_case_inputs').val();
        var ball_qty = $(this).closest('tr').find('.v_ball_inputs').val();
        var price = $(this).closest('tr').find('.v_cost_price').val();
        var selling_price = $(this).closest('tr').find('.v_selling_price').val();
        var gross_profit = $(this).closest('tr').find('.v_gross_profit').val();
        var gross_profit_margin = $(this).closest('tr').find('.v_gross_profit_margin').val();
        price = price.replace(',', "");
        selling_price = selling_price.replace(',', "");
        gross_profit = gross_profit.replace(',', "");
        gross_profit_margin = gross_profit_margin.replace(',', "");
        var vendor_item_id = $(this).closest('tr').attr('data-id');
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "update_vendor_master_item_content",
            data: {
                vendor_item_id: vendor_item_id,
                product_name: product_name,
                case_qty: case_qty,
                ball_qty: ball_qty,
                price: price,
                gross_profit_margin: gross_profit_margin,
                gross_profit: gross_profit,
                selling_price: selling_price
            },
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                //var vendor_name = response.vendor_name;
                //get_vendor_list_item_by_vendor_id(0, '');
                $('.digits_td').digits_td();
                $('.digits').digits();
            }
        });
    });

    $(document).delegate('.v_in_company_code', 'keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    })
    $(document).delegate('.v_in_company_code', 'blur', function () {
        var in_company_code = $(this).closest('tr').find('.v_in_company_code').val();
        var orginal_vl_code = $(this).closest('tr').find('.v_in_company_code').attr('data_current_vl');
        if (in_company_code == '') {
            return false;
        }
        if (in_company_code == orginal_vl_code) {
            return false;
        }
        var vendor_item_id = $(this).closest('tr').attr('data-id');
        var row_trs = $(this).closest('tr');
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "update_in_company_code",
            data: {vendor_item_id: vendor_item_id, in_company_code: in_company_code},
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                if (response.duplicate_company_code == 1) {
                    row_trs.find('.v_in_company_code').val('');
                    return false;
                }
                row_trs.find('.v_in_company_code').attr('data_current_vl', in_company_code);

            }
        });
    });

    $(document).delegate('.cmn_customer_pricing', 'keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    })
    $(document).delegate('.cmn_customer_pricing', 'blur', function () {
        var rows = $(this);
        var filde_type = $(this).attr('data_filed_type');
        customer_profit_pricing_calculation(filde_type, rows);
        var cost_price = $(this).closest('tr').find('.c_cost_price').val();
        var selling_price = $(this).closest('tr').find('.c_selling_price').val();
        var gross_profit = $(this).closest('tr').find('.c_gross_profit').val();
        var gross_profit_margin = $(this).closest('tr').find('.c_gross_profit_margin').val();
        // var cost_price = $(this).closest('tr').find('td:nth-child(8)').text();
        var jan = $(this).closest('tr').find('td:nth-child(12)').text();
        cost_price = cost_price.replace(',', "");
        selling_price = selling_price.replace(',', "");
        var customer_item_id = $(this).closest('tr').attr('data-id');

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "update_customer_master_item_content",
            data: {
                jan: jan,
                cost_price: cost_price,
                selling_price: selling_price,
                gross_profit: gross_profit,
                gross_profit_margin: gross_profit_margin
            },
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                $('.digits_td').digits_td();
                $('.digits').digits();
            }
        });
    });

    function customer_profit_pricing_calculation(filde_type, this_ele) {
        var cost_price = this_ele.closest('tr').children('td').find('.c_cost_price').val();
        var selling_price = this_ele.closest('tr').children('td').find('.c_selling_price').val();
        var gross_profit = this_ele.closest('tr').children('td').find('.c_gross_profit').val();
        var gross_profit_margin = this_ele.closest('tr').children('td').find('.c_gross_profit_margin').val();
        cost_price = cost_price.replace(',', "");
        selling_price = selling_price.replace(',', "");
        gross_profit = gross_profit.replace(',', "");
        gross_profit_margin = gross_profit_margin.replace(',', "");

        cost_price = parseFloat(cost_price);
        selling_price = parseFloat(selling_price);
        gross_profit = parseFloat(gross_profit);
        gross_profit_margin = parseFloat(gross_profit_margin);

        if (filde_type == 'selling_price') {
            selling_price = this_ele.val();
            selling_price = parseFloat(selling_price);
            if (selling_price >= cost_price) {
                gross_profit = selling_price - cost_price;
                gross_profit_margin = (gross_profit * 100) / cost_price;
                gross_profit_margin = gross_profit_margin.toFixed(2);
                selling_price = selling_price.toFixed(2);
                gross_profit = gross_profit.toFixed(2);
                cost_price = cost_price.toFixed(2);
            } else {
                show_hide_nav_icn(0);
                nav_width = '400px';
                display_positionX = '15px';
                display_positionY = '15px';
                error_nav = view(temporary_message['invalid_selling_price'], def_center_mesg_template);
                this_ele.closest('tr').children('td').find('.c_selling_price').val('0.00');
                this_ele.closest('tr').children('td').find('.c_gross_profit').val('0.00');
                this_ele.closest('tr').children('td').find('.c_gross_profit_margin').val('0.00');
                return false;
            }
        } else if (filde_type == 'cost_price') {
            gross_profit = (cost_price * gross_profit_margin) / 100;
            gross_profit = gross_profit.toFixed(2);
            selling_price = parseFloat(gross_profit) + parseFloat(cost_price);
            selling_price = selling_price.toFixed(2);

        } else if (filde_type == 'gross_profit') {
            gross_profit = this_ele.val();
            gross_profit = parseFloat(gross_profit);
            if (cost_price == '0.00') {
                show_hide_nav_icn(0);
                nav_width = '400px';
                display_positionX = '15px';
                display_positionY = '15px';
                error_nav = view(temporary_message['invalid_profit_amount'], def_center_mesg_template);
                this_ele.closest('tr').children('td').find('.c_gross_profit').val('0.00');
                return false;
            } else {
                selling_price = gross_profit + cost_price;
                gross_profit_margin = (gross_profit * 100) / cost_price;

                gross_profit_margin = parseFloat(gross_profit_margin);
                gross_profit_margin = gross_profit_margin.toFixed(2);
                selling_price = selling_price.toFixed(2);
                gross_profit = gross_profit.toFixed(2);
                cost_price = cost_price.toFixed(2);
            }
        } else if (filde_type == 'gross_profit_margin') {
            gross_profit_margin = this_ele.val();
            gross_profit_margin = parseFloat(gross_profit_margin);
            if (cost_price == '0.00') {
                show_hide_nav_icn(0);
                nav_width = '400px';
                display_positionX = '15px';
                display_positionY = '15px';
                error_nav = view(temporary_message['invalid_profit_amount'], def_center_mesg_template);
                this_ele.closest('tr').children('td').find('.c_gross_profit_margin').val('0.00');
                return false;
            } else {
                selling_price = cost_price + ((cost_price * gross_profit_margin) / 100);

                selling_price = parseFloat(selling_price);
                gross_profit = selling_price - cost_price;

                gross_profit = parseFloat(gross_profit);
                gross_profit = gross_profit.toFixed(2);
                selling_price = selling_price.toFixed(2);
                gross_profit_margin = gross_profit_margin.toFixed(2);
                cost_price = cost_price.toFixed(2);
            }
        }
        this_ele.closest('tr').children('td').find('.c_selling_price').val(selling_price);
        this_ele.closest('tr').children('td').find('.c_gross_profit').val(gross_profit);
        this_ele.closest('tr').children('td').find('.c_gross_profit_margin').val(gross_profit_margin);
    }

    $(document).delegate('.search_by_in_company_code', 'keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    })
    $(document).delegate('.search_by_in_company_code', 'blur', function () {
        var in_company_code = $(this).val();
        if (in_company_code == '') {
            return false;
        }
        close_all_navi_msg();
        show_hide_nav_icn(0);
        show_hide_nav_icn(1);
        sortTable_by_incompany_code('vendor_itemdata_table', in_company_code, 11);
        $(this).val('');
        return false;
    })

    $(document).delegate('.vandor_ins_jancode', 'blur', function () {
        var jan_code = $(this).val();
        $(this).prop('disabled', true);
        if (jan_code == '') {
            $('.vandor_ins_jancode').prop('disabled', false);
            return false;
        }
        var vendor_id = $('.v_ids_v').val();
        var urls = url_search();
        var is_special = (urls == 'special_master_item' ? '1' : '0');
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "get_jan_info",
            data: {jan_code: jan_code, vendor_id: vendor_id},
            dataType: "JSON",
            success: function (response) {
                close_all_navi_msg();
                show_hide_nav_icn(0);
                $('.vandor_ins_jancode').val('');
                var api_response = response.api_data;
                var data_resource = response.data_resource;
                if (api_response == 'invalid_jan_code') {
                    nav_width = '300px';
                    display_positionX = '15px';
                    display_positionY = '15px';
                    error_nav = view(temporary_message['invalid_jan_code'], def_center_mesg_template);
                    $('.vandor_ins_jancode').prop('disabled', false);
                } else {
                    if (response.vendor_item_data == 1) {
                        // var rows = $('.vendor_itemdata_table tr').filter(function() {
                        //     $(this).toggle($(this).find('td:nth-child(12)').text().indexOf(jan_code) > -1);
                        //     return $(this).find('td:nth-child(12)').text().indexOf(jan_code) > -1;
                        // });
                        // show_hide_nav_icn(1);
                        sortTable_by_jan('vendor_itemdata_table', jan_code, 13);
                        const temp_message = {

                            vendor_item_add_success: {
                                message: [
                                    {message: 'この商品 ' + jan_code + ' は、すでに登録されています 。 '},
                                ],
                                buttons: [
                                    {button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}
                                ]
                            },
                        }
                        error_nav = view(temp_message['vendor_item_add_success'], def_center_mesg_template);
                        $('.vandor_ins_jancode').prop('disabled', false);
                        return false;
                    }

                    var item_name = api_response.name;
                    var case_qty = 0;
                    var ball_qty = 0;
                    var api_maker_name = '';
                    if (data_resource == 'database') {
                        case_qty = api_response.case_inputs;
                        ball_qty = api_response.ball_inputs;
                    } else if (data_resource == 'api') {
                        api_maker_name = api_response.maker_name;
                    }
                    vendor_id = response.vendor_id;
                    var maker_id = response.maker_id;
                    var price = (is_special == 0 ? 100 : 80);
                    /*insert auto vendor item*/
                    var order_point_unit = 'ケース';
                    var order_point_quantity = 1;
                    var order_lot_unit = 'ケース';
                    var order_lot_quantity = 0;
                    var vendor_item_id = null;
                    var sale_price = 0;
                    var basic_start_date = '2020-01-01';
                    var basic_end_date = '2021-12-31';
                    var sale_start_date = '2020-01-01';
                    var sale_end_date = '2021-12-31';
                    //maker id added for new realtions
                    data = {
                        maker_id: maker_id,
                        vendor_id: vendor_id,
                        jan_code: jan_code,
                        item_name: item_name,
                        case_qty: case_qty,
                        ball_qty: ball_qty,
                        price: price,
                        vendor_item_id: vendor_item_id,
                        order_point_unit: order_point_unit,
                        order_point_quantity: order_point_quantity,
                        order_lot_unit: order_lot_unit,
                        order_lot_quantity: order_lot_quantity,
                        sale_price: sale_price,
                        basic_start_date: basic_start_date,
                        basic_end_date: basic_end_date,
                        sale_start_date: sale_start_date,
                        sale_end_date: sale_end_date,
                        api_maker_name: api_maker_name,
                        is_special: is_special,
                    }
                    $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        },
                        type: "POST",
                        url: "add_vendor_item",
                        data: data,
                        dataType: "JSON",
                        success: function (response) {
                            $('.vandor_ins_jancode').prop('disabled', false);
                            var message_id = 'vendor_message';
                            var ms_message = response.message;
                            if (ms_message == "insert_success") {
                                const temp_message = {

                                    vendor_item_add_success: {
                                        message: [
                                            {message: 'この商品 ' + jan_code + ' は、メーカー（仕入先）判別ができました。仕入先を自動で登録しました。 '},
                                        ],
                                        buttons: [
                                            {button: '<center><button class="btn btn-primary vendor_list_show_popup">仕入先別</button></center>'}
                                        ]
                                    },
                                }
                                if (vendor_id != 0) {
                                    temp_vendor_insert_status = 0;
                                    success_nav = view(temp_message['vendor_item_add_success'], def_center_mesg_template);
                                } else {
                                    temp_vendor_insert_status = 1;
                                    $('.v_ids_v').attr('is_new_item', 1);
                                    error_nav = view(temporary_message['select_a_vendor_to_add_item'], def_center_mesg_template);
                                }

                            } else if (ms_message == "update_success") {
                                success_nav = view(temporary_message['vendor_item_add_update'], def_center_mesg_template);
                            } else {
                                error_message(message_id, 'alert-danger', ms_message)
                                const temps_message = {

                                    vendor_item_add_error: {
                                        message: [
                                            {message: ms_message},
                                        ],
                                        buttons: [
                                            {button: '<center><a href="javascript:close_default_page_navi(101)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}
                                        ]
                                    },
                                }
                                success_nav = view(temps_message['vendor_item_add_error'], def_center_mesg_template);
                            }
                            //var vendor_name = response.vendor_name;
                            // get_vendor_list_item_by_vendor_id(0, '');
                            get_vendor_master_item_list();
                        }
                    });
                    /*insert auto vendor item*/


                }
                console.log(response);
            }
        });
        // nav_width = '340px';
        // display_positionX = '550px';
        // display_positionY = '15px';
        // var add_instruction_nav = view(temporary_message['vendor_item_add_instruction'], def_left_list_mesg_template);
    });

    $(document).delegate('.customer_ins_jancode', 'blur', function () {
        var jan_code = $(this).val();

        if (jan_code == '') {
            return false;
        }
        var customer_id = $('.c_ids_v').val();
        var c_name = $('.supplier_name_input').val();

        if (customer_id == 0) {
            show_hide_nav_icn(0);
            error_nav = view(temporary_message['customer_id_select_required'], def_center_mesg_template);
            return false;
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "get_jan_info",
            data: {jan_code: jan_code},
            dataType: "JSON",
            success: function (response) {
                close_all_navi_msg();
                show_hide_nav_icn(0);
                $('.customer_ins_jancode').val('');
                var api_response = response.api_data;
                var data_resource = response.data_resource;
                if (api_response == 'invalid_jan_code') {
                    nav_width = '300px';
                    display_positionX = '15px';
                    display_positionY = '15px';
                    error_nav = view(temporary_message['invalid_jan_code'], def_center_mesg_template);
                } else {
                    if (response.vendor_item_data == 1 && data_resource == 'database') {
                        var item_name = api_response.name;
                        var case_qty = api_response.case_inputs;
                        var ball_qty = api_response.ball_inputs;
                        var vendor_id = response.vendor_id;
                        var sale_price = 0;
                        data = {
                            vendor_id: vendor_id,
                            customer_id: customer_id,
                            jan_code: jan_code,
                            item_name: item_name,
                            case_qty: case_qty,
                            ball_qty: ball_qty,
                            sale_price: sale_price,
                        }
                        $.ajax({
                            headers: {
                                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                            },
                            type: "POST",
                            url: "add_customer_item_data_by_jan",
                            data: data,
                            dataType: "JSON",
                            success: function (response) {
                                var message_id = 'vendor_message';
                                var ms_message = response.message;
                                if (ms_message == "insert_success") {
                                    console.log('insert success');
                                    show_hide_nav_icn(1);
                                    view_customer_master_by_customer_id(customer_id, c_name);
                                } else if (ms_message == "update_success") {
                                    // var rows = $('.customer_item_table_body tr').filter(function() {
                                    //     $(this).toggle($(this).find('td:nth-child(12)').text().indexOf(jan_code) > -1);
                                    //     return $(this).find('td:nth-child(12)').text().indexOf(jan_code) > -1;
                                    // });
                                    show_hide_nav_icn(1);
                                    sortTable_by_jan('customer_item_table_body', jan_code, 11);
                                } else {
                                    error_message(message_id, 'alert-danger', ms_message)
                                    const temps_message = {

                                        vendor_item_add_error: {
                                            message: [
                                                {message: ms_message},
                                            ],
                                            buttons: [
                                                {button: '<center><a href="javascript:close_default_page_navi(404)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}
                                            ]
                                        },
                                    }
                                    success_nav = view(temps_message['vendor_item_add_error'], def_center_mesg_template);
                                }
                                //var vendor_name = response.vendor_name;

                            }
                        });
                        /*insert auto customer item*/
                        return false;
                    } else {
                        nav_width = '300px';
                        display_positionX = '15px';
                        display_positionY = '15px';
                        error_nav = view(temporary_message['invalid_jan_code'], def_center_mesg_template);
                    }

                }
                console.log(response);
            }
        });
        // nav_width = '340px';
        // display_positionX = '550px';
        // display_positionY = '15px';
        // var add_instruction_nav = view(temporary_message['vendor_item_add_instruction'], def_left_list_mesg_template);
    });

    $(document).delegate('.deletes_customer_item', 'click', function () {
        $('.customer_item_table_body').find('tr').addClass('delete_customer_items_data');
        close_all_navi_msg();
        show_hide_nav_icn(0);
        delete_item_nav = view(temporary_message['customer_item_delete_notify'], def_left_list_mesg_template);
    });
    $(document).delegate('.cancel_customer_item_deletion', 'click', function () {
        $('.customer_item_table_body').find('tr').removeClass('delete_customer_items_data');
        $('.customer_item_table_body').find('tr').removeClass('selected_row_tr');
        close_all_navi_msg();
        show_hide_nav_icn(1);
    })
    $(document).delegate('.delete_customer_items_data', 'click', function () {
        $(this).addClass('selected_row_tr');
        nav_list[delete_item_nav].hide();
        show_hide_nav_icn(0);
        var td_p_name = $(this).find('td:nth-child(3)').text();
        var customer_item_id = $(this).attr('data-id');
        const customer_item_delete_msg = {

            customer_item_delete_final: {
                message: [
                    {message: '「' + td_p_name + '」を削除しますか？ '},
                ],
                buttons: [
                    {button: '<center><button data_p_name="' + td_p_name + '" data_c_item_id="' + customer_item_id + '" class="btn btn-primary cmn_dft_dgn delete_customer_data_id">削除</button><button type="button" class="btn btn-danger cmn_dft_dgn cancel_customer_item_deletion btn-sm">戻る</button></center>'}
                ]
            },
        }
        delete_item_delete_final = view(customer_item_delete_msg['customer_item_delete_final'], def_center_mesg_template);
        $('.customer_item_table_body').find('tr').removeClass('delete_customer_items_data');
    })
    /*eidit receive*/
    $(document).delegate('.update_order_received', 'click', function () {
        $('.order_receive_body').find('tr').addClass('edit_receive_order_items_data');
        var message = [{message: '修正する商品を選択してください'}];
        var buttons = [{buttons: '<button type="button" id="close_success_error_navi" class="btn btn-info cmn_dft_dgn btn-sm">確認</button>'}, {buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn cancel_receive_order_edition btn-sm">キャンセル</button>'}]
        show_hide_default_navigation(0, 0);
        success_error_confirmation_popup(message, buttons);
    });

    $(document).delegate('.edit_receive_order_items_data', 'click', function (event) {
        var td_p_name = $(this).find('td:nth-child(1)').text();
        var row_id = $(this).find('input:first').val();
        var order_point_unit = $(this).find('td:nth-child(12)').text();
        var order_point_quantity = $(this).find('td:nth-child(13)').text();
        var order_lot_unit = $(this).find('td:nth-child(14)').text();
        var order_lot_quantity = $(this).find('td:nth-child(15)').text();
        $(this).find('td:nth-child(12)').html('<select class="form-control" id="order_point_unit" name="order_point_unit"><option value="ケース">ケース</option><option value="ボール">ボール</option><option value="バラ">バラ</option></select>');
        $(this).find('td:nth-child(13)').html('<input type="tel" class="form-control text-right common_price order_point_quantity" id="o_p_q" name="order_point_quantity" value="' + order_point_quantity + '">');
        $(this).find('td:nth-child(14)').html('<select class="form-control" id="order_lot_unit" name="order_point_unit"><option value="ケース">ケース</option><option value="ボール">ボール</option><option value="バラ">バラ</option></select>');
        $(this).find('td:nth-child(15)').html('<input type="tel" class="form-control text-right common_price order_lot_quantity" id="o_l_q" name="order_lot_quantity" value="' + order_lot_quantity + '">');

        if (order_point_unit != '') {
            $('#order_point_unit').val(order_point_unit);
            $('#order_point_unit').prop('selected', true);
        }
        if (order_lot_unit != '') {
            $('#order_lot_unit').val(order_lot_unit);
            $('#order_lot_unit').prop('selected', true);
        }
        var message = [{message: '商品修正：完了を押すと更新されます。'}];
        var buttons = [{buttons: '<button type="button" data_p_name="' + td_p_name + '" data_r_item_id="' + row_id + '" class="btn btn-info cmn_dft_dgn update_order_lot_info btn-sm">完了</button>'}, {buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn cancel_receive_order_edition btn-sm">いいえ</button>'}]
        editablebg_modal(message, buttons);
        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        show_hide_default_navigation(0, 0);
        $('.order_receive_body').find('tr').removeClass('edit_receive_order_items_data');
    });
    $(document).delegate('.cancel_receive_order_edition', 'click', function () {
        var c_edit_lenght = $('#order_point_unit').length;
        console.log(c_edit_lenght);
        if (c_edit_lenght >= 1) {
            var order_point_unit = $('#order_point_unit').val();
            var order_point_quantity = $('#o_p_q').val();
            var order_lot_unit = $('#order_lot_unit').val();
            var order_lot_quantity = $('#o_l_q').val();
            var updated_tr_row = $('#order_point_unit').closest('tr');
            updated_tr_row.children('td:nth-child(12)').text(order_point_unit);
            updated_tr_row.children('td:nth-child(13)').text(order_point_quantity);
            updated_tr_row.closest('tr').children('td:nth-child(14)').text(order_lot_unit);
            updated_tr_row.closest('tr').children('td:nth-child(15)').text(order_lot_quantity);
        }

        $('.order_receive_body').find('tr').removeClass('edit_receive_order_items_data');

        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        $('#editablebg_modal').removeClass('show').addClass('hide');
        show_hide_default_navigation(1, 0);
    })
    /*eidit receive*/
    /*edit star*/
    $(document).delegate('.edits_customer_item', 'click', function () {
        $('.customer_item_table_body').find('tr').addClass('edit_customer_items_data');
        var message = [{message: '修正する商品を選択してください'}];
        var buttons = [{buttons: '<button type="button" id="close_success_error_navi" class="btn btn-info cmn_dft_dgn btn-sm">確認</button>'}, {buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn cancel_customer_item_edition btn-sm">キャンセル</button>'}]
        show_hide_default_navigation(0, 0);
        success_error_confirmation_popup(message, buttons);
    });
    $(document).delegate('.edit_customer_items_data', 'click', function () {
        $(this).addClass('active_edit');
        var td_p_name = $(this).find('td:nth-child(5)').text();
        var basic_selling_price = $(this).find('td:nth-child(9)').attr('data_basic_selling_price');
        var sale_selling_price = $(this).find('td:nth-child(9)').attr('data_sale_selling_price');

        var cost_price = $(this).find('td:nth-child(6)').text();
        basic_selling_price = parseInt(basic_selling_price);
        sale_selling_price = parseInt(sale_selling_price);
        var customer_item_id = $(this).attr('customer_item_id');
        var basic_sh_hi = '';
        var sale_sh_hi = '';
        if ($('.customer_basic_sale_mode_sale_price').is(':checked')) {
            basic_sh_hi = 'show';
            sale_sh_hi = 'hide';
        } else {
            basic_sh_hi = 'hide';
            sale_sh_hi = 'show';
        }


        $(this).find('td:nth-child(9)').html('<input type="number" class="form-control common_price selling_price ' + basic_sh_hi + '" id="c_selling_price" name="c_selling_price" value="' + basic_selling_price + '"><input type="number" class="form-control common_price sale_selling_price ' + sale_sh_hi + '" id="sale_c_selling_price" name="sale_c_selling_price" value="' + sale_selling_price + '">');
        var message = [{message: '商品修正：完了を押すと更新されます。'}];
        var buttons = [{buttons: '<button type="button" data_p_name="' + td_p_name + '" data_c_item_id="' + customer_item_id + '" class="btn btn-info cmn_dft_dgn update_customer_item_data_inline_by_id btn-sm">完了</button>'}, {buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn cancel_customer_item_edition btn-sm">いいえ</button>'}]
        editablebg_modal(message, buttons);
        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        show_hide_default_navigation(0, 0);
        $('.customer_item_table_body').find('tr').removeClass('edit_customer_items_data');
    })
    $(document).delegate('.cancel_customer_item_edition', 'click', function () {
        var c_edit_lenght = $('.selling_price').length;
        console.log(c_edit_lenght);
        if (c_edit_lenght >= 1) {

            var basic_saleing_price = $('.selling_price').closest('td').attr('data_basic_selling_price');
            var sale_saleing_price = $('.selling_price').closest('td').attr('data_sale_selling_price');
            var item_id = $('.selling_price').closest('tr').attr('customer_item_id');
            if ($('.customer_basic_sale_mode_sale_price').is(':checked')) {
                var price = basic_saleing_price;
            } else {
                var price = sale_saleing_price;
            }
            console.log(item_id);
            var row = $('tr[customer_item_id="' + item_id + '"]');
            row.find('td:nth-child(9)').html('');
            row.find('td:nth-child(9)').text(price);
        }

        $('.customer_item_table_body').find('tr').removeClass('edit_customer_items_data');
        $('.customer_item_table_body').find('tr').removeClass('active_edit');

        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        $('#editablebg_modal').removeClass('show').addClass('hide');
        show_hide_default_navigation(1, 0);
    })
    $(document).delegate('.update_customer_item_data_inline_by_id', 'click', function (event) {
        var customer_item_id = $('.selling_price').closest('tr').attr('customer_item_id');
        var item_id = $(this).attr('data_c_item_id');
        var row = $('tr[customer_item_id="' + item_id + '"]');
        var basic_selling_price = $('.selling_price').val();
        var sale_selling_price = $('.sale_selling_price').val();
        basic_selling_price = parseInt(basic_selling_price);
        sale_selling_price = parseInt(sale_selling_price);

        var data_vl = {
            item_id: item_id,
            sale_selling_price: sale_selling_price,
            basic_selling_price: basic_selling_price
        };
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "update_customer_item_by_customer_item_id",
            data: data_vl,
            dataType: "JSON",
            success: function (response) {
                //$('#myModal').modal('hide');
                $('#editablebg_modal').removeClass('show').addClass('hide');
                if ($('.customer_basic_sale_mode_sale_price').is(':checked')) {
                    row.find('td:nth-child(9)').text(basic_selling_price);
                } else {
                    row.find('td:nth-child(9)').text(sale_selling_price);
                }
                row.find('td:nth-child(9)').attr('data_sale_selling_price', sale_selling_price);
                row.find('td:nth-child(9)').attr('data_basic_selling_price', basic_selling_price);
                $('.customer_item_table_body').find('tr').removeClass('active_edit');
                var message = [{message: '修正が完了しました。'}];
                var buttons = [{buttons: '<button type="button" class="btn btn-info edits_customer_item cmn_dft_dgn btn-sm">商品選択</button>'}, {buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn cancel_customer_item_edition btn-sm">終了</button>'}]
                success_error_confirmation_popup(message, buttons);

            }
        });

    });
    /*customer_item edit delete*/
    $(document).delegate('.custom-combobox-input', 'change', function () {
        var vl = $(this).val();
        if (vl == '') {
            $('#customer_item_name').val('');
            $('#c_qty').val('');
            $('#b_qty').val('');
            $('#c_price').val('');
        }
    });
    $(document).delegate('.edits_vendor_item', 'click', function () {
        var btn_status = $(this).attr('vendor_item_edit_enable');
        var btn_text = $(this).text();
        if (btn_status == 0) {

            var nummrows = $('.row_case_qty').length;
            if (nummrows >= 1 && btn_text == '完了') {
                var vendor_id = $('.v_ids_v').val();
                var vendor_name = $('.vendor_list_show').text();
                var vendor_item_id = $('.row_case_qty').closest('tr').attr('data-id');
                var td_jan = $('.row_case_qty').closest('tr').find('td:nth-child(3)').text();
                var td_case = $('.row_case_qty').closest('tr').find('.row_case_qty').val();
                var row_p_name = $('.row_case_qty').closest('tr').find('.row_p_name').val();
                var td_ball = $('.row_case_qty').closest('tr').find('.row_ball_qty').val();
                var td_basic_cost_price = $('.row_case_qty').closest('tr').find('.row_basic_cost_price').val();
                var td_sale_cost_price = $('.row_case_qty').closest('tr').find('.row_sale_cost_price').val();
                var td_basic_start_date = $('.row_case_qty').closest('tr').find('.row_basic_start_date').val();
                var td_basic_end_date = $('.row_case_qty').closest('tr').find('.row_basic_end_date').val();
                var td_sale_start_date = $('.row_case_qty').closest('tr').find('.row_sale_start_date').val();
                var td_sale_end_date = $('.row_case_qty').closest('tr').find('.row_sale_end_date').val();
                var data_vl = {
                    vendor_item_id: vendor_item_id,
                    jan_code: td_jan,
                    price: td_basic_cost_price,
                    sale_price: td_sale_cost_price,
                    start_date: td_basic_start_date,
                    end_date: td_basic_end_date,
                    sale_start_date: td_sale_start_date,
                    sale_end_date: td_sale_end_date,
                    case_qty: td_case,
                    ball_qty: td_ball,
                    item_name: row_p_name
                };
                console.log(data_vl);
                $.ajax({
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                    },
                    type: "POST",
                    url: "update_vendor_item_by_vendor_item_id",
                    data: data_vl,
                    dataType: "JSON",
                    success: function (response) {
                        //$('#myModal').modal('hide');
                        $('#editablebg_modal').removeClass('show').addClass('hide');
                        var row = $('tr[data-id="' + vendor_item_id + '"]');
                        row.find('td:nth-child(4)').html('');
                        row.find('td:nth-child(5)').html('');
                        row.find('td:nth-child(6)').html('');
                        row.find('td:nth-child(7)').html('');
                        row.find('td:nth-child(8)').html('');
                        row.find('td:nth-child(9)').html('');

                        row.find('td:nth-child(4)').text(row_p_name);
                        row.find('td:nth-child(5)').text(td_case);
                        row.find('td:nth-child(6)').text(td_ball);


                        row.find('td:nth-child(7)').attr('basic_cost_price_val', td_basic_cost_price);
                        row.find('td:nth-child(8)').attr('basic_start_date_val', td_basic_start_date);
                        row.find('td:nth-child(9)').attr('basic_end_date_val', td_basic_end_date);
                        row.find('td:nth-child(7)').attr('sale_cost_price_val', td_sale_cost_price);
                        row.find('td:nth-child(8)').attr('sale_start_date_val', td_sale_start_date);
                        row.find('td:nth-child(9)').attr('sale_end_date_val', td_sale_end_date);
                        if ($('.basic_sale_mode').is(':checked')) {
                            row.find('td:nth-child(7)').text(td_basic_cost_price);
                            row.find('td:nth-child(8)').text(td_basic_start_date);
                            row.find('td:nth-child(9)').text(td_basic_end_date);
                        } else {
                            row.find('td:nth-child(7)').text(td_sale_cost_price);
                            row.find('td:nth-child(8)').text(td_sale_start_date);
                            row.find('td:nth-child(9)').text(td_sale_end_date);
                        }

                        var message = [{message: '修正が完了しました。'}];
                        var buttons = [{buttons: '<button type="button" vendor_item_edit_enable="0" class="btn btn-info edits_vendor_item cmn_dft_dgn btn-sm">商品選択</button>'}, {buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn cancel_edition btn-sm">終了</button>'}]
                        success_error_confirmation_popup(message, buttons);
                        /*if(vendor_id==0){
                            location.reload();
                        }else{
                            $('.edits_vendor_item').prop('disabled', false);
                            $('.add_new_item').prop('disabled', false);
                            $('.deletes_vendor_item').prop('disabled', false);
                            get_vendor_list_item_by_vendor_id(vendor_id, vendor_name);
                        }
                        */
                    }
                });
            } else if (nummrows >= 0 && btn_text == '修正中') {
                //error_message('flash_message', 'alert-danger', 'please click to product add button');
                console.log('cancel ed');
                $('.cancel_edition').trigger('click');
                return false;
            } else {
                console.log('cancel eddddd');
                $('.edits_vendor_item').prop('disabled', false);
                $('.add_new_item').prop('disabled', true);
                $('.deletes_vendor_item').prop('disabled', true);
                $('#navigation_message').removeClass('show').addClass('hide');
                $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
                $('#navi_icons').removeClass('show').addClass('hide');
                $(this).text('修正中');
                $(this).attr('vendor_item_edit_enable', 1);
                $('.vendor_item_edit_delete_inline').attr('data_action_status', 1);
                $('.deletes_vendor_item').attr('vendor_item_delete_enable', 0);
                //error_message('flash_message', 'alert-danger', '修正する商品を選択してください。');
                var message = [{message: '修正する商品を選択してください。'}];
                var buttons = [{buttons: '<button type="button" id="close_success_error_navi" class="btn btn-info cmn_dft_dgn btn-sm">確認</button>'}, {buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn cancel_edition btn-sm">キャンセル</button>'}]
                success_error_confirmation_popup(message, buttons);
                return false;
            }


        } else {
            // $('.edits_vendor_item').prop('disabled', false);
            // $('.add_new_item').prop('disabled', false);
            // $('.deletes_vendor_item').prop('disabled', false);
            // $(this).text('修正');
            // $('#navigation_message').removeClass('show').addClass('hide');
            // $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
            // $('.vendor_item_edit_delete_inline').attr('data_action_status',0);
            // $(this).attr('vendor_item_edit_enable',0);
            $('.cancel_edition').trigger('click');
        }
    })
    $(document).delegate('.deletes_vendor_item', 'click', function () {
        close_all_navi_msg();
        show_hide_nav_icn(0);
        $(this).attr('vendor_item_delete_enable', 1);
        $('.vendor_item_edit_delete_inline').attr('data_action_status', 2);
        $('.edits_vendor_item').attr('vendor_item_edit_enable', 0);
        nav_width = '300px';
        display_positionX = '15px';
        display_positionY = '15px';
        delete_item_nav = view(temporary_message['vendor_item_delete_notify'], def_left_list_mesg_template);
        $('.edits_vendor_item').prop('disabled', true);
        $('.add_new_item').prop('disabled', true);
        $('.deletes_vendor_item').prop('disabled', false);

    })
    $(document).delegate('#close_all_navi', 'click', function (e) {
        e.preventDefault();
        nav_list[delete_item_nav].hide();
    })
    $(document).delegate('.cancel_vendor_item_deletion', 'click', function (e) {
        e.preventDefault();
        nav_list[delete_item_delete_final].hide();
        $('.vendor_item_edit_delete_inline').attr('data_action_status', 0);
        $('.vendor_item_edit_delete_inline').removeClass('selected_row_tr');
        $('#nav_icon').css('opacity', 1);
    })
    $(document).delegate('.vendor_item_deletion_success', 'click', function (e) {
        e.preventDefault();
        nav_list[delete_item_delete_success].hide();
        $('#nav_icon').css('opacity', 1);
    });
    $(document).delegate('.customer_item_deletion_success', 'click', function (e) {
        e.preventDefault();
        nav_list[delete_item_delete_success].hide();
        $('#nav_icon').css('opacity', 1);
    });
    $(document).delegate(".vendor_item_edit_delete_inline", "click", function (e) {
        e.preventDefault();
        //if 0=nothing;1=edit;2=delete
        var edit_delete_status = $(this).attr('data_action_status');
        var vendor_item_id = $(this).attr('data-id');
        var vendor_id = $(this).attr('vendor-id');
        $('.vendor_item_edit_delete_inline').attr('data_action_status', 0);
        $('.deletes_vendor_item').attr('vendor_item_delete_enable', 0);
        $('.edits_vendor_item').attr('vendor_item_edit_enable', 0);
        if (edit_delete_status == 1) {
            $('.add_new_item').prop('disabled', true);
            $('.deletes_vendor_item').prop('disabled', true);
            var basic_show_hide_cls = '';
            var sale_show_hide_cls = '';
            if ($('.basic_sale_mode').is(':checked')) {
                basic_show_hide_cls = 'show';
                sale_show_hide_cls = 'hide';
            } else {
                basic_show_hide_cls = 'hide';
                sale_show_hide_cls = 'show';
            }
            var td_p_name = $(this).find('td:nth-child(4)').text();
            var td_case = $(this).find('td:nth-child(5)').text();
            var td_ball = $(this).find('td:nth-child(6)').text();
            var td_basic_cost_price = $(this).find('td:nth-child(7)').attr('basic_cost_price_val');
            var td_basic_start_date = $(this).find('td:nth-child(8)').attr('basic_start_date_val');
            var td_basic_end_date = $(this).find('td:nth-child(9)').attr('basic_end_date_val');
            var td_sale_cost_price = $(this).find('td:nth-child(7)').attr('sale_cost_price_val');
            var td_sale_start_date = $(this).find('td:nth-child(8)').attr('sale_start_date_val');
            var td_sale_end_date = $(this).find('td:nth-child(9)').attr('sale_end_date_val');
            $(this).find('td:nth-child(4)').html('<input type="tel" class="form-control row_p_name" value="' + td_p_name + '">');
            $(this).find('td:nth-child(5)').html('<input type="tel" class="form-control text-right row_case_qty" value="' + td_case + '">');
            $(this).find('td:nth-child(6)').html('<input type="tel" class="form-control text-right row_ball_qty" value="' + td_ball + '">');
            $(this).find('td:nth-child(7)').html('<input type="tel" class="form-control text-right row_basic_cost_price ' + basic_show_hide_cls + '" value="' + td_basic_cost_price + '"><input type="tel" class="form-control text-right row_sale_cost_price ' + sale_show_hide_cls + '" value="' + td_sale_cost_price + '">');
            $(this).find('td:nth-child(8)').html('<input type="tel" class="form-control text-right row_basic_start_date common_date_type_field ' + basic_show_hide_cls + '" value="' + td_basic_start_date + '"><input type="tel" class="form-control text-right row_sale_start_date common_date_type_field ' + sale_show_hide_cls + '" value="' + td_sale_start_date + '">');
            $(this).find('td:nth-child(9)').html('<input type="tel" class="form-control text-right row_basic_end_date common_date_type_field ' + basic_show_hide_cls + '" value="' + td_basic_end_date + '"><input type="tel" class="form-control text-right row_sale_end_date common_date_type_field ' + sale_show_hide_cls + '" value="' + td_sale_end_date + '">');
            $('.common_date_type_field').datepicker();
            $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
            var message = [{message: '商品修正：完了を押すと更新されます。'}];
            var buttons = [{buttons: '<button type="button" vendor_item_edit_enable="0" class="btn btn-info cmn_dft_dgn edits_vendor_item btn-sm">完了</button>'}, {buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn cancel_edition btn-sm">キャンセル</button>'}]
            editablebg_modal(message, buttons);

        } else if (edit_delete_status == 2) {
            $(this).addClass('selected_row_tr');
            nav_list[delete_item_nav].hide();
            $('.deletes_vendor_item').attr('vendor_item_delete_enable', 1);
            var td_p_name = $(this).find('td:nth-child(3)').text();
            const vendor_item_delete_msg = {

                vendor_item_delete_final: {
                    message: [
                        {message: '「' + td_p_name + '」を削除しますか？ '},
                    ],
                    buttons: [
                        {button: '<center><button data_p_name="' + td_p_name + '" data-id="' + vendor_item_id + '" class="btn btn-primary cmn_dft_dgn delete_vendor_data_id">削除</button><button type="button" class="btn btn-danger cmn_dft_dgn cancel_vendor_item_deletion btn-sm">戻る</button></center>'}
                    ]
                },
            }
            delete_item_delete_final = view(vendor_item_delete_msg['vendor_item_delete_final'], def_center_mesg_template);
            // $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
            // var message = [{ message: td_p_name + '<br>この商品を削除しますか？' }];
            // var buttons = [{ buttons: '<button type="button" data_p_name="' + td_p_name + '" data-id="' + vendor_item_id + '" class="btn btn-danger cmn_dft_dgn delete_vendor_data_id btn-sm">はい</button>' }, { buttons: '<button type="button" class="btn btn-info cmn_dft_dgn cancel_deletion btn-sm">いいえ</button>' }]

        } else {
            console.log('nothing');
        }
    })


    $(document).delegate(".updated_vendor_item_by_id", "click", function (e) {
        e.preventDefault();
        var vendor_item_id = $(this).attr('data_row_id');
        var td_jan = $(this).closest('tr').find('td:nth-child(3)').text();
        var td_case = $(this).closest('tr').find('.row_case_qty').val();
        var row_p_name = $(this).closest('tr').find('.row_p_name').val();
        var td_ball = $(this).closest('tr').find('.row_ball_qty').val();
        var td_basic_cost_price = $(this).closest('tr').find('.row_basic_cost_price').val();
        var td_sale_cost_price = $(this).closest('tr').find('.row_sale_cost_price').val();
        var td_basic_start_date = $(this).closest('tr').find('.row_basic_start_date').val();
        var td_basic_end_date = $(this).closest('tr').find('.row_basic_end_date').val();
        var td_sale_start_date = $(this).closest('tr').find('.row_sale_start_date').val();
        var td_sale_end_date = $(this).closest('tr').find('.row_sale_end_date').val();
        var data_vl = {
            vendor_item_id: vendor_item_id,
            jan_code: td_jan,
            price: td_basic_cost_price,
            sale_price: td_sale_cost_price,
            start_date: td_basic_start_date,
            end_date: td_basic_end_date,
            sale_start_date: td_sale_start_date,
            sale_end_date: td_sale_end_date,
            case_qty: td_case,
            ball_qty: td_ball,
            item_name: row_p_name
        };
        console.log(data_vl);
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "update_vendor_item_by_vendor_item_id",
            data: data_vl,
            dataType: "JSON",
            success: function (response) {
                location.reload();
            }
        });

    })

    $(document).delegate(".vendor_item_edit_inline", "click", function (e) {
        e.preventDefault();
        var nummrows = $('.row_case_qty').length;
        if (nummrows >= 1) {
            var message = [{message: '未登録の商品があります。'}];
            var buttons = [{buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">確認</button>'}]
            success_error_confirmation_popup(message, buttons);
            return false;
        }
        var basic_show_hide_cls = '';
        var sale_show_hide_cls = '';
        if ($('.basic_sale_mode').is(':checked')) {
            basic_show_hide_cls = 'show';
            sale_show_hide_cls = 'hide';
        } else {
            basic_show_hide_cls = 'hide';
            sale_show_hide_cls = 'show';
        }
        var vendor_item_id = $(this).attr('data-id');
        var td_p_name = $(this).closest('tr').find('td:nth-child(4)').text();
        var td_case = $(this).closest('tr').find('td:nth-child(5)').text();
        var td_ball = $(this).closest('tr').find('td:nth-child(6)').text();
        var td_basic_cost_price = $(this).closest('tr').find('td:nth-child(7)').attr('basic_cost_price_val');
        var td_basic_start_date = $(this).closest('tr').find('td:nth-child(8)').attr('basic_start_date_val');
        var td_basic_end_date = $(this).closest('tr').find('td:nth-child(9)').attr('basic_end_date_val');
        var td_sale_cost_price = $(this).closest('tr').find('td:nth-child(7)').attr('sale_cost_price_val');
        var td_sale_start_date = $(this).closest('tr').find('td:nth-child(8)').attr('sale_start_date_val');
        var td_sale_end_date = $(this).closest('tr').find('td:nth-child(9)').attr('sale_end_date_val');
        $(this).closest('tr').find('td:nth-child(4)').html('<input type="tel" class="form-control row_p_name" value="' + td_p_name + '">');
        $(this).closest('tr').find('td:nth-child(5)').html('<input type="tel" class="form-control text-right row_case_qty" value="' + td_case + '">');
        $(this).closest('tr').find('td:nth-child(6)').html('<input type="tel" class="form-control text-right row_ball_qty" value="' + td_ball + '">');
        $(this).closest('tr').find('td:nth-child(7)').html('<input type="tel" class="form-control text-right row_basic_cost_price ' + basic_show_hide_cls + '" value="' + td_basic_cost_price + '"><input type="tel" class="form-control text-right row_sale_cost_price ' + sale_show_hide_cls + '" value="' + td_sale_cost_price + '">');
        $(this).closest('tr').find('td:nth-child(8)').html('<input type="tel" class="form-control text-right row_basic_start_date common_date_type_field ' + basic_show_hide_cls + '" value="' + td_basic_start_date + '"><input type="tel" class="form-control text-right row_sale_start_date common_date_type_field ' + sale_show_hide_cls + '" value="' + td_sale_start_date + '">');
        $(this).closest('tr').find('td:nth-child(9)').html('<input type="tel" class="form-control text-right row_basic_end_date common_date_type_field ' + basic_show_hide_cls + '" value="' + td_basic_end_date + '"><input type="tel" class="form-control text-right row_sale_end_date common_date_type_field ' + sale_show_hide_cls + '" value="' + td_sale_end_date + '">');
        //$(this).closest('tr').find('td:nth-child(10)').html('<i data_row_id="'+vendor_item_id+'" class="material-icons updated_vendor_item_by_id"> check_circle </i>');
        $('.common_date_type_field').datepicker();
    })
    $('.basic_sale_mode').change(function (event) {
        /* Act on the event */
        var nummrows = $('.row_case_qty').length;
        if (nummrows == 0) {
            $('.vendor_itemdata_table tr').each(function (index, el) {
                var basic_price = $(this).children('td:nth-child(7)').attr('basic_cost_price_val');
                var sale_price = $(this).children('td:nth-child(7)').attr('sale_cost_price_val');
                var sale_start_date = $(this).children('td:nth-child(8)').attr('sale_start_date_val');
                var sale_end_date = $(this).children('td:nth-child(9)').attr('sale_end_date_val');
                var basic_start_date = $(this).children('td:nth-child(8)').attr('basic_start_date_val');
                var basic_end_date = $(this).children('td:nth-child(9)').attr('basic_end_date_val');
                if ($('.basic_sale_mode').is(':checked')) {
                    $(this).children('td:nth-child(7)').text(basic_price);
                    $(this).children('td:nth-child(8)').text(basic_start_date);
                    $(this).children('td:nth-child(9)').text(basic_end_date);
                } else {
                    $(this).children('td:nth-child(7)').text(sale_price);
                    $(this).children('td:nth-child(8)').text(sale_start_date);
                    $(this).children('td:nth-child(9)').text(sale_end_date);
                }

            });
            return false;
        }

        if ($(this).is(':checked')) {
            console.log('basic found');
            $('.row_basic_start_date').removeClass('hide').addClass('show');
            $('.row_basic_end_date').removeClass('hide').addClass('show');
            $('.row_basic_cost_price').removeClass('hide').addClass('show');

            $('.row_sale_start_date').removeClass('show').addClass('hide');
            $('.row_sale_end_date').removeClass('show').addClass('hide');
            $('.row_sale_cost_price').removeClass('show').addClass('hide');
        } else {
            $('.row_basic_start_date').removeClass('show').addClass('hide');
            $('.row_basic_end_date').removeClass('show').addClass('hide');
            $('.row_basic_cost_price').removeClass('show').addClass('hide');

            $('.row_sale_start_date').removeClass('hide').addClass('show');
            $('.row_sale_end_date').removeClass('hide').addClass('show');
            $('.row_sale_cost_price').removeClass('hide').addClass('show');
            console.log('sale found');
        }
        var active_rows = $('.row_case_qty').closest('tr').attr('data-id');
        /*new another tr change*/
        $('.vendor_itemdata_table tr').each(function (index, el) {
            var default_row_id = $(this).attr('data-id');
            if (nummrows == 1 && default_row_id == active_rows) {
                console.log('nothing happen');
            } else {
                var basic_price = $(this).children('td:nth-child(7)').attr('basic_cost_price_val');
                var sale_price = $(this).children('td:nth-child(7)').attr('sale_cost_price_val');
                var sale_start_date = $(this).children('td:nth-child(8)').attr('sale_start_date_val');
                var sale_end_date = $(this).children('td:nth-child(9)').attr('sale_end_date_val');
                var basic_start_date = $(this).children('td:nth-child(8)').attr('basic_start_date_val');
                var basic_end_date = $(this).children('td:nth-child(9)').attr('basic_end_date_val');
                if ($('.basic_sale_mode').is(':checked')) {
                    $(this).children('td:nth-child(7)').text(basic_price);
                    $(this).children('td:nth-child(8)').text(basic_start_date);
                    $(this).children('td:nth-child(9)').text(basic_end_date);
                } else {
                    $(this).children('td:nth-child(7)').text(sale_price);
                    $(this).children('td:nth-child(8)').text(sale_start_date);
                    $(this).children('td:nth-child(9)').text(sale_end_date);
                }
            }
        });
        /*new another tr change*/


    });

    //add_row_vendor_items
    $(document).delegate('.add_row_vendor_items', 'click', function (e) {
        e.preventDefault();
        var vendor_id = $(this).closest('tr').children('td').children('.jacos_select_field').children('.v_nmes_selects').find('.v_nmes_selects').val();
        var vendor_name = $(this).closest('tr').children('td').children('.jacos_select_field').children('.v_nmes_selects').find('.v_nmes_selects option:selected').text();
        var jan_code = $(this).closest('tr').children('td').find('.row_jan_code').val();
        var item_name = $(this).closest('tr').children('td').find('.row_p_name').val();
        var case_qty = $(this).closest('tr').children('td').find('.row_case_qty').val();
        var ball_qty = $(this).closest('tr').children('td').find('.row_ball_qty').val();
        var price = $(this).closest('tr').children('td').find('.row_basic_cost_price').val();
        var vendor_item_id = $('#vendor_item_id').val();
        var sale_price = $(this).closest('tr').children('td').find('.row_sale_cost_price').val();
        var sale_start_date = $(this).closest('tr').children('td').find('.row_sale_start_date').val();
        var sale_end_date = $(this).closest('tr').children('td').find('.row_sale_end_date').val();
        var basic_start_date = $(this).closest('tr').children('td').find('.row_basic_start_date').val();
        var basic_end_date = $(this).closest('tr').children('td').find('.row_basic_end_date').val();
        var order_point_unit = 'ケース'; //$('#vendor_order_point_unit').val();
        var order_point_quantity = 1; //$('#vendor_order_point_quantity').val();
        var order_lot_unit = 'ケース'; //$('#vendor_order_lot_unit').val();
        var order_lot_quantity = 0; //$('#vendor_order_lot_quantity').val();
        // alert(vendor_id);
        // return 0;
        if (sale_price == '' || sale_start_date == '' || sale_end_date == '' || basic_start_date == '' || basic_end_date == '' || vendor_id == '' || jan_code == '' || item_name == '' ||
            case_qty == '' || ball_qty == '' || price == '' ||
            order_point_unit == '' || order_point_quantity == '' || order_lot_unit == '' || order_lot_quantity == '') {
            // popup_message('vendor_message', 'text-danger', 'すべての欄に入力してください')
            error_message('flash_message', 'alert-danger', 'すべての欄に入力してください')
            // alert("Please fill all the fields");
            return 0;
        }
        data = {
            vendor_id: vendor_id,
            jan_code: jan_code,
            item_name: item_name,
            case_qty: case_qty,
            ball_qty: ball_qty,
            price: price,
            vendor_item_id: vendor_item_id,
            order_point_unit: order_point_unit,
            order_point_quantity: order_point_quantity,
            order_lot_unit: order_lot_unit,
            order_lot_quantity: order_lot_quantity,
            sale_price: sale_price,
            basic_start_date: basic_start_date,
            basic_end_date: basic_end_date,
            sale_start_date: sale_start_date,
            sale_end_date: sale_end_date
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "add_vendor_item",
            data: data,
            dataType: "JSON",
            success: function (response) {
                var message_id = 'vendor_message';
                var ms_message = response.message;
                if (ms_message == "insert_success") {
                    //success_message('flash_message', 'alert-success', '登録が完了しました');
                    var message = [{message: '登録が完了しました'}];
                    var buttons = [{buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">確認</button>'}]
                    success_error_confirmation_popup(message, buttons);
                } else if (ms_message == "update_success") {
                    //success_message('flash_message', 'alert-success', '変更しました');
                    var message = [{message: '変更しました'}];
                    var buttons = [{buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">確認</button>'}]
                    success_error_confirmation_popup(message, buttons);
                } else {
                    error_message(message_id, 'alert-danger', ms_message)
                }
                get_vendor_list_item_by_vendor_id(vendor_id, vendor_name);
                //$('#vendor_item_modal').modal('hide');
                // console.log(response);
            }
        });

    })


    $(document).delegate('.add_new_item', 'click', function () {
        $('#vendor_message').html('');
        $('#vendor_item_id').val('');
        var v_ids_v = $('.v_ids_v').val();
        $('#navigation_message').removeClass('show').addClass('hide');
        $('#navi_icons').removeClass('show').addClass('hide');
        // get_vendor_data(v_ids_v);
        var nummrows = $('.row_case_qty').length;
        var btn_text = $('.v_new_item_btn_top').text();
        var btn_text2 = $('.add_done_btn').text();
        if ((nummrows >= 1 && btn_text == '登録中')) {
            var vendor_id = $('.row_case_qty').closest('tr').children('td').children('.jacos_select_field').children('.v_nmes_selects').find('.v_nmes_selects').val();
            var vendor_name = $('.row_case_qty').closest('tr').children('td').children('.jacos_select_field').children('.v_nmes_selects').find('.v_nmes_selects option:selected').text();
            var jan_code = $('.row_case_qty').closest('tr').children('td').find('.row_jan_code').val();
            var item_name = $('.row_case_qty').closest('tr').children('td').find('.row_p_name').val();
            var case_qty = $('.row_case_qty').closest('tr').children('td').find('.row_case_qty').val();
            var ball_qty = $('.row_case_qty').closest('tr').children('td').find('.row_ball_qty').val();
            var price = $('.row_case_qty').closest('tr').children('td').find('.row_basic_cost_price').val();
            var vendor_item_id = $('#vendor_item_id').val();
            var sale_price = $('.row_case_qty').closest('tr').children('td').find('.row_sale_cost_price').val();
            var sale_start_date = $('.row_case_qty').closest('tr').children('td').find('.row_sale_start_date').val();
            var sale_end_date = $('.row_case_qty').closest('tr').children('td').find('.row_sale_end_date').val();
            var basic_start_date = $('.row_case_qty').closest('tr').children('td').find('.row_basic_start_date').val();
            var basic_end_date = $('.row_case_qty').closest('tr').children('td').find('.row_basic_end_date').val();
            var order_point_unit = 'ケース'; //$('#vendor_order_point_unit').val();
            var order_point_quantity = 1; //$('#vendor_order_point_quantity').val();
            var order_lot_unit = 'ケース'; //$('#vendor_order_lot_unit').val();
            var order_lot_quantity = 0; //$('#vendor_order_lot_quantity').val();
            if (jan_code == '') {
                error_message('flash_message', 'alert-warning', 'ＪＡＮコードを入力してください。');
                return false;
            }

            if (case_qty == '' || case_qty == 0) {
                error_message('flash_message', 'alert-warning', 'ケースの入数を入力してください。');
                return false;
            }

            if (ball_qty == '' || ball_qty == 0) {
                error_message('flash_message', 'alert-warning', 'ボールの入数を入力してください。');
                return false;
            }

            if (price == '') {
                error_message('flash_message', 'alert-warning', '原価を入力してください。');
                return false;
            }

            if (basic_start_date == '') {
                error_message('flash_message', 'alert-warning', '開始日を選択してください。');
                return false;
            }

            if (basic_start_date == '' || vendor_id == '' || jan_code == '' || item_name == '' ||
                case_qty == '' || ball_qty == '' || price == '' ||
                order_point_unit == '' || order_point_quantity == '' || order_lot_unit == '' || order_lot_quantity == '') {
                // popup_message('vendor_message', 'text-danger', 'すべての欄に入力してください')
                error_message('flash_message', 'alert-danger', 'すべての欄に入力してください');
                return false;
            }
            $('.v_new_item_btn_top').text('登録');
            $('.v_new_item_btn_top').removeClass('cancel_new_item').addClass('add_new_item');
            data = {
                vendor_id: vendor_id,
                jan_code: jan_code,
                item_name: item_name,
                case_qty: case_qty,
                ball_qty: ball_qty,
                price: price,
                vendor_item_id: vendor_item_id,
                order_point_unit: order_point_unit,
                order_point_quantity: order_point_quantity,
                order_lot_unit: order_lot_unit,
                order_lot_quantity: order_lot_quantity,
                sale_price: sale_price,
                basic_start_date: basic_start_date,
                basic_end_date: basic_end_date,
                sale_start_date: sale_start_date,
                sale_end_date: sale_end_date
            }
            var add_vendor_url = Globals.base_url + 'add_vendor_item';
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                type: "POST",
                url: add_vendor_url,
                data: data,
                dataType: "JSON",
                success: function (response) {

                    var message_id = 'vendor_message';
                    var ms_message = response.message;
                    if (ms_message == "insert_success") {
                        //success_message('flash_message', 'alert-success', '登録が完了しました');
                        var message = [{message: item_name + 'を登録しました。'}];
                        var buttons = [{buttons: '<button type="button" class="btn btn-info add_new_item btn-sm">商品登録</button>'}, {buttons: '<button type="button" class="btn btn-danger cmn_dft_dgn end_registration btn-sm">終了</button>'}]
                        success_error_confirmation_popup(message, buttons);
                    } else if (ms_message == "update_success") {
                        //success_message('flash_message', 'alert-success', '変更しました');
                        var message = [{message: '変更しました'}];
                        var buttons = [{buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">確認</button>'}]
                        success_error_confirmation_popup(message, buttons);
                    } else {
                        error_message(message_id, 'alert-danger', ms_message)
                    }
                    get_vendor_list_item_by_vendor_id(vendor_id, vendor_name);
                    //$('#myModal').modal('hide');
                    $('#editablebg_modal').removeClass('show').addClass('hide');
                    $('.edits_vendor_item').prop('disabled', true);
                    $('.add_new_item').prop('disabled', false);
                    $('.deletes_vendor_item').prop('disabled', true);
                    // console.log(response);
                }
            });
            return false;
        } else if (nummrows >= 1 && btn_text == '登録') {
            error_message('flash_message', 'alert-danger', 'please click on update button');
            return false;
        }
        var custom_v_select = '';
        var basic_show_hide_cls = '';
        var sale_show_hide_cls = '';
        if ($('.basic_sale_mode').is(':checked')) {
            basic_show_hide_cls = 'show';
            sale_show_hide_cls = 'hide';
        } else {
            basic_show_hide_cls = 'hide';
            sale_show_hide_cls = 'show';
        }
        //var appended_tr_row = '<tr class="adding_row"><td></td><td class="row_v_names_selector"><div class="jacos_select_field"><select class="form-control selectpicker v_nmes_selects"></select></div></td><td class="row_jan_code_cell"><input type="tel" value="" class="form-control row_jan_code"></td><td class="row_p_name"></td><td class="row_case_qty_cell text-right"><input type="tel" class="form-control text-right row_case_qty" value=""></td><td class="row_ball_qty_cell text-right"><input type="tel" class="form-control row_ball_qty text-right" value=""></td><td class="row_cost_price"><input type="tel" class="row_basic_cost_price form-control text-right show" value=""><input type="tel" class="row_sale_cost_price text-right form-control hide" value=""></td><td class="row_start_date"><input type="tel" class="row_basic_start_date common_date_type_field text-right form-control show" value=""><input type="tel" class="row_sale_start_date common_date_type_field form-control text-right hide" value=""></td><td class="row_end_date"><input type="tel" class="row_basic_end_date common_date_type_field text-right form-control show" value=""><input type="tel" class="row_sale_end_date common_date_type_field text-right form-control hide" value=""></td><td class="text-center"><i class="material-icons add_row_vendor_items"> check_box </i></td></tr>';
        var appended_tr_row = '<tr class="adding_row"><td></td><td class="row_v_names_selector"><div class="jacos_select_field"><select class="form-control selectpicker v_nmes_selects"></select></div></td><td class="row_jan_code_cell"><input type="tel" value="" class="form-control row_jan_code"></td><td><input type="text" class="row_p_name form-control" value=""></td><td class="row_case_qty_cell text-right"><input type="tel" class="form-control text-right row_case_qty" value=""></td><td class="row_ball_qty_cell text-right"><input type="tel" class="form-control row_ball_qty text-right" value=""></td><td class="row_cost_price"><input type="tel" class="row_basic_cost_price form-control text-right ' + basic_show_hide_cls + '" value=""><input type="tel" class="row_sale_cost_price text-right form-control ' + sale_show_hide_cls + '" value=""></td><td class="row_start_date"><input type="tel" class="row_basic_start_date common_date_type_field text-right form-control ' + basic_show_hide_cls + '" value=""><input type="tel" class="row_sale_start_date common_date_type_field form-control text-right ' + sale_show_hide_cls + '" value=""></td><td class="row_end_date"><input type="tel" class="row_basic_end_date common_date_type_field text-right form-control ' + basic_show_hide_cls + '" value=""><input type="tel" class="row_sale_end_date common_date_type_field text-right form-control ' + sale_show_hide_cls + '" value=""></td></tr>';
        $('.v_new_item_btn_top').text('登録中');
        $('.v_new_item_btn_top').removeClass('add_new_item').addClass('cancel_new_item');
        $('.vendor_itemdata_table').prepend(appended_tr_row);
        get_vendor_option_select_list(v_ids_v);
        $('.common_date_type_field').datepicker();
        $('.edits_vendor_item').prop('disabled', true);
        $('.add_new_item').prop('disabled', false);
        $('.deletes_vendor_item').prop('disabled', true);
        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        var message = [{message: '商品登録：完了を押すと、登録されます。'}];
        var buttons = [{buttons: '<button type="button" class="btn btn-info add_done_btn add_new_item btn-sm">完了</button>'}, {buttons: '<button type="button" class="btn btn-danger cancel_new_item btn-sm">キャンセル</button>'}]
        editablebg_modal(message, buttons);

        return false;
        $('#jan_code').val('');
        $('#item_name').val('');
        $('#case_qty').val('');
        $('#ball_qty').val('');
        $('#price').val('');
        $('#vendor_order_point_unit').val('ケース');
        $('#vendor_order_point_quantity').val(1);
        $('#vendor_order_lot_unit').val('ケース');
        $('#vendor_order_lot_quantity').val(1);
        $('.v_item_title').text('新規商品登録');
        // return 0;
        // Footer button
        var btn_html = '';
        btn_html += '<button type="button" class="btn btn-info" id="add_vendor_item">追加</button>';
        btn_html += '<button type="button" class="btn btn-secondary" data-dismiss="modal">' + Globals.close + '</button>';
        $('#footer').html(btn_html);
        $('#m_name').attr('disabled', false);
        $("#vendor_item_modal").modal("show");
    })

    $('.select_customer').click(function (e) {
        e.preventDefault();
        var has_tr = $('.menual_order_tble tr').length;
        if (has_tr > 0) {
            $('#navigation_message').removeClass('show').addClass('hide');
            var message = [{message: '販売先を変更すると追加した商品が削除されます。よろしいでしょうか？'}];
            var buttons = [{buttons: '<button type="button" class="btn btn-danger remove_all_tbody btn-sm">はい</button>'}, {buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">いいえ</button>'}];

            action_popup_navigations(message, buttons, 'yes_no_navigation_message');
        }

    })
    $(document).delegate('.cancel_new_item', 'click', function (event) {
        $('.v_new_item_btn_top').text('登録');
        $('.v_new_item_btn_top').removeClass('cancel_new_item').addClass('add_new_item');
        $('.edits_vendor_item').prop('disabled', false);
        $('.add_new_item').prop('disabled', false);
        $('.deletes_vendor_item').prop('disabled', false);
        $('.adding_row').remove();
        //$('#myModal').modal('hide');
        $('#editablebg_modal').removeClass('show').addClass('hide');
        show_hide_default_navigation(1, 0);
    })
    $(document).delegate('.end_registration', 'click', function (event) {
        $('.v_new_item_btn_top').text('登録');
        $('.edits_vendor_item').prop('disabled', false);
        $('.add_new_item').prop('disabled', false);
        $('.deletes_vendor_item').prop('disabled', false);
        //$('#success_error_confirmation_modal').modal('hide');
        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        show_hide_default_navigation(1, 0);
    })
    $(document).delegate('.cancel_deletion', 'click', function (event) {
        $('.deletes_vendor_item').text('削除');
        $('.edits_vendor_item').prop('disabled', false);
        $('.add_new_item').prop('disabled', false);
        $('.deletes_vendor_item').prop('disabled', false);
        //$('#myModal').modal('hide');
        //$('#success_error_confirmation_modal').modal('hide');
        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        $('#editablebg_modal').removeClass('show').addClass('hide');
        $('.vendor_item_edit_delete_inline').attr('data_action_status', 0);
        $('.deletes_vendor_item').attr('vendor_item_delete_enable', 0);
        $('.edits_vendor_item').attr('vendor_item_edit_enable', 0);
        show_hide_default_navigation(1, 0);
        $('.vendor_item_edit_delete_inline').removeClass('selected_row_tr');
    })

    $(document).delegate('.cancel_edition', 'click', function (event) {
        $('.edits_vendor_item').text('修正');
        $('.edits_vendor_item').prop('disabled', false);
        $('.add_new_item').prop('disabled', false);
        $('.deletes_vendor_item').prop('disabled', false);
        // $('#myModal').modal('hide');
        // $('#success_error_confirmation_modal').modal('hide');
        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        $('#editablebg_modal').removeClass('show').addClass('hide');
        $('.vendor_item_edit_delete_inline').attr('data_action_status', 0);
        $('.deletes_vendor_item').attr('vendor_item_delete_enable', 0);
        $('.edits_vendor_item').attr('vendor_item_edit_enable', 0);
        show_hide_default_navigation(1, 0);
        var nummrows = $('.row_case_qty').length;
        if (nummrows >= 1) {
            var vendor_id = $('.v_ids_v').val();
            var vendor_name = $('.vendor_list_show').text();
            var vendor_item_id = $('.row_case_qty').closest('tr').attr('data-id');
            var td_jan = $('.row_case_qty').closest('tr').find('td:nth-child(3)').text();
            var td_case = $('.row_case_qty').closest('tr').find('.row_case_qty').val();
            var row_p_name = $('.row_case_qty').closest('tr').find('.row_p_name').val();
            var td_ball = $('.row_case_qty').closest('tr').find('.row_ball_qty').val();
            var td_basic_cost_price = $('.row_case_qty').closest('tr').find('.row_basic_cost_price').val();
            var td_sale_cost_price = $('.row_case_qty').closest('tr').find('.row_sale_cost_price').val();
            var td_basic_start_date = $('.row_case_qty').closest('tr').find('.row_basic_start_date').val();
            var td_basic_end_date = $('.row_case_qty').closest('tr').find('.row_basic_end_date').val();
            var td_sale_start_date = $('.row_case_qty').closest('tr').find('.row_sale_start_date').val();
            var td_sale_end_date = $('.row_case_qty').closest('tr').find('.row_sale_end_date').val();


            var row = $('tr[data-id="' + vendor_item_id + '"]');
            row.find('td:nth-child(4)').html('');
            row.find('td:nth-child(5)').html('');
            row.find('td:nth-child(6)').html('');
            row.find('td:nth-child(7)').html('');
            row.find('td:nth-child(8)').html('');
            row.find('td:nth-child(9)').html('');

            row.find('td:nth-child(4)').text(row_p_name);
            row.find('td:nth-child(5)').text(td_case);
            row.find('td:nth-child(6)').text(td_ball);


            row.find('td:nth-child(7)').attr('basic_cost_price_val', td_basic_cost_price);
            row.find('td:nth-child(8)').attr('basic_start_date_val', td_basic_start_date);
            row.find('td:nth-child(9)').attr('basic_end_date_val', td_basic_end_date);
            row.find('td:nth-child(7)').attr('sale_cost_price_val', td_sale_cost_price);
            row.find('td:nth-child(8)').attr('sale_start_date_val', td_sale_start_date);
            row.find('td:nth-child(9)').attr('sale_end_date_val', td_sale_end_date);
            if ($('.basic_sale_mode').is(':checked')) {
                row.find('td:nth-child(7)').text(td_basic_cost_price);
                row.find('td:nth-child(8)').text(td_basic_start_date);
                row.find('td:nth-child(9)').text(td_basic_end_date);
            } else {
                row.find('td:nth-child(7)').text(td_sale_cost_price);
                row.find('td:nth-child(8)').text(td_sale_start_date);
                row.find('td:nth-child(9)').text(td_sale_end_date);
            }

        }


    })

    $(document).delegate('.remove_all_tbody', 'click', function (event) {
        $('.menual_order_tble').html('');
        //$('#yes_no_navigation_message').removeClass('show').addClass('hide');
        $('#yes_no_confirmation_modal').modal('hide');
    })
    $('.select_customer').change(function (e) {
        e.preventDefault();
        var customer_id = $('option:selected', this).val();
        $('.menual_order_tble').html('');
        //$('#yes_no_navigation_message').removeClass('show').addClass('hide');
        $('#yes_no_confirmation_modal').modal('hide');
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "get_shop_list_by_customer_id",
            data: {customer_id: customer_id},
            dataType: "JSON",
            success: function (response) {
                var v_name_html = '';
                var all_shop_list = response.shop_list;
                for (var i = 0; i < all_shop_list.length; i++) {
                    v_name_html += '<option delivery_cycle="' + all_shop_list[i].delivery_cycle + '" value="' + all_shop_list[i].customer_shop_id + '"> ' + all_shop_list[i].shop_name + ' </option>';
                }
                $('.select_shop').html(v_name_html);
                var delivery_cycle = $('.select_shop option:selected').attr('delivery_cycle');
                var setdate_delivery_cycle = delivery_cycle + "d";
                $(".delivery_date").datepicker("setDate", setdate_delivery_cycle);
            }
        });
    })
    $('.select_shop').change(function (event) {
        /* Act on the event */
        var delivery_cycle = $('option:selected', this).attr('delivery_cycle');
        var setdate_delivery_cycle = delivery_cycle + "d";
        $(".delivery_date").datepicker("setDate", setdate_delivery_cycle);
    });

    $(document).delegate('.add_new_rows', 'click', function (e) {
        e.preventDefault();

        var customer_id = $('.select_customer').val();
        if (customer_id == '') {
            alert('JANコードを入力してください');
            return false;
        }
        var clssssss = $(this);
        var c_qt = 0;
        var b_qt = 0;
        var r_qt = 0;
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "get_jn_info_by_jn_code_list",
            data: {customer_id: customer_id},
            dataType: "JSON",
            success: function (response) {
                if (response.jn_info) {
                    var cust_opt = '<option value="">商品を選択してください</option>';
                    console.log(response.jn_info);
                    for (var i = 0; i < response.jn_info.length; i++) {
                        console.log(response.jn_info[i]);
                        console.log('(' + response.jn_info[i].jan + ')' + response.jn_info[i].name);
                        cust_opt += '<option value="' + response.jn_info[i].jan + '">(' + response.jn_info[i].jan + ')' + response.jn_info[i].name + '</option>';
                    }


                    var trs = '<tr><td><select name="jn_codes_m" class="form-control jn_codes_m">' + cust_opt + '</select></td><td><input type="text" value="" class="form-control item_nmes" readonly></td><td><input type="text" value="" class="form-control case_qtys" readonly></td><td><input type="text" value="" class="form-control ball_qtys" readonly></td><td><input type="text" value="" class="form-control rose_qtys" readonly></td><td><select name="" class="form-control iputs_types"><option value="ケース">ケース</option><option value="ボール">ボール</option><option value="バラ">バラ</option></select></td><td><input type="number" value="" class="form-control ordering_quantity"></td><td><i class="material-icons delete_this_row">delete</i></td></tr>';
                    $('.menual_order_tble').append(trs);

                } else {
                    alert('Customer item not found');
                    return false;
                }
            }
        });


    })

    $(document).delegate('.delete_this_row', 'click', function () {
        $(this).closest('tr').remove();
    })
    // $(document).delegate('.jn_codes_m', 'keypress', function(e) {
    //     var keynum = e.which;

    //     if (keynum == 13) {
    //         $(this).blur();
    //     }
    // })
    $(document).delegate('.jn_codes_m', 'change', function (e) {
        var jn = $(this).closest('tr').find('.jn_codes_m').val();
        var customer_id = $('.select_customer').val();
        if (customer_id == '') {
            alert('JANコードを入力してください');
            return false;
        }
        var clssssss = $(this);
        var c_qt = 0;
        var b_qt = 0;
        var r_qt = 0;
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "get_jn_info_by_jn_code",
            data: {jn: jn, customer_id: customer_id},
            dataType: "JSON",
            success: function (response) {
                if (response.jn_info) {
                    clssssss.closest('tr').find('.item_nmes').val(response.jn_info.name);
                    if (response.jn_info.case_quantity != null) {
                        c_qt = response.jn_info.case_quantity;
                    }
                    if (response.jn_info.ball_quantity != null) {
                        b_qt = response.jn_info.ball_quantity;
                    }
                    if (response.jn_info.unit_quantity != null) {
                        r_qt = response.jn_info.unit_quantity;
                    }
                    clssssss.closest('tr').find('.case_qtys').val(c_qt);
                    clssssss.closest('tr').find('.ball_qtys').val(b_qt);
                    clssssss.closest('tr').find('.rose_qtys').val(r_qt);
                } else {
                    alert('Customer item not found');
                    return false;
                }
            }
        });
    })

    $('.delivery_date').datepicker({
        dateFormat: 'yy/mm/dd'
    });
    $('.shipment_conf_date').datepicker({
        dateFormat: 'yy/mm/dd'
    });

    $(document).delegate('.save_all_menual_order', 'click', function (e) {
        e.preventDefault();
        var customer_id = $('.select_customer').val();
        var order_type = $('.order_type').val();
        var shop_id = $('.select_shop').val();
        var voucher_m_number = $('.voucher_m_number').val();
        var delivery_date = $('.delivery_date').val();
        if (customer_id == '') {
            alert('販売先を選択してください');
            return false;
        }
        if (shop_id == '') {
            alert('Please select a shop');
            return false;
        }
        if (voucher_m_number == '') {
            alert('伝票番号を入力してください');
            return false;
        }
        if (delivery_date == '') {
            alert('Delivery date required');
            return false;
        }
        var m_o_arr = [];
        var temp_arr = [];
        var flg = 0;
        $('.menual_order_tble tr').each(function () {
            var jcode = $(this).find('.jn_codes_m').val();
            var iputs_types = $(this).find('.iputs_types').val();
            //var quantity = $(this).find('.quantity').val();
            var ordering_quantity = $(this).find('.ordering_quantity').val();
            var item_n = $(this).find('.item_nmes').val();
            if (item_n == '') {
                alert('JANコードを選択してください');
                flg = 1;
            }
            // if (quantity == '') {
            //     alert('Shipment Quantity required');
            //     flg = 1;
            // }
            if (ordering_quantity == '') {
                alert('発注数量を入力してください');
                flg = 1;
            }
            temp_arr = [jcode, iputs_types, ordering_quantity];
            m_o_arr.push(temp_arr);
        });
        if (m_o_arr.length == 0) {
            alert('商品がありません');
            return false;
        }
        if (flg == 1) {
            return false;
        }

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "add_menual_order_insert",
            data: {
                m_o_arr: m_o_arr,
                customer_id: customer_id,
                shop_id: shop_id,
                voucher_m_number: voucher_m_number,
                delivery_date: delivery_date,
                order_type: order_type
            },
            dataType: "JSON",
            success: function (response) {
                $('.menual_order_tble').html('');
                $('.select_customer').val('');
                $('.select_shop').val('');
                $('.voucher_m_number').val('');
                $('.delivery_date').val('');
                success_message('m_order_message', 'alert-success', '手書き受注が正常に行われました');
                console.log(response);
            }
        });

    })

    function get_vendor_data(vendor_id_select = null) {
        var get_vendor_list_url = Globals.base_url + 'get_vendor_list';
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: get_vendor_list_url,
            data: {vendor_id: null},
            dataType: "JSON",
            success: function (response) {
                // console.log(response);
                // return 0;
                var v_name_html = '';
                var all_vendor_list = response.all_vendor_list;
                for (var i = 0; i < all_vendor_list.length; i++) {
                    var d_select = '';
                    if (all_vendor_list[i].vendor_id == vendor_id_select) {
                        d_select = 'selected';
                    }
                    var p_code = 'p_code';
                    var p_content = 'p_content';
                    v_name_html += '<option data-content="<span class=' + p_code + '>' + all_vendor_list[i].partner_code + '</span><span class=' + p_content + '>' + all_vendor_list[i].name + '</span>" value="' + all_vendor_list[i].vendor_id + '" data-id="' + all_vendor_list[i].partner_code + '" ' +
                        d_select + '  > ' + all_vendor_list[i].partner_code + '  |  ' + all_vendor_list[i].name + ' </option>';
                }
                $('#m_name').html(v_name_html);
                $('.selectpicker').selectpicker('refresh');
                //var vendor_partner_code = $('#m_name').find(":selected", this).attr('data-id');
                //$('#m_code').val(vendor_partner_code);

            }
        });
    }

    function get_vendor_option_select_list(vendor_id_select = null) {
        var get_vendor_list_url = Globals.base_url + '/get_vendor_list';
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: get_vendor_list_url,
            data: {vendor_id: null},
            dataType: "JSON",
            success: function (response) {
                // console.log(response);
                // return 0;
                var v_name_html = '';
                var all_vendor_list = response.all_vendor_list;
                for (var i = 0; i < all_vendor_list.length; i++) {
                    var d_select = '';
                    if (all_vendor_list[i].vendor_id == vendor_id_select) {
                        d_select = 'selected';
                    }
                    var p_code = 'p_code';
                    var p_content = 'p_content';
                    v_name_html += '<option data-content="<span class=' + p_code + '>' + all_vendor_list[i].partner_code + '</span><span class=' + p_content + '>' + all_vendor_list[i].name + '</span>" value="' + all_vendor_list[i].vendor_id + '" data-id="' + all_vendor_list[i].partner_code + '" ' +
                        d_select + '  > ' + all_vendor_list[i].partner_code + '  |  ' + all_vendor_list[i].name + ' </option>';
                }
                $('.v_nmes_selects').html(v_name_html);
                $('.selectpicker').selectpicker('refresh');
                //var vendor_partner_code = $('#m_name').find(":selected", this).attr('data-id');
                //$('#m_code').val(vendor_partner_code);

            }
        });
    }

    $('#m_name').change(function (e) {
        e.preventDefault();
        var vendor_partner_code = $('option:selected', this).attr('data-id');
        $('#m_code').val(vendor_partner_code);
    })

    $('#jan_code').blur(function () {
        var jan_code = $(this).val();
        if (jan_code == '') {
            error_message('vendor_message', 'alert-danger', 'JANコードを入力してください')
            // popup_message('vendor_message', 'text-danger', 'JANコードを入力してください')
            // alert("Please write a jan code");
            return 0;
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "get_jan_info",
            data: {jan_code: jan_code},
            dataType: "JSON",
            success: function (response) {
                var api_response = response.api_data;
                // console.log(api_response);
                // return 0;
                var data_resource = response.data_resource;
                if (api_response == 'invalid_jan_code') {
                    error_message('vendor_message', 'alert-danger', '正しいJANコードを入力してください。')
                    // popup_message('vendor_message', 'text-danger', '正しいJANコードを入力してください。')
                    // alert("Please enter a valid jan code");
                } else {

                    $('#item_name').val(api_response.name);
                    if (data_resource == 'database') {
                        $('#case_qty').val(api_response.case_inputs);
                        $('#ball_qty').val(api_response.ball_inputs);
                    }
                }
                // console.log(api_response);
            }
        });
        // alert(jan_code);
    })

    /*online*/
    $(document).delegate(".row_jan_code", "keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    })
    $(document).delegate(".row_jan_code", "blur", function (e) {
        e.preventDefault();
        var jan_code = $(this).val();
        if (jan_code == '') {
            error_message('flash_message', 'alert-danger', 'JANコードを入力してください')
            // popup_message('vendor_message', 'text-danger', 'JANコードを入力してください')
            // alert("Please write a jan code");
            return 0;
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "get_jan_info",
            data: {jan_code: jan_code},
            dataType: "JSON",
            success: function (response) {
                var api_response = response.api_data;
                // console.log(api_response);
                // return 0;
                var data_resource = response.data_resource;
                if (api_response == 'invalid_jan_code') {
                    $(".row_jan_code").val('');
                    error_message('flash_message', 'alert-danger', '正しいJANコードを入力してください。');
                    // popup_message('vendor_message', 'text-danger', '正しいJANコードを入力してください。')
                    // alert("Please enter a valid jan code");
                } else {
                    if (response.vendor_item_data == 1) {
                        $(".row_jan_code").val('');
                        // var message = [{ message: 'この商品は既に登録済みです。' }];
                        // var buttons = [{ buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">確認</button>' }]
                        // success_error_confirmation_popup(message, buttons);
                        error_message('flash_message', 'alert-warning', 'この商品は既に登録済みです。');

                    } else {
                        console.log(response.vendor_id);
                        if (response.vendor_id != 0) {
                            $('.v_nmes_selects').val(response.vendor_id);
                            $('.selectpicker').selectpicker('refresh');
                        }
                        $('.row_p_name').val(api_response.name);
                        if (data_resource == 'database') {
                            $('.row_case_qty').val(api_response.case_inputs);
                            $('.row_ball_qty').val(api_response.ball_inputs);
                        }
                    }
                }
                // console.log(api_response);
            }
        });
        // alert(jan_code);
    })

    $(document).delegate("#add_vendor_item", "click", function (e) {
        var vendor_id = $('#m_name').val();
        var vendor_name = $("#m_name option:selected").text();
        var jan_code = $('#jan_code').val();
        var item_name = $('#item_name').val();
        var case_qty = $('#case_qty').val();
        var ball_qty = $('#ball_qty').val();
        var price = $('#price').val();
        var vendor_item_id = $('#vendor_item_id').val();
        var sale_price = $('#sale_price').val();
        var sale_start_date = $('#sale_start_date').val();
        var sale_end_date = $('#sale_end_date').val();
        var basic_start_date = $('#basic_start_date').val();
        var basic_end_date = $('#sale_end_date').val();
        var order_point_unit = $('#vendor_order_point_unit').val();
        var order_point_quantity = $('#vendor_order_point_quantity').val();
        var order_lot_unit = $('#vendor_order_lot_unit').val();
        var order_lot_quantity = $('#vendor_order_lot_quantity').val();
        // alert(vendor_id);
        // return 0;
        if (sale_price == '' || sale_start_date == '' || sale_end_date == '' || basic_start_date == '' || basic_end_date == '' || vendor_id == '' || jan_code == '' || item_name == '' ||
            case_qty == '' || ball_qty == '' || price == '' ||
            order_point_unit == '' || order_point_quantity == '' || order_lot_unit == '' || order_lot_quantity == '') {
            // popup_message('vendor_message', 'text-danger', 'すべての欄に入力してください')
            error_message('vendor_message', 'alert-danger', 'すべての欄に入力してください')
            // alert("Please fill all the fields");
            return 0;
        }
        data = {
            vendor_id: vendor_id,
            jan_code: jan_code,
            item_name: item_name,
            case_qty: case_qty,
            ball_qty: ball_qty,
            price: price,
            vendor_item_id: vendor_item_id,
            order_point_unit: order_point_unit,
            order_point_quantity: order_point_quantity,
            order_lot_unit: order_lot_unit,
            order_lot_quantity: order_lot_quantity,
            sale_price: sale_price,
            basic_start_date: basic_start_date,
            basic_end_date: basic_end_date,
            sale_start_date: sale_start_date,
            sale_end_date: sale_end_date
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "add_vendor_item",
            data: data,
            dataType: "JSON",
            success: function (response) {
                var message_id = 'vendor_message';
                var ms_message = response.message;
                if (ms_message == "insert_success") {
                    success_message('flash_message', 'alert-success', '登録が完了しました');
                } else if (ms_message == "update_success") {
                    success_message('flash_message', 'alert-success', '変更しました');
                } else {
                    error_message(message_id, 'alert-danger', ms_message)
                }
                get_vendor_list_item_by_vendor_id(vendor_id, vendor_name);
                $('#vendor_item_modal').modal('hide');
                // console.log(response);
            }
        });

    });


    $(document).delegate(".vendor_item_popup_show", "click", function (e) {
        e.preventDefault();
        var vendor_item_id = $(this).attr('data-id');
        var vendor_id = $(this).attr('vendor-id');
        $('#vendor_message').html('');
        get_vendor_data(vendor_id);
        $('#m_name').attr('disabled', true);
        $('.v_item_title').text('商品情報');
        // Footer button
        var btn_html = '';
        btn_html += '<button type="button" class="btn btn-info" id="add_vendor_item">変更</button>';
        btn_html += '<button type="button" class="btn btn-danger" data-id="' + vendor_item_id + '" id="delete_vendor_item">削除</button>';
        btn_html += '<button type="button" class="btn btn-secondary" data-dismiss="modal">' + Globals.close + '</button>';
        $('#footer').html(btn_html);

        // var jan_code = $(this).find("td:eq(7)").text();
        // var jan_name = $(this).find("td:eq(1)").text();
        // var case_inputs = $(this).find("td:eq(3)").text();
        // var ball_inputs = $(this).find("td:eq(4)").text();
        // var vendor_cost_price = $(this).find("td:eq(5)").text();
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "single_vendor_item",
            data: {vendor_item_id: vendor_item_id},
            dataType: "JSON",
            success: function (response) {
                $('#vendor_item_id').val(vendor_item_id);
                $('#jan_code').val(response.jan);
                $('#item_name').val(response.product_name);
                $('#case_qty').val(response.case_inputs);
                $('#ball_qty').val(response.ball_inputs);
                $('#price').val(response.cost_price);
                $('#sale_price').val(response.sale_cost_price);
                $('#basic_start_date').val(response.start_date);
                $('#basic_end_date').val(response.end_date);
                $('#sale_start_date').val(response.sale_start_date);
                $('#sale_end_date').val(response.sale_end_date);
                $('#vendor_order_point_unit').val(response.order_point_inputs);
                $('#vendor_order_point_quantity').val(response.order_point_quantity);
                $('#vendor_order_lot_unit').val(response.order_lot_inputs);
                $('#vendor_order_lot_quantity').val(response.order_lot_quantity);
                // console.log(jan_name);
                $("#vendor_item_modal").modal("show");
            }
        });
        // return false;

    });
    $(document).delegate(".delete_vendor_data_id", "click", function (e) {
        e.preventDefault();
        var p_name = '';
        var vendor_item_id = $(this).attr('data-id');
        p_name = $(this).attr('data_p_name');
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "vendor_item_delete",
            data: {vendor_item_id: vendor_item_id, p_name: p_name},
            dataType: "JSON",
            success: function (response) {

                // location.reload();
                // var message = [{ message: p_name + '<br>この商品を削除しました。' }];
                // var buttons = [{ buttons: '<button type="button" vendor_item_delete_enable="0" class="btn btn-danger cmn_dft_dgn deletes_vendor_item btn-sm">商品選択</button>' }, { buttons: '<button type="button" class="btn btn-info cmn_dft_dgn cancel_deletion btn-sm">終了</button>' }]
                // editablebg_modal(message, buttons);
                nav_list[delete_item_delete_final].hide();
                $('.vendor_item_edit_delete_inline').attr('data_action_status', 0);
                $('.vendor_item_edit_delete_inline').removeClass('selected_row_tr');
                const vendor_item_delete_success_msg = {

                    vendor_item_delete_success: {
                        message: [
                            {message: '「' + p_name + '」を削除しました。 '},
                        ],
                        buttons: [
                            {button: '<center><button type="button" class="btn btn-info cmn_dft_dgn vendor_item_deletion_success btn-sm">確認</button></center>'}
                        ]
                    },
                }
                delete_item_delete_success = view(vendor_item_delete_success_msg['vendor_item_delete_success'], def_center_mesg_template);
                var row = $('tr[data-id="' + vendor_item_id + '"]');
                row.remove();
            }
        });
    })
    $(document).delegate("#delete_vendor_item", "click", function (e) {
        e.preventDefault();
        var vendor_item_id = $(this).attr('data-id');
        var message = [{message: 'この商品を削除しますか？'}];
        var buttons = [{buttons: '<button type="button" data-id="' + vendor_item_id + '" class="btn btn-danger delete_vendor_data_id btn-sm">はい</button>'}, {buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">いいえ</button>'}]

        action_popup_navigations(message, buttons, 'yes_no_navigation_message');
    })
    $(document).delegate(".vendor_item_delete_inline", "click", function (e) {
        e.preventDefault();
        var nummrows = $('.row_case_qty').length;
        if (nummrows >= 1) {
            var message = [{message: '未登録の商品があります。'}];
            var buttons = [{buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">確認</button>'}]
            success_error_confirmation_popup(message, buttons);
            return false;
        }
        var vendor_item_id = $(this).attr('data-id');
        var message = [{message: 'この商品を削除しますか？'}];
        var buttons = [{buttons: '<button type="button" data-id="' + vendor_item_id + '" class="btn btn-danger delete_vendor_data_id btn-sm">はい</button>'}, {buttons: '<button type="button" id="close_yes_no_navi" class="btn btn-info btn-sm">いいえ</button>'}]

        action_popup_navigations(message, buttons, 'yes_no_navigation_message');
    })
    $('.case_invent').keyup(function () {
        // var col = $(this).parent().children().index($(this));
        var row = $(this).closest("tr");
        // var rows = $('#order_rec_table_data tbody tr').length;
        var case_quantity = parseFloat(row.find('#case_quantity_' + row.index()).val());
        var ball_quantity = parseFloat(row.find('#ball_quantity_' + row.index()).val());

        var case_input = parseFloat(row.find('#case_input_' + row.index()).val());
        var ball_input = parseFloat(row.find('#ball_input_' + row.index()).val());
        var unit_quantity = parseFloat(row.find('#unit_quantity_' + row.index()).text());

        if (isNaN(case_quantity)) {
            case_quantity = 0;
        }
        if (isNaN(ball_quantity)) {
            ball_quantity = 0;
        }
        if (isNaN(case_input)) {
            case_input = 0;
        }
        if (isNaN(ball_input)) {
            ball_input = 0;
        }
        if (isNaN(unit_quantity)) {
            unit_quantity = 0;
        }

        var total_inventory = (case_quantity * case_input) + (ball_quantity * ball_input) + unit_quantity;

        row.find('#total_inventory_fetch_' + row.index()).text(total_inventory);
    });

    $('.case_invent').blur(function () {

        // receiveorder
        // shipment
        var row = $(this).closest("tr");
        var case_quantity = parseFloat(row.find('#case_quantity_' + row.index()).val());
        var ball_quantity = parseFloat(row.find('#ball_quantity_' + row.index()).val());

        var case_input = parseFloat(row.find('#case_input_' + row.index()).val());
        var ball_input = parseFloat(row.find('#ball_input_' + row.index()).val());

        var unit_quantity = parseFloat(row.find('#unit_quantity_' + row.index()).text());
        var total_inventory = row.find('#total_inventory_fetch_' + row.index()).text();


        var jan_code = row.find('#jan_code_' + row.index()).text();

        var url_last_element = url_search();

        if (isNaN(case_quantity)) {
            case_quantity = '';
        }
        if (isNaN(ball_quantity)) {
            ball_quantity = '';
        }
        if (isNaN(case_input)) {
            case_input = '';
        }
        if (isNaN(ball_input)) {
            ball_input = '';
        }
        if (isNaN(unit_quantity)) {
            unit_quantity = '';
        }
        if (isNaN(total_inventory)) {
            total_inventory = '';
        }
        var url_last_element = url_search();
        var vendor_item_id = '';
        var customer_item_id = '';
        var data_url = '';
        if (url_last_element == 'receiveorder') {
            vendor_item_id = row.find('#vendor_item_id_' + row.index()).val();
            data_url = 'receive_order_update';
        } else if (url_last_element == 'shipment') {
            customer_item_id = row.find('#customer_item_id_' + row.index()).val();
            data_url = 'shipment_update';
        }

        var data = {
            vendor_item_id: vendor_item_id,
            customer_item_id: customer_item_id,
            jan_code: jan_code,
            case_quantity: case_quantity,
            ball_quantity: ball_quantity,
            case_input: case_input,
            ball_input: ball_input,
            unit_quantity: unit_quantity,
            total_inventory: total_inventory
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: data_url,
            data: data,
            dataType: "JSON",
            success: function (response) {

            }
        });

    });

    $(document).delegate('#shipment_csv_input, #shipment_csv_input_nav', 'change', function () {
        // $('#shipment_csv_input').change(function() {
        var fileInput = $(this).val();
        var ext = checkFileExt(fileInput);
        if (ext != "csv") {
            alert('受注データを選択してください');
            return false;
        }
        var file_size = $(this)[0].files[0].size / 1024 / 1024;
        if (file_size > 30) {
            alert("Big File Size: " + file_size);
            return false;
        }
        // var f_data = new FormData('#shipment_csv_form');
        // console.log(f_data);
        var formData = new FormData();
        formData.append('file', $(this)[0].files[0]);
        // console.log(formData);
        // return 0;
        $('#shipment_js_message').html('<center><img src="' + Globals.base_url + 'public/backend/images/ajax-loader.gif"></center>');
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            type: "POST",
            url: "shipment_csv_insert",
            data: formData,
            processData: false, // tell jQuery not to process the data
            contentType: false, // tell jQuery not to set contentType
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                if (response.success != 1) {
                    const tempmsg = {
                        csv_import: {
                            message: [
                                {message: response.message}
                            ],
                            buttons: [{button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
                        }
                    }
                    nav_width = '300px';
                    display_positionX = '15px';
                    display_positionY = '15px';
                    error_nav = view(tempmsg['csv_import'], def_center_mesg_template);
                    show_hide_nav_icn(0);
                } else {
                    //location.reload();
                }

            }
        });

    });
    $(document).delegate(".delivery_output", "click", function (e) {
        e.preventDefault(0);
        shipment_popup_data();
        // return 0;
        $('#shipment_popup_modal').modal('show');
    });
    $(document).delegate(".received_order_pdf_modal", "click", function (e) {
        e.preventDefault(0);
        received_popup_data();
        // return 0;
        $('#received_popup_modal').modal('show');
    });

    // $(document).delegate("#shipment_delivery_output", "click", function(e) {
    //     e.preventDefault(0);
    //     var voucher_number = $(this).attr('voucher-number');
    //     $.ajax({
    //         headers: {
    //             "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    //         },
    //         type: "POST",
    //         url: "delivery_order_report",
    //         data: { voucher_number: voucher_number },
    //         dataType: "JSON",
    //         success: function(response) {
    //             console.log(response);
    //         }
    //     });
    //     // alert(voucher_number);
    // });


    // ENding paranthesis
    $('.fa_site_tour').click(function (event) {
        /* Act on the event */
        var urls = url_search();
        if (urls == 'vendor_master') {
            vendor_master_page.show();
        }
    });
    /*tooltip integration*/

    tippy('.goto_home', {
        placement: 'bottom',
        arrow: true,
    });
    tippy('.vendor_master_link', {
        placement: 'bottom',
        arrow: true,
    });
    tippy('.salesmaster_link', {
        placement: 'bottom',
        arrow: true,
    });
    tippy('.wholesale_master_link', {
        placement: 'bottom',
        arrow: true,
    });
    tippy('.add_new_item', {
        placement: 'top',
        arrow: true,
    });
    tippy('.edits_vendor_item', {
        placement: 'top',
        arrow: true,
    });

    tippy('.cost_price_change_th', {
        placement: 'top',
        arrow: true,
    });

});
var vendor_master_page = new Anno([{
    target: '.add_new_item',
    position: 'left',
    content: '仕入先商品のマスター登録ができます。'
}, {
    target: '.edits_vendor_item',
    position: 'left',
    content: '商品の修正を行います。'
}, {
    target: '.deletes_vendor_item',
    position: 'left',
    content: '商品の削除を行います。'
}, {
    target: '.toggle',
    position: 'top',
    content: '定番・特売のマスター登録ができます。'
}]);

function popup_message(message_id, class_name, message) {
    $('#' + message_id).html('<h4 class="' + class_name + '">' + message + '</h4>');
}

function checkFileExt(filename) {
    filename = filename.toLowerCase();
    return filename.split('.').pop();
}

function shipment_popup_data() {
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        type: "POST",
        url: "receive_order_data",
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            console.log(response.length);
            var html = '';
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    html += '<tr>';
                    html += '<td>' + response[i].customer_name + '</td>';
                    html += '<td>' + response[i].shipment_date + '</td>';
                    html += '<td>' + response[i].voucher_number + '</td>';
                    html += '<td>' + response[i].status + '</td>';
                    html += '<td><a href="delivery_order_report/' + response[i].shipment_number + '" class="btn btn-info" target="_blank"><i class="material-icons" style="font-size:initial;">local_printshop</i></a></td>';
                    // html += '<td><button class="btn btn-info" id="shipment_delivery_output" voucher-number="' + response[i].voucher_number + '"><i class="material-icons" style="font-size:initial;">local_printshop</i></button></td>';
                    html += '</tr>';
                }
            } else {
                html += '<tr><td colspan="5" class="text-center">対象の伝票がありません</td></tr>';
            }
            $('.shipment_popup_data').html(html);
        }
    });
}

function received_popup_data() {
    var vendor_id = $('.v_ids_v').val();
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        type: "POST",
        url: "receive_order_data_popup",
        data: {vendor_id: vendor_id},
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            console.log(response.length);
            var html = '';
            if (response.length > 0) {
                for (var i = 0; i < response.length; i++) {
                    html += '<tr>';
                    html += '<td>' + response[i].name + '</td>';
                    html += '<td>' + response[i].shipment_date + '</td>';
                    html += '<td>' + response[i].voucher_number + '</td>';
                    html += '<td>' + response[i].status + '</td>';
                    html += '<td><a href="receive_order_report/' + response[i].vendor_order_id + '" class="btn btn-info" target="_blank"><i class="material-icons" style="font-size:initial;">local_printshop</i></a></td>';
                    // html += '<td><button class="btn btn-info" id="shipment_delivery_output" voucher-number="' + response[i].voucher_number + '"><i class="material-icons" style="font-size:initial;">local_printshop</i></button></td>';
                    html += '</tr>';
                }
            } else {
                html += '<tr><td colspan="5" class="text-center">対象の伝票がありません</td></tr>';
            }
            $('.receive_popup_data').html(html);
        }
    });
}

function url_search() {
    var currentURL = window.location.href;
    var url_array = currentURL.split("/");
    var url_last_element = $(url_array).last()[0];
    if($.isNumeric(url_last_element)) {
        url_last_element = url_array[url_array.length-2];
}
    return url_last_element;
}

function gross_profit_calculations() {
    var cost_price_isopen = $('.selling_price').length;
    var is_update = $('.cost_price').length;
    if (cost_price_isopen >= 1) {
        var cost_pt = 0;
        var sale_pt = 0;

        if (is_update >= 1 && cost_price_isopen >= 1) {
            if ($('.customer_basic_sale_mode_cost_price').is(':checked')) {
                cost_pt = $('.cost_price').val();
            } else {
                cost_pt = $('.sale_cost_price').val();
            }

            if ($('.customer_basic_sale_mode_sale_price').is(':checked')) {
                sale_pt = $('.selling_price').val();
            } else {
                sale_pt = $('.sale_selling_price').val();
            }

        } else {
            cost_pt = $('.selling_price').closest('tr').find('td:nth-child(8)').text();
            if ($('.customer_basic_sale_mode_sale_price').is(':checked')) {
                sale_pt = $('.selling_price').val();
            } else {
                sale_pt = $('.sale_selling_price').val();
            }

        }
        console.log(cost_pt);
        console.log(sale_pt);
        cost_pt = parseInt(cost_pt);
        sale_pt = parseInt(sale_pt);

        var g_prft_open = sale_pt - cost_pt;
        var g_prft_margn_open = g_prft_open / sale_pt * 100;
        g_prft_margn_open = g_prft_margn_open.toFixed(2);
        $('.selling_price').closest('tr').children('td:nth-child(10)').text(g_prft_open);
        $('.selling_price').closest('tr').children('td:nth-child(11)').text(g_prft_margn_open);
        console.log('ggg');
    }
    $('.customer_item_table_body tr').not('.active_edit').each(function (index, el) {

        var cost_p = $(this).children('td:nth-child(8)').text();
        var sale_p = $(this).children('td:nth-child(9)').text();
        cost_p = parseInt(cost_p);
        sale_p = parseInt(sale_p);
        console.log('eee');
        var g_prft = sale_p - cost_p;
        var g_prft_margn = g_prft / sale_p * 100;
        g_prft_margn = g_prft_margn.toFixed(2);
        $(this).children('td:nth-child(10)').text(g_prft);
        $(this).children('td:nth-child(11)').text(g_prft_margn);
    });

}

//oni
/*table sort by jan code*/
function sortTable_by_jan(table_bodys, jan_code, coll_num) {
    if (table_bodys == 'vendor_itemdata_table') {
        var rows = $('.' + table_bodys + ' tr').get();
    } else  {
        var rows = $('.order_receive_table .table-freeze-multi-original .' + table_bodys + ' tr').get();
    }

    let is_exist = 0;

    if (!isNumeric(jan_code)) {
        if (jan_code.length > 0) {
            jan_list_search_by_name(jan_code)
        }
        return false;
    }

    rows.sort(function (a, b) {
        var A = $(a).children('td').eq(coll_num).text();
        if (table_bodys == 'vendor_itemdata_table') {
            A = A.substr(A.length - jan_code.length);
        }
        if (A == jan_code) {
            is_exist = 1;
            return -1;
        }
        return 0;
    });
    $.each(rows, function (index, row) {
        $('.' + table_bodys).append(row);
    });

    setTimeout(function () {
        if (table_bodys == 'vendor_itemdata_table') {
            $('.' + table_bodys + ' tr:eq(0) td:eq(4) .v_case_inputs').select()
        }
    },100)


    close_all_navi_msg();
    show_hide_nav_icn(0);
    nav_width = '370px';
    display_positionX = '15px';
    display_positionY = '15px';
    if (is_exist) {
        success_nav = view(temporary_message['search_result_message'], def_old_nav_template_without_return_btn);
    } else {
        success_nav = view(temporary_message['search_result_message_else'], def_old_nav_template_without_return_btn);
    }


}
function sortTable_brand_ordertable(table_bodys, jan_code, coll_num) {

        var rows = $('.menual_order_receive_table .table-freeze-multi-original .' + table_bodys + ' tr').get();


    let is_exist = 0;

    rows.sort(function (a, b) {
        var A = $(a).children('td').eq(coll_num).text();
        console.log(A);
        console.log(jan_code);
        if (A == jan_code) {
            is_exist = 1;
            return -1;
        }
        return 0;
    });
    $.each(rows, function (index, row) {
        $('.' + table_bodys).append(row);
    });

   


    close_all_navi_msg();
    show_hide_nav_icn(0);
    nav_width = '370px';
    display_positionX = '15px';
    display_positionY = '15px';
    if (is_exist) {
        success_nav = view(temporary_message['search_result_message'], def_old_nav_template_without_return_btn);
    } else {
        success_nav = view(temporary_message['search_result_message_else'], def_old_nav_template_without_return_btn);
    }


}

function jan_list_search_by_name(name) {
    close_all_navi_msg();
    show_hide_nav_icn(0);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "item_search_by_name",
        type: "POST",
        dataType: "JSON",
        data: {
            name: name,
            type: '1'
        },
        success: function (response) {
            console.log(response.name_list.length);
            // console.log(name);
            var msgHtml = '';
            var btn = '';
            var mathod = "getProductFromJanMasterByName('" + name + "')";
            if (response.name_list.length > 0) {
                for (var i = 0; i < response.name_list.length; i++) {
                    msgHtml += `<li><a href="javascript:void(0)" class="pname_search" onclick="selectFromNameList('${response.name_list[i].jan}','${response.name_list[i].name}')">` + response.name_list[i].name + `</a></li>`;
                }
                btn = [{button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}];
            } else {
                msgHtml = 'このJANコードはこの画面に入ってありません。<br>';
                btn = [{
                    button: '<br><center>' +
                        // '<a href="javascript:javascript:void(0)" class="btn btn-primary" onclick="' + mathod + '">はい</a>' +
                        '<a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a>' +
                        '</center>'
                }];
            }
            const tempmsg = {
                voice_search: {
                    message: [
                        {message: msgHtml}
                    ],
                    buttons: btn
                }
            }
            nav_width = '400px';
            display_positionX = '15px';
            display_positionY = '15px';
            error_nav = view(tempmsg['voice_search'], def_center_mesg_html_template);
            show_hide_nav_icn(0);
        }
    });
}

function jan_list_search_by_name_from_master(name) {
    close_all_navi_msg();
    show_hide_nav_icn(0);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "item_search_by_name_from_jan_master",
        type: "POST",
        dataType: "JSON",
        data: {
            name: name
        },
        success: function (response) {
            close_all_navi_msg();
            console.log(response.api_data.data);
            var msgHtml = '';
            var btn = '';
            if (response.api_data.return==1 && response.api_data.data.product_list.length>0) {
                for(var i=0;i<response.api_data.data.product_list.length;i++){
                    msgHtml += `<li><a href="javascript:void(0)" class="pname_search" onclick="select_online_order('${response.api_data.data.product_list[i].jan_code}')">` + response.api_data.data.product_list[i].name + `</a></li>`;
                }
                btn = [{button: '<br><center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}];

            } else {
                msgHtml = '製品名が見つかりません<br>';
                btn = [{
                    button: '<br><center>' +
                        '<a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">戻る</a>' +
                        '</center>'
                }];

            }
            const tempmsg = {
                exceed_over_qty: {
                    message: [
                        {message: msgHtml}
                    ],
                    buttons: btn
                }
            }
            nav_width = '440px';
            display_positionX = '15px';
            display_positionY = '15px';
            error_nav = view(tempmsg['exceed_over_qty'], def_center_mesg_html_template);
            show_hide_nav_icn(0);
        }
    });
}

function select_online_order(jan) {
    $('.jan_inpts_online_order').val(jan)
    setTimeout(function () {
        $('.jan_inpts_online_order').trigger('blur')
    },200)
    close_all_navi_msg();
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function selectFromNameList(value,name='') {
    var page_url = url_search();
    if(page_url=='receiveorder' || page_url=='receiveorder#'){
        $('.recive_order_page_jn').val(value)
        $('#new-id').val(value)
        setTimeout(function () {
            $('.recive_order_page_jn').trigger('blur')
        }, 200)
    }else if(page_url=='brand-order' || page_url=='brand-order#'){
        
        sortTable_brand_ordertable('brand_order_tble', name, 0);
    }else{

    }
}

// oni

function sortTable_by_incompany_code(table_bodys, jan_code, coll_num) {
    var rows = $('.' + table_bodys + ' tr').get();
    rows.sort(function (a, b) {

        //var A = $(a).children('td').eq(coll_num).text();
        var A = $(a).children('td').find('.v_in_company_code').val();
        A = A.substr(A.length - 13);
        if (A == jan_code) {
            return -1;
        }
        return 0;

    });
    $.each(rows, function (index, row) {
        $('.' + table_bodys).append(row);
    });
}

function pl_custom_date_popup(action_type) {


    nav_width = '390px';
    display_positionX = '15px';
    display_positionY = '15px';
    if (action_type == 1) {
        nav_list[goto_vendor_sheet_step_1].hide();
        goto_vendor_sheet_step_2 = view(temporary_message['vendor_managementsheetnavi_2'], def_old_nav_template_custom_close);
    } else {
        nav_list[goto_customer_sheet_step_1].hide();
        goto_customer_sheet_step_2 = view(temporary_message['customer_managementsheetnavi_2'], def_old_nav_template_custom_close);
    }
    show_hide_nav_icn(0);


}

function management_sheet_date_confirmations(action_type) {
    var gt_from_dates = $('.from_dates').val();
    var gt_to_dates = $('.to_dates').val();
    var gt_from_datesss = $('.from_dates').val();
    var gt_to_datessss = $('.to_dates').val();
    gt_from_dates = gt_from_dates.split('年').join(',').split('月').join(',').split('日').join(',').split(',');
    gt_to_dates = gt_to_dates.split('年').join(',').split('月').join(',').split('日').join(',').split(',');
    var from_year = gt_from_dates[0]; //$('#from_year').val();
    var from_month = gt_from_dates[1]; //$('#from_month').val();
    var from_day = gt_from_dates[2]; //$('#from_day').val();

    var to_year = gt_to_dates[0]; //$('#to_year').val();
    var to_month = gt_to_dates[1]; //$('#to_month').val();
    var to_day = gt_to_dates[2]; //$('#to_day').val();
    var jcs_from_date = from_year + '-' + from_month + '-' + from_day;
    var jcs_to_date = to_year + '-' + to_month + '-' + to_day;
    var jcs_from_datess = from_year + '/' + from_month + '/' + from_day;
    var jcs_to_datess = to_year + '/' + to_month + '/' + to_day;
    var dateFroms = new Date(from_year, from_month, from_day); //Year, Month, Date

    var dateTos = new Date(to_year, to_month, to_day); //Year, Month, Date
    console.log(dateFroms);
    console.log(dateTos);
    console.log(jcs_from_date);
    console.log(jcs_to_date);
    var csrf_token = $('meta[name="csrf-token"]').attr('content');
    const temporary_message_custms = {
        vendor_managementsheetnavi_3: {
            message: [
                {message: '買掛集計の期間設定を'},
                {message: gt_from_datesss + '～' + gt_to_datessss + ' に 設定しました。'},
            ],
            buttons: [
                {button: '<center><form action="vendormangementsheet" method="POST"><input name="_token" type="hidden" value="' + csrf_token + '"/><input type="hidden" name="from_dte" value="' + jcs_from_datess + '"><input type="hidden" name="t_dte" value="' + jcs_to_datess + '"><button type="submit" class="btn btn-info">確認</button></form></center>'}
            ],
            top_return_btn_buttons: [
                {return_button: ' <button class="btn btn-danger close_sheet_v_nav_3 float-right">戻る</button>'}
            ]
        },
        customer_managementsheetnavi_3: {
            message: [
                {message: '売掛集計の期間設定を'},
                {message: gt_from_datesss + '～' + gt_to_datessss + ' に 設定しました。'},
            ],
            buttons: [
                {button: '<center><form action="shipmentmangementsheet" method="POST"><input name="_token" type="hidden" value="' + csrf_token + '"/><input type="hidden" name="from_dte" value="' + jcs_from_datess + '"><input type="hidden" name="t_dte" value="' + jcs_to_datess + '"><button type="submit" class="btn btn-info">確認</button></form></center>'}
            ],
            top_return_btn_buttons: [
                {return_button: ' <button class="btn btn-danger close_sheet_c_nav_3 float-right">戻る</button>'}
            ]
        },
    };


    nav_width = '450px';
    display_positionX = '15px';
    display_positionY = '15px';
    if (action_type == 1) {
        nav_list[goto_vendor_sheet_step_2].hide();
        goto_vendor_sheet_step_3 = view(temporary_message_custms['vendor_managementsheetnavi_3'], def_old_nav_template_custom_close);
    } else {
        nav_list[goto_customer_sheet_step_2].hide();
        goto_customer_sheet_step_3 = view(temporary_message_custms['customer_managementsheetnavi_3'], def_old_nav_template_custom_close);
    }
    show_hide_nav_icn(0);
}

function manual_order_exe2() {
    var c_name = $('.jcs_main_hand_title').text();
    nav_list[manual_order_exe_step_1].hide();


    /*order exe*/
    var manual_order_arr = [];
    $('.cmn_o_d_qty').each(function (index, value) {
        var shop_id = $(this).attr('data_shop_id');
        var input_type = $(this).attr('data_input_type');
        var quantity = $(this).val();
        if (quantity != '') {
            manual_order_arr.push({shop_id: shop_id, input_type: input_type, quantity: quantity});
        }

    });
    console.log(manual_order_arr);

    var customer_id = $('.c_ids_v').val();
    var manual_order_status = $('.customer_manual_order_status').val();
    var jan = $('.cmn_o_d_qty').closest('tr').attr('data_jan');
    if (manual_order_arr.length < 1) {

        const tempmsg = {
            exceed_overs_qty: {
                message: [
                    {message: '数量を入力してください'}
                ],
                buttons: [{button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
            }
        }
        nav_width = '300px';
        display_positionX = '15px';
        display_positionY = '15px';
        error_nav = view(tempmsg['exceed_overs_qty'], def_center_mesg_template);
        show_hide_nav_icn(0);
        return false;
    }

    if (manual_order_status == '0') {
        return false;
    }

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        type: "POST",
        url: "customer_manul_order_insert_by_jan_code",
        data: {customer_id: customer_id, jan: jan, manual_order: manual_order_arr},
        dataType: "JSON",
        success: function (response) {

            console.log(response);
            get_manual_order_item();
        }
    });
    /*order exe*/
    show_hide_nav_icn(1);
    /*
        nav_width = '390px';
        display_positionX = '15px';
        display_positionY = '15px';
        manual_order_exe_step_2 = view(temporary_message['manual_orders_exe_step_2'], def_center_mesg_template);
        */
}

function manual_order_exe2_backups() {
    var c_name = $('.jcs_main_hand_title').text();
    nav_list[manual_order_exe_step_1].hide();
    show_hide_nav_icn(0);

    /*order exe*/
    var delivery_qty = $('.active_order_qty').val();
    var shipment_qty = $('.active_shipment_qty').val();
    var inputs_type = $('.active_order_qty').attr('field_type');
    var shipment_inputs_type = $('.active_shipment_qty').attr('field_type');
    var customer_item_id = $('.active_order_qty').closest('tr').find('.gett_attr').attr('customer_item_id');
    var customer_id = $('.active_order_qty').closest('tr').find('.gett_attr').attr('customer_id');
    if (delivery_qty == '') {
        const tempmsg = {
            exceed_overs_qty: {
                message: [
                    {message: 'please input quantity'}
                ],
                buttons: [{button: '<center><a href="javascript:close_default_page_navi(909)" class="btn btn-primary rsalrtconfirms">確認</a></center>'}]
            }
        }
        nav_width = '300px';
        display_positionX = '15px';
        display_positionY = '15px';
        error_nav = view(tempmsg['exceed_overs_qty'], def_center_mesg_template);
        show_hide_nav_icn(0);
        $(this).val('');
        return false;
    }

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        type: "POST",
        url: "customer_manul_order_insert",
        data: {
            delivery_qty: delivery_qty,
            shipment_qty: shipment_qty,
            shipment_inputs_type: shipment_inputs_type,
            inputs_type: inputs_type,
            customer_id: customer_id,
            customer_item_id: customer_item_id
        },
        dataType: "JSON",
        success: function (response) {
            $('.sum_of_o_qty').removeClass('active_order_qty');
            console.log(response);
        }
    });
    /*order exe*/


    nav_width = '390px';
    display_positionX = '15px';
    display_positionY = '15px';
    manual_order_exe_step_2 = view(temporary_message['manual_orders_exe_step_2'], def_center_mesg_template);
}

function goto_shipment_page() {
    nav_list[manual_order_exe_step_2].hide();
    window.location.href = Globals.base_url + 'shipment'
}

var home_nav1;
var vendor_master_default_nav;
var customer_master_default_nav;
var customer_master_default_nav2;
var receiveorderdefault_nav;
const message_notify_default = {

    home_page_default_notifications: {
        message: [
            { message: '1~3のボタンを押し,<br>業務を選んでください。' }
        ],
        buttons: [
            { button: '<center><a href="javascript:close_default_page_navi(1)" class="btn btn-primary rsalrtconfirms">確認</a></center>' }
        ]
    },
    vendor_master: {
        message: [
            { "message": '<button type="button" class="btn btn-warning v_new_item_btn_popup add_new_item pull-right">登録</button> 商品のマスター登録ができます。' },
            { "message": '<button type="button" class="btn btn-primary edits_vendor_item" vendor_item_edit_enable="0">修正</button> 商品の修正ができます。' },
            { "message": '<button type="button" class="btn btn-danger deletes_vendor_item" vendor_item_delete_enable="0">削除</button> 商品の削除ができます。' },
            { "message": '<button type="button" class="btn btn-secondary vendor_list_show_popup">仕入先一覧</button> 仕入先の登録ができます。' }
        ]
    },
    vendor_master2: {
        message: [
            { message: '<button class="btn btn-success vendor_list_show_popup">仕入先登録</button>で仕入先の登録ができます。' },
            { message: '音声ボタンで検索出来ます' }
        ],
        buttons: [
            { button: '<center><button class="btn btn-primary vendor_list_show_popup">仕入先一覧</button><a href="customer_master" class="btn btn-primary">販売先一覧</a></center>' }
        ]
    },
    customer_master: {
        message: [
            { "message": '<button type="button" data_customer_list_item_id="0" class="btn btn-warning add_customer_item pull-right">登録</button> 商品のマスター登録ができます。' },
            { "message": '<button type="button" data_customer_list_item_id="0" class="btn btn-primary edits_customer_item pull-right">修正</button> 商品の修正ができます。' },
            { "message": '<button type="button" data_customer_list_item_id="0" class="btn btn-danger deletes_customer_item pull-right">削除</button> 商品の削除ができます。' },
            { "message": '<button type="button" class="btn btn-secondary customer_list_show_popup">販売先一覧</button> 販売先の登録ができます。' }
        ]
    },
    customer_master2: {
        message: [
            { "message": "販売先ごとの見積作成を 行ってください。" }
        ],
        buttons: [
            { button: '<center><button class="btn btn-primary customer_list_show_popup">販売先別</button></center>' }
        ]
    },
    customer_master_extra: {
        message: [
            { "message": "商品の追加登録ができます。" },
            { "message": "１、ＪＡＮ入力（左上）" },
            { "message": "２、ハンディやスマホでスキャン入力" },
        ],
    },

    receiveorder: {
        message: [
            { "message": '在庫が発注点より少ない場合は、一定数を発注します。' },
            { "message": '発注点及び、発注ロットは自由に設定できます。' },
            { "message": '発注点と発注ロットを一度設定すると、次回から設定に 従って自動発注できます。' },
            { "message": '<button type="button" data_order_confirm_item_id="0" class="btn btn-primary update_order_received">修正</button> 商品設定の修正ができます。（発注点など）' },
            { "message": '<button type="button" data_order_confirm_item_id="0" class="btn btn-secondary vendor_list_show_popup">仕入先一覧</button> 仕入先の選択をします。' },
            { "message": '<button type="button" data_order_confirm_item_id="0" class="btn btn-warning order_confirm">仕入発注</button> 発注が確定します。' },
            { "message": '<button type="button" data_order_confirm_item_id="0" class="btn btn-info received_order_pdf_modal">入荷伝票出力</button> 入荷伝票が出ます。' },
        ]
    },
    receiveorder2: {
        message: [
            { "message": "在庫(A)が発注点(X)より少ない場合（黄色）は一定数(Y)を発注します。" },
            { "message": "発注点(X)及び、発注ロット(Y)は自由に設定できます。" },
            { "message": "発注点と発注ロットを一度設定すると、次回から設定に従って 自動発注できます。" }
        ],
        buttons: [
            { button: '<center><button class="btn btn-warning receive_order_dflt_nav_btn">発注一覧表</button></center>' }
        ]
    },
    vendor_arrival_inserted: {
        message: [
            { "message": "正常に終了しました。" },
            { "message": "管理表で確認できます。" },
        ],
        buttons: [
            { button: '<center><button data_goto="1" class="btn btn-warning goto_sheet_screen btn-lg">買掛管理</button><button data_goto="2" class="btn btn-success goto_sheet_screen btn-lg">売掛管理</button></center>' }
        ]
    },
    shipment: {
        message: [
            { "message": '在庫を照合して、自動で確定します。' },
            { "message": '<a href="manualOrder" class="btn btn-warning pull-right"> 手書き受注</a> ＦＡＸ受注を手書きします。' },
            { "message": '<button class="btn btn-success">受注データ取込</button><input type="file" id="shipment_csv_input_nav" name="shipment_csv" accept=".csv"> オンライン受注を取込みます。' },
            { "message": ' <button class="btn btn-info delivery_output">出荷伝票出力</button></form> 出荷伝票を出力します。' },
            { "message": '<button class="btn btn-secondary customer_list_show_popup">販売先一覧</button> 販売先の選択をします。' },
        ]
    },
    shipment2: {
        message: [
            { "message": "販売先を選択してください。" }
        ],
        buttons: [
            { button: '<center><button class="btn btn-primary customer_list_show_popup">販売先</button></center>' }
        ]
    },

    manualOrder: {
        message: [
            { "message": '販売先を選択してください。' },
            { "message": '伝票番号を入力し、納品日を選択してください。' },
            { "message": '<button type="button" class="btn btn-primary add_new_rows">商品追加</button> ができます。' },
            { "message": '受注の入力が終わりましたら、 <button type="button" class="btn btn-success save_all_menual_order">完了</button> を押してください。' }
        ]
    },
    manualOrder2: {
        message: [
            { "message": "「オンライン受注・確定」と「手書入力・確定」は、タイトルを押せば交互に切り替わります。" },
            { "message": "販売先を選んでください。" },
            { "message": "在庫を照合して、自動で確定します。" }

        ],
        buttons: [
            { button: '<center><button class="btn btn-warning customer_list_show_popup">販売先 一覧</button></center>' }
        ]
    },


    vendormangementsheet: {
        message: [
            { "message": '<button type="button" class="btn btn-secondary vendor_list_show_popup">仕入先一覧</button> を押して、仕入れ先ごとの買掛金が見れます。' },
            { "message": '開始日と終了日で、期間設定ができます。' },
            { "message": '買掛金の出金処理を行います。' }
        ]
    },
    vendormangementsheet2: {
        message: [
            { "message": "金額順に表示しています。取引先名を押すと、明細が見れます" }

        ],
        buttons: [
            { button: '<center><button class="btn btn-default rsalrtconfirms">確認</button></center>' }
        ]
    },
    vendormangementsheet21: {
        message: [
            { "message": "0000000000000000000000000000000" }

        ],
        buttons: [
            { button: '<center><button class="btn btn-default rsalrtconfirms">確認</button></center>' }
        ]
    },

    shipmentmangementsheet: {
        message: [
            { "message": '販売先ごとの入金処理を行います。' },
            { "message": '開始日と終了日を選択して、期間を指定できます。' },
            { "message": '<button type="button" class="btn btn-secondary customer_list_show_popup">販売先一覧</button> 販売先ごとの売掛金を表示します。' },
            { "message": '<button data_type="1" class="btn btn-primary show_invoice_table">請求設定</button> 請求の各設定ができます。' },
            { "message": '<button data_type="2" class="btn btn-success create_invoice shipment_invoice">請求書発行</button> 請求書の発行を行います。' },
        ]
    },
    shipmentmangementsheet2: {
        message: [
            { "message": "金額順に表示しています。取引先名を押すと、明細が見れます" }

        ],
        buttons: [
            { button: '<center><button class="btn btn-default rsalrtconfirms">確認</button></center>' }
        ]
    },

    shipmentconfirmation: {
        message: [
            { "message": '販売先を選択してください。' },
            { "message": '伝票番号を入力し、納品日を選択してください。' },
            { "message": '<button type="button" class="btn btn-success save_all_shipmentconfirmation_order">完了</button> を押すと、受注が確定します。' },
        ]
    },
    shipmentconfirmation2: {
        message: [
            { "message": "shipment confirmation notifications" }

        ],
        buttons: [
            { button: '<center><button class="btn btn-default rsalrtconfirms">確認</button></center>' }
        ]
    },

    warehouse: {
        message: [
            { "message": '<button type="button" class="btn btn-secondary warehouse_list_show">倉庫一覧</button> 登録・設定ができます。' },
        ]
    },
    warehouse2: {
        message: [
            { "message": "warehouse notifications" }

        ],
        buttons: [
            { button: '<center><button class="btn btn-default rsalrtconfirms">確認</button></center>' }
        ]
    },

    default_old: {
        message: [
            { "message": "default notifications" }
        ]
    },
    default_old2: {
        message: [
            { "message": "default notifications" }

        ],
        buttons: [
            { button: '<center><button class="btn btn-default rsalrtconfirms">確認</button></center>' }
        ]
    },
}
$(document).ready(function() {
    show_default_page_notifications();
    $(document).delegate('#close_sup_list_msg', 'click', function(event) {
        show_hide_default_navigation(0, 1);
    });

    $(document).delegate('.navIcon', 'click', function(event) {
        $('#nav_icon').show();
        $('#nav_icon').css('opacity', 0);
        nav_list['jn_0'].show();
        //show_default_page_notifications();
    });

    $(document).delegate('#close_yes_no_navi', 'click', function(event) {
        show_hide_default_navigation(0, 1);
        $('#yes_no_navigation_message').removeClass('show').addClass('hide');
        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
        $('#editablebg_modal').removeClass('show').addClass('hide');
        $('#success_error_confirmation_modal').modal('hide');
        $('#yes_no_confirmation_modal').modal('hide');
    });
    $(document).delegate('#close_success_error_navi', 'click', function(event) {
        $('#success_error_confirmation_popup').removeClass('show').addClass('hide');
    });

    $(document).delegate('#close_yesno_navi', 'click', function(event) {
        $('#yes_no_navigation_message').removeClass('show').addClass('hide');
    });

    $(document).delegate('#close_editablebg_modal_navi', 'click', function(event) {
        $('#editablebg_modal').removeClass('show').addClass('hide');
    });


});

function show_default_page_notifications() {
    var url_last_element = url_search();
    switch (url_last_element) {

        case 'home':
            nav_width = '250px';
            home_nav1 = view(message_notify_default['home_page_default_notifications'], def_center_mesg_template);
            break;
        case 'vendor_master':
            nav_width = '500px';
            display_positionY = '15px';
            display_positionX = '15px';
            vendor_master_default_nav = view(message_notify_default['vendor_master2'], def_old_nav_template);
            break;
        case 'brand-order':
            close_all_navi_msg();
            show_hide_nav_icn(0);
            get_customer_list();
            $('#customer_message_success').html('');
            $("#add_customer_message").html('');
            $("#update_customer_message_fail").html('');
            $("#customer_show_modal").modal("show");
         break;
        case 'customer_master':
            nav_width = '280px';
            display_positionY = '15px';
            display_positionX = '15px';
            customer_master_default_nav = view(message_notify_default['customer_master2'], def_center_mesg_template);
            // nav_width = '350px';
            // display_positionY = '15px';
            // display_positionX = '320px';
            // customer_master_default_nav2 = view(message_notify_default['customer_master_extra'], def_left_list_mesg_template);
            break;
        case 'receiveorder':
            if (Globals.session_message_text != null) {
                if (Globals.session_message_text == 'arrival_inserted') {
                    nav_width = '390px';
                    display_positionX = '15px';
                    display_positionY = '15px';
                    receiveorderdefault_nav = view(message_notify_default['vendor_arrival_inserted'], def_center_mesg_template);
                }
            } else {
                nav_width = '500px';
                display_positionY = '15px';
                display_positionX = '15px';
                receiveorderdefault_nav = view(message_notify_default['receiveorder2'], def_old_nav_template_without_return_btn);
            }
            break;
        case 'manualOrder':
            var sample_nav33 = view(message_notify_default['manualOrder2'], def_old_nav_template_without_return_btn, function() {
                console.log('page nav');
            })
            break;
        case 'onlineorder':
            var sample_nav33 = view(message_notify_default['manualOrder2'], def_old_nav_template_without_return_btn, function() {
                console.log('page nav');
            })
            break;

        case 'shipment':
            var sample_nav3 = view(message_notify_default['shipment2'], def_center_mesg_template, function() {
                console.log('page nav');
            })
            break;
        case 'vendormangementsheet':
            nav_width = '306px';
            display_positionX = '15px';
            display_positionY = '15px';
            var sample_nav34 = view(message_notify_default['vendormangementsheet2'], def_center_mesg_template, function() {
                console.log('page nav');
            })
            break;
        case 'vendor_order_detail_by_tonya':
            nav_width = '306px';
            display_positionX = '15px';
            display_positionY = '15px';
            var sample_nav341 = view(message_notify_default['vendormangementsheet21'], def_center_mesg_template, function() {
                console.log('page nav');
            })
            break;
        case 'shipmentmangementsheet':
            nav_width = '306px';
            display_positionX = '15px';
            display_positionY = '15px';
            var sample_nav35 = view(message_notify_default['shipmentmangementsheet2'], def_center_mesg_template, function() {
                console.log('page nav');
            })
            break;
        case 'shipmentconfirmation':
            var sample_nav36 = view(message_notify_default['shipmentconfirmation2'], def_center_mesg_template, function() {
                console.log('page nav');
            })
            break;
        case 'warehouse':
            var sample_nav37 = view(message_notify_default['warehouse2'], def_center_mesg_template, function() {
                console.log('page nav');
            })
            break;
        default:
            // var sample_nav38 = view(message_notify_default['default_old'], def_center_mesg_template, function() {
            //     console.log('page nav');
            // })
            break;
    }
}

function close_default_page_navi(page_id) {
    switch (page_id) {
        case 1:
            nav_list[home_nav1].hide();
            break;
        case 404:
            nav_list[error_nav].hide();
            show_hide_nav_icn(1);
            break;
        case 101:
            nav_list[success_nav].hide();
            show_hide_nav_icn(1);
            break;
        case 909:
            nav_list[error_nav].hide();
            show_hide_nav_icn(1);
            break;
        case 808:
            nav_list[manual_order_exe_step_1].hide();
            show_hide_nav_icn(1);
            break;
        case 8010:
            nav_list[manual_order_exe_step_2].hide();
            show_hide_nav_icn(1);
            break;
        case 4041:
            nav_list[receive_order_step_1_nav].hide();
            //show_default_page_notifications();
            nav_list['jn_0'].show();
            show_hide_nav_icn(0);
            break;
        case 4042:
            nav_list[receive_order_step_2_nav].hide();
            nav_list[receive_order_step_1_nav].show();
            show_hide_nav_icn(0);
            break;
        case 4043:
            nav_list[receive_order_step_3_nav].hide();
            nav_list[receive_order_step_2_nav].show();
            show_hide_nav_icn(0);
            break;
        case 4044:
            nav_list[receive_order_step_4_nav].hide();
            nav_list[receive_order_step_3_nav].show();
            show_hide_nav_icn(0);
            break;
        default:
            break;
    }
}
// html div ID
const def_id = 'jacos_nav';
var nav_width = '500px';
const z_index = '9999';
var display_positionY = '15px';
var display_positionX = '15px';
var nav_id;
var nav_num = 0;
var nav_list = [];
var winScrollTop;

const def_new_nav = `
<div class="jn" id="{{{nav_id}}}"></div>
`

/*
    popup templete design
*/
const def_nav_template = `
<div class="card card-warning jn_popup">
    <div class="card-body">
        <ul>
            {{#message_list}}
            <li>{{{message}}}</li>
            {{/message_list}}
        </ul>
        {{#button_list}}
            {{{button}}}
        {{/button_list}}
    </div>
</div>
`;
/*
    old popup templete design
*/
const def_old_nav_template = `
<div class="card card-warning jn_old_popup ">
    <div class="card-heading">
        <a class="btn btn-light float-right" href="javascript:history.back();">戻る</a>
    </div>
    <div class="card-body">
        <ol>
            {{#message_list}}
            <li>{{{message}}}</li>
            {{/message_list}}
        </ol>
            {{#button_list}}
                {{{button}}}
            {{/button_list}}
    </div>
</div>
`;

const def_old_nav_template_custom_close = `
<div class="card card-warning jn_old_popup ">
    <div class="card-heading">
        {{#top_return_btn_list}}
            {{{return_button}}}
        {{/top_return_btn_list}}
    </div>
    <div class="card-body">
        <ul class="custm_uls">
            {{#message_list}}
            <li>{{{message}}}</li>
            {{/message_list}}
        </ul>
            {{#button_list}}
                {{{button}}}
            {{/button_list}}
    </div>
</div>
`;

const def_modal_template = `
<div class="modal" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body" id="{{{modal_nav_id}}}">
            </div>
        </div>
    </div>
</div>
`

const def_nav_icon = `
<div id="nav_icon" class="navIcon" style="width: 50px; height: 50px; padding: 4px; margin: 10px; opacity: 1;display:none" >
    <img src="https://ryutu-van.dev.jacos.jp/shacho/public/backend/images/others/navigate.png" width="50" alt="no nav">
</div>
`

const def_center_mesg_template = `
<div class="card card-warning jn_popup" style="background:rgb(255, 235, 255)">
    <div class="card-body">
        <ul>
            {{#message_list}}
            <p class="text-center popup_center_message" style="margin-bottom:0;">{{{message}}}</p>
            {{/message_list}}
        </ul>
        {{#button_list}}
            {{{button}}}
        {{/button_list}}
    </div>
</div>
`;
const def_center_mesg_html_template = `
<div class="card card-warning jn_popup" style="background:rgb(255, 235, 255)">
    <div class="card-body default_pop_up_template">
    {{#message_list}}
    {{{message}}}
    {{/message_list}}
    {{#button_list}}
    {{{button}}}
{{/button_list}} 
    </div>
</div>
`;

const def_left_list_mesg_template = `
<div class="card card-warning jn_popup" style="background:rgb(255, 235, 255)">
    <div class="card-body">
        <ul>
            {{#message_list}}
            <p class="text-left popup_left_message" style="margin-bottom:0;">{{{message}}}</p>
            {{/message_list}}
        </ul>
        {{#button_list}}
            {{{button}}}
        {{/button_list}}
    </div>
</div>
`;

const def_old_nav_template_without_return_btn = `
<div class="card card-warning jn_old_popup " style="background:rgb(255, 235, 255)">
    <div class="card-body">
        <ol>
            {{#message_list}}
            <li>{{{message}}}</li>
            {{/message_list}}
        </ol>
            {{#button_list}}
                {{{button}}}
            {{/button_list}}
    </div>
</div>
`;
// init
$(function () {
    // ナビアイコン表示
    $('#' + def_id).append(Mustache.render(def_nav_icon));

});

// Jacos Navigation popup
// ナビ作成
function create_nav() {
    nav_id = 'jn_' + nav_num;
    // 通常
    // render
    var html = Mustache.render(def_new_nav, { "nav_id": nav_id });
    $('#' + def_id).append(html);

    $('#' + nav_id).css({
        "z-index": z_index,
    });

    // オブジェクト格納
    var nav_obj = new jacos_nav(nav_id);
    // nav_list.push({ nav_id: nav_obj });
    nav_list[nav_id] = nav_obj;

    // del_nav_id_list();
    nav_num++;
    return nav_id;
}
// Jacos Navigation popup
// ナビ作成
function attach_content(nav_id, data, template, callback) {
    // 通常
    var m_data = {
        "message_list": data['message'],
        "button_list": data['buttons'],
        "top_return_btn_list": data['top_return_btn_buttons'],
    }
    // render
    var html = Mustache.render(template, m_data);
    // html append
    $('#' + nav_id).append(html);


    if (callback != null) callback();
}

// ナビ表示
function view(data, template = def_nav_template, callback) {

    // 新規ナビ作成
    var nav_id = create_nav();
    $('#' + nav_id).css({
        "width": nav_width,
        "right": display_positionX,
        "bottom": display_positionY,
    });

    // ナビコンテンツ作成
    attach_content(nav_id, data, template, callback);
    nav_list[nav_id].show();

    return nav_id;
}


// ナビ表示
function view_modal(data, template = def_nav_template, callback) {

    var nav_id = create_nav();
    // set modal
    var no = nav_list[nav_id];
    no.set_modal();
    var modal_nav_id = 'modal_' + nav_id;
    // モーダルセット
    var html = Mustache.render(def_modal_template, { 'modal_nav_id': modal_nav_id });
    $('#' + nav_id).append(html);


    // ナビコンテンツ作成
    attach_content(modal_nav_id, data, template, callback);
    $('#' + modal_nav_id + '>.card').css({
        width: nav_width,
        right: display_positionX,
        bottom: display_positionY,
        position: 'fixed'
    });

    $('#' + nav_id).on('hidden.bs.modal', function () {
        no.hide();
    });

    // // スクロール位置取得
    winScrollTop = $(window).scrollTop();
    no.show();

    return nav_id;
}

function nav_hidden() {
    console.log('nav hide');
    // 重複登録防止(name space付き)
    $('.jn').off('hidden.bs.modal.del_nav');
    // list 削除準備
    $('.jn').on('hidden.bs.modal.del_nav', function () {
        var nav_icon_flg = false;
        nav_list.forEach((item, index) => {
            if ($('#' + item).css('display') == 'block') {
                // 表示されている場合の処理
                console.log('display block');

            } else {
                // 非表示の場合の処理
                nav_icon_flg = true;
                console.log('display none');
                return false;
            }
        });

        // 全ナビ終了
        if (nav_icon_flg !== true) {
            console.log('view_nav_icon');
            view_nav_icon();
        }
    });
}

function view_nav_icon() {
    // ナビアイコン動作
    $('#nav_icon').show();
    // 全ナビ表示
    $('#nav_icon').on('click', function () {
        nav_list.forEach((item, index) => {
            if (item.get_display_status) {
                // 表示あり
                item.show();
            }
        });
    });

}

function nav_close_callback(nav_id, callback) {
    $('#' + nav_id).on('hidden.bs.modal', function () {
        callback();
    });
}

// ナビリスト
function get_nav_list() {
    return nav_list;
}

class jacos_nav {
    nav_id;
    modal_flg;

    constructor(nav_id) {
        this.nav_id = nav_id;
        this.modal_flg = false;
    }

    set_modal() {
        this.modal_flg = true;
    }

    get_nav_id() {
        return this.nav_id;
    }

    show() {
        $('#' + this.nav_id).addClass('nav_disp');
        if (this.modal_flg) {
            // modal
            $('#' + this.nav_id + '>.modal').modal('show');
        }
    }

    hide() {
        $('#' + this.nav_id).removeClass('nav_disp');
        if (this.modal_flg) {
            // modal
            $('#' + this.nav_id + '>.modal').modal('hide');
        }

        // nav check
        nav_list.forEach((item, index) => {
            if (item.get_display_status) {
                // 表示あり
                return false;
            }
        });
        // 表示なしの場合 nav_icon
        view_nav_icon();


    }

    get_display_status() {
        if ($('#' + this.nav_id).hasClass('nav_disp')) {
            return true;
        } else {
            return false;
        }
    }

    // 削除
    del_nav() {
        $('#' + this.nav_id).remove();
    }
}
const message = {
    m1: {
        message: [
            { message: '<button class="btn btn-success">仕入先登録</button>で仕入先の登録ができます。' },
            { message: '<button class="btn btn-success">販売先登録</button> で販売先の登録ができます。' },
            { message: '商品の登録ができ、商品マスターを作成します。<button class="btn btn-warning">登録</button>' },
            { message: '取引先別のマスターを確認するには、<br>このボタンを押してください。' }
        ],
        buttons: [
            { button: '<center><button class="btn btn-primary">仕入先別</button><button class="btn btn-primary">販売先別</button></center>' }
        ]
    },
    m2: {
        message: [
            { message: '<button class="btn btn-success">aaaa</button>で仕入先の登録ができます。' },
            { message: '取引先別のマスターを確認するには、<br>このボタンを押してください。' }
        ],
        buttons: [
            { button: '<center><button class="btn btn-primary">仕入先別</button><button class="btn btn-primary">販売先別</button></center>' }
        ]
    },

};



$(function() {

    // var sample_nav1 = view(message['m1'], def_old_nav_template);
    // var sample_nav2 = view(message['m2'], def_old_nav_template);
    // var sample_nav3 = view(message['m1']);
    // display_positionY = '100px';
    // console.log(get_nav_list());
    //var sample_nav1 = view(message['m2'], def_old_nav_template);

    // var sample_nav3 = view_modal(message['m1'], def_nav_template, function() {
    //     console.log('open callback do');
    // });

    // $('#' + sample_nav3 + ' .modal').attr({
    //     'data-backdrop': 'static'
    // });
    // var sample_nav4 = view_modal(message['m2'], def_old_nav_template);

    // nav_close_callback(sample_nav3, function() {
    //     nav_list[sample_nav3].hide();
    // });

    console.log(get_nav_list());

});
(function($) {
    $.fn.hideKeyboard = function() {
        var inputs = this.filter("input").attr('readonly', 'readonly'); // Force keyboard to hide on input field.
        var textareas = this.filter("textarea").attr('disabled', 'true'); // Force keyboard to hide on textarea field.
        setTimeout(function() {
            inputs.blur().removeAttr('readonly'); //actually close the keyboard and remove attributes
            textareas.blur().removeAttr('disabled');
        }, 100);
        return this;
    };
}(jQuery));
var jan_code_store = [];
// pwa
window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('sw.js')
            .then(function (registration) {
                console.log('Registration successful, scope is:', registration.scope);
                registration.update();
                console.log('Registration Update')

            })
            .catch(function (error) {
                console.log('Service worker registration failed, error:', error);
            });
        caches.keys().then(function(cacheNames) {
            cacheNames.forEach(function(cacheName) {
                console.log(cacheName)
                caches.delete(cacheName);
                location.reload()
            });
        });
    }

}

let loader = 0

// end pwa
$('document').ready(function () {

    // loader hide
    setTimeout(function () {
        $('.loading_image_custom').hide();
    },500)
    //

    $('.receive_quantity').focus();
    $('.receive_quantity').select();

    $(document).mouseup(function (e) {
        var hide_enter_outside = $(".hide_enter_outside");
        if (!hide_enter_outside.is(e.target) && hide_enter_outside.has(e.target).length === 0) {
            hide_enter_outside.removeClass('show').addClass('hide');
        }
    });
    /*
        $('#expire_date').datepicker().keydown(function(event) {
            if (event.which === $.ui.keyCode.ENTER) {
                event.preventDefault();
                console.log('hit enter key');
                var rack_status = $('.change_rack').attr('rect_status');
                $('input,select').removeClass('active_input');
                if (rack_status == 0) {
                    $("#reck_code").focus();
                    if ($('#reck_code').hasClass('scanner')) {
                        $("#reck_code").blur();
                    }
                    $('#reck_code').addClass('active_input');
                } else {
                    $(".reck_number").focus();
                    $('.reck_number').addClass('active_input');
                }
            }
        });
    */
    $(document).delegate('.reck_number', 'change', function (e) {
        $('.reck_number').css({'border': 'none', 'box-shadow': 'none'});
        $('input,select').removeClass('active_input');
        $('#vendor_arival_insert_recv_order').focus();
        $('#vendor_arival_insert_recv_order').addClass('active_input');
    })

    $('#car_rack_code').change(function (e) {
        $('#reck_code').val($(this).val());
        // alert($('#reck_code').val())
    })
    $('.change_rack_type_').click(function (e) {
        var curr_status = parseInt($(this).attr('data_status'));

        if (curr_status == 1) {
            $(this).attr('data_status', 2);
            $('#car_rack_code').removeClass('show').addClass('hide');
            $('#reck_code').removeClass('hide').addClass('show');
            $('#reck_code').val('')
            $('#reck_code').focus()

        } else {
            $(this).attr('data_status', 1);
            $('#reck_code').removeClass('show').addClass('hide');
            $('#car_rack_code').removeClass('hide').addClass('show');
            $('#car_rack_code').val('');
        }
    })


    $('#reck_code').keypress(function (e) {
        if (e.keyCode == 13) {
            if ($(this).val() != '') {
                $('#reck_code').css({'border': 'none', 'box-shadow': 'none'});
                $('input,select').removeClass('active_input');
                $('#vendor_master_jancode').focus();
                $('#vendor_master_jancode').addClass('active_input');
            } else {
                $('input,select').removeClass('active_input');
                $('#reck_code').focus();
                $('#reck_code').addClass('active_input');
            }
        }
    })
    $("#expire_date").focus(function () {
        $('input,select,button').removeClass('active_input');
        $(this).addClass('active_input');
        $('.ui-datepicker').show();
    });
    $(".receive_quantity,#reck_code,.reck_number").focus(function () {
        $('input,select,button').removeClass('active_input');
        $(this).addClass('active_input');
    });
    $('.receive_quantity').keypress(function (e) {
        if (e.keyCode == 13) {
            order_quantity_check();
        }
    });
    $('.receive_quantity').blur(function (e) {
        order_quantity_check();
    });

    $('#vendor_master_jancode').keypress(function (e) {
        if (e.keyCode == 13) {
            search_receive_order_jan();
        }
    });

    $('#car_rack_code').keyup(function (e) {
        let rack_code = $(this).val()
        if (rack_code.length >= 3) {
            // $("#vendor_arival_insert_recv_order").click();
        }
        if (e.keyCode == 13){
            if (rack_code.length >= 3) {
                $("#vendor_arival_insert_recv_order").click();
            }
        }

    });

    $('#car_rack_code').keypress(function (e) {
        if (e.keyCode == 13) {
            // $('input,select,button').removeClass('active_input');

            // oni commented and
            // $('.receive_quantity').focus();
            // $('.receive_quantity').addClass('active_input');

            // $("#vendor_arival_insert_recv_order").focus();
            // $('#vendor_arival_insert_recv_order').addClass('active_input');

            // $("#vendor_arival_insert_recv_order").click();
            // oni commented and
        }
    });

    $('#handy_vendor_master_jancode_registration').keypress(function (e) {
        // alert(e.keyCode);
        if (e.keyCode == 13) {
            // inser_into_vendor_item_by_handy();
            var janCode = $(this).val();
            $('.mobile_code').prepend('<p>' + janCode + '</p>');
            jan_code_store.push(janCode);
            $(this).val("");
            $(this).focus();
        }
    });
    $(".case_invent_qty,.bol_invent_qty,.unit_invent_qty").focus(function () {
        $(this).select();
    });
    $('.case_invent_qty,.bol_invent_qty,.unit_invent_qty').keypress(function (e) {
        if (e.keyCode == 13) {
            $(this).blur();
        }
    });
    // $('.new_rack_entry').keypress(function (e) {
    //     if (e.keyCode == 13) {
    //         $(this).blur();
    //     }
    // });

    $('.update_rack_code_exec').focus(function (e) {
        $(this).select();
        // $(this).val('');

    });

    $('.update_rack_code_exec').keypress(function (e) {
        if (e.keyCode == 13) {
            // $(this).blur();
            let i = $(this).attr('data_j');
            i = parseInt(i)+1

            if ($('td').find('#rack'+i).length == 0){
                $('#tana-erako-button').focus()
            } else {
                $('#rack'+i).focus()
            }
        }
    });

    $('.update_rack_code_exec').keyup(function (e) {
        let val = $(this).val();
        if (val.length > 3) {
            // $(this).blur();
        }
    });

    $('.scan_tanarosi_sohin').click(function (e) {
        e.preventDefault();
        var status = 0;
        $('.new_rack_entry').each(function (i, v) {
            var new_rack_entry = $(this).val();
            var case_quantity = $(this).closest('tr').find('.case_invent_qty').val();
            var ball_quantity = $(this).closest('tr').find('.bol_invent_qty').val();
            var unit_quantity = $(this).closest('tr').find('.unit_invent_qty').val();
            if (new_rack_entry == '') {
                if (case_quantity == 0 && ball_quantity == 0 && unit_quantity == 0) {
                    status = 0;
                } else {
                    status = 1;
                    $('.handy_error_msg').text('棚番号を入力してください');
                    $('.handdy_error').removeClass('hide').addClass('show');
                    return false;
                }
            }
        });
        if (status != 1) {
            window.location.href = '/inventory-update';
        }
    });
    $('.new_rack_entry').blur(function (e) {
        e.preventDefault();
        thisRow = $(this);

        var case_quantity = thisRow.closest('tr').find('.case_invent_qty').val();
        var ball_quantity = thisRow.closest('tr').find('.bol_invent_qty').val();
        var unit_quantity = thisRow.closest('tr').find('.unit_invent_qty').val();
        var stock_item_id = thisRow.closest('tr').find('.unit_invent_qty').attr('data_attr_row_id');
        var rack_number = thisRow.val();
        var vendor_item_id = thisRow.closest('tr').find('.unit_invent_qty').attr('data_attr_v_item_id');
        var vendor_id = thisRow.closest('tr').find('.unit_invent_qty').attr('data_attr_v_id');


        let rack_values = $('.new_rack_entry').map((_, el) => el.value).get()
        let rack_check = [];
        let i = 0;
        rack_values.map(function (el) {
            if (el == rack_number) {
                rack_check[i] = el;
                i++;
            }
        })
        // console.log(rack_check)
        if (rack_check.length > 1) {
            thisRow.select();
            return false
        }

        if (case_quantity == 0 && ball_quantity == 0 && unit_quantity == 0) {
            return false;
        }

        if (rack_number == '' || rack_number.toString().length <= 3) {
            $('.handy_error_msg').text('棚番号を入力してください');
            $('.handdy_error').removeClass('hide').addClass('show');
            return false;
        }

        if (vendor_item_id == '') {
            $('.handy_error_msg').text('この商品はまだ登録されていません');
            $('.handdy_error').removeClass('hide').addClass('show');
            return false;
        }

        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "stock_inventory_rack_code_add",
            type: "POST",
            dataType: "JSON",
            data: {
                rack_number: rack_number,
                vendor_item_id: vendor_item_id,
                vendor_id: vendor_id,
                case_quantity: case_quantity,
                ball_quantity: ball_quantity,
                stock_item_id: stock_item_id,
                unit_quantity: unit_quantity
            },
            success: function (response) {
                console.log(response);
                thisRow.closest('tr').find('.case_invent_qty').attr('data_attr_row_id', response.stock_item_id);
                thisRow.closest('tr').find('.bol_invent_qty').attr('data_attr_row_id', response.stock_item_id);
                thisRow.closest('tr').find('.unit_invent_qty').attr('data_attr_row_id', response.stock_item_id);

                thisRow.closest('tr').find('.case_invent_qty').attr('data_attr_rack_number', rack_number);
                thisRow.closest('tr').find('.bol_invent_qty').attr('data_attr_rack_number', rack_number);
                thisRow.closest('tr').find('.unit_invent_qty').attr('data_attr_rack_number', rack_number);
                thisRow.prop('readonly', true);

            }
        });

    });
    $('.update_rack_code_exec').blur(function (e) {
        return false; // oni 10.02.2021
        e.preventDefault();
        thisRow = $(this);
        var case_quantity = thisRow.closest('tr').find('.case_invent_qty_rack').val();
        var ball_quantity = thisRow.closest('tr').find('.bol_invent_qty_rack').val();
        var unit_quantity = thisRow.closest('tr').find('.unit_invent_qty_rack').val();
        var stock_item_id = thisRow.closest('tr').find('.unit_invent_qty_rack').attr('data_attr_row_id');
        var rack_number = thisRow.val();
        var temp_rack = thisRow.attr('data_existing_rack');
        var vendor_item_id = thisRow.closest('tr').find('.unit_invent_qty_rack').attr('data_attr_v_item_id');
        var vendor_id = thisRow.closest('tr').find('.unit_invent_qty_rack').attr('data_attr_v_id');

        if (rack_number == '') {
            $('.handy_error_msg').text('棚番号を入力してください');
            $('.handdy_error').removeClass('hide').addClass('show');
            thisRow.val(temp_rack);
            return false;
        }

        if (rack_number.length < 4) {
            $('.handy_error_msg').text('棚番号を入力してください');
            $('.handdy_error').removeClass('hide').addClass('show');
            thisRow.val(temp_rack);
            return false;
        }

        if (vendor_item_id == '') {
            $('.handy_error_msg').text('この商品はまだ登録されていません');
            $('.handdy_error').removeClass('hide').addClass('show');
            return false;
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "stock_inventory_update_rack",
            type: "POST",
            dataType: "JSON",
            data: {
                rack_number: rack_number,
                vendor_item_id: vendor_item_id,
                vendor_id: vendor_id,
                case_quantity: case_quantity,
                ball_quantity: ball_quantity,
                stock_item_id: stock_item_id,
                unit_quantity: unit_quantity
            },
            success: function (response) {
                console.log(response);
                window.location.reload(true);

            }
        });

    });


    $('.case_invent_qty,.bol_invent_qty,.unit_invent_qty').blur(function (e) {
        e.preventDefault();
        var thisRow = $(this);
        var updated_stock_jaiko = 0;

        var case_quantity = thisRow.closest('tr').find('.case_invent_qty').val();
        var ball_quantity = thisRow.closest('tr').find('.bol_invent_qty').val();
        var unit_quantity = thisRow.closest('tr').find('.unit_invent_qty').val();

        var case_inputs = thisRow.closest('tr').find('.case_law_qty').val();
        var ball_inputs = thisRow.closest('tr').find('.bol_law_qty').val();
        var stock_item_id = thisRow.closest('tr').find('.unit_invent_qty').attr('data_attr_row_id');
        var rack_number = thisRow.closest('tr').find('.unit_invent_qty').attr('data_attr_rack_number');
        var vendor_item_id = thisRow.closest('tr').find('.unit_invent_qty').attr('data_attr_v_item_id');
        var vendor_id = thisRow.closest('tr').find('.unit_invent_qty').attr('data_attr_v_id');
        case_quantity = (case_quantity == '' ? 0 : case_quantity);
        ball_quantity = (ball_quantity == '' ? 0 : ball_quantity);
        unit_quantity = (unit_quantity == '' ? 0 : unit_quantity);
        case_inputs = (case_inputs == '' ? 0 : case_inputs);
        ball_inputs = (ball_inputs == '' ? 0 : ball_inputs);


        var rack_jaiko_total = ((parseInt(case_quantity) * parseInt(case_inputs)) + (parseInt(ball_quantity) * parseInt(ball_inputs))) + parseInt(unit_quantity);
        // thisRow.closest('tr').find('.rack_number_'+stock_item_id).text('');
        thisRow.closest('tr').find('.total_stock_rack').text('');
        thisRow.closest('tr').parent('.physicaltbody').find('.total_stock_jaiko').text('');
        thisRow.closest('tr').find('.total_stock_rack').text(rack_jaiko_total);
        console.log(rack_jaiko_total);
        $('.total_stock_rack').each(function (i, v) {

            var rack_jaiko = $(this).text();
            console.log(rack_jaiko);
            updated_stock_jaiko += parseInt(rack_jaiko);
        });
        console.log(updated_stock_jaiko);
        thisRow.closest('tr').parent('.physicaltbody').find('.total_stock_jaiko').text(updated_stock_jaiko);
        if (rack_number == '') {
            // thisRow.val('');
            // $('.handy_error_msg').text('棚番号を入力してください');
            // $('.handdy_error').removeClass('hide').addClass('show');
            return false;
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "update_stock_by_rack_by_handy",
            type: "POST",
            dataType: "JSON",
            data: {
                rack_number: rack_number,
                vendor_item_id: vendor_item_id,
                vendor_id: vendor_id,
                case_quantity: case_quantity,
                ball_quantity: ball_quantity,
                stock_item_id: stock_item_id,
                unit_quantity: unit_quantity
            },
            success: function (response) {
                console.log(response);
            }
        });
    });
    $('#scan_by_jan_for_stock_detail').keypress(function (e) {
        if (e.keyCode == 13) {
            //jan_info_jaiko_detail();
            if ($(this).val() != '') {
                document.getElementById('stock_detail_by_jan_form').submit();
            } else {
                $('.handy_error_msg').text('JANコード入力してください');
                $('.handdy_error').removeClass('hide').addClass('show');
                return false;
            }
        }
    });

    $('#scan_by_jan_for_order_receive').keypress(function (e) {

        if (e.keyCode == 13) {
            //jan_info_jaiko_detail();
            if ($(this).val() != '') {
                document.getElementById('scan_by_jan_for_order_receive').submit();
            } else {
                e.preventDefault();
                $('.handy_error_msg').text('JANコード入力してください');
                $('.handdy_error').removeClass('hide').addClass('show');
                return false;
            }

        }
    });

    $(document).delegate(".scan_bybin_search ", "click", function (e) {
        // alert();
        e.preventDefault();
        var jan_code = $('#scan_by_jan_for_stock_detail').val();

        if (jan_code != '') {
            // jan_info_jaiko_detail();
            document.getElementById('stock_detail_by_jan_form').submit();
        } else {
            $('.handy_error_msg').text('JANコード入力してください');
            $('.handdy_error').removeClass('hide').addClass('show');
            return false;
        }

    });

    // oni 26.01.2021

    $('#scan_by_jan_for_order_receive,#scan_by_jan_for_stock_detail').keyup(function (e) {
        let value = $(this).val();
        if (value.length == 13) {
            $('#stock_detail_by_jan_form').submit();
        }
    })

    $('#scan_by_jan_for_stock_detail_handy').on('keyup',function (e) {
        let _this = this
        setTimeout(function () {
            let value = $(_this).val();
            if (value.length == 13) {
                $('.scan_bybin_search_new').click();
            }
        },200)
    });

    $('#scan_by_jan_for_stock_detail_handy').on('paste',function (e) {
        let _this = this
        setTimeout(function () {
            let value = $(_this).val();
            if (value.length == 13) {
                $('.scan_bybin_search_new').click();
            }
        },200)
    })

    $('#scan_by_jan_for_stock_detail_handy').keypress(function (e) {
        // e.preventDefault()
        if (e.keyCode == 13) {
            $("#handy-navi").hide()
            if ($(this).val() != '') {
                $(".scan_bybin_search_new").click();
            } else {
                $('.handy_error_msg').text('JANコード入力してください');
                $('.handdy_error').removeClass('hide').addClass('show');
                return false;
            }
        }
    });

    $(document).delegate(".scan_bybin_search_new ", "click", function (e) {

        e.preventDefault();
        $('.loading_image_custom').show()
        if (loader == 1) {
            $('.loading_image_custom').hide()
            return false;
        } else {
            loader = 1;
        }
        var jan_code = $('#scan_by_jan_for_stock_detail_handy').val();

        if (jan_code !== '') {

            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                url: "handy_stock_detail_get_by_jan_code/" + jan_code,
                type: "GET",
                dataType: "JSON",
                success: function (response) {
                    // console.log(response);
                    loader = 0

                    if (response.status === 200) {

                        $('.loading_image_custom').hide()
                        $('#stock-inventory-show-by-jan').modal({backdrop: 'static', keyboard: false})
                        $('#handy_order_form_by_jan').html(response.view)
                        $('#handy-navi').show()
                        $('#handy-navi-body').html('<li>在庫を入れて下さい。</li><li>棚番スキャンしてください。</li>')
                        setTimeout(function () {
                            $('#case0').select();
                            $('#case0').focus();
                        }, 1000)
                    } else {
                        // $('#scan_by_jan_for_stock_detail').val('');
                        addIfProductNotFoundFrom(jan_code);
                        // $('#scan_bybin').val('');
                        // $('#scan_by_jan_for_stock_detail_handy').val('');
                        // $('.handy_error_msg').html(`JANコードりません <br> この商品を追加しますか? <center><a href="javascript:javascript:void(0)" class="btn btn-primary" onclick="addIfProductNotFoundFrom('` + jan_code + `')">はい</a><a href="javascript:void(0)" onclick="$('.hide_enter_outside').removeClass('show').addClass('hide');$('#scan_by_jan_for_stock_detail_handy').val('');;" class="btn btn-primary rsalrtconfirms">いいえ</a></center>`);
                        // $('.handdy_error').removeClass('hide').addClass('show');

                        setTimeout(function () {
                            $('#case0').select();
                            $('#case0').focus();
                        }, 1000)
                        return false;
                    }
                }
            });
            loader = 0
            $('.loading_image_custom').hide()
            // old code working ?? Oni
            // document.getElementById('stock_detail_by_jan_form').submit();
        } else {
            loader = 0
            $('.handy_error_msg').text('JANコード入力してください');
            $('.handdy_error').removeClass('hide').addClass('show');
            $('.loading_image_custom').hide()
            return false;
        }
        $('.loading_image_custom').hide()
    });
    setTimeout(function () {
        $('#scan_by_jan_for_stock_detail_handy').focus();
    }, 100)
    $(document).mouseup(function (e) {
        var container = $("#handy-navi");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });
    // end oni-dev


    $('#scan_by_shelf_number').keypress(function (e) {
        if (e.keyCode == 13) {
            store_tana_update();
        }
    });
    $('#jcs_stock_details_by_jan').keypress(function (e) {
        if (e.keyCode == 13) {
            vendor_item_insert_into_shelf();
        }
    });
    $('#shipment_master_jancode').keypress(function (e) {
        if (e.keyCode == 13) {
            search_shipment_order_jan();
        }
    });
    /*
    $('.shipment_note_1').keypress(function(e) {
        if (e.keyCode == 13) {
            shipment_note_1_check();
        }
    });
    $('.shipment_note_1').blur(function(e) {
        shipment_note_1_check();
    });
    */
    /*new code for shipment date*/
    $(".shipment_note_1").focus(function () {
        $('input,select,button').removeClass('active_input');
        $(this).addClass('active_input');
        $('.ui-datepicker').show();
    });
    $('.shipment_note_1').datepicker({
        dateFormat: 'yy/mm/dd',
        autoClose: true,
        onSelect: function (date) {

            $('input,select').removeClass('active_input');
            console.log(event.which);
            if (event.which === $.ui.keyCode.ENTER) {
                event.preventDefault();
                console.log('hit enter key');
                $('.ui-datepicker').hide();
            }
            $("#handy_shipment_item_insert").focus();
            $('#handy_shipment_item_insert').addClass('active_input');
        }
    });
    /*new code for shipment date*/
    $('.note_2').keypress(function (e) {
        if (e.keyCode == 13) {
            shipment_note_2_check();
        }
    });
    $('.note_2').blur(function (e) {
        shipment_note_2_check();
    });

    $('#vendor_arival_insert_recv_order_next').click(function () {
        let receive_quantity = $('.receive_quantity').val();
        if (receive_quantity > 0) {
            $('#tana-number-update-with-receive').modal({backdrop: 'static', keyboard: false})

            setTimeout(function () {
                $('input[name="car_rack_code_"]').focus();
                $('input[name="car_rack_code_"]').select();
                $('#car_rack_code').addClass('active_input');
            }, 1000);
        } else {
            $('.receive_quantity').focus()
        }

    })

    $('#expire_date').datepicker({
        dateFormat: 'yy/mm/dd',
        autoClose: true,
        onSelect: function (date) {

            $('input,select').removeClass('active_input');
            console.log(event.which);
            if (event.which === $.ui.keyCode.ENTER) {
                event.preventDefault();
                console.log('hit enter key');
                $('.ui-datepicker').hide();
            }
            /*
            var rack_status = $('.change_rack').attr('rect_status');
            if (rack_status == 0) {
                $("#reck_code").focus();
                if ($('#reck_code').hasClass('scanner')) {
                    $("#reck_code").blur();
                }
                $('#reck_code').addClass('active_input');
            } else {
                $(".reck_number").focus();
                $('.reck_number').addClass('active_input');
            }*/

            //oni
            // $("#vendor_arival_insert_recv_order").focus();
            // $('#vendor_arival_insert_recv_order').addClass('active_input');
            // oni

            // $('#car_rack_code').addClass('active_input');
            // $("#car_rack_code")[0].focus();


            $('#vendor_arival_insert_recv_order_next').addClass('active_input');
            $("#vendor_arival_insert_recv_order_next")[0].focus();
        }
    });
    setTimeout(function () {
        var page_url = url_search();
        switch (page_url) {
            case 'handy_order_receive':
                $("#reck_code").trigger('click');
                $("#reck_code").focus();
                $('input,select,button').removeClass('active_input');
                $('#reck_code').addClass('active_input');
                console.log('action focus');
                break;
            case 'handy_stock':
                $("#scan_by_shelf_number").trigger('click');
                $("#scan_by_shelf_number").focus();
                $('input,select,button').removeClass('active_input');
                $('#scan_by_shelf_number').addClass('active_input');
                break;
            case 'handy_order_shipment':
                $(".note_2").trigger('click');
                $(".note_2").focus();
                $('input,select,button').removeClass('active_input');
                $('.note_2').addClass('active_input');
                console.log('action focus');
                break;
            case 'inventoryentrybyhandy':
                // $("#scan_bybin").trigger('click');
                // $("#scan_bybin").focus();
                // $("#scan_bybin")[0].focus();
                // $("#scan_bybin").blur();
                $('#scan_by_jan_for_stock_detail').addClass('active_input');
                $("#scan_by_jan_for_stock_detail")[0].focus();
                break;
            case 'handy_vendor_master':
                $('#handy_vendor_master_jancode_registration').addClass('active_input');
                $("#handy_vendor_master_jancode_registration")[0].focus();

                break;
            case 'handy_order_receive_scan_jan':
                $('#scan_by_jan_for_order_receive').addClass('active_input');
                $("#scan_by_jan_for_order_receive")[0].focus();
                break;
            case 'handy_stock_update_scan_product':
                $('#scan_by_jan_for_stock_detail').addClass('active_input');
                $("#scan_by_jan_for_stock_detail")[0].focus();
                break;
            case 'handy_received_product_detail_by_jan_code':
                // oni
                // $('#car_rack_code').addClass('active_input');
                // $("#car_rack_code")[0].focus();
                // oni
                $('.receive_quantity').addClass('active_input');
                $(".receive_quantity")[0].focus();
                break;
            case 'handy_stock_product_store_rack_code':
                $('.update_rack_code_exec:first').focus();
                $('.update_rack_code_exec:first').select();
                break;
            default:

                $("#search_jan").trigger('click');
                $("#search_jan").focus();
                $("#search_jan").blur();
                $("#v_no").trigger('click');
                $("#v_no").focus();
                $("#v_no").blur();
                $("#slf_no").trigger('click');
                $("#slf_no").focus();
                $("#slf_no").blur();
                break;
        }


    }, 300);
    /*hide keyboard by jquery example */
    let _input_fields = $("input[type=number], input[type=tel], input:not([type]), select");
    let _scan_fields = $("input[type=number].scanner,input[type=tel].scanner");
    // _ignore is set to true when a scannable field actually _should_ get focus
    var _ignore = false;
    // onfocus() for relevant input fields on page
    _input_fields.focus(function () {
        // only do something if scannable fields shouldn't actually get focus
        if (!_ignore) {
            // outer is the current input field that is getting focus
            let outer = this;
            // found is set to true if the current input field is scannable
            let found = false;
            // loop through all scannable fields to see if the current input field is one of them
            _scan_fields.each(function (index) {
                // inner is one of the scannable fields, possibly the current input field
                let inner = this;
                // _field stores the current input field _if_ it is scannable
                var _field;
                // only check (and potentially reset key capture) if we have not found the current
                // input field to be one of the scannable fields (yet)
                if (!found) {
                    // check if the current input field "outer" is the currently examined
                    // scannable field "inner"
                    if (inner == outer) {
                        // the current input field is one of the scannable fields
                        // immediately remove focus to disable mobile keyboard
                        inner.blur();
                        // remember which input field we have found and disable further checks
                        _field = inner;
                        found = true;
                        var action_field = $(_field).attr('data_field_name');

                        $("input").removeClass('cinput_color');
                        $(_field).addClass('cinput_color');

                        // remove any existing keycapture (might destroy existing functionality!!!)
                        $(document).off("keypress");
                        // capture keypresses and add numbers to the input field
                        $(document).keypress(function (event) {
                            var _field = inner;
                            var fieldsname = $(_field).attr('data_field_name');

                            let keynum = event.which;
                            console.log(keynum + 'keycode');
                            if (keynum == 13) { // enter
                                switch (fieldsname) {
                                    /* page1 */
                                    case 'stock_update_reck_jan':
                                        $('.scan_bybin_search').trigger('click');
                                        // next_field_focus("b_jancode", 1);
                                        break;
                                    case 'b_jan_code':
                                        get_stock_jan_info();
                                        break;
                                    /* page2 */
                                    case 'v_numbers':
                                        vendor_order_list_by_voucher();
                                        break;
                                    case 'vjcodes':
                                        get_jan_info_from_vendor_order();
                                        break;
                                    case 'c_quantitys':
                                        $('#expire_date').focus();
                                        break;
                                    case 'bins':
                                        $('.vendor_arival_insert_recv_order').trigger('click');
                                        break;

                                    /* page3 */
                                    case 'slf_nos':
                                        get_customer_order_by_voucer();
                                        break;
                                    case 'jcodes':
                                        get_customer_order_list_data_item();
                                        break;
                                    case 'shipment_quantitys':
                                        $('#insert_shipment').trigger('click');
                                        break;
                                    /* page4 */
                                    case 'stock_check_reck_by_rack':
                                        get_handy_stock_info();
                                        break;
                                    case 'get_handy_vendor_master_jan':
                                        inser_into_vendor_item_by_handy();
                                        break;
                                    case 'get_handy_customer_master_jan':
                                        inser_into_customer_item_by_handy();
                                        break;
                                    case 'get_handy_receive_order_jan':
                                        search_receive_order_jan();
                                        break;
                                    case 'get_handy_shipment_order_jan':
                                        search_shipment_order_jan();
                                        break;
                                    case 'get_stock_detail_by_jan':
                                        get_stock_details_by_jan();
                                        break;

                                    case 'receive_order_arrival':
                                        receive_order_qty_check_new();
                                        break;

                                    case 'case_invent_receiveorder_qty':
                                        receive_order_qty_check('ケース');
                                        break;
                                    case 'bol_invent_receiveorder_qty':
                                        receive_order_qty_check('ボール');
                                        break;
                                    case 'individual_invent_receiveorder_qty':
                                        receive_order_qty_check('バラ');
                                        break;

                                    case 'case_invent_shipmentorder_qty':
                                        shipment_order_qty_check('ケース');
                                        break;
                                    case 'bol_invent_shipmentorder_qty':
                                        shipment_order_qty_check('ボール');
                                        break;
                                    case 'individual_invent_shipmentorder_qty':
                                        shipment_order_qty_check('バラ');
                                        break;
                                    case 'reck_no':
                                        $('#vendor_arival_insert_recv_order').focus();
                                        $('input,select,button').removeClass('active_input');
                                        $('#vendor_arival_insert_recv_order').addClass('active_input');
                                        break;
                                    default:
                                        break;
                                }
                            } else if (keynum == 8) {
                                console.log('backspace is found');
                                var str = $(_field).val();
                                console.log(str + 'strings');
                                str = str.toString();
                                str = str.substring(0, str.length - 1);
                                $(_field).val(str);
                            } else if ((keynum < 48) || (keynum > 57)) {
                                // not-a-number, ignore in this case
                                // if (keynum == 45 || keynum == 95) {
                                //     $(_field).val($(_field).val() + String.fromCharCode(event.which));
                                // }

                            } else {
                                // a number, add to field value
                                $(_field).val($(_field).val() + String.fromCharCode(event.which));
                                switch (fieldsname) {
                                    case 'case_invent_receiveorder_qty':
                                        receive_order_qty_check('ケース');
                                        break;
                                    case 'bol_invent_receiveorder_qty':
                                        receive_order_qty_check('ボール');
                                        break;
                                    case 'individual_invent_receiveorder_qty':
                                        receive_order_qty_check('バラ');
                                        break;
                                    case 'case_invent_shipmentorder_qty':
                                        shipment_order_qty_check('ケース');
                                        break;
                                    case 'bol_invent_shipmentorder_qty':
                                        shipment_order_qty_check('ボール');
                                        break;
                                    case 'individual_invent_shipmentorder_qty':
                                        shipment_order_qty_check('バラ');
                                    default:
                                        break;
                                }
                            }
                        });
                    } else {
                        // this is a regular field
                        // remove any existing keycapture (might destroy existing functionality!!!)
                        $(document).off("keypress");
                    }
                }
            });
        }
    });
    /*hide keyboard by jquery example */
    $(document).delegate("#close_handy_page_popup_msg", "click", function (e) {
        e.preventDefault();
        $("#navigation_message").animate({
            // width: "0px",
            opacity: 0,
            display: 'none'

        }, 500);
        // $('.goto_home').trigger('click');
        window.location.href = Globals.base_url + 'android_home';
    });
})

$('#handy_vendor_item_insert').click(function (e) {
    e.preventDefault();
    var error_jan_list = [];
    jQuery.each(jan_code_store, function (index, jan_code) {
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "get_jan_info",
            type: "POST",
            dataType: "JSON",
            data: {
                jan_code: jan_code
            },
            success: function (response) {

                var api_response = response.api_data;
                var data_resource = response.data_resource;
                if (api_response == 'invalid_jan_code') {
                    // nav_width = '300px';
                    // display_positionX = '15px';
                    // display_positionY = '15px';
                    // error_nav = view(temporary_message['invalid_jan_code'], def_center_mesg_template);
                    console.log('invalid jan code');
                    error_jan_list.push(jan_code);
                } else {
                    if (response.vendor_item_data == 1) {
                        // var rows = $('.vendor_itemdata_table tr').filter(function() {
                        //     $(this).toggle($(this).find('td:nth-child(12)').text().indexOf(jan_code) > -1);
                        //     return $(this).find('td:nth-child(12)').text().indexOf(jan_code) > -1;
                        // });

                        // return false;
                        console.log('this jan code is already registered');

                    } else {
                        console.log('do insert ' + jan_code);
                        var item_name = api_response.name;
                        var case_qty = 0;
                        var ball_qty = 0;
                        var api_maker_name = '';
                        if (data_resource == 'database') {
                            case_qty = api_response.case_inputs;
                            ball_qty = api_response.ball_inputs;
                        } else if (data_resource == 'api') {
                            api_maker_name = api_response.maker_name;
                        }
                        vendor_id = response.vendor_id;
                        var price = 100;
                        /*insert auto vendor item*/
                        var order_point_unit = 'ケース';
                        var order_point_quantity = 1;
                        var order_lot_unit = 'ケース';
                        var order_lot_quantity = 0;
                        var vendor_item_id = null;
                        var sale_price = 0;
                        var basic_start_date = '2020-01-01';
                        var basic_end_date = '2021-12-31';
                        var sale_start_date = '2020-01-01';
                        var sale_end_date = '2021-12-31';
                        data = {
                            vendor_id: vendor_id,
                            jan_code: jan_code,
                            item_name: item_name,
                            case_qty: case_qty,
                            ball_qty: ball_qty,
                            price: price,
                            vendor_item_id: vendor_item_id,
                            order_point_unit: order_point_unit,
                            order_point_quantity: order_point_quantity,
                            order_lot_unit: order_lot_unit,
                            order_lot_quantity: order_lot_quantity,
                            sale_price: sale_price,
                            basic_start_date: basic_start_date,
                            basic_end_date: basic_end_date,
                            sale_start_date: sale_start_date,
                            sale_end_date: sale_end_date,
                            api_maker_name: api_maker_name,
                        }
                        $.ajax({
                            headers: {
                                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                            },
                            type: "POST",
                            url: "add_vendor_item",
                            data: data,
                            dataType: "JSON",
                            success: function (response) {
                                var message_id = 'vendor_message';
                                var ms_message = response.message;
                                if (ms_message == "insert_success") {
                                    console.log('insert success');

                                } else if (ms_message == "update_success") {
                                    console.log('update success');
                                } else {
                                    console.log(ms_message);
                                }
                                //var vendor_name = response.vendor_name;
                                //get_vendor_list_item_by_vendor_id(0, '');
                            }
                        });
                        /*insert auto vendor item*/
                    } //else

                } //else
                console.log(response);
            }
        });

    });
    $('.mobile_code').html('');
    jan_code_store = [];
    $('#handy-navi').show()
    setTimeout(function () {

        // console.log(error_jan_list.length);
        if (error_jan_list.length > 0) {
            var eror_jans = error_jan_list.toString();
            $('.handy_error_msg').text(eror_jans + 'このJANコードはないです');
            $('.handdy_error').removeClass('hide').addClass('show');

        }
    }, 3000);


    get_vendor_list_item_by_vendor_id(0, '');

    console.log(jan_code_store + 'jan');
})


function handy_page_popup(url_last_element = null, message = "No message", font_size = 20, font_color = 'red', background_color = '#ddd', fade_out_time = 5000, display_positionX = 40, display_positionY = 0) {
    // console.log(url_last_element);
    // console.log(message);
    $('#navigation_message').css("right", display_positionY);
    $('#navigation_message').css("bottom", display_positionX);
    var html = '';
    // htm+='<div class="col-lg-3 col-md-3 col-sm-4 col-xs-8 pull-right hide" id="suppier_list_message" style="width: 300px; position: fixed; right: 10px; bottom: 10px; padding: 4px; margin: 10px;">';
    html += '<div class="panel panel-warning" style="margin-bottom: 2px; border: solid 2px rgb(56, 93, 138); box-shadow: 0 2px 6px #31B0D5;">';
    html += '<div class="panel-body" style="background:' + background_color + '">';
    html += '<p class="text-center suppier_list_message_change" style="font-size:' + font_size + 'px; color:' + font_color + ';">';
    html += message;
    html += '</p>';
    html += '<center>';
    html += '<button type="button" id="close_handy_page_popup_msg" class="btn btn-info btn-sm">確認</button>';
    html += '</center>';
    html += ' </div></div>';
    $('#navigation_message').html(html);

}

//oni
function updateInventory(index, type = 0,case_ball_inputs_set = 0) {
    if(case_ball_inputs_set == 0) {
        $('#handy-navi').show()
        $('#handy-navi-body').html('<li>在庫を入れて下さい。</li>')
        return false;
    }
    let case_input = $(".case_inputs_").val();
    let boll_input = $(".boll_inputs_").val();
    let case_quantity, ball_quantity, bara, total = 0, rack_number, vendor_item_id, stock_item_id, vendor_id;
    vendor_item_id = $('.case_invent_qty_' + index).attr('data_attr_v_item_id');
    vendor_id = $('.case_invent_qty_' + index).attr('data_attr_v_id');
    stock_item_id = $('.case_invent_qty_' + index).attr('data_attr_row_id');
    case_quantity = $('.case_invent_qty_' + index).val();
    ball_quantity = $('.bol_invent_qty_' + index).val();
    bara = $('.unit_invent_qty_' + index).val();
    rack_number = $('.case_invent_qty_' + index).attr('data_attr_rack_number');
    for (let j = 0; j <= 2; j++) {
        let case_ = $('.case_invent_qty_' + j).val();
        let ball_ = $('.bol_invent_qty_' + j).val();
        let bara_ = $('.unit_invent_qty_' + j).val();
        if (case_ && ball_ && bara) {
            let sub_total = parseInt(case_) * case_input + parseInt(ball_) * boll_input + parseInt(bara_)
            if (sub_total) {
                total = total + sub_total
            }
        }
    }

    $('.total_stock_jaiko_new').val(total)
    if (rack_number == '') {
        rack_number = $('.new_rack_entry' + index).val();
    }
    let url = type == 0 ? 'update_stock_by_rack_by_handy' : 'stock_inventory_rack_code_add';
    if (rack_number != '' && total > 0) {
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: url,
            type: "POST",
            dataType: "JSON",
            data: {
                rack_number: rack_number,
                vendor_item_id: vendor_item_id,
                vendor_id: vendor_id,
                case_quantity: case_quantity,
                ball_quantity: ball_quantity,
                stock_item_id: stock_item_id,
                unit_quantity: bara
            },
            success: function (response) {
                // console.log(response);
            }
        });
    }
}

function addIfProductNotFoundFrom(jan_code) {
    $('.loading_image_custom').show()
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_jan_info",
        type: "POST",
        dataType: "JSON",
        data: {
            jan_code: jan_code
        },
        success: function (response) {
            console.log(response);
            var api_response = response.api_data;
            var data_resource = response.data_resource;
            if (api_response == 'invalid_jan_code') {
                $('.handy_error_msg').html(`JANコードりません`);
                $('.handdy_error').removeClass('hide').addClass('show');

            } else {
                if (response.vendor_item_data == 1) {
                    console.log('this jan code is already registered');
                    $('#scan_by_jan_for_stock_detail_handy').val(jan_code);
                    // $(".scan_bybin_search_new").click();
                    $('.hide_enter_outside').removeClass('show').addClass('hide')
                } else {
                    console.log('do insert ' + jan_code);
                    var item_name = api_response.name;
                    var case_qty = 0;
                    var ball_qty = 0;
                    var api_maker_name = '';
                    if (data_resource == 'database') {
                        case_qty = api_response.case_inputs;
                        ball_qty = api_response.ball_inputs;
                    } else if (data_resource == 'api') {
                        api_maker_name = api_response.maker_name;
                    }
                    let vendor_id = response.vendor_id;
                    var price = 100;
                    /*insert auto vendor item*/
                    var order_point_unit = 'ケース';
                    var order_point_quantity = 1;
                    var order_lot_unit = 'ケース';
                    var order_lot_quantity = 0;
                    var vendor_item_id = null;
                    var sale_price = 0;
                    var basic_start_date = '2020-01-01';
                    var basic_end_date = '2021-12-31';
                    var sale_start_date = '2020-01-01';
                    var sale_end_date = '2021-12-31';
                    let data = {
                        vendor_id: vendor_id,
                        jan_code: jan_code,
                        item_name: item_name,
                        case_qty: case_qty,
                        ball_qty: ball_qty,
                        price: price,
                        vendor_item_id: vendor_item_id,
                        order_point_unit: order_point_unit,
                        order_point_quantity: order_point_quantity,
                        order_lot_unit: order_lot_unit,
                        order_lot_quantity: order_lot_quantity,
                        sale_price: sale_price,
                        basic_start_date: basic_start_date,
                        basic_end_date: basic_end_date,
                        sale_start_date: sale_start_date,
                        sale_end_date: sale_end_date,
                        api_maker_name: api_maker_name,
                    }
                    $.ajax({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                        },
                        type: "POST",
                        url: "add_vendor_item",
                        data: data,
                        dataType: "JSON",
                        success: function (response) {
                            var message_id = 'vendor_message';
                            var ms_message = response.message;
                            if (ms_message == "insert_success") {
                                console.log('insert success');
                                $('#scan_by_jan_for_stock_detail_handy').val(jan_code);
                                $(".scan_bybin_search_new").click();
                                $('.hide_enter_outside').removeClass('show').addClass('hide');

                            } else if (ms_message == "update_success") {
                                console.log('update success');
                                $('#scan_by_jan_for_stock_detail_handy').val(jan_code);
                                $(".scan_bybin_search_new").click();
                                $('.hide_enter_outside').removeClass('show').addClass('hide')
                            } else {
                                console.log(ms_message);
                            }
                            //var vendor_name = response.vendor_name;
                            //get_vendor_list_item_by_vendor_id(0, '');
                        }
                    });
                    /*insert auto vendor item*/
                } //else

            } //else
            console.log(response);
            $('.loading_image_custom').hide()
        }
    });
}

function saveAndGoNext(e, i, type) {
    let key = e.keyCode;
    if (key === 13) {
        if (type == 0) {
            $('#boll' + i).select();
            $('#boll' + i).focus();
        } else if (type == 1) {
            $('#bara' + i).select();
            $('#bara' + i).focus();
        } else if (type == 2) {
            console.log('#rack' + i)
            if ($('#rack' + i).length == 0) {
                if ($('#case' + (i + 1)).length == 0){
                    $('.scan_tanarosi_sohin').focus()
                } else {
                    $('#case' + (i + 1)).select();
                    $('#case' + (i + 1)).focus();
                }
            } else {
                $('#rack' + i).select();
                $('#rack' + i).focus();
            }
        } else if (type == 3) {
            $(this).blur();
            // if (i == 2) {
                setTimeout(function () {
                    // $('.scan_tanarosi_sohin').click()
                    if ($('#case' + (i + 1)).length == 0){
                        $('.scan_tanarosi_sohin').focus()
                    }
                }, 500)
            // }
            $('#case' + (i + 1)).select();
            $('#case' + (i + 1)).focus();
        }
    }


}

function saveAndExit(e, i, type) {
    if (type == 3 && i == 2) {
        let val = $('#rack' + i).val()
        if (val.length >= 4) {
            $('.scan_tanarosi_sohin').click()
        }
    }
}

function updateTemporaryTana() {

    let data = [];
    $('.update_rack_code_exec').each(function (e) {
        let i = $(this).attr('data_index');
        let val = $(this).val();
        if (val.length >= 4){
            let data_ = {
                rack_number : parseInt($(this).val()),
                case_quantity : parseInt($('#case' + i).val()),
                unit_quantity : parseInt($('#bara' + i).val()),
                ball_quantity : parseInt($('#bol' + i).val()),
                vendor_id : parseInt($('#case' + i).attr('data_attr_v_id')),
                stock_item_id : parseInt($('#case' + i).attr('data_attr_row_id')),
                vendor_item_id : parseInt($('#case' + i).attr('data_attr_v_item_id'))
            }
            data.push(data_)
        }

    });
    if (data.length <= 0) {
        window.location.href = 'handy_stock_update_scan_product';
    }
    $('.loading_image_custom').show()
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "stock_inventory_update_rack_multiple",
        type: "POST",
        dataType: "JSON",
        data: {data : data},
        success: function (response) {
            console.log(response);
            window.location.href = 'handy_stock_update_scan_product';
            $('.loading_image_custom').hide()
        }
    });
}

function reloadAndClearCache(){
    $('.loading_image_custom').show()
    let random = Math.round((Math.pow(36, 20 + 1) - Math.random() * Math.pow(36, 20))).toString(36).slice(1);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "cache-clear/"+random,
        type: "GET",
        dataType: "JSON",
        success: function (response) {
            $.ajax({
                url: "",
                context: document.body,
                success: function(s,x){
                    $('html[manifest =saveappoffline].appcache').attr('content', '');
                    $(this).html(s);
                    $('.loading_image_custom').hide()
                    location.reload(true);
                }
            });
        }
    });
}

//oni end

//foucs next field
function next_field_focus(field_class_id, id_orclass) {
    if (id_orclass == 1) {
        $('#' + field_class_id).focus();
        $('#' + field_class_id).blur();
    } else {
        $('.' + field_class_id).focus();
        $('.' + field_class_id).blur();
    }
}

function get_customer_order_list_data_item() {
    var shipment_number = $('#slf_no').val();
    var jcode = $('#jcode').val();
    var customer_id = $('#cname').attr('customer_id');

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_shipment_order_info",
        type: "POST",
        dataType: "JSON",
        data: {
            shipment_number: shipment_number,
            jcode: jcode,
            customer_id: customer_id
        },
        success: function (response) {
            if (response.all_customer_order_shipment != 'customer_not_found') {
                $('.customer_order_id').val(response.all_customer_order_shipment.customer_order_id);
                $('.customer_id').val(response.all_customer_order_shipment.customer_id);
                $('.inputs_types').val(response.all_customer_order_shipment.inputs);
                $('.inputs_types').attr('data_stock_case_qty', response.stock_info.case_quantity);
                $('.inputs_types').attr('data_stock_ball_qty', response.stock_info.ball_quantity);
                $('.inputs_types').attr('data_stock_unit_qty', response.stock_info.unit_quantity);
                $('#pname').val(response.all_customer_order_shipment.name);
                next_field_focus("shipment_quantity", 1);
            } else {
                $('#jcode').val('');
                $('#jcode').focus();
                alert('出荷対象のJANコードをスキャンしてください');
            }
        }
    });
}

function get_stock_jan_info() {
    var self_no = $('#scan_bybin').val();
    var b_jancode = $("#b_jancode").val();

    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "stock_item_insert_update",
        type: "POST",
        dataType: "JSON",
        data: {
            self_no: self_no,
            b_jancode: b_jancode
        },
        success: function (response) {
            if (response.api_data != 'invalid_jan_code') {
                $('#v_i_id').val(response.api_data.vendor_item_id);
                $('#v_i_id').attr('vendor_id', response.api_data.vendor_id);
                $('.d_c_qtys').text(response.api_data.case_inputs);
                $('.c_qtys').text(response.api_data.case_quantity);
                $('.d_b_qtys').text(response.api_data.ball_inputs);
                $('.b_qtys').text(response.api_data.ball_quantity);
                $('.d_u_qtys').text(1);
                $('.u_qtys').text(response.api_data.unit_quantity);
            } else {
                alert('Invalid jan code');
            }
        }
    });
}

function get_handy_stock_info() {
    var jan = $('#search_jan').val();
    if (jan == '') {
        alert('jan required');
        return false;
    }
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_stock_info_by_jans",
        type: "POST",
        dataType: "JSON",
        data: {
            jan: jan,
        },
        success: function (response) {
            if (response.api_data != '') {
                $('.stock_item_info_body').removeClass('hide').addClass('show');
                $('#stock_bin').val(response.api_data.rack_number);
                $('#jans_jan').val(jan);
                $('#jans_name').val(response.api_data.name);
                $('#search_jan').val('');
                next_field_focus("search_jan", 1);
                $('.d_c_qtys').text(response.api_data.case_inputs);
                $('.c_qtys').text(response.api_data.case_quantity);
                $('.d_b_qtys').text(response.api_data.ball_inputs);
                $('.b_qtys').text(response.api_data.ball_quantity);
                $('.d_u_qtys').text(1);
                $('.u_qtys').text(response.api_data.unit_quantity);
            } else {
                $('.stock_item_info_body').removeClass('show').addClass('hide');
                alert('There is no stock found');
            }
        }
    });
}

function vendor_order_list_by_voucher() {
    var voucher_number = $('#v_no').val();
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "vendor_order_list_by_voucher_number",
        type: "POST",
        dataType: "JSON",
        data: {
            voucher_numer: voucher_number,
        },
        success: function (response) {
            if (response.all_vendor_order.length > 0) {
                $(".newka_list").html("");
                var htmls = "";
                $('#vname').val(response.all_vendor_order[0].NAME);
                $('#vname').attr('vendor_id', response.all_vendor_order[0].vendor_id);
                $('.totall_row').val(response.all_vendor_order.length);

                $.each(response.all_vendor_order, function (idx, obj) {
                    htmls += "<tr>";
                    htmls += "<td>" + obj.item_name + "</td>";
                    htmls += "<td>" + obj.order_inputs + "</td>";
                    htmls += "<td>" + obj.inputs + "</td>";
                    htmls += "<td>" + obj.quantity + "</td>";
                    htmls += "</tr>";
                });
                $(".newka_list").html(htmls);
            } else {
                alert('no data found by this voucher number');
                $('#v_no').val('');
                $('#v_no').focus();
                return false;
            }
        }
    })
}

function get_jan_info_from_vendor_order() {
    var vjcode = $('#vjcode').val();
    var v_no = $('#v_no').val();
    var vendor_id = $('#vname').attr('vendor_id');
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_jan_info_from_vendor_order",
        type: "POST",
        dataType: "JSON",
        data: {
            jan_code: vjcode,
            v_no: v_no,
            vendor_id: vendor_id,
        },
        success: function (response) {
            if (response.api_data == 'invalid_jan_code') {
                alert('Invalid jan code');
            } else {
                $('#c_quantity').attr('readonly', false);
                $('#expire_date').attr('readonly', false);
                $('#bin').attr('readonly', false);
                $('#pname').val(response.api_data.name);
                next_field_focus("c_quantity", 1);
            }

        }
    })
}

function get_customer_order_by_voucer() {
    var voucher_number = $('#slf_no').val();
    console.log(voucher_number);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_customer_order_by_voucer",
        type: "POST",
        dataType: "JSON",
        data: {
            voucher_number: voucher_number,
            status: 0
        },
        success: function (response) {
            if (response.all_customer_order.length > 0) {
                $(".shipment_order_item_body").html("");
                var htmls = "";
                $('.shipment_h_title_change ').html('出荷作業<br>検品');
                $('#cvoucher_no').val(response.all_customer_order[0].voucher_number);
                $('#cname').val(response.all_customer_order[0].customer_name);
                $('#cname').attr('customer_id', response.all_customer_order[0].customer_id);
                $('.totall_row').val(response.all_customer_order.length);
                $.each(response.all_customer_order, function (idx, obj) {
                    htmls += "<tr>";
                    htmls += "<td>" + obj.jan_name + "</td>";
                    htmls += "<td>" + obj.rack_number + "</td>";
                    htmls += "<td>" + obj.inputs + "</td>";
                    htmls += "<td>" + obj.quantity + "</td>";
                    htmls += "</tr>";
                });
                $(".shipment_order_item_body").html(htmls);
            } else {
                $('#slf_no').val('');
                $('#slf_no').focus();
                alert('出荷番号が見つかりません');
            }
        }
    });
}

$(function () {
    $.widget("custom.combobox", {
        _create: function () {
            this.wrapper = $("<span>")
                .addClass("custom-combobox")
                .insertAfter(this.element);

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function () {
            var selected = this.element.children(":selected"),
                value = selected.val() ? selected.text() : "";

            this.input = $("<input>")
                .appendTo(this.wrapper)
                .val(value)
                .attr("title", "")
                .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy(this, "_source")
                })
                .tooltip({
                    classes: {
                        "ui-tooltip": "ui-state-highlight"
                    }
                });

            this._on(this.input, {
                autocompleteselect: function (event, ui) {
                    //ui.item.option.selected = true;
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                    $("#j_code").val(ui.item.value);
                    $("#customer_item_name").val(ui.item.name);
                    $("#c_qty").val(ui.item.case_inputs);
                    $("#b_qty").val(ui.item.ball_inputs);
                    $("#c_price").val(ui.item.vendor_cost_price);
                    $("#s_c_price").val(ui.item.vendor_sale_cost_price);
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function () {
            var input = this.input,
                wasOpen = false;

            $("<a>")
                .attr("tabIndex", -1)
                .appendTo(this.wrapper)
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass("ui-corner-all")
                .addClass("custom-combobox-toggle ui-corner-right")
                .on("mousedown", function () {
                    wasOpen = input.autocomplete("widget").is(":visible");
                })
                .on("click", function () {
                    input.trigger("focus");

                    // Close if already visible
                    if (wasOpen) {
                        return;
                    }

                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete("search", "");
                });
        },

        _source: function (request, response) {
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                },
                url: "get_all_vendor_data_by_vendor_id",
                type: 'POST',
                dataType: "json",
                data: {
                    term: request.term,
                    v_id: $("#v_name").find(":selected", this).val()
                },
                success: function (data) {
                    response(data);
                }
            });
        },
        _removeIfInvalid: function (event, ui) {

            // Selected an item, nothing to do
            if (ui.item) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children("option").each(function () {
                if ($(this).text().toLowerCase() === valueLowerCase) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if (valid) {
                return;
            }

            // Remove invalid value
            this.input
                .val("")
                .attr("title", value + " didn't match any item")
                .tooltip("open");
            this.element.val("");
            this._delay(function () {
                this.input.tooltip("close").attr("title", "");
            }, 2500);
            this.input.autocomplete("instance").term = "";
        },

        _destroy: function () {
            this.wrapper.remove();
            this.element.show();
        }
    });

    $(".combobox").combobox();

});

function inser_into_customer_item_by_handy() {
    console.log($('.customer_master_jancode').val());
}

function inser_into_vendor_item_by_handy() {
    var janCode = $('#handy_vendor_master_jancode_registration').val();
    $('.mobile_code').prepend('<p>' + janCode + '</p>');
    jan_code_store.push(janCode);
    $("#handy_vendor_master_jancode_registration").val("");
    $("#handy_vendor_master_jancode_registration").focus();
    console.log(jan_code_store);
}

function search_receive_order_jan() {
    var janCode = $('#vendor_master_jancode').val();
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_vendor_order_details_by_vendor_jan",
        type: 'POST',
        dataType: "json",
        data: {
            janCode: janCode
        },
        success: function (response) {
            console.log(response);
            console.log(Object.keys(response.vendor_order).length);
            if (response.vendor_order != 0) {
                var orderable_qty = response.vendor_order.quantity - response.a_quantity;
                $("#search_product_name").html('');
                $("#search_product_name").text(response.vendor_order.item_name);
                // $(".case_law_qty").val(response.vendor_order.case_inputs);
                // $(".bol_law_qty").val(response.vendor_order.ball_inputs);
                $('.order_inputs_quantitys').val(orderable_qty);
                $('.order_inputs_quantitys').attr('data_inputs_type', response.vendor_order.order_inputs);
                $('.order_inputs_quantitys').attr('vendor_id', response.vendor_order.vendor_id);
                $('.order_inputs_quantitys').attr('vendor_item_id', response.vendor_order.vendor_item_id);
                $('.order_inputs_quantitys').attr('vendor_order_id', response.vendor_order.vendor_order_id);
                $('.order_inputs_quantitys').attr('vendor_order_detail_id', response.vendor_order.vendor_order_detail_id);
                $('.common_state').text(response.vendor_order.order_inputs);
                if (response.vendor_order.order_inputs == 'ケース') {
                    $('.order_quantity').val(orderable_qty);
                    $('.change_config_recevied').attr('input_state', 1);
                } else if (response.vendor_order.order_inputs == 'ボール') {
                    $('.order_quantity').val(orderable_qty);
                    $('.change_config_recevied').attr('input_state', 2);
                } else {
                    $('.order_quantity').val(orderable_qty);
                    $('.change_config_recevied').attr('input_state', 3);
                }
                /*
                //hide rack info after jan for new changes
                if (response.reck_total == 0) {
                    $('#reck_code').removeClass('hide').addClass('show');
                    $('.reck_number').removeClass('show').addClass('hide');
                    $('.change_rack').attr('rect_status', 0);
                    $('.change_rack').text('新規');
                } else {
                    $('#reck_code').removeClass('show').addClass('hide');
                    $('.reck_number').removeClass('hide').addClass('show');
                    $('.change_rack').attr('rect_status', 1);
                    $('.change_rack').text('既存');
                    var htms = '';
                    for (var j = 0; j < response.reck_total.length; j++) {
                        htms += '<option value="' + response.reck_total[j].rack_number + '">' + response.reck_total[j].rack_number + '</option>';
                    }
                    $('.reck_number').html(htms);
                }*/
                /*
                else if (response.vendor_order.order_inputs == 'ボール') {
                    $('.bol_invent_order').focus();
                    $('.bol_invent_order').blur();
                } else {
                    $('.individual_invent_order').focus();
                    $('.individual_invent_order').blur();
                }*/
                $('.receive_quantity').focus();
                if ($('.receive_quantity').hasClass('scanner')) {
                    $('.receive_quantity').blur();
                }
                $('input').removeClass('active_input');
                $('.receive_quantity').addClass('active_input');
                $('.handdy_error').removeClass('show').addClass('hide');
            } else {
                $("#vendor_master_jancode").val("");
                $(".case_law_qty").val('');
                $(".bol_law_qty").val('');
                $("#vendor_master_jancode").focus();
                $("#search_product_name").html('<span style="color: #999; font-size: 30px;">商品名</span>');
                $('.handy_error_msg').text(response.error_message);
                $('.handdy_error').removeClass('hide').addClass('show');
                console.log('vendor order not found');
            }
        }
    });
}

function search_shipment_order_jan() {
    var janCode = $('#shipment_master_jancode').val();
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_customer_order_details_by_customer_jan",
        type: 'POST',
        dataType: "json",
        data: {
            janCode: janCode
        },
        success: function (response) {
            console.log(response);
            if (response.customer_order.customer_shipment_id != null) {
                var orderable_qty = response.customer_order.total_confirm_quantity;
                $("#search_product_name").html('');
                $("#search_product_name").text(response.customer_order.name);
                $(".case_law_qty").val(response.customer_order.case_inputs);
                $(".bol_law_qty").val(response.customer_order.ball_inputs);
                $('.order_inputs_quantitys').val(orderable_qty);
                $('.order_quantity').val(orderable_qty);
                $('.order_inputs_quantitys').attr('data_inputs_type', response.customer_order.inputs);
                $('.order_inputs_quantitys').attr('customer_item_id', response.customer_order.customer_item_id);
                $('.order_inputs_quantitys').attr('customer_id', response.customer_order.customer_id);
                $('.order_inputs_quantitys').attr('customer_shipment_id', response.customer_order.customer_shipment_id);
                $('.order_inputs_quantitys').attr('customer_order_id', response.customer_order.customer_order_id);
                $('.order_inputs_quantitys').attr('customer_order_detail_id', response.customer_order.customer_order_detail_id);
                $('.common_state').text(response.customer_order.inputs);
                $('.receive_quantity').focus();
                if (response.customer_order.inputs == 'ケース') {
                    // $('.case_invent_order').focus();
                    // $('.case_invent_order').blur();
                    $('.change_config_recevied').attr('input_state', 1);
                } else if (response.customer_order.inputs == 'ボール') {
                    // $('.bol_invent_order').focus();
                    // $('.bol_invent_order').blur();
                    $('.change_config_recevied').attr('input_state', 2);
                } else {
                    // $('.individual_invent_order').focus();
                    // $('.individual_invent_order').blur();
                    $('.change_config_recevied').attr('input_state', 3);
                }

                $('.handdy_error').removeClass('show').addClass('hide');
            } else {
                $("#vendor_master_jancode").val("");
                $(".case_law_qty").val('');
                $(".bol_law_qty").val('');
                $("#vendor_master_jancode").focus();
                $("#search_product_name").html('<span style="color: #999; font-size: 30px;">商品名</span>');
                $('.handy_error_msg').text(response.error_message);
                $('.handdy_error').removeClass('hide').addClass('show');
                console.log('vendor order not found');
            }
        }
    });
}

function vendor_item_insert_into_shelf() {
    var janCode = $('#jcs_stock_details_by_jan').val();
    var rack_code = $('#scan_by_shelf_number').val();
    if (janCode == '') {
        alert('janコードを入力してください');
        return false;
    }
    if (rack_code == '') {
        alert('棚番号を入力してください 3333');
        return false;
    }
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "vendor_item_insert_into_shelf",
        type: 'POST',
        dataType: "json",
        data: {
            jan: janCode,
            rack_code: rack_code,
        },
        success: function (response) {
            console.log(response);
            if (response.api_data != '') {
                $("#search_product_name").html('');
                $("#search_product_name").text(response.api_data.name);
                $(".case_law_qty").val(response.api_data.case_inputs);
                $(".bol_law_qty").val(response.api_data.ball_inputs);
                $('.case_invent_qty').val(response.api_data.case_quantity);
                $('.case_invent_qty').focus();
                $('.bol_invent_qty').val(response.api_data.ball_quantity);
                $('.unit_invent_qty').val(response.api_data.unit_quantity);
                $('.case_invent_qty').attr('case_invent_qty', response.api_data.case_quantity);
                $('.bol_invent_qty').attr('bol_invent_qty', response.api_data.ball_quantity);
                $('.unit_invent_qty').attr('unit_invent_qty', response.api_data.unit_quantity);
                $('.update_stock_item_by_jan_by_handy').attr('stock_item_id', response.api_data.stock_item_id);
                var total_inventory_of_stock_qty = parseFloat((parseFloat(response.api_data.case_quantity) * parseFloat(response.api_data.case_inputs)) + (parseFloat(response.api_data.ball_quantity) * parseFloat(response.api_data.ball_inputs)) + parseFloat(response.api_data.unit_quantity));
                // total_inventory_of_stock_qty = total_inventory_of_stock_qty.toFixed(2);
                $('.total_inventory_of_stock').text(total_inventory_of_stock_qty);
                if (response.invalid_rack == 1) {
                    $('.handy_error_msg').text('このJanコードの棚番号が無効です');
                    $('.handdy_error').removeClass('hide').addClass('show');
                }
            } else {
                $('.update_stock_item_by_jan_by_handy').attr('stock_item_id', 0);
                $("#jcs_stock_details_by_jan").val("");
                $("#jcs_stock_details_by_jan").focus();
                $("#jcs_stock_details_by_jan")[0].focus();
                $('.case_invent_qty').val('');
                $('.bol_invent_qty').val('');
                $('.unit_invent_qty').val('');
                $('.case_invent_qty').attr('case_invent_qty', 0);
                $('.bol_invent_qty').attr('bol_invent_qty', 0);
                $('.unit_invent_qty').attr('unit_invent_qty', 0);
                $(".case_law_qty").val('');
                $(".bol_law_qty").val('');
                $("#search_product_name").html('<span style="color: #999; font-size: 30px;">商品名</span>');
                //                $("#vendor_master_jancode").blur();

                if (response.error_message != '') {
                    $('.handy_error_msg').text(response.error_message);
                    $('.handdy_error').removeClass('hide').addClass('show');
                }
                console.log('vendor order not found');
            }
        }
    });
}

function store_tana_update() {
    var janCode = $('#jcs_stock_details_by_jan').val();
    var carr_status = parseInt($('.change_rack_type').attr('data_status'));
    if (carr_status == 2) {
        var rack_code = $('#scan_by_shelf_number').val();
    } else {
        var rack_code = $('.select_a_rack').val();
    }

    if (janCode == '') {
        alert('janコードを入力してください');
        return false;
    }
    if (rack_code == '') {
        alert('棚番号を入力してください');
        return false;
    }
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "vendor_item_insert_into_shelf",
        type: 'POST',
        dataType: "json",
        data: {
            jan: janCode,
            rack_code: rack_code,
        },
        success: function (response) {
            console.log(response);

            window.location.reload(true);
        }
    });
}

function get_stock_details_by_jan() {
    var janCode = $('#jcs_stock_details_by_jan').val();
    var rack_code = $('#scan_by_shelf_number').val();
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "get_stock_info_by_jans_and_rack_code",
        type: 'POST',
        dataType: "json",
        data: {
            jan: janCode,
            rack_code: rack_code,
        },
        success: function (response) {
            console.log(response);
            if (response.api_data != '') {
                $("#search_product_name").html('');
                $("#search_product_name").text(response.api_data.name);
                $(".case_law_qty").val(response.api_data.case_inputs);
                $(".bol_law_qty").val(response.api_data.ball_inputs);
                $('.case_invent_qty').val(response.api_data.case_quantity);
                $('.case_invent_qty').focus();
                $('.bol_invent_qty').val(response.api_data.ball_quantity);
                $('.unit_invent_qty').val(response.api_data.unit_quantity);
                $('.case_invent_qty').attr('case_invent_qty', response.api_data.case_quantity);
                $('.bol_invent_qty').attr('bol_invent_qty', response.api_data.ball_quantity);
                $('.unit_invent_qty').attr('unit_invent_qty', response.api_data.unit_quantity);
                $('.update_stock_item_by_jan_by_handy').attr('stock_item_id', response.api_data.stock_item_id);
                var total_inventory_of_stock_qty = parseFloat((parseFloat(response.api_data.case_quantity) * parseFloat(response.api_data.case_inputs)) + (parseFloat(response.api_data.ball_quantity) * parseFloat(response.api_data.ball_inputs)) + parseFloat(response.api_data.unit_quantity));
                // total_inventory_of_stock_qty = total_inventory_of_stock_qty.toFixed(2);
                $('.total_inventory_of_stock').text(total_inventory_of_stock_qty);
                if (response.invalid_rack == 1) {
                    $('.handy_error_msg').text('このJanコードの棚番号が無効です');
                    $('.handdy_error').removeClass('hide').addClass('show');
                }
            } else {
                $('.update_stock_item_by_jan_by_handy').attr('stock_item_id', 0);
                $("#jcs_stock_details_by_jan").val("");
                $("#jcs_stock_details_by_jan").focus();
                $("#jcs_stock_details_by_jan")[0].focus();
                $('.case_invent_qty').val('');
                $('.bol_invent_qty').val('');
                $('.unit_invent_qty').val('');
                $('.case_invent_qty').attr('case_invent_qty', 0);
                $('.bol_invent_qty').attr('bol_invent_qty', 0);
                $('.unit_invent_qty').attr('unit_invent_qty', 0);
                $(".case_law_qty").val('');
                $(".bol_law_qty").val('');
                $("#search_product_name").html('<span style="color: #999; font-size: 30px;">商品名</span>');
                //                $("#vendor_master_jancode").blur();

                if (response.error_message != '') {
                    $('.handy_error_msg').text(response.error_message);
                    $('.handdy_error').removeClass('hide').addClass('show');
                }
                console.log('vendor order not found');
            }
        }
    });
}

function receive_order_qty_check_new() {
    alert()
    var quantity = $('.order_quantity').val();
    quantity = (quantity == '' ? 0 : quantity);
    var compare_qty = 0;
    var error = 0;
    compare_qty = $('.receive_quantity').val();
    compare_qty = (compare_qty == '' ? 0 : compare_qty);
    console.log(compare_qty);
    console.log(quantity);
    compare_qty = parseInt(compare_qty);
    quantity = parseInt(quantity);
    if (compare_qty > quantity) {
        error = 1;
        $('.handy_error_msg').text('入荷予定数量を超えています。');
        $('.handdy_error').removeClass('hide').addClass('show');
        $('.receive_quantity').val('');
        return false;
    }
    if (compare_qty != 0) {

        // $('#expire_date').focus();
        $('input,select').removeClass('active_input');
        // $('#expire_date').focus();
        // $('#expire_date').addClass('active_input');

        $('#vendor_arival_insert_recv_order_next').addClass('active_input');
        $("#vendor_arival_insert_recv_order_next")[0].focus();
    }

}

function receive_order_qty_check(inputs_type) {
    var quantity = $('.order_inputs_quantitys').val();
    var order_inputs = $('.order_inputs_quantitys').attr('data_inputs_type');
    var compare_qty = 0;
    var error = 0;
    if (inputs_type == 'ケース') {
        compare_qty = $('.case_invent_order').val();
    } else if (inputs_type == 'ボール') {
        compare_qty = $('.bol_invent_order').val();
    } else if (inputs_type == 'バラ') {
        compare_qty = $('.individual_invent_order').val();
    }
    console.log(compare_qty);
    console.log(quantity);
    console.log(inputs_type);
    console.log(order_inputs);
    compare_qty = parseInt(compare_qty);
    quantity = parseInt(quantity);
    if (inputs_type == order_inputs) {
        if (compare_qty > quantity) {
            error = 1;
            $('.handy_error_msg').text('入荷予定数量を超えています。');
            $('.handdy_error').removeClass('hide').addClass('show');
        }
    } else {
        error = 1;
        $('.handy_error_msg').text('入荷予定数量を超えています。');
        $('.handdy_error').removeClass('hide').addClass('show');
    }

    if (error == 1) {
        if (inputs_type == 'ケース') {
            $('.case_invent_order').val('');
        } else if (inputs_type == 'ボール') {
            $('.bol_invent_order').val('');
        } else if (inputs_type == 'バラ') {
            $('.individual_invent_order').val('');
        }
    }


}

function shipment_order_qty_check(inputs_type) {
    var quantity = $('.order_inputs_quantitys').val();
    var order_inputs = $('.order_inputs_quantitys').attr('data_inputs_type');
    var compare_qty = 0;
    var error = 0;
    if (inputs_type == 'ケース') {
        compare_qty = $('.case_invent_order').val();
    } else if (inputs_type == 'ボール') {
        compare_qty = $('.bol_invent_order').val();
    } else if (inputs_type == 'バラ') {
        compare_qty = $('.individual_invent_order').val();
    }
    console.log(compare_qty);
    console.log(quantity);
    console.log(inputs_type);
    console.log(order_inputs);
    compare_qty = parseInt(compare_qty);
    quantity = parseInt(quantity);
    if (inputs_type == order_inputs) {
        if (compare_qty > quantity) {
            error = 1;
            $('.handy_error_msg').text('出荷予定数量を超えています。');
            $('.handdy_error').removeClass('hide').addClass('show');
        }
    } else {
        error = 1;
        $('.handy_error_msg').text('出荷予定数量を超えています。');
        $('.handdy_error').removeClass('hide').addClass('show');
    }

    if (error == 1) {
        if (inputs_type == 'ケース') {
            $('.case_invent_order').val('');
        } else if (inputs_type == 'ボール') {
            $('.bol_invent_order').val('');
        } else if (inputs_type == 'バラ') {
            $('.individual_invent_order').val('');
        }
    }


}

function stock_details_by_handy() {
    var vendor_id = $('.filter_by_vnames').val();
    var jan = $('.filter_by_jcodes').val();
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        type: "POST",
        url: "getall_stock_items_list",
        data: {vendor_id: vendor_id, jan: jan},
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            $('.physicaltbody').html('');
            var htms = '';
            var shw_status = $('.name_to_jan').attr('data_status');
            var total_num = 0;
            if (response.items.length > 0 && (response.items[0].jan != null && response.items[0].jan != '' && response.items[0].jan != 'null')) {
                for (var i = 0; i < response.items.length; i++) {
                    var name_txt = (shw_status == 0 ? response.items[i].name : response.items[i].jan);
                    var rack_number = (response.items[i].rack_number == null ? '' : response.items[i].rack_number);
                    htms += "<tr>";
                    htms += "<td data_jan='" + response.items[i].jan + "' data_name='" + response.items[i].name + "'>" + name_txt + "</td>";
                    htms += '<td style="text-align: right;vertical-align:middle !important;">' + rack_number + '</td>';
                    htms += '<td style="text-align: right;vertical-align:middle !important;">' + response.items[i].t_qty + '</td>';
                    htms += "</tr>";
                    total_num++;
                }
            } else {
                htms += "<tr><td colspan='3' style='text-align:center;'>データ無し</td></tr>";
            }
            $('.physicaltbody').html(htms);
            // $('.num_total').text(response.total_rw + ' 件');
            $('.num_total').text(total_num + ' 件');
            $('.num_total').attr('data_unreceived_total', response.total_rw);
        }
    });
}

function order_quantity_check() {
    var quantity = $('.order_quantity').val();
    var page_url = url_search();
    quantity = (quantity == '' ? 0 : quantity);
    var compare_qty = 0;
    var error = 0;
    compare_qty = $('.receive_quantity').val();
    compare_qty = (compare_qty == '' ? 0 : compare_qty);
    console.log(compare_qty);
    console.log(quantity);
    compare_qty = parseInt(compare_qty);
    quantity = parseInt(quantity);
    if (compare_qty > quantity) {
        error = 1;
        if (page_url == 'handy_order_receive') {
            var msgsss = '入荷予定数量を超えています。';
        } else {
            var msgsss = '出荷予定数量を超えています。';
        }
        $('.handy_error_msg').text(msgsss);
        $('.handdy_error').removeClass('hide').addClass('show');
        $('.receive_quantity').val('');
        return false;
    }
    if (compare_qty != 0) {
        $('input,select').removeClass('active_input');
        // $('.note_1').focus();
        // $('.note_1').addClass('active_input');
        // oni 02.02.2021
        $('#vendor_arival_insert_recv_order_next').addClass('active_input');
        $("#vendor_arival_insert_recv_order_next")[0].focus();
    }
}

function shipment_note_1_check() {
    $('input,select').removeClass('active_input');
    $('#handy_shipment_item_insert').focus();
    $('#handy_shipment_item_insert').addClass('active_input');
}

function shipment_note_2_check() {
    $('input,select').removeClass('active_input');
    $('#shipment_master_jancode').focus();
    $('#shipment_master_jancode').addClass('active_input');
}

var voice_flg = true;
var voice_tr = null;

// --------------------------------------------------------------------
var rec;
var status = 0;
function voice2text(callback) {

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var grammar = '#JSGF V1.0;'
    var lang = 'ja-JP';
    rec = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    rec.grammars = speechRecognitionList;
    rec.lang = lang;
    rec.interimResults = false; // 暫定結果
    rec.interimResults = true; // 暫定結果
    rec.continuous = true; // 認識継続
    rec.maxAlternatives = 10;
    rec.onresult = function (event) {
        callback(event);
    };
    rec.onspeechend = function () {
        rec.stop();
        rec.continuous = false;
    };
    rec.onend = function () {
        rec.stop();
    }
    rec.onerror = function (event) {
        console.log('Speech recognition error detected: ' + event.error);
        rec.continuous = false;
        rec.stop();
    }
    rec.onnomatch = function (event) {
        console.log(event);
        console.log('onnomatch');
        rec.stop();
    }

    // recognition start
    rec.start();
}

$("#voice_reset_btn").on("click", function () {
    status = 1;
    $('.voice_start').removeClass('show').addClass('hide');
    $('.voice_recoding').removeClass('hide').addClass('show');
    voice2text(add_record_callback);
    setTimeout(function () {
        reset_voice();
    }, 15000);
});
$("#stop_rec_btn").on("click", function () {
    reset_voice();
});

function reset_voice() {
    status = 0;
    rec.onspeechend();
    rec.stop();
    rec.abort();

    $('.voice_recoding').removeClass('show').addClass('hide');
    $('.voice_start').removeClass('hide').addClass('show');
    //    rec.start();
}

function add_record_callback(data) {

    if (status == 1) {

        var last = data.results.length - 1;
        var command = data.results[last][0].transcript.trim();
        if (data.results[last].isFinal) {
            console.log("voice end-------------------");

            if (word_check(command)) return;
            //item_search(command);
            var page_url = url_search();
            
            if(page_url=='brand-order' || page_url=='brand-order#'){
                var cId_val = $('.c_ids_v').val();
                var cus_name = $('.c_ids_name').val();
                get_brand_shop_brand_list(cId_val,cus_name,command);
            }else{
                jan_list_search_by_name(command);
            }
            //jan_list_search_by_name(command);
            $('.voice_reading_text').val(command);
            reset_voice();
        } else {
            if (voice_flg) {
                console.log("voice start -------------------");
                $('.voice_reading_text').val(command);

            } else {
                // interimResults continue
                $('.voice_reading_text').val(command);

            }
        }
    }
}

function now() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var w = now.getDay();
    var wd = ['日', '月', '火', '水', '木', '金', '土'];
    var h = now.getHours();
    var mi = now.getMinutes();
    var s = now.getSeconds();
    return y + '年' + m + '月' + d + '日 ' + '(' + wd[w] + ') ' + h + ':' + mi + ':' + s;
}

function word_check(word) {
    if (word === 'クリア') {
        // テーブルクリア
        $('.voice_reading_text').val('');
        return true;
    }
    return false;
}

function item_search(name) {
    var base_url = $('#base_url').val();
    $.ajax({
        url: base_url + 'estimate/item_search',
        type: 'POST',
        data: {
            'item_name': name
        },
        dataType: 'JSON',
    })
        .done((response_data) => {
            console.log(response_data);

            /*match table */
            var counter = 1;
            //if(response_data["match_reslt"].length>0){
            $.each(response_data["match_reslt"], function (i, e) {

                var cnt = response_data["match_reslt"][i].length;
                var color_cls = (cnt > 1 ? 'yellow_tr' : 'deflt_tr');
                var first = true;
                var j = 1;
                console.log(cnt);
                console.log(response_data["match_reslt"][i]);
                $.each(response_data["match_reslt"][i], function (ii, e) {
                    /*if (first) {
                        $("#search_matching_table > tbody").prepend('<tr><td rowspan="' + cnt + '">' + i + '</td><td>' + response_data["match_reslt"][i][ii]["product_name"] + '</td><td>' + response_data["match_reslt"][i][ii]["pro_jan_code"] + '</td></tr>');
                        first = false;
                    } else {
                        $("#search_matching_table > tbody").append('<tr><td>' + response_data["match_reslt"][i][ii]["product_name"] + '</td><td>' + response_data["match_reslt"][i][ii]["pro_jan_code"] + '</td></tr>');
                    }*/
                    $("#search_matching_table > tbody").prepend('<tr class="' + color_cls + '"><td></td><td>' + response_data["match_reslt"][i][ii]["product_name"] + '</td><td>' + response_data["match_reslt"][i][ii]["pro_jan_code"] + '</td></tr>');
                    do_color_orginal_table(response_data["match_reslt"][i][ii]["pro_jan_code"]);
                    counter++;
                    j++;
                });
            });


            //}
            /*match table */

            // var counter = 1;
            // $.each(ret["items"], function(i, e) {
            //     console.log(ret["items"][i]["item_name"]);
            //     $("#item_tbl > tbody").append('<tr><td>' + ret["items"][i]["item_name"] + '</td><td>' + ret["items"][i]["jan_code"] + '</td></tr>');
            //     counter++;
            // });
        })
        // Ajaxリクエストが失敗した時発動
        .fail((data) => {
            //            $('.result').html(data);
            console.log('failed!');
            console.log(data);
        })
        // Ajaxリクエストが成功・失敗どちらでも発動
        .always((data) => {

        });


}