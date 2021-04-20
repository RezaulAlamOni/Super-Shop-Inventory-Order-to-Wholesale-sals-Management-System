<!DOCTYPE html>
<html lang="ja">
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>
            management sheet Report
        </title>
    <link rel="stylesheet" type="text/css" href="{{Config::get('app.url').'public/css/bootstrap/bootstrap.min.css'}}">
    <style>
    .page-break {
    page-break-after: always;
    }

    @font-face {
            font-family: 'MigMix 2p';
            /* src: url('http://localhost/ryutu-van_kohka/public/fonts/migmix-2p-regular.ttf') format("truetype"); */
            /* src: url('{{ URL::asset('/public/fonts/migmix-2p-regular.ttf') }}') format("truetype"); */
            src: url("<?php echo(\Config::get('app.url').'public/fonts/migmix-2p-regular.ttf'); ?>") format('truetype');
            /* src: url("<?php echo(\Config::get('app.url').'public/fonts/migmix-2p-regular.ttf'); ?>") format('truetype'); */
            font-weight: 200;
            font-style: normal;

        }
        body{ font-family: MigMix 2p !important; background: transparent;}
    .box{
        border: 1px solid gray;
        height: 50px;
        text-align: center;
        width: 180px;
    }
    .managementsheet_totalamount_table_head tr th{

    }

    .managementsheet_totalamount_table_body tr td{

    }
    
    .managementsheet_item_table_head tr th{
        background: #1F618D;
        color: #fff;
    }
    
    .managementsheet_item_table_body tr td{

    }
    .page_titles{
        text-align: center;
        background:#1F618D;
        color:#fff;
        width:30%;
        margin:0 auto;
        padding-bottom:15px;

    }
    .col_title{
        border-bottom:3px solid #000;
    }
    .name_user{
        text-align:left !important;
    }
    .top_header,.row_header{position:relative;width:100%;display:block;height:300px;}
    .row_col{float:left;display:block;width:33%;}
    .row_col p{
        margin-bottom:0;
        margin:0;
        padding:0;
    }
    .right_fix_con{
        position:absolute;
        right:10px;

    }
    table tr td{
        font-family:MigMix 2p;
    }
    .left_address{font-size:14px;line-height:16px;}
    .right_address{font-size:14px;line-height:16px;}
    .managementsheet_tbles_pdf tr td{
        font-size:12px;
        padding-left:0;
        padding-right:0;
    }
    </style>
</head>
<body>
<?php 
            $date_devide = date('Y').'年  '.date('m').'月  '.date('t').'日 ';
         ?>
     <h4 class="page_titles">請　　求　　書</h4>
     <br>
     <br>
     <div class="top_header">
     <div class="row_header">
         <div class="col-md-4 row_col">

                
            <h4 class="col_title"><span class="name_user">{{$specific_customer_vendor_info->name}}</span><span class="right_fix_con">様</span></h4>


            <p class="left_address">お支払い期限：<?php echo $date_devide;?><br>
            お振込先<br>
            　&nbsp;&nbsp;&nbsp;銀行名：{{$invoice_info->bank_name}}<br>
            　&nbsp;&nbsp;&nbsp;支店名：{{$invoice_info->bank_branch}}<br>
            　&nbsp;&nbsp;&nbsp;口座番号：{{$invoice_info->bank_account_number}}<br>
            　&nbsp;&nbsp;&nbsp;口座名義：{{$invoice_info->bank_account_name}}
         </div>
         <div class="col-md-4 row_col">
        
         <h5 class="col_title"><span class="name_user"><?php echo $date_devide;?></span><span class="right_fix_con">締切分</span></h5>
         </div>
         <div class="col-md-4 row_col">
         <h4 class="Bank_info">{{$invoice_info->company_name}}</h4>
         <br>
         <p class="right_address">
         〒:{{$invoice_info->postal_code}}<br>
         {{$invoice_info->address}}<br>
TEL:{{$invoice_info->tel}}<br>
FAX:{{$invoice_info->fax}}
         </p>
         </div>
     </div>
     </div>
     <div class="clearfix"></div>
     <?php 
     $grs_v =0;
     $grs_v_t =0;
     $carry_receiable = 0;
     ?>
     @foreach ($delivery_order_info as $item)
        <?php
             $grs_v += $item->profit;
        ?>
     @endforeach
     <?php 
     $tax_grs =$grs_v*0.1;
     $grs_v_t = $grs_v+$tax_grs+$carry_receiable;
     ?>
    <table class="table table-bordered" width="100%" style="text-align: center;">
            <tr>
                <td>前回請求金額</td>
                <td>御入金額</td>
                <td>繰越金額</td>
                <td>税抜御買上額</td>
                <td>消費税等</td>
                <td>今回御請求額</td>
            </tr>
            <tr>
                <td>{{$total_profit_amount}}</td>
                <td>{{$total_payment_amount}}</td>
                <td>{{$carry_receiable}}</td>
                <td>{{$grs_v}}</td>
                <td>{{$tax_grs}}</td>
                <td>{{$grs_v_t}}</td>
            </tr>
        
    </table>
    <br>
    <br>
    <div class="clearfix"></div>
    <table class="table managementsheet_tbles_pdf table-bordered" width="100%" style="text-align: center;">
        <tr>
            <td>伝票日付</td>
            <td>伝票番号</td>
            <td>品番・品名</td>
            <td>数量</td>
            <td>単位</td>
            <td>単価</td>
            <td>税抜御買上額</td>
            <td>備考</td>
        </tr>
            <?php $i=0;
                $total_vl = 0;
            ?>
            @foreach ($delivery_order_info as $item)
        <tr>
            <td>{{$item->management_date}}</td>
            <td>{{$item->voucher_number}}</td>
            <td>{{$item->jan_name}}</td>
            <td>{{$item->quantity}}</td>
            <td>{{$item->inputs}}</td>
            <td>{{$item->s_price}}</td>
            <td>{{$item->profit}}</td>
            <td></td>
           
        </tr>
        <?php
         $total_vl += $item->profit;
        $i++;?>
        @endforeach
            <tr>
                <td colspan="6" style="text-align:right">小計</td>
                <td>{{$total_vl}}</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="6" style="text-align:right">消費税</td>
                <td>
                    <?php $tax = $total_vl*0.1;
                        $gros_total = $total_vl+$tax;
                    ?>
                    {{$tax}}
                </td>
                <td></td>
            </tr>
            <tr>
                <td colspan="6" style="text-align:right">合計金額</td>
                <td>{{$gros_total}}</td>
                <td></td>
            </tr>
        
    </table>
</body>
</html>