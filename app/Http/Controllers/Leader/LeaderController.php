<?php

namespace App\Http\Controllers\Leader;

use App\Http\Controllers\Controller;
use App\Models\achievement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderController extends Controller
{
    public function index()
    {
        return Inertia::render('Leader/Index');
    }

    public function rekapitulasi()
    {
     
        $achievements= achievement::with('product')->get();
        return Inertia::render('Leader/Rekapitulasi',[
            'achievements'=>$achievements
        ]);
    }
    public function detail()
    {
     
        return Inertia::render('Leader/Detail');
    }
    public function report()
    {
     
        return Inertia::render('Leader/Report');
    }
    
}
