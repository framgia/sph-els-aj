<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\AuthActivityLogsResource;
use App\Services\ActivityLogService;

class ActivityLogsController extends Controller
{
  public function index()
  {
    return AuthActivityLogsResource::collection(ActivityLogService::getLogs());
  }
}
