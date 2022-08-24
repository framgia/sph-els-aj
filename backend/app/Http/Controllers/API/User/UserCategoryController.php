<?php

namespace App\Http\Controllers\API\User;

use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserCategoryResource;

class UserCategoryController extends Controller
{
  public function index()
  {
    return UserCategoryResource::collection(Category::withCount('questions')->with('isCategoryTaken')->orderByDesc('created_at')->get());
  }
}
