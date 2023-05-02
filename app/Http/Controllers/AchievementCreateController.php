<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\Achievements\Store;
use App\Models\Achievement;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AchievementCreateController extends Controller
{
    public function create()
    {
        $users = User::where('roles','user')->get();
       
        $products = Product::get();
        
        return Inertia::render('Operator/CreateAchievement',[
            'users' => $users,
            'products' => $products,
        ]);
    }

    public function store(Store $request)
    {
        $data = $request->all();
        // return $data;
        Achievement::create($data);
    }
    

}

