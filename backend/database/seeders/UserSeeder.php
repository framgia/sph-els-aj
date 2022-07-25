<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Services\Auth\RegisterUserService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'Abdul Jalil Palala',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('12345678'),
                'type_id' => 1,
            ],
            [
                'name' => 'John Doe',
                'email' => 'guest@gmail.com',
                'password' => bcrypt('12345678'),
                'type_id' => 2,
            ]
        ];

        $admin = new RegisterUserService($users[0]);
        $admin->register();
        $user = new RegisterUserService($users[1]);
        $user->register();
    }
}
