<?php

use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('positions')->insert([
            'name' =>'Student'
        ]
    );
         DB::table('positions')->insert([
            'name' =>'Teacher'
        ]
    );
         DB::table('positions')->insert([
            'name' =>'Staff'
        ]
     );
     DB::table('positions')->insert([
        'name' =>'Admin'
    ]
 );

  
    }
}