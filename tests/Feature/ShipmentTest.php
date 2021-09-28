<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use App\customer;
use Illuminate\Http\UploadedFile;

class ShipmentTest extends TestCase
{
    use WithoutMiddleware;
    
    private $shipment_csv_insert_success;
    private $shipment_csv_insert_invalid;
    private $customer_partner_code;
    private $customer_array;
    private $all_message;
    /**
     * Act as a constructor
     *
     * @return initialized all variable
     */
    protected function setUp()
    {
        parent::setUp();

        $this->shipment_csv_insert_success = 'Shipment received';
        $this->shipment_csv_insert_invalid = 'Partner code invalid';
        $this->customer_partner_code = 12345;
        $this->customer_array = array(
            'name'=>'Test customer',
            'partner_code'=>$this->customer_partner_code,
            'phone'=>1234567890
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
    
    public function test_shipment_csv_insert_success(){
        if(customer::where('partner_code',$this->customer_partner_code)->exists()){
            customer::where('partner_code',$this->customer_partner_code)->delete();
        }
        
        customer::insert($this->customer_array);
        
        $fileName = 'order.csv';
        $filePath =  storage_path(). '/Csv_for_test/';

        $response = $this->json('POST', '/shipment_csv_insert', [
            'file' => $this->getTestingFile($fileName, $filePath, 'text/csv', 2100)
             ]);
        \Log::info('Test Start');
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->shipment_csv_insert_success
            ]);
            \Log::info('Test End'); 
    }
    public function test_shipment_csv_partner_code_invalid(){
        if(customer::where('partner_code',$this->customer_partner_code)->exists()){
            customer::where('partner_code',$this->customer_partner_code)->delete();
        }
        
        customer::insert($this->customer_array);
        $fileName = 'order_invalid.csv';
        $filePath =  storage_path(). '/Csv_for_test/';

        $response = $this->json('POST', '/shipment_csv_insert', [
            'file' => $this->getTestingFile($fileName, $filePath, 'text/csv', 2100)
             ]);
        \Log::info('Test Start');
        $response
            ->assertStatus(200)
            ->assertExactJson([
                $this->all_message => $this->shipment_csv_insert_invalid
            ]);
            \Log::info('Test End'); 
    }
    public static function getTestingFile($fileName, $stubDirPath, $mimeType = null, $size = null)
{
    $file =  $stubDirPath . $fileName;

    return new UploadedFile($file, $fileName, $mimeType, $size, $error = null, $testMode = true);
}
}
