<?php

use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('courses')->insert([
            'name' =>'Programming with Scratch 3.0 Advanced',
            'category_id'=>1,
            'level_id'=>1,
            'language_id'=>1,
            'teacher_id'=>1,
   
            'photo'=>'5-1988811946-1631100013.jpg',
            'status'=>1,
            'price'=>34,
        ]
         );

         DB::table('courses')->insert([
            'name' =>'Python Programming From Zero - Hero',
            'category_id'=>1,
            'level_id'=>1,
            'language_id'=>1,
            'teacher_id'=>1,
   
            
            'photo'=>'0-1259796928-1631098517.jpg',
            'status'=>1,
            'price'=>25,
        ]
         );
         
         DB::table('courses')->insert([
            'name' =>'Real-time, high-speed Web programming with NodeJS',
            'category_id'=>1,
            'level_id'=>1,
            'language_id'=>1,
            'teacher_id'=>1,
 
  
            
            'photo'=>'8-1891409160-1636209011.jpg',
            
            'status'=>1,
            'price'=>30,
        ]
         ); 

         DB::table('courses')->insert([
            'name' =>'Swift iOS Programming',
            'category_id'=>2,
            'level_id'=>1,
            'language_id'=>3,
            'teacher_id'=>1,
    
            
            'photo'=>'13-52403207-1631099033.jpg',
    
            'status'=>1,
            'price'=>35,
        ]
         );  

         DB::table('courses')->insert([
            'name' =>'Programming FULLSTACK with ANGULAR - PHP - MYSQL',
            'category_id'=>2,
            'level_id'=>1,
            'language_id'=>2,
            'teacher_id'=>1,

            
            'photo'=>'3-230838264-1637072796.jpg',
    
            'status'=>1,
            'price'=>36,
        ]
         );
         
         DB::table('courses')->insert([
            'name' =>'Programming Zalo with Android SDK',
            'category_id'=>2,
            'level_id'=>1,
            'language_id'=>1,
            'teacher_id'=>1,
        
            'photo'=>'11-628134782-1636209035.jpg',
    
            'status'=>1,
            'price'=>27,
        ]
         );   

         DB::table('courses')->insert([
            'name' =>'Backend programming for websites using PHP/Mysql according to MVC model',
            'category_id'=>1,
            'level_id'=>2,
            'language_id'=>1,
            'teacher_id'=>1,
    
            
            'photo'=>'14-392594466-1631099625.jpg',
    
            'status'=>0,
            'price'=>29,
        ]
         );   
         
         DB::table('courses')->insert([
            'name' =>'Developing iOS with SwiftUI',
            'category_id'=>1,
            'level_id'=>3,
            'language_id'=>1,
            'teacher_id'=>1,

            
            'photo'=>'8-1891409160-1636209011.jpg',
    
            'status'=>0,
            'price'=>49,
        ]
         );  

         DB::table('courses')->insert([
            'name' =>'Java Programming in 4 Weeks',
            'category_id'=>1,
            'level_id'=>2,
            'language_id'=>1,
            'teacher_id'=>1,

            
            'photo'=>'7-1667031984-1631157612.jpg',
    
            'status'=>0,
            'price'=>52,
        ]
         );  

         DB::table('courses')->insert([
            'name' =>'Complete Kotlin Programming',
            'category_id'=>1,
            'level_id'=>1,
            'language_id'=>1,
            'teacher_id'=>1,

            
            'photo'=>'15-293838858-1636208996.jpg',
            'status'=>0,
            'price'=>35,
        ]
         );   
    }
}
