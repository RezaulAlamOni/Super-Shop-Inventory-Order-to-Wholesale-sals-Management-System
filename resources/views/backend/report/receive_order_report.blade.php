<!DOCTYPE html>
<html lang="ja">
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>
            Receive Order Report
        </title>
    <link rel="stylesheet" type="text/css" href="{{Config::get('app.url').'public/css/bootstrap/bootstrap.min.css'}}">
    <style>
    .page-break {
    page-break-after: always;
    }

    @font-face {
            font-family: 'MigMix 2p';
            /* src: url('http://localhost/ryutsu_van/public/fonts/migmix-2p-regular.ttf') format("truetype"); */
            /* src: url('{{ URL::asset('/public/fonts/migmix-2p-regular.ttf') }}') format("truetype"); */
            src: url("<?php echo(\Config::get('app.url').'public/fonts/migmix-2p-regular.ttf'); ?>") format("truetype");
            font-weight: 200;
            font-style: normal;

        }
    body{ font-family: MigMix 2p; background: transparent;}
    .box{
        border: 1px solid gray;
        height: 50px;
        text-align: center;
        width: 180px;
    }
.table tr td{
        word-wrap:break-word;
    }
    </style>
</head>
<body>
    
        <img src="<?php echo(\Config::get('app.url').'/public/backend/images/logo/jacos_logo.png');?>" width="10%" alt="">
        <h3 style="font-family: MigMix 2p; text-align: center;">入荷伝票</h3>
        <br/>
    <table width="100%" style="text-align: center;">
        <tr>
            <td><p>仕入先</p></td>
            <td><p class="box">{{$delivery_order_info[0]->vendor_name}}</p></td>
            <td><p>入荷日</p></td>
            <td><p class="box">{{date("Y-m-d", strtotime($delivery_order_info[0]->shipment_date))}}</p></td>
            <td><p>入荷番号</p></td>
            <td>
                <div class="">
                       <p style="margin-top: -10px;">
                        
                        <img src="data:image/png;base64, {{ base64_encode(QrCode::format('png')->size(100)->generate($delivery_order_info[0]->voucher_number)) }} ">
                    </p>
                       <p style="margin-top: -25px; margin-bottom: -10px; line-height: 10px;">{{$delivery_order_info[0]->voucher_number}}</p>
                </div>
            </td>
        </tr>
    </table>
    <br>
    <br>
    <table class="table table-bordered" style="text-align: center;">
        <tr>
            <td width="5%">No</td>
            <td width="30%">商品名</td>
            <td width="10%">棚番</td>
            <td width="10%">ケ数</td>
            <td width="10%">ボ数</td>
            <td width="10%">バ数</td>
            <td width="25%">バーコード</td>
        </tr>
        <?php $i=1;?>
        @foreach ($delivery_order_info as $item)
        <tr>
            <td>{{$i}}</td>
            <td>{{$item->jan_name}}</td>
            <td>{{$item->rack_number}}</td>
            <td>{{$item->c_quantity}}</td>
            <td>{{$item->b_quantity}}</td>
            <td>{{$item->u_quantity}}</td>
            <td>
                <p>
                    <img src="data:image/png;base64,{{DNS1D::getBarcodePNG($item->jan, "EAN13")}}" alt="barcode" />
                </p>
                <p style="margin-top: -25px; padding: 0px; text-align: center; margin-bottom: -10px;">
                    {{$item->jan}} 
                </p>
            </td>
        </tr>
        <?php $i++;?>
        @endforeach
    </table>
</body>
</html>