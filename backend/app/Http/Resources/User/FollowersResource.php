<?php

namespace App\Http\Resources\User;

use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class FollowersResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    return [
      'users' => UserResource::collection($this->whenLoaded('followers')),
    ];
  }
}
