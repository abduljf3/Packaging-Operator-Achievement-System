<?php

namespace App\Http\Controllers;
use App\Models\Achievement;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AchievementController extends Controller
{
    public function create()
    {
        $users = User::where('roles','user')->get();
        $products = Product::with('customer')->OrderBy('drw_no')->get();
        return Inertia::render('AchievementCreate',[
            'users' => $users,
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        Achievement::create($data);
        return redirect(route('achievement.create'))->with([
            'message' => 'Berhasil Disimpan',
            'type' => 'success',
        ]);
    }
}
