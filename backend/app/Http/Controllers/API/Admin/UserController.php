<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::with(['type', 'avatar'])->get());
    }


    public function show(User $user)
    {
        return new UserResource(User::with(['type', 'avatar'])->find($user->id));
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        return response()->json([
            'user' => $user,
            'message' => 'User has been updated'
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'message' => 'User has been deleted'
        ]);
    }
}
