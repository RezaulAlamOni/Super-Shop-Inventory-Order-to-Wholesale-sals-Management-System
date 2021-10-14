<?php

namespace App\Traits;


trait FCM
{
    // send firebase notification to user
    static function sendNotification($message_to, $message, $title)
    {
        $url = "https://fcm.googleapis.com/fcm/send";
        foreach ($message_to as $item) {
//            return response()->json(['status' => $item, 'message' => "successfully sent to super"]);
            $fields = array(
                "to" => $item, //$_REQUEST['token'],
                "notification" => array(
                    "body" => $message,
                    "sound" => "default",
                    "priority" => 10,
                    "title" => $title,
                    "receiver" => 'erw',
                    "icon" => "https://keipro.development.dhaka10.dev.jacos.jp/mail/resource/img/notification_icon.png",
//                    "click_action" => "https://keipro.development.dhaka10.dev.jacos.jp/mail"
                )
            );
            $headers = array(
                "Authorization: key=AAAAE4L-CiY:APA91bGH4w7KWRvShjnBoL2AUOML-2_yoXhfNwdvfpOasYisCMIB2ne4RQc7wCo_kC9Jb8QkALA0u9S0iUmRo7WoZd-T-gs2IT7gL_8HVTrNxR22b2qT80gbjOliWJw0Jh2FF6Wuxkbw",
                "Content-Type:application/json"
            );
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
            $result = curl_exec($ch);
            print_r($result);
            //echo $result;
            curl_close($ch);
        }

    }

    static function sendPusher()
    {
        event(new \App\Events\MyEvent('New Event'));
    }
}
