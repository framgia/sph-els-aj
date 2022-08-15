<?php

namespace App\Http\Resources\User;

use App\Http\Resources\AvatarResource;
use App\Http\Resources\TypeResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'type' => new TypeResource($this->whenLoaded('type')),
            'avatar' => new AvatarResource($this->whenLoaded('avatar')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];;
    }
}
