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
                    <div class=" col-centereds ">

                        <div>
                            <img src="public/svg/403.svg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(1)"
                                 style="cursor: pointer">
                            <img src="public/svg/403.svg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(2)"
                                 style="cursor: pointer">

                            <img src="public/svg/403.svg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(1)"
                                 style="cursor: pointer">
                            <img src="public/svg/403.svg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(2)"
                                 style="cursor: pointer">

                            <img src="public/svg/403.svg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(1)"
                                 style="cursor: pointer">
                            <img src="public/svg/403.svg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(2)"
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
                    <div class="modal-body p-0">
                        <div class="main-content-container container-fluid">
                            <div class="row">
                                <div class="well" style="border: 3px solid rgb(66, 139, 202);">
                                    <div id="handy_order_form_by_jan" class="form-horizontal">
                                        <div class="form-horizontal" id="handy_order_form">
                                            <div class="form-group"
                                                 style="border-radius: 5px; margin-top: 18px !important; margin-bottom: 2px">
                                                <p id="search_product_name" class="product_name_aria">
                                                    <span style="color: #999; font-size: 20px !important;"> </span>
                                                </p>
                                            </div>
                                            <div class="form-group" style="margin-bottom: 0">
                                                <div class="col-md-12 col-xs-12 padding_0">


                                                    <a href="javascript:void(0)"
                                                       class="btn btn-primary pull-right custom-btn"
                                                       id="order-place-button"

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
                                                           readonly=""
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
            handi_navi: ''

        }
    },
    mounted() {
        // this.getProducts();
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
            $('#mistumury-mage-preview').modal({backdrop:'static'})
        }


    },
    watch: {}
}
</script>

<style scoped>


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
}

.top-button {
    padding: 5px 20px;
    font-size: 20px;
    font-weight: bold;
}
.header span{
    font-size: 24px;
}


@media screen and (max-width: 351px) {
    .custom-img {
        width: 49%;
        margin: 3px 0px;
    }
    .top-button {
        padding: 5px;
        font-size: 14px;
    }
    .header span{
        font-size: 18px;
    }

}
</style>
