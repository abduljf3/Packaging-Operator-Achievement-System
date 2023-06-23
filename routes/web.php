<?php
use App\Http\Controllers\AchievementCreateController;
use App\Http\Controllers\Admin\AchievementController;
use App\Http\Controllers\Admin\AdminEmployeeController;
use App\Http\Controllers\Admin\AdminLeaderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\AdminExcel;
use App\Http\Controllers\ChartController;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\HighchartController;
use App\Http\Controllers\ImportController;
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


    Route::get('/', function () {
        return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


//CHART WELCOME PAGE (View Resource/js/Achievements.jsx)
    Route::get('/data',[ChartController::class,'data'])->name('data');
   
//Import Excel
    Route::post('/import', [ImportController::class, 'import'])->name('import');

//ACHIEVEMENT CREATE ( OPERATOR )
    Route::get('/achievement/create',[AchievementCreateController::class,'create'])->name('achievementCreate');
    Route::post('/achievement/store',[AchievementCreateController::class,'store'])->name('achievementStore');

    Route::prefix('leader')->middleware(['auth'])->name('leader.')->group(function () {
    Route::get('/',[LeaderController::class,'index'])->name('dashboard');
    Route::get('/detail',[LeaderController::class,'detail'])->name('detail');
    Route::get('/printData',[LeaderController::class,'printData'])->name('printData');
    Route::get('/rekapitulasi',[LeaderController::class,'rekapitulasi'])->name('rekapitulasi');
    Route::get('/cetak_pdf', [LeaderController::class,'cetak_pdf'])->name('cetak_pdf');
    Route::get('/cetak_pdf_detail', [LeaderController::class,'cetak_pdf_detail'])->name('cetak_pdf_detail');
    Route::get('/cetak_excel', [LeaderController::class,'cetak_excel'])->name('cetak_excel');
    Route::get('/cetak_excel_rekapitulasi', [LeaderController::class,'cetak_excel_rekapitulasi'])->name('cetak_excel_rekapitulasi');
    Route::post('/import_excel', [LeaderController::class, 'import_excel'])->name('import_excel');


});

    Route::prefix('admin')->middleware(['auth'])->name('admin.')->group(function () {
     
    //Admin Achievement
    Route::resource('achievement',AchievementController::class);
    Route::get('cetak_excel', [LeaderController::class,'cetak_excel'])->name('cetak_excel');
    Route::get('print_data', [AchievementController::class,'print_data'])->name('print_data');
    Route::get('cetak_pdf_detail', [LeaderController::class,'cetak_pdf_detail'])->name('cetak_pdf_detail');

    //Admin Employee
    Route::resource('employee',AdminEmployeeController::class);
    Route::get('cetak_pdf_employee', [AdminEmployeeController::class,'cetak_pdf_employee'])->name('cetak_pdf_employee');
    Route::get('cetak_excel_employee', [AdminEmployeeController::class,'cetak_excel_employee'])->name('cetak_excel_employee');
    Route::get('print_data_employee', [AdminEmployeeController::class,'print_data_employee'])->name('print_data_employee');

    //Admin Product
    Route::resource('products',ProductController::class);
    Route::get('cetak_pdf_product', [ProductController::class,'cetak_pdf_product'])->name('cetak_pdf_product');
    Route::get('cetak_excel_product', [ProductController::class,'cetak_excel_product'])->name('cetak_excel_product');
    Route::get('print_data_product', [ProductController::class,'print_data_product'])->name('print_data_product');

    //Admin Customer
   Route::resource('customers',CustomerController::class);
   Route::get('cetak_excel_customer', [CustomerController::class,'cetak_excel_customer'])->name('cetak_excel_customer');
   Route::get('cetak_pdf_customer', [CustomerController::class,'cetak_pdf_customer'])->name('cetak_pdf_customer');
   Route::get('print_data_customer', [CustomerController::class,'print_data_customer'])->name('print_data_customer');

});
Route::get('/',[UserController::class,'welcome'])->name('');
    Route::get('/welcome',[UserController::class,'welcome'])->name('welcome');
    Route::get('/dashboard',[UserController::class,'dashboard'], function () {
        return Inertia::render('Dashboard');
        })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profileleader', [ProfileController::class, 'editleader'])->name('profileleader.edit');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});
require __DIR__.'/auth.php';
