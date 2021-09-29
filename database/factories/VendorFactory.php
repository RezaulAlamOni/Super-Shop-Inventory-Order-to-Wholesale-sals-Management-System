<?php

use Faker\Generator as Faker;

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

$factory->define(App\vendor::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'partner_code' => '1334566'.rand(1,100).rand(101,1000),
        'phone' => '0100000000',
    ];
});
