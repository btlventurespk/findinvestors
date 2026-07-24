<?php
/**
 * One-time database setup. Visit /setup.php in your browser after uploading
 * and filling in config.php. Creates the tables and loads the 15 sample
 * startups. Safe to run more than once (it skips rows that already exist).
 * DELETE this file after it succeeds.
 */
require_once __DIR__ . '/inc/db.php';

header('Content-Type: text/html; charset=utf-8');
echo '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:sans-serif;max-width:640px;margin:40px auto;padding:0 16px;color:#0B1B2B;">';
echo '<h1 style="color:#0E9C58;">findinvestors — database setup</h1>';

try {
    $pdo = db();
    echo '<p>✅ Connected to the database.</p>';

    // Create tables
    $schema = file_get_contents(__DIR__ . '/sql/schema.sql');
    foreach (array_filter(array_map('trim', explode(';', $schema))) as $stmt) {
        if ($stmt) $pdo->exec($stmt);
    }
    echo '<p>✅ Tables created (startups, applications, intro_requests).</p>';

    // Seed if empty
    $count = (int) $pdo->query('SELECT COUNT(*) FROM startups')->fetchColumn();
    if ($count === 0) {
        $seed = file_get_contents(__DIR__ . '/sql/seed.sql');
        $pdo->exec($seed);
        $n = (int) $pdo->query('SELECT COUNT(*) FROM startups')->fetchColumn();
        echo '<p>✅ Loaded ' . $n . ' sample startups.</p>';
    } else {
        echo '<p>ℹ️ startups table already has ' . $count . ' rows — skipped seeding.</p>';
    }

    echo '<div style="background:rgba(22,193,114,.1);border:1px solid rgba(22,193,114,.3);padding:16px 20px;border-radius:12px;margin-top:24px;">';
    echo '<p><strong>Done.</strong> Your site is ready.</p>';
    echo '<p style="margin-top:8px;">Now: <a href="/">open the site</a> · <a href="/admin/">log in to the dashboard</a></p>';
    echo '<p style="margin-top:8px;color:#b91c1c;"><strong>Important:</strong> delete this <code>setup.php</code> file from the server now, for security.</p>';
    echo '</div>';
} catch (Throwable $e) {
    echo '<div style="background:#fef2f2;border:1px solid #fecaca;padding:16px 20px;border-radius:12px;color:#b91c1c;">';
    echo '<p><strong>Setup failed:</strong> ' . htmlspecialchars($e->getMessage()) . '</p>';
    echo '<p style="margin-top:8px;">Check the DB_HOST / DB_NAME / DB_USER / DB_PASS values in <code>config.php</code>.</p>';
    echo '</div>';
}
echo '</body>';
