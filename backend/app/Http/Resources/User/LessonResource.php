<?php

namespace App\Http\Resources\User;

use App\Http\Resources\OptionResource;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
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
      'id' => $this->question_id,
      'question' => new QuestionResource($this->whenLoaded('question')),
      'answer' => new OptionResource($this->whenLoaded('option')),
      'is_correct' => $this->is_correct,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at
    ];
  }
}
