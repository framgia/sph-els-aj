<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;

class TopicsLearnedController extends Controller
{
  public function index()
  {
    return new UserResource(User::with([
      'answers.category',
      'answers.option',
      'answers.question.isCorrectOption'
    ])->find(auth()->user()->id));
  }
}
