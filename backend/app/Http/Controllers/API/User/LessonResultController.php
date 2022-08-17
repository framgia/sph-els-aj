<?php

namespace App\Http\Controllers\Api\User;

use App\Models\Lesson;
use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\LessonResource;

class LessonResultController extends Controller
{
  public function show(Category $lesson_result)
  {
    return LessonResource::collection(Lesson::where('category_id', $lesson_result->id)
      ->where('user_id', auth()->user()->id)
      ->first()->answers()->with(['question', 'option'])->get());
  }
}
