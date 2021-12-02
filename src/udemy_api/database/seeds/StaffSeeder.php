<?php

use Illuminate\Database\Seeder;
use App\Staff;
class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('staffs')->insert([
            'firstname' =>'son',
            'lastname' => 'thanh',
            'phone' =>'0921100517',
            'address'=>'Unit 7, District 3, Long Toan Ward, Ba Ria City',
            'account_id'=>3,
            'status'=>true,
            'position'=>'accountant'

        ]); 
        DB::table('staffs')->insert([
            'firstname' =>'roller',
            'lastname' => 'david',
            'phone' =>'0921100517',
            'address'=>'Unit 7, District 3, Long Toan Ward, Ba Ria City',
            'account_id'=>2,
            'status'=>true,
            'position'=>'accountant'

        ]); 
        $staff=factory(Staff::class, 20)->create();
    }
}