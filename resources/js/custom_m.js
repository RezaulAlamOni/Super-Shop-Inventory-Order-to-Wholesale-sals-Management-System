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
        var page_url = url_search();
        //console.log(is_id_1);
        var hide_enter_outside = $("#jn_0,.ui-datepicker");
        var hide_enter_outside_brand = $("#jn_0,.jn_brand");
        // console.log(hide_enter_outside);
        // console.log('divs');
        console.log(is_id_1);
       if (!hide_enter_outside.is(e.target) && hide_enter_outside.has(e.target).length === 0 && is_id_1 == 'jn_0') {
           
            close_all_navi_msg();
            show_hide_nav_icn(1);
            // console.log('divs out click');
        }
    if(page_url=='brand-order' || page_url=='brand-order#'){
        console.log(hide_enter_outside_brand.is(e.target));
        console.log(hide_enter_outside_brand.has(e.target).length);
        if (!hide_enter_outside_brand.is(e.target) && hide_enter_outside_brand.has(e.target).length === 0 && is_id_1 == 'jn_0') {
            setTimeout(function(){
            close_all_navi_msg();
            show_hide_nav_icn(1);
        }, 6000);
        }
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
        var sId_val = $(this).closest('tr').attr('shop-id');
        var shpname = $(this).closest('tr').find('td:nth-child(1)').text();
        var cus_shpneame = cus_name+' ・ '+shpname;
        $('.jcs_main_hand_title').text('');
        $('.jcs_main_hand_title').text(cus_shpneame);
        $('.jcs_main_hand_title').attr('data_page_num',1);
        $('.c_ids_v').val(cId_val);
        $('.s_ids_v').val(sId_val);
        $('.c_ids_name').val(cus_shpneame);
        $('.s_ids_name').val(shpname);
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
    $(document).delegate('#shipment_csv_input_brand', 'change', function () {
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
            url: "shipment_csv_insert_brand",
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
