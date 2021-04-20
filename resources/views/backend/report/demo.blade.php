<!DOCTYPE html>
<html lang="ja">
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Demo</title>
    <link rel="stylesheet" href="<?php echo(\Config::get('app.url').'/public/css/app.css');?>">
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
    body{ font-family: MigMix 2p, !important;}

    </style>
</head>
<body>
    <center>
        <img src="<?php echo(\Config::get('app.url').'/public/backend/images/logo/jacos_logo.png');?>" class="img-thumbnail" alt="">
        <h3>Dhaka Jacos co. Ltd</h3>
    </center>
    <table class="table table-bordered">
        <tr>
            <td>Sl</td>
            <td>Name</td>
            <td>Role</td>
        </tr>
            <tr>
                <td>1</td>
                <td>ウッヂイン</td>
                <td>10</td>
            </tr>
            <tr>
                <td>2</td>
                <td>さきる</td>
                <td>11</td>
            </tr>
            <tr>
                <td>3</td>
                <td>らじぶ</td>
                <td>12</td>
            </tr>
            <tr>
                <td>4</td>
                <td>あっさん</td>
                <td>13</td>
            </tr>
    </table>
</body>
</html>