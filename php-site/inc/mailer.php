<?php
/**
 * Minimal, dependency-free SMTP mailer (SSL on 465, or STARTTLS on 587).
 * Used for reliable delivery of form notifications on Hostinger.
 * Returns true on success; on failure sets $error and returns false.
 */
function smtp_send(string $to, string $subject, string $body, ?string &$error = null): bool {
    if (!defined('SMTP_HOST') || !SMTP_HOST || !defined('SMTP_PASS') || SMTP_PASS === '') {
        $error = 'SMTP not configured';
        return false;
    }

    $host = SMTP_HOST;
    $port = (int) SMTP_PORT;
    $user = SMTP_USER;
    $pass = SMTP_PASS;
    $from = (defined('MAIL_FROM') && MAIL_FROM) ? MAIL_FROM : $user;
    $ehloHost = $_SERVER['HTTP_HOST'] ?? 'localhost';

    $transport = ($port === 465) ? 'ssl://' : 'tcp://';
    $ctx = stream_context_create();
    $fp = @stream_socket_client($transport . $host . ':' . $port, $errno, $errstr, 20,
        STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) { $error = "connect failed: $errstr ($errno)"; return false; }
    stream_set_timeout($fp, 20);

    $read = function () use ($fp) {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            // A space in the 4th char marks the final line of an SMTP reply.
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $data;
    };
    $cmd = function ($c) use ($fp, $read) { fwrite($fp, $c . "\r\n"); return $read(); };
    $ok = function ($resp, $code) use (&$error) {
        if (strncmp($resp, $code, strlen($code)) !== 0) { $error = trim($resp); return false; }
        return true;
    };

    if (!$ok($read(), '220')) { fclose($fp); return false; }
    if (!$ok($cmd('EHLO ' . $ehloHost), '250')) { fclose($fp); return false; }

    if ($port === 587) {
        if (!$ok($cmd('STARTTLS'), '220')) { fclose($fp); return false; }
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            $error = 'STARTTLS negotiation failed'; fclose($fp); return false;
        }
        if (!$ok($cmd('EHLO ' . $ehloHost), '250')) { fclose($fp); return false; }
    }

    if (!$ok($cmd('AUTH LOGIN'), '334')) { fclose($fp); return false; }
    if (!$ok($cmd(base64_encode($user)), '334')) { fclose($fp); return false; }
    if (!$ok($cmd(base64_encode($pass)), '235')) { fclose($fp); return false; }

    if (!$ok($cmd('MAIL FROM:<' . $from . '>'), '250')) { fclose($fp); return false; }
    if (!$ok($cmd('RCPT TO:<' . $to . '>'), '25')) { fclose($fp); return false; }
    if (!$ok($cmd('DATA'), '354')) { fclose($fp); return false; }

    $headers  = 'From: findinvestors <' . $from . ">\r\n";
    $headers .= 'To: <' . $to . ">\r\n";
    $headers .= 'Reply-To: <' . $from . ">\r\n";
    $headers .= 'Subject: =?UTF-8?B?' . base64_encode($subject) . "?=\r\n";
    $headers .= 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
    $headers .= 'Date: ' . date('r') . "\r\n";

    // Normalise line endings and dot-stuff lines beginning with "."
    $bodyOut = str_replace(["\r\n", "\r"], "\n", $body);
    $bodyOut = str_replace("\n", "\r\n", $bodyOut);
    $bodyOut = preg_replace('/^\./m', '..', $bodyOut);

    $payload = $headers . "\r\n" . $bodyOut . "\r\n.";
    if (!$ok($cmd($payload), '250')) { fclose($fp); return false; }

    fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return true;
}
