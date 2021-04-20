<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\vendor_item;
use App\vendor_order;

class ReceiveOrderTest extends TestCase
{
    use WithoutMiddleware;
    
    private $update_order_info_by_id_success;
    private $vendor_order_insert;
    private $all_message;
    /**
     * Act as a constructor
     *
     * @return initialized all variable
     */
    protected function setUp()
    {
        parent::setUp();

        $this->update_order_info_by_id_success = 'update_success';
        $this->vendor_order_insert = 'insert_success';
        $this->all_message = 'message';


    }
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/');

        $response->assertStatus(302);
    }
    public function test_update_order_info_by_id(){
        // if(vendor::where('partner_code',$this->vendor_partner_code)->exists()){
        //     vendor::where('partner_code',$this->vendor_partner_code)->delete();
        // }

        // if(vendor::where('partner_code',$this->vendor_update_partner_code)->exists()){
        //     vendor::where('partner_code',$this->vendor_update_partner_code)->delete();
        // }
        
        // vendor::insert($this->vendor_info);
        $last_data=vendor_item::latest()->first();
        $vendor_item_id=$last_data['vendor_item_id'];
        // \Log::info('Vendor_id='.$new_vendor_id);
        // $vendor_item_id=null;
       
        $response = $this->json('POST', '/update_order_info_by_id', [
            'row_id' => $vendor_item_id,
            'order_point_unit'=>'ケース',
            'order_point_quantity'=>10,
            'order_lot_unit'=>'ケース',
            'order_lot_quantity'=>10,
             ]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->update_order_info_by_id_success,
            ]);
            \Log::info('Test End');
       
        
    }
    public function test_vendor_order_insert(){
       
        $last_data=vendor_item::latest()->first();
        $vendor_item_id=$last_data['vendor_item_id'];
        \Log::info('Vendor Id='.$last_data['vendor_id']);
        $vendor_order_info=vendor_order::where('vendor_item_id',$vendor_item_id)->orderBy('vendor_order_id','DESC')->first();
        \Log::info('vendor_order_info ='.json_encode($vendor_order_info));

        if(empty($vendor_order_info)){
                $items=
                    [
                        'vendor_item_id' => $vendor_item_id,
                        'vendor_id'=>$last_data['vendor_id'],
                        'unit_type'=>'ケース',
                        'voucher_numer'=>rand(1,1000),
                        'destination'=>0,
                        'source'=>0,
                        'quantity'=>10,  
                    ];
            }else{
                $items=
                    [
                        'vendor_item_id' => $vendor_item_id,
                        'vendor_id'=>$vendor_order_info['vendor_id'],
                        'unit_type'=>$vendor_order_info['inputs'],
                        'shipment_date'=>$vendor_order_info['shipment_date'],
                        'voucher_numer'=>$vendor_order_info['voucher_number'],
                        'destination'=>0,
                        'source'=>0,
                        'quantity'=>10,  
                    ]; 
            }
            \Log::info('Array vendor id = '.$items['vendor_id']);
        $response = $this->json('POST', '/vendor_order_insert',$items);
        \Log::info('Test Start');
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_order_insert,
            ]);
            \Log::info('Test End');
       
        
    }
}
