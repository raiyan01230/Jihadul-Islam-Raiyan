<?php
/**
 * AI Copilot & Chatbot API Endpoint for InfinityFree
 * Connects to Google Gemini API via cURL with intelligent rule-based fallback logic.
 */

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/security.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed. Only POST is accepted.'], 405);
}

// Read input
$raw_input = file_get_contents('php://input');
$input_data = json_decode($raw_input, true) ?: $_POST;

$message = sanitize_input($input_data['message'] ?? '');
if (empty($message)) {
    json_response(['error' => 'Message is required.'], 400);
}

/**
 * Intelligent Rule-Based Fallback Synthesis
 */
function get_rule_based_response($msg) {
    $lower = mb_strtolower($msg, 'UTF-8');

    if (strpos($lower, 'certif') !== false || strpos($lower, 'credential') !== false || strpos($lower, 'education') !== false) {
        return "Jihadul Islam Raiyan has achieved professional-grade certifications confirming his expertise:\n\n"
             . "1. **C Programming Certificate of Achievement** (SoloLearn, Oct 2024) — Deep comprehension of algorithms, memory structures, pointers, and performance optimization.\n"
             . "2. **Responsive Web Design Certificate** (freeCodeCamp, Jan 2025) — Mastery of HTML5/CSS3, fluid typography, flexbox/grid layout, and responsive mobile-first UI.\n"
             . "3. **Full-Stack Software Development Specialization** (The Little Flower School Tech Hub, Feb 2025) — Expertise in full-stack architecture, backend routing (PHP/Node.js), and Firebase database modeling.\n\n"
             . "You can inspect any of these verified credentials with their live seal directly in the Credentials section above!";
    }

    if (strpos($lower, 'project') !== false || strpos($lower, 'work') !== false || strpos($lower, 'portfolio') !== false || strpos($lower, 'umrah') !== false || strpos($lower, 'gaze') !== false || strpos($lower, 'jannah') !== false) {
        return "Raiyan's featured projects are built with technical precision, high-contrast layouts, and responsive components:\n\n"
             . "• **Umrah Savings Planner**: A specialized budgeting tracker with emerald-gold themes and offline synchronization patterns for tracking pilgrimage funds.\n"
             . "• **Lower Your Gaze Reminder**: An interactive spiritual eye exercise companion featuring screen-time wellness trackers and motivational quotes.\n"
             . "• **The Way of Jannah**: An AI-guided companion portal incorporating prayer logs, Jannah progress roadmaps, and rich Islamic database structures.\n\n"
             . "All of these are fully responsive and linked live on this page in the Projects grid!";
    }

    if (strpos($lower, 'firebase') !== false || strpos($lower, 'database') !== false || strpos($lower, 'sql') !== false || strpos($lower, 'mysql') !== false) {
        return "Raiyan possesses expert-level Database capabilities! He designs scalable hybrid database architectures:\n\n"
             . "• **MySQL & PHP**: Structured relational database schemas (PDO, prepared statements, bcrypt hashing, normalized tables) optimized for shared hosting environments like InfinityFree.\n"
             . "• **Cloud Firestore**: For real-time document stores (such as admission records, certificates, audit logs).\n"
             . "• **Firebase Storage**: Securely handles raw file uploads, including student pictures, ID cards, PDF receipts, and transcript certificates.";
    }

    if (strpos($lower, 'contact') !== false || strpos($lower, 'hire') !== false || strpos($lower, 'email') !== false || strpos($lower, 'phone') !== false) {
        return "You can get in touch with Jihadul Islam Raiyan immediately! He reviews engineering offers and consulting invitations daily:\n\n"
             . "📧 **Email Inbox:** raiyan3945@gmail.com\n"
             . "📞 **Direct Line / WhatsApp:** +8801715432981\n"
             . "📍 **Location:** Dhaka, Bangladesh\n\n"
             . "Feel free to fill out the **Direct Message Portal** on this page to log a secure message or purchase a service package!";
    }

    return "As-salamu alaykum! I am Jihadul Islam Raiyan's portfolio AI representative.\n\n"
         . "Raiyan is a **Programmer & Full-Stack Developer** based in Dhaka, Bangladesh. He specializes in building secure, polished web applications with React, PHP, Tailwind CSS, MySQL, and Firebase.\n\n"
         . "You can ask me about his **projects**, **certified credentials**, **database architecture expertise**, or how to **contact** him directly!";
}

$reply = null;
$model_used = 'rule-engine';
$api_key = getenv('GEMINI_API_KEY');

// Attempt Gemini API call via cURL if API key exists
if (!empty($api_key)) {
    $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" . urlencode($api_key);
    
    $system_prompt = "You are Jihadul Islam Raiyan's AI Assistant. Raiyan is a Full-Stack Software Developer in Dhaka, Bangladesh (+8801715432981, raiyan3945@gmail.com). Tech stack: React, TypeScript, PHP, MySQL, Firebase, C. Answer questions helpfully and politely.";
    
    $payload = [
        "contents" => [
            [
                "role" => "user",
                "parts" => [
                    ["text" => $system_prompt . "\n\nUser Question: " . $message]
                ]
            ]
        ]
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response_json = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code === 200 && !empty($response_json)) {
        $res = json_decode($response_json, true);
        if (isset($res['candidates'][0]['content']['parts'][0]['text'])) {
            $reply = $res['candidates'][0]['content']['parts'][0]['text'];
            $model_used = 'gemini-2.5-flash';
        }
    }
}

// Fallback to Rule-based response if cURL failed or no API key
if (empty($reply)) {
    $reply = get_rule_based_response($message);
}

// Log interaction to MySQL if DB active
$pdo = get_db();
if ($pdo) {
    try {
        $stmt = $pdo->prepare("INSERT INTO `ai_chat_logs` (`user_message`, `ai_response`, `model_used`, `ip_address`) VALUES (?, ?, ?, ?)");
        $stmt->execute([$message, $reply, $model_used, get_client_ip()]);
    } catch (PDOException $e) {
        error_log("Failed to log AI chat into MySQL: " . $e->getMessage());
    }
}

json_response([
    'reply' => $reply,
    'model' => $model_used
]);
