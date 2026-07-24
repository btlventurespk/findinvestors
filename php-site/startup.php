<?php
require_once __DIR__ . '/inc/functions.php';

$slug = $_GET['slug'] ?? '';
$s = get_startup_by_slug($slug);

// Handle intro request POST
$intro_sent = false; $intro_error = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $s) {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $msg = trim($_POST['message'] ?? '');
    if ($name && filter_var($email, FILTER_VALIDATE_EMAIL) && $phone) {
        try {
            $stmt = db()->prepare("INSERT INTO intro_requests (startup_id, startup_name, name, email, phone, message) VALUES (?,?,?,?,?,?)");
            $stmt->execute([$s['id'], $s['name'], $name, $email, $phone, $msg ?: null]);
            notify('Intro request: ' . $s['name'], "Startup: {$s['name']}\nName: $name\nEmail: $email\nPhone: $phone\nMessage: " . ($msg ?: '—'));
            $intro_sent = true;
        } catch (Throwable $e) { $intro_error = true; }
    } else { $intro_error = true; }
}

if (!$s) {
    http_response_code(404);
    $page_title = 'Startup not found · findinvestors';
    require __DIR__ . '/inc/header.php';
    echo '<div class="container section text-center"><h1 class="h2">This profile doesn\'t exist.</h1><p class="lead">It may have been taken down.</p><div class="mt-8"><a class="btn btn-primary" href="/startups.php">Browse startups</a></div></div>';
    require __DIR__ . '/inc/footer.php';
    exit;
}

$page_title = e($s['name']) . ' · findinvestors';
$page_desc  = e($s['one_liner']);
$active = 'startups';
require __DIR__ . '/inc/header.php';

$stats = [['Monthly revenue', $s['revenue_band']], ['Customers', $s['customers']], ['Months operating', $s['months_running']]];
if ($s['growth_pct']) $stats[] = ['Growth', $s['growth_pct']];
?>
<div class="container section-sm">
  <div class="row" style="align-items:flex-start;flex-wrap:wrap;gap:24px;">
    <div class="logo-box" style="width:80px;height:80px;border-radius:16px;font-size:32px;">
      <?php if ($s['logo_url']): ?><img src="<?= e($s['logo_url']) ?>" alt="<?= e($s['name']) ?> logo"><?php else: ?><?= e(mb_substr($s['name'],0,1)) ?><?php endif; ?>
    </div>
    <div style="flex:1;min-width:260px;">
      <h1 class="h1" style="font-size:36px;"><?= e($s['name']) ?></h1>
      <p class="lead" style="max-width:640px;"><?= e($s['one_liner']) ?></p>
      <div class="chips mt-4">
        <span class="pill pill-green"><?= e($s['sector']) ?></span>
        <span class="pill pill-default"><?= e($s['city']) ?></span>
        <span class="pill pill-default">Since <?= e($s['founded_year']) ?></span>
        <span class="pill pill-default"><?= e($s['entity_type']) ?></span>
      </div>
    </div>
  </div>

  <div class="profile-grid">
    <div>
      <section>
        <h2 class="h3">The business</h2>
        <div class="space-y mt-4" style="color:rgba(11,27,43,.8);">
          <?php if ($s['problem']): ?><p><span class="strong">Problem.</span> <?= e($s['problem']) ?></p><?php endif; ?>
          <?php if ($s['solution']): ?><p><span class="strong">Solution.</span> <?= e($s['solution']) ?></p><?php endif; ?>
          <?php if ($s['business_model']): ?><p><span class="strong">Model.</span> <?= e($s['business_model']) ?></p><?php endif; ?>
          <?php if ($s['target_market']): ?><p><span class="strong">Market.</span> <?= e($s['target_market']) ?></p><?php endif; ?>
          <?php if ($s['competition']): ?><p><span class="strong">Competition.</span> <?= e($s['competition']) ?></p><?php endif; ?>
        </div>
      </section>

      <section class="mt-10">
        <h2 class="h3">Traction</h2>
        <div class="stat-grid mt-4">
          <?php foreach ($stats as $st): ?>
          <div class="card" style="padding:16px;">
            <p class="label"><?= e($st[0]) ?></p>
            <p class="strong mt-2" style="font-size:17px;"><?= e($st[1]) ?></p>
          </div>
          <?php endforeach; ?>
        </div>
        <?php if ($s['milestones']): ?><p class="mt-4" style="color:rgba(11,27,43,.8);"><?= e($s['milestones']) ?></p><?php endif; ?>
      </section>

      <section class="mt-10">
        <h2 class="h3">Team</h2>
        <div class="card mt-4">
          <div class="row">
            <div class="logo-box" style="width:56px;height:56px;border-radius:999px;background:rgba(22,193,114,.15);color:var(--green-deep);">
              <?php if ($s['founder_photo']): ?><img src="<?= e($s['founder_photo']) ?>" alt=""><?php else: ?><?= e(mb_substr($s['founder_name'],0,1)) ?><?php endif; ?>
            </div>
            <div>
              <p class="strong" style="font-size:17px;"><?= e($s['founder_name']) ?></p>
              <p class="muted" style="font-size:14px;"><?= e($s['founder_role']) ?></p>
            </div>
          </div>
          <?php if ($s['founder_bio']): ?><p class="mt-4" style="font-size:14px;color:rgba(11,27,43,.8);"><?= e($s['founder_bio']) ?></p><?php endif; ?>
          <p class="muted mt-3" style="font-size:14px;">Team of <?= e($s['team_size']) ?><?php if ($s['linkedin']): ?> · <a class="text-green" href="<?= e($s['linkedin']) ?>" target="_blank" rel="noopener">LinkedIn</a><?php endif; ?></p>
        </div>
      </section>

      <?php if ($s['use_of_funds']): ?>
      <section class="mt-10">
        <h2 class="h3">Use of funds</h2>
        <p class="mt-4" style="color:rgba(11,27,43,.8);"><?= e($s['use_of_funds']) ?></p>
      </section>
      <?php endif; ?>
    </div>

    <!-- Sticky rail -->
    <aside class="rail">
      <div class="card">
        <p class="label">Raise ask</p>
        <p class="h3 mt-2"><?= e(raise_band($s['raise_min'],$s['raise_max'])) ?></p>
        <?php if ($s['equity_offered']): ?>
        <p class="label mt-4">Equity offered</p>
        <p class="strong mt-2" style="font-size:17px;"><?= e($s['equity_offered']) ?></p>
        <?php endif; ?>
        <button class="btn btn-primary btn-block mt-6" id="introOpen">Request an intro</button>
        <p class="muted mt-4" style="font-size:12px;">We connect you directly with the founder. findinvestors does not broker securities or provide investment advice.</p>
      </div>
    </aside>
  </div>
