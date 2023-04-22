<?php
require_once 'util.php';

// Set response headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle OPTIONS request for preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

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

$data = json_decode(file_get_contents("php://input"));
$env_path = __DIR__ . '/../.env';
$env = parse_ini_file($env_path);
error_log("data: " . print_r($data, true));

if (!empty($data->text)) {
    $summary_system_message = "Du er en AI-assistent som skal lage et konsist sammendrag av en artikkel på norsk på 1 til 2 paragrafer. Start sammendraget direkte med hovedpoenget uten å bruke formuleringen artikkelen tar for seg.";
    $quiz_system_message = " Lag så en quiz med 4 spørsmål og svaralternativer på dette formatet og bare på dette formatet: 
        [
          {
        \"question\": \"Hva er hovedpoenget i artikkelen?\",
        \"choices\": [
            {
            \"text: spørsmål\",
            \"correct: boolean\",
            },
        ],
     }";

    $summary_response = generate_content($summary_system_message, $data->text, $env);
    $quiz_response = generate_content($quiz_system_message, $data->text, $env);

    $summary_decoded = json_decode($summary_response, true);
    $quiz_decoded = json_decode($quiz_response, true);

    $summary_content = $summary_decoded['choices'][0]['message']['content'];
    $quiz_content = $quiz_decoded['choices'][0]['message']['content'];
    

    http_response_code(200);
    echo json_encode(["summary" => $summary_content, "quiz" => $quiz_content]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input."]);
}
?>
