<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class GameUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $game = $this->route('game');

        return $game->user_id === auth()->id();
    }

    public function messages(): array
    {
        return [
            'rolls.array' => 'Rolls must be an array.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'rolls' => 'array',
            'score' => 'integer|min:0|max:300',
        ];
    }
}
