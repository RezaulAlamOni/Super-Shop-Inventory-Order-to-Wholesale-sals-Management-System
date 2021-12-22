<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\customer_shop;
use App\Jobs\shopUserCreateJob;



class CustomerShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    //    return $request->all();
        if (!(Validator::make($request->all(), ['customer_id' => 'required|max:50',])->passes())) {
            return response()->json(['message' => 'Please select a customer','class_name'=>'alert-danger']);
        }
        if (!(Validator::make($request->all(), ['shop_code' => 'required|max:50'])->passes())) {
            return response()->json(['message' => '店舗コードは必須です','class_name'=>'alert-danger']);
        }
        if (!(Validator::make($request->all(), ['shop_name' => 'required|max:50'])->passes())) {
            return response()->json(['message' => '店舗名を入力してください。','class_name'=>'alert-danger']);
        }
        if (!(Validator::make($request->all(), ['phone' => 'required|max:30'])->passes())) {
            return response()->json(['message' => '電話番号を入力してください。','class_name'=>'alert-danger']);
        }
        // if (!(Validator::make($request->all(), ['email' => 'email:rfc,dns|max:80'])->passes())) {
        //     return response()->json(['message' => 'メールアドレスを入力してください。','class_name'=>'alert-danger']);
        // }
        // if (!(Validator::make($request->all(), ['delivery_cycle' => 'required|max:5'])->passes())) {
        //     return response()->json(['message' => '配送サイクルを入力してください。','class_name'=>'alert-danger']);
        // }
        $shop_id=$request->shop_update_id;
        $customer_id=$request->customer_id;
        $shop_code=$request->shop_code;
        $shop_name=$request->shop_name;
        $shop_address=$request->shop_address;
        $postal_code=$request->postal_code;
        $phone=$request->phone;
        $email=$request->email;
        $delivery_cycle=$request->delivery_cycle;
        $shop_array=array(
            'shop_no'=>$shop_code,
            'customer_id'=>$customer_id,
            'shop_name'=>$shop_name,
            'shop_address'=>$shop_address,
            'shop_postal_code'=>$postal_code,
            'phone'=>$phone,
            'email'=>$email,
            'delivery_cycle'=>$delivery_cycle
        );

        if($shop_id!=null){
            $old_shop_info=customer_shop::where('customer_shop_id',$shop_id)->first();
            $old_customer_id=$old_shop_info['customer_id'];
            $old_shop_code=$old_shop_info['shop_no'];
            if($old_shop_code!= $shop_code){

                if(customer_shop::where('shop_no',$shop_code)->where('customer_id',$customer_id)->first()){
                    return response()->json(['message' => 'Customer shop code duplicated','class_name'=>'alert-danger']);
                }
            }
            customer_shop::where('customer_shop_id',$shop_id)->update($shop_array);
            return response()->json(['message' => 'success','class_name'=>'alert-success','mesg'=>'更新しました']);

        }else{
            if(customer_shop::where('shop_no',$shop_code)->where('customer_id',$customer_id)->first()){
                return response()->json(['message' => 'Customer shop code duplicated','class_name'=>'alert-danger']);
            }
            $user_array = [
                'name' => $shop_name,
                'email' => $shop_code.'@jacos.co.jp',
                'user_type' => 'shop',
                'password' => Hash::make($shop_code),
            ];
            $user_id = User::insertGetId($user_array);
            $shop_array['user_id']=$user_id;
            customer_shop::insert($shop_array);
            dispatch::shopUserCreateJob($user_array,$shop_array);
            return response()->json(['message' => 'success','class_name'=>'alert-success','mesg'=>'店舗の登録が完了しました']);
        }



    }
    public function shopUserCreate(Request $request){

        return response()->json(['message' => 'success','class_name'=>'alert-success','mesg'=>'店舗の登録が完了しました']);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function saveCustomerData(Request $request)
    {
        $shop_code=$request->customer_code;
        $shop_name=$request->customer_name;
        $email=$request->customer_email;
        $shop_array=array(
            'password'=>Hash::make($shop_code),
            'name'=>$shop_name,
            'email'=>$email,
        );

        $user = User::create($shop_array);

        return response()->json(['message' => $user,'class_name'=>'alert-success','mesg'=>'店舗の登録が完了しました']);



    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $shop_id=$request->shop_id;
        customer_shop::where('customer_shop_id',$shop_id)->delete();
        return response()->json(['message' => '店舗を削除しました。','class_name'=>'alert-success']);

    }
    public function getShopList(Request $request){
        $customer_shop_id=$request->shop_id;
        $shop_details='';
        $shop_query=customer_shop::select('customers.name as customer_name','customer_shops.*')
        ->join('customers','customers.customer_id','=','customer_shops.customer_id');

        if($customer_shop_id==null){
            $shop_details=$shop_query->orderBy('customer_name','ASC')->get();
        }else{
            $shop_details=$shop_query->where('customer_shop_id',$customer_shop_id)->first();
        }
        return response()->json(['shop_details' => $shop_details]);
    }
}
