<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->increments('invoice_id')->comment('invoice Id');
            $table->string('company_name',80)->comment('Company Name');
            $table->string('bank_name',80)->comment('Bank Name');
            $table->string('bank_branch',80)->comment('Bank branch');
            $table->string('bank_account_number',20)->comment('Bank account Number');
            $table->string('bank_account_name',40)->comment('Bank account Name');
            $table->string('address',200)->comment('Address');
            $table->string('postal_code',8)->comment('Postal code');
            $table->string('tel',20)->comment('Tel');
            $table->string('fax',20)->comment('Fax');
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
        Schema::dropIfExists('invoices');
    }
}
