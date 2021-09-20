<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/haccuListsendtomailportal', 'API\SendMailPortalController@haccuListsendtomailportal');
Route::post('/estimation_data', 'Eestimate_itemController@store');
Route::post('/save-customer-data', 'CustomerShopController@saveCustomerData');

