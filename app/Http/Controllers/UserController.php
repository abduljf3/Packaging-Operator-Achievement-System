<?php                                                                                   
                                                                                        
namespace App\Http\Controllers;                                                         
                                                                                        
use App\Models\User;                                                                    
use Illuminate\Http\Request;                                                            
use Inertia\Inertia;                                                                    
use App\Models\Achievement;
use Illuminate\Support\Facades\DB;                                                                            
class UserController extends Controller                                                 
{                                                                                       
    public function index()
    {
        $data = DB::table('achievements')
            ->select(DB::raw('drw_no as name, SUM(total_lot) as total_lot, SUM(qty) as qty'))
            ->groupBy('drw_no')
            ->get()
            ->toArray();
    
        return inertia('Achievements', ['data' => $data]);
    }                                                   
}                                                                                       
