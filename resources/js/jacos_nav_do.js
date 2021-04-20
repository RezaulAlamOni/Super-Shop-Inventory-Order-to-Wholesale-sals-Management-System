const message = {
    m1: {
        message: [
            { message: '<button class="btn btn-success">仕入先登録</button>で仕入先の登録ができます。' },
            { message: '<button class="btn btn-success">販売先登録</button> で販売先の登録ができます。' },
            { message: '商品の登録ができ、商品マスターを作成します。<button class="btn btn-warning">登録</button>' },
            { message: '取引先別のマスターを確認するには、<br>このボタンを押してください。' }
        ],
        buttons: [
            { button: '<center><button class="btn btn-primary">仕入先別</button><button class="btn btn-primary">販売先別</button></center>' }
        ]
    },
    m2: {
        message: [
            { message: '<button class="btn btn-success">aaaa</button>で仕入先の登録ができます。' },
            { message: '取引先別のマスターを確認するには、<br>このボタンを押してください。' }
        ],
        buttons: [
            { button: '<center><button class="btn btn-primary">仕入先別</button><button class="btn btn-primary">販売先別</button></center>' }
        ]
    },

};



$(function() {

    // var sample_nav1 = view(message['m1'], def_old_nav_template);
    // var sample_nav2 = view(message['m2'], def_old_nav_template);
    // var sample_nav3 = view(message['m1']);
    // display_positionY = '100px';
    // console.log(get_nav_list());
    //var sample_nav1 = view(message['m2'], def_old_nav_template);

    // var sample_nav3 = view_modal(message['m1'], def_nav_template, function() {
    //     console.log('open callback do');
    // });

    // $('#' + sample_nav3 + ' .modal').attr({
    //     'data-backdrop': 'static'
    // });
    // var sample_nav4 = view_modal(message['m2'], def_old_nav_template);

    // nav_close_callback(sample_nav3, function() {
    //     nav_list[sample_nav3].hide();
    // });

    console.log(get_nav_list());

});