<?php
require_once __DIR__ . '/inc/functions.php';
$page_title = 'How it works · findinvestors';
$active = 'how';
require __DIR__ . '/inc/header.php';
?>
<div class="container section-sm max-w-3xl">
  <h1 class="h1">How it works</h1>
  <p class="lead">Three steps between you and being seen by people who write cheques.</p>
  <div class="space-y mt-12">
    <?php
    $steps = [
      ['1','Apply','Fill in the application — company, business, traction, raise, team, contact. It takes about 15 minutes. We only accept businesses that already make revenue.'],
      ['2','We meet you','Our team reviews every application. If your business fits, we set up a call within 5 working days. We only list businesses we can stand behind — that\'s what makes a listing here worth something.'],
      ['3','You go live','We build your profile together — the story, the traction, the raise ask. Once you approve it, it goes live in the directory. Investors browsing findinvestors can request an intro, and we connect you directly.'],
    ];
    foreach ($steps as $st): ?>
    <div class="card"><div class="row" style="align-items:flex-start;">
      <span class="step-num" style="flex-shrink:0;"><?= e($st[0]) ?></span>
      <div><h2 class="h3"><?= e($st[1]) ?></h2><p class="mt-2" style="color:rgba(11,27,43,.8);"><?= e($st[2]) ?></p></div>
    </div></div>
    <?php endforeach; ?>
  </div>

  <h2 class="h2 mt-12">Questions founders ask</h2>
  <div class="mt-8 space-y">
    <?php
    $faqs = [
      ['Does listing cost anything?','No. Applying and being listed is free for founders.'],
      ['Do you guarantee funding?','No, and be wary of anyone who does. We give your business visibility with people who invest in Pakistani companies. Whether a conversation turns into a cheque is between you and them.'],
      ['Who are the investors?','We never publish investor names or details. When an investor requests an intro to your startup, we connect you directly and step back.'],
      ['What if I have no revenue yet?','We only list revenue-generating businesses. It keeps the directory credible. Come back when the revenue is flowing.'],
    ];
    foreach ($faqs as $f): ?>
    <div><h3 class="strong" style="font-size:18px;"><?= e($f[0]) ?></h3><p class="mt-2" style="color:rgba(11,27,43,.8);"><?= e($f[1]) ?></p></div>
    <?php endforeach; ?>
  </div>
  <div class="text-center mt-12"><a class="btn btn-primary" href="/apply.php">List your startup</a></div>
</div>
<?php require __DIR__ . '/inc/footer.php'; ?>
