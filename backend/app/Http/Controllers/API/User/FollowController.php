<?php

namespace App\Http\Controllers\API\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\ActivityLogService;
use App\Http\Resources\FollowingResource;
use App\Http\Resources\User\FollowResource;
use App\Http\Resources\User\FollowersResource;

class FollowController extends Controller
{
  public function getFollowers(User $user)
  {
    return new FollowersResource(User::with(['followers.avatar', 'followers'])->find($user->id));
  }

  public function getFollowing(User $user)
  {
    return new FollowingResource(User::with(['following.avatar', 'following'])->find($user->id));
  }

  public function store(Request $request)
  {
    auth()->user()->following()->attach($request->idToFollow);
    ActivityLogService::logFollow($request->idToFollow);
    return response()->noContent();
  }

  public function destroy(User $follow)
  {
    auth()->user()->following()->detach($follow->id);
    return response()->noContent();
  }
}
