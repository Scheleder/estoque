<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PDFController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    if(auth()->user()){
        return redirect('/dashboard');
    }else{
        return view('welcome');
    }
});

/* Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard'); */

Route::get('/dashboard', [ProfileController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/logs', [ProfileController::class, 'logs'])->name('logs');
    Route::get('/colors', [ProfileController::class, 'colors'])->name('colors');
    Route::get('/notepad', [ProfileController::class, 'notepad'])->name('notepad');
    Route::patch('/notepad/update', [ProfileController::class, 'notesUpdate'])->name('notes.update');

    Route::get('generate-pdf', [PDFController::class, 'generatePDF']);

    Route::get('/products', [ProductController::class, 'getAll'])->name('product.all');
    Route::get('/products/ord/{ord}', [ProductController::class, 'getOrd'])->name('product.ord');
    Route::get('/product/{id}', [ProductController::class, 'getOne'])->name('product.one');
    Route::post('/product/add', [ProductController::class, 'add'])->name('product.add');
    Route::post('/product/update', [ProductController::class, 'update'])->name('product.update');
    Route::get('/product/remove/{id}', [ProductController::class, 'remove'])->name('product.remove');

    Route::get('/categories', [CategoryController::class, 'getAll'])->name('category.all');
    Route::get('/category/{id}', [CategoryController::class, 'getOne'])->name('category.one');
    Route::post('/category/add', [CategoryController::class, 'add'])->name('category.add');
    Route::post('/category/update', [CategoryController::class, 'update'])->name('category.update');
    Route::get('/category/remove/{id}', [CategoryController::class, 'remove'])->name('category.remove');

});

require __DIR__.'/auth.php';
