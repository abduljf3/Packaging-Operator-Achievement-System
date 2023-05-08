<?php                                                                                   
                                                                                        
namespace App\Http\Controllers;                                                         
use Carbon\Carbon;
                                                                         
use App\Models\User;                                                                    
use Illuminate\Http\Request;                                                            
use Inertia\Inertia;                                                                    
use App\Models\Achievement;
use Illuminate\Support\Facades\DB;                                                                            
class   UserController extends Controller                                                 
{                                                                                       

    public function daily()
{
    $today = Carbon::now()->format('Y-m-d');
    $data = DB::table('achievements')
        ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
        ->whereBetween('date', [$today.' 00:00:00', $today.' 23:59:59'])
        ->groupBy('drw_no')
        ->get()
        ->toArray();

    return inertia('Achievements', ['data' => $data]);
}

    public function weekly()
    {
        // Calculate date one week earlier from today's date
        $oneWeekEarlier = Carbon::now()->subWeek();
    
        $data = DB::table('achievements')
            ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->where('date', '>', $oneWeekEarlier) // Select data from one week earlier till today
            ->groupBy('drw_no')
            ->get()
            ->toArray();
    
        return inertia('Achievements', ['data' => $data]);
    }
    public function monthly()
    {
        $oneMonthAgo = Carbon::now()->subMonth(1);
        $data = DB::table('achievements')
                ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
                ->whereDate('date', '>=', $oneMonthAgo)
                ->groupBy('drw_no')
                ->get()
                ->toArray();
    
        return inertia('Achievements', ['data' => $data]);
    }     
    public function shift()
    {
      
        $data = DB::table('achievements')
                ->select(DB::raw('shift as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
         
                ->groupBy('shift')
                ->get()
                ->toArray();
    
        return inertia('Achievements', ['data' => $data]);
    }    
    
    public function person()
    {
        $data = DB::table('achievements')
                ->select(DB::raw('users.fullname as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
                ->join('users', 'users.npk', '=', 'achievements.npk')
                ->groupBy('users.fullname')
                ->get()
                ->toArray();
    
        return inertia('Achievements', ['data' => $data]);
    }
    public function product()
    {
        $data = DB::table('achievements')
                ->select(DB::raw('products.product_type as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
                ->join('products', 'products.drw_no', '=', 'achievements.drw_no')
                ->groupBy('products.product_type')
                ->get()
                ->toArray();
    
        return inertia('Achievements', ['data' => $data]);
    }
    
}                                                                                       
