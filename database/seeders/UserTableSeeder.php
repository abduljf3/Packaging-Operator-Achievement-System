<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert([
            [
            'fullname' => 'Administrator',
            'npk' => '7474',
            'group' => 'NS',
            'status' => 'TETAP',
            'password' => bcrypt('admin'),
            'roles' => 'Admin',
        ],            
    ]);
    }
}
