<?php

use App\Http\Controllers\achivementcontroller;
use App\Http\Controllers\addproduct;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\leader\index;
use App\Http\Controllers\leader\LeaderController;
use App\Http\Controllers\Operator\ControllerPimpinan;
use App\Http\Controllers\Operator\OperatorController;
use App\Http\Controllers\Pimpinan\Test;
use App\Http\Controllers\PimpinanController;
use App\Http\Controllers\PimpinanController1;
use App\Http\Controllers\PimpinanControllerx;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\achivement;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home',[UserController::class,'index'])->name('home');

Route::prefix('pimpinan')->middleware(['auth'])->group(function () { 
    Route::resource('index',LeaderController::class);
   
  
});
Route::prefix('operator')->middleware(['auth'])->group(function () { 
    Route::resource('index',OperatorController::class);
    Route::resource('Edit',OperatorController::class);
  
});
Route::prefix('admin')->middleware(['auth'])->group(function () { 
    Route::resource('products',ProductController::class);
    Route::resource('achievements', achivementcontroller::class);
});



Route::get('/welcome',[ItemController::class,'welcome'])->name('welcome');
Route::get('/achivement',[achivementcontroller::class,'achivement'])->name('achivement');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});

require __DIR__.'/auth.php';
