<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustHosts as Middleware;

/** @codeCoverageIgnore  */
class TrustHosts extends Middleware
{
    /**
     * Get the host patterns that should be trusted.
     *
     * @return array
     */
    public function hosts()
    {
        return tap(collect(), function ($hosts) {
            if (app()->environment() === 'local') {
                $hosts->push('localhost');
            }
            $hosts->push($this->allSubdomainsOfApplicationUrl());
        })->all();
    }
}
