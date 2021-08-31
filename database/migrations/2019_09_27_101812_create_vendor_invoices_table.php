<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVendorInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_invoices', function (Blueprint $table) {
            $table->increments('vendor_invoice_id')->comment('vendor invoice id');
            $table->integer('vendor_id')->comment('vendor Id');
            $table->integer('vendor_arrival_id')->unsigned()->comment('vendor arrival Id');
            $table->integer('voucher_number')->comment('Customer Order Id');
            $table->decimal('invoice_amount',9,2)->nullable()->comment('invoice amount');
            $table->date('payment_due_date')->nullable()->comment('payment due date');
            $table->date('invoice_date')->nullable()->comment('invoice date');
            $table->enum('status', ['未支払', '一部支払','支払済','協議中'])->default('未支払')->comment('status');
            $table->timestamps();
           // $table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('Time of creation');
		//	$table->dateTime('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'))->comment('Time of Update');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendor_invoices');
    }
}
