<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\QuestionController;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\User\UserController;
use App\Http\Controllers\API\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\User\ActivityLogsController;
use App\Http\Controllers\Api\User\FollowController;
use App\Http\Controllers\Api\User\UserCategoryController;

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
  Route::group(['prefix' => 'admin'], function () {
    Route::apiResource('user', AdminUserController::class)->only(['index']);
    Route::apiResource('category', CategoryController::class);
    Route::apiResource('category.question', QuestionController::class);
  });
  Route::group(['prefix' => 'user'], function () {
    Route::apiResource('/', UserController::class)->except(['store', 'destroy']);
    Route::apiResource('follow', FollowController::class)->only(['index', 'store', 'destroy']);
    Route::apiResource('category', UserCategoryController::class)->only(['index']);
    Route::get('activity-logs', [ActivityLogsController::class, 'index']);
  });
});
