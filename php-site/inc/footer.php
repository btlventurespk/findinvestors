</main>
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a href="/" class="logo"><span style="color:#fff">find</span><span class="investors">investors</span></a>
        <p class="mt-4" style="color:var(--slate); max-width:280px; font-size:14px;">
          Where Pakistan's revenue-generating startups get seen by people who write cheques.
        </p>
      </div>
      <div>
        <h4>Platform</h4>
        <ul>
          <li><a href="/startups.php">Browse startups</a></li>
          <li><a href="/apply.php">Apply to be listed</a></li>
          <li><a href="/how-it-works.php">How it works</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="/about.php">About</a></li>
          <li><a href="/contact.php">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Legal</h4>
        <ul>
          <li><a href="/privacy.php">Privacy</a></li>
          <li><a href="/terms.php">Terms</a></li>
          <li><a href="/disclaimer.php">Disclaimer</a></li>
        </ul>
      </div>
    </div>
    <div class="disclaimer">
      <p>findinvestors is a media and profiling platform. It does not offer, sell, or solicit securities, and does not provide investment advice. All discussions occur directly between the parties.</p>
      <p class="mt-3">© <?= date('Y') ?> findinvestors · findinvestors.pk</p>
    </div>
  </div>
</footer>

<!-- WhatsApp floating button (all pages) -->
<a class="wa-float" href="<?= e(wa_link('Hi findinvestors, I have a question.')) ?>" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.036.53 4.005 1.537 5.748L4 29l8.44-1.51A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm0 21.82c-1.81 0-3.58-.487-5.126-1.41l-.368-.218-4.29.768.797-4.18-.24-.383A9.79 9.79 0 016.18 15c0-5.42 4.41-9.82 9.82-9.82 5.42 0 9.82 4.4 9.82 9.82 0 5.41-4.4 9.82-9.82 9.82zm5.383-7.352c-.295-.148-1.746-.862-2.017-.96-.27-.099-.467-.148-.664.148-.196.295-.762.96-.934 1.157-.172.196-.344.221-.639.074-.295-.148-1.246-.459-2.373-1.465-.877-.782-1.469-1.748-1.641-2.043-.172-.295-.018-.454.13-.601.134-.132.295-.344.443-.516.148-.172.196-.295.295-.492.099-.196.05-.369-.025-.516-.074-.148-.664-1.6-.91-2.192-.24-.576-.483-.498-.664-.507l-.566-.01c-.196 0-.516.074-.786.369-.27.295-1.033 1.01-1.033 2.462 0 1.452 1.058 2.855 1.205 3.052.148.196 2.083 3.18 5.045 4.458.705.304 1.255.486 1.684.622.708.225 1.352.193 1.861.117.568-.085 1.746-.714 1.992-1.403.246-.688.246-1.279.172-1.403-.074-.123-.27-.196-.565-.344z"/></svg>
  <span class="wa-label">WhatsApp</span>
</a>

<script>
(function(){
  var t=document.getElementById('navToggle'),n=document.getElementById('mobileNav');
  if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o);});}
})();
</script>
</body>
</html>
