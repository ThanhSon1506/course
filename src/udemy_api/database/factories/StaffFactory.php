<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Staff;
use Faker\Generator as Faker;
$factory->define(Staff::class,function (Faker $faker) {
    return [
        'firstname'=>$faker->firstname,
        'lastname'=>$faker->lastname,
        'position'=>$faker->title,
        'phone'=>$faker->numerify('###-###-####'),
        'address'=>$faker->address,
        'account_id'=>$faker->numberBetween(1,20),
        'status'=>$faker->numberBetween(0,1),
    ];
});
