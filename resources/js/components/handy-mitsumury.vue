<template>
    <section>
        <div class="main-content-container container-fluid px-4">
            <!-- Small Stats Blocks -->
            <div class="row">
                <div class="well" style="border: 3px solid #428bca;">
                    <div class="header col-md-12 col-xs-12" style="font-size: 18px; padding: 10px;">
                        <span class="pull-left">
                            小売 <br>
                                見積り
                        </span>
                        <!-- <button id="handy_shipment_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button>&nbsp;-->
                        <a :href="base_url+'/android_home'" class="btn btn-primary pull-right top-button"
                           style="float:right">メニュー</a>
                        <a href="javascript:void(0)" class="btn btn-success pull-right mr-1 top-button"
                           style="float:right"> 発注</a>
                        <!--                        <a href="javascript:void(0)" class="btn btn-success pull-right mr-1 top-button"-->
                        <!--                           style="float:right"> 採用</a>-->
                        <a href="javascript:void(0)" class="btn btn-success pull-right mr-1 top-button"
                           style="float:right"> 詳細</a>

                    </div>
                    <div style="font-size: 18px; padding: 5px 0px 2px 5px;position: relative" >
                        <div class="form-check" >
                            <input class="form-check-input check-all"  @click="selectAll()" v-model="allSelected" type="checkbox" value="" id="flexCheckChecked" >
                            <label class="form-check-label ml-2" for="flexCheckChecked">
                                全て
                            </label>
                        </div>
                        <button v-if="productJans.length > 0" @click="selectSuper()" class="btn btn-success pull-right mr-1 " style=" position: absolute; top: 5px; right: 0px;"> 送信</button>
                    </div>
                    <div id="stock_detail_by_jan_form" class="p_scn_form text-right mt-0">
                        <div class="input-group m-0 my-1">
                            <input type="tel" class="form-control" placeholder="JANコードスキャン（13桁）"
                                   style="border-radius: 0px;padding: 5px;font-size: 16px;" autofocus
                                   v-model="jan_code" id="jan_"
                                   name="scan_by_jan_for_stock_detail"
                                   v-on:keyup="checkAndGetData($event)"
                                   @blur="checkAndGetData($event)"
                                   @paste="checkAndGetData($event)"
                                   @input="checkAndGetData($event)"
                                   aria-label="Recipient's username" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">次へ</button>
                            </div>
                        </div>
                        <div class="form-group m-0">

                            <!--                            <input type="tel" id="jan_input" class="form-control custom-input"-->
                            <!--                                   v-model="jan_code"-->
                            <!--                                   style="padding: 5px 10px !important;height: 45px !important; margin: 5px 0 !important;"-->
                            <!--                                   name="scan_by_jan_for_stock_detail"-->
                            <!--                                   v-on:keyup="checkAndGetData($event)"-->
                            <!--                                   @blur="checkAndGetData($event)"-->
                            <!--                                   @paste="checkAndGetData($event)"-->
                            <!--                                   @input="checkAndGetData($event)"-->
                            <!--                                   placeholder="JANコードスキャン（13桁）" autofocus>-->


                            <!--                                    <button type="button" @click="alertForIos" onclick="$('#jan_input').focus()"-->
                            <!--                                            class="hide btn custom-btn btn-primary text-right show_inline search-button-ios "-->
                            <!--                                            style="float: left;width: 100px">-->
                            <!--                                        音声-->
                            <!--                                    </button>-->
                            <!--                                    <text-recognition :base_url="base_url"-->
                            <!--                                                      @getSearchData="getSearchData"-->
                            <!--                                                      @clearInput="clearInput"></text-recognition>-->

                            <!--                                    <button type="button" @click="getBarCodeScan()"-->
                            <!--                                            class="pr-0 ml-1 btn custom-btn btn-primary text-right show_inline search-button"-->
                            <!--                                            style="padding:0;float: left;width: 70px !important;">-->
                            <!--                                        <i class="fa fa-barcode" style="font-size: 40px"></i>-->
                            <!--                                    </button>-->
                            <!--                            <button type="button" v-on:click="getOrderDataByJan()"-->
                            <!--                                    style="margin: 0px;width: 80px !important; height: 40px;height: 30px !important;line-height: 18px !important;font-size: 18px !important;"-->
                            <!--                                    class="btn custom-btn btn-primary pull-right text-right show_inline">-->
                            <!--                                次へ-->
                            <!--                            </button>-->
                        </div>


                    </div>

                    <div class=" col-centereds col-md-12 col-sm-12 col-sl-12 p-0 row ">
                        <div class="col-sm-6 col-md-3 col-xl-3 image-div" v-for="(product,i) in products" :class="(productJans.indexOf(product)) > -1 ? 'active-img' : ''">
                            <img  :src="'public/backend/images/products/'+product.img"
                                  class="img-thumbnail custom-img"
                                  alt="Cinque Terre" @click="viewInfoForImage(product,product.img)"
                                  style="cursor: pointer">
                            <input class="form-check-input form-check-input_" type="checkbox" v-model="productJans" :value="product" >
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true" id="mistumury-mage-preview">
            <div class="modal-dialog modal-lg mt-0">
                <div class="modal-content">
                    <div class="modal-header" style="padding: 5px;justify-content: right">
                        <a class="btn btn-success float-right mr-1" @click="naviShow()"> 採用</a>
                        <a class="btn btn-success float-right mr-2">発注</a>
                        <a class="btn btn-info float-right" @click="confirmAndHide()">戻る</a>

                    </div>
                    <div class="modal-body p-0" style="text-align: center">
                        <div
                            style="font-size: 18px;text-align: left;padding: 5px 10px;background: #c3ff8f80;font-weight: bold;">
                            {{ preview_product.title }}
                        </div>
                        <div>
                            <img
                                :src="'public/backend/images/products/'+ ( preview_product.jan == '4901005500341' ? 'chocolate.jpg' : (preview_product.img ? preview_product.img : 'chocolate.jpg')) "
                                class="img-thumbnail custom-img-preview" alt="Cinque Terre"
                                style="cursor: pointer">
                        </div>
                        <div>
                            <table data-v-c9953dda="" class="table table-bordered physical_handy_tabls">
                                <thead data-v-c9953dda="">
                                <tr data-v-c9953dda="">
                                    <th data-v-c9953dda="" style="width: 50px; text-align: center; padding: 5px;">
                                        特売価格期限
                                    </th>
                                    <th data-v-c9953dda="" style="width: 50px; text-align: center; padding: 5px;">
                                        原価
                                    </th>
                                    <th data-v-c9953dda="" style="width: 50px; text-align: center; padding: 5px;">
                                        売価
                                    </th>
                                    <th data-v-c9953dda="" style="width: 50px; text-align: center; padding: 5px;">
                                        粗利
                                    </th>
                                    <th data-v-c9953dda="" style="width: 50px; text-align: center; padding: 5px;">
                                        ％
                                    </th>
                                </tr>
                                </thead>
                                <tbody data-v-c9953dda="" class="physicaltbody">
                                <tr data-v-c9953dda="">
                                    <td data-v-c9953dda="">
                                        <input data-v-c9953dda="" type="tel" id="special-price"
                                               v-model="preview_product.sale_selling_price"
                                               class="form-control  " @click="selectItem($event)"
                                               @keypress="pressEnterAndSave($event,'cost')"
                                               style="border-radius: 0px; text-align: center; padding: 7px 0px;">
                                    </td>
                                    <td data-v-c9953dda="">
                                        <input data-v-c9953dda="" type="tel" id="cost" @click="selectItem($event)"
                                               class="form-control  " v-model="preview_product.cost"
                                               @blur="blurAndSave()"
                                               @keypress="pressEnterAndSave($event,'sell')"
                                               @keyup="calculatePrice('cost')"
                                               style="border-radius: 0px; text-align: center; padding: 7px 0px;">
                                    </td>
                                    <td data-v-c9953dda="">
                                        <input data-v-c9953dda="" type="tel" id="sell" @click="selectItem($event)"
                                               class="form-control  " v-model="preview_product.sell"
                                               @keypress="pressEnterAndSave($event,'profit_margin')"
                                               @blur="blurAndSave()"
                                               @keyup="calculatePrice('sell')"
                                               style="border-radius: 0px; text-align: center; padding: 7px 0px;">
                                    </td>
                                    <td data-v-c9953dda="">
                                        <input data-v-c9953dda="" type="tel" id="profit" @click="selectItem($event)"
                                               class="form-control  " v-model="preview_product.profit" readonly
                                               style="border-radius: 0px; text-align: center; padding: 7px 0px;">
                                        <!--                                               @keypress="pressEnterAndSave($event,'profit_margin')"-->
                                        <!--                                               @keyup="calculatePrice('profit')"-->
                                    </td>
                                    <td data-v-c9953dda="">
                                        <input data-v-c9953dda="" type="tel" id="profit_margin"
                                               @click="selectItem($event)"
                                               @blur="blurAndSave()"
                                               @keypress="pressEnterAndSave($event,'special-price')"
                                               class="form-control  " v-model="preview_product.profit_margin"
                                               @keyup="calculatePrice('profit_margin')"
                                               style="border-radius: 0px; text-align: center; padding: 7px 0px;">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="form-group" style="display: none">
                            <select class="form-control" id="vendprs" v-model="maker_id"
                                    @change="updateVendorData()">
                                <option value="0">問屋を選択</option>
                                <option v-for="vendor in vendors" :value="vendor.id">
                                    {{ vendor.text }}
                                </option>
                            </select>
                        </div>


                    </div>
                    <!--                    <div class="modal-footer " style="padding: 6px">-->
                    <!--                    </div>-->
                </div>
            </div>
        </div>
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true" id="mistumury-select-super">
            <div class="modal-dialog modal-lg mt-0">
                <div class="modal-content">
                    <div class="modal-header" style="padding: 5px;justify-content: right">
                        <button class="btn btn-success mr-2" @click="sendtoSuper()" :disabled="(productJans.length > 0 && selectedSuper.length > 0 ) ? false : true">送信</button>
                        <a class="btn btn-info float-right" @click="confirmAndHide()">戻る</a>
                    </div>
                    <div class="modal-body p-0" style="text-align: center">
                        <div
                            style="font-size: 18px;text-align: left;padding: 5px 10px;background: #c3ff8f80;font-weight: bold;">
                            00000000
                        </div>
                        <div>
                            <table data-v-c9953dda="" class="table table-bordered physical_handy_tabls">
                                <thead>
                                <tr >
                                    <th colspan="2 " style="text-align: left">
                                        <input class="form-check-input check-all m-0"  @click="selectAllSuper()" v-model="allSelectedSuper" type="checkbox" value="" >
                                        <label class="form-check-label " style="margin-left: 40px" for="flexCheckChecked">
                                            全て
                                        </label>
                                    </th>
                                </tr>
                                </thead>
                                <tbody data-v-c9953dda="" class="physicaltbody">

                                <tr :class="(selectedSuper.indexOf(vendor.id) > -1) ? 'active-c' : ''" v-for="vendor in vendors" style="border-bottom: 1px solid gray">
                                    <td style="width: 50px;padding: 10px;border: none !important;">
                                        <input class="form-check-input m-0" type="checkbox" v-model="selectedSuper" :value="vendor.id" >
                                    </td>
                                    <td style="padding: 10px;;border: none !important;">{{ vendor.text }}</td>
                                </tr>
                                </tbody>

                            </table>
                        </div>
                        <div class="p-2" style="text-align: right">
                            <br>
                        </div>


                    </div>
                    <!--                    <div class="modal-footer " style="padding: 6px">-->
                    <!--                    </div>-->
                </div>
            </div>
        </div>


        <div class="jn nav_disp-w" style="z-index: 9999;width: 270px; right: 15px; bottom: 15px;"
             id="handy-navi">
            <div class="card card-warning jn_old_popup " style="padding: 6px">
                <!--                <div class="card-heading">-->
                <!--                    <a class="btn btn-light float-right" href="javascript:void(0)"-->
                <!--                       onclick="$('#handy-navi').hide()">戻る</a>-->
                <!--                </div>-->
                <div class="card-body">
                    <a class="btn btn-light float-right" href="javascript:void(0)" v-if="selected_products.length <= 0"
                       onclick="$('#handy-navi').hide()">戻る</a>

                    <a class="btn btn-light float-right" href="javascript:void(0)" v-else
                       @click="confirm()">***</a>

                    <ol id="handy-navi-body" v-html="handi_navi">

                    </ol>


                </div>
            </div>
        </div>
    </section>

