<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('get-students', [StudentController::class, 'index']);
Route::post('get-student-login', [StudentController::class, 'getLogin']);

Route::controller(UserController::class)->group(function () {
    Route::post('signup-user', 'store')->name('signup.user');
    Route::post('user-login', 'userLogin')->name('user.login');
    Route::post('forgot-password', 'forgotPassword')->name('forgot.password');
    Route::post('check-email', 'checkEmail')->name('check.email');
});
