<?php
require_once __DIR__ . '/../inc/functions.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function admin_logged_in(): bool {
    return !empty($_SESSION['fi_admin']);
}

function require_admin(): void {
    if (!admin_logged_in()) {
        header('Location: /admin/login.php');
        exit;
    }
}

function check_login(string $user, string $pass): bool {
    return hash_equals(ADMIN_USER, $user) && hash_equals(ADMIN_PASS, $pass);
}
