<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function get_api_data($jan_code){
        $ch = curl_init();
        // $skipper = "luxury assault recreational vehicle";
        //$fields = array( 'jan'=> $code_value);
        $fields = array('jan'=> $jan_code);
        $postvars = '';
        foreach($fields as $key=>$value) {
            $postvars .= $key . "=" . $value . "&";
        }
        // echo $postvars;exit;
        $url = "https://jan.dev.jacos.jp/janmaster/search.php";
        curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_POST, 1);                //0 for a get request
            curl_setopt($ch,CURLOPT_POSTFIELDS,$postvars);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch,CURLOPT_CONNECTTIMEOUT ,3);
            curl_setopt($ch,CURLOPT_TIMEOUT, 20);
            $response = curl_exec($ch);
            curl_close ($ch);
            return $rep_data = json_decode($response);
    }

    public function get_api_data_by_name(Request $request){

        $name = $request->name;
        set_time_limit(0);
        $ch = curl_init();
        // $skipper = "luxury assault recreational vehicle";
        //$fields = array( 'jan'=> $code_value);
        $fields = array('name'=> $name);
        $postvars = '';
        foreach($fields as $key=>$value) {
            $postvars = $key . "=" . $value;
        }
        // echo $postvars;exit;
        $url = "https://jan.dev.jacos.jp/janmaster/product.php";
        curl_setopt($ch,CURLOPT_URL,$url);
            curl_setopt($ch,CURLOPT_POST, 1);                //0 for a get request
            curl_setopt($ch,CURLOPT_POSTFIELDS,$postvars);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch,CURLOPT_CONNECTTIMEOUT ,3);
            curl_setopt($ch,CURLOPT_TIMEOUT, 500);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
            $response = curl_exec($ch);
            
            curl_close ($ch);
            $api_data = \json_decode($response);
            // echo '<pre>';
            // print_r($response);exit;
            // return $response;
        return $result = response()->json(['api_data' => $api_data]);

    }


}
