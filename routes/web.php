<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::prefix('notes')->controller(NoteController::class)->group(function () {
    Route::get('/', 'index')->name('notes.index');
    Route::patch('/{note}/favorite', 'toggleFavorite')->name('notes.favorite')->middleware('auth');
    Route::get('/create', 'create')->name('notes.create')->middleware('auth');
    Route::post('/create', 'store')->name('notes.store')->middleware('auth');
    Route::get('/{note}', 'show')->name('notes.show');
    Route::get('/{note}/edit', 'edit')->name('notes.edit')->middleware('auth');
    Route::patch('/{note}', 'update')->name('notes.update')->middleware('auth');
    Route::delete('/{note}', 'destroy')->name('notes.delete')->middleware('auth');
});

Route::prefix('hall-of-fame')->controller(ProjectController::class)->group(function () {
    Route::get('/', 'index')->name('hall.index');
    Route::get('/create', 'create')->name('hall.create')->middleware('auth');
    Route::post('/create', 'store')->name('hall.store')->middleware('auth');
    Route::get('/{project}/edit', 'edit')->name('hall.edit')->middleware('auth');
    Route::patch('/{project}', 'update')->name('hall.update')->middleware('auth');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
