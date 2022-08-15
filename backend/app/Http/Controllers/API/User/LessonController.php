<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\QuestionResource;
use App\Models\Category;
use App\Models\Question;
use Illuminate\Http\Request;

class LessonController extends Controller
{
  public function index(Category $category)
  {
    return QuestionResource::collection(Question::where('category_id', $category->id)
      ->with('options')->get());
  }

  public function store(Category $category, Request $request)
  {
    // TODO: Will provide functionality in another task
  }

  public function show(Category $category)
  {
    // TODO: Will provide functionality in another task
  }
}
