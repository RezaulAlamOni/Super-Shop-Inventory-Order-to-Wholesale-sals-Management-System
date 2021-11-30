<template>
    <section>
        <div class="main-content-container container-fluid px-4">
            <!-- Small Stats Blocks -->
            <div class="row">
                <div class="well" style="border: 3px solid #428bca;">
                    <div class="header col-md-12 col-xs-12" style="font-size: 18px; padding: 10px;">
                        <span class="pull-left">
                                棚・入庫
                            </span>
                        <!-- <button id="handy_shipment_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button>&nbsp;-->
                        <a :href="base_url+'/android_home'" class="btn btn-primary pull-right"
                           style="float:right"> メニュー</a>

                    </div>
                    <div class="col-md-offset-2 col-md-8 col-centereds">
                        <div class="row custom_p_scan">
                            <br>
                            <br>
                            <div id="stock_detail_by_jan_form" class="p_scn_form text-right">
                                <div class="form-group row">
                                    <span class="text-warning" style="width: 100%; text-align: center;">
                                        枠の中にクリックしてから <br> JANコードスキャンしてください
                                    </span>
                                    <div class="col-md-12">
                                        <input type="tel" id="jan_input" class="form-control custom-input"
                                               v-model="jan_code"
                                               name="scan_by_jan_for_stock_detail"
                                               v-on:keyup="checkAndGetData($event)"
                                               @paste="checkAndGetData($event)"
                                               @input="checkAndGetData($event)"
                                               @blur="checkAndGetData($event)"
                                               placeholder="JANコードスキャン（13桁）" autofocus>
                                    </div>
                                </div>
                                <div>
                                    <button type="button" @click="alertForIos" onclick="$('#jan_input').focus()"
                                            class="hide btn custom-btn btn-primary text-right show_inline search-button-ios "
                                            style="float: left;width: 100px">
                                        音声
                                    </button>
