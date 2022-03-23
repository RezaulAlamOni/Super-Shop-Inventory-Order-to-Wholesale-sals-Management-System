<?php

namespace App\Http\Controllers;
use App\Traits\FCM;
use App\User;
use Illuminate\Http\Request;
use App\customer_shipment;
use App\vendor_arrival;
use DB;
use Session;
use function Symfony\Component\Translation\t;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function index()
    {
        $title = "Dashboard";
        $active = 'dashboard';
        $frontend_title = '問屋';
        if(auth()->user()->user_type=='super'){
            $frontend_title = 'スーパー用';
        }else if(auth()->user()->user_type=='shop'){
            $frontend_title = '店用';
        }
        return view('backend.home', compact('title', 'active','frontend_title'));

    }

    public function android_home()
    {
        $title = "Dashboard";
        $active = 'android_home';
        return view('backend.android_home', compact('title', 'active'));

    }
    public function check_is_reload_required_page(Request $request){
        $page_url = $request->page_url;
        if($page_url=='receiveorder'){
            // $reload = session('reload_receive_order_page');
            $reload = vendor_arrival::where('reload_status','1')->first();
            if($reload){
            if($reload->reload_status =='1'){
                session(['reload_receive_order_page' => '0']);
                vendor_arrival::where('reload_status','1')->update(['reload_status'=>'2']);
                return $result = response()->json(['message' =>'success','refresh_status'=>1 ]);
            }
        }
        }else if($page_url=='shipment'){
            // $reload = session('reload_shipment_order_page');
            $reload = customer_shipment::where('reload_status','1')->first();
            if($reload){
            if($reload->reload_status =='1'){
                session(['reload_shipment_order_page' => '0']);
                customer_shipment::where('reload_status','1')->update(['reload_status'=>'0']);
                return $result = response()->json(['message' =>'success','refresh_status'=>1 ]);
            }
        }
        }
        return $result = response()->json(['message' =>'fail','refresh_status'=>0 ]);
    }

    public function saveToken(Request $request)
    {
        auth()->user()->update(['device_token'=>$request->fcm]);
        return response()->json(['token saved successfully.']);
    }

    public function sendNotification()
    {
        $firebaseToken = User::whereNotNull('device_token')->pluck('device_token')->all();

        $SERVER_API_KEY = 'AAAAkGW9lgM:APA91bFzlYfMdvaCfSuJV3VoxCTlY6Jjd0AQrLdRuwRNj2l508PJg94mHbhmxfsNsKy5kyw5N9mvJSMUPCQBURGWrqVmRBVbwToz0-aSi9nO_K8_hDj6b1fzWFYSczi4u29rLkBCSF7b';

        $data = [
            "registration_ids" => $firebaseToken,
            "notification" => [
//                "title" => $request->title,
//                "body" => $request->body,
                "title" => 'test',
                "body" => 'daasdfasdfsd',
            ]
        ];
        $dataString = json_encode($data);

        $headers = [
            'Authorization: key=' . $SERVER_API_KEY,
            'Content-Type: application/json',
        ];

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);

        $response = curl_exec($ch);

//        dd($response);
    }

    public function sendNotification_($message_to, $data)
    {
        $url = "https://fcm.googleapis.com/fcm/send";
        //return $data;die();

        //$receiver_id = $this->session->userdata('account_id');

//        if (!empty($data)) {
//            if ($data->settlement_id != 0) {
//                $president_seal_id = 1;
//                $notification_text = "最終決裁が承認しました";
//            } else {
//                $notification_text = "決裁書が届いています";
//            }
//            $email_id = $data->email_id;
//            $created_at = $data->created_at;
//            $sender_name = $data->sender_name;
//
//        } else {
//            $created_at = '';
//            $sender_name = '';
//            //echo 0;
//        }


        //$message_to=$get_token->firebase_token;
//        $message = "送信者：" . $sender_name . " さんより\n" . $notification_text;
        $message = "5411212122".$data;
//        $message_to_array = explode(',', $message_to);
        if(!empty($message_to))
            $count_message_to_array=count($message_to);
        else
            $count_message_to_array=1;
        //echo count($message_to_array);
        //print_r($message_to);
        //die();
        for ($i = 0; $i < $count_message_to_array; $i++) {
//            dd($message_to[$i]);
            $fields = array(
                "to" => $message_to[$i], //$_REQUEST['token'],
//            "to"=>"dNpKboJkJKebCWXDyd63hz:APA91bGu_W_9F-ul3wVwMEKUGEIPlFaTFyHE9Nte9B-bsitcmyGjaUvoKWKGHL3YpmCfzc31os786nEcY7d4FulyNiFIpPhnQeUDtnqZwUCMF_JxGuEiTLDBaBoon98zCKRCF7uC2XU4", //$_REQUEST['token'],
//            "to"=>"cusq28IZt0Trh7J2aY-8E1:APA91bFODA8OXVjQBUs7aczsCZ1hpoUN1GtiEtTnZrY-euOj2BxLVVFD-hrhqurC1stXjgqq4rSL0irx2gRPS6a28ui8wkMspGFCFvaIQoIDINqf7wquatCY1_cDsrV1BVXftSIZx_uE", //$_REQUEST['token'],
                "notification" => array(
                    "body" => $message,
                    "sound" => "default",
                    "priority" => 10,
//                "body"=>"My3 Testing Notice Mail",
                    "title"=>"ONi3333",
//                    "icon" => "https://keipro.development.dhaka10.dev.jacos.jp/mail/resource/img/notification_icon.png",
//                    "click_action" => "https://keipro.development.dhaka10.dev.jacos.jp/mail"
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

    public function sendNoti() {
        FCM::sendPusher();
        return true;
        $firebaseToken = User::whereNotNull('device_token')->pluck('device_token');
//        $firebaseToken = ['cVtJ6FFHLq6psRIcvzUYP0:APA91bFHDkH2TYMLyatxnGHGy4C1bdYx47RQdpBL7sjaZaFLtnZYOEmDuhURZL4EcLV5nGkLrG81rxEqCGdtJdZ2gGoKZgBA5Bz4h-mZsxnVrUyABuH9tCNfTuBK6d1T_axTpgxMh57y'];
        FCM::sendNotification($firebaseToken,'New message', 'Oni Test');
    }
}


