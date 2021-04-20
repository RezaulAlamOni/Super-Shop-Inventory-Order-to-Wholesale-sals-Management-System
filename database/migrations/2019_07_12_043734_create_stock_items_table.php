<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_items', function (Blueprint $table) {
            $table->increments('stock_item_id')->comment('Stock order Id');
            $table->integer('vendor_id')->comment('Vendor Id');
            $table->integer('vendor_item_id')->comment('Vendor item Id');
            $table->integer('ware_house_id')->nullable()->comment('Wear house Id of wear_houses table');
            $table->string('rack_number',20)->comment('Rack number');
            $table->string('temp_rack_number')->nullable()->comment('Temp Rack number');
            $table->integer('case_quantity')->comment('Case quantity');
            $table->integer('ball_quantity')->comment('Ball quantity');
            $table->integer('unit_quantity')->comment('Unit quantity');
            $table->dateTime('expiration_date')->nullable()->comment('Expiration date');
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
        Schema::dropIfExists('stock_items');
    }
}
