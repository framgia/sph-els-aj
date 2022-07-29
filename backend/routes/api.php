<?php

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\User\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/auth', function (Request $request) {
    return new UserResource(User::with(['type', 'avatar'])->find($request->user()->id));
});

// ADD: PROTECTION TO API
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::apiResource('user', UserController::class)->except(['store']);
});
