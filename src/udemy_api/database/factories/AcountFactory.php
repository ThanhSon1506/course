<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(App\Acount::class, function (Faker $faker) {
    return [
        'username' => $faker->username,
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'is_active'=>$faker->randomNumber(1, true),
        'type_id'=>$faker->randomNumber(1, true),
    ];
});