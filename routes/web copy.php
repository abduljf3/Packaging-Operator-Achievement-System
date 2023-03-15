<?php
use App\Http\Controllers\achivementcontroller;
use App\Http\Controllers\addproduct;
use App\Http\Controllers\Admin\AchievementControler;
use App\Http\Controllers\Admin\AchievementController;
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
use App\Http\Controllers\FormController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\Leader\DetailLeader;
use App\Http\Controllers\leader\index;
use App\Http\Controllers\Operator\ControllerPimpinan;
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
  


Route::resource('archivmenyss', ArchivemenyyController::class);
Route::resource('companies', CompanyController::class);


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home',[UserController::class,'index'])->name('home');
Route::get('/dashboard',[UserController::class,'index'])->name('home');
Route::get('/posts/create',[PostController::class,'index'])->name('home');

Route::prefix('leader')->middleware(['auth'])->group(function () { 
    Route::resource('',\App\Http\Controllers\Leader\ControllerLeader::class);
    Route::resource('detail',\App\Http\Controllers\Leader\LeaderController::class);
   
});

Route::prefix('operator')->middleware(['auth'])->group(function () { 
    Route::resource('operatorachievement',OperatorController::class);
 
});

Route::prefix('admin')->middleware(['auth'])->group(function () { 
    Route::resource('products',ProductController::class);
    Route::resource('achievement',AchievementController::class);
    Route::resource('employee',AdminEmployeeController::class);
    Route::resource('leader',AdminLeaderController::class);
 
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
