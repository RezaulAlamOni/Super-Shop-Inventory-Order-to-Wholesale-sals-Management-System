<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\vendor_item;
class VendorItemTest extends TestCase
{
    use WithoutMiddleware;
    private $vendor_item_insert_success_message;
    private $vendor_item_insert_vendor_id_invalid;
    private $vendor_item_insert_jan_code_invalid;
    private $vendor_item_insert_jan_name_invalid;
    private $vendor_item_insert_case_inputs_invalid;
    private $vendor_item_insert_ball_inputs_invalid;
    private $vendor_item_insert_price_invalid;
    private $vendor_item_insert_vendor_jan_duplicated;
    private $vendor_item_update_success_message;
    private $vendor_item_delete_success_message;

    private $vendor_item_jan_code;

    private $vendor_item_data;
    private $all_message;
    /**
     * Act as a constructor
     *
     * @return initialized all variable
     */
    protected function setUp()
    {
        parent::setUp();

        $this->vendor_item_insert_success_message = 'insert_success';
        $this->vendor_item_insert_vendor_id_invalid = 'Vendor id is required';
        $this->vendor_item_insert_jan_code_invalid = 'Jan code is required';
        $this->vendor_item_insert_jan_name_invalid = 'Jan Name is required';
        $this->vendor_item_insert_case_inputs_invalid = 'Case inputs is required';
        $this->vendor_item_insert_ball_inputs_invalid = 'Ball inputs is required';
        $this->vendor_item_insert_price_invalid = 'Vendor cost price is required';
        $this->vendor_item_insert_vendor_jan_duplicated = 'Jan code already exists please try an unique code';
        $this->vendor_item_update_success_message = 'update_success';
        $this->vendor_item_delete_success_message = 'delete_success';

        $this->vendor_item_jan_code=time();

        $this->vendor_item_data = array(
            
                'vendor_id'=>'110'.rand(1,30),
                'jan' => '490837486'.rand(1,100).rand(101,1000),
                'cost_price' => '100',
                "start_date"=>date('Y-m-d H:i:s'),
                "end_date"=>date('Y-m-d H:i:s'),
            
        );
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
    public function test_vendor_item_insert_success(){
        $response = $this->json('POST', '/add_vendor_item', ['vendor_id'=>1,'jan_code' => $this->vendor_item_jan_code, 'item_name' => 'Test', 'case_qty' => '10','ball_qty' => '20','price' => '100','vendor_item_id'=>null]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_item_insert_success_message,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_item_insert_vendor_id_invalid(){
        $response = $this->json('POST', '/add_vendor_item', ['vendor_id'=>null,'jan_code' => $this->vendor_item_jan_code, 'item_name' => 'Test', 'case_qty' => '10','ball_qty' => '20','price' => '100','vendor_item_id'=>null]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_item_insert_vendor_id_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_item_insert_jan_code_invalid(){
        $response = $this->json('POST', '/add_vendor_item', ['vendor_id'=>1,'jan_code' => '', 'item_name' => 'Test', 'case_qty' => '10','ball_qty' => '20','price' => '100','vendor_item_id'=>null]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_item_insert_jan_code_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_item_insert_jan_name_invalid(){
        $response = $this->json('POST', '/add_vendor_item', ['vendor_id'=>1,'jan_code' => $this->vendor_item_jan_code, 'item_name' => '', 'case_qty' => '10','ball_qty' => '20','price' => '100','vendor_item_id'=>null]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_item_insert_jan_name_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_item_insert_case_inputs_invalid(){
        $response = $this->json('POST', '/add_vendor_item', ['vendor_id'=>1,'jan_code' => $this->vendor_item_jan_code, 'item_name' => 'Test', 'case_qty' => '','ball_qty' => '20','price' => '100','vendor_item_id'=>null]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_item_insert_case_inputs_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_item_insert_ball_inputs_invalid(){
        $response = $this->json('POST', '/add_vendor_item', ['vendor_id'=>1,'jan_code' => $this->vendor_item_jan_code, 'item_name' => 'Test', 'case_qty' => '10','ball_qty' => '','price' => '100','vendor_item_id'=>null]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_item_insert_ball_inputs_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_item_insert_price_invalid(){
        $response = $this->json('POST', '/add_vendor_item', ['vendor_id'=>1,'jan_code' => $this->vendor_item_jan_code, 'item_name' => 'Test', 'case_qty' => '10','ball_qty' => '20','price' => '','vendor_item_id'=>null]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_item_insert_price_invalid,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_item_insert_jan_code_duplicated(){
        vendor_item::insert($this->vendor_item_data);
        $last_data=vendor_item::latest()->first();
        $response = $this->json('POST', '/add_vendor_item', ['vendor_id'=>$last_data['vendor_id'],'jan_code' => $last_data['jan'], 'item_name' => 'Test', 'case_qty' => '10','ball_qty' => '20','price' => '100','vendor_item_id'=>null]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_item_insert_vendor_jan_duplicated,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_item_update_success(){
        $response = $this->json('POST', '/add_vendor_item', ['vendor_id'=>1,'jan_code' => $this->vendor_item_jan_code, 'item_name' => 'Test', 'case_qty' => '10','ball_qty' => '20','price' => '200','vendor_item_id'=>1]);
        \Log::info('Test Start');
        // \Log::info($response);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_item_update_success_message,
            ]);
            \Log::info('Test End');
    }
    public function test_vendor_item_delete_success(){
        $vendor_item_last_id = vendor_item::insertGetId($this->vendor_item_data);
        $response = $this->json('POST', '/vendor_item_delete', ['vendor_item_id'=>$vendor_item_last_id]);
        \Log::info('Test Start');
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->vendor_item_delete_success_message,
            ]);
            \Log::info('Test End');
    }
}
