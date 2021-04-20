<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Traits\CanAssertFlash;
use App\vendor;

class VendorTest extends TestCase
{
    use WithoutMiddleware;
    // use RefreshDatabase;
    use CanAssertFlash;
    
    private $all_message;
    private $vendor_insert_success_message;
    private $vendor_insert_name_invalid;
    private $vendor_insert_code_invalid;
    private $vendor_insert_phone_invalid;
    private $vendor_code_exists;
    private $vendor_update_success;
    private $vendor_delete_success;


    private $vendor_partner_code;
    private $vendor_update_partner_code;
    private $vendor_info;
    /**
     * Act as a constructor
     *
     * @return initialized all variable
     */
    protected function setUp()
    {
        parent::setUp();

        $this->vendor_insert_success_message = 'insert_success';
        $this->vendor_insert_name_invalid = 'name_required';
        $this->vendor_insert_code_invalid = 'vendor_code_required';
        $this->vendor_insert_phone_invalid = 'phone_required';
        $this->vendor_code_exists = 'code_exists';
        $this->vendor_update_success = 'update_success';
        $this->vendor_delete_success = 'delete_success';
        $this->all_message = 'message';



        $this->vendor_partner_code='123746786534';
        $this->vendor_update_partner_code = '786534123746';

        $this->vendor_info=array(
            "name"=>'Test vendor',
            "partner_code"=>$this->vendor_partner_code,
            "phone"=>'123456789',
        );

        

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
     /**
     * Update user last name length invalid test.
     *
     * @return void
     */
    public function test_vendor_insert_success(){
        if(vendor::where('partner_code',$this->vendor_partner_code)->exists()){
            vendor::where('partner_code',$this->vendor_partner_code)->delete();
        }
        
        $response = $this->json('POST', '/vendor_add_edit', ['vendor_id'=>null,'vendor_name' => 'Test vendor', 'vendor_code' => $this->vendor_partner_code, 'vendor_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_insert_success_message,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_name_invalid(){
        
        $response = $this->json('POST', '/vendor_add_edit', [
            'vendor_id'=>null,
            'vendor_name' => '', 
            'vendor_code' => $this->vendor_partner_code,
            'vendor_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_insert_name_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_code_invalid(){
        
        $response = $this->json('POST', '/vendor_add_edit', [
            'vendor_id'=>null,
            'vendor_name' => 'Test',
            'vendor_code' => '',
            'vendor_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_insert_code_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_phone_invalid(){
        
        $response = $this->json('POST', '/vendor_add_edit', [
            'vendor_id'=>null,
            'vendor_name' => 'Test',
            'vendor_code' => $this->vendor_partner_code,
            'vendor_phone' => '']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_insert_phone_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_code_exists(){
        
        //vendor::insert($this->vendor_info);
        $last_data=vendor::latest()->first();
        $this->vendor_partner_code=$last_data['partner_code'];
        $response = $this->json('POST', '/vendor_add_edit', [
            'vendor_id'=>null,
            'vendor_name' => 'Test',
            'vendor_code' => $this->vendor_partner_code,
            'vendor_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_code_exists,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_update_code_exists(){
        

        // $previus_last_data=vendor::latest()->first();
        $previus_last_data = vendor::orderBy('vendor_id', 'DESC')->first();
        $new_partner_code=$previus_last_data['partner_code'];

        $new_vendor = factory(\App\vendor::class)->create();
        $new_vendor_id=$new_vendor->vendor_id;

        // vendor::insert($this->vendor_info);
        // $last_data=vendor::latest()->first();
        // $this->vendor_partner_code=$last_data['partner_code'];
        $response = $this->json('POST', '/vendor_add_edit', [
            'vendor_id'=>$new_vendor_id,
            'vendor_name' => 'Test',
            'vendor_code' => $new_partner_code,
            'vendor_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_code_exists,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_update_success(){
        if(vendor::where('partner_code',$this->vendor_partner_code)->exists()){
            vendor::where('partner_code',$this->vendor_partner_code)->delete();
        }

        if(vendor::where('partner_code',$this->vendor_update_partner_code)->exists()){
            vendor::where('partner_code',$this->vendor_update_partner_code)->delete();
        }
        
        vendor::insert($this->vendor_info);
        $last_data=vendor::latest()->first();
        $new_vendor_id=$last_data['vendor_id'];
        \Log::info('Vendor_id='.$new_vendor_id);
        
        $response = $this->json('POST', '/vendor_add_edit', [
            'vendor_id'=>$new_vendor_id,
            'vendor_name' => 'Test update',
             'vendor_code' => $this->vendor_update_partner_code, 
             'vendor_phone' => '1235784561']);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_update_success,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_delete_success(){
        
        // $vendor_last_id = vendor::insertGetId($this->vendor_info);
        $previus_last_data = vendor::orderBy('vendor_id', 'DESC')->first();
        $vendor_last_id=$previus_last_data['vendor_id'];
        $response = $this->json('POST', '/vendor_delete', ['vendor_id'=>$vendor_last_id]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_delete_success,
            ]);
            \Log::info('Test End');
    }
}
