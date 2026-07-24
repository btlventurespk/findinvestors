<?php
require_once __DIR__ . '/auth.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $u = $_POST['username'] ?? '';
    $p = $_POST['password'] ?? '';
    if (check_login($u, $p)) {
        session_regenerate_id(true);
        $_SESSION['fi_admin'] = true;
        header('Location: /admin/');
        exit;
    }
    $error = 'Wrong username or password.';
}
if (admin_logged_in()) { header('Location: /admin/'); exit; }

$page_title = 'Admin login · findinvestors';
require __DIR__ . '/../inc/header.php';
?>
<div class="container section-sm max-w-sm">
  <h1 class="h2">Admin login</h1>
  <p class="muted mt-2" style="font-size:14px;">For the findinvestors team only.</p>
  <?php if ($error): ?><div class="alert alert-error mt-6"><?= e($error) ?></div><?php endif; ?>
  <form method="post" class="mt-8">
    <div class="field"><label>Username</label><input class="input" name="username" required autocomplete="username"></div>
    <div class="field"><label>Password</label><input class="input" name="password" type="password" required autocomplete="current-password"></div>
    <button class="btn btn-primary btn-block mt-2" type="submit">Sign in</button>
  </form>
</div>
<?php require __DIR__ . '/../inc/footer.php'; ?>
