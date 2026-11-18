<?php
/**
 * Contact Submission API Endpoint
 * Handles contact messages and saves into MySQL `contacts` table.
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/security.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed. Only POST is accepted.'], 405);
}

// Read raw JSON input or standard POST
$raw_input = file_get_contents('php://input');
$input_data = json_decode($raw_input, true) ?: $_POST;

$name = sanitize_input($input_data['name'] ?? '');
$email = sanitize_input($input_data['email'] ?? '');
$subject = sanitize_input($input_data['subject'] ?? '');
$message = sanitize_input($input_data['message'] ?? '');

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    json_response(['error' => 'Please fill in all required fields (Name, Email, Subject, Message).'], 400);
}

if (!validate_email($email)) {
    json_response(['error' => 'Invalid email address provided.'], 400);
}

$client_ip = get_client_ip();
$saved_to_db = false;

// Save to MySQL database if available
$pdo = get_db();
if ($pdo) {
    try {
        $stmt = $pdo->prepare("INSERT INTO `contacts` (`name`, `email`, `subject`, `message`, `ip_address`, `auto_reply_sent`) VALUES (?, ?, ?, ?, ?, 1)");
        $saved_to_db = $stmt->execute([$name, $email, $subject, $message, $client_ip]);
    } catch (PDOException $e) {
        error_log("Failed to insert contact message into MySQL: " . $e->getMessage());
    }
}

// Auto-reply response envelope
$autoReplyBody = "As-salamu alaykum {$name},\n\n"
               . "Thank you for reaching out to Jihadul Islam Raiyan. This is an automated notification confirming that your message has been successfully received and cataloged.\n\n"
               . "Message Subject: \"{$subject}\"\n\n"
               . "Raiyan reviews all consulting inquiries daily. He will respond within 24 hours. For urgent requests, call directly at +8801715432981.\n\n"
               . "Best Regards,\n"
               . "Jihadul Islam Raiyan | Full-Stack Software Engineer\n"
               . "Dhaka, Bangladesh — 1362";

json_response([
    'success' => true,
    'saved_to_db' => $saved_to_db,
    'message' => 'Message lodged successfully.',
    'autoReply' => [
        'to' => $email,
        'subject' => "Re: {$subject} - Raiyan Portfolio Auto-Reply",
        'body' => $autoReplyBody
    ]
]);
