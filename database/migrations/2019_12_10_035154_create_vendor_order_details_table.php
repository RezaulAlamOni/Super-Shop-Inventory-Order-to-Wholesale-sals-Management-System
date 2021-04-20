<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendorOrderDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_order_details', function (Blueprint $table) {
            $table->increments('vendor_order_detail_id')->comment('Vendor order detail Id');
            $table->integer('vendor_order_id')->comment('Vendor order Id');
            $table->integer('vendor_item_id')->comment('Vendor item Id');
            $table->decimal('unit_cost_price',9,2)->comment('unit Cost Price');
            $table->enum('inputs', ['ケース', 'ボール','バラ'])->default('ケース')->comment('Inputs');
            $table->integer('quantity')->comment('Quantity');
            $table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('Time of creation');
			$table->dateTime('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'))->comment('Time of Update');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendor_order_details');
    }
}
