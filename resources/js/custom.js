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
    } /*else if (url_last_element == 'brand-order-detail' || url_last_element == 'brand-order-detail#') {
        var u_c_id=1;
        var u_c_name='A スーパー ・ B 店';
        $('.c_ids_v').val(u_c_id);
        $('.jcs_main_hand_title').text(u_c_name);
        $('.jcs_main_hand_title').attr('data_page_num',2);
        get_brand_updated_item_list(u_c_id, u_c_name);
    }*

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
        } else if (url_last_element == 'brand-order' || url_last_element == 'brand-order#' || url_last_element == 'brand-order-detail' || url_last_element == 'brand-order-detail#') {
            $('.c_ids_v').val(c_id);
            $('.jcs_main_hand_title').text(c_name);
            $('.jcs_main_hand_title').attr('data_page_num',2);
            get_brand_item_list(c_id, c_name);
        }  else {
            view_customer_master_by_customer_id(c_id, c_name);
        }
        show_hide_nav_icn(1);
    });

/*brnd detail*/
// else if (url_last_element == 'brand-order-detail' || url_last_element == 'brand-order-detail#') {
//     var u_c_id=1;
//     var u_c_name='A スーパー ・ B 店';
//     $('.c_ids_v').val(u_c_id);
//     $('.jcs_main_hand_title').text(u_c_name);
//     $('.jcs_main_hand_title').attr('data_page_num',2);
//     get_brand_updated_item_list(u_c_id, u_c_name);
// }
/*brnd detail*/
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
        $('#customer_show_modal').modal('hide');
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
                    $('#customer_shop_modal').modal('hide');
                    $('#customer_show_modal').modal('show');

                }

            }
        });
    })
    $('.close_shop_reg_update').on('click', function () {
        $('#shop_reg_modal').modal('hide');
        all_fields_blunk()
        $('#customer_shop_modal').modal('hide');
        $('#customer_show_modal').modal('show');
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

    $(document).delegate(".brndOrderInputQty", "focusin", function (e) {
        close_all_navi_msg();
        show_hide_nav_icn(1);
        
    })

    $(document).delegate(".brndOrderInputQty", "keypress", function (e) {
        close_all_navi_msg();
        show_hide_nav_icn(1);
        if (e.keyCode == 13) {
           $(this).blur();
        }
    })

    $(document).delegate(".brndOrderInputQty", "blur", function (e) {

        var row_id = $(this).attr('row_id');
        var field_name = $(this).attr('field_name');
        var vl = $(this).val();
        $(this).closest('td').css('background','#F3F885');
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            url: "update_csv_order_data",
            type: "POST",
            dataType: "JSON",
            data: {row_id:row_id,field_name:field_name,vl:vl},
            success: function (response) {
                 console.log(response);
                

            }
        });


        const temps_messagesssssss = {

            bran_item_list_input_message: {
                message: [
                    {message: '入力完了しました<br>着色しています。'},
                ],
                buttons: [
                    {button: '<center><a href="'+Globals.base_url+'/brand-order-detail" class="btn btn-primary">確認</a><a href="javascript:close_default_page_navi(5000)" class="btn btn-primary">続ける</a></center>'}
                ]
            },
        }
        nav_width = '300px';
        display_positionX = '15px';
        display_positionY = '15px';
        // def_center_mesg_template
        success_nav = view(temps_messagesssssss['bran_item_list_input_message'], def_center_mesg_template_brand);
        show_hide_nav_icn(0);
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
    close_all_navi_msg();
    var brand_name = '';
    var currnt_brand_list= 'コカ・コーラ(Coca-Cola),ポカリスエット,スターバックス,ネスカフェ,アサヒビール,BOSS(ボス),明治乳業,サントリー,カゴメ,ピカイチ野菜くん';
   // var currnt_brand_list= '店 A,店 B,店 C,店 D';
    if(voice_text!='' && voice_text=='サントリー'){
        voice_text = voice_text.replace("ー", ""); 
    }
    if(voice_text!='' && voice_text=='サントリ-'){
        voice_text = voice_text.replace("-", ""); 
    }
    var shop_id = $('.s_ids_v').val();
    var pageTitleText = $('.jcs_main_hand_title').text();
    localStorage.setItem('local_shop_id', shop_id);
    localStorage.setItem('local_customer_id', c_id);
    localStorage.setItem('local_page_title', pageTitleText);
   $.ajax({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    },
    url: "get_shop_item_list_by_customer_id",
    type: "POST",
    dataType: "JSON",
    data: {customer_id: c_id,voice_text:voice_text,shop_id:shop_id},
    success: function (response) {
            var brand_name = '';
            var p = 1;
            var numberOfOrder = 100;

            /*make array two arrays*/
            var half_length = Math.ceil(response.shop_item_list.length / 2);    
//var leftSide = arrayName.splice(0,half_length);
var arrays1 = [];
var arrays2 = [];
// if(voice_text==''){
//              arrays1 = response.shop_item_list.slice(0,Math.ceil(response.shop_item_list.length / 2));
//              arrays2 = response.shop_item_list.slice(Math.ceil(response.shop_item_list.length / 2),response.shop_item_list.length);
//         }else{
//             for(var k=0;k<response.shop_item_list.length;k++){
//                 if ( k % 2 == 0) {
//                     arrays1.push(response.shop_item_list[k]);
//                 }else{
//                     arrays2.push(response.shop_item_list[k]);
//                 }
                
//             }
//         }  
for(var k=0;k<response.shop_item_list.length;k++){
    if ( k % 2 == 0) {
        arrays1.push(response.shop_item_list[k]);
    }else{
        arrays2.push(response.shop_item_list[k]);
    }
}

                var largeArray=arrays1;
                var smallArray=arrays2;
            console.log(largeArray);
            console.log(smallArray);
            var rightBarorderFrequency = 100-largeArray.length;
            for (var i = 0; i < (largeArray.length); i++) {
                var searchTextFound1 = 'searchTextNotFound';
                var searchTextFound2 = 'searchTextNotFound';
                var updatedColorLg = (largeArray[i].update_status=="1"?'updated_yes_off':'updated_no'); 
                
                if(voice_text!=''){
                    if(largeArray[i].name.indexOf(voice_text) != -1){
                        searchTextFound1 = 'searchTextFound';
                    }
                }
                brand_name +='<tr class="shopBrandListitem">';
               // brand_name +='<td  width="100px" style="text-align: center;">'+ p++ +'</td>';
                //brand_name += '<td style="text-align: left;"><a href="'+base_url+'/brand-order-detail/'+p+'">' + substr[k] + '</a></td>';
                brand_name += '<td class="'+searchTextFound1+'" style="text-align: left; width:40%">' + largeArray[i].name + '</td>';
                brand_name += '<td class="'+updatedColorLg+'" style="text-align: right;width:10%"><input type="tel" row_id="'+largeArray[i].customer_order_detail_id+'" field_name="last_qty" value="'+ largeArray[i].last_qty +'" class="form-control brndOrderInputQty"></td>';
                brand_name += '<td style="text-align: right;width:10%"><input type="tel" row_id="'+largeArray[i].customer_order_detail_id+'" field_name="selling_price" value="'+  largeArray[i].selling_price  +'" class="form-control brndOrderInputQty"></td>';
                brand_name += '<td style="text-align: right;width:10%"><input type="tel" row_id="'+largeArray[i].customer_order_detail_id+'" field_name="cost_price" value="'+  largeArray[i].cost_price  +'" class="form-control brndOrderInputQty"></td>';
                brand_name += '<td style="text-align: right;width:10%">'+ largeArray[i].order_frequency_num +'</td>';
                console.log(i+','+smallArray.length)
                if(i<smallArray.length){
                    if(voice_text!=''){
                        if(smallArray[i].name.indexOf(voice_text) != -1){
                            searchTextFound2 = 'searchTextFound';
                        }
                    }
                    var updatedColorSm = (smallArray[i].update_status=="1"?'updated_yes_off':'updated_no'); 
                    brand_name += '<td class="'+searchTextFound2+'" style="text-align: left; width:40%">' + smallArray[i].name + '</td>';
                    brand_name += '<td class="'+updatedColorSm+'" style="text-align: right;width:10%"><input type="tel" row_id="'+largeArray[i].customer_order_detail_id+'" field_name="last_qty" value="'+ smallArray[i].last_qty +'" class="form-control brndOrderInputQty"></td>';
                    brand_name += '<td style="text-align: right;width:10%"><input type="tel" row_id="'+largeArray[i].customer_order_detail_id+'" field_name="selling_price" value="'+ smallArray[i].selling_price +'" class="form-control brndOrderInputQty"></td>';
                    brand_name += '<td style="text-align: right;width:10%"><input type="tel" row_id="'+largeArray[i].customer_order_detail_id+'" field_name="cost_price" value="'+ smallArray[i].cost_price +'" class="form-control brndOrderInputQty"></td>';
                    brand_name += '<td style="text-align: right;width:10%">'+ smallArray[i].order_frequency_num +'</td>';
                }else{
                    brand_name += '<td style="text-align: left; width:40%"></td>';
                    brand_name += '<td style="text-align: right;width:10%"></td>';
                    brand_name += '<td style="text-align: right;width:10%"></td>';
                    brand_name += '<td style="text-align: right;width:10%"></td>';
                    brand_name += '<td style="text-align: right;width:10%"></td>';
                }
                brand_name +='</tr>';
            }
            $(".brand_order_tble").html(brand_name);
            $('#customer_shop_list_modal').modal('hide');
            nav_list['jn_0'].show();
            show_hide_nav_icn(0);
            
    }
});



}

