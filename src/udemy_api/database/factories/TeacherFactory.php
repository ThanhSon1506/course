<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Teacher;
use Faker\Generator as Faker;

$factory->define(Teacher::class, function (Faker $faker) {
    return [
        'firstname'=>$faker->firstname,
        'lastname'=>$faker->lastname,
        'date'=>$faker->date,
        'phone'=>$faker->numerify('###-###-####'),
        // 'photo'=>'5-895356920-1631084654.jpg',
        'literacy'=>$faker->title,
        'account_id'=>$faker->numberBetween(1,20),
        'status'=>$faker->numberBetween(0,1),
    ];
});
