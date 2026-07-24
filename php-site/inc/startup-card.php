<?php /** expects $s (startup row) in scope */ ?>
<a class="startup-card" href="/startup.php?slug=<?= e($s['slug']) ?>">
  <div class="card">
    <div class="row">
      <div class="logo-box">
        <?php if (!empty($s['logo_url'])): ?><img src="<?= e($s['logo_url']) ?>" alt="<?= e($s['name']) ?> logo"><?php else: ?><?= e(mb_substr($s['name'],0,1)) ?><?php endif; ?>
      </div>
      <div style="min-width:0;">
        <h3 class="strong" style="font-size:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><?= e($s['name']) ?></h3>
        <p class="muted" style="font-size:14px;"><?= e($s['city']) ?></p>
      </div>
    </div>
    <p class="mt-4" style="font-size:14px;color:rgba(11,27,43,.8);"><?= e($s['one_liner']) ?></p>
    <div class="chips mt-4">
      <span class="pill pill-green"><?= e($s['sector']) ?></span>
      <span class="muted" style="font-size:14px;">Raising <?= e(raise_band($s['raise_min'],$s['raise_max'])) ?></span>
    </div>
  </div>
</a>
