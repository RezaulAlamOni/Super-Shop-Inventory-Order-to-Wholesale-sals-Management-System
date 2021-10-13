<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    @yield('title')
    <meta http-equiv='cache-control' content='no-cache'>
    <meta http-equiv="cache-control" content="max-age=0" />
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>
<meta http-equiv="cache-control" content="no-store" />
<meta http-equiv="cache-control" content="must-revalidate" />
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
    <link href="https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{Config::get('app.url').'/public'.mix('css/all_custom_css.css')}}">

    {{-- <script async defer src="https://buttons.github.io/buttons.js"></script> --}}
    @include('backend.layouts.js_variable')
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
                <img src="{{Config::get('app.url').'/public/loader/ajax-loader.gif'}}" class="loading_image loading_image_custom"/>
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

    <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase.js"></script>
    <script src="{{Config::get('app.url').'/public/js/test.js'}}"></script>
{{--    <script src="https://https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js"></script>--}}
{{--    <script src="https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js"></script>--}}
    <script src="https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js"></script>
    <script>
        var firebaseConfig = {
            apiKey: "AIzaSyBa4XqmW2OnhFz5zpAu5t0s_AI5Ov6xLAg",
            authDomain: "push-notification1-f9cda.firebaseapp.com",
            projectId: "push-notification1-f9cda",
            storageBucket: "push-notification1-f9cda.appspot.com",
            messagingSenderId: "620182214147",
            appId: "1:620182214147:web:d09b59f1dc46e4e4122036"
        };

        const app = firebase.initializeApp(firebaseConfig)


        const messaging = firebase.messaging();


        function initFirebaseMessagingRegistration(token) {

            $.ajax({
                url: '{{ route("save-token") }}',
                type: 'POST',
                data: {
                    fcm: token,
                    _token : "{{ csrf_token() }}"
                },
                dataType: 'JSON',
                success: function (response) {
                    // alert('Token saved successfully.');
                },
                error: function (err) {
                    console.log('User Chat Token Error' + err);
                },
            });
        }


        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/rv3_superv1/firebase-messaging-sw.js")
                .then(function(registration) {
                    console.log("FCM SW Registration successful, scope is:", registration.scope);
                    messaging.useServiceWorker(registration);

                    messaging.getToken({vapidKey: 'AIzaSyBa4XqmW2OnhFz5zpAu5t0s_AI5Ov6xLAg', serviceWorkerRegistration : registration })
                        .then((currentToken) => {
                            if (currentToken) {
                                console.log('current token for client: ', currentToken);
                                initFirebaseMessagingRegistration(currentToken)
                                // Track the token -> client mapping, by sending to backend server
                                // show on the UI that permission is secured
                            } else {
                                console.log('No registration token available. Request permission to generate one.');

                                // shows on the UI that permission is required
                            }
                        }).catch((err) => {
                        console.log('An error occurred while retrieving token. ', err);
                        // catch error while creating client token
                    });


                })
                .catch(function(err) {
                    console.log("Service worker registration failed, error:"  , err );
                });
        }


        messaging.onMessage(function (payload) {
            console.log(payload);
            const notificationOption={
                body:payload.notification.body,
                icon:payload.notification.icon
            };

            if(Notification.permission==="granted"){
                var notification=new Notification(payload.notification.title,notificationOption);

                notification.onclick=function (ev) {
                    ev.preventDefault();
                    window.open(payload.notification.click_action,'_blank');
                    notification.close();
                }
            }

        });
        messaging.requestPermission()
            .then(function(){
                console.log("have permission");
                // return messaging.getToken();
            })
        messaging.onTokenRefresh(function ()    {
            messaging.getToken()
                .then(function (newtoken) {
                    console.log("New Token : "+ newtoken);
                })
                .catch(function (reason) {
                    console.log(reason);
                })
        })
    </script>



</body>

</html>
