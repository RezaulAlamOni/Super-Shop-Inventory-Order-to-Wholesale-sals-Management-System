<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jans', function (Blueprint $table) {
            $table->increments('jan_id')->comment('Jan Id');
            $table->integer('maker_id')->nullable()->comment('Maker Id');
            $table->string('jan',15)->comment('Jan');
            $table->string('name',100)->nullable()->comment('Jan Name');
            $table->tinyInteger('major_category')->nullable()->comment('Major Category');
            $table->tinyInteger('sub_major_category')->nullable()->comment('Sub Major Category');
            $table->tinyInteger('minor_category')->nullable()->comment('Minor Category');
            $table->smallInteger('case_inputs')->default(0)->comment('Case Inputs');
            $table->smallInteger('ball_inputs')->default(0)->comment('Ball Inputs');
            $table->dateTime('jan_start_date')->nullable()->comment('Jan Start Date');
            $table->dateTime('jan_end_date')->nullable()->comment('Jan End Date');
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
        Schema::dropIfExists('jans');
    }
}
