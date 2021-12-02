<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Student;
use Faker\Generator as Faker;

$factory->define(Student::class, function (Faker $faker) {
    return [
        'firstname'=>$faker->firstname,
        'lastname'=>$faker->lastname,
        'date'=>$faker->date,
        'phone'=>$faker->numerify('###-###-####'),
        'address'=>$faker->address,
        'account_id'=>$faker->unique()->numberBetween(1,20),
        'zipcode'=>$faker->numerify('######'),
        'status'=>$faker->numberBetween(0,1),
    ];
});
