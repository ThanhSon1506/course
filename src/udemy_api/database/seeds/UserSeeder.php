<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' =>'dothanhson',
            'email' => 'dothanhson@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('123456789'), // password
            'remember_token' => Str::random(10),
            'is_active'=>1,
            'type_id'=>4,
        ]);
        DB::table('users')->insert([
            'username' =>'dothanhson',
            'email' => 'coderthanhson@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('123456789'), // password
            'remember_token' => Str::random(10),
            'is_active'=>1,
            'type_id'=>1,
        ]); 
       
        for($i=2;$i<10;$i++){
            DB::table('users')->insert([
                'username' =>'user'.$i,
                'email' => 'user'.$i.'@gmail.com',
                'email_verified_at' => now(),
                'password' => bcrypt('123456789'), // password
                'remember_token' => Str::random(10),
                'is_active'=>1,
                'type_id'=>1,
            ]);
        }
        for($i=10;$i<20;$i++){
            DB::table('users')->insert([
                'username' =>'user'.$i,
                'email' => 'user'.$i.'@gmail.com',
                'email_verified_at' => now(),
                'password' => bcrypt('123456789'), // password
                'remember_token' => Str::random(10),
                'is_active'=>1,
                'type_id'=>2,
            ]);
        }
        //  $user = factory(App\User::class, 20)->create();
        
    }
}