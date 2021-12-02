<?php

use Illuminate\Database\Seeder;
use App\Video;
class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('videos')->insert([
            'title'=>'sesson 1',
            'session_id'=>1,
            'description'=>'Introduction of course content',
            'url'=>'demo_1-251419620-1634543899.mp4',
        ]);
        
        
    }
}
