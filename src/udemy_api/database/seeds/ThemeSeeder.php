<?php

use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('themes')->insert([
            'name' =>'Session 1',
            'course_id'=>1
        ]
    );
         DB::table('themes')->insert([
            'name' =>'Session 2',
            'course_id'=>1

        ]
    );
        DB::table('themes')->insert([
            'name' =>'Session 3',
            'course_id'=>1

        ]
    );
    DB::table('themes')->insert([
        'name' =>'Session 4',
        'course_id'=>1

   ]
);
    }
}
