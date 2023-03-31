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

    public function rekapitulasi($dari,$sampai)
    {
        if($dari){
            $achievements = achievement::where([
                'date','>=',$dari,
                'date','<=',$sampai
            ])->DB::raw([
                'SUM(total_lot) as lot',
                'SUM(qty) as total_qty'
            ])->groupBy('product_id')->get();
        }else{
            $achievements = null;   
        }
        return Inertia::render('Leader/Rekapitulasi',[
            'achievements' => $achievements
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
