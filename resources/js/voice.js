var voice_flg = true;
var voice_tr = null;

// --------------------------------------------------------------------
var rec;
var status = 0;
function voice2text(callback) {

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var grammar = '#JSGF V1.0;'
    var lang = 'ja-JP';
    rec = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    rec.grammars = speechRecognitionList;
    rec.lang = lang;
    rec.interimResults = false; // 暫定結果
    rec.interimResults = true; // 暫定結果
    rec.continuous = true; // 認識継続
    rec.maxAlternatives = 10;
    rec.onresult = function (event) {
        callback(event);
    };
    rec.onspeechend = function () {
        rec.stop();
        rec.continuous = false;
    };
    rec.onend = function () {
        rec.stop();
    }
    rec.onerror = function (event) {
        console.log('Speech recognition error detected: ' + event.error);
        rec.continuous = false;
        rec.stop();
    }
    rec.onnomatch = function (event) {
        console.log(event);
        console.log('onnomatch');
        rec.stop();
    }

    // recognition start
    rec.start();
}

$("#voice_reset_btn").on("click", function () {
    status = 1;
    $('.voice_start').removeClass('show').addClass('hide');
    $('.voice_recoding').removeClass('hide').addClass('show');
    voice2text(add_record_callback);
    setTimeout(function () {
        reset_voice();
    }, 15000);
});
$("#stop_rec_btn").on("click", function () {
    reset_voice();
});

function reset_voice() {
    status = 0;
    rec.onspeechend();
    rec.stop();
    rec.abort();

    $('.voice_recoding').removeClass('show').addClass('hide');
    $('.voice_start').removeClass('hide').addClass('show');
    //    rec.start();
}

function add_record_callback(data) {

    if (status == 1) {

        var last = data.results.length - 1;
        var command = data.results[last][0].transcript.trim();
        if (data.results[last].isFinal) {
            console.log("voice end-------------------");

            if (word_check(command)) return;
            //item_search(command);
            var page_url = url_search();
            
            if(page_url=='brand-order' || page_url=='brand-order#'){
                var cId_val = $('.c_ids_v').val();
                var cus_name = $('.c_ids_name').val();
                get_brand_shop_brand_list(cId_val,cus_name,command,'popup1');
            }else if(page_url=='brand-order-detail' || page_url=='brand-order-detail#'){
                var cId_val = $('.c_ids_v').val();
                var cus_name = $('.c_ids_name').val();
                get_brand_updated_item_list(cId_val,cus_name,command);
            }else{
                jan_list_search_by_name(command);
            }
            //jan_list_search_by_name(command);
            $('.voice_reading_text').val(command);
            reset_voice();
        } else {
            if (voice_flg) {
                console.log("voice start -------------------");
                $('.voice_reading_text').val(command);

            } else {
                // interimResults continue
                $('.voice_reading_text').val(command);

            }
        }
    }
}

function now() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var w = now.getDay();
    var wd = ['日', '月', '火', '水', '木', '金', '土'];
    var h = now.getHours();
    var mi = now.getMinutes();
    var s = now.getSeconds();
    return y + '年' + m + '月' + d + '日 ' + '(' + wd[w] + ') ' + h + ':' + mi + ':' + s;
}

function word_check(word) {
    if (word === 'クリア') {
        // テーブルクリア
        $('.voice_reading_text').val('');
        return true;
    }
    return false;
}

function item_search(name) {
    var base_url = $('#base_url').val();
    $.ajax({
        url: base_url + 'estimate/item_search',
        type: 'POST',
        data: {
            'item_name': name
        },
        dataType: 'JSON',
    })
        .done((response_data) => {
            

            /*match table */
            var counter = 1;
            //if(response_data["match_reslt"].length>0){
            $.each(response_data["match_reslt"], function (i, e) {

                var cnt = response_data["match_reslt"][i].length;
                var color_cls = (cnt > 1 ? 'yellow_tr' : 'deflt_tr');
                var first = true;
                var j = 1;
                
                $.each(response_data["match_reslt"][i], function (ii, e) {
                    /*if (first) {
                        $("#search_matching_table > tbody").prepend('<tr><td rowspan="' + cnt + '">' + i + '</td><td>' + response_data["match_reslt"][i][ii]["product_name"] + '</td><td>' + response_data["match_reslt"][i][ii]["pro_jan_code"] + '</td></tr>');
                        first = false;
                    } else {
                        $("#search_matching_table > tbody").append('<tr><td>' + response_data["match_reslt"][i][ii]["product_name"] + '</td><td>' + response_data["match_reslt"][i][ii]["pro_jan_code"] + '</td></tr>');
                    }*/
                    $("#search_matching_table > tbody").prepend('<tr class="' + color_cls + '"><td></td><td>' + response_data["match_reslt"][i][ii]["product_name"] + '</td><td>' + response_data["match_reslt"][i][ii]["pro_jan_code"] + '</td></tr>');
                    do_color_orginal_table(response_data["match_reslt"][i][ii]["pro_jan_code"]);
                    counter++;
                    j++;
                });
            });


            //}
            /*match table */

            // var counter = 1;
            // $.each(ret["items"], function(i, e) {
            //     console.log(ret["items"][i]["item_name"]);
            //     $("#item_tbl > tbody").append('<tr><td>' + ret["items"][i]["item_name"] + '</td><td>' + ret["items"][i]["jan_code"] + '</td></tr>');
            //     counter++;
            // });
        })
        // Ajaxリクエストが失敗した時発動
        .fail((data) => {
            //            $('.result').html(data);
           
        })
        // Ajaxリクエストが成功・失敗どちらでも発動
        .always((data) => {

        });


}