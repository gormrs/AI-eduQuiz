<?php
function log_response($response) {
    // Define the log directory path and log file path
    $log_dir = __DIR__ . '/../logs';
    $log_file = $log_dir . '/responses.log';

    // Check if the log directory exists, if not, create it
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0777, true);
    }

    // Check if the log file exists, if not, create it
    if (!file_exists($log_file)) {
        touch($log_file);
    }

    $timestamp = date('Y-m-d H:i:s');

    // Prepare the log message
    $log_message = "[$timestamp] Response: $response";

    // Append the log message to the log file along with a newline character
    file_put_contents($log_file, $log_message . PHP_EOL, FILE_APPEND);
}

// Function to generate content using OpenAI's GPT-3 API
// Uses cURL to send a POST request to the OpenAI API
// $system_message: The system message to be sent to OpenAI
// $data_text: The text to be sent to OpenAI
// $env: The environment variables
function generate_content($system_message, $data_text, $env) {
    $url = "https://api.openai.com/v1/chat/completions";
    $message = json_encode([
        "model" => "gpt-3.5-turbo",
        "messages" => [
            [
                "role" => "system",
                "content" => $system_message
            ],
            [
                "role" => "user",
                "content" => "Her er artikkelen: " . $data_text
            ]
        ],
        "temperature" => 0.7
    ]);

    // Initialize cURL session
    $curl = curl_init();

    // Set cURL options
    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_POST => 1,
        CURLOPT_POSTFIELDS => $message,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $env['OPENAI_KEY']
        ]
    ]);

    // Execute the cURL session and get the response
    $response = curl_exec($curl);
    log_response($response);
    curl_close($curl);

    return $response;
}

?>
