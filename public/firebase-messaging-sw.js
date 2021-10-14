importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

var firebaseConfig = {
    apiKey: "AIzaSyB4AoxsI3VgNg1G4rncXMsLxEdxYKET0oI",
    authDomain: "rv3-fcm.firebaseapp.com",
    projectId: "rv3-fcm",
    storageBucket: "rv3-fcm.appspot.com",
    messagingSenderId: "83802065446",
    appId: "1:83802065446:web:8bc4d220637470ef3534e7",
    measurementId: "G-6HS1RD0YCD"
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

