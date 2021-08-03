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

  /*  
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
});
const installApp = document.getElementById('installApp');

installApp.addEventListener('click', async () => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
        }
    }
});
*/

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
        console.log('individual hit');
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

    // $('#scan_by_jan_for_stock_detail_handy').on('paste',function (e) {
    //     let _this = this
    //     setTimeout(function () {
    //         let value = $(_this).val();
    //         if (value.length == 13) {
    //             alert(33);
    //             $('.scan_bybin_search_new').click();
    //         }
    //     },200)
    // })

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
    console.log('hit up inv');
    if(case_ball_inputs_set == 0) {
        $('#handy-navi').show()
        $('#handy-navi-body').html('<li>在庫を入れて下さい。</li><li>この商品は入り数が設定されていません。仕入マスター画面で入り数を設定して下さい。</li><li><a class="btn btn-primary " href="' + Globals.base_url + '/handy_vendor_master">仕入マスター</a></li>')
        return false;
    }
    let case_input = $(".case_inputs_").val();
    let boll_input = $(".boll_inputs_").val();
    let case_quantity, ball_quantity, bara, total = 0, rack_number,previous_rack_number, vendor_item_id, stock_item_id, vendor_id;
    vendor_item_id = $('.case_invent_qty_' + index).attr('data_attr_v_item_id');
    vendor_id = $('.case_invent_qty_' + index).attr('data_attr_v_id');
    stock_item_id = $('.case_invent_qty_' + index).attr('data_attr_row_id');
    case_quantity = $('.case_invent_qty_' + index).val();
    ball_quantity = $('.bol_invent_qty_' + index).val();
    bara = $('.unit_invent_qty_' + index).val();
   // rack_number = $('.case_invent_qty_' + index).attr('data_attr_rack_number');
   previous_rack_number = $('.case_invent_qty_' + index).attr('data_attr_rack_number');
    rack_number = $('#rack' + index).val();
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
    if (rack_number != previous_rack_number) {
        type = 1;//$('.new_rack_entry' + index).val();
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
                previous_rack_number: previous_rack_number,
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
                    let maker_id = response.maker_id;
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
                        maker_id: maker_id,
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

function saveAndGoNextInventory(e, i, type) {
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
