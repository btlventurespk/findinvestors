<?php
require_once __DIR__ . '/inc/functions.php';
$page_title = 'Contact · findinvestors';
$active = 'contact';
require __DIR__ . '/inc/header.php';
?>
<div class="container section-sm max-w-2xl">
  <h1 class="h1">Contact</h1>
  <p class="lead">Founders, investors, press — we answer everything ourselves, usually within a working day.</p>
  <div class="space-y mt-10">
    <div class="card">
      <h2 class="h3">Founders</h2>
      <p class="mt-2" style="color:rgba(11,27,43,.8);">Want to be listed? The application is the fastest route — it tells us everything we need for a first look.</p>
      <a class="btn btn-primary mt-5" href="/apply.php">Apply to be listed</a>
    </div>
    <div class="card">
      <h2 class="h3">Everything else</h2>
      <p class="mt-2" style="color:rgba(11,27,43,.8);">
        Email us at <a class="text-green" href="mailto:<?= e(CONTACT_EMAIL) ?>"><?= e(CONTACT_EMAIL) ?></a>
        or message us on <a class="text-green" href="<?= e(wa_link()) ?>" target="_blank" rel="noopener">WhatsApp</a> (+<?= e(WHATSAPP_NUMBER) ?>).
      </p>
    </div>
  </div>
</div>
<?php require __DIR__ . '/inc/footer.php'; ?>
