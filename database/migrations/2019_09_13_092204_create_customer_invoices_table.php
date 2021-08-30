<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCustomerInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_invoices', function (Blueprint $table) {
            $table->increments('customer_invoice_id')->comment('customer invoice id');
            $table->integer('customer_id')->comment('Customer Id');
            $table->integer('customer_shipment_id')->comment('customer shipment Id');
            $table->string('shipment_number',100)->comment('Customer shipment number');
            $table->integer('invoice_amount')->nullable()->comment('invoice amount');
            $table->date('invoice_date')->nullable()->comment('invoice date');
            $table->enum('status', ['未請求', '請求中','支払済'])->default('未請求')->comment('status');
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
        Schema::dropIfExists('customer_invoices');
    }
}
