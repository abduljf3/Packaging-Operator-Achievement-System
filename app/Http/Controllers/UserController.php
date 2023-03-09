<?php                                                                                   
                                                                                        
namespace App\Http\Controllers;                                                         
                                                                                        
use App\Models\User;                                                                    
use Illuminate\Http\Request;                                                            
use Inertia\Inertia;                                                                    
                                                                                        
class UserController extends Controller                                                 
{                                                                                       
    public function index()                                                             
                                                                                        
    {                                                                                   
        $users = User::where('name','Abdul Jabar')->get();                              
        return Inertia::render('Home',[                                                 
            'users' => $users                                                           
        ]);                                                                             
    }                                                                                   
}                                                                                       
