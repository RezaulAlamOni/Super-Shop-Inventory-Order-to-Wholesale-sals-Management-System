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
                            <img src="public/backend/images/products/cocacola.jpg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(1)"
                                 style="cursor: pointer">
                            <img src="public/backend/images/products/cocacola.jpg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(2)"
                                 style="cursor: pointer">

                            <img src="public/backend/images/products/cocacola.jpg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(1)"
                                 style="cursor: pointer">
                            <img src="public/backend/images/products/cocacola.jpg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(2)"
                                 style="cursor: pointer">

                            <img src="public/backend/images/products/cocacola.jpg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(1)"
                                 style="cursor: pointer">
                            <img src="public/backend/images/products/cocacola.jpg" class="img-thumbnail custom-img" alt="Cinque Terre" @click="viewInfoForImage(2)"
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
                        <div>
                            <img src="public/backend/images/products/cocacola.jpg" class="img-thumbnail custom-img-preview" alt="Cinque Terre"
                                 style="cursor: pointer">
                        </div>
                        <div>
                            <table class="table table-borderless">
                                <tbody>
                                <tr>
                                    <td>定番 価格: </td><td>350</td>
                                </tr>
                                <tr>
                                    <td>特売価格期限:</td>
                                    <td> 0000 </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>


                    </div>
                    <div class="modal-footer " style="padding: 6px">
                        <button class="btn btn-info float-right p-2"  @click="confirmAndHide()">戻る</button>
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
            $('#mistumury-mage-preview').modal({backdrop:'static'})
        },
        confirmAndHide() {
            $('#mistumury-mage-preview').modal('hide')
        }


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
.header span{
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
    .header span{
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
