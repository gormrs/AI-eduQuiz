<?php
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

if (!empty($data->text)) {
    // Process the text, generate summary and quiz
    // Replace the following example code with your actual processing logic
    $summary = "This is a generated summary about your text " . $data->text;
    $quiz = ["Question 1", "Question 2", "Question 3"];

    http_response_code(200);
    echo json_encode(["summary" => $summary, "quiz" => $quiz]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input."]);
}
?>
