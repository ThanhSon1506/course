<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(PositionSeeder::class);
        $this->call(CourseSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(LevelSeeder::class);
        $this->call(LanguageSeeder::class);
        $this->call(StudentSeeder::class);
        $this->call(StaffSeeder::class);
        $this->call(TeacherSeeder::class);
        $this->call(VideoSeeder::class);
        $this->call(ThemeSeeder::class);
    }   
}
