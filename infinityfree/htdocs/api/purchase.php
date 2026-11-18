<?php
/**
 * Order Purchase & Invoice Generator API Endpoint
 * Handles service orders and saves into MySQL `orders` table.
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
$phone = sanitize_input($input_data['phone'] ?? '');
$planName = sanitize_input($input_data['planName'] ?? '');
$categoryTitle = sanitize_input($input_data['categoryTitle'] ?? '');
$price = sanitize_input($input_data['price'] ?? '');
$requirements = sanitize_input($input_data['requirements'] ?? '');

if (empty($name) || empty($email) || empty($phone) || empty($planName) || empty($price)) {
    json_response(['error' => 'Missing required order parameters (Name, Email, Phone, Plan Name, Price).'], 400);
}

if (!validate_email($email)) {
    json_response(['error' => 'Invalid email address.'], 400);
}

// Generate secure Invoice Order ID
$orderId = 'LFS-ORD-' . rand(100000, 999999);
$timestamp = date('c');
$client_ip = get_client_ip();
$saved_to_db = false;

// Save to MySQL database if available
$pdo = get_db();
if ($pdo) {
    try {
        $stmt = $pdo->prepare("INSERT INTO `orders` (`order_id`, `client_name`, `client_email`, `client_phone`, `category_title`, `plan_name`, `price`, `requirements`, `status`, `ip_address`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)");
        $saved_to_db = $stmt->execute([$orderId, $name, $email, $phone, $categoryTitle, $planName, $price, $requirements, $client_ip]);
    } catch (PDOException $e) {
        error_log("Failed to insert order into MySQL: " . $e->getMessage());
    }
}

json_response([
    'success' => true,
    'orderId' => $orderId,
    'saved_to_db' => $saved_to_db,
    'timestamp' => $timestamp,
    'invoiceDetail' => [
        'clientName' => $name,
        'clientEmail' => $email,
        'clientPhone' => $phone,
        'planName' => $planName,
        'categoryTitle' => $categoryTitle,
        'totalPrice' => $price,
        'paymentTerms' => 'Direct Discussion / Contact Raiyan directly',
        'specialInstructions' => !empty($requirements) ? $requirements : 'No special requests attached.'
    ]
]);
