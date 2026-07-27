<?php
require_once __DIR__ . '/auth.php';
require_admin();

$result = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    [$sent, $detail] = notify(
        'findinvestors — test email',
        "This is a test email from your findinvestors admin dashboard.\n\nIf you received this, form notifications are working.\n\nSent: " . date('r')
    );
    $result = [$sent, $detail];
}

$page_title = 'Test email · admin';
require __DIR__ . '/../inc/header.php';
?>
<div class="admin-bar"><div class="container"><strong style="font-family:'Plus Jakarta Sans';">Admin</strong><div><a href="/admin/">← Back to dashboard</a><a href="/admin/logout.php">Sign out</a></div></div></div>

<div class="container section-sm max-w-2xl">
  <h1 class="h2">Test email delivery</h1>
  <p class="muted mt-2" style="font-size:14px;">Sends a test message to <strong><?= e(defined('MAIL_TO') ? MAIL_TO : '(MAIL_TO not set)') ?></strong> using your current settings in config.php.</p>

  <?php if ($result !== null): ?>
    <?php if ($result[0]): ?>
      <div class="alert alert-success mt-6"><strong>Sent.</strong> <?= e($result[1]) ?>. Check the inbox for <?= e(MAIL_TO) ?> (and the spam folder just in case).</div>
    <?php else: ?>
      <div class="alert alert-error mt-6"><strong>Failed.</strong> <?= e($result[1]) ?>.<br><br>
      Most common fixes:<br>
      • Create the mailbox <code><?= e(defined('SMTP_USER')?SMTP_USER:'') ?></code> in hPanel → Emails, and put its password in <code>SMTP_PASS</code> in config.php.<br>
      • If using port 465 fails, try <code>SMTP_PORT</code> = 587.<br>
      • Make sure the findinvestors.pk email is hosted at Hostinger (MX records).</div>
    <?php endif; ?>
  <?php endif; ?>

  <div class="card mt-6">
    <p class="strong">Current email settings</p>
    <div class="mt-4" style="font-size:14px;line-height:2;">
      <div><span class="muted">Send to (MAIL_TO):</span> <?= e(defined('MAIL_TO')?MAIL_TO:'—') ?></div>
      <div><span class="muted">SMTP host:</span> <?= e(defined('SMTP_HOST')?SMTP_HOST:'—') ?>:<?= e(defined('SMTP_PORT')?SMTP_PORT:'—') ?></div>
      <div><span class="muted">SMTP user (from):</span> <?= e(defined('SMTP_USER')?SMTP_USER:'—') ?></div>
      <div><span class="muted">SMTP password set:</span> <?= (defined('SMTP_PASS') && SMTP_PASS !== '') ? 'yes' : 'no — will use PHP mail() fallback' ?></div>
    </div>
  </div>

  <form method="post" class="mt-6">
    <button class="btn btn-primary" type="submit">Send test email now</button>
  </form>
</div>
<?php require __DIR__ . '/../inc/footer.php'; ?>
