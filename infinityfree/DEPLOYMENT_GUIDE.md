# InfinityFree Deployment & FTP Guide for The Little Flower School & Raiyan Portfolio

**Main Domain:** `b061c4.ezyro.com`  
**FTP Host:** `ftpupload.net`  
**FTP Username:** `ezyro_42491377`  
**MySQL Host:** `sql301.ezyro.com`  
**MySQL Username:** `ezyro_42491377`  

---

## 📁 Package Architecture Overview

Because InfinityFree Free Hosting is shared Apache + PHP + MySQL hosting, persistent Node.js background servers cannot run. Therefore:

1. **Frontend:** React + Vite + Tailwind CSS is compiled into static production assets (`dist/`).
2. **Backend:** Re-architected into modular **PHP 8.x endpoints** with PDO prepared statements and security helpers:
   - `api/contact.php` — Contact form submissions & auto-reply payloads
   - `api/purchase.php` — Service order placement & invoice generator
   - `api/chat.php` — AI Copilot with Gemini REST cURL integration & offline fallback
   - `config/db.php` — MySQL database connection with UTF-8 (`utf8mb4`) encoding
   - `includes/security.php` — Anti-XSS, CSRF token, and IP resolution functions
   - `.htaccess` — SPA routing fallback, `.php` extension rewrites, Gzip, and security headers

---

## 🛠️ Step 1: Export Database Schema (`database.sql`)

1. Log in to your **InfinityFree Control Panel (vPanel)**.
2. Go to **MySQL Databases** and create a new database (e.g. `ezyro_42491377_raiyan_db`).
3. Click **phpMyAdmin** next to the newly created database.
4. Select the database from the left sidebar and click on the **Import** tab at the top.
5. Click **Choose File** and select `infinityfree/database.sql` from this project.
6. Click **Go** at the bottom. This creates all 6 tables (`users`, `contacts`, `orders`, `projects`, `certificates`, `ai_chat_logs`) with indexes, constraints, and default seed data.

---

## 🔑 Step 2: Configure Database Credentials

Open `htdocs/config/db.php` (or set environment variables in vPanel) and update the credentials:

```php
$db_host = 'sql301.ezyro.com';
$db_name = 'ezyro_42491377_raiyan_db'; // Your actual database name
$db_user = 'ezyro_42491377';
$db_pass = 'YOUR_MYSQL_PASSWORD';      // Your InfinityFree account password
```

---

## 🚀 Step 3: Build Production Bundle & Merge PHP Backend

Run the build command locally or let Vite build:
```bash
npm run build
```
Then merge the static compiled `dist/` files into your `htdocs/` directory alongside the `api/`, `config/`, `includes/`, and `.htaccess` files.

---

## 📤 Step 4: FTP Upload Instructions (FileZilla / WinSCP)

1. Open your FTP client (e.g., FileZilla or WinSCP).
2. Enter the connection parameters:
   - **Host:** `ftpupload.net` (Port 21)
   - **Username:** `ezyro_42491377`
   - **Password:** *Your InfinityFree account password*
3. Connect and navigate to the remote directory: `/b061c4.ezyro.com/htdocs/` (or `/htdocs/`).
4. Upload all contents from the `infinityfree/htdocs/` folder directly into `/htdocs/`.

---

## 🌐 Step 5: Verification & Launch

Once the upload completes, visit `http://b061c4.ezyro.com/`:
- **Main Website:** React Single Page Application loads smoothly with animations.
- **Direct Message Portal:** Submitting a message triggers `api/contact.php`, saves the record into MySQL, and displays the auto-reply envelope.
- **Service Package Order:** Submitting a package order triggers `api/purchase.php`, generates a unique `LFS-ORD-XXXXXX` invoice, and logs the order to MySQL.
- **AI Copilot:** Chatting triggers `api/chat.php` with cURL / rule-engine synthesis.

---

## 🛡️ Security Features Included

- **SQL Injection Prevention:** 100% prepared statements via PDO (`PDO::prepare()`).
- **XSS Defense:** Context-aware `htmlspecialchars()` and input sanitization (`includes/security.php`).
- **Password Safety:** Bcrypt password hashing (`password_hash($pass, PASSWORD_BCRYPT)`).
- **Session Security:** `HttpOnly` and `SameSite` flags configured on session cookies.
- **HTTP Hardening:** Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`) added in `.htaccess`.
