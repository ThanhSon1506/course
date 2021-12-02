<?php

use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('languages')->insert([
            'name' =>'English'
        ]
    );
         DB::table('languages')->insert([
             'name' =>'Hindi'
        ]
    );
        DB::table('languages')->insert([
             'name' =>'Spanish'
        ]
    );
    DB::table('languages')->insert([
        'name' =>'French'
   ]
);

{
    DB::table('languages')->insert([
        'name' =>'Arabic (Standard))'
    ]
);
     DB::table('languages')->insert([
         'name' =>'Bengali'
    ]
);
    DB::table('languages')->insert([
         'name' =>'Russian'
    ]
);
DB::table('languages')->insert([
    'name' =>'Portuguese'
]
);
    }
}

}