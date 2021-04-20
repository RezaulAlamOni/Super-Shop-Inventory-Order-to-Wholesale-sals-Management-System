<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerOrderDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_order_details', function (Blueprint $table) {
            $table->increments('customer_order_detail_id')->comment('Customer order detail Id');
            $table->integer('customer_order_id')->comment('Customer item Id');
            $table->integer('customer_item_id')->comment('Customer item Id');
            $table->string('jan',15)->comment('Jan');
            $table->enum('inputs', ['ケース', 'ボール','バラ'])->default('ケース')->comment('Inputs');
            $table->integer('quantity')->comment('Quantity');
            $table->mediumInteger('cost_price')->nullable()->comment('Cost Price');
            $table->mediumInteger('selling_price')->nullable()->comment('Selling Price');
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
        Schema::dropIfExists('customer_order_details');
    }
}
