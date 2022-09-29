<?php

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


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('todos')->name('todos')->uses('\App\Http\Controllers\TodoController@index')->middleware('verified', 'auth');

Route::post('todos/create',[\App\Http\Controllers\TodoController::class,'create'])->name('todos.create')->middleware('auth');
Route::get('todos/{id}',[\App\Http\Controllers\TodoController::class,'show'])->name('todos.show')->middleware('auth');
Route::delete('todos/{id}',[\App\Http\Controllers\TodoController::class,'destroy'])->name('todos.destroy')->middleware('auth');

require __DIR__.'/auth.php';
