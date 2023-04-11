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
            'fullname' => 'Abdul Jabar',
            'npk' => '7474',
            'group' => '1',
            'status' => 'KARYAWAN',
            'password' => bcrypt('admin'),
            'roles' => 'admin',

            
        ],
        [
            'fullname' => 'Nur Firdaus',
            'npk' => '7777',
            'group' => '1',
            'status' => 'MAGANG',
            'password' => bcrypt('admin'),
            'roles' => 'admin',

            
        ]
    ]);
    }
}