// brand order
//brand updatedItemList
function get_brand_updated_item_list(c_id = 0, c_name = '',voice_text=''){
    var brand_name = '';
    var currnt_brand_list= 'コカ・コーラ(Coca-Cola),ポカリスエット,スターバックス,ネスカフェ,アサヒビール,BOSS(ボス),明治乳業,サントリー,カゴメ,ピカイチ野菜くん';
   // var currnt_brand_list= '店 A,店 B,店 C,店 D';
   if(voice_text!='' && voice_text=='サントリー'){
    voice_text = voice_text.replace("ー", ""); 
}
var shop_id = $('.s_ids_v').val();
   $.ajax({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    },
    url: "get_shop_updated_item_list_by_customer_id",
    type: "POST",
    dataType: "JSON",
    data: {customer_id: c_id,voice_text:voice_text,shop_id:shop_id},
    success: function (response) {
            var brand_name = '';
            var p = 1;
            var numberOfOrder = 100;
            var arrays1=[];
            var arrays2=[];
            for(var k=0;k<response.shop_item_list.length;k++){
                if ( k % 2 == 0) {
                    arrays1.push(response.shop_item_list[k]);
                }else{
                    arrays2.push(response.shop_item_list[k]);
                }
            }
            var largeArray=arrays1;
            var smallArray=arrays2;
            var rightBarorderFrequency = 100-largeArray.length;
            for (var i = 0; i < (largeArray.length); i++) {
                var searchTextFound1 = 'searchTextNotFound';
                var searchTextFound2 = 'searchTextNotFound';
                if(voice_text!=''){
                    if(largeArray[i].name.indexOf(voice_text) != -1){
                        searchTextFound1 = 'searchTextFound';
                    }
                }
                brand_name +='<tr class="shopBrandListitem">';
               // brand_name +='<td  width="100px" style="text-align: center;">'+ p++ +'</td>';
                //brand_name += '<td style="text-align: left;"><a href="'+base_url+'/brand-order-detail/'+p+'">' + substr[k] + '</a></td>';
                brand_name += '<td class="'+searchTextFound1+'" style="text-align: left; width:40%">' + largeArray[i].name + '</td>';
                brand_name += '<td style="text-align: right;width:10%"><input type="tel" value="'+ largeArray[i].last_qty +'" class="form-control brndOrderInputQty"></td>';
                brand_name += '<td style="text-align: right;width:10%"><input type="tel" value="'+ largeArray[i].selling_price +'" class="form-control brndOrderInputQty"></td>';
                brand_name += '<td style="text-align: right;width:10%"><input type="tel" value="'+ largeArray[i].cost_price +'" class="form-control brndOrderInputQty"></td>';
                brand_name += '<td style="text-align: right;width:10%">'+ largeArray[i].order_frequency_num +'</td>';
                console.log(i+','+smallArray.length)
                if(i<smallArray.length){
                    if(voice_text!=''){
                        if(smallArray[i].name.indexOf(voice_text) != -1){
                            searchTextFound2 = 'searchTextFound';
                        }
                    }
                    brand_name += '<td class="'+searchTextFound2+'" style="text-align: left; width:40%">' + smallArray[i].name + '</td>';
                    brand_name += '<td style="text-align: right;width:10%"><input type="tel" value="'+ smallArray[i].last_qty +'" class="form-control brndOrderInputQty"></td>';
                    brand_name += '<td style="text-align: right;width:10%"><input type="tel" value="'+ smallArray[i].selling_price +'" class="form-control brndOrderInputQty"></td>';
                    brand_name += '<td style="text-align: right;width:10%"><input type="tel" value="'+ smallArray[i].cost_price +'" class="form-control brndOrderInputQty"></td>';
                    brand_name += '<td style="text-align: right;width:10%">'+ smallArray[i].order_frequency_num +'</td>';
                }else{
                    brand_name += '<td style="text-align: left; width:40%"></td>';
                    brand_name += '<td style="text-align: right;width:10%"></td>';
                    brand_name += '<td style="text-align: right;width:10%"></td>';
                    brand_name += '<td style="text-align: right;width:10%"></td>';
                    brand_name += '<td style="text-align: right;width:10%"></td>';
                }
                brand_name +='</tr>';
            }
            $(".brand_order_updated_tble").html(brand_name);
            $('#customer_shop_list_modal').modal('hide');
            nav_list['jn_0'].show();
            show_hide_nav_icn(0);
    }
});



}
//brand updatedItemList
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
