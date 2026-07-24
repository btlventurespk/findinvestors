<?php
require_once __DIR__ . '/inc/functions.php';
$all = get_published_startups();

$q      = trim($_GET['q'] ?? '');
$sector = $_GET['sector'] ?? '';
$city   = $_GET['city'] ?? '';
$raise  = $_GET['raise'] ?? '';

$sectors = array_values(array_unique(array_map(fn($s) => $s['sector'], $all))); sort($sectors);
$cities  = array_values(array_unique(array_map(fn($s) => $s['city'], $all)));  sort($cities);

$buckets = [
  '' => [0, PHP_INT_MAX],
  'u5' => [0, 5000000],
  '5-8' => [5000000, 8000000],
  '8p' => [8000000, PHP_INT_MAX],
];
[$bmin, $bmax] = $buckets[$raise] ?? $buckets[''];

$filtered = array_filter($all, function ($s) use ($q, $sector, $city, $bmin, $bmax) {
    if ($sector && $s['sector'] !== $sector) return false;
    if ($city && $s['city'] !== $city) return false;
    if ($s['raise_max'] < $bmin || $s['raise_min'] > $bmax) return false;
    if ($q) {
        $hay = strtolower($s['name'].' '.$s['one_liner'].' '.$s['sector'].' '.$s['city']);
        if (strpos($hay, strtolower($q)) === false) return false;
    }
    return true;
});

$page_title = 'Startup directory · findinvestors';
$page_desc  = 'Browse revenue-generating Pakistani startups by sector, city, stage and raise size.';
$active = 'startups';
require __DIR__ . '/inc/header.php';
?>
<div class="container section-sm">
  <h1 class="h1">Startups</h1>
  <p class="lead" style="max-width:560px;">Every business here makes real revenue. Filter by sector, city or raise size — and request an intro when something catches your eye.</p>

  <form method="get" class="chips mt-10" style="gap:12px;">
    <input class="input" style="width:auto;flex:1;min-width:200px;" type="search" name="q" value="<?= e($q) ?>" placeholder="Search startups…" aria-label="Search">
    <select class="select" style="width:auto;" name="sector" aria-label="Sector" onchange="this.form.submit()">
      <option value="">All sectors</option>
      <?php foreach ($sectors as $o): ?><option<?= $sector===$o?' selected':'' ?>><?= e($o) ?></option><?php endforeach; ?>
    </select>
    <select class="select" style="width:auto;" name="city" aria-label="City" onchange="this.form.submit()">
      <option value="">All cities</option>
      <?php foreach ($cities as $o): ?><option<?= $city===$o?' selected':'' ?>><?= e($o) ?></option><?php endforeach; ?>
    </select>
    <select class="select" style="width:auto;" name="raise" aria-label="Raise size" onchange="this.form.submit()">
      <?php
      $rl = ['' => 'Any raise size', 'u5' => 'Under PKR 5M', '5-8' => 'PKR 5M–8M', '8p' => 'PKR 8M+'];
      foreach ($rl as $k => $v): ?><option value="<?= e($k) ?>"<?= $raise===$k?' selected':'' ?>><?= e($v) ?></option><?php endforeach; ?>
    </select>
    <button class="btn btn-secondary" type="submit">Search</button>
  </form>

  <p class="muted mt-6" style="font-size:14px;"><?= count($filtered) ?> <?= count($filtered)===1?'startup':'startups' ?></p>

  <div class="grid grid-3 mt-4">
    <?php foreach ($filtered as $s) { include __DIR__ . '/inc/startup-card.php'; } ?>
  </div>
  <?php if (!count($filtered)): ?>
    <div class="card text-center mt-10" style="border:1px dashed rgba(11,27,43,.15);padding:48px;">
      <p class="muted">Nothing matches those filters yet.</p>
    </div>
  <?php endif; ?>
</div>
<?php require __DIR__ . '/inc/footer.php'; ?>
