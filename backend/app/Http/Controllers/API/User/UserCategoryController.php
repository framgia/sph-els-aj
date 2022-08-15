<?php

namespace App\Http\Controllers\Api\User;

use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\LessonResource;

class UserCategoryController extends Controller
{
  public function index()
  {
    return LessonResource::collection(Category::orderBy('created_at', 'desc')->get());
  }
}
