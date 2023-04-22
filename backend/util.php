<?php
function log_response($response) {
    // Define the log file path and name
    $log_file = __DIR__ . '/../logs/responses.log';

    // Get the current timestamp
    $timestamp = date('Y-m-d H:i:s');

    // Prepare the log message
    $log_message = "[$timestamp] Response: $response";

    // Append the log message to the log file along with a newline character
    file_put_contents($log_file, $log_message . PHP_EOL, FILE_APPEND);
}
?>