<!--                                    <text-recognition :base_url="base_url" class="hide"-->
<!--                                                      @getSearchData="getSearchData"-->
<!--                                                      @clearInput="clearInput"></text-recognition>-->

                                    <button type="button" @click="getBarCodeScan()"
                                            class="pr-0 ml-1 btn custom-btn btn-primary text-right show_inline search-button"
                                            style="padding:0;float: left;width: 70px !important;">
                                        <i class="fa fa-barcode" style="font-size: 40px"></i>
                                    </button>
                                    <button type="button" v-on:click="getOrderDataByJan()"
                                            style="margin: 0px;width: 80px !important;"
                                            class="btn custom-btn btn-primary pull-right text-right show_inline">
                                        次へ
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true" id="stock-order-show-by-jan">
            <div class="modal-dialog modal-lg mt-0">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <div class="main-content-container container-fluid">
                            <div class="row">
                                <div class="well" style="border: 3px solid rgb(66, 139, 202);">
                                    <div id="handy_order_form_by_jan" class="form-horizontal">
                                        <div class="form-horizontal" id="handy_order_form">
                                            <div class="form-group"
                                                 style="border-radius: 5px; margin-top: 18px !important; margin-bottom: 2px">
                                                <p id="search_product_name" class="product_name_aria">
                                                    <span style="color: #999; font-size: 20px !important;"> {{
                                                            product_name
                                                        }}</span>
                                                </p>
                                            </div>
                                            <div class="form-group" style="margin-bottom: 0">
                                                <div class="col-md-12 col-xs-12 padding_0">
                                                    <table class="table table-bordered physical_handy_tabls">
                                                        <thead>
                                                        <tr>
                                                            <th style="width: 50px; text-align: center;padding: 05px">
                                                                ケース <br>
                                                                (入数 {{ order_data.case_inputs }})
                                                            </th>
                                                            <th style="width: 50px; text-align: center;padding: 05px">
                                                                ボール <br> (入数 {{ order_data.ball_inputs }})

                                                            </th>
                                                            <th style="width: 50px; text-align: center;padding: 05px;">
                                                                バラ
                                                            </th>
                                                            <th style="width: 50px; text-align: center; padding: 5px;">
                                                                入庫
                                                                棚no
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody class="physicaltbody">
                                                        <template v-if="order_data.length > 0">
                                                            <tr v-for="(order,index) in order_data">
                                                                <td>
                                                                    <input type="tel" @click="selectItem($event,'case')"
                                                                           @keypress="pressEnterAndNext($event,'case',index)"
                                                                           :value="order.case_quantity" :id="'case'+index"
                                                                           class="form-control inputs ">
                                                                    <!--                                                                @blur="updateOrderQnty('ケース')"-->
                                                                </td>

                                                                <td>
                                                                    <input type="tel" @click="selectItem($event,'ball')"
                                                                           @keypress="pressEnterAndNext($event,'ball',index)"
                                                                           :value="order.ball_quantity" :id="'ball'+index"
                                                                           class="form-control boll_order inputs">
                                                                    <!--                                                                @blur="updateOrderQnty('ボール')"-->
                                                                </td>

                                                                <td>
                                                                    <input type="tel" @click="selectItem($event,'bara')"
                                                                           @keypress="pressEnterAndNext($event,'bara',index)"
                                                                           :value="order.unit_quantity" :id="'bara'+index"
                                                                           class="form-control cmn_num_formt bara_order inputs ">
                                                                </td>

                                                                <td>
                                                                    <input type="tel"
                                                                           @keypress="pressEnterAndSave($event,index)"
                                                                           class="form-control  update_rack_code_exec  "
                                                                           :id="'rack'+index"
                                                                           v-model="order.rack_number"
                                                                           style="border-radius: 0px; text-align: center;">
                                                                </td>

                                                            </tr>
                                                        </template>
                                                        <template v-else>
                                                            <tr>
                                                                <td style="font-size:16px;background: #f4c8c8;text-align:center;vertical-align:0;"
                                                                    colspan="4">
                                                                    データが見つかりませんでした。
                                                                </td>
                                                            </tr>
                                                        </template>


                                                        </tbody>
                                                    </table>

                                                    <a href="javascript:void(0)"
                                                       class="btn btn-primary pull-right custom-btn"
                                                       id="order-place-button"
                                                       v-on:click="updateTemporaryTana()"
                                                       style="float:right;margin-top: -10px">
                                                        次の商品へ</a>
                                                </div>
                                                <div class="input-group mb-2"
                                                     style="border: .5px solid #b8b7b7;border-radius: 5px;width: 50%;height: 45px;margin-top: -10px;">
                                                    <div class="input-group-prepend"
                                                         style=" color: black;    /* padding: 0px 0px; */">
                                                        <div class="input-group-text"
                                                             style="color: black;font-weight: bold;padding: 0 11px;font-size: 16px;">
                                                            在庫合計
                                                        </div>
                                                    </div>
                                                    <input type="tel" class="total_stock_jaiko_new jaiko_ form-control"
                                                           readonly="" :value="total_quantity"
                                                           style="padding: 5px 5px;    font-size: 16px;">
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true" id="select_tonya">
            <div class="modal-dialog modal-lg mt-0">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <div class="main-content-container container-fluid">
                            <div class="row">
                                <div class="well" style="border: 3px solid rgb(66, 139, 202);">
                                    <div id="handy_order_form_by_jan_" class="form-horizontal">
                                        <div class="form-horizontal" id="handy_order_form_">

                                            <div class="form-group" style="margin-bottom: 0">
                                                <div class="col-md-12 col-xs-12 padding_0">
                                                    <div class="form-group">
                                                        <select class="form-control" id="sel1" v-model="vendor_id"
                                                                onchange="updateVendorData()">
                                                            <option value="null">問屋を選択</option>
                                                            <option v-for="vendor in vendors" :value="vendor.id">
                                                                {{ vendor.text }}
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <a href="javascript:void(0)" @click="updateVendorData()"
                                                       class="btn btn-primary pull-right custom-btn"
                                                       style="float:right">
                                                        次の商品へ
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="form-group"
                                                 style="border-radius: 5px; margin-top: 85px !important;">
                                                <p id="search_product_name_" class="product_name_aria">
                                                    <span style="color: #999; font-size: 20px;">
                                                        {{ product_name }}
                                                </span>
                                                </p>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 handdy_error hide hide_enter_outside close_aria"
             style="position: fixed; bottom: 0px; right: 0px; padding: 4px;">
            <div class="panel panel-danger"
                 style="margin-bottom: 2px; border: solid 2px red; border-top: solid 5px red; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
                <div class="panel-body" style="padding:10px">
                    <p style="margin: 0; font-size: 20px;" class="text-danger handy_error_msg text-center"></p>
                </div>
            </div>
        </div>

        <div class="jn nav_disp" style="z-index: 9999;width: 270px; right: 15px; bottom: 15px;" id="handy-navi">
            <div class="card card-warning jn_old_popup " style="padding: 6px">
                <!--                <div class="card-heading">-->
                <!--                    <a class="btn btn-light float-right" href="javascript:void(0)"-->
                <!--                       onclick="$('#handy-navi').hide()">戻る</a>-->
                <!--                </div>-->
                <div class="card-body">
                    <a class="btn btn-light float-right" href="javascript:void(0)"
                       onclick="$('#handy-navi').hide()">戻る</a>
                    <ol id="handy-navi-body" v-html="handi_navi">

                    </ol>

                </div>
            </div>
        </div>


        <!--        bar code scan modal   -->
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true" id="bar-code-scan-area">
            <div class="modal-dialog modal-lg mt-0">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <div class="main-content-container container-fluid pt-2">
                            <StreamBarcodeReader v-if="barCodeScan" @decode="onDecode"
                                                 @loaded="onLoad()"></StreamBarcodeReader>

                            <button type="button" @click="getBarCodeScan()"
                                    style="float: right;margin: 5px 0;width: 95px !important;"
                                    class="btn custom-btn btn-primary pull-right text-right show_inline">
                                次へ
                            </button>
                        </div>
                    </div>

                </div>


            </div>
        </div>

        <div class="jn nav_disp" style="z-index: 9999;width: 270px; right: 15px; bottom: 15px;display: none"
             id="handy-navi-jan-list">
            <div class="card card-warning jn_old_popup " style="padding: 6px;max-height: 70vh;overflow: auto">
                <div class="card-body">
                    <a class="btn btn-light float-right" href="javascript:void(0)"
                       onclick="$('#handy-navi-jan-list').hide()">戻る</a>
                    <ol id="handy-navi-body-for-jan-list">
                        <li style='cursor: pointer' v-for="data in search_data"
                            @click='GetDetailsFormSearchList(data.jan)'>{{ data.name }}
                        </li>
                    </ol>


                </div>
            </div>
        </div>
        <!--        bar code scan modal end-->
    </section>

