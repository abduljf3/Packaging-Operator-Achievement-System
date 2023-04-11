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
            'fullname' => 'Abdul Jabar Nur Firdaus',
            'npk' => '7474',
            'group' => '1',
            'status' => 'KARYAWAN',
            'password' => bcrypt('admin'),
            'roles' => 'admin',

            
        ],
        [
            'fullname' => 'Dika',
            'npk' => '7777',
            'group' => '2',
            'status' => 'MAGANG',
            'password' => bcrypt('admin'),
            'roles' => 'admin',

            
        ],
        [
            'fullname' => 'Laras',
            'npk' => '8888',
            'group' => '3',
            'status' => 'MAGANG',
            'password' => bcrypt('admin'),
            'roles' => 'admin',

            
        ],
        [
            'fullname' => 'Syenina',
            'npk' => '8484',
            'group' => '3',
            'status' => 'MAGANG',
            'password' => bcrypt('admin'),
            'roles' => 'admin',

            
        ],
        [
            'fullname' => 'Yanto',
            'npk' => '9999',
            'group' => '2',
            'status' => 'KARYAWAN',
            'password' => bcrypt('admin'),
            'roles' => 'admin',

            
        ],
        [
            'fullname' => 'Yanti',
            'npk' => '9494',
            'group' => '1',
            'status' => 'KARYAWAN',
            'password' => bcrypt('admin'),
            'roles' => 'admin',

            
        ]
        ,
        [
            'fullname' => 'Ujang',
            'npk' => '6666',
            'group' => '1',
            'status' => 'PKL',
            'password' => bcrypt('admin'),
            'roles' => 'admin',
        ]
        ,
        [
            'fullname' => 'Umar',
            'npk' => '6464',
            'group' => '2',
            'status' => 'PKL',
            'password' => bcrypt('admin'),
            'roles' => 'admin',
        ] ,
        [
            'fullname' => 'Wawan',
            'npk' => '5555',
            'group' => '3',
            'status' => 'PKL',
            'password' => bcrypt('admin'),
            'roles' => 'admin',
        ] ,
        [
            'fullname' => 'Wati',
            'npk' => '5454',
            'group' => '1',
            'status' => 'PKL',
            'password' => bcrypt('admin'),
            'roles' => 'admin',
        ]
            
    ]);
    }
}
