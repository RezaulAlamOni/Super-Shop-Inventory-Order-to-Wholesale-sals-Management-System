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