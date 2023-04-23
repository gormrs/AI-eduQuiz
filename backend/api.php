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


$data = json_decode(file_get_contents("php://input"));
$env_path = __DIR__ . '/../.env';

if (!file_exists($env_path)) {
    http_response_code(500);
    echo json_encode(["message" => "Configuration file not found."]);
    exit();
}

$env = parse_ini_file($env_path);

if (empty($env)) {
    http_response_code(500);
    echo json_encode(["message" => "Configuration is invalid or empty."]);
    exit();
}

if (empty($data->text)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input."]);
    exit();
}

if (!function_exists('generate_content')) {
    http_response_code(500);
    echo json_encode(["message" => "Required function 'generate_content' is missing."]);
    exit();
}


$summary_system_message = "Lag et sammendrag av en artikkel på norsk på 1 til 2 paragrafer. Start sammendraget direkte med hovedpoenget uten å bruke formuleringen artikkelen tar for seg.";
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

?>
