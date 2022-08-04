<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Models\Question;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Http\Resources\QuestionResource;
use App\Services\OptionService;

class QuestionController extends Controller
{
  public function index(Category $category)
  {
    return QuestionResource::collection(Question::where('category_id', $category->id)
      ->with('options')->get());
  }

  public function store(StoreQuestionRequest $request, Category $category)
  {
    $category
      ->questions()
      ->create(['value' => $request->value])
      ->options()
      ->createMany($request->options);
    return response()->noContent();
  }

  public function show(Category $category, Question $question)
  {
    return new QuestionResource($category->questions()
      ->find($question->id)->with('options')->first());
  }


  public function update(Category $category, Question $question, UpdateQuestionRequest $request)
  {
    $category->questions()->find($question->id)
      ->update(['value' => $request->value]);
    OptionService::updateOptions($request->options);
    return response()->noContent();
  }

  public function destroy(Category $category, Question $question)
  {
    $category->questions()
      ->find($question->id)->delete();
    return response()->noContent();
  }
}
