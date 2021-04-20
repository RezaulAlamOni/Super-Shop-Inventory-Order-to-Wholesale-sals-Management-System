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