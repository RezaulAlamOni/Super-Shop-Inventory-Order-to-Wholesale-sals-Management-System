<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendorOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_orders', function (Blueprint $table) {
            $table->increments('vendor_order_id')->comment('Vendor order Id');
            $table->integer('vendor_id')->comment('Vendor Id');
            $table->integer('vendor_item_id')->comment('Vendor item Id');
            $table->integer('destination')->comment('Destination');
            $table->integer('source')->comment('Source');
            $table->string('voucher_number',20)->nullable()->comment('Voucher number');
            
            $table->decimal('unit_cost_price',9,2)->comment('unit Cost Price');
            $table->enum('inputs', ['ケース', 'ボール','バラ'])->default('ケース')->comment('Inputs');
            $table->integer('order_case_quantity')->nullable()->comment('Case quantity');
            $table->integer('order_ball_quantity')->nullable()->comment('Ball quantity');
            $table->integer('order_unit_quantity')->nullable()->comment('Unit quantity');
            $table->integer('quantity')->comment('order total Quantity');
            $table->enum('status',['未入荷','入荷済み'])->default('未入荷')->comment('Status');
            $table->dateTime('order_date')->nullable()->comment('Order date');
            $table->dateTime('shipment_date')->nullable()->comment('Shipment date');
            $table->timestamps();
            //$table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('Time of creation');
			//$table->dateTime('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'))->comment('Time of Update');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendor_orders');
    }
}
