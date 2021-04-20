<template>
    <section>
        <button type="button" @click="startSpeech"
                class="pr-0 btn custom-btn btn-primary text-right show_inline search-button" style="float: left;width: 105px !important;">
            音声
            <img v-if="speech_start === 22" :src="base_url+'/public/loader/mg.gif'" alt="" width="40px ">
            <img v-else-if="speech_start === 1" :src="base_url+'/public/loader/vr.gif'" alt="" width="40px ">
        </button>
        <div id="speech-recognition">
            <vue-speech lang="ja-JP" :resume="speech_start" style="display: none" @onTranscriptionEnd="getText"/>
        </div>

    </section>
</template>
<!-- update vue speech module file method by using js/vueSpeech.js file method -->
<script>
// need to update
// const googleTTS = require('google-tts-api');
export default {
    props : ['base_url'],
    name: "text-recognition",
    data() {
        return {
            text: '',
            speech_start: 0
        }
    },
    mounted() {

    },
    methods: {
        getText({lastSentence, transcription}) {
            // console.log({ lastSentence, transcription })
            this.text = lastSentence;
            this.getDataFromList()
        },
        startSpeech() {
            let _this = this
            _this.speech_start = (_this.speech_start === 0) ? 1 : 0;
            this.$emit('clearInput')
            // $('#speech-recognition').html('<vue-speech lang="ja-JP" style="display: none" @onTranscriptionEnd="getText"/>')
        },
        getDataFromList() {
            let _this = this;
            if (_this.speech_start) {
                $('.loading_image_custom').show()
                this.$emit('getSearchData', _this.text)
                _this.speech_start = 0
            }
        }
    }
}
</script>

<style scoped>

    .search-button {
        position: relative;
        padding-right: 53px !important;
        float: left;
    }
    .search-button>img {
        position: absolute;
        right: 0px;
        top: 1px;
        border-radius: 53%;
    }


    @supports (-webkit-touch-callout: none) {
    /*/CSS specific to iOS devices */
        .search-button {
            display: none !important;
        }

    }

    @supports not (-webkit-touch-calloutz: none) {
     /*CSS for other than iOS devices */


    }
</style>
