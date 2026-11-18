<?php
/**
 * Security, Sanitization & Session Helpers for InfinityFree PHP Backend
 */

if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    session_start();
}

/**
 * Sanitize text input to prevent XSS attacks
 */
function sanitize_input($data) {
    if (is_array($data)) {
        return array_map('sanitize_input', $data);
    }
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    return $data;
}

/**
 * Validate Email Format
 */
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

/**
 * Send JSON Response & Exit
 */
function json_response($data, $status_code = 200) {
    http_response_code($status_code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}

/**
 * Get Client IP Address
 */
function get_client_ip() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return sanitize_input($_SERVER['HTTP_CLIENT_IP']);
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return sanitize_input($_SERVER['HTTP_X_FORWARDED_FOR']);
    }
    return sanitize_input($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1');
}

/**
 * Generate CSRF Token
 */
function generate_csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF Token
 */
function verify_csrf_token($token) {
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}
