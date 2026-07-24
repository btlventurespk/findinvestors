<?php
require_once __DIR__ . '/inc/functions.php';
$all      = get_published_startups();
$featured = get_featured_startups(6);
$sectors  = count(array_unique(array_map(fn($s) => $s['sector'], $all)));
$cities   = count(array_unique(array_map(fn($s) => $s['city'], $all)));
$hero     = array_slice($featured, 0, 3);
$active   = 'home';
require __DIR__ . '/inc/header.php';
?>
<!-- Hero -->
<section>
  <div class="container hero">
    <div>
      <h1 class="h1">You built something that works.</h1>
      <p class="lead" style="max-width:420px;">Put it in front of investors who back Pakistani businesses.</p>
      <div class="cta-row">
        <a href="/apply.php" class="btn btn-primary">List your startup</a>
        <a href="/startups.php" class="btn btn-secondary">Browse startups</a>
      </div>
    </div>
    <div class="hero-cards" aria-hidden="true">
      <?php foreach ($hero as $i => $s): ?>
      <div class="hero-card" style="top:<?= $i*110 ?>px; right:<?= $i*48 ?>px; transform: rotate(<?= $i%2===0?-2:2 ?>deg);">
        <div class="row">
          <div class="logo-box" style="width:40px;height:40px;font-size:18px;background:rgba(22,193,114,.15);color:var(--green-deep);">
            <?php if ($s['logo_url']): ?><img src="<?= e($s['logo_url']) ?>" alt=""><?php else: ?><?= e(mb_substr($s['name'],0,1)) ?><?php endif; ?>
          </div>
          <div>
            <p class="strong" style="font-size:15px;"><?= e($s['name']) ?></p>
            <p style="font-size:12px;color:var(--slate);"><?= e($s['sector']) ?> · <?= e($s['city']) ?></p>
          </div>
        </div>
        <p class="mt-3" style="font-size:13px;color:rgba(11,27,43,.7);"><?= e($s['one_liner']) ?></p>
        <p class="mt-3 text-green" style="font-size:13px;font-weight:600;">Raising <?= e(raise_band($s['raise_min'],$s['raise_max'])) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Trust bar -->
<section class="bg-white" style="border-top:1px solid rgba(11,27,43,.05);border-bottom:1px solid rgba(11,27,43,.05);">
  <div class="container trust">
    <?php
    $metrics = [
      [count($all).'+', 'Startups listed'],
      [(string)$sectors, 'Sectors'],
      [(string)$cities, 'Cities'],
      ['Growing', 'Investor network'],
    ];
    foreach ($metrics as $m): ?>
    <div class="text-center">
      <p class="num"><?= e($m[0]) ?></p>
      <p class="label mt-2"><?= e($m[1]) ?></p>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- How it works -->
<section class="section">
  <div class="container">
    <h2 class="h2 text-center">How it works</h2>
    <div class="grid grid-3 mt-12">
      <?php
      $steps = [
        ['1','Apply','Tell us about your business, your revenue, and what you want to raise. Takes about 15 minutes.'],
        ['2','We meet you','Our team reviews your application and gets on a call. We only list businesses we can stand behind.'],
        ['3','You go live','Your profile goes up. Investors browsing the directory can request an intro directly.'],
      ];
      foreach ($steps as $st): ?>
      <div class="card">
        <span class="step-num"><?= e($st[0]) ?></span>
        <h3 class="h3 mt-4"><?= e($st[1]) ?></h3>
        <p class="mt-2" style="font-size:14px;color:rgba(11,27,43,.7);"><?= e($st[2]) ?></p>
      </div>
      <?php endforeach; ?>
    </div>
    <p class="text-center mt-8"><a href="/how-it-works.php" class="text-green" style="font-weight:500;">Read the full process →</a></p>
  </div>
</section>

<!-- Featured -->
<section class="section bg-white">
  <div class="container">
    <div class="flex items-center justify-between">
      <h2 class="h2">Featured startups</h2>
      <a href="/startups.php" class="text-green" style="font-weight:500;">View all →</a>
    </div>
    <div class="grid grid-3 mt-10">
      <?php foreach ($featured as $s) { include __DIR__ . '/inc/startup-card.php'; } ?>
    </div>
  </div>
</section>

<!-- Who this is for -->
<section class="section">
  <div class="container grid grid-2">
    <div class="card">
      <span class="pill pill-green">This is for you if…</span>
      <ul class="list-check mt-6">
        <li><span class="tick">✓</span> Your business makes real revenue, every month.</li>
        <li><span class="tick">✓</span> You are registered — or ready to register — as a formal entity.</li>
        <li><span class="tick">✓</span> You are prepared to give equity in exchange for growth capital.</li>
      </ul>
    </div>
    <div class="card" style="background:var(--paper);">
      <span class="pill pill-default">Not yet if…</span>
      <ul class="list-check mt-6" style="color:rgba(11,27,43,.6);">
        <li><span class="muted">—</span> You are at idea stage with nothing launched.</li>
        <li><span class="muted">—</span> You have users but no revenue yet.</li>
        <li><span class="muted">—</span> You want a loan, not an investor.</li>
      </ul>
      <p class="mt-6 muted" style="font-size:14px;">Come back when the revenue is flowing. We'll be here.</p>
    </div>
  </div>
</section>

<!-- Founder quote -->
<section class="section bg-white">
  <div class="container max-w-3xl text-center">
    <blockquote class="h2" style="font-weight:800;">“We spent two years being invisible. Three weeks after our profile went live, we were having conversations we couldn't get in the door for before.”</blockquote>
    <div class="flex items-center justify-center gap-4 mt-8" style="justify-content:center;">
      <div class="logo-box" style="border-radius:999px;background:rgba(22,193,114,.15);color:var(--green-deep);">H</div>
      <div style="text-align:left;">
        <p class="strong" style="font-size:15px;">Hamza Siddiqui</p>
        <p class="muted" style="font-size:14px;">Founder, Chai Theory — Karachi</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA band -->
<section class="section bg-ink">
  <div class="container text-center">
    <h2 class="h2" style="color:#fff;">Your revenue deserves an audience.</h2>
    <p class="mt-4 mx-auto" style="max-width:480px;color:var(--slate);">Listing is free. If your business is real, we want investors to see it.</p>
    <div class="mt-8"><a href="/apply.php" class="btn btn-primary">Apply to be listed</a></div>
  </div>
</section>
<?php require __DIR__ . '/inc/footer.php'; ?>
