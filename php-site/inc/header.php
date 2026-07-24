<?php
require_once __DIR__ . '/functions.php';
$page_title = $page_title ?? 'findinvestors — Pakistani startups, seen by investors';
$page_desc  = $page_desc ?? "Where Pakistan's revenue-generating startups get seen by people who write cheques.";
$active     = $active ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($page_title) ?></title>
<meta name="description" content="<?= e($page_desc) ?>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
<header class="site-header">
  <div class="container header-row">
    <a href="/" class="logo" aria-label="findinvestors home"><span class="find">find</span><span class="investors">investors</span></a>
    <nav class="nav" aria-label="Main">
      <a href="/startups.php"<?= $active==='startups'?' class="text-green"':'' ?>>Startups</a>
      <a href="/how-it-works.php"<?= $active==='how'?' class="text-green"':'' ?>>How it works</a>
      <a href="/about.php"<?= $active==='about'?' class="text-green"':'' ?>>About</a>
      <a href="/contact.php"<?= $active==='contact'?' class="text-green"':'' ?>>Contact</a>
      <a href="/apply.php" class="btn btn-primary" style="padding:10px 20px;">List your startup</a>
    </nav>
    <button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
  </div>
  <div class="mobile-nav" id="mobileNav">
    <div class="container">
      <a href="/startups.php">Startups</a>
      <a href="/how-it-works.php">How it works</a>
      <a href="/about.php">About</a>
      <a href="/contact.php">Contact</a>
      <a href="/apply.php" class="btn btn-primary btn-block mt-2">List your startup</a>
    </div>
  </div>
</header>
<main>
