<?php
use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('language/{locale}', function ($locale) {
    Session::put('locale',$locale);

    return redirect()->back();
});
Route::get('/', function () {
	// return view('frontend.welcome');
	return redirect('login');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/android_home', 'HomeController@android_home')->name('android_home');
Route::get('/vendor_master/{id?}', 'VendorMasterController@index');
Route::get('/special_master_item/{id?}', 'SpecialMasterItemController@index');
Route::get('/vendor_master_item/{id?}', 'VendorMasterController@vendor_master_item');
Route::get('/customer_master/{id?}', 'VendorMasterController@customerMaster');
Route::get('/customer_master_item/{id?}', 'VendorMasterController@customer_master_item');



// Authentication Route
Route::group(['middleware'=>'MyMiddleWire'],function(){

	// Role permission Route
	// Route::group(['middleware' => ['role:Super Admin']], function () {

		// Route::get('/user_create', 'PermissionController@permission')->name('permission');
        Route::get('/permission/{id?}', 'PermissionController@permission')->name('permission');
		Route::post('/permission_insert', 'PermissionController@permissionInsert');
		Route::get('/permission_delete/{permission_id}', 'PermissionController@permissionDelete');

		Route::get('/role/{id?}', 'RoleController@role')->name('role');

		// Route::get('/create_role', 'RoleController@create_role')->name('create_role');
		Route::post('/role_insert', 'RoleController@roleInsert');
		Route::get('role_delete/{role_id}', 'RoleController@roleDelete');

		Route::get('/assign_permission_model', 'RoleController@assignPermissionToModel');
		Route::post('/assign_permission_model', 'RoleController@assignPermissionToModelStore');

        Route::post('get_permission_model', 'RoleController@getPermissionModel');


		Route::get('assign_role_model', 'RoleController@assignRoleModel');
		Route::get('get_role/{user_id}', 'RoleController@getRole');
		Route::post('assign_model_role', 'RoleController@assignModelRole');

		Route::post('user_create', 'UserManagement@userCreate');
        Route::get('user_delete/{user_id}', 'UserManagement@userDelete');
		Route::get('user_list', 'UserManagement@userList');
		Route::get('user_update/{user_id}', 'UserManagement@userDetails');

		Route::post('update_user', 'UserManagement@userUpdate');
		Route::post('change_password', 'UserManagement@changePassword');
		Route::post('permission_search', 'PermissionController@permissionSearch');
		// Route::post('user_change_password', 'UserManagement@userChangePassword');

		// Code Added by Ahasan from
		Route::post('user_update', 'UserManagement@userUpdate');
		Route::get('get_permission_by_role_id/{user_id}', 'RoleController@get_role_permission_by_role_id');

	// });

	// Test Report
	Route::get('/test_report','ReportGenerateController@index');

	Route::post('/vendor_add_edit','VendorController@store');
	Route::post('/customer_add_edit','CustomerController@store');

	Route::post('/get_customer_list','CustomerController@index');
	Route::post('/get_vendor_list','VendorController@index');
	Route::get('/vendorList','VendorController@vendorList');

	Route::post('/customer_delete','CustomerController@destroy');
	Route::post('/vendor_delete','VendorController@destroy');

	Route::post('/get_jan_info','VendorController@getJanInfo');
	Route::post('/insert_janinfo','VendorController@insert_janinfo');
	Route::post('/add_vendor_item','VendorController@addVendorItem');
	Route::post('/update_vendor_master_item_content','VendorController@update_vendor_master_item_content');
	Route::post('/update_in_company_code','VendorController@update_in_company_code');
	Route::post('/update_vendor_itms_by_vendor_id','VendorController@update_vendor_itms_by_vendor_id');
    Route::post('/update_vendor_item_by_vendor_item_id','VendorController@updateVendorItem');
    Route::post('/update_customer_item_by_customer_item_id','CustomerController@update_customer_item_by_customer_item_id');
	//vendor_item_by_vendor_item_id
	Route::post('/get_all_vendor_master_item','VendorMasterController@get_all_vendor_master_item');
	Route::post('/get_all_vendor_master_sorting_item','VendorMasterController@get_all_vendor_master_sorting_item');
	//new for customer item
	Route::post('/add_update_customer_item', 'CustomerController@add_update_customer_item');
	Route::post('/add_customer_item_data_by_jan', 'CustomerController@add_customer_item_data_by_jan');
	Route::post('/update_customer_master_item_content', 'CustomerController@update_customer_master_item_content');
	Route::post('/handy_update_customer_master_item_content', 'CustomerController@handy_update_customer_master_item_content');
	Route::post('/get_customer_list_item_by_id', 'CustomerController@get_customer_list_item_by_id');
	Route::post('/delete_customer_itms_by_id', 'CustomerController@delete_customer_itms_by_id');
	Route::post('/get_all_vendor_data_by_vendor_id', 'CustomerController@get_all_vendor_data_by_vendor_id');
	Route::get('/handy_customer_master_item_get_by_jan_code/{jan}', 'CustomerController@handy_customer_master_item_get_by_jan_code');

	Route::post('/vendor_item_delete', 'VendorController@vendorItemDelete');
	Route::post('/update_order_info_by_id', 'VendorController@update_order_info_by_id');
	Route::post('/vendor_order_insert', 'VendorController@vendor_order_insert');
	Route::post('/vendor_order_insert_new', 'VendorController@vendor_order_insert_new');
	Route::post('/vendor_order_insert_new_auto_order_by_last_order', 'VendorController@vendor_order_insert_new_auto_order_by_last_order');
	Route::post('/vendor_order_insert_handy', 'VendorController@vendor_order_insert_handy');
	Route::post('/vendor_order_list_by_voucher_number', 'HandyrController@vendor_order_list_by_voucher_number');
	Route::post('/single_vendor_item', 'VendorController@singleVendorItem');

	//receive order
	Route::get('/receiveorder/{id?}', 'ReceiveorderController@index');
	// oni handy order info
	Route::get('/order-info-for-handy/{jan}', 'ReceiveorderController@orderInfoForHandy');

	Route::post('/update_receive_order_item_content', 'ReceiveorderController@update_receive_order_item_content');
	Route::get('/shipment/{id?}', 'ShipmentController@index');

	Route::get('/inventory-update', 'HandyrController@inventoryUpdate')->name('inventory.update'); // Oni for new design handy
	Route::get('/inventory-inquiry', 'HandyrController@inventoryInquiry')->name('inventory.inquiry'); // Oni for new design handy

    //oni
    Route::get('/inventory-return', 'HandyrController@inventoryReturn')->name('inventory.return'); // Oni for new design handy


    Route::get('/inventoryentrybyhandy', 'HandyrController@inventoryentrybyhandy'); // 26.01.2020 Oni

    Route::post('/stock_item_rack_check', 'HandyrController@stock_item_rack_check');
	Route::get('/handy_vendor_master', 'HandyrController@handy_vendor_master');
	Route::get('/handy_order_receive', 'HandyrController@handy_order_receive');
    Route::get('/handy_order_receive_list', 'HandyrController@handy_order_receive_list');
    Route::get('/handy_order_receive_scan_jan', 'HandyrController@handy_order_receive_scan_jan');
    /*receive ordered product by scan*/
    Route::post('/handy_received_product_detail_by_jan_code', 'HandyrController@handy_received_product_detail_by_jan_code');
    Route::post('/handy_received_product_detail_by_jan_code_for_order_list', 'HandyrController@handy_received_product_detail_by_jan_code_for_order_list');
    Route::get('/stock_details_by_handy', 'HandyrController@stock_details_by_handy');
	Route::post('/getall_stock_items_list', 'HandyrController@getall_stock_items_list');
	Route::post('/getall_receiveable_items_list', 'HandyrController@getall_receiveable_items_list');
	Route::get('/handy_order_shipment', 'HandyrController@handy_order_shipment');
	Route::get('/handy_order_shipment_list', 'HandyrController@handy_order_shipment_list');
	Route::get('/order_shipment_list', 'HandyrController@order_shipment_list')->name('order.shipment.list');
	Route::get('/handy_stock', 'HandyrController@handy_stock');
	Route::get('/handy_stock_detail_by_rack', 'HandyrController@handy_stock_detail_by_rack');
	Route::post('/handy_stock_detail_by_jan_code', 'HandyrController@handy_stock_detail_by_jan_code');

	//Oni for new design
	Route::get('/handy_stock_detail_get_by_jan_code/{jan}', 'HandyrController@handy_stock_detail_get_by_jan_code');
	Route::get('/handy_get_last_order_by_jan_code/{jan}', 'HandyrController@handy_get_last_order_by_jan_code');
	Route::get('/cache-clear/{rdn_code}', 'HandyrController@cacheClearAndReload')->name('cache.clear');

	Route::post('/update_stock_by_rack_by_handy', 'HandyrController@update_stock_by_rack_by_handy');
	Route::get('/handy_quotation', 'HandyrController@handy_quotation');
	Route::get('/handy_store_order', 'HandyrController@handy_store_order')->name('handy.store.order');
	Route::get('/handy_kouri_order', 'HandyrController@handy_kouri_order')->name('handy.kouri.order');
	Route::get('/handy_kouri_order_confirm', 'HandyrController@handy_kouri_order_confirm')->name('order.kouri.confirm');
	Route::get('/handy_vendor_item_batch_insert', 'VendorController@handy_vendor_item_batch_insert');
	Route::get('/handy_customer_master', 'HandyrController@handy_customer_master');
	Route::get('/inventoryentrybyjancode', 'HandyrController@inventoryentrybyjancode');
	Route::get('/productaddhandy', 'HandyrController@product_add_handy');
	Route::get('/handyproductlist', 'HandyrController@handy_product_list');
	Route::get('/shipmentaddhandy', 'ShipmenthandyController@shipment_add_handy');
	Route::get('/handyshipmentproductlist', 'ShipmenthandyController@handy_shipmetproduct_list');
	Route::get('/stockproductinfo', 'HandyrController@stockproductinfo');
	Route::post('/stock_inventory_rack_code_add', 'HandyrController@stock_inventory_rack_code_add');
	Route::post('/get_stock_info_by_jans', 'HandyrController@get_stock_info_by_jans');
	Route::post('/vendor_item_insert_into_shelf', 'HandyrController@vendor_item_insert_into_shelf');
	Route::post('/get_stock_info_by_jans_and_rack_code', 'HandyrController@get_stock_info_by_jans_and_rack_code');
	Route::get('/receive_order_query/{id}', 'ReceiveorderController@receive_order_query');
	Route::post('/receive_order_update', 'ReceiveorderController@update');

	Route::post('/shipment_csv_insert', 'ShipmentCsvController@ShipmentCsvInsert');
	Route::post('/shipment_csv_insert_brand', 'ShipmentCsvController@ShipmentCsvInsert_brand');
	Route::post('/customer_manul_order_insert_by_jan_code', 'ShipmentCsvController@customer_manul_order_insert_by_jan_code');

	Route::post('/vendor_arival_insert', 'HandyrController@vendor_arival_insert');
	Route::post('/vendor_arival_insert_handy_receiveorder', 'HandyrController@vendor_arival_insert_handy_receiveorder');
	Route::post('/check_order_exists', 'HandyrController@check_order_exists');
	Route::post('/vendor_arival_insert_web_receiveorder', 'HandyrController@vendor_arival_insert_web_receiveorder');
	Route::post('/get_jan_info_from_vendor_order', 'HandyrController@get_jan_info_from_vendor_order');
	Route::post('/check_self_no_is_exists', 'HandyrController@check_self_no_is_exists');
	Route::post('/stock_item_insert_update', 'HandyrController@stock_item_insert_update');
	Route::post('/stock_item_update_final_insert', 'HandyrController@stock_item_update_final_insert');
	Route::post('/update_stock_item_by_jan_by_handy', 'HandyrController@update_stock_item_by_jan_by_handy');
	Route::post('/create_vendor_invoice_by_voucher', 'HandyrController@create_vendor_invoice_by_voucher');
	Route::post('/create_vendor_invoice_by_voucher_receive_order', 'HandyrController@create_vendor_invoice_by_voucher_receive_order');
	Route::post('/insert_customer_invoice_by_shipment', 'HandyrController@insert_customer_invoice_by_shipment');



	Route::post('/receive_order_data', 'ReceiveorderController@ReceiveOrderData');
	Route::post('/receive_order_data_popup', 'ReceiveorderController@receive_order_data_popup');
	Route::post('/get_vendor_order_details_by_vendor_jan', 'ReceiveorderController@get_vendor_order_details_by_vendor_jan');
	Route::post('/get_customer_order_details_by_customer_jan', 'ShipmentController@get_customer_order_details_by_customer_jan');


//	brand order
    Route::get('/brand-order/{id?}', 'BrandController@index')->name('brand');
    Route::get('/brand-order-detail/{id?}/{shop_id?}', 'BrandController@brand_details')->name('brand');


	/* shimpent order */
	Route::post('/get_customer_order_by_voucer', 'HandyrController@get_customer_order_by_voucer');
	Route::post('/get_shipment_order_info', 'HandyrController@get_shipment_order_info');
	Route::post('/insert_shipment_order_info', 'HandyrController@insert_shipment_order_info');
	Route::post('/shipment_arival_insert_handy_shipmentorder', 'HandyrController@shipment_arival_insert_handy_shipmentorder');
	//Route::get('/kouri-order-info-for-handy/{jan}', 'ReceiveorderController@orderInfoForHandy');

	/* shimpent order */
	Route::post('/shipment_update', 'ShipmentController@update');
	Route::get('/shipmentconfirmation', 'ShipmentController@shipmentconfirmation');
	Route::post('/get_all_customer_in_confirm', 'ShipmentController@get_all_customer_in_confirm');
	Route::post('/shipment_confirmation_update', 'ShipmentController@shipment_confirmation_update');
	Route::post('/shipment_conf_delete', 'ShipmentController@shipment_conf_delete');
	Route::get('/delivery_order_report/{id?}', 'ReportGenerateController@deliveryOrderReport');
	Route::get('/receive_order_report/{id?}', 'ReportGenerateController@receiveOrderReport');
	Route::post('/shipmentmangementsheet', 'Shipment_mangementsheetController@index');
	Route::get('/shipmentmangementsheet', 'Shipment_mangementsheetController@index');

	Route::post('/shipment_data_filter', 'Shipment_mangementsheetController@shipment_items_data');

	Route::post('/get_shop_list', 'CustomerShopController@getShopList');

	Route::get('/manualOrder', 'Customer_menual_orderController@index');
	Route::get('/onlineorder', 'Customer_menual_orderController@onlineorder');
	Route::post('/get_customer_base_manual_order_item', 'Customer_menual_orderController@get_customer_base_manual_order_item');
	Route::post('/update_csv_order_data', 'Customer_menual_orderController@update_csv_order_data');
	Route::post('/get_shop_list_by_customer_id', 'Customer_menual_orderController@get_shop_list_by_customer_id');
	Route::post('/get_shop_item_list_by_customer_id', 'Customer_menual_orderController@get_shop_item_list_by_customer_id');
	Route::post('/get_shop_updated_item_list_by_customer_id', 'Customer_menual_orderController@get_shop_updated_item_list_by_customer_id');
	Route::post('/get_jn_info_by_jn_code', 'Customer_menual_orderController@get_jn_info_by_jn_code');
	Route::post('/shop_store', 'CustomerShopController@store');
	Route::post('/item_search_by_name', 'VendorController@item_search_by_name');
	Route::post('/item_search_by_name_from_jan_master', 'ApiController@get_api_data_by_name');






	Route::post('/add_menual_order_insert', 'Customer_menual_orderController@add_menual_order_insert');

	Route::post('/delete_shop_info', 'CustomerShopController@destroy');
	Route::get('/warehouse', 'WarehouseController@index');
	Route::post('/warehouse_store', 'WarehouseController@store');
	Route::post('/get_warehouse_list', 'WarehouseController@get_warehouse_list');
	Route::post('/wareHouseQuery', 'WarehouseController@wareHouseQuery');
	Route::post('/warehouse_delete', 'WarehouseController@destroy');
	Route::post('/get_payment_info_by_invoice_id', 'Shipment_mangementsheetController@get_payment_info_by_invoice_id');
	Route::post('/insert_payment', 'Shipment_mangementsheetController@insert_payment');
	Route::post('/delete_payment', 'Shipment_mangementsheetController@delete_payment');
	Route::post('/get_jn_info_by_jn_code_list', 'Customer_menual_orderController@get_jn_info_by_jn_code_list');
	Route::post('/get_customer_janinfo', 'Customer_menual_orderController@get_customer_janinfo');
	Route::post('/customer_manul_order_insert', 'Customer_menual_orderController@customer_manul_order_insert');

	//vendormanagementsheet

	Route::post('/vendormangementsheet', 'VendormanagementsheetController@index');
	Route::get('/vendormangementsheet', 'VendormanagementsheetController@index');
	Route::post('/vendormanagement_data_filter', 'VendormanagementsheetController@vendormanagement_data_filter');
	Route::post('/vendormanagement_data_filter_by_tonya', 'VendormanagementsheetController@vendormanagement_data_filter_by_tonya');
	Route::post('/get_vendor_payments_by_vendor_order_id', 'VendormanagementsheetController@get_vendor_payments_by_vendor_order_id');
	Route::post('/insert_vendor_payment', 'VendormanagementsheetController@insert_vendor_payment');
	Route::post('/delete_vendor_payment', 'VendormanagementsheetController@delete_vendor_payment');
	Route::post('/get_all_vendor_order_item_by_voucher', 'VendormanagementsheetController@get_all_vendor_order_item_by_voucher');
	Route::post('/vendor_payment_insert_update', 'VendormanagementsheetController@vendor_payment_insert_update');
	Route::post('/vendor_due_payment_insert_update', 'VendormanagementsheetController@vendor_due_payment_insert_update');
	Route::post('/item_return_to_tonya', 'HandyrController@item_return_to_tonya');

	//vendormanagementsheet

	//managementsheet report
	Route::post('/management_sheet_report_both', 'ReportGenerateController@management_sheet_report_both');
	Route::get('/management_sheet_pdf', 'ReportGenerateController@management_sheet_pdf');
	Route::get('/demo_management_sheet_report_both', 'ReportGenerateController@demo_management_sheet_report_both');
	Route::post('/get_invoice_detail', 'InvoiceController@index');
	Route::post('/insert_invoice_data', 'InvoiceController@store');
	Route::get('/vendor_order_detail/{vendor_id}/{invoice_date}/{vendor_invoice_id}', 'VendormanagementsheetController@vendor_order_detail');
	Route::get('/vendor_order_detail_by_tonya/{vendor_id}', 'VendormanagementsheetController@vendor_order_detail_by_tonya');
	Route::get('/shipment_order_detail/{customer_id}/{invoice_date}/{customer_invoice_id}', 'Shipment_mangementsheetController@customer_order_detail');
	Route::post('/check_is_reload_required_page', 'HomeController@check_is_reload_required_page');
    Route::post('/customer_due_payment_insert_update', 'Shipment_mangementsheetController@customer_due_payment_insert_update');
    Route::post('/customer_payment_insert_update', 'Shipment_mangementsheetController@customer_payment_insert_update');
    Route::get('/handy_order_shipment_scan_sohin', 'HandyrController@handy_order_shipment_scan_sohin');
    Route::get('/handy_stock_update_scan_product', 'HandyrController@handy_stock_update_scan_product');
    Route::get('/handy-stock-product-to-rack', 'HandyrController@handyStockProduct')->name('handy.stock.product');
    Route::post('/handy_shipment_product_by_rack_code', 'HandyrController@handy_shipment_product_by_rack_code');
    Route::post('/handy_stock_product_store_rack_code', 'HandyrController@handy_stock_product_store_rack_code');
    Route::post('/stock_inventory_update_rack', 'HandyrController@stock_inventory_update_rack');
    // oni 10.02.2021
    Route::post('/stock_inventory_update_rack_multiple', 'HandyrController@stock_inventory_update_rack_multiple');
    Route::get('/get_all_vendor_list_for_select2', 'VendorController@get_all_vendor_list_for_select2');
    Route::get('/get_all_customer_list_for_select2', 'VendorController@get_all_customer_list_for_select2');
    Route::post('/vendor_master_update_by_vendor_id', 'VendorController@vendor_master_update_by_vendor_id');
    Route::get('/haccu-list-by-tonya/{vendor_id?}', 'ReceiveorderController@haccuListBytonya')->name('hacchu.order.list');
    Route::get('/exportCsvByTonya/{vendor_id?}', 'ReceiveorderController@exportCsvByTonya');
    Route::get('/emailCsvByTonya/{vendor_id?}', 'ReceiveorderController@emailCsvByTonya');
	Route::get('/sendtomailportal/{vendor_id?}', 'ReceiveorderController@sendTomailportal');
	
	//customer manual order getCustomerOrderInfoByJan
	Route::post('/getCustomerOrderInfoByJan', 'Customer_menual_orderController@getCustomerOrderInfoByJan');
	Route::post('/kouri-order-info-for-handy', 'Customer_menual_orderController@getCustomerOrderInfoByJanForHandy');
	Route::post('/kouri-order-confirm-for-handy', 'Customer_menual_orderController@getCustomerOrderConfirmByJanForHandy');
	Route::post('/kouri_order_insert', 'Customer_menual_orderController@kouri_order_insert');


});

// Test for csrf token 419 redirect
Route::get('/test', function(){
	return view('backend.pages.test');
});

Route::post('/test_submit', function(Request $request){
	$a=$request->a;
	return $a;
});
