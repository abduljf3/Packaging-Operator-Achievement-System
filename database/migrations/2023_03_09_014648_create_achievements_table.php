<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->integer('shift');
            $table->integer('group');
            $table->integer('proses');
            $table->string('user_id');
            $table->string('user_product');
            $table->string('spring_lot');
            $table->string('product_lot');
            $table->string('total_lot');
            $table->string('qty');
            $table->string('remarks');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('achievements');
    }
};
