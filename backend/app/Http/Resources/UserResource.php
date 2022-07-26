<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User\ProfileActivityLogsResource;

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
            'following' => $this->when(isset($this->following_count), $this->following_count),
            'followers' => $this->when(isset($this->followers_count), $this->followers_count),
            'activityLogs' => ProfileActivityLogsResource::collection($this->whenLoaded('activityLogs')),
            'topicsLearned' => $this->when(isset($this->answers_count), $this->answers_count),
            'lessonsLearned' => $this->when(isset($this->lessons_count), $this->lessons_count),
            'lessons' => TopicsLearnedResource::collection($this->whenLoaded('answers')),
            'is_followed' => $this->whenLoaded('isFollowed'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
