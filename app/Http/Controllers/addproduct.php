<?php                                                                                   
                                                                                        
namespace App\Http\Controllers;                                                         
                                                                                        
use App\Models\User;                                                                    
use Illuminate\Http\Request;                                                            
use Inertia\Inertia;                                                                    
                                                                                        
class addproduct extends Controller                                                 
{                                                                                       
    public function addproduct()                                                             
                                                                                        
    {                                                                                   
        $users = User::where('name','Abdul Jabar')->get();                              
        return Inertia::render('addproduct',[                                                 
            'users' => $users                                                           
        ]);                                                                             
    }                                                                                   
}                                                                                       
