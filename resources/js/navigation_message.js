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
    brandOrdrs: {
        message: [
            { "message": "前回までの受注データが頻度順に表示 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;されています" },
            { "message": "メーカー名を音声または手入力すると &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;メーカー別に絞り込み表示されます" },
        ],
        buttons: [
            { button: '<center><a href="javascript:close_default_page_navi(101)" class="btn btn-primary rsalrtconfirms">確認</a></center>' }
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
                nav_width = '400px';
                display_positionY = '15px';
                display_positionX = '15px';
                receiveorderdefault_nav = view(message_notify_default['brandOrdrs'], def_old_nav_template_without_return_btn);
            close_all_navi_msg();
            show_hide_nav_icn(0);
            get_customer_list();
            $('#customer_message_success').html('');
            $("#add_customer_message").html('');
            $("#update_customer_message_fail").html('');
            $("#customer_show_modal").modal("show");
         break;
        case 'brand-order-detail':
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
        case 5000://brand nav
        close_all_navi_msg();
            show_hide_nav_icn(1);
            break;
        default:
            break;
    }
}