<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerDueBlancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_due_blances', function (Blueprint $table) {
            $table->increments('customer_due_blance_id')->comment('customer invoice id');
            $table->integer('customer_id')->comment('Customer Id');
            $table->integer('opening_due_amount')->nullable()->comment('opening due amount');
            $table->integer('payment_due_amount')->nullable()->comment('opening due amount');
            $table->integer('orginal_due_amount')->nullable()->comment('orginal due amount');
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
        Schema::dropIfExists('customer_due_blances');
    }
}
