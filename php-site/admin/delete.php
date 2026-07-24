<?php
require_once __DIR__ . '/auth.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = (int) ($_POST['id'] ?? 0);
    if ($id) {
        $stmt = db()->prepare("DELETE FROM startups WHERE id = ?");
        $stmt->execute([$id]);
    }
}
header('Location: /admin/?msg=deleted');
exit;
