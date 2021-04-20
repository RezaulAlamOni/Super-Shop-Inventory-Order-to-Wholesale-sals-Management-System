<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomersReceivablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers_receivables', function (Blueprint $table) {
            $table->increments('customers_receivable_id')->comment('Customer receivable ID');
            $table->integer('customer_id')->default(0)->comment('Customer Id');
            $table->integer('receivable')->default(0)->comment('Receivable');
            $table->date('last_payment_date')->comment('Last payment date');
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
        Schema::dropIfExists('customers_receivables');
    }
}
