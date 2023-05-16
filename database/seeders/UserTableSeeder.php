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
            'fullname' => 'Jabar',
            'npk' => '7474',
            'group' => '1',
            'status' => 'MAGANG',
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
            'roles' => 'user',

            
        ],
        [
            'fullname' => 'Yanti',
            'npk' => '9494',
            'group' => '1',
            'status' => 'KARYAWAN',
            'password' => bcrypt('admin'),
            'roles' => 'user',

            
        ]
        ,
        [
            'fullname' => 'Ujang',
            'npk' => '6666',
            'group' => '1',
            'status' => 'PKL',
            'password' => bcrypt('admin'),
            'roles' => 'user',
        ]
        ,
        [
            'fullname' => 'Umar',
            'npk' => '6464',
            'group' => '2',
            'status' => 'PKL',
            'password' => bcrypt('admin'),
            'roles' => 'user',
        ] ,
        [
            'fullname' => 'Wawan',
            'npk' => '5555',
            'group' => '3',
            'status' => 'PKL',
            'password' => bcrypt('admin'),
            'roles' => 'user',
        ] ,
        [
            'fullname' => 'Wati',
            'npk' => '5454',
            'group' => '1',
            'status' => 'PKL',
            'password' => bcrypt('admin'),
            'roles' => 'admin',
        ] ,
        [
            'fullname' => 'Yusri',
            'npk' => '4444',
            'group' => '1',
            'status' => 'Manager HR',
            'password' => bcrypt('admin'),
            'roles' => 'leader',
        ] ,
        [
            'fullname' => 'Yusni',
            'npk' => '4343',
            'group' => '1',
            'status' => 'Manager Produksi',
            'password' => bcrypt('admin'),
            'roles' => 'leader',
        ],
        [
            'fullname' => 'Yuyun',
            'npk' => '4242',
            'group' => '1',
            'status' => 'Manager IT',
            'password' => bcrypt('admin'),
            'roles' => 'leader',
        ],
        [
            'fullname' => 'Yuda',
            'npk' => '4141',
            'group' => '1',
            'status' => 'Manager Engginering',
            'password' => bcrypt('admin'),
            'roles' => 'leader',
        ],
        [
            'fullname' => 'Yuni',
            'npk' => '4040',
            'group' => '1',
            'status' => 'Manager QA',
            'password' => bcrypt('admin'),
            'roles' => 'leader',
        ],
        [
            'fullname' => 'Yudi',
            'npk' => '4545',
            'group' => '1',
            'status' => 'Manager Marketing',
            'password' => bcrypt('admin'),
            'roles' => 'leader',
        ],
        [
            'fullname' => 'Yurino',
            'npk' => '4646',
            'group' => '1',
            'status' => 'Manager OB',
            'password' => bcrypt('admin'),
            'roles' => 'leader',
        ]
            
    ]);
    }
}
