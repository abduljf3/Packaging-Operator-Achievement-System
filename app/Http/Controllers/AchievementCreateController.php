<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AchievementCreateController extends Controller
{
    public function create()
    {
        $users = User::where('roles','admin')->get();
       
        $products = Product::get();
        
        return Inertia::render('Operator/CreateAchievement',[
            'users' => $users,
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        
        Achievement::create($data);
    }
    

}