</div>

<!-- Intro modal -->
<div class="modal-overlay" id="introModal" style="display:none;">
  <div class="modal">
    <div class="flex items-center justify-between">
      <h2 class="h3">Request an intro</h2>
      <button id="introClose" aria-label="Close" style="background:none;border:0;font-size:20px;cursor:pointer;color:var(--slate);">✕</button>
    </div>
    <p class="muted" style="font-size:14px;"><?= e($s['name']) ?></p>
    <?php if ($intro_sent): ?>
      <div class="alert alert-success mt-6">Got it. We'll pass your request to the founder and follow up with you directly.</div>
      <a class="text-green" href="<?= e(wa_link('Hi, I would like an intro to '.$s['name'].' listed on findinvestors.pk')) ?>" target="_blank" rel="noopener">Prefer WhatsApp? Message us →</a>
    <?php else: ?>
      <?php if ($intro_error): ?><div class="alert alert-error mt-6">Please check your details and try again.</div><?php endif; ?>
      <form method="post" class="mt-6">
        <div class="field"><input class="input" name="name" required placeholder="Your name" value="<?= e($_POST['name'] ?? '') ?>"></div>
        <div class="field"><input class="input" name="email" type="email" required placeholder="Email" value="<?= e($_POST['email'] ?? '') ?>"></div>
        <div class="field"><input class="input" name="phone" required placeholder="Phone" value="<?= e($_POST['phone'] ?? '') ?>"></div>
        <div class="field"><textarea class="textarea" name="message" placeholder="Anything you'd like the founder to know (optional)"></textarea></div>
        <button class="btn btn-primary btn-block" type="submit">Send request</button>
        <a class="text-green mt-4" style="display:block;text-align:center;" href="<?= e(wa_link('Hi, I would like an intro to '.$s['name'].' listed on findinvestors.pk')) ?>" target="_blank" rel="noopener">Or message us on WhatsApp →</a>
      </form>
    <?php endif; ?>
  </div>
</div>

<script>
(function(){
  var m=document.getElementById('introModal'),o=document.getElementById('introOpen'),c=document.getElementById('introClose');
  if(o)o.addEventListener('click',function(){m.style.display='flex';});
  if(c)c.addEventListener('click',function(){m.style.display='none';});
  if(m)m.addEventListener('click',function(e){if(e.target===m)m.style.display='none';});
  <?php if ($intro_sent || $intro_error): ?>m.style.display='flex';<?php endif; ?>
})();
</script>
<?php require __DIR__ . '/inc/footer.php'; ?>
