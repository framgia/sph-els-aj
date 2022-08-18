<?php

namespace App\Http\Controllers\Api\User;

use App\Models\Lesson;
use App\Models\Category;
use App\Models\Question;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnswerRequest;
use App\Http\Resources\User\QuestionResource;
use App\Services\ActivityLogService;

class LessonController extends Controller
{
  public function index(Category $category)
  {
    return QuestionResource::collection(Question::where('category_id', $category->id)
      ->with('options')->get());
  }

  public function store(Category $category, StoreAnswerRequest $request)
  {
    Lesson::create([
      'category_id' => $category->id,
      'user_id' => auth()->user()->id
    ])->answers()->createMany($request->validated());
    ActivityLogService::logLearned($category, $request->validated());
    
    return response()->noContent();
  }
}
