<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
          Schema::create('questions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('exam_id');
            $table->text('question');
            $table->text('answer_A');
            $table->text('answer_B');
            $table->text('answer_C');
            $table->text('answer_D');
            $table->string('answer_correct');
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
        //
    }
}
