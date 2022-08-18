<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;

class FollowController extends Controller
{
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
