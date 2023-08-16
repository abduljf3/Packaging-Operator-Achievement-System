<?php

use App\Http\Controllers\AchievementController as ControllersAchievementController;
use App\Http\Controllers\Admin\AchievementController;
use App\Http\Controllers\Admin\AdminEmployeeController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ParcelController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\RecapitulationController;
use App\Http\Controllers\Leader\AchievementController as LeaderAchievementController;
use App\Http\Controllers\Leader\ProfileController as LeaderProfileController;
use App\Http\Controllers\Leader\RecapitulationController as LeaderRecapitulationController;
use Illuminate\Support\Facades\Route;

    Route::get('/',[DashboardController::class,'index'])->name('dashboard');
    //ACHIEVEMENT CREATE ( OPERATOR )
    Route::prefix('achievement')->name('achievement.')->group(function () {
        Route::get('/create',[ControllersAchievementController::class,'create'])->name('create');
        Route::post('/store',[ControllersAchievementController::class,'store'])->name('store');
    });

    Route::prefix('leader')->middleware(['auth'])->name('leader.')->group(function () {
        //Admin Achievement
        Route::resource('achievement',LeaderAchievementController::class);
        Route::post('/achievement/import', [LeaderAchievementController::class,'import'])->name('achievement.import');
        Route::get('/achievement/print/detail/', [LeaderAchievementController::class,'print'])->name('achievement.print');
        Route::get('/achievement/export/pdf/detail/', [LeaderAchievementController::class,'export_pdf'])->name('achievement.export.pdf');
        Route::get('/achievement/export/excel/detail/', [LeaderAchievementController::class,'export_excel'])->name('achievement.export.excel');

        //Admin Achievement Recapitulation
        Route::resource('recapitulation', LeaderRecapitulationController::class);
        Route::get('/achievement/recapitulation/print/', [LeaderRecapitulationController::class,'print'])->name('recapitulation.print');
        Route::get('/achievement/recapitulation/export/pdf/', [LeaderRecapitulationController::class,'export_pdf'])->name('recapitulation.export_pdf');
        Route::get('/achievement/recapitulation/export/excel/', [LeaderRecapitulationController::class,'export_excel'])->name('recapitulation.export_excel');

         //Update Profile
         Route::resource('/profile', LeaderProfileController::class);
    });

    Route::prefix('admin')->middleware(['auth'])->name('admin.')->group(function () {
        //Admin Achievement
        Route::resource('achievement',AchievementController::class);
        Route::post('/achievement/import', [AchievementController::class,'import'])->name('achievement.import');
        Route::get('/achievement/print/detail/', [AchievementController::class,'print'])->name('achievement.print');
        Route::get('/achievement/export/pdf/detail/', [AchievementController::class,'export_pdf'])->name('achievement.export.pdf');
        Route::get('/achievement/export/excel/detail/', [AchievementController::class,'export_excel'])->name('achievement.export.excel');

        //Admin Achievement Recapitulation
        Route::resource('recapitulation', RecapitulationController::class);
        Route::get('/achievement/recapitulation/print/', [RecapitulationController::class,'print'])->name('recapitulation.print');
        Route::get('/achievement/recapitulation/export/pdf/', [RecapitulationController::class,'export_pdf'])->name('recapitulation.export_pdf');
        Route::get('/achievement/recapitulation/export/excel/', [RecapitulationController::class,'export_excel'])->name('recapitulation.export_excel');
        //Admin Employee
        Route::resource('employee',AdminEmployeeController::class);
        Route::get('/employee/print/all', [AdminEmployeeController::class,'print'])->name('employee.print');
        Route::get('/employee/export/excel/', [AdminEmployeeController::class,'export_excel'])->name('employee.export.excel');
        Route::get('/employee/export/pdf/', [AdminEmployeeController::class,'export_pdf'])->name('employee.export.pdf');
        Route::post('/employee/import', [AdminEmployeeController::class,'import'])->name('employee.import');

        //Admin Product
        Route::resource('products',ProductController::class);
        Route::get('/products/print/all', [ProductController::class,'print'])->name('product.print');
        Route::get('/products/export/excel/', [ProductController::class,'export_excel'])->name('product.export.excel');
        Route::get('/products/export/pdf/', [ProductController::class,'export_pdf'])->name('product.export.pdf');
        Route::post('/products/import', [ProductController::class,'import'])->name('product.import');

        //Admin Parcel
        Route::resource('parcel', ParcelController::class);
        Route::post('/parcel/import', [ParcelController::class,'import'])->name('parcel.import');

        //Admin Customer
        Route::resource('customers',CustomerController::class);
        Route::get('/customers/print/all', [CustomerController::class,'print'])->name('customers.print');
        Route::get('/customers/export/excel/', [CustomerController::class,'export_excel'])->name('customers.export.excel');
        Route::get('/customers/export/pdf/', [CustomerController::class,'export_pdf'])->name('customers.export.pdf');

        //Update Profile
        Route::resource('/profile', AdminProfileController::class);
    });   
require __DIR__.'/auth.php';
