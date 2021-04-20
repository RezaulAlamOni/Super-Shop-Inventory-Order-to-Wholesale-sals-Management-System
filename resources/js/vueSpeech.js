__webpack_exports__["a"] = ({
    name: 'vue-speech',

    props: {
        lang: {
            type: String,
            default: 'en-US'
        },
        resume: {
            default: 0
        }

    },

    data: () => ({
        runtimeTranscription: '',
        transcription: []
    }),

    methods: {
        checkApi() {
            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (!SpeechRecognition && "development" !== 'production') {
                throw new Error('Speech Recognition does not exist on this browser. Use Chrome or Firefox');
            }

            if (!SpeechRecognition) {
                return;
            }

            const recognition = new SpeechRecognition();

            recognition.lang = this.lang;
            recognition.interimResults = true;

            recognition.addEventListener('result', event => {
                const text = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('');

                this.runtimeTranscription = text;
            });
            recognition.start();
            recognition.addEventListener('end', () => {
                if (this.runtimeTranscription !== '') {
                    this.transcription.push(this.runtimeTranscription);

                    this.$emit('onTranscriptionEnd', {
                        transcription: this.transcription,
                        lastSentence: this.runtimeTranscription
                    });
                }

                this.runtimeTranscription = '';
                recognition.stop();
            });


        }
    },

    mounted() {
        // this.checkApi();
    },
    watch: {
        resume: function (val) {
            if (val) {
                this.checkApi();
            }
        }
    }
});
