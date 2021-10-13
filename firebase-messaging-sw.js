importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

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
let token = '';
// messaging.getToken(true).then(data =>{
//     console.log(data)
//     token = data;
// } )

// function initFirebaseMessagingRegistration() {
//     messaging
//         .requestPermission()
//         .then(function () {
//             return messaging.getToken()
//         })
//         .then(function(token) {
//             console.log(token);
//             console.log('ddd');
//
//             $.ajaxSetup({
//                 headers: {
//                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//                 }
//             });
//
//             $.ajax({
//                 url: '/save-token',
//                 type: 'POST',
//                 data: {
//                     token: token
//                 },
//                 dataType: 'JSON',
//                 success: function (response) {
//                     alert('Token saved successfully.');
//                 },
//                 error: function (err) {
//                     console.log('User Chat Token Error'+ err);
//                 },
//             });
//
//         }).catch(function (err) {
//         console.log('User Chat Token Error'+ err);
//     });
// }


messaging.setBackgroundMessageHandler(function(payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    /* Customize notification here */
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});

