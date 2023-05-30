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
    public function Welcome()
    {   
      // Retrieve the daily data for the current month
      $dailyData = DB::table('achievements')
      ->select(DB::raw('DAY(date) as day, SUM(total_lot) as total_lot, SUM(qty) as qty'))
      ->whereYear('date', Carbon::now()->year)
      ->whereMonth('date', Carbon::now()->month)
      ->groupBy('day')
      ->get()
      ->toArray();
          
          
          // Retrieve the weekly data for the current month
      $weeklyData = DB::table('achievements')
      ->select(DB::raw('WEEK(date) - WEEK(DATE_SUB(date, INTERVAL DAYOFMONTH(date) - 1 DAY)) + 1 as week, SUM(total_lot) as total_lot, SUM(qty) as qty'))
      ->whereYear('date', Carbon::now()->year)
      ->whereMonth('date', Carbon::now()->month)
      ->groupBy('week')
      ->get()
      ->toArray();
          

      // Calculate the start and end dates for the query
      $startDate = Carbon::now()->startOfYear();
      $endDate = Carbon::now()->endOfYear();

      // Retrieve the monthly data for the past 1 year
      $monthlyData = DB::table('achievements')
          ->select(DB::raw('MONTH(date) as month, SUM(total_lot) as total_lot, SUM(qty) as qty'))
          ->whereBetween('date', [$startDate, $endDate])
          ->groupBy('month')
          ->get()
          ->toArray();

      // Add month names to the monthly data
      $monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];
      $monthlyData = array_map(function ($item) use ($monthNames) {
          $item->month_name = $monthNames[$item->month - 1];
          return $item;
      }, $monthlyData);

          // Get the current date
      $currentDate = Carbon::now()->toDateString();

      // Retrieve data for the current day
      $shiftData = DB::table('achievements')
          ->select(DB::raw('shift as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
          ->whereDate('date', $currentDate)
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
  
          
      // Get the current month
      $currentMonth = Carbon::now()->format('m');

      // Retrieve data for the current month
      $productData = DB::table('achievements')
          ->select(DB::raw('products.product_type as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
          ->join('products', 'products.drw_no', '=', 'achievements.drw_no')
          ->whereMonth('achievements.date', $currentMonth)
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


return inertia('Welcome', ['data' => $data]);

}



            public function dashboard()
            {   
            // Retrieve the daily data for the current month
        $dailyData = DB::table('achievements')
        ->select(DB::raw('DAY(date) as day, SUM(total_lot) as total_lot, SUM(qty) as qty'))
        ->whereYear('date', Carbon::now()->year)
        ->whereMonth('date', Carbon::now()->month)
        ->groupBy('day')
        ->get()
        ->toArray();
            
            
            // Retrieve the weekly data for the current month
        $weeklyData = DB::table('achievements')
        ->select(DB::raw('WEEK(date) - WEEK(DATE_SUB(date, INTERVAL DAYOFMONTH(date) - 1 DAY)) + 1 as week, SUM(total_lot) as total_lot, SUM(qty) as qty'))
        ->whereYear('date', Carbon::now()->year)
        ->whereMonth('date', Carbon::now()->month)
        ->groupBy('week')
        ->get()
        ->toArray();
            

        // Calculate the start and end dates for the query
        $startDate = Carbon::now()->startOfYear();
        $endDate = Carbon::now()->endOfYear();

        // Retrieve the monthly data for the past 1 year
        $monthlyData = DB::table('achievements')
            ->select(DB::raw('MONTH(date) as month, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->whereBetween('date', [$startDate, $endDate])
            ->groupBy('month')
            ->get()
            ->toArray();

        // Add month names to the monthly data
        $monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        $monthlyData = array_map(function ($item) use ($monthNames) {
            $item->month_name = $monthNames[$item->month - 1];
            return $item;
        }, $monthlyData);

            // Get the current date
        $currentDate = Carbon::now()->toDateString();

        // Retrieve data for the current day
        $shiftData = DB::table('achievements')
            ->select(DB::raw('shift as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->whereDate('date', $currentDate)
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
    
            
        // Get the current month
        $currentMonth = Carbon::now()->format('m');

        // Retrieve data for the current month
        $productData = DB::table('achievements')
            ->select(DB::raw('products.product_type as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->join('products', 'products.drw_no', '=', 'achievements.drw_no')
            ->whereMonth('achievements.date', $currentMonth)
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
