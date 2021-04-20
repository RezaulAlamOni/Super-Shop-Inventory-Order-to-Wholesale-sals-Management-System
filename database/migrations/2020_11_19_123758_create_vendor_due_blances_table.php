<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendorDueBlancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_due_blances', function (Blueprint $table) {
            $table->increments('vendor_due_blance_id')->comment('vendor invoice id');
            $table->integer('vendor_id')->comment('Vendor Id');
            $table->integer('opening_due_amount')->default('0')->comment('opening due amount');
            $table->integer('payment_due_amount')->default('0')->comment('payemnt due amount');
            $table->integer('orginal_due_amount')->default('0')->comment('orginal due amount');
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
        Schema::dropIfExists('vendor_due_blances');
    }
}
