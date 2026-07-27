<?php
require_once __DIR__ . '/auth.php';
require_admin();

$flash = $_GET['msg'] ?? '';
$dberror = '';
$startups = $applications = $intros = [];
try {
    $startups = db()->query("SELECT * FROM startups ORDER BY published DESC, featured DESC, created_at DESC")->fetchAll();
    $applications = db()->query("SELECT * FROM applications ORDER BY created_at DESC")->fetchAll();
    $intros = db()->query("SELECT * FROM intro_requests ORDER BY created_at DESC")->fetchAll();
} catch (Throwable $ex) {
    $dberror = $ex->getMessage();
}

$page_title = 'Dashboard · findinvestors admin';
require __DIR__ . '/../inc/header.php';
?>
<div class="admin-bar">
  <div class="container">
    <strong style="font-family:'Plus Jakarta Sans';">Admin</strong>
    <div>
      <a href="/" target="_blank">View site ↗</a>
      <a href="/admin/edit.php">+ Add startup</a>
      <a href="/admin/test-email.php">Test email</a>
      <a href="/admin/logout.php">Sign out</a>
    </div>
  </div>
</div>

<div class="container section-sm">
  <?php if ($flash === 'saved'): ?><div class="alert alert-success">Saved. Changes are live on the website now.</div><?php endif; ?>
  <?php if ($flash === 'deleted'): ?><div class="alert alert-success">Startup deleted.</div><?php endif; ?>
  <?php if ($dberror): ?>
    <div class="alert alert-error"><strong>Database error.</strong><br><span style="font-family:monospace;font-size:13px;"><?= e($dberror) ?></span><br>Check config.php, then run <a href="/setup.php">/setup.php</a> once.</div>
  <?php endif; ?>

  <div class="flex items-center justify-between flex-wrap gap-4">
    <div>
      <h1 class="h2">Startups</h1>
      <p class="muted" style="font-size:14px;"><?= count($startups) ?> total · publish toggles the profile live on the website</p>
    </div>
    <a class="btn btn-primary" href="/admin/edit.php">+ Add new startup</a>
  </div>

  <div class="table-wrap mt-6">
    <table class="admin">
      <thead><tr><th>Startup</th><th>Sector / City</th><th>Raise</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
      <?php foreach ($startups as $s): ?>
        <tr>
          <td>
            <div class="row">
              <div class="logo-box" style="width:40px;height:40px;font-size:16px;">
                <?php if ($s['logo_url']): ?><img src="<?= e($s['logo_url']) ?>" alt=""><?php else: ?><?= e(mb_substr($s['name'],0,1)) ?><?php endif; ?>
              </div>
              <div><strong><?= e($s['name']) ?></strong><br><span class="muted" style="font-size:12px;"><?= e($s['slug']) ?></span></div>
            </div>
          </td>
          <td><?= e($s['sector']) ?><br><span class="muted"><?= e($s['city']) ?></span></td>
          <td><?= e(raise_band($s['raise_min'],$s['raise_max'])) ?></td>
          <td>
            <?php if ((int)$s['published']===1): ?><span class="badge badge-live">Live</span><?php else: ?><span class="badge badge-draft">Draft</span><?php endif; ?>
            <?php if ((int)$s['featured']===1): ?><br><span class="badge badge-draft" style="margin-top:4px;">Featured</span><?php endif; ?>
          </td>
          <td>
            <div class="actions-row">
              <a class="btn btn-secondary" style="padding:6px 12px;font-size:13px;" href="/admin/edit.php?id=<?= (int)$s['id'] ?>">Edit</a>
              <form method="post" action="/admin/save.php" style="display:inline;">
                <input type="hidden" name="action" value="toggle_publish">
                <input type="hidden" name="id" value="<?= (int)$s['id'] ?>">
                <input type="hidden" name="published" value="<?= (int)$s['published']===1?0:1 ?>">
                <button class="btn btn-primary" style="padding:6px 12px;font-size:13px;<?= (int)$s['published']===1?'background:#e5e7eb;color:#374151;':'' ?>" type="submit"><?= (int)$s['published']===1?'Unpublish':'Publish' ?></button>
              </form>
              <a class="btn btn-secondary" style="padding:6px 12px;font-size:13px;" href="/startup.php?slug=<?= e($s['slug']) ?>" target="_blank">View</a>
              <form method="post" action="/admin/delete.php" style="display:inline;" onsubmit="return confirm('Delete <?= e($s['name']) ?> permanently?');">
                <input type="hidden" name="id" value="<?= (int)$s['id'] ?>">
                <button class="link-danger" style="background:none;border:0;cursor:pointer;" type="submit">Delete</button>
              </form>
            </div>
          </td>
        </tr>
      <?php endforeach; ?>
      <?php if (!count($startups)): ?><tr><td colspan="5" class="muted" style="text-align:center;padding:32px;">No startups yet. Add your first one.</td></tr><?php endif; ?>
      </tbody>
    </table>
  </div>

  <!-- Applications -->
  <h2 class="h3 mt-12">Applications from the website</h2>
  <p class="muted" style="font-size:14px;">Founders who submitted the /apply form. Convert one into a startup profile to publish it.</p>
  <div class="table-wrap mt-4">
    <table class="admin">
      <thead><tr><th>Company</th><th>Contact</th><th>Details</th><th>Date</th><th></th></tr></thead>
      <tbody>
      <?php foreach ($applications as $a): $p = json_decode($a['payload'], true) ?: []; ?>
        <tr>
          <td><strong><?= e($p['companyName'] ?? '—') ?></strong><br><span class="muted"><?= e($p['sector'] ?? '') ?> · <?= e($p['city'] ?? '') ?></span></td>
          <td><?= e($a['email']) ?><br><span class="muted"><?= e($a['whatsapp']) ?></span></td>
          <td style="max-width:340px;">
            <details><summary style="cursor:pointer;color:var(--green-deep);">View all fields</summary>
            <div style="margin-top:8px;font-size:13px;">
              <?php foreach ($p as $k => $v): if ($v==='') continue; ?><div style="margin-bottom:4px;"><span class="muted"><?= e($k) ?>:</span> <?= e(is_array($v)?json_encode($v):$v) ?></div><?php endforeach; ?>
            </div></details>
          </td>
          <td class="muted"><?= e(date('d M Y, H:i', strtotime($a['created_at']))) ?></td>
          <td><a class="btn btn-secondary" style="padding:6px 12px;font-size:13px;" href="/admin/edit.php?from_app=<?= (int)$a['id'] ?>">Convert →</a></td>
        </tr>
      <?php endforeach; ?>
      <?php if (!count($applications)): ?><tr><td colspan="5" class="muted" style="text-align:center;padding:32px;">No applications yet.</td></tr><?php endif; ?>
      </tbody>
    </table>
  </div>

  <!-- Intro requests -->
  <h2 class="h3 mt-12">Intro requests</h2>
  <p class="muted" style="font-size:14px;">People who asked to be introduced to a listed startup.</p>
  <div class="table-wrap mt-4">
    <table class="admin">
      <thead><tr><th>Startup</th><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Date</th></tr></thead>
      <tbody>
      <?php foreach ($intros as $r): ?>
        <tr>
          <td><strong><?= e($r['startup_name']) ?></strong></td>
          <td><?= e($r['name']) ?></td>
          <td><a class="text-green" href="mailto:<?= e($r['email']) ?>"><?= e($r['email']) ?></a></td>
          <td><?= e($r['phone']) ?></td>
          <td style="max-width:280px;"><?= e($r['message'] ?: '—') ?></td>
          <td class="muted"><?= e(date('d M Y, H:i', strtotime($r['created_at']))) ?></td>
        </tr>
      <?php endforeach; ?>
      <?php if (!count($intros)): ?><tr><td colspan="6" class="muted" style="text-align:center;padding:32px;">No intro requests yet.</td></tr><?php endif; ?>
      </tbody>
    </table>
  </div>
</div>
<?php require __DIR__ . '/../inc/footer.php'; ?>
