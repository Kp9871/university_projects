<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ViewController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CharacterController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/dashboard', [ViewController::class, 'dashboard'])->name('dashboard');
Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
Route::get('/email/verify', [EmailVerificationPromptController::class, '__invoke'])->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])->name('verification.verify');
Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->name('verification.send');
Route::patch('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
Route::put('/password/update', [PasswordController::class, 'update'])->name('password.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/', [ViewController::class, 'index'])->name('index');
Route::get('/personalCharacters/{userId}', [ViewController::class, 'personalCharacters'])->name('personalCharacters');
Route::get('/all-characters', [ViewController::class, 'allCharacters'])->name('allCharacters');

Route::get('/createCharacter', [CharacterController::class, 'create'])->name('createCharacter');
Route::post('/characters', [CharacterController::class, 'store'])->name('characters/store');
Route::get('/characters/{character}/details', [CharacterController::class, 'index'])->name('detailedCharacter');
Route::get('/editCharacter/{character}', [CharacterController::class, 'edit'])->name('editCharacter');
Route::put('/characters/{character}', [CharacterController::class, 'update'])->name('characters.update');
Route::delete('/characters/{character}', [CharacterController::class, 'destroy'])->name('characters.destroy');
Route::get('/places', [PlaceController::class, 'index'])->name('places');
Route::get('/createPlace', [PlaceController::class, 'create'])->name('createPlace');
Route::post('/places', [PlaceController::class, 'store'])->name('places.store');
Route::get('/editPlace/{place}', [PlaceController::class, 'edit'])->name('editPlace');
Route::put('/places/{place}', [PlaceController::class, 'update'])->name('places.update');
Route::delete('/places/{place}', [PlaceController::class, 'destroy'])->name('places.destroy');
