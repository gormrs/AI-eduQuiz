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

    // Get the current timestamp
    $timestamp = date('Y-m-d H:i:s');

    // Prepare the log message
    $log_message = "[$timestamp] Response: $response";

    // Append the log message to the log file along with a newline character
    file_put_contents($log_file, $log_message . PHP_EOL, FILE_APPEND);
}

?>
