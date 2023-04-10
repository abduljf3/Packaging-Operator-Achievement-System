<?php

namespace App\Http\Controllers\Leader;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaderController extends Controller
{
    public function index()
    {
        return Inertia::render('Leader/Index');
    }

    public function rekapitulasi(Request $request)
    {
        $achievements = null;
        if( $request->input('from_date')){
            $from = $request->input('from_date');
            $to = $request->input('to_date');
            $achievements = Achievement::with(['user','product'])->whereBetween('date',[$from,$to])->get();
        }
        return Inertia::render('Leader/Rekapitulasi',[
            'achievements' => $achievements
        ]);
    }
    public function detail(Request $request)
    {
        $achievements = null;
        if( $request->input('from_date')){
            $from = $request->input('from_date');
            $to = $request->input('to_date');
            $achievements = Achievement::with(['user','product'])->whereBetween('date',[$from,$to])->get();
        }
        return Inertia::render('Leader/Detail',[
            'achievements' => $achievements
        ]);
    }
    public function report()
    {

        return Inertia::render('Leader/Report');
    }

}
