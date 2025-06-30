<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return response()->json([
        'message' => 'LandingPro AI Backend API',
        'version' => $router->app->version(),
        'status' => 'running'
    ]);
});

// API Routes
$router->group(['prefix' => 'api'], function () use ($router) {
    
    // Health check
    $router->get('health', 'LandingPageController@healthCheck');
    
    // Landing page generation
    $router->post('generate', 'LandingPageController@generate');
    $router->post('generate-simple', 'LandingPageController@generateSimple');
    
    // History and storage (placeholder)
    $router->get('history', 'LandingPageController@getHistory');
    $router->post('save-page', 'LandingPageController@savePage');
});
