<?php

use App\Http\Controllers\AchievementCreateController;
use App\Http\Controllers\achivementcontroller;
use App\Http\Controllers\addproduct;
use App\Http\Controllers\AchievementController;
use App\Http\Controllers\Admin\AdminEmployeeController;
use App\Http\Controllers\Admin\admininputproduct;
use App\Http\Controllers\Admin\AdminLeaderController;
use App\Http\Controllers\Admin\AdminLeaders;
use App\Http\Controllers\Admin\AdminProduct;
use App\Http\Controllers\Admin\LeaderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\AdminLeader;
use App\Http\Controllers\ArchivemenyyController;
use App\Http\Controllers\ArchivmenController;
use App\Http\Controllers\ControllerLeader;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\Leader\DetailLeader;
use App\Http\Controllers\leader\index;
use App\Http\Controllers\Leader\LeaderRekapitulasi;
use App\Http\Controllers\Operator\OperatorController;
use App\Http\Controllers\Pimpinan\Test;
use App\Http\Controllers\PimpinanController;
use App\Http\Controllers\PimpinanController1;
use App\Http\Controllers\PimpinanControllerx;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\achivement;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CompanyController;


Route::post('/import', [ExcelController::class, 'import']);
Route::get('/export', [ExcelController::class, 'export']);
Route::get('/home',[UserController::class,'index'])->name('home');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/achievement/create',[AchievementCreateController::class,'create'])->name('achievementCreate');
Route::post('/achievement/store',[AchievementCreateController::class,'store'])->name('achievementStore');


Route::prefix('leader')->middleware(['auth'])->group(function () {
    Route::get('/',[\App\Http\Controllers\Leader\LeaderController::class,'index'])->name('leader.dashboard');
    Route::get('/detail',[\App\Http\Controllers\Leader\LeaderController::class,'detail'])->name('leader.detail');

    Route::get('/rekapitulasi',[\App\Http\Controllers\Leader\LeaderController::class,'rekapitulasi'])->name('leader.rekapitulasi');
});


Route::prefix('operator')->group(function () {
    Route::resource('operatorachievement',OperatorController::class);
});


Route::prefix('admin')->middleware(['auth'])->group(function () { 
    Route::resource('products',ProductController::class)->name('index','products.index');
    Route::resource('achievement',\App\Http\Controllers\Admin\AchievementController::class)->name('index','achievement.index');
    Route::get('/achievement/index',[\App\Http\Controllers\Admin\AchievementController::class,'achievement'])->name('admin.achievement.index');

    Route::resource('employee',AdminEmployeeController::class)->name('index','employee.index');
    Route::resource('leader',AdminLeaderController::class)->name('index','leader.index');
});


Route::get('/welcome',[ItemController::class,'welcome'])->name('welcome');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});
require __DIR__.'/auth.php';
