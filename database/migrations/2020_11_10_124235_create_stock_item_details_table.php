<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStockItemDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_item_details', function (Blueprint $table) {
            
            $table->increments('stock_item_detail_id')->comment('Stock item detail Id');
            $table->integer('stock_item_id')->unsigned()->comment('stock_item_id');
            $table->enum('inc_dec_status',['0','1'])->default('0')->comment('Status');
            $table->enum('inc_dec_inputs', ['ケース', 'ボール','バラ'])->default('ケース')->comment('Inputs');
            $table->integer('actual_quantity')->comment('Quantity');
            $table->integer('inc_dec_quantity')->comment('Quantity');
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
        Schema::dropIfExists('stock_item_details');
    }
}
