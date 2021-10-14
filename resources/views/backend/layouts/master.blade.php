<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    @yield('title')
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv="cache-control" content="max-age=0"/>
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT"/>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
    <meta http-equiv="cache-control" content="no-store"/>
    <meta http-equiv="cache-control" content="must-revalidate"/>
    <link rel="shortcut icon" href="{{Config::get('app.url').'/public/backend/images/logo/favicon.ico'}}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="manifest" href="{{Config::get('app.url').'/manifest.json'}}">
    <meta name="description" content="A simple web app">

    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <link rel="stylesheet" href="{{Config::get('app.url').'/public'.mix('css/app.css')}}">
    <link rel="manifest" href="{{Config::get('app.url').'/public/css/manifest.json'}}">
    <link rel="stylesheet" href="{{Config::get('app.url').'/public/css/bootstrap/bootstrap-select.css'}}">
    <link rel="stylesheet" href="{{Config::get('app.url').'/public'.mix('css/all_online_css.css')}}">
    <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css"
          rel="stylesheet">
    <link rel="stylesheet" href="{{Config::get('app.url').'/public'.mix('css/all_custom_css.css')}}">

    {{-- <script async defer src="https://buttons.github.io/buttons.js"></script> --}}
    @include('backend.layouts.js_variable')

    <script src="https://js.pusher.com/7.0/pusher.min.js"></script>
    <script>

        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        var pusher = new Pusher('668cc0c510bc9039b290', {
            cluster: 'ap2'
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            let response = JSON.stringify(data);
            let user_id = '{{ auth()->id() }}'
            if (user_id == data.message.user_id) {
                $('#myModal').modal()
                const notificationOption = {
                    body: '新しい見積受けました、見積ページのピンク色に変わっている部分 確認お願いします。',
                    icon: "https://keipro.development.dhaka10.dev.jacos.jp/mail/resource/img/notification_icon.png"
                };
                if (Notification.permission === "granted") {
                    new Notification('RV3', notificationOption);
                }
            }
        });
    </script>

</head>

<body>
<div class="container-fluid" id="app">
    <div class="row">
        <!-- Sidebar -->
        @hasanyrole('Super Admin|Admin')
        @include('backend.pages.sidebar')
        @endhasanyrole
        @include('backend.pages.header')
        @yield('content')
        @include('backend.modals.delete_modal')
        @include('backend.modals.permission_show_modal')
        @include('backend.modals.maker_show_modal')
        @include('backend.modals.vendor_item_modal')
        @include('backend.modals.order_lot_modal')
        @include('backend.modals.shipment_popup_modal')
        @include('backend.modals.add_receive_order_modal')
        @include('backend.modals.customer_shop_modal')
        @include('backend.modals.warehouse_add_edit_delete_modal')

    <!-- jacos navigation -->
        @include('backend.navigate.navigate2')

        @include('backend.pages.footer')

        <div class="cutom-loader">
            <img src="{{Config::get('app.url').'/public/loader/ajax-loader.gif'}}"
                 class="loading_image loading_image_custom"/>
        </div>

        <div id="myModal" class="modal fade" role="dialog" >
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content" style="    background: rgb(220 240 250);">
{{--                    <div class="modal-header">--}}
{{--                        <button type="button" class="close" data-dismiss="modal">&times;</button>--}}
{{--                    </div>--}}
                    <div class="modal-body text-center">
                        <p style="font-size: 16px">新しい見積受けました、見積ページのピンク色に変わっている部分 確認お願いします.</p>
                        <a  href="{{ route('handy.receive.mitshumori') }}" type="button" class="btn btn-success">
                            見積り
                        </a>
                    </div>
                    <div class="modal-footer  p-0">
                        <button type="button" class="btn btn-warning" data-dismiss="modal">戻る</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
@yield('script')

<script src="{{Config::get('app.url').'/public'.mix('js/app.js')}}"></script>
<script src="{{Config::get('app.url').'/public/js/bootstrap-select.js'}}"></script>
<script src="{{Config::get('app.url').'/public'.mix('js/all_online_js.js')}}"></script>
<script src="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/js/bootstrap4-toggle.min.js"></script>
<script src="{{Config::get('app.url').'/public'.mix('js/all_custom_js.js')}}"></script>
<script src="{{Config::get('app.url').'/public/js/ui.datepicker-ja.js'}}"></script>

{{--    <script src="{{Config::get('app.url').'/closePWA.js'}}"></script>--}}
<script>
    window.base_url = '{{ config('app.url') }}'

</script>

<script src="{{Config::get('app.url').'/public/js/test.js'}}"></script>


</body>

</html>
