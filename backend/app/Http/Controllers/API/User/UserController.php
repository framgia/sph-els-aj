<?php

namespace App\Http\Controllers\API\User;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\User\UserResource;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::with(['type', 'avatar'])
            ->whereNot('type_id', 1)->whereNot('id', auth()->user()->id)->get());
    }

    public function show(User $user)
    {
        return new UserResource(User::with(['type', 'avatar'])->find($user->id));
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        return response()->noContent();
    }
}
