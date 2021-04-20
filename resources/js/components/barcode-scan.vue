<template>
    <section>
        <div class="main-content-container container-fluid pt-2">
            <button type="button" @click="getBarCodeScan()"
                    class="pr-0 ml-1 btn custom-btn btn-primary text-right show_inline search-button"
                    style="padding:0;float: left;width: 50px !important;height: 30px !important;">
                <i class="fa fa-barcode" style="font-size: 30px"></i>
            </button>

            <button type="button" @click="startSpeech"
                    class="pr-0 btn custom-btn btn-primary text-right show_inline search-button text-record-button" style="float: left;">
                音声
                <img class="text-record-loader" v-if="speech_start === 0" :src="base_url+'/public/loader/mic.png'" alt="" style="width: 16px">
                <img class="text-record-loader" v-else-if="speech_start === 1"  :src="base_url+'/public/loader/vr.gif'" >
            </button>
            <div id="speech-recognition">
                <vue-speech lang="ja-JP" :resume="speech_start" style="display: none" @onTranscriptionEnd="getText"/>
            </div>
        </div>

        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true" id="bar-code-scan-component">
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

    </section>

</template>

<script>

import {StreamBarcodeReader} from "vue-barcode-reader";

export default {
    props : ['base_url'],
    name: "barcode-scan",
    components: {StreamBarcodeReader},
    data() {
        return {
            barCodeScan: 0,
            text: '',
            speech_start: 0
        }
    },
    mounted() {
    },
    methods: {
        onDecode(result) {
            console.log(result)
            result = result.toString();
            this.setValue(result);
            this.getBarCodeScan()
        },
        onLoad() {

        },
        getBarCodeScan() {
            this.barCodeScan = this.barCodeScan ? 0 : 1;
            this.barCodeScan ? $('#bar-code-scan-component').modal({backdrop: 'static', keyboard: false}) : $('#bar-code-scan-component').modal('hide');
        },
        setValue(value){
            $('.recive_order_page_jn').val(value)
            $('#new-id').val(value)
            setTimeout(function () {
                $('.recive_order_page_jn').trigger('blur')
            },200)
        },
        getText({lastSentence, transcription}) {
            // console.log({ lastSentence, transcription })
            this.text = lastSentence;
            lastSentence = lastSentence.toString();
            this.setValue(lastSentence);
            console.log(this.text)
            this.speech_start = 0;
        },
        startSpeech() {
            let _this = this
            _this.speech_start = (_this.speech_start === 0) ? 1 : 0;
            this.$emit('clearInput')
            // $('#speech-recognition').html('<vue-speech lang="ja-JP" style="display: none" @onTranscriptionEnd="getText"/>')
        },
    }
}
</script>

<style scoped>
.text-record-button {
    width: 90px !important;
    height: 30px !important;
    margin-left: 15px;
    line-height: 20px !important;
    text-align: left !important;
}

.text-record-loader {
    height: 18px;
    width: 25px;
    margin: 5px;
    margin-top: -3px;
}

</style>
