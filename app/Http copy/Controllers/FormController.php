<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    public function submitForm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'inputValue' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()]);
        }

        return response()->json(['inputValue' => $request->input('inputValue')]);
    }
}
