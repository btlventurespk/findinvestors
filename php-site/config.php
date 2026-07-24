<?php
/**
 * findinvestors.pk — configuration
 * Edit the values below, then upload. Nothing else needs changing.
 */

// ---- Database (from hPanel → Databases) --------------------------------
define('DB_HOST', '127.0.0.1');          // usually 127.0.0.1 or localhost
define('DB_NAME', 'u728784867_findinv'); // your database name
define('DB_USER', 'u728784867_findinv'); // your database user
define('DB_PASS', 'CHANGE_ME');          // your database password (plain, not URL-encoded)

// ---- Admin login (used at /admin) --------------------------------------
define('ADMIN_USER', 'admin');
define('ADMIN_PASS', 'ChangeThisPassword!'); // pick a strong one

// ---- Contact / WhatsApp ------------------------------------------------
define('WHATSAPP_NUMBER', '923110844455'); // country code, no + or spaces
define('CONTACT_EMAIL', 'info@findinvestors.pk');

// ---- Notification email (optional; leave blank to disable) -------------
define('NOTIFY_EMAIL', ''); // e.g. btlventurespk@gmail.com — uses PHP mail()

// ---- Site ---------------------------------------------------------------
define('SITE_URL', 'https://findinvestors.pk');

date_default_timezone_set('Asia/Karachi');
