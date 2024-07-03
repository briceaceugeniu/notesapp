<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        DB::table('tags')->insert(['name' => 'linux', 'created_at' => now(), 'updated_at' => now()]);
        DB::table('tags')->insert(['name' => 'windows', 'created_at' => now(), 'updated_at' => now()]);
        DB::table('tags')->insert(['name' => 'security', 'created_at' => now(), 'updated_at' => now()]);
        DB::table('tags')->insert(['name' => 'network', 'created_at' => now(), 'updated_at' => now()]);
        DB::table('tags')->insert(['name' => 'programming', 'created_at' => now(), 'updated_at' => now()]);
        DB::table('tags')->insert(['name' => 'other', 'created_at' => now(), 'updated_at' => now()]);

//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);
    }
}
