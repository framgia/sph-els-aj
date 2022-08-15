<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\FollowResource;
use App\Models\User;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;

class FollowController extends Controller
{
  public function index()
  {
    return new FollowResource(User::withCount(['following', 'followers'])
      ->with(['following', 'followers'])
      ->find(auth()->user()->id));
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
