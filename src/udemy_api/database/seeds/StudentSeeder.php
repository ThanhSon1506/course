<?php

use Illuminate\Database\Seeder;
use App\Student;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('students')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'date' => now(), // password
            'phone' =>'0921100517',
            'address'=>'Unit 7, District 3, Long Toan Ward, Ba Ria City',
            'account_id'=>1,
            'zipcode'=>'123456',
            'status'=>true,
        ]); 
    
        DB::table('students')->insert([
            'firstname' =>'roller',
            'lastname' => 'david',
            'date' => now(), // password
            'phone' =>'0921100517',
            'address'=>'Unit 7, District 3, Long Toan Ward, Ba Ria City',
            'account_id'=>3,
            'zipcode'=>'123456',
            'status'=>true,
        ]);     DB::table('students')->insert([
            'firstname' =>'roller',
            'lastname' => 'david',
            'date' => now(), // password
            'phone' =>'0921100517',
            'address'=>'Unit 7, District 3, Long Toan Ward, Ba Ria City',
            'account_id'=>4,
            'zipcode'=>'123456',
            'status'=>true,
        ]);     DB::table('students')->insert([
            'firstname' =>'roller',
            'lastname' => 'david',
            'date' => now(), // password
            'phone' =>'0921100517',
            'address'=>'Unit 7, District 3, Long Toan Ward, Ba Ria City',
            'account_id'=>5,
            'zipcode'=>'123456',
            'status'=>true,
        ]);     DB::table('students')->insert([
            'firstname' =>'roller',
            'lastname' => 'david',
            'date' => now(), // password
            'phone' =>'0921100517',
            'address'=>'Unit 7, District 3, Long Toan Ward, Ba Ria City',
            'account_id'=>6,
            'zipcode'=>'123456',
            'status'=>true,
        ]);     DB::table('students')->insert([
            'firstname' =>'roller',
            'lastname' => 'david',
            'date' => now(), // password
            'phone' =>'0921100517',
            'address'=>'Unit 7, District 3, Long Toan Ward, Ba Ria City',
            'account_id'=>7,
            'zipcode'=>'123456',
            'status'=>true,
        ]);     DB::table('students')->insert([
            'firstname' =>'roller',
            'lastname' => 'david',
            'date' => now(), // password
            'phone' =>'0921100517',
            'address'=>'Unit 7, District 3, Long Toan Ward, Ba Ria City',
            'account_id'=>8,
            'zipcode'=>'123456',
            'status'=>true,
        ]);     DB::table('students')->insert([
            'firstname' =>'roller',
            'lastname' => 'david',
            'date' => now(), // password
            'phone' =>'0921100517',
            'address'=>'Unit 7, District 3, Long Toan Ward, Ba Ria City',
            'account_id'=>9,
            'zipcode'=>'123456',
            'status'=>true,
        ]);     DB::table('students')->insert([
            'firstname' =>'roller',
            'lastname' => 'david',
            'date' => now(), // password
            'phone' =>'0921100517',
            'address'=>'Unit 7, District 3, Long Toan Ward, Ba Ria City',
            'account_id'=>10,
            'zipcode'=>'123456',
            'status'=>true,
        ]); 
        // $student=factory(Student::class, 20)->create();
    }
}
