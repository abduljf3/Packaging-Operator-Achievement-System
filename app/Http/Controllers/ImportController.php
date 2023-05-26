<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Achievement;
use Inertia\Inertia;

class ImportController extends Controller
{
    public function index()
    {
        return view('import');
    }

    public function import(Request $request)
     {
         // Validate the file upload
         $request->validate([
             'file' => 'required|mimes:xlsx,xls,csv'
         ]);
     
         // Get the file from the request
         $file = $request->file('file');

         // Reazd the file into an array, skipping the first row
         $data = Excel::toArray([], $file)[0];
         array_shift($data);

         // Loop through the array and save each row to the database
         foreach ($data as $row) {
             if($row[0] != null){
                Achievement::create([
                    'date' => $row[0],
                    'shift' => $row[1],
                    'npk' => $row[2],
                    'drw_no' => $row[3],
                    'spring_lot' => $row[4],
                    'product_lot' => $row[5],
                    'total_lot' => $row[6],
                    'qty' => $row[7],
                    'remarks' => $row[8],
                  
                ]);
             }
         
         }
     
         // Redirect back with a success message
       
        }

}    