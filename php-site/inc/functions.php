<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/mailer.php';

/** Escape for HTML output. */
function e($v): string {
    return htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');
}

/** Format a PKR amount as a short M / lakh / crore string. */
function raise_band($min, $max): string {
    $m = function ($n) {
        $v = $n / 1000000;
        $s = rtrim(rtrim(number_format($v, 1, '.', ''), '0'), '.');
        return $s . 'M';
    };
    return 'PKR ' . $m($min) . '–' . $m($max);
}

/** Make a URL-safe slug from a name. */
function slugify(string $name): string {
    $s = strtolower(trim($name));
    $s = preg_replace('/[^a-z0-9]+/', '-', $s);
    $s = trim($s, '-');
    return substr($s, 0, 70) ?: 'startup';
}

/** All published startups, featured first. */
function get_published_startups(): array {
    try {
        return db()->query(
            "SELECT * FROM startups WHERE published = 1 ORDER BY featured DESC, created_at DESC"
        )->fetchAll();
    } catch (Throwable $e) {
        return [];
    }
}

function get_featured_startups(int $limit = 6): array {
    $all = get_published_startups();
    $featured = array_values(array_filter($all, fn($s) => (int) $s['featured'] === 1));
    $list = count($featured) >= $limit ? $featured : $all;
    return array_slice($list, 0, $limit);
}

function get_startup_by_slug(string $slug): ?array {
    try {
        $stmt = db()->prepare("SELECT * FROM startups WHERE slug = ? AND published = 1");
        $stmt->execute([$slug]);
        $row = $stmt->fetch();
        return $row ?: null;
    } catch (Throwable $e) {
        return null;
    }
}

/** WhatsApp deep link with an optional prefilled message. */
function wa_link(string $text = ''): string {
    $base = 'https://wa.me/' . WHATSAPP_NUMBER;
    return $text ? $base . '?text=' . rawurlencode($text) : $base;
}

/**
 * Send a notification email. Prefers authenticated SMTP (reliable); falls back
 * to PHP mail() if SMTP isn't configured. Best-effort — never throws.
 * Returns [bool $sent, string $error] so callers/tests can report the reason.
 */
function notify(string $subject, string $body): array {
    $to = (defined('MAIL_TO') && MAIL_TO) ? MAIL_TO : '';
    if (!$to) return [false, 'MAIL_TO not set'];

    // Preferred path: authenticated SMTP
    if (defined('SMTP_PASS') && SMTP_PASS !== '') {
        $err = null;
        if (smtp_send($to, $subject, $body, $err)) return [true, 'sent via SMTP'];
        error_log('findinvestors SMTP failed: ' . $err);
        // fall through to mail()
    }

    // Fallback: PHP mail()
    $from = (defined('MAIL_FROM') && MAIL_FROM) ? MAIL_FROM : CONTACT_EMAIL;
    $headers = 'From: findinvestors <' . $from . ">\r\n" .
               'Reply-To: ' . $from . "\r\n" .
               'Content-Type: text/plain; charset=UTF-8';
    $sent = @mail($to, $subject, $body, $headers);
    return [$sent, $sent ? 'sent via PHP mail()' : 'PHP mail() returned false (SMTP recommended)'];
}

/** Field labels shared by the apply form and the admin editor. */
function startup_fields(): array {
    return [
        'name'           => 'Company name',
        'slug'           => 'Slug (URL, e.g. chai-theory)',
        'one_liner'      => 'One-liner (max ~160 chars)',
        'sector'         => 'Sector',
        'city'           => 'City',
        'founded_year'   => 'Year founded',
        'entity_type'    => 'Entity type',
        'website'        => 'Website',
        'problem'        => 'Problem',
        'solution'       => 'Solution',
        'business_model' => 'Business model',
        'target_market'  => 'Target market',
        'competition'    => 'Competition',
        'revenue_band'   => 'Monthly revenue band',
        'months_running' => 'Months running',
        'customers'      => 'Customers',
        'growth_pct'     => 'Growth',
        'milestones'     => 'Milestones',
        'raise_min'      => 'Raise minimum (PKR)',
        'raise_max'      => 'Raise maximum (PKR)',
        'equity_offered' => 'Equity offered',
        'use_of_funds'   => 'Use of funds',
        'founder_name'   => 'Founder name',
        'founder_role'   => 'Founder role',
        'founder_bio'    => 'Founder bio',
        'linkedin'       => 'LinkedIn',
        'team_size'      => 'Team size',
        'deck_url'       => 'Pitch deck URL',
        'video_url'      => 'Video URL',
    ];
}

/** Sector and city option lists for dropdowns. */
function sector_options(): array {
    return ['F&B', 'E-commerce', 'Logistics', 'EdTech', 'HealthTech', 'D2C Apparel', 'AgriTech', 'FinTech', 'SaaS', 'Other'];
}
function city_options(): array {
    return ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Peshawar', 'Multan', 'Quetta', 'Other'];
}
