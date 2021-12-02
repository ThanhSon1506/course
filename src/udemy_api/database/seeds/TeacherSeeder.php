<?php

use Illuminate\Database\Seeder;
use App\Teacher;
class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::table('teachers')->insert([
        //     'firstname' =>'roller',
        //     'lastname' => 'david',
        //     'date' => now(), // password
        //     'phone' =>'0921100517',
        //     'literacy'=>'Bacherlor',
        //     'account_id'=>2,
        //     'status'=>true,
        // ]); 

        DB::table('teachers')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'date' => now(), // password
            'phone' =>'0921100517',
            'literacy'=>'Bacherlor',
            'account_id'=>11,
            'status'=>true,
        ]); 

        DB::table('teachers')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'date' => now(), // password
            'phone' =>'0921100517',
            'literacy'=>'Master',
            'account_id'=>12,
            'status'=>true,
        ]); 

        DB::table('teachers')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'date' => now(), // password
            'phone' =>'0921100517',
            'literacy'=>'Doctor',
            'account_id'=>13,
            'status'=>true,
        ]); DB::table('teachers')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'date' => now(), // password
            'phone' =>'0921100517',
            'literacy'=>'Bacherlor',
            'account_id'=>14,
            'status'=>true,
        ]); DB::table('teachers')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'date' => now(), // password
            'phone' =>'0921100517',
            'literacy'=>'Professor',
            'account_id'=>15,
            'status'=>true,
        ]); DB::table('teachers')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'date' => now(), // password
            'phone' =>'0921100517',
            'literacy'=>'Bacherlor',
            'account_id'=>16,
            'status'=>true,
        ]); DB::table('teachers')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'date' => now(), // password
            'phone' =>'0921100517',
            'literacy'=>'Bacherlor',
            'account_id'=>17,
            'status'=>true,
        ]); DB::table('teachers')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'date' => now(), // password
            'phone' =>'0921100517',
            'literacy'=>'Bacherlor',
            'account_id'=>18,
            'status'=>true,
        ]); DB::table('teachers')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'date' => now(), // password
            'phone' =>'0921100517',
            'literacy'=>'Bacherlor',
            'account_id'=>19,
            'status'=>true,
        ]); DB::table('teachers')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'date' => now(), // password
            'phone' =>'0921100517',
            'literacy'=>'Bacherlor',
            'account_id'=>20,
            'status'=>true,
        ]); 
        // $student=factory(Teacher::class, 20)->create();
    }
}
