<?php
require_once __DIR__ . '/auth.php';
require_admin();

$id = (int) ($_GET['id'] ?? 0);
$from_app = (int) ($_GET['from_app'] ?? 0);
$row = null;

if ($id) {
    $stmt = db()->prepare("SELECT * FROM startups WHERE id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch() ?: null;
}

// Prefill from an application submission
if (!$row && $from_app) {
    $stmt = db()->prepare("SELECT * FROM applications WHERE id = ?");
    $stmt->execute([$from_app]);
    $app = $stmt->fetch();
    if ($app) {
        $p = json_decode($app['payload'], true) ?: [];
        $row = [
            'name' => $p['companyName'] ?? '', 'slug' => slugify($p['companyName'] ?? ''),
            'one_liner' => $p['oneLiner'] ?? '', 'sector' => $p['sector'] ?? '', 'city' => $p['city'] ?? '',
            'founded_year' => $p['foundedYear'] ?? date('Y'), 'entity_type' => $p['entityType'] ?? '',
            'website' => $p['website'] ?? '', 'problem' => $p['problem'] ?? '', 'solution' => $p['solution'] ?? '',
            'business_model' => $p['businessModel'] ?? '', 'target_market' => $p['targetMarket'] ?? '',
            'competition' => $p['competition'] ?? '', 'revenue_band' => $p['revenueBand'] ?? '',
            'months_running' => $p['monthsRunning'] ?? 0, 'customers' => $p['customers'] ?? '',
            'growth_pct' => $p['growthPct'] ?? '', 'milestones' => $p['milestones'] ?? '',
            'raise_min' => $p['raiseMin'] ?? 0, 'raise_max' => $p['raiseMax'] ?? 0,
            'equity_offered' => $p['equityOffered'] ?? '', 'use_of_funds' => $p['useOfFunds'] ?? '',
            'founder_name' => $p['founderName'] ?? '', 'founder_role' => $p['founderRole'] ?? '',
            'founder_bio' => $p['founderBio'] ?? '', 'linkedin' => $p['linkedin'] ?? '',
            'team_size' => $p['teamSize'] ?? 1, 'deck_url' => $p['deckUrl'] ?? '', 'video_url' => $p['videoUrl'] ?? '',
            'logo_url' => '', 'featured' => 0, 'published' => 0, 'id' => 0,
        ];
    }
}

$v = fn($k, $d = '') => e($row[$k] ?? $d);
$fields = startup_fields();

$page_title = ($id ? 'Edit' : 'Add') . ' startup · admin';
require __DIR__ . '/../inc/header.php';
?>
<div class="admin-bar"><div class="container"><strong style="font-family:'Plus Jakarta Sans';">Admin</strong><div><a href="/admin/">← Back to dashboard</a><a href="/admin/logout.php">Sign out</a></div></div></div>

<div class="container section-sm max-w-3xl">
  <h1 class="h2"><?= $id ? 'Edit startup' : 'Add a new startup' ?></h1>
  <p class="muted mt-2" style="font-size:14px;">Fill in the details. Tick “Published” to make it live on the website immediately after saving.</p>

  <form method="post" action="/admin/save.php" enctype="multipart/form-data" class="mt-8">
    <input type="hidden" name="action" value="save">
    <input type="hidden" name="id" value="<?= (int)($row['id'] ?? 0) ?>">

    <!-- Logo -->
    <div class="card mb-6">
      <label class="strong">Logo</label>
      <div class="row mt-4">
        <div class="logo-box" style="width:64px;height:64px;">
          <?php if (!empty($row['logo_url'])): ?><img src="<?= $v('logo_url') ?>" alt=""><?php else: ?>?<?php endif; ?>
        </div>
        <div style="flex:1;">
          <input class="input" type="file" name="logo" accept="image/*">
          <p class="form-note">PNG/JPG/SVG, up to 2MB. Uploaded to /assets/uploads/. Or paste a URL below.</p>
          <input class="input mt-2" type="text" name="logo_url" value="<?= $v('logo_url') ?>" placeholder="https://… (optional external logo URL)">
        </div>
      </div>
    </div>

    <div class="form-grid">
      <?php
      $full = ['one_liner','problem','solution','business_model','target_market','competition','milestones','use_of_funds','founder_bio'];
      $textarea = ['problem','solution','business_model','target_market','competition','milestones','use_of_funds','founder_bio'];
      foreach ($fields as $key => $label):
        $cls = in_array($key,$full,true) ? ' full' : '';
      ?>
      <div class="field<?= $cls ?>">
        <label><?= e($label) ?></label>
        <?php if (in_array($key,$textarea,true)): ?>
          <textarea class="textarea" name="<?= e($key) ?>"><?= $v($key) ?></textarea>
        <?php elseif ($key==='sector'): ?>
          <select class="select" name="sector"><option value="">Select…</option><?php foreach (sector_options() as $o): ?><option<?= ($row['sector']??'')===$o?' selected':'' ?>><?= e($o) ?></option><?php endforeach; ?></select>
        <?php elseif ($key==='city'): ?>
          <select class="select" name="city"><option value="">Select…</option><?php foreach (city_options() as $o): ?><option<?= ($row['city']??'')===$o?' selected':'' ?>><?= e($o) ?></option><?php endforeach; ?></select>
        <?php else: ?>
          <input class="input" type="text" name="<?= e($key) ?>" value="<?= $v($key) ?>">
        <?php endif; ?>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="card mt-6">
      <label class="flex items-center gap-2" style="cursor:pointer;"><input type="checkbox" name="featured" value="1" <?= (int)($row['featured']??0)===1?'checked':'' ?> style="width:18px;height:18px;accent-color:#16C172;"> <span class="strong">Featured</span> <span class="muted">— show on the home page</span></label>
      <label class="flex items-center gap-2 mt-4" style="cursor:pointer;"><input type="checkbox" name="published" value="1" <?= (int)($row['published']??0)===1?'checked':'' ?> style="width:18px;height:18px;accent-color:#16C172;"> <span class="strong">Published</span> <span class="muted">— live and visible on the website</span></label>
    </div>

    <div class="actions-row mt-8">
      <button class="btn btn-primary" type="submit">Save changes</button>
      <a class="btn btn-secondary" href="/admin/">Cancel</a>
    </div>
  </form>
</div>
<?php require __DIR__ . '/../inc/footer.php'; ?>
