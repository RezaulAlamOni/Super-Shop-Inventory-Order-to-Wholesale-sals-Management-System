<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCurrentDatetimeCreatedAtInAllTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vendor_items', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('jans', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('stock_items', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('customers', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('vendors', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('customers_receivables', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('customer_due_blances', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('customer_invoices', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('customer_items', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('customer_orders', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('customer_order_details', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('customer_payments', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('customer_shipments', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('customer_shops', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('invoices', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('in_companies', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('makers', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('stock_item_details', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('vendor_arrivals', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('vendor_due_blances', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('vendor_invoices', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('vendor_orders', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('vendor_order_details', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('vendor_payments', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
        Schema::table('ware_houses', function (Blueprint $table) {
            $table->dateTime('created_at')->default('CURRENT_TIMESTAMP')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       
    }
}