</template>

<script>
import TextRecognition from "./text-recognition";
import {StreamBarcodeReader} from "vue-barcode-reader";

export default {
    props: ['base_url'],
    name: "handy-mistumury",
    data() {
        return {
            jan_code: '',
            order_data: [],
            select_status: 0,
            products: [],
            selected_products: [],
            handi_navi: '',
            search_data: null,
            product_pics: [],
            preview_product: {},
            maker_id: 0,
            vendors: [],
            images: [],
            selected: [],
            allSelected: false,
            allSelectedSuper: false,
            productJans: [],
            selectedSuper: [],

        }
    },
    mounted() {
        // this.getProducts();
        this.images = ['57.jpg', 'cocacola.jpeg', 's-l1600.jpg', 'fish.jpeg', '4901005109803.jpg',  '69813_11.png', '69813_11.png', 'Whocoded.jpg'];
        $('#jan_').focus()
        $('#jan_').select()
        this.handi_navi = '商品を押してください';
        $('#handy-navi').show();
        this.getVendorList();
        this.getProducts();
    },
    methods: {
        getProducts() {
            let _this = this;
            axios.get(this.base_url + '/get-all-products')
                .then(function (res) {
                    let data = res.data;
                    _this.products = data.products;
                    _this.products = _this.products.map(function (product) {
                        product.img = product.jan == '4901005500341' ? 'chocolate.jpg' : _this.images[Math.floor(Math.random() * 7)];
                        return product;
                    })
                    // _this.handi_navi = '........';
                    // $('#handy-navi').show();
                })
                .catch(function () {

                })
                .finally(function () {

                })
        },
        setSelectStatus() {
            this.select_status = this.select_status ? 0 : 1;
            if (this.select_status === 1) {
                this.handi_navi = '0000000000000';
                $('#handy-navi').show();
            } else {
                this.selected_products = [];
            }
        },
        selectProduct(product) {
            if (!this.select_status) {
                return false;
            }
            let index = this.selected_products.indexOf(product.jan);
            if (index < 0) {
                this.selected_products.push(product.jan)
            } else {
                this.selected_products.splice(index, 1);
            }

            if (this.selected_products.length > 0) {
                this.handi_navi = '***********';
                $('#handy-navi').show();
            }


        },
        confirm() {
            this.select_status = 0;
            this.selected_products = [];
            // this.handi_navi = '---------';
            // $('#handy-navi').show();
        },
        viewInfoForImage(product, img) {
            product.item_name = product.janinfo.name;
            // product.img = img;
            product.profit_margin = product.gross_profit_margin;
            this.previewProductInfoWithImage(product);
            // setTimeout(function () {
            //     $('#special-price').focus();
            //     $('#special-price').select();
            // },200)
            return true;
            // let _this = this;
            // let preview_product = localStorage.getItem('preview_product');
            // if (preview_product) {
            //     _this.preview_product = JSON.parse(preview_product);
            // } else {
            //     _this.preview_product = {
            //         title : 'ふるさと納税 那智勝浦町 和歌山魚鶴仕込の魚切身詰め合わせセット',
            //         cost : 120,
            //         sell : 144,
            //         profit : 0,
            //         profit_margin : 0,
            //         special_price: 0
            //     }
            // }
            // _this.preview_product.profit = _this.preview_product.sell - _this.preview_product.cost
            // _this.preview_product.profit_margin = (((_this.preview_product.sell - _this.preview_product.cost)/ _this.preview_product.cost)*100).toFixed(2)
            //
            // localStorage.setItem('preview_product', JSON.stringify(_this.preview_product));
            // if (img_type != 100) {
            //     // this.handi_navi = '*******';
            //     // $('#handy-navi').show();
            //     return false;
            // }
            // // this.handi_navi = '*******';
            // // $('#handy-navi').show();
            // $('#mistumury-mage-preview').modal({backdrop: 'static'})
            // $('#special-price').focus();
            // $('#special-price').select();
        },
        confirmAndHide() {
            $('#mistumury-mage-preview').modal('hide')
            $('#mistumury-select-super').modal('hide')
        },
        getOrderDataByJan() {
            let _this = this;
            let reg = /^\d+$/;
            if (!reg.test(this.jan_code)) {
                _this.getSearchData(_this.jan_code);
                return false
            }
            if (_this.jan_code.length <= 0) {
                return false;
            }
            $('.loading_image_custom').show()
            _this.loader = 1
            axios.get(this.base_url + '/handy_stock_detail_get_by_jan_code/' + _this.jan_code)
                .then(function (res) {
                    //_this.resetField();
                    if (res.data.status == 400) {
                        console.log('log here');
                        _this.handi_navi = '<li>0000000</li>';
                        $('#handy-navi').show();
                        return false;
                    }
                    if (res.data.result.length > 0) {
                        _this.order_data = res.data.result;
                        _this.order_data_ = _this.order_data[0];
                        _this.product_name = _this.order_data[0].item_name;
                        _this.order_data[0].img = _this.order_data[0].jan == '4901005500341' ? 'chocolate.jpg' : _this.images[Math.floor(Math.random() * 7)];


                        _this.previewProductInfoWithImage(_this.order_data[0]);

                        _this.calculateTotalQuantity();

                        if (_this.type == 0) {
                            $('#stock-order-show-by-jan').modal({backdrop: 'static', keyboard: false})
                            setTimeout(function () {
                                $('#case0').focus()
                                $('#case0').select()
                                if ($('#rack' + 0).length <= 0) {
                                    // $('#order-place-button').focus()
                                } else {
                                    // if (!_this.readonly) {
                                    //     $('#rack' + 0).focus()
                                    //     $('#rack' + 0).select()
                                    // } else {
                                    //     $('#order-place-button').focus()
                                    // }
                                }
                            }, 720)
                        }
                        $('#handy-navi').hide();
                    } else {
                        _this.handi_navi = '<li>このjanコードはマスターに見つかりません</li>';
                        $('#handy-navi').show();
                    }


                })
                .catch(function () {

                })
                .finally(function () {
                    //_this.jan_code = ''
                    $('.loading_image_custom').hide()
                    _this.loader = 0

                })
        },
        checkAndGetData(e) {
            let _this = this;

            if (this.loader === 1 || this.jan_code.length <= 0) {
                return false;
            }
            let reg = /^\d+$/;

            if (this.jan_code.length >= 13 || this.jan_code.length == 8) {
                if (reg.test(this.jan_code)) {
                    this.insertToJanList()
                }
            }
            if (e.keyCode === 13) {
                if (reg.test(this.jan_code) && this.jan_code.length >= 8) {
                    this.insertToJanList()
                }
            }
            if (!reg.test(this.jan_code)) {
                setTimeout(function () {
                    _this.getSearchData(_this.jan_code);
                }, 1200)
            }

        },
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
        selectItem(e) {
            e.target.select()
        },
        pressEnterAndSave(e, type) {
            let _this = this;
            if (e.keyCode == 13) {
                $('#' + type).focus()
                $('#' + type).select()
                return false;
                if (parseFloat(_this.preview_product.cost) > parseFloat(_this.preview_product.sell)) {
                    _this.handi_navi = 'XXXXX';
                    $('#handy-navi').show()
                    return false;
                }
                // let data = {
                //     vendor_item_id: _this.preview_product.vendor_item_id,
                //     product_name: _this.preview_product.item_name,
                //     case_qty: parseInt(_this.preview_product.case_inputs),
                //     ball_qty: parseInt(_this.preview_product.ball_inputs),
                //     price: parseInt(_this.preview_product.cost),
                //     gross_profit_margin: parseInt(_this.preview_product.profit_margin),
                //     gross_profit: parseInt(_this.preview_product.sell - _this.preview_product.cost),
                //     selling_price: parseInt(_this.preview_product.sell),
                //     sale_selling_price: parseInt(_this.preview_product.sale_selling_price)
                // }

                let data = {
                    jan:_this.preview_product.jan,
                    price: parseFloat(_this.preview_product.cost),
                    gross_profit_margin: parseFloat(_this.preview_product.profit_margin),
                    gross_profit: ((_this.preview_product.sell - _this.preview_product.cost)/_this.preview_product.sell*100).toFixed(2),
                    selling_price: parseFloat(_this.preview_product.sell)
                }

                axios.post(_this.base_url + '/update_vendor_item_estimate_items', data)
                    .then(function (response) {
                        // _this.getOrderDataByJan();
                        _this.getProducts();
                        _this.handi_navi = '仕入・販売先マスターへ登録されました';
                        $('#handy-navi').show()
                    })
                    .catch(function (e) {
                        console.log(e)
                    })

            }
        },
        blurAndSave() {
            let _this = this;
            return false;
            if (parseFloat(_this.preview_product.cost) > parseFloat(_this.preview_product.sell)) {
                _this.handi_navi = 'XXXXX';
                $('#handy-navi').show()
                return false;
            }
            let data = {
                jan:_this.preview_product.jan,
                product_name: _this.preview_product.item_name,
                case_qty: parseInt(_this.preview_product.case_inputs),
                ball_qty: parseInt(_this.preview_product.ball_inputs),
                price: parseFloat(_this.preview_product.cost),
                gross_profit_margin: parseFloat(_this.preview_product.profit_margin),
                gross_profit: ((_this.preview_product.sell - _this.preview_product.cost)/_this.preview_product.sell*100).toFixed(2),

                selling_price: parseFloat(_this.preview_product.sell),
                sale_selling_price: parseInt(_this.preview_product.sale_selling_price)
            }

            axios.post(_this.base_url + '/handy_update_customer_master_item_content', data)
                .then(function (response) {
                    // _this.getOrderDataByJan();
                    _this.getProducts();
                    _this.handi_navi = '仕入・販売先マスターへ登録されました';
                    $('#handy-navi').show()
                })
                .catch(function (e) {
                    console.log(e)
                })

        },
        calculatePrice(type) {

            let _this = this;

            if (type == 'profit_margin') {
                _this.preview_product.sell = parseFloat(_this.preview_product.cost) + parseFloat((_this.preview_product.cost * _this.preview_product.profit_margin) / 100);
                _this.preview_product.sell = _this.preview_product.sell.toFixed(2)
                // _this.preview_product.profit = (_this.preview_product.sell - _this.preview_product.cost).toFixed(2);
                _this.preview_product.profit = (((_this.preview_product.sell - _this.preview_product.cost)/_this.preview_product.sell)*100).toFixed(2);
            } else if (type == 'sell') {
                _this.preview_product.profit_margin = ((parseFloat(_this.preview_product.sell) - parseFloat(_this.preview_product.cost)) * 100) / _this.preview_product.cost
                _this.preview_product.profit_margin = _this.preview_product.profit_margin.toFixed(2);
                // _this.preview_product.profit = (_this.preview_product.sell - _this.preview_product.cost).toFixed(2);
                _this.preview_product.profit = (((_this.preview_product.sell - _this.preview_product.cost)/_this.preview_product.sell)*100).toFixed(2);

            } else if (type == 'profit') {
                _this.preview_product.sell = parseFloat(_this.preview_product.cost) + parseFloat($('#profit').val())
                _this.preview_product.profit_margin = ((parseFloat(_this.preview_product.sell) - parseFloat(_this.preview_product.cost)) * 100) / _this.preview_product.cost;
                _this.preview_product.sell = _this.preview_product.sell.toFixed(2);
                _this.preview_product.profit_margin = _this.preview_product.profit_margin.toFixed(2);
            } else if (type == 'cost') {
                _this.preview_product.sell = parseFloat(_this.preview_product.cost) + parseFloat((_this.preview_product.cost * _this.preview_product.profit_margin) / 100);
                _this.preview_product.sell = _this.preview_product.sell.toFixed(2)
                // _this.preview_product.profit = (_this.preview_product.sell - _this.preview_product.cost).toFixed(2);
                _this.preview_product.profit = (((_this.preview_product.sell - _this.preview_product.cost)/_this.preview_product.sell)*100).toFixed(2);

            }

            // localStorage.setItem('preview_product', JSON.stringify(_this.preview_product));

        },
        updateVendorData() {
            let _this = this;
            if (_this.maker_id == null) {
                _this.handi_navi = '「仕入先」を指示してください。';
                $('#handy-navi').show()
                return false;
            }
            axios.post(_this.base_url + '/vendor_master_update_by_vendor_id', {
                vendor_item_id: _this.preview_product.vendor_item_id,
                vendor_id: _this.maker_id,
                maker_id: _this.preview_product.maker_id
            }).then(function (response) {
                _this.getOrderDataByJan();
                _this.handi_navi = '000000';
                $('#handy-navi').show()
            })
        },
        getVendorList() {
            let _this = this;
            axios.get(_this.base_url + '/get_all_customer_list_for_select2')
                .then(function (response) {
                    // console.log(response.data)
                    _this.vendors = response.data.results;
                    // $('#select_tonya').modal({backdrop: 'static', keyboard: false})
                })
                .catch(function (e) {

                })
        },
        previewProductInfoWithImage(product) {
            let _this = this;
            _this.preview_product = product;
            _this.maker_id = product.vendor_id;
            _this.preview_product.title = product.item_name;
            _this.preview_product.cost = product.e_cost_price != 0 ? product.e_cost_price : product.cost_price;
            _this.preview_product.sell = product.e_selling_price != 0 ? product.e_selling_price : product.selling_price;
            // _this.preview_product.profit = product.selling_price - product.cost_price;
            _this.preview_product.profit = (((_this.preview_product.sell - _this.preview_product.cost)/_this.preview_product.sell)*100).toFixed(2);

            $('#mistumury-mage-preview').modal({backdrop: 'static'})
            // $('#special-price').focus();
            // $('#special-price').select();
            setTimeout(function () {
                $('#special-price').focus();
                $('#special-price').select();
            }, 700)
        },
        updateVendorItemProperty(vendor, type = null) {
            let _this = this;
            console.log(vendor)
            if (type == 'profit_margin') {
                vendor.selling_price = parseFloat(vendor.cost_price) + parseFloat((vendor.cost_price * vendor.profit_margin) / 100);
                vendor.selling_price = vendor.selling_price.toFixed(2)
            } else if (type == 'sell') {
                vendor.profit_margin = ((parseFloat(vendor.selling_price) - parseFloat(vendor.cost_price)) * 100) / vendor.cost_price
                vendor.profit_margin = vendor.profit_margin.toFixed(2);
            } else if (type == 'profit') {
                vendor.selling_price = parseFloat(vendor.cost_price) + parseFloat($('#profit').val())
                vendor.profit_margin = ((parseFloat(vendor.selling_price) - parseFloat(vendor.cost_price)) * 100) / vendor.cost_price;
                vendor.selling_price = vendor.selling_price.toFixed(2);
                vendor.profit_margin = vendor.profit_margin.toFixed(2);
            } else if (type == 'cost') {
                vendor.selling_price = parseFloat(vendor.cost_price) + parseFloat((vendor.cost_price * vendor.profit_margin) / 100);
                vendor.selling_price = vendor.selling_price.toFixed(2)
            }

            if (parseFloat(vendor.cost_price) > parseFloat(vendor.selling_price)) {
                _this.handi_navi = 'XXXXX';
                $('#handy-navi').show()
                return false;
            }
            let data = {
                vendor_item_id: vendor.vendor_item_id,
                product_name: vendor.item_name,
                case_qty: parseInt(vendor.case_inputs),
                ball_qty: parseInt(vendor.ball_inputs),
                price: parseInt(vendor.cost_price),
                gross_profit_margin: parseInt(vendor.profit_margin),
                gross_profit: ((vendor.selling_price - vendor.cost_price)/vendor.selling_price*100).toFixed(2),
                selling_price: parseInt(vendor.selling_price)
            }

            axios.post(_this.base_url + '/update_vendor_master_item_content', data)
                .then(function (response) {
                    _this.getOrderDataByJan();
                    _this.handi_navi = '000000';
                    $('#handy-navi').show()
                })
                .catch(function (e) {
                    console.log(e)
                })


        },
        insertToJanList() {
            let _this = this;
            if (_this.jan_code.length <= 0) {
                return false
            }
            $('.loading_image_custom').show()
            _this.loader = 1;
            let jan_code = _this.jan_code;
            axios.post(_this.base_url + '/get_jan_info', {jan_code: _this.jan_code})
                .then(function (response) {
                    let api_response = response.data.api_data;
                    let data_resource = response.data.data_resource;

                    if (api_response == 'invalid_jan_code') {
                        //$('.handy_error_msg').html(`JANコードりません`);
                        //$('.handdy_error').removeClass('hide').addClass('show');
                        _this.handi_navi = 'JAN コードを入力してください';
                        $('#handy-navi').show();
                    } else {
                        if (response.data.vendor_item_data == 1) {
                            console.log('this jan code is already registered');
                            _this.getOrderDataByJan();
                            _this.getProducts();
                            _this.jan_code = ''
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
                                    _this.getProducts();
                                    _this.getOrderDataByJan();
                                })
                                .catch(function (er) {

                                })


                        } //else

                    } //else

                })
                .then(function (er) {

                })
                .finally(function () {
                    // _this.jan_code = '';
                    $('.loading_image_custom').hide()
                    _this.loader = 0
                })
        },
        naviShow() {
            this.handi_navi = '仕入・販売先マスターへ登録されました';
            $('#handy-navi').show();
        },
        // select all
        selectAll() {
            this.productJans = [];
            if (!this.allSelected) {
                this.productJans = this.products
            }


        },
        selectAllSuper() {
            let _this = this;
            this.selectedSuper = [];
            if (!_this.allSelectedSuper) {
                _this.vendors.map(function (ven) {
                    _this.selectedSuper.push(ven.id)
                })
            }


        },
        // select super
        selectSuper() {
            $('#mistumury-select-super').modal({backdrop : 'static'})
        },
        //sendtoSuper
        sendtoSuper() {
            console.log(this.productJans)
            console.log(this.selectedSuper)
            this.allSelected = false
            this.allSelectedSuper = false
            this.selectedSuper= [];
            this.productJans= [];

            let data = [this.productJans,this.selectedSuper];


            this.handi_navi = '00000000';
            $('#handy-navi').show();
            $('#mistumury-select-super').modal('hide');
        }
    },
    watch: {}
}
</script>

<style scoped>

.active-c {
    background: #b5ffb1;
}
.active-img {
    box-shadow: inset 0px 0px 5px #0079ff;
}

.well {
    padding: 0 !important;
}

.order_quantity_ {
    /*background: #F3F885 !important;*/
}

.select {
    border-color: #ad5ba1;
    background-color: #ffb400;
}

.select-row {
    border-color: #fd85ea;
    background-color: #f4fc71;
}

td {
    padding: 0 0 0 5px;
    word-break: break-all;
}

table thead tr th, table tbody tr td {
    border: 1px solid #9f9f9f !important;
}

@supports (-webkit-touch-callout: none) {
    /*/CSS specific to iOS devices */
    .search-button-ios {
        display: block !important;
    }

    #handy-navi {
        top: 235px !important;
    }

}
.image-div {
    width: 24%;
    position: relative;
}

.form-check-input_ {
    position: absolute;
    top: 0;
    right: 0;
}

.custom-img {
    width: 100%;
    margin: 5px;
    max-height: 310px !important;
}

.custom-img-preview {
    max-width: 98%;
    min-width: 60%;
    margin: 5px;
    max-height: 600px;
}

.top-button {
    padding: 5px 20px;
    font-size: 20px;
    font-weight: bold;
}

.header span {
    font-size: 24px;
}

.table-borderless {
    margin: 10px;
}

.table-borderless tbody tr td {
    border: none !important;
}

@media screen and (max-width: 351px) {
    .image-div {
        width: 50%;
    }

    .custom-img {
        width: 100%;
        margin: 3px 0px;
    }

    .top-button {
        padding: 5px;
        font-size: 13px;
    }

    .header span {
        font-size: 18px;
    }

    .custom-img-preview {
        min-width: 58%;
        max-width: 98%;
        margin: 5px;
        max-height: 500px;
    }

}

input[type="radio"], input[type="checkbox"] {
    width: 25px;
    height: 25px;
    margin: 0px 0px 0px -20px;
    cursor: pointer;
}
</style>
