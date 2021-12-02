<?php

use Illuminate\Database\Seeder;
class AcountSeeder extends Seeder
{
    public function run()
    {   
        $acount = factory(App\Acount::class, 20)->create();
    }
}