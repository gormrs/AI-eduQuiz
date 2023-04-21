<?php
require_once 'util.php';
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
$env = parse_ini_file($env_path);


if (!empty($data->text)) {
    
    $url = "https://api.openai.com/v1/chat/completions" 
    ;
    
    $message = json_encode([
        "model" => "gpt-3.5-turbo",
        "messages" => [
            [
            "role" => "system", 
            "content" => "Du er en AI-assistent som skal lage et kort og konsist sammendrag av en artikkel på norsk på 1 til 2 paragrafer. Start sammendraget direkte med hovedpoenget uten å bruke formuleringen artikkelen tar for seg.",
        ],
            [
            "role" => "user", 
            "content" => "Her er artikkelen: ". $data->text]
        ],
        "temperature" => 0.7
    ]);
    // Initialize cURL session
    $curl = curl_init();

    // Set cURL options
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $message);
    curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $env['OPENAI_KEY']
    ]); 

    // Execute the cURL session and get the response
    $response = curl_exec($curl);

    // Check for cURL errors
    if (curl_errno($curl)) {
        $error_msg = curl_error($curl);
        echo "Error: $error_msg";
    } else {
        // Decode the response
        $response_decoded = json_decode($response, true);

        // Extract the message content
        $message_content = $response_decoded['choices'][0]['message']['content'];
        log_response($response);
    }
    
 
    // Close cURL session
    curl_close($curl);
    $quiz = ["Question 1", "Question 2", "Question 3"];

    http_response_code(200);
    echo json_encode(["summary" => $message_content, "quiz" => $quiz]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input."]);
}
?>
