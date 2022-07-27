<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;

class RegisterUserService
{
    public function __construct(array $user)
    {
        $this->info = array(
            'name' => $user['name'],
            'email' => $user['email'],
            'password' => bcrypt($user['password']),
        );

        if (array_key_exists('type_id', $user)) {
            $this->info['type_id'] = $user['type_id'];
        }
    }

    public function register() : void
    {
        $this->user = User::create($this->info);

        // Store a default avatar
        $this->user->addMedia(public_path('avatar\default.png'))
            ->preservingOriginal()->toMediaCollection('avatar');
        
        Auth::login($this->user);

        event(new Registered($this->user));
    }
}
