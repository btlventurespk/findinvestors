<?php
require_once __DIR__ . '/inc/functions.php';

$sent = false; $error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $required = ['companyName','oneLiner','sector','city','revenueBand','raiseMin','founderName','email','whatsapp'];
    $missing = false;
    foreach ($required as $r) { if (empty(trim($_POST[$r] ?? ''))) $missing = true; }
    $email = trim($_POST['email'] ?? '');
    if ($missing || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Please fill in all required fields with a valid email.';
    } else {
        $payload = [];
        foreach ($_POST as $k => $v) { $payload[$k] = is_string($v) ? trim($v) : $v; }
        try {
            $stmt = db()->prepare("INSERT INTO applications (payload, email, whatsapp) VALUES (?,?,?)");
            $stmt->execute([json_encode($payload, JSON_UNESCAPED_UNICODE), $email, trim($_POST['whatsapp'])]);
            notify('New application: ' . ($_POST['companyName'] ?? ''), print_r($payload, true));
            $sent = true;
        } catch (Throwable $e) {
            $error = 'Something went wrong saving your application. Please try again.';
        }
    }
}

$page_title = 'Apply to be listed · findinvestors';
$page_desc  = 'List your revenue-generating Pakistani startup on findinvestors.pk. Free to apply.';
$active = 'apply';
require __DIR__ . '/inc/header.php';
?>
<div class="container section-sm max-w-2xl">
<?php if ($sent): ?>
  <div class="text-center" style="padding:48px 0;">
    <div class="logo-box mx-auto" style="width:64px;height:64px;border-radius:999px;background:rgba(22,193,114,.15);color:var(--green-deep);font-size:28px;">✓</div>
    <h1 class="h2 mt-6">Application received.</h1>
    <p class="lead mx-auto" style="max-width:440px;">We read every application. If your business fits, we'll reach out within <span class="strong">5 working days</span> to set up a call.</p>
    <div class="cta-row" style="justify-content:center;">
      <a class="btn btn-primary" href="<?= e(wa_link('Hi, I just submitted my application on findinvestors.pk')) ?>" target="_blank" rel="noopener">Confirm on WhatsApp</a>
      <a class="btn btn-secondary" href="/startups.php">Browse startups</a>
    </div>
  </div>
<?php else: ?>
  <h1 class="h1">Apply to be listed</h1>
  <p class="lead">Tell us about your business. It takes about 15 minutes. Fields marked * are required.</p>
  <?php if ($error): ?><div class="alert alert-error mt-6"><?= e($error) ?></div><?php endif; ?>

  <form method="post" class="mt-8">
    <?php
    function fld($name, $label, $type='text', $opts=null) {
        $val = e($_POST[$name] ?? '');
        echo '<div class="field"><label>'.e($label).'</label>';
        if ($type === 'textarea') {
            echo '<textarea class="textarea" name="'.e($name).'">'.$val.'</textarea>';
        } elseif ($type === 'select') {
            echo '<select class="select" name="'.e($name).'"><option value="">Select…</option>';
            foreach ($opts as $o) { $sel = ($_POST[$name] ?? '')===$o?' selected':''; echo '<option'.$sel.'>'.e($o).'</option>'; }
            echo '</select>';
        } else {
            echo '<input class="input" type="'.e($type).'" name="'.e($name).'" value="'.$val.'">';
        }
        echo '</div>';
    }
    ?>
    <h2 class="h3 mt-6">Company</h2>
    <?php fld('companyName','Company name *'); ?>
    <div class="form-grid">
      <?php fld('city','City *','select', city_options()); ?>
      <?php fld('foundedYear','Year founded'); ?>
      <?php fld('entityType','Entity type','select',['Private Limited','Sole Proprietorship','Partnership','Not registered yet']); ?>
      <?php fld('website','Website'); ?>
    </div>

    <h2 class="h3 mt-8">Business</h2>
    <?php fld('oneLiner','One-liner (max ~160 chars) *'); ?>
    <?php fld('sector','Sector *','select', sector_options()); ?>
    <?php fld('problem','The problem you solve','textarea'); ?>
    <?php fld('solution','Your solution','textarea'); ?>
    <?php fld('businessModel','How you make money','textarea'); ?>
    <?php fld('targetMarket','Target market','textarea'); ?>
    <?php fld('competition','Competition','textarea'); ?>

    <h2 class="h3 mt-8">Traction</h2>
    <div class="form-grid">
      <?php fld('revenueBand','Monthly revenue *','select',['PKR 300k–1M monthly','PKR 1M–2M monthly','PKR 2M–4M monthly','PKR 4M+ monthly']); ?>
      <?php fld('monthsRunning','Months in operation'); ?>
      <?php fld('customers','Customers'); ?>
      <?php fld('growthPct','Growth rate'); ?>
    </div>
    <?php fld('milestones','Milestones','textarea'); ?>

    <h2 class="h3 mt-8">Raise</h2>
    <div class="form-grid">
      <?php fld('raiseMin','Minimum raise in PKR *'); ?>
      <?php fld('raiseMax','Maximum raise in PKR'); ?>
      <?php fld('equityOffered','Equity offered'); ?>
    </div>
    <?php fld('useOfFunds','Use of funds','textarea'); ?>

    <h2 class="h3 mt-8">Team</h2>
    <div class="form-grid">
      <?php fld('founderName','Founder name *'); ?>
      <?php fld('founderRole','Role'); ?>
      <?php fld('teamSize','Team size'); ?>
      <?php fld('linkedin','LinkedIn'); ?>
    </div>
    <?php fld('founderBio','Short bio','textarea'); ?>

    <h2 class="h3 mt-8">Assets & contact</h2>
    <div class="form-grid">
      <?php fld('deckUrl','Pitch deck link'); ?>
      <?php fld('videoUrl','Video link'); ?>
      <?php fld('email','Email *','email'); ?>
      <?php fld('whatsapp','WhatsApp number *'); ?>
    </div>

    <button class="btn btn-primary btn-block mt-8" type="submit">Submit application</button>
  </form>
<?php endif; ?>
</div>
<?php require __DIR__ . '/inc/footer.php'; ?>
