<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserAvatarRequest;

class UpdateUserAvatarController extends Controller
{
  public function update(UpdateUserAvatarRequest $request)
  {
    if ($request->hasFile('avatar')) {
      auth()->user()->addMedia($request->file('avatar'))->toMediaCollection('avatar');
    }
    return response()->noContent();
  }
}
