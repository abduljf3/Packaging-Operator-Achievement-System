<?php                                                                                   
                                                                                        
namespace App\Http\Controllers;                                                         
                                                                                        
use App\Models\User;                                                                    
use Illuminate\Http\Request;                                                            
use Inertia\Inertia;                                                                    
                                                                                        
class ItemController extends Controller                                                 
{                                                                                       
    public function welcome()                                                             
                                                                                        
    {                                                                                   
        $users = User::where('fullname','Abdul Jabar')->get();                              
        return Inertia::render('Welcome',[                                                 
            'users' => $users                                                           
        ]);                                                                             
    }                                                                                   
}                                                                                       
