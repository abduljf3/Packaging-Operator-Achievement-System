<?php

namespace App\Http\Controllers;
use App\Models\Achievement;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    public function index(Request $request)
    {
        $labels = Achievement::pluck('date');
        $data = Achievement::pluck('qty');

        return view('chart', compact('labels', 'data'));
    }
}

