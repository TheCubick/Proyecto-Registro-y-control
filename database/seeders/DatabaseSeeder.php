<?php

namespace Database\Seeders;

use App\Models\departments;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'guardia@registro.test'],
            [
                'name' => 'Guardia Principal',
                'password' => bcrypt('password'),
                'role' => 'guardia',
            ]
        );

        $this -> call([
            departmentseeder::class,
            visitorSeeder::class,
            visitSeeder::class,
        ]);
    }
}
