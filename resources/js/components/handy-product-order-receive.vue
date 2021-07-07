<template>
    <section>
        <div class="main-content-container container-fluid px-4">
            <!-- Small Stats Blocks -->
            <div class="row">
                <div class="well" style="border: 3px solid #428bca;">
                    <div class="header col-md-12 col-xs-12" style="font-size: 18px; padding: 10px;">
                        <span class="pull-left"> 検品・仮置き（入荷一覧)</span>
                        <!-- <button id="handy_shipment_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button>&nbsp;-->
                        <a :href="base_url+'/android_home'" class="btn btn-primary pull-right"
                           style="float:right;position: absolute;right: 0;"> メニュー</a>

                    </div>
                    <div class="col-md-offset-2 col-md-8 col-centereds">
                        <div class="row custom_p_scan">
                            <br>
                            <br>
                            <div id="stock_detail_by_jan_form" class="p_scn_form text-right">
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <input type="tel" id="jan_input" class="form-control custom-input"
                                               v-model="jan_code" name="scan_by_jan_for_stock_detail"
                                               v-on:keyup="checkAndGetData($event)"
                                               placeholder="JANコードスキャン（13桁）" autofocus>
                                    </div>
                                </div>
                                <button type="button" v-on:click="getOrderDataByJan()"
                                        class="btn custom-btn btn-primary pull-right text-right show_inline">
                                    次へ
                                </button>

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
                                                    <span style="color: #999; font-size: 20px;"> {{
                                                            order_data.item_name
                                                        }}
                                                </span>
                                                </p>
                                            </div>
                                            <div class="form-group"
                                                 style="border-radius: 5px; margin-top: 5px !important; margin-bottom: 2px">
                                                <p id="search_product_name" class="product_vendor_name_aria" style="min-height:40px;">
                                                    <span style="color: #999; font-size: 20px;"> {{
                                                            order_data.vendor_name
                                                        }}
                                                </span>
                                                <span style="color: #999; font-size: 20px;" v-if="Object.keys(last_order_info).length>0">{{last_order_info.order_date}} {{last_order_info.maker_name}}</span>
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
                                                            <th style="width: 50px; text-align: center;padding: 05px;">
                                                                入庫
                                                                棚no
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody class="physicaltbody">

                                                        <tr>
                                                            <td>
                                                                <input type="tel" @click="selectItem($event)"
                                                                       @keypress="pressEnterAndSave($event,'case')"
                                                                       v-model="case_order"
                                                                       class="form-control cmn_num_formt case_order inputs custom-input"
                                                                       :class="order_data.order_lot_inputs == 'ケース' && case_order>0 ? 'order_quantity_' : ''"
                                                                >

                                                            </td>

                                                            <td>
                                                                <input type="tel" @click="selectItem($event)"
                                                                       @keypress="pressEnterAndSave($event,'boll')"
                                                                       v-model="boll_order"
                                                                       class="form-control cmn_num_formt boll_order inputs custom-input"
                                                                       :class="order_data.order_lot_inputs == 'ボール' && boll_order>0 ? 'order_quantity_' : ''"
                                                                >

                                                            </td>

                                                            <td>
                                                                <input type="tel" @click="selectItem($event)"
                                                                       @keypress="pressEnterAndSave($event,'bara')"
                                                                       v-model="bara_order"
                                                                       class="form-control cmn_num_formt bara_order inputs custom-input"
                                                                       :class="order_data.order_lot_inputs == 'バラ' && bara_order>0 ? 'order_quantity_' : ''"
                                                                >
                                                            </td>
                                                            <td>
                                                                <input v-model="temp_tana"
                                                                       style="color: #000; font-size: 18px;"
                                                                       type="tel" @keypress="enterAndNext($event)"
                                                                       data_field_name="reck_no" name="car_rack_code__"
                                                                       class="car_rack_code__ form-control inputs custom-input"
                                                                       maxlength="3"
                                                                       id="car_rack_code"
                                                                       placeholder="">
                                                                <!--                                                                (3桁）-->
                                                            </td>

                                                        </tr>

                                                        </tbody>
                                                    </table>

                                                    <a href="javascript:void(0)" @click="insertRackNumberModal()"
                                                       class="btn btn-primary pull-right custom-btn"
                                                       id="order-place-button" style="float:right;margin-top: -10px">
                                                        次へ</a>
                                                </div>
                                                <div class="input-group mb-2"
                                                     style="border: .5px solid #b8b7b7;border-radius: 5px;width: 50%;height: 45px;margin-top: -10px;">
                                                    <div class="input-group-prepend"
                                                         style=" color: black;    /* padding: 0px 0px; */">
                                                        <div class="input-group-text"
                                                             style="color: black;font-weight: bold;padding: 0 11px;font-size: 16px;">
                                                            発注合計
                                                        </div>
                                                    </div>
                                                    <input type="text" class="total_stock_jaiko_new jaiko_ form-control"
                                                           readonly="" :value="total_quantity"
                                                           style="padding: 5px 5px;    font-size: 16px;">
                                                </div>
                                            </div>


                                        </div>
                                        <div class="form-group" style="display:none">
                                        <h4 class="text-center">前回リスト</h4>
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>NO</th>
                                                        <th>品名</th>
                                                        <th>発注日付</th>
                                                        <th>発注合計</th>
                                                        <th>入庫 棚no</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-if="get_last_order_list.length>0" v-for="(order_value,index) in get_last_order_list">
                                                        <td>{{index+1}}</td>
                                                        <td>{{order_value.name}}</td>
                                                        <td>{{order_value.order_date}}</td>
                                                        <td>{{order_value.arrival_qty}}</td>
                                                        <td>{{order_value.car_rack_number}}</td>
                                                    </tr>
                                                    <tr v-if="get_last_order_list.length==0">
                                                        <td colspan="5" style="text-align:center;">注文が見つかりません</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <button class="btn btn-primary pull-right" style="float:right" @click="gerLastOrderlist">次のリスト</button>
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

        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
             aria-labelledby="myLargeModalLabel"
             aria-hidden="true" id="tana-update-with-receive">
            <div class="modal-dialog modal-lg" style="    margin-top: 75px;">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <div class="main-content-container container-fluid">
                            <div class="row">
                                <div class="well" style="border: 3px solid rgb(66, 139, 202);">
                                    <div id="handy_order_form_by_janooo_" class="form-horizontal">
                                        <div class="form-group">
                                            <div class="col-xs-12 scan_btn"
                                                 style="display: flex;margin-top: 10px;flex-direction: column">
                                                <div
                                                    style="margin: 0 5px;padding: 0 5px;font-size: 20px;font-weight: bold;">
                                                    仮置き棚番号
                                                </div>
                                                <!--                                                <input v-model="temp_tana"-->
                                                <!--                                                       style="color: #000; font-size: 18px; height: 45px;width: 100%;margin-top: 10px;"-->
                                                <!--                                                       type="tel" @keypress="enterAndNext($event)"-->
                                                <!--                                                       data_field_name="reck_no" name="car_rack_code__"-->
                                                <!--                                                       class="car_rack_code__ form-control" maxlength="3"-->
                                                <!--                                                       id="car_rack_code"-->
                                                <!--                                                       placeholder="スキャン仮置き棚番号(3桁）">-->

                                            </div>

                                        </div>
                                    </div>
                                    <a href="javascript:void(0)" id="next-receive" class="btn btn-primary pull-right "
                                       @click="receiveOrder()"
                                       style="float:right;">次の商品へ</a>
                                    <!--onclick="$('#vendor_arival_insert_recv_order').click()"-->
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
                    <ol id="handy-navi-body" v-html="navi_body">
                    </ol>

                </div>
            </div>
        </div>
    </section>

</template>

<script>
export default {
    props: ['base_url'],
    name: "handy-product-order-receive",
    data() {
        return {
            jan_code: '',
            order_data: [],
            last_order_info: [],
            get_last_order_list: [],
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
            temp_tana: '',
            total_quantity: 0,
            navi_body: '',
            skip_val:0,

        }
    },
    mounted() {
        let _this = this;
        setTimeout(function () {
            $('#jan_input').focus()
        }, 220)
        $('#stock-order-show-by-jan').on('hidden.bs.modal', function () {
            _this.jan_code = ''
            setTimeout(function () {
                $('#jan_input').focus()
            }, 120)
        });
        _this.navi_body = '<li>JANコードスキャンして<br>【次へ】押してください。</li>';

    },
    methods: {
        gerLastOrderlist(){
            let _this = this;
            _this.skip_val =_this.skip_val+10;
            axios.post(this.base_url + '/handy_received_product_detail_by_jan_code_for_order_list', {'jan_code': _this.jan_code,'skip_val':_this.skip_val})
                .then(function (res) {
                    _this.get_last_order_list = res.data.get_last_order_list
                })
        },
        getOrderDataByJan() {
            let _this = this;
            if (_this.jan_code.length <= 0) {
                return false;
            }
            $('.loading_image_custom').show()
            axios.post(this.base_url + '/handy_received_product_detail_by_jan_code', {'jan_code': _this.jan_code})
                .then(function (res) {
                    // console.log(res.data)
                    if (res.data.status == 505) {
                        _this.jan_code = '';
                        $('#handy-navi-body').html('<li>この商品は登録されていません。</li><li> 【棚卸(在庫)】押して登録してください。</li>')
                        $('#handy-navi').show()
                        return false;
                    }
                    if (res.data.status == 501) {
                        _this.jan_code = '';
                        $('#handy-navi-body').html('<li>この商品は発注されていません。</li>')
                        $('#handy-navi').show()
                        return false;
                    }

                    _this.resetField();

                    _this.order_data = res.data.result
                    _this.temp_tana = res.data.temp_rack
                    _this.last_order_info = res.data.last_order_info
                    _this.get_last_order_list = res.data.get_last_order_list
                    console.log( _this.get_last_order_list);
                    _this.case_order = _this.order_data.order_case_quantity;
                    _this.boll_order = _this.order_data.order_ball_quantity;
                    _this.bara_order = _this.order_data.order_unit_quantity;
                    _this.calculateTotalQuantity()
                    setTimeout(function () {
                        $('.case_order').focus();
                        $('.case_order').select();
                    }, 1100)

                    if (_this.type == 0) {
                        // $('#stock-order-show-by-jan').modal()
                        $('#stock-order-show-by-jan').modal({backdrop: 'static', keyboard: false})
                    }

                    // _this.insertToJanList();
                    // $('#select_tonya').modal({backdrop: 'static', keyboard: false})
                    // $('#handy-navi-body').html('<li>このjanコードはマスターに見つかりません</li>')
                    // $('#handy-navi').show()


                })
                .catch(function () {

                })
                .finally(function () {
                    // setTimeout(function () {
                    //
                    // },100)
                    $('.loading_image_custom').hide();
                })
        },
        insertRackNumberModal() {
            let _this = this;
            if (_this.case_order <= _this.order_data.order_case_quantity && _this.boll_order <= _this.order_data.order_ball_quantity && _this.bara_order <= _this.order_data.order_unit_quantity) {
                // $('#tana-update-with-receive').modal({backdrop: 'static', keyboard: false})
                // setTimeout(function () {
                //     $('.car_rack_code__').focus();
                //     $('.car_rack_code__').select();
                // }, 1100)
                _this.receiveOrder();

            } else {
                $('#handy-navi-body').html('<li>000</li>')
                $('#handy-navi').show()
            }

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
            $('#tana-update-with-receive').modal('hide')
            this.jan_code = ''
            this.temp_tana = ''
            setTimeout(function () {
                $('#jan_input').focus()
            }, 120)
        },
        checkAndGetData(e) {
            if (this.jan_code.length >= 13 && e.keyCode == 13) {
                this.getOrderDataByJan()
            } else if (this.jan_code.length >= 13) {
                this.getOrderDataByJan()
            } else if (e.keyCode == 13) {
                this.getOrderDataByJan()
            }
        },
        selectItem(e, type) {
            e.target.select()
        },
        receiveOrder() {
            let _this = this;
            // _this.checkAndOrderPlace(_this.jan_code);

            if (_this.temp_tana.length <= 0) {
                $('#handy-navi').show()
                _this.navi_body = '<li class="pl-0">棚番号をスキャンして下さい。</li>';
                return false;
            }
            $('.loading_image_custom').show()
            let data = {
                case_quantaty: _this.case_order,
                ball_quantaty: _this.boll_order,
                unit_quantaty: _this.bara_order,
                vendor_id: _this.order_data.vendor_id,
                vendor_item_id: _this.order_data.vendor_item_id,
                vendor_order_id: _this.order_data.vendor_order_id,
                bin: _this.temp_tana
            }
            axios.post(this.base_url + '/vendor_arival_insert_handy_receiveorder', data)
                .then(function (res) {

                    _this.checkAndOrderPlace(_this.jan_code)
                    _this.hideModelAndClearInput()
                    _this.resetField()
                    $('#handy-navi').show()
                    _this.navi_body = '<li class="pl-0">検品仮置きが完了しました。次のJANコードスキャンして【次へ】押してください。</li>';
                    _this.jan_code = '';
                })
                .then(function (er) {

                })
                .finally(function () {
                    $('.loading_image_custom').hide()
                })
            return false;

        },
        resetField() {
            this.case_order = 0;
            this.boll_order = 0;
            this.bara_order = 0;
        },
        pressEnterAndSave(e, type) {
            if (e.keyCode == 13) {
                this.calculateTotalQuantity()
                if (type == 'case') {
                    $('.boll_order').focus()
                    $('.boll_order').select()

                    // this.input_type = 'ボール';

                } else if (type == 'boll') {
                    $('.bara_order').focus()
                    $('.bara_order').select()
                    // this.input_type = 'バラ';

                } else {
                    $('#car_rack_code').focus();
                    $('#car_rack_code').select();
                    // $('#order-place-button').focus();
                    // this.orderPlace()
                }

                // this.updateOrderQnty(this.input_type)
            }
        },
        enterAndNext(e) {
            if (e.keyCode == 13 && this.temp_tana.length == 3) {
                $('#order-place-button').focus();
                // $('#next-receive').focus();
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
                        $('.handy_error_msg').html(`JANコードりません`);
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
                // _this.getOrderDataByJan();
            })
        },
        calculateTotalQuantity() {
            this.total_quantity = parseInt(this.bara_order) + parseInt(this.boll_order) * parseInt(this.order_data.ball_inputs) + parseInt(this.case_order) * parseInt(this.order_data.case_inputs)
        },

        checkAndOrderPlace(jan) {
            let _this = this;
            axios.get(this.base_url + '/order-info-for-handy/' + jan)
                .then(function (res) {
                    //_this.resetField();
                    if (res.data.status == 200) {
                        res = res.data
                        let order_data = res.data[0]
                        let total_inventory = (order_data.ball_quantity * order_data.ball_inputs) + (order_data.case_quantity * order_data.case_inputs) + parseInt(order_data.unit_quantity)
                        let order_point_inventory = (order_data.order_point_ball_quantity * order_data.ball_inputs) + (order_data.order_point_case_quantity * order_data.case_inputs) + parseInt(order_data.order_point_unit_quantity)
                        // inventory order point limit
                        if (total_inventory < order_point_inventory) {
                            // place order
                            let dates = $.datepicker.formatDate('yy-mm-dd', new Date());
                            let data_array = [];
                            let data = [
                                order_data.order_lot_case_quantity,
                                order_data.order_lot_ball_quantity,
                                order_data.order_lot_unit_quantity,
                                order_data.vendor_id,
                                order_data.vendor_item_id,
                                dates,
                                Math.floor(100000 + Math.random() * 900000)
                            ]
                            data_array.push(data)
                            //vendor_order_insert_new  old url autometic order from order point
                            axios.post(_this.base_url + '/vendor_order_insert_new_auto_order_by_last_order', {'data_array': data_array})
                                .then(function (res) {
                                    console.log(res.data)
                                    // $('#handy-navi').show()
                                    // _this.handi_navi = '<li>発注が完了しました。次のJANコードスキャンして【次へ】押してください。</li>';
                                })
                                .then(function (er) {})
                        }
                    }
                })
                .catch(function () { })
        }
    },
    watch: {
        // jan_code: function (val) {
        //     if (val.length >= 13) {
        //         $('#stock-order-show-by-jan').modal()
        //         console.log('data submit')
        //     }
        // }
    },
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
