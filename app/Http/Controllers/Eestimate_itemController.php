<?php

namespace App\Http\Controllers;

use App\CustomMisthsumuryProduct;
use App\Traits\FCM;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\QRGenController;
use Illuminate\Support\Facades\Http;
use Rap2hpoutre\FastExcel\FastExcel;
use App\customer;
use App\jan;
use App\maker;
use App\customer_order;
use App\customer_shop;
use App\customer_order_detail;
use App\customer_shipment;

use App\customer_item;
use App\vendor_item;
use App\estimate_item;
use Session;
use Auth;

class Eestimate_itemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $orderBy = $request->orderBy;
        $user_id = Auth::user()->id;
        $cus_info = customer::where('user_id', $user_id)->first();
        if ($cus_info) {
            $products = estimate_item::with('janinfo')->where('customer_id', $cus_info->customer_id)->groupBy('jan')->orderBy('updated_at', $orderBy)->get();
        } else {
            $products = array();
        }

        try {

            $url = "https://ryutu-van.dev.jacos.jp/rv3_tonyav1/api/customer-shops/" . $cus_info->customer_id;
            $shops = Http::get($url);
            return response()->json(['products' => $products, 'shops' => $shops['shops']]);
        } catch (\Exception $exception) {

        }
        return response()->json(['products' => $products]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $item_info = $request->item_info;
        $super_info = $request->super_info;
        $message = $request->message;

        if (empty($super_info)) {
            return response()->json(['status' => 401, 'message' => "Super not found"]);
        }
        if (empty($item_info)) {
            return response()->json(['status' => 401, 'message' => "Item not found"]);
        }
        $app_url = config('app.url');
        $base_url = 'https://ryutu-van.dev.jacos.jp';
//        'public/backend/images/products/20000011.png';
        foreach ($super_info as $super) {
            $customer = customer::find($super);

            // send pusher notification to super

            event(new \App\Events\MyEvent(['message' => '', 'user_id' => $customer->user_id]));
            $msg = '';
            $images = '';
            $jans = [];
            foreach ($item_info as $item) {

                $img_src = $app_url . '/public/backend/images/products/'.$item['jan'].'.png';
                $images .= '<img src="'.$img_src.'" alt="Cinque Terre" class="img-thumbnail custom-img-preview" style="cursor: pointer;">';
               array_push($jans,$item['jan']);

                $item_insertedarr = $item;
                $item_insertedarr['customer_id'] = $super;
                unset($item_insertedarr['janinfo'], $item_insertedarr['img'], $item_insertedarr['vendor_item_id']);

                $exitsItme = estimate_item::where(['customer_id' => $super, 'jan' => $item_insertedarr['jan']])->first();
                $exitsVendor = vendor_item::where(['jan' => $item_insertedarr['jan']])->first();
                $exitsJan = jan::where('jan', $item_insertedarr['jan'])->first();
                if ($exitsItme) {
                    estimate_item::where(['customer_id' => $super, 'jan' => $item_insertedarr['jan']])->update($item_insertedarr);
                } else {
                    estimate_item::insert($item_insertedarr);
                }
                if (!$exitsVendor) {
                    vendor_item::insert($item_insertedarr);
                }
                $janInfo = $item['janinfo'];
                unset($janInfo['jan_id']);
                if ($exitsJan) {
                    jan::where('jan', $janInfo['jan'])->update($janInfo);
                } else {
                    jan::insert($janInfo);
                }

                $jan = jan::where('jan', $janInfo['jan'])->pluck('name');
                $msg .= $jan[0] . ', ';
            }
            //send main to super
            $button = '<a href="'.config('app.url').'/handy_receive_mitshumori?jans='.implode(',', $jans).'" target="_blank"><button class="btn btn-success btn-sm" >発注</button></a>';

            $message = $button.'<br>'.$message . " " . '問屋から「 ' . $msg . ' 」の見積受け取りました<br>'.$images;
            $this->sendMailToSuper($customer, $message);
            $message = '';
        }

        return response()->json(['status' => 200, 'message' => "successfully sent to super"]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function customEstimate(Request $request)
    {
        //
        $item_info = $request->item_info;
        $super_info = $request->super_info;
        $message = $request->message;

        if (empty($super_info)) {
            return response()->json(['status' => 401, 'message' => "Super not found"]);
        }
        if (empty($item_info)) {
            return response()->json(['status' => 401, 'message' => "Item not found"]);
        }
        $images = '';
        foreach ($super_info as $super) {
            $customer = customer::find($super);

            // send pusher notification to super

            event(new \App\Events\MyEvent(['message' => '', 'user_id' => $customer->user_id]));
            $msg = '';
            $base_url = 'https://ryutu-van.dev.jacos.jp';
            $jans = [];
            foreach ($item_info as $item) {
                if ($item['image_url']) {
                    $img_src = $base_url . $item['image_url'];
                    $images  .= '<img src="'.$img_src.'" alt="Cinque Terre" class="img-thumbnail custom-img-preview" style="cursor: pointer;">';
                }
                array_push($jans,$item['jan']);
                CustomMisthsumuryProduct::updateOrInsert(['name' => $item['name'], 'customer_id' => $customer->user_id], [
                    'name' => $item['name'],
                    'jan' => $item['jan'],
                    'vendor_id' => $item['vendor_id'],
                    'vendor_name' => $item['vendor_name'],
                    'cost_price' => $item['cost_price'],
                    'selling_price' => $item['selling_price'],
                    'gross_profit' => $item['selling_price'] - $item['cost_price'],
                    'gross_profit_margin' => $item['gross_profit_margin'],
                    'case_unit' => $item['case_unit'],
                    'ball_unit' => $item['ball_unit'],
                    'image' => $item['image_url'],
                    'customer_id' => $customer->customer_id,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
                $msg = $item['name'] . ', ';
            }
            //send main to super
            $button = '<a href="'.config('app.url').'/handy-receive-custom-mitshumori?jans='.implode(',', $jans).'" target="_blank"><button class="btn btn-success btn-sm" >発注</button></a>';

            $message_ = $button.'<br>'.$message . " " . '問屋から「 ' . $msg . ' 」の見積受け取りました。<br>'.$images;
            $this->sendMailToSuper($customer, $message_);
            $message_ = '';
        }

        return response()->json(['status' => 200, 'message' => "successfully sent to super"]);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function sendMailToSuper($customer, $message)
    {
        $ch = curl_init();
        $post_array = array(
            'file' => null,
            'hacchu_file' => null,
            'receiver_name' => $customer->name,
            'receiver_id' => $customer->vendor_id,
            'receiver_phone' => $customer->phone,
            'receiver_partner_code' => $customer->partner_code,
            'subject' => 'ファイル仕入先名別発注リスト',
            'message' => $message,
            'sender_name' => 'A とのや',
            'sender_id' => '1',
            'sender_phone' => '987654321543',
            'sender_partner_code' => '909090',
        );
        $fields_string = http_build_query($post_array);
//        $url = "https://keipro.development.dhaka10.dev.jacos.jp/mail/index.php/api/File_send/mail_send";
        $url = "https://keipro.development.dhaka10.dev.jacos.jp/mail/index.php/api/File_send/mail_send_to_super";
//        $url = "http://localhost/mail/index.php/api/File_send/mail_send_to_super";
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);                //0 for a get request
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
        curl_setopt($ch, CURLOPT_TIMEOUT, 500);
        $response = curl_exec($ch);
        curl_close($ch);
    }

    public function saveOrderQuentity(Request $request)
    {
        $mistumury_id = $request->id;
        $order_case = $request->order_case;
        $order_ball = $request->order_ball;
        $order_bara = $request->order_bara;
        $type = $request->type;

        if ($type == 'custom') {
            $item = vendor_item::query()->where('jan', $request->jan_code);;
            if ($item->first()) {
                $item->update([
                    'order_point_case_quantity' => $order_case,
                    'order_point_ball_quantity' => $order_ball,
                    'order_point_unit_quantity' => $order_bara,
                ]);
                return response()->json(['status' => 200, 'type' => 'Custom']);
            }

            return response()->json(['status' => 201, 'type' => 'Custom']);
        }

        $item = estimate_item::query()->where('vendor_item_id', $mistumury_id)->first();
        if (!$item) {
            return response()->json(['status' => 201]);
        }
        estimate_item::query()->where('vendor_item_id', $mistumury_id)
            ->update([
                'order_point_case_quantity' => $order_case,
                'order_point_ball_quantity' => $order_ball,
                'order_point_unit_quantity' => $order_bara,
                'updated_at' => $item->updated_at
            ]);

        return response()->json(['status' => 200]);
    }
}
