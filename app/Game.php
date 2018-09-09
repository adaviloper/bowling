<?php

namespace App;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected const FRAMES_PER_GAME = 10;

    protected $casts = [
        'user_id' => 'int'
    ];

    protected $fillable = [
        'complete',
        'score',
        'user_id',
    ];
    
    protected static function boot()
    {
        parent::boot(); // TODO: Change the autogenerated stub
        
        self::deleting(function ($game) {
            $game->frames->each->delete();
        });
    }

    public function calculateScore(Collection $rolls)
    {
        $sum = 0;
        $roll = 0;
        $rolls = $rolls->pluck('pins');

        for ($frame = 1; $frame <= self::FRAMES_PER_GAME; $frame++) {
            if($this->isStrike($rolls, $roll)) {
                $sum += 10 + $this->getStrikeBonus($rolls, $roll);
                $roll++;
            } else if($this->isSpare($rolls, $roll)) {
                $sum += 10 + $this->getSpareBonus($rolls, $roll);
                $roll += 2;
            } else {
                $sum += $this->getDefaultFrameScore($rolls, $roll);
                $roll += 2;
            }
        }

        $this->score = $sum;

        return $this;
    }

    public function frames()
    {
        return $this->hasMany(Frame::class);
    }

    public function path()
    {
        return '/games/' . $this->id;
    }

    private function isStrike(Collection $rolls, int $roll): bool
    {
        return $rolls[$roll] === 10;
    }

    private function isSpare(Collection $rolls, int $roll): bool
    {
        return $rolls[$roll] + $rolls[$roll + 1] === 10;
    }

    private function getStrikeBonus(Collection $rolls, int $roll)
    {
        return $rolls[$roll + 1] + $rolls[$roll + 2];
    }

    private function getSpareBonus(Collection $rolls, int $roll)
    {
        return $rolls[$roll + 2];
    }

    protected function getDefaultFrameScore(Collection $rolls, int $roll): int
    {
        return $rolls[$roll] + $rolls[$roll + 1];
    }
}
