<?php
/**
 * InfinityFree MySQL Database Connection Handler
 * Host: sql301.ezyro.com
 * User: ezyro_42491377
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load configuration variables or environment settings
$db_host = getenv('DB_HOST') ?: 'sql301.ezyro.com';
$db_name = getenv('DB_NAME') ?: 'ezyro_42491377_raiyan_db'; // Change to your actual database name in phpMyAdmin
$db_user = getenv('DB_USER') ?: 'ezyro_42491377';
$db_pass = getenv('DB_PASS') ?: ''; // Fill in your vPanel / MySQL password

$pdo = null;

try {
    if (!empty($db_pass) && !empty($db_name)) {
        $dsn = "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, $db_user, $db_pass, $options);
    }
} catch (PDOException $e) {
    // Graceful error capture — script will continue in offline/fallback mode if DB isn't imported yet
    error_log("Database connection failed: " . $e->getMessage());
    $pdo = null;
}

function get_db() {
    global $pdo;
    return $pdo;
}
