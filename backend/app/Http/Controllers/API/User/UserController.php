<?php

namespace App\Http\Controllers\API\User;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
  public function index()
  {
    return UserResource::collection(User::with(['type', 'avatar', 'isFollowed'])
      ->whereNot('type_id', 1)->whereNot('id', auth()->user()->id)->get());
  }

  public function show(User $profile)
  {
    return new UserResource(User::withCount(['following', 'followers', 'answers'])
      ->with(['type', 'avatar', 'isFollowed', 'activityLogs'])
      ->find($profile->id));
  }

  public function update(UpdateUserRequest $request, User $profile)
  {
    $profile->update($request->validated());
    return response()->noContent();
  }
}
