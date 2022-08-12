<?php

namespace App\Http\Controllers\API\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Request;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::with(['type', 'avatar'])
            ->whereNot('type_id', 1)->whereNot('id', auth()->user()->id)->get());
    }

    public function store(Request $request)
    {
        /* TODO: This function is for following a user, will
        implement functionality in another task */
    }

    public function destroy(User $user)
    {
        /* TODO: This function is for unfollowing a user, will
        implement functionality in another task */
    }
}
