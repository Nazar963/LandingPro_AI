<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class LandingPageController extends Controller
{
    private $httpClient;
    private $aiServiceUrl;

    public function __construct()
    {
        $this->httpClient = new Client([
            'timeout' => 120, // 2 minutes timeout for AI generation
            'connect_timeout' => 30,
        ]);
        
        // URL to your existing Flask AI service
        $this->aiServiceUrl = env('AI_SERVICE_URL', 'http://localhost:5000');
    }

    /**
     * Generate landing page with company context
     */
    public function generate(Request $request)
    {
        $this->validate($request, [
            'prompt' => 'required|string|min:10|max:2000',
            'company_info' => 'sometimes|array',
            'company_info.name' => 'sometimes|string|max:255',
            'company_info.colors' => 'sometimes|string|max:255',
            'company_info.logo' => 'sometimes|url|max:255',
            'company_info.description' => 'sometimes|string|max:1000',
            'company_info.purpose' => 'sometimes|string|max:255'
        ]);

        try {
            $response = $this->httpClient->post($this->aiServiceUrl . '/generate', [
                'json' => [
                    'prompt' => $request->input('prompt'),
                    'company_info' => $request->input('company_info', [])
                ],
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json'
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            return response()->json([
                'success' => true,
                'webpage' => $data['webpage'] ?? '',
                'message' => 'Landing page generated successfully'
            ]);

        } catch (RequestException $e) {
            $statusCode = $e->getResponse() ? $e->getResponse()->getStatusCode() : 500;
            $errorMessage = 'Failed to generate landing page';
            
            if ($e->getResponse()) {
                $errorBody = json_decode($e->getResponse()->getBody(), true);
                $errorMessage = $errorBody['error'] ?? $errorMessage;
            }

            return response()->json([
                'success' => false,
                'message' => $errorMessage,
                'error' => $e->getMessage()
            ], $statusCode);
        }
    }

    /**
     * Generate simple landing page
     */
    public function generateSimple(Request $request)
    {
        $this->validate($request, [
            'prompt' => 'required|string|min:10|max:2000'
        ]);

        try {
            $response = $this->httpClient->post($this->aiServiceUrl . '/generate_page', [
                'json' => [
                    'prompt' => $request->input('prompt')
                ],
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json'
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            return response()->json([
                'success' => true,
                'webpage' => $data['webpage'] ?? '',
                'message' => 'Simple landing page generated successfully'
            ]);

        } catch (RequestException $e) {
            $statusCode = $e->getResponse() ? $e->getResponse()->getStatusCode() : 500;
            $errorMessage = 'Failed to generate landing page';
            
            if ($e->getResponse()) {
                $errorBody = json_decode($e->getResponse()->getBody(), true);
                $errorMessage = $errorBody['error'] ?? $errorMessage;
            }

            return response()->json([
                'success' => false,
                'message' => $errorMessage,
                'error' => $e->getMessage()
            ], $statusCode);
        }
    }

    /**
     * Get generation history (placeholder - implement with database if needed)
     */
    public function getHistory(Request $request)
    {
        // This is a placeholder - you can implement database storage later
        return response()->json([
            'success' => true,
            'data' => [],
            'message' => 'History feature coming soon'
        ]);
    }

    /**
     * Save generated page (placeholder - implement with database if needed)
     */
    public function savePage(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'html' => 'required|string'
        ]);

        // This is a placeholder - you can implement database storage later
        return response()->json([
            'success' => true,
            'message' => 'Page saved successfully'
        ]);
    }

    /**
     * Health check endpoint
     */
    public function healthCheck()
    {
        try {
            // Check if AI service is reachable
            $response = $this->httpClient->get($this->aiServiceUrl . '/health', [
                'timeout' => 5
            ]);
            
            $aiServiceStatus = $response->getStatusCode() === 200 ? 'healthy' : 'unhealthy';
        } catch (RequestException $e) {
            $aiServiceStatus = 'unreachable';
        }

        return response()->json([
            'success' => true,
            'status' => 'healthy',
            'services' => [
                'backend' => 'healthy',
                'ai_service' => $aiServiceStatus
            ],
            'timestamp' => date('c')
        ]);
    }
}
