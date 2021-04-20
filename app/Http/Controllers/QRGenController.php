<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QRGenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function qr_code_gen($qr_number,$folder)
    {
        \QrCode::size(500)
            ->format('png')
            ->generate($qr_number, storage_path().$folder.'/'.$qr_number.'.png');
    }
    public function folder_create($folder_name){
        if (!file_exists(storage_path().'/'.$folder_name)) {
            mkdir(storage_path().'/'.$folder_name, 0777, true);
        }
    }

}
