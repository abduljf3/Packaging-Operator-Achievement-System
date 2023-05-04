<?php
use App\Http\Controllers\AchievementCreateController;
use App\Http\Controllers\Admin\AchievementController;
use App\Http\Controllers\Admin\AdminEmployeeController;
use App\Http\Controllers\Admin\AdminLeaderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\AdminExcel;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\FormController;

use App\Http\Controllers\ItemController;
use App\Http\Controllers\Leader\LeaderController;
use App\Http\Controllers\Operator\OperatorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Requests\Admin\Employee;
use Barryvdh\DomPDF\PDF;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


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


Route::prefix('leader')->middleware(['auth'])->name('leader.')->group(function () {
    Route::get('/',[LeaderController::class,'index'])->name('dashboard');
    Route::get('/detail',[LeaderController::class,'detail'])->name('detail');
    Route::get('/rekapitulasi',[LeaderController::class,'rekapitulasi'])->name('rekapitulasi');
    Route::get('/cetak_pdf', [LeaderController::class,'cetak_pdf'])->name('cetak_pdf');
    Route::get('/cetak_pdf_detail', [LeaderController::class,'cetak_pdf_detail'])->name('cetak_pdf_detail');
    Route::get('/cetak_excel', [LeaderController::class,'cetak_excel'])->name('cetak_excel');
    Route::get('/cetak_excel_rekapitulasi', [LeaderController::class,'cetak_excel_rekapitulasi'])->name('cetak_excel_rekapitulasi');
});



Route::prefix('admin')->middleware(['auth'])->name('admin.')->group(function () {
    Route::resource('products',ProductController::class);
    Route::resource('achievement',AchievementController::class);
    Route::resource('employee',AdminEmployeeController::class);
    Route::resource('leader',AdminLeaderController::class);
    Route::get('cetak_pdf_detail_admin', [AchievementController::class,'cetak_pdf_detail_admin'])->name('cetak_pdf_detail_admin');

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