</template>

<script>
import TextRecognition from "./text-recognition";
import {StreamBarcodeReader} from "vue-barcode-reader";
export default {
    components: {TextRecognition, StreamBarcodeReader},
    props: ['base_url'],
    name: "handy-product-inventory-tana-update",
    data() {
        return {
            jan_code: '',
            order_data: [],
            case_order: 0,
            boll_order: 0,
            bara_order: 0,
            type: 0,
            input_type: '',
            vendors: [],
            product_name: '',
            vendor_id: null,
            vendor_item_id: null,
            maker_id: null,
            loader: 0,
            total_quantity: 0,
            handi_navi: '',
            temp_rack_number: '',
            search_data: [],
            barCodeScan: 0
        }
    },
    mounted() {
        let _this = this;
        $('#stock-order-show-by-jan').on('hidden.bs.modal', function () {
            _this.jan_code = ''
            setTimeout(function () {
                $('#jan_input').focus()
            }, 120)
        });
        _this.handi_navi = 'JANコードスキャンして<br>【次へ】押してください。';
    },
    methods: {
        getOrderDataByJan() {
            let _this = this;
            if (_this.jan_code.length <= 0) {
                return false;
            }
            $('.loading_image_custom').show()
            _this.loader = 1
            axios.post(this.base_url + '/handy_stock_product_store_rack_code', {'scan_by_jan_for_stock_detail': _this.jan_code})
                .then(function (res) {
                    //_this.resetField();
                    if (res.data.result.length > 0) {
                        _this.order_data = res.data.result;
                        _this.temp_rack_number = res.data.last_rack;
                        _this.product_name = _this.order_data[0].item_name;

                        _this.calculateTotalQuantity();

                        if (_this.type == 0) {
                            $('#stock-order-show-by-jan').modal({backdrop: 'static', keyboard: false})
                            setTimeout(function () {
                                if ($('#rack' + 0).length <= 0) {
                                    $('#order-place-button').focus()
                                } else {
                                    $('#rack' + 0).focus()
                                    $('#rack' + 0).select()
                                }
                            }, 720)
                        }
                    } else {

                        _this.handi_navi = '<li>このJANコードはマスターに見つかりません</li>';
                        $('#handy-navi').show()
                    }

                })
                .catch(function () {
                    console.log('eror found');
                     _this.handi_navi = '<li>棚入れ・入庫をしたい商品をスキャンして\n' +
                         '棚番を入力してください。（前回同様の場合はそのまま完了してください）\n</li>';
                        $('#handy-navi').show()
                })
                .finally(function () {
                    //_this.jan_code = ''
                    $('.loading_image_custom').hide()
                    _this.loader = 0
                })
        },
        updateOrderQnty(type) {
            let _this = this;
            _this.input_type = type
            let quantity = type == 'ケース' ? this.case_order : (type == 'ボール' ? this.boll_order : this.bara_order);
            // console.log(_this.input_type)
            // console.log(quantity)
            if (quantity > 0) {
                let data = {
                    vendor_item_id: this.order_data.vendor_item_id,
                    field_type: type,
                    order_type: 'order_lot',
                    quantity: quantity
                }
                axios.post(this.base_url + '/update_receive_order_item_content', data)
                    .then(function (res) {
                        if (type == 'ケース') {
                            _this.boll_order = 0;
                            _this.bara_order = 0;
                            // $('.boll_order').focus()
                            // $('.boll_order').select()
                        } else if (type == 'ボール') {
                            _this.case_order = 0;
                            _this.bara_order = 0;
                            // $('.bara_order').focus()
                            // $('.bara_order').select()
                        } else {
                            _this.boll_order = 0;
                            _this.case_order = 0;
                        }
                        // _this.type == 1
                        // _this.getOrderDataByJan()
                        // _this.type == 0
                    })
                    .then(function (er) {

                    })
            }


        },
        hideModelAndClearInput() {
            $('#stock-order-show-by-jan').modal('hide')
            this.jan_code = ''
            setTimeout(function () {
                $('#jan_input').focus()
            }, 120)
        },
        checkAndGetData(e) {
            if (this.loader == 1) {
                return false;
            }
            if (this.jan_code.length >= 13 || this.jan_code.length==8) {
                this.getOrderDataByJan()
            }
            if (e.keyCode == 13) {
                this.getOrderDataByJan()
            }
        },
        selectItem(e, type) {
            e.target.select()
            this.input_type = type;
        },
        updateTemporaryTana() {
            let _this = this;
            let data = [];
            $('.loading_image_custom').show()
            this.order_data.map(function (order) {
                if (order.rack_number.length >= 4) {
                    let _data = {
                        rack_number: order.rack_number,
                        case_quantity: order.case_quantity,
                        unit_quantity: order.unit_quantity,
                        ball_quantity: order.ball_quantity,
                        vendor_id: order.vendor_id,
                        stock_item_id: order.stock_item_id,
                        vendor_item_id: order.vendor_item_id
                    }
                    data.push(_data)
                }
            })
            if (data.length <= 0) {
                $('.loading_image_custom').hide()
                $('#stock-order-show-by-jan').modal('hide')
            } else {
                axios.post(this.base_url + '/stock_inventory_update_rack_multiple', {data: data})
                    .then(function (res) {

                        $('#handy-navi').show()
                        _this.handi_navi = '<li>棚入庫が完了しました。次のJANコードスキャンして【次へ】押してください。</li>';

                        _this.hideModelAndClearInput()
                    })
                    .then(function (er) {

                    })
                    .finally(function () {
                        $('.loading_image_custom').hide()
                        _this.loader = 0
                    })
            }


        },
        resetField() {
            if (this.input_type == 'ケース') {
                this.boll_order = 0;
                this.bara_order = 0;
            } else if (this.input_type == 'ボール') {
                this.case_order = 0;
                this.bara_order = 0;
            } else {
                this.case_order = 0;
                this.boll_order = 0;
            }
        },
        pressEnterAndSave(e, i) {
            if (e.keyCode == 13) {
                $('#case'+ (i+1)).focus()
                $('#case'+ (i+1)).select()
                // $('#rack' + (i + 1)).focus()
                // $('#rack' + (i + 1)).select()
                if ($('#case'+ (i+1)).length <= 0) {
                    $('#order-place-button').focus()
                }
            }
        },
        pressEnterAndNext(e,type, i) {
            if (e.keyCode == 13) {

                if (type == 'case') {
                    $('#ball'+i).focus()
                    $('#ball'+i).select()

                    // this.input_type = 'ボール';

                } else if (type == 'ball') {
                    $('#bara'+i).focus()
                    $('#bara'+i).select()
                    // this.input_type = 'バラ';

                } else {
                    $('#rack' + i).focus()
                }

                // $('#rack' + (i + 1)).focus()
                // $('#rack' + (i + 1)).select()
                // if ($('#rack' + (i + 1)).length <= 0) {
                //     $('#order-place-button').focus()
                // }
            }
        },
        insertToJanList() {
            let _this = this;
            let jan_code = _this.jan_code;
            axios.post(_this.base_url + '/get_jan_info', {jan_code: _this.jan_code})
                .then(function (response) {
                    let api_response = response.data.api_data;
                    let data_resource = response.data.data_resource;

                    if (api_response == 'invalid_jan_code') {
                        $('.handy_error_msg').html(`商品がありません`);
                        $('.handdy_error').removeClass('hide').addClass('show');
                    } else {
                        _this.product_name = api_response.name;
                        if (response.data.vendor_item_data == 1) {
                            console.log('this jan code is already registered');
                            _this.vendor_item_id = response.data.vendor_item_data
                            _this.maker_id = response.data.maker_id
                            _this.getVendorList();
                        } else {
                            console.log('do insert ' + jan_code);
                            let item_name = api_response.name;
                            let case_qty = 0;
                            let ball_qty = 0;
                            let api_maker_name = '';
                            if (data_resource == 'database') {
                                case_qty = api_response.case_inputs;
                                ball_qty = api_response.ball_inputs;
                            } else if (data_resource == 'api') {
                                api_maker_name = api_response.maker_name;
                            }
                            let vendor_id = response.data.vendor_id;
                            let price = 100;
                            /*insert auto vendor item*/
                            let order_point_unit = 'ケース';
                            let order_point_quantity = 1;
                            let order_lot_unit = 'ケース';
                            let order_lot_quantity = 1;
                            let vendor_item_id = null;
                            let sale_price = 0;
                            let basic_start_date = '2020-01-01';
                            let basic_end_date = '2021-12-31';
                            let sale_start_date = '2020-01-01';
                            let sale_end_date = '2021-12-31';
                            let data = {
                                maker_id:response.data.maker_id,
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

                            axios.post(_this.base_url + '/add_vendor_item', data)
                                .then(function (response) {
                                    console.log(response.data)
                                    _this.insertToJanList()
                                })
                                .catch(function (er) {

                                })


                        } //else

                    } //else

                })
                .then(function (er) {

                })
        },
        getVendorList() {
            let _this = this;
            axios.get(_this.base_url + '/get_all_vendor_list_for_select2')
                .then(function (response) {
                    console.log(response.data)
                    _this.vendors = response.data.results;
                    $('#select_tonya').modal({backdrop: 'static', keyboard: false})
                })
                .catch(function (e) {

                })
        },
        updateVendorData() {
            let _this = this;

            if (_this.vendor_id == null) {
                $('.handy_error_msg').html(`「仕入先」を指示してください。`);
                $('.handdy_error').removeClass('hide').addClass('show');
                return false;
            }
            axios.post(_this.base_url + '/vendor_master_update_by_vendor_id', {
                vendor_item_id: _this.vendor_item_id,
                vendor_id: _this.vendor_id,
                maker_id: _this.maker_id
            }).then(function (response) {
                $('#select_tonya').modal('hide')
                _this.getOrderDataByJan();
            })
        },
        calculateTotalQuantity() {
            let _this = this;
            let data = [];
            _this.total_quantity = 0;

            this.order_data.map(function (order) {
                if (order.rack_number.length == 3) {
                    _this.total_quantity += parseInt(order.unit_quantity) + parseInt(order.ball_quantity) * parseInt(order.ball_inputs) + parseInt(order.case_quantity) * parseInt(order.case_inputs)
                    if (_this.temp_rack_number) {
                        order.rack_number = _this.temp_rack_number;
                    }else{
                        order.rack_number ='';
                    }
                    data.push(order)
                }
            })
            this.order_data = data;

        },

        // new scanner & voice search added for this

        getSearchData(text) {
            let _this = this;
            if (text.length <= 0) {
                return false;
            }
            $('.loading_image_custom').show()
            _this.jan_code = text;
            axios.post(_this.base_url + '/item_search_by_name', {'name': text})
                .then(function (res) {
                    res = res.data
                    _this.search_data = res.name_list;
                    if (_this.search_data.length > 0) {
                        $('#handy-navi').hide()
                        $('#handy-navi-jan-list').show()
                    } else {
                        _this.handi_navi = '<li>XXXXXXX。</li>';
                        $('#handy-navi').show()
                    }

                })
                .catch(function () {

                })
                .finally(function () {
                    $('.loading_image_custom').hide()
                })


        },
        alertForIos() {
            this.jan_code = ""
            this.handi_navi = '<li>キーボードの 【<img src="' + this.base_url + '/public/backend/images/mic.png' + '" height="18px" alt=""> 】マイクロフォンを押して音声検索してください。</li>';
            $('#handy-navi').show()
            setTimeout(function () {
                // $('#jan_input').focus()

            }, 120)
            this.jan_code = ""

        },
        getBarCodeScan() {
            this.barCodeScan = this.barCodeScan ? 0 : 1;
            this.barCodeScan ? $('#bar-code-scan-area').modal({backdrop: 'static', keyboard: false}) : $('#bar-code-scan-area').modal('hide');
        },
        onDecode(result) {
            console.log(result)
            this.getBarCodeScan();
            this.jan_code=result;
            $('#handy-navi').hide()
            this.getOrderDataByJan()
        },
        onLoad(){
            $('#handy-navi').show()
            this.handi_navi = '<li>********。</li>';
        },
        clearInput() {
            this.jan_code = ""
        },

        // text recognition and bar code scanner end

    },
    watch: {
        // jan_code: function (val) {
        //     if (val.length >= 13) {
        //         $('#stock-order-show-by-jan').modal()
        //         console.log('data submit')
        //     }
        // }
    }
}
</script>

<style scoped>
.order_quantity_ {
    /*background: #F3F885 !important;*/
}

select {
    font-size: 18px;
    height: 45px !important;
}

</style>
