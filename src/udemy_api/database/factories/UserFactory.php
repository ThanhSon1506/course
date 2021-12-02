<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'username' => $faker->username,
        'email' => $faker->username.'@gmail.com',
        'email_verified_at' => now(),
        'password' => bcrypt('123456789'), // password
        'remember_token' => Str::random(10),
        'is_active'=>$faker->numberBetween(0,1),
        'type_id'=>$faker->numberBetween(1,2),
    ];
});