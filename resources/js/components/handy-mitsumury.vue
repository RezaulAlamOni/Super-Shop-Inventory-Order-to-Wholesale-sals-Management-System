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
                        <a href="javascript:void(0)" class="btn btn-success pull-right mr-1 top-button"
                           style="float:right"> 採用</a>
                        <a href="javascript:void(0)" class="btn btn-success pull-right mr-1 top-button"
                           style="float:right"> 詳細</a>

                    </div>
                    <div id="stock_detail_by_jan_form" class="p_scn_form text-right mt-0">
                        <div class="input-group m-0 my-1">
                            <input type="tel" class="form-control" placeholder="JANコードスキャン（13桁）"
                                   style="border-radius: 0px;padding: 5px;font-size: 16px;" autofocus
                                   v-model="jan_code"
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

                    <div class=" col-centereds ">
                        <div>
                            <img src="public/backend/images/fish.jpg" class="img-thumbnail custom-img"
                                 alt="Cinque Terre" @click="viewInfoForImage(1)"
                                 style="cursor: pointer">
                            <img src="public/backend/images/fish.jpg" class="img-thumbnail custom-img"
                                 alt="Cinque Terre" @click="viewInfoForImage(2)"
                                 style="cursor: pointer">

                            <img src="public/backend/images/fish.jpg" class="img-thumbnail custom-img"
                                 alt="Cinque Terre" @click="viewInfoForImage(1)"
                                 style="cursor: pointer">
                            <img src="public/backend/images/fish.jpg" class="img-thumbnail custom-img"
                                 alt="Cinque Terre" @click="viewInfoForImage(2)"
                                 style="cursor: pointer">

                            <img src="public/backend/images/fish.jpg" class="img-thumbnail custom-img"
                                 alt="Cinque Terre" @click="viewInfoForImage(1)"
                                 style="cursor: pointer">
                            <img src="public/backend/images/fish.jpg" class="img-thumbnail custom-img"
                                 alt="Cinque Terre" @click="viewInfoForImage(2)"
                                 style="cursor: pointer">
                            <img src="public/backend/images/fish.jpg" class="img-thumbnail custom-img"
                                 alt="Cinque Terre" @click="viewInfoForImage(1)"
                                 style="cursor: pointer">
                            <img src="public/backend/images/fish.jpg" class="img-thumbnail custom-img"
                                 alt="Cinque Terre" @click="viewInfoForImage(2)"
                                 style="cursor: pointer">

                            <img src="public/backend/images/fish.jpg" class="img-thumbnail custom-img"
                                 alt="Cinque Terre" @click="viewInfoForImage(1)"
                                 style="cursor: pointer">
                            <img src="public/backend/images/fish.jpg" class="img-thumbnail custom-img"
                                 alt="Cinque Terre" @click="viewInfoForImage(2)"
                                 style="cursor: pointer">
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
                        <a class="btn btn-success float-right mr-1">採用</a>
                        <a class="btn btn-success float-right">発注</a>
                    </div>
                    <div class="modal-body p-0" style="text-align: center">
                        <div
                            style="font-size: 18px;text-align: left;padding: 5px 10px;background: #c3ff8f80;font-weight: bold;">
                            グリコ バンホーテンチョコレートビター ５３ｇ
                        </div>
                        <div>
                            <img src="public/backend/images/fish.jpg"
                                 class="img-thumbnail custom-img-preview" alt="Cinque Terre"
                                 style="cursor: pointer">
                        </div>
                        <div>
                            <table class="table table-borderless" style="margin: 10px 0!important;">
                                <tbody>
                                <tr>
                                    <td>原価 :</td>
                                    <td>350</td>
                                </tr>
                                <tr>
                                    <td>売価 :</td>
                                    <td>350</td>
                                </tr>
                                <tr>
                                    <td>特売価格期限:</td>
                                    <td>
                                        <input type="tel" id="special_input" value="0"
                                               style="height: 35px !important; width: 105px;" placeholder=""
                                               class="form-control custom-input">
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>


                    </div>
                    <div class="modal-footer " style="padding: 6px">
                        <button class="btn btn-info float-right p-2" @click="confirmAndHide()">戻る</button>
                    </div>
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
            select_status: 0,
            products: [],
            selected_products: [],
            handi_navi: '',
            search_data: null,
            product_pics : []

        }
    },
    mounted() {
        this.getProducts();
        this.handi_navi = '........';
        $('#handy-navi').show();
    },
    methods: {
        getProducts() {
            let _this = this;
            axios.get(this.base_url + '/get-all-products')
                .then(function (res) {
                    let data = res.data;
                    _this.products = data.products;
                    _this.handi_navi = '........';
                    $('#handy-navi').show();
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
            this.handi_navi = '---------';
            $('#handy-navi').show();
        },
        viewInfoForImage(img_type) {
            this.handi_navi = '*******';
            $('#handy-navi').show();
            $('#mistumury-mage-preview').modal({backdrop: 'static'})
        },
        confirmAndHide() {
            $('#mistumury-mage-preview').modal('hide')
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

            if (this.loader === 1) {
                return false;
            }
            let reg = /^\d+$/;

            if (this.jan_code.length >= 13 || this.jan_code.length == 8) {
                if (reg.test(this.jan_code)) {
                    this.getOrderDataByJan()
                }
            }
            if (e.keyCode === 13) {
                if (reg.test(this.jan_code)) {
                    this.getOrderDataByJan()
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


    },
    watch: {}
}
</script>

<style scoped>

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

.custom-img {
    width: 24%;
    margin: 5px;
    max-height: 400px !important;
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
    .custom-img {
        width: 49%;
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
</style>
