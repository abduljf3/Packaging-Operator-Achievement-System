<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\User;

class ExcelController extends Controller
{
    public function import(Request $request)
    {
        $file = $request->file('file');

        Excel::filter('chunk')->load($file)->chunk(100, function ($results) {
            foreach ($results as $row) {
                User::create([
                    'name' => $row->name,
                    'email' => $row->email,
                    'password' => bcrypt($row->password),
                ]);
            }
        });

        return response()->json(['message' => 'Import successful']);
    }

    public function export()
    {
        $users = User::all();

        Excel::create('users', function ($excel) use ($users) {
            $excel->sheet('Sheet 1', function ($sheet) use ($users) {
                $sheet->fromArray($users);
            });
        })->store('xlsx');

        $url = asset('storage/app/users.xlsx');

        return response()->json(['url' => $url]);
    }
}
