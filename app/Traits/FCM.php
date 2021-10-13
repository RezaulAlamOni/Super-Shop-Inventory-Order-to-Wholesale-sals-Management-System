<?php

namespace App\Traits;

trait FCM
{
    // send firebase notification to user
    static function sendNotification($message_to, $message , $title){
        $url = "https://fcm.googleapis.com/fcm/send";
        foreach ($message_to as $item) {
//            return response()->json(['status' => $item, 'message' => "successfully sent to super"]);
            $fields = array(
                "to" => $item, //$_REQUEST['token'],
                "notification" => array(
                    "body" => $message,
                    "sound" => "default",
                    "priority" => 10,
                    "title"=>$title,
                    "icon" => "https://keipro.development.dhaka10.dev.jacos.jp/mail/resource/img/notification_icon.png",
                    "click_action" => "https://keipro.development.dhaka10.dev.jacos.jp/mail"
                )
            );
            $headers = array(
                "Authorization: key=AAAAkGW9lgM:APA91bFzlYfMdvaCfSuJV3VoxCTlY6Jjd0AQrLdRuwRNj2l508PJg94mHbhmxfsNsKy5kyw5N9mvJSMUPCQBURGWrqVmRBVbwToz0-aSi9nO_K8_hDj6b1fzWFYSczi4u29rLkBCSF7b",
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

}
