<template>
    <section>
        <div class="main-content-container container-fluid px-4">
            <!-- Small Stats Blocks -->
            <div class="row">
                <div class="well" style="border: 3px solid #428bca;">
                    <div class="header col-md-12 col-xs-12" style="font-size: 18px; padding: 10px;">
                        <span class="pull-left">
                                発注リスト
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
                                <!--<div class="form-group row">
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
                                <button type="button" v-on:click="getOrderDataByJan()"
                                        class="btn custom-btn btn-primary pull-right text-right show_inline">
                                    次へ
                                </button>-->
                                    <div class="form-group">
                                    <div class="row" style="margin:0">
                                        <select class="form-control col-md-8" id="vendprs" @change="filterbyvendorId" v-model="maker_id">
                                            <option value="0">問屋を選択</option>
                                            <option v-for="vendor in vendors" :value="vendor.id">
                                                {{ vendor.text }}
                                            </option>
                                        </select>
                                        <button class="btn btn-primary col-md-4" @click="sendMailto">メール</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th rowspan="2">NO</th>
                                                    <th rowspan="2">品名・メーカー・規格</th>
                                                    <th colspan="3">入数</th>
                                                    <th rowspan="2">在庫合計</th>
                                                </tr>
                                                <tr>
                                                    <th nowrap>ケース</th>
                                                    <th nowrap>ボール</th>
                                                    <th nowrap>バラ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(value,index) in haccu_lists">
                                                    <td class="text-center">{{index+1}}</td>
                                                    <td>{{value.item_name}}</td>
                                                    <td class="text-center">
                                                    {{value.order_case_quantity}}
                                                    <hr class="cus_br">
                                                    {{value.case_inputs}}
                                                    </td>
                                                    <td class="text-center">
                                                    {{value.order_ball_quantity}}
                                                    <hr class="cus_br">
                                                    {{value.ball_inputs}}
                                                    </td>
                                                    <td class="text-right">{{value.order_unit_quantity}}</td>
                                                    <td class="text-right">{{(value.order_unit_quantity==''?0:value.order_unit_quantity)+(value.order_case_quantity*value.case_inputs)+(value.order_ball_quantity*value.ball_inputs)}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                                                    <span style="color: #999; font-size: 20px;"> {{
                                                            item_name
                                                        }}
                                                </span>
                                                </p>
                                            </div>
                                            <div class="form-group">
                                                        <select class="form-control" id="sel1" v-model="customer_id">
                                                            <option value="null">小売を選択</option>
                                                            <option v-for="customer in customers" :value="customer.id">
                                                                {{ customer.text }}
                                                            </option>
                                                        </select>
                                                    </div>
                                            <div class="form-group" style="margin-bottom: 0">
                                                <div class="col-md-12 col-xs-12 padding_0">
                                                    <table class="table table-bordered physical_handy_tabls">
                                                        <thead>
                                                        <tr>
                                                            <th style="width: 50px; text-align: center;padding: 05px">
                                                                ケース <br>
                                                                (入数 {{ case_inputs }})
                                                            </th>
                                                            <th style="width: 50px; text-align: center;padding: 05px">
                                                                ボール <br> (入数 {{ ball_inputs }})

                                                            </th>
                                                            <th style="width: 50px; text-align: center;padding: 05px;">
                                                                バラ
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody class="physicaltbody">

                                                        <tr>
                                                            <td>
                                                                <input type="tel" @click="selectItem($event,'ケース')"
                                                                       @blur="pressEnterAndSave($event,'case')"
                                                                       @keypress="enterEvent($event,'case')"
                                                                       v-model="case_order"
                                                                       class="form-control cmn_num_formt case_order inputs custom-input">
                                                                <!--                                                                @blur="updateOrderQnty('ケース')"-->
                                                            </td>

                                                            <td>
                                                                <input type="tel" @click="selectItem($event,'ボール')"
                                                                       @blur="pressEnterAndSave($event,'boll')"
                                                                       @keypress="enterEvent($event,'boll')"
                                                                       v-model="boll_order"
                                                                       class="form-control cmn_num_formt boll_order inputs custom-input">
                                                                <!--                                                                @blur="updateOrderQnty('ボール')"-->
                                                            </td>

                                                            <td>
                                                                <input type="tel" @click="selectItem($event,'バラ')"
                                                                       @blur="pressEnterAndSave($event,'bara')"
                                                                       @keypress="enterEvent($event,'bara')"
                                                                       v-model="bara_order"
                                                                       class="form-control cmn_num_formt bara_order inputs custom-input">
                                                            </td>

                                                        </tr>

                                                        </tbody>
                                                    </table>

                                                    <a href="javascript:void(0)"
                                                       class="btn btn-primary pull-right custom-btn"
                                                       id="order-place-button"
                                                       v-on:click="orderPlace()" style="float:right;margin-top: -10px">
                                                        次の商品へ</a>
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
    </section>

</template>

<script>
export default {
    props: ['base_url'],
    name: "handy-product-order-place",
    data() {
        return {
            jan_code: '',
            order_data: [],
            haccu_lists: [],
            case_inputs:'',
            ball_inputs:'',
            item_name:'',
            get_last_order_info: [],
            case_order: 0,
            boll_order: 0,
            bara_order: 0,
            type: 0,
            input_type: '',
            vendors: [],
            customers: [],
            product_name: '',
            vendor_id: null,
            customer_id: null,
            vendor_item_id: null,
            maker_id: 0,
            loader: 0,
            total_quantity: 0,
            handi_navi: ''
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
        _this.handi_navi = 'JANコードスキャンして<br>【次へ】押してください。';
                            _this.getVendorList();
                            _this.getHacchuList();

    },
    methods: {
        sendMailto(){
            let _this = this;
            if(_this.maker_id==0){
                _this.handi_navi = '<li>XXXXXXXXX</li>';
                $('#handy-navi').show()
                return false;
            }
            axios.get(_this.base_url + '/sendtomailportal/'+_this.maker_id)
                .then(function (response) {
                  console.log(response);
                  if(response.data.success==1){
                        _this.handi_navi = '<li>'+response.data.message+'</li>';
                  }else{
                        _this.handi_navi = '<li>XXXXXX</li>';

                  }
                    $('#handy-navi').show()
                    $('.loading_image_custom').hide()
                })
                .catch(function (e) {
                    console.log(e);
                })
        },
        filterbyvendorId(){
            this.getHacchuList(this.maker_id);
        },
        getHacchuList(maker_id=0){
            let _this = this;
            _this.maker_id=maker_id;
            axios.get(_this.base_url + '/get_all_haccue_list/'+_this.maker_id)
                .then(function (response) {
                    // console.log(response.data)
                    _this.haccu_lists = response.data.results;
                    console.log(_this.haccu_lists);
                    // $('#select_tonya').modal({backdrop: 'static', keyboard: false})
                })
                .catch(function (e) {

                })
        },
        importcsvfile(e){
            let _this = this;

            const name = event.target.files[0].name;
  const lastDot = name.lastIndexOf('.');
  const ext = name.substring(lastDot + 1);

            console.log(ext);
             $('.loading_image_custom').show()
            _this.loader = 1;
             var formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('file_type',ext);
            axios.post(this.base_url + '/shipment_csv_insert_brand',formData)
                .then(function (res) {
                   if (res.data.success != 1) {
                       _this.handi_navi = '<li>0000000000000</li>';
                   }else{
                       _this.handi_navi = '<li>XXXXXX</li>';
                   }

                        $('#handy-navi').show()
                        $('.loading_image_custom').hide()
                })
                .catch(function () {
                    $('.loading_image_custom').hide();
                    console.log('errrr');
                })
                .finally(function () {
                   // _this.jan_code = ''
                    _this.loader = 0
                })
        },
        getCustomerList() {
            let _this = this;
            axios.get(_this.base_url + '/get_all_customer_list_for_select2')
                .then(function (response) {
                    // console.log(response.data)
                    _this.customers = response.data.results;
                    // $('#select_tonya').modal({backdrop: 'static', keyboard: false})
                })
                .catch(function (e) {

                })
        },
        getOrderDataByJan() {
            let _this = this;
            if (_this.jan_code.length <= 0) {
                return false;
            }
            $('.loading_image_custom').show()
            _this.loader = 1
            axios.post(this.base_url + '/kouri-order-info-for-handy',{'jan_code': _this.jan_code})
                .then(function (res) {
                    //_this.resetField();

                   // false;
                        _this.getCustomerList();
                    if (res.data.status == 200) {

                        _this.order_data = res.data.data;
                         res = res.data.data;
                        //_this.input_type = _this.order_data.order_lot_inputs;
                        console.log(res);
                        //if(Object.keys(res.get_last_order_info).length>0){
                        _this.case_order = (res.order_case_quantity==null?0:res.order_case_quantity);//_this.order_data.order_lot_case_quantity;
                        _this.boll_order = (res.order_ball_quantity==null?0:res.order_ball_quantity);//_this.order_data.order_lot_ball_quantity;
                        _this.bara_order = (res.order_unit_quantity==null?0:res.order_unit_quantity);//_this.order_data.order_lot_unit_quantity;

                        _this.customer_id = res.customer_order.customer_id;

                        _this.case_inputs=res.jan.case_inputs
                        _this.ball_inputs=res.jan.ball_inputs
                        _this.item_name=res.jan.name
                        //}

                        _this.calculateTotalQuantity();
                        setTimeout(function () {
                            $('.case_order').focus();
                            $('.case_order').select();
                        }, 1000)

                        if (_this.type == 0) {

                            // $('#stock-order-show-by-jan').modal()
                            $('#stock-order-show-by-jan').modal({backdrop: 'static', keyboard: false})
                            $('.loading_image_custom').hide()
                        }
                    } else if (res.data.status == 402) {
                        _this.case_order = 0;//(res.order_case_quantity==null?0:res.order_case_quantity);//_this.order_data.order_lot_case_quantity;
                        _this.boll_order = 0;//(res.order_ball_quantity==null?0:res.order_ball_quantity);//_this.order_data.order_lot_ball_quantity;
                        _this.bara_order = 0;//(res.order_unit_quantity==null?0:res.order_unit_quantity);//_this.order_data.order_lot_unit_quantity;

                        //_this.customer_id = res.customer_order.customer_id;
                         res = res.data.data;

                        _this.case_inputs=res.jan.case_inputs;
                        _this.ball_inputs=res.jan.ball_inputs;
                        _this.item_name=res.jan.name;
                         setTimeout(function () {
                            $('.case_order').focus();
                            $('.case_order').select();
                        }, 1000)

                        if (_this.type == 0) {

                            // $('#stock-order-show-by-jan').modal()
                            $('#stock-order-show-by-jan').modal({backdrop: 'static', keyboard: false})
                            $('.loading_image_custom').hide()
                        }
                         console.log(res);
                    } else if (res.data.status == 401) {
                        _this.handi_navi = '<li>0000000000000</li>';
                        $('#handy-navi').show()
                        $('.loading_image_custom').hide()

                        // $('#select_tonya').modal({backdrop: 'static', keyboard: false})
                        // _this.handi_navi = '<li>このjanコードはマスターに見つかりません</li>';
                        // $('#handy-navi').show()
                    } else {
                        _this.insertToJanList();
                        // $('#select_tonya').modal({backdrop: 'static', keyboard: false})
                        // _this.handi_navi = '<li>このjanコードはマスターに見つかりません</li>';
                        // $('#handy-navi').show()
                    }

                })
                .catch(function () {

                })
                .finally(function () {
                   // _this.jan_code = ''
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
        orderPlace() {
            let _this = this;
            if(_this.customer_id==null){
                 $('#handy-navi').show()
                _this.handi_navi = '<li>0000000</li>';
                return false;
            }
            if(_this.total_quantity<=0){
                 $('#handy-navi').show()
                _this.handi_navi = '<li>0000000</li>';
                return false;
            }
           console.log(_this.ball_order);
         var data_post ={
                    'case_order_quantity': _this.case_order,
                    "ball_order_quantity": _this.boll_order,
                    'unit_order_quantity': _this.bara_order,
                    'total_quantity': _this.total_quantity,
                    'customer_id': _this.customer_id,
                    'jan_code': _this.jan_code,
                    };
            $('.loading_image_custom').show()
            if (_this.loader == 1) {
                return false
            }
            _this.loader = 1;
            setTimeout(function () {

                // return false
                axios.post(this.base_url + '/kouri_order_insert', data_post)
                    .then(function (res) {
                        if(res.data.status==200){
                        $('#handy-navi').show()
                        _this.handi_navi = '<li>発注が完了しました。次のJANコードスキャンして【次へ】押してください。</li>';

                        _this.hideModelAndClearInput()
                        }else{
                             $('#handy-navi').show()
                        _this.handi_navi = '<li>Kouri order exists please confirmed</li>';
                        return false;
                        }
                    })
                    .then(function (er) {

                    })
                    .finally(function () {
                        $('.loading_image_custom').hide()
                        _this.loader = 0
                    })
            }, 1000)
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
        enterEvent(e,type){
            if (e.keyCode == 13) {
                this.pressEnterAndSave(e,type);
            }
        },
        pressEnterAndSave(e, type) {
            // if (e.keyCode == 13) {
            this.calculateTotalQuantity();
            if (type == 'case') {
                $('.boll_order').focus()
                $('.boll_order').select()

                // this.input_type = 'ボール';

            } else if (type == 'boll') {
                $('.bara_order').focus()
                $('.bara_order').select()
                // this.input_type = 'バラ';

            } else {
                $('#order-place-button').focus();
                // this.orderPlace()
            }

            // this.updateOrderQnty(this.input_type)
            // }
        },
        insertToJanList() {
            let _this = this;
            let jan_code = _this.jan_code;
            axios.post(_this.base_url + '/get_jan_info', {jan_code: _this.jan_code})
                .then(function (response) {
                    let api_response = response.data.api_data;
                    let data_resource = response.data.data_resource;

                    if (api_response == 'invalid_jan_code') {
                        _this.handi_navi = '<li>商品がありません</li>';
                        $('#handy-navi').show()
                    } else {
                        _this.product_name = api_response.name;
                        if (response.data.vendor_item_data == 1) {
                            // console.log('this jan code is already registered');
                            _this.vendor_item_id = response.data.vendor_item_data
                            _this.maker_id = response.data.maker_id

                            _this.handi_navi = '<li>【' + _this.product_name + '】商品の問屋が見つかりません。小売マスターメンテ画面から問屋を選択して発注してください。</li>';
                            $('#handy-navi').show()

                            // _this.getVendorList();
                        } else {
                            // console.log('do insert ' + jan_code);
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
                                    _this.jan_code = jan_code;
                                    _this.getOrderDataByJan();
                                    // _this.handi_navi = '<li>【' + _this.product_name + '】商品の問屋が見つかりません。小売マスターメンテ画面から問屋を選択して発注してください。</li>';
                                    // $('#handy-navi').show()
                                    // _this.insertToJanList()
                                })
                                .catch(function (er) {

                                })
                                .finally(function () {
                                    $('.loading_image_custom').hide()
                                    _this.loader = 0
                                })


                        } //else

                    } //else

                })
                .then(function (er) {

                })
                .finally(function () {
                    $('.loading_image_custom').hide()
                    _this.loader = 0
                })
        },
        getVendorList() {
            let _this = this;
            axios.get(_this.base_url + '/get_all_vendor_list_for_select2')
                .then(function (response) {
                    console.log(response.data)
                    _this.vendors = response.data.results;
                   // $('#select_tonya').modal({backdrop: 'static', keyboard: false})
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
            this.total_quantity = parseInt(this.bara_order) + parseInt(this.boll_order) * parseInt(this.ball_inputs) + parseInt(this.case_order) * parseInt(this.case_inputs)
        }
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
.cus_br{
    border-bottom: 0px solid #ddd !important;
    margin: 0;
    padding: 0;

}
</style>
