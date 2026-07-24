<?php
require_once __DIR__ . '/inc/functions.php';
$page_title = 'Privacy policy · findinvestors';
require __DIR__ . '/inc/header.php';
?>
<div class="container section-sm max-w-3xl">
  <h1 class="h1">Privacy policy</h1>
  <p class="muted mt-2" style="font-size:14px;">Last updated: July 2026</p>
  <div class="space-y mt-8" style="color:rgba(11,27,43,.8);">
    <div><h2 class="h3">What we collect</h2><p class="mt-2">When you apply to be listed, we collect the information you provide: company details, business description, revenue band, raise ask, team details and contact information. When you request an intro to a listed startup, we collect your name, email, phone number and message.</p></div>
    <div><h2 class="h3">How we use it</h2><p class="mt-2">Application data is used to evaluate your business for listing and, if accepted, to build your public profile — only with your approval. Intro request data is shared with the relevant startup's founder so they can respond. We do not sell your data.</p></div>
    <div><h2 class="h3">What is public</h2><p class="mt-2">Only approved startup profiles are public. Applications that are not accepted remain private. Investor identities are never published on this site.</p></div>
    <div><h2 class="h3">Your choices</h2><p class="mt-2">You can ask us to correct or delete your data — including a live profile — at any time by emailing <?= e(CONTACT_EMAIL) ?>. We action removal requests within 7 working days.</p></div>
  </div>
</div>
<?php require __DIR__ . '/inc/footer.php'; ?>
