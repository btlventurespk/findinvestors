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
define('CONTACT_EMAIL', 'hello@findinvestors.pk'); // shown publicly on the site

// ---- Email notifications (sent when someone fills a form) --------------
// Where the notification emails are delivered:
define('MAIL_TO', 'hello@findinvestors.pk');

// SMTP — recommended, reliable delivery. Create the mailbox in
// hPanel -> Emails first, then paste its password into SMTP_PASS below.
// Leave SMTP_PASS blank to fall back to PHP mail() (less reliable).
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 465);                       // 465 = SSL (recommended), 587 = TLS
define('SMTP_USER', 'hello@findinvestors.pk');  // the mailbox you send FROM
define('SMTP_PASS', '');                        // that mailbox's password
define('MAIL_FROM', 'hello@findinvestors.pk');  // usually same as SMTP_USER

// ---- Site ---------------------------------------------------------------
define('SITE_URL', 'https://findinvestors.pk');

date_default_timezone_set('Asia/Karachi');
