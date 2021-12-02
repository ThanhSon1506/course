<?php

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'name' =>'Programming'
        ]
    );
         DB::table('categories')->insert([
             'name' =>'Programming language'
        ]
    );
        DB::table('categories')->insert([
             'name' =>'Web programming'
        ]
    );
    DB::table('categories')->insert([
        'name' =>'Android programming'
   ]
);
    }
}
