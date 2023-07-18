<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $currentYear = date('Y');
        $currentMonth = date('m');
        $products = Achievement::whereYear('date', $currentYear)
        ->whereMonth('date', '<=', $currentMonth)
        ->join('products', 'achievements.product_id', '=', 'products.id')
        ->groupBy('products.product_type')
        ->select('products.product_type', DB::raw('SUM(achievements.qty) as total_qty'))
        ->get();

        $yearlyAchievement = Achievement::whereYear('date', $currentYear)
            ->groupBy(DB::raw('MONTH(date)'))
            ->selectRaw('MONTH(date) as month, SUM(qty) as total')
            ->get();
        
        $monthlyAchievement = Achievement::whereMonth('date', $currentMonth)
            ->join('products', 'achievements.product_id', '=', 'products.id')
            ->groupBy('products.product_type')
            ->select('products.product_type', DB::raw('SUM(achievements.qty) as total_qty'))
            ->orderBy('total_qty', 'desc')
            ->get();

        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now();
            

        $weeklyAchievement = Achievement::whereBetween('date', [$startDate, $endDate])
            ->join('products', 'achievements.product_id', '=', 'products.id')
            ->groupBy(DB::raw('WEEKOFYEAR(achievements.date)'), 'products.product_type')
            ->select(DB::raw('WEEKOFYEAR(achievements.date) as week_number'), 'products.product_type', DB::raw('SUM(achievements.qty) as total_qty'))
            ->orderBy('week_number')
            ->orderBy('products.product_type')
            ->get();
        
        $dailyAchievement = Achievement::whereBetween('date', [$startDate, $endDate])
            ->selectRaw('DATE(date) as date, SUM(qty) as total_qty, shift')
            ->groupBy('date', 'shift')
            ->get();

        $roles = '';
        if(Auth::user()){
            $roles = Auth::user()->roles;
        }

        return Inertia::render('Dashboard',[
            'products' => $products,
            'yearlyAchievement' => $yearlyAchievement,
            'monthlyAchievement' => $monthlyAchievement,
            'weeklyAchievement' => $weeklyAchievement,
            'dailyAchievement' => $dailyAchievement,
            'roles' => $roles
        ]);
    }
}
