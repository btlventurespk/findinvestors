<?php
require_once __DIR__ . '/inc/functions.php';
header('Content-Type: application/xml; charset=utf-8');
$base = rtrim(SITE_URL, '/');
$pages = ['/', '/startups.php', '/how-it-works.php', '/about.php', '/contact.php', '/apply.php', '/privacy.php', '/terms.php', '/disclaimer.php'];
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($pages as $p) echo "  <url><loc>$base$p</loc></url>\n";
foreach (get_published_startups() as $s) echo "  <url><loc>$base/startup.php?slug=" . e($s['slug']) . "</loc></url>\n";
echo '</urlset>';
