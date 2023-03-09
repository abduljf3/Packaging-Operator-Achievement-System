<?php                                                                                   
                                                                                        
namespace App\Http\Controllers;                                                         
                                                                                        
use App\Models\User;                                                                    
use Illuminate\Http\Request;                                                            
use Inertia\Inertia;                                                                    
                                                                                        
class achivementcontroller extends Controller                                                 
{                                                                                       
    public function achivement()                                                             
                                                                                        
    {                                                                                   
        $users = User::where('name','Abdul Jabar')->get();                              
        return Inertia::render('achivement',[                                                 
            'users' => $users                                                           
        ]);                                                                             
    }                                                                                   
}                                                                                       
