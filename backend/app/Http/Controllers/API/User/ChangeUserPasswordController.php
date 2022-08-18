<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ChangeUserPasswordRequest;

class ChangeUserPasswordController extends Controller
{
  public function update(ChangeUserPasswordRequest $request)
  {
    auth()->user()->update(['password' => Hash::make($request->newPassword)]);
    return response()->noContent();
  }
}
