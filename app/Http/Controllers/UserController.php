<?php                                                                                   
                                                                                        
namespace App\Http\Controllers;                                                         
use Carbon\Carbon;
                                                                         
use App\Models\User;                                                                    
use Illuminate\Http\Request;                                                            
use Inertia\Inertia;                                                                    
use App\Models\Achievement;
use Illuminate\Support\Facades\DB;                                                                            
class   UserController extends Controller                                                 
{ public function welcome()
    {   
        // Hitung Data Hari Ini
        $today = Carbon::now()->format('Y-m-d');
        $dailyData = DB::table('achievements')
            ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->whereBetween('date', [$today.' 00:00:00', $today.' 23:59:59'])
            ->groupBy('drw_no')
            ->get()
            ->toArray();
    
    
        // Hitung Data Mingguan
        $oneWeekEarlier = Carbon::now()->subWeek();
        $weeklyData = DB::table('achievements')
            ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->where('date', '>', $oneWeekEarlier) 
            ->groupBy('drw_no')
            ->get()
            ->toArray();
    
        // Hitung Data Bulanan
        $oneMonthAgo = Carbon::now()->subMonth(1);
        $monthlyData = DB::table('achievements')
            ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->whereDate('date', '>=', $oneMonthAgo)
            ->groupBy('drw_no')
            ->get()
            ->toArray();
    
        //Hitung Data Shift
        $shiftData = DB::table('achievements')
            ->select(DB::raw('shift as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->groupBy('shift')
            ->get()
            ->toArray();
    
        //Hitung Target Operator
        $personData = DB::table('achievements')
            ->select(DB::raw('users.fullname as name1, SUM(total_lot) as total_lot, SUM(qty) as qty1'))
            ->join('users', 'users.npk', '=', 'achievements.npk')
            ->groupBy('users.fullname')
            ->get()
            ->toArray();
    
        //Hitung Data Per Product
        $productData = DB::table('achievements')
            ->select(DB::raw('products.product_name as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->join('products', 'products.drw_no', '=', 'achievements.drw_no')
            ->groupBy('products.product_name')
            ->get()
            ->toArray();
    
    
    
        $data = [
            'Shift' => $shiftData,
            'Person' => $personData,
            'Product' => $productData,
            'Daily' => $dailyData,
            'Weekly' => $weeklyData,
            'Monthly' => $monthlyData,
        ];
    
        return inertia('Welcome', ['data' => $data]);
    }



    public function dashboard()
    {   
        // Hitung Data Hari Ini
        $today = Carbon::now()->format('Y-m-d');
        $dailyData = DB::table('achievements')
            ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->whereBetween('date', [$today.' 00:00:00', $today.' 23:59:59'])
            ->groupBy('drw_no')
            ->get()
            ->toArray();
    
    
        // Hitung Data Mingguan
        $oneWeekEarlier = Carbon::now()->subWeek();
        $weeklyData = DB::table('achievements')
            ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->where('date', '>', $oneWeekEarlier) 
            ->groupBy('drw_no')
            ->get()
            ->toArray();
    
        // Hitung Data Bulanan
        $oneMonthAgo = Carbon::now()->subMonth(1);
        $monthlyData = DB::table('achievements')
            ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->whereDate('date', '>=', $oneMonthAgo)
            ->groupBy('drw_no')
            ->get()
            ->toArray();
    
        //Hitung Data Shift
        $shiftData = DB::table('achievements')
            ->select(DB::raw('shift as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->groupBy('shift')
            ->get()
            ->toArray();
    
        //Hitung Target Operator
        $personData = DB::table('achievements')
            ->select(DB::raw('users.fullname as name1, SUM(total_lot) as total_lot, SUM(qty) as qty1'))
            ->join('users', 'users.npk', '=', 'achievements.npk')
            ->groupBy('users.fullname')
            ->get()
            ->toArray();
    
        //Hitung Data Per Product
        $productData = DB::table('achievements')
            ->select(DB::raw('products.product_type as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->join('products', 'products.drw_no', '=', 'achievements.drw_no')
            ->groupBy('products.product_type')
            ->get()
            ->toArray();
    
    
    
        $data = [
            'Shift' => $shiftData,
            'Person' => $personData,
            'Product' => $productData,
            'Daily' => $dailyData,
            'Weekly' => $weeklyData,
            'Monthly' => $monthlyData,
        ];
    
        return inertia('Dashboard', ['data' => $data]);
        
    }
}                                                                                       
