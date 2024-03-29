<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Auth::routes();

Route::middleware('auth:api')->get('auth/user', function (Request $request) {
    return [
        'user' => $request->user(),
    ];
});

Route::apiResources([
    'users' => 'UsersController',
    'games' => 'GamesController',
    'games/{game}/rolls' => 'RollsController',
]);
