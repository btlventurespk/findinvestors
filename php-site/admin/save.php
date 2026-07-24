<?php
require_once __DIR__ . '/auth.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: /admin/'); exit; }

$action = $_POST['action'] ?? '';

// --- Quick publish/unpublish toggle from the dashboard ---
if ($action === 'toggle_publish') {
    $id = (int) $_POST['id'];
    $pub = (int) $_POST['published'] === 1 ? 1 : 0;
    $stmt = db()->prepare("UPDATE startups SET published = ? WHERE id = ?");
    $stmt->execute([$pub, $id]);
    header('Location: /admin/?msg=saved');
    exit;
}

// --- Full save (add or edit) ---
$id = (int) ($_POST['id'] ?? 0);

// Handle logo upload (overrides pasted URL if a file was chosen)
$logo_url = trim($_POST['logo_url'] ?? '');
if (!empty($_FILES['logo']['name']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
    $allowed = ['image/png'=>'png','image/jpeg'=>'jpg','image/webp'=>'webp','image/svg+xml'=>'svg','image/gif'=>'gif'];
    $type = mime_content_type($_FILES['logo']['tmp_name']);
    if (isset($allowed[$type]) && $_FILES['logo']['size'] <= 2*1024*1024) {
        $dir = __DIR__ . '/../assets/uploads';
        if (!is_dir($dir)) @mkdir($dir, 0755, true);
        $fname = 'logo-' . time() . '-' . bin2hex(random_bytes(4)) . '.' . $allowed[$type];
        if (move_uploaded_file($_FILES['logo']['tmp_name'], $dir . '/' . $fname)) {
            $logo_url = '/assets/uploads/' . $fname;
        }
    }
}

$name = trim($_POST['name'] ?? '');
$slug = trim($_POST['slug'] ?? '');
if ($slug === '') $slug = slugify($name);
else $slug = slugify($slug);

$data = [
    'slug' => $slug,
    'name' => $name,
    'logo_url' => $logo_url ?: null,
    'one_liner' => trim($_POST['one_liner'] ?? ''),
    'sector' => trim($_POST['sector'] ?? 'Other'),
    'city' => trim($_POST['city'] ?? ''),
    'founded_year' => (int) ($_POST['founded_year'] ?? date('Y')),
    'entity_type' => trim($_POST['entity_type'] ?? ''),
    'website' => trim($_POST['website'] ?? '') ?: null,
    'problem' => trim($_POST['problem'] ?? ''),
    'solution' => trim($_POST['solution'] ?? ''),
    'business_model' => trim($_POST['business_model'] ?? ''),
    'target_market' => trim($_POST['target_market'] ?? ''),
    'competition' => trim($_POST['competition'] ?? '') ?: null,
    'revenue_band' => trim($_POST['revenue_band'] ?? ''),
    'months_running' => (int) ($_POST['months_running'] ?? 0),
    'customers' => trim($_POST['customers'] ?? ''),
    'growth_pct' => trim($_POST['growth_pct'] ?? '') ?: null,
    'milestones' => trim($_POST['milestones'] ?? '') ?: null,
    'raise_min' => (int) ($_POST['raise_min'] ?? 0),
    'raise_max' => (int) ($_POST['raise_max'] ?? 0),
    'equity_offered' => trim($_POST['equity_offered'] ?? '') ?: null,
    'use_of_funds' => trim($_POST['use_of_funds'] ?? ''),
    'founder_name' => trim($_POST['founder_name'] ?? ''),
    'founder_role' => trim($_POST['founder_role'] ?? ''),
    'founder_bio' => trim($_POST['founder_bio'] ?? ''),
    'linkedin' => trim($_POST['linkedin'] ?? '') ?: null,
    'team_size' => (int) ($_POST['team_size'] ?? 1),
    'deck_url' => trim($_POST['deck_url'] ?? '') ?: null,
    'video_url' => trim($_POST['video_url'] ?? '') ?: null,
    'featured' => isset($_POST['featured']) ? 1 : 0,
    'published' => isset($_POST['published']) ? 1 : 0,
];

if ($data['raise_max'] < $data['raise_min']) $data['raise_max'] = $data['raise_min'];

try {
    if ($id) {
        $set = implode(', ', array_map(fn($k) => "$k = :$k", array_keys($data)));
        $stmt = db()->prepare("UPDATE startups SET $set WHERE id = :id");
        $data['id'] = $id;
        $stmt->execute($data);
    } else {
        // Ensure unique slug
        $base = $data['slug']; $n = 2;
        while (true) {
            $c = db()->prepare("SELECT COUNT(*) FROM startups WHERE slug = ?");
            $c->execute([$data['slug']]);
            if ((int)$c->fetchColumn() === 0) break;
            $data['slug'] = $base . '-' . $n++;
        }
        $cols = implode(', ', array_keys($data));
        $ph = implode(', ', array_map(fn($k) => ":$k", array_keys($data)));
        $stmt = db()->prepare("INSERT INTO startups ($cols) VALUES ($ph)");
        $stmt->execute($data);
    }
    header('Location: /admin/?msg=saved');
} catch (Throwable $ex) {
    http_response_code(500);
    echo 'Save failed: ' . htmlspecialchars($ex->getMessage()) . ' — <a href="/admin/">back</a>';
}
