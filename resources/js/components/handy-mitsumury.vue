<template>
    <section>
        <div class="main-content-container container-fluid px-4">
            <!-- Small Stats Blocks -->
            <div class="row">
                <div class="well" style="border: 3px solid #428bca;">
                    <div class="header col-md-12 col-xs-12" style="font-size: 18px; padding: 10px;">
                        <span class="pull-left">
                                見積り
                        </span>
                        <!-- <button id="handy_shipment_item_insert" class="btn btn-primary pull-right" style="float:right"> 送信</button>&nbsp;-->
                        <a :href="base_url+'/android_home'" class="btn btn-primary pull-right"
                           style="float:right"> メニュー</a>
                        <a href="javascript:void(0)" class="btn btn-success pull-right mr-2"
                           :class="select_status ? 'select' : ''"
                           @click="setSelectStatus()"
                           style="float:right"> Select </a>

                    </div>
                    <div class="col-md-offset-2 col-md-8 col-centereds">
                        <div class="row custom_p_scan">
                            <br>

                            <div id="stock_detail_by_jan_form" class="p_scn_form text-right">

                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>品名</th>
                                        <th style="text-align: center;padding: 0">ケース</th>
                                        <th style="text-align: center;padding: 0">ボール</th>
                                        <!--                                        <th >バラ</th>-->
                                        <th style="text-align: center;padding: 0">原価</th>
                                        <th style="text-align: center;padding: 0">売価</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr @click="selectProduct()" v-for="product in products">
                                        <td>{{ product.janinfo.name }}</td>
                                        <td style="text-align: center;word-break: unset">{{ product.janinfo.case_inputs }}</td>
                                        <td style="text-align: center;word-break: unset">{{ product.janinfo.ball_inputs }}</td>
                                        <td style="text-align: center;word-break: unset">{{ parseInt(product.cost_price) }}</td>
                                        <td style="text-align: center;word-break: unset">{{ parseInt(product.selling_price) }}</td>

                                        <!--                                        <td>0</td>-->
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
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
            products : [],
            selected_products : []

        }
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        getProducts() {
            let _this = this;
            axios.get(this.base_url + '/get-all-products')
                .then(function (res) {
                    let data  = res.data;
                    _this.products = data.products;

                })
                .catch(function () {

                })
                .finally(function () {
                    //_this.jan_code = ''
                    $('.loading_image_custom').hide()
                    _this.loader = 0

                })
        },
        setSelectStatus() {
            this.select_status = this.select_status ? 0 : 1;
        },
        selectProduct(product){

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
</style>
