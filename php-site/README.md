# findinvestors.pk — PHP + MySQL version

A plain PHP site (no Node.js, no build step). Upload the files, fill in
`config.php`, run `setup.php` once — done. Works on any standard Hostinger
shared-hosting plan with PHP 8 and MySQL.

## What's included

- Full public site: home, startup directory (search + filters), profiles with
  intro-request modal, application form, and static pages.
- **WhatsApp floating button on every page** → wa.me/923110844455.
- **Admin dashboard** at `/admin/`: log in, see all startups, applications and
  intro requests, add/edit startups (with **logo upload**), and **publish** —
  published changes are instantly live on the website because every page reads
  straight from the database.

## Install (5 minutes)

1. **Create a MySQL database** in hPanel → Databases. Note the database name,
   username, password, and host.
2. **Edit `config.php`** — fill in `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`,
   and change `ADMIN_USER` / `ADMIN_PASS`. (WhatsApp number is already set to
   923110844455.)
3. **Upload the contents of this folder** to `public_html` (via File Manager or
   FTP). Upload the *contents* of `php-site/`, so `index.php` sits at the web
   root.
4. **Visit `https://yourdomain/setup.php`** once. It creates the tables and
   loads the 15 sample startups. Then **delete `setup.php`** from the server.
5. Open the site. Log in at `https://yourdomain/admin/`.

## Daily use

- **Add a startup:** Admin → “Add new startup”, fill in fields, upload a logo,
  tick **Published**, Save. It appears on the site immediately.
- **Edit a startup:** Admin → Edit → change anything → Save. Live at once.
- **Publish/unpublish:** the button on each row toggles whether a profile shows
  on the website.
- **A founder applied via the site:** it appears under “Applications”. Click
  **Convert →** to turn it into an editable startup profile, then publish.

## Notes

- Logo uploads are stored in `/assets/uploads/`. On Hostinger this persists
  normally (it's not the ephemeral setup Node apps have).
- Notification emails: set `NOTIFY_EMAIL` in `config.php` to get an email on new
  applications and intro requests (uses PHP `mail()`).
- The sample startups are placeholders — replace them with real companies before
  you promote the site. Edit or delete them from the dashboard.
- Replace the seed data before launch; placeholder data must never go live.
