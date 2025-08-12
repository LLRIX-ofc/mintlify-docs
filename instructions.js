// public/custom.js
(function () {
  const DEBUG = true;

  function debugLog(...args) { if (DEBUG) console.log('[instructions]', ...args); }
  debugLog('custom.js loaded');

  // Helper: get param name from various element types
  function extractParamNameFromElement(el) {
    if (!el) return null;

    // If it's an anchor with href="#param-..."
    if (el.tagName === 'A') {
      const href = el.getAttribute('href') || '';
      const m = href.match(/^#param-(.+)/i);
      if (m) return m[1];
    }

    // If element has id like "param-title"
    const id = (el.id || '').trim();
    if (id) {
      const mid = id.match(/^param-(.+)/i);
      if (mid) return mid[1];
    }

    // If it has data attributes that might carry the name (fallback)
    const dataName = el.getAttribute && (el.getAttribute('data-param') || el.getAttribute('data-param-name') || el.getAttribute('data-param-query'));
    if (dataName) return dataName;

    // Look for an inner anchor that points to #param-...
    const innerA = el.querySelector && el.querySelector('a[href^="#param-"]');
    if (innerA) {
      const im = (innerA.getAttribute('href') || '').match(/^#param-(.+)/i);
      if (im) return im[1];
    }

    // Try common class elements inside param field
    const nameEl = el.querySelector && (el.querySelector('.param-name') || el.querySelector('.parameter-name') || el.querySelector('.paramLabel') || el.querySelector('.name'));
    if (nameEl) {
      const txt = (nameEl.textContent || '').trim();
      if (txt) return txt.split(/\s+/)[0]; // fallback: first token
    }

    // Last resort: use trimmed text content (first token)
    const text = (el.textContent || '').trim();
    if (text) return text.split(/\s+/)[0];

    return null;
  }

  // Intercept clicks at document level in capture phase so we run before other handlers
  function clickInterceptor(e) {
    try {
      // Find nearest anchor with href starting "#param-" OR nearest ancestor with id "param-..."
      const anchor = e.target && e.target.closest && e.target.closest('a[href^="#param-"]');
      let candidate = anchor || (e.target && e.target.closest && e.target.closest('[id^="param-"]')) || (e.target && e.target.closest && e.target.closest('.param-field, .paramField, .param'));

      if (!candidate) {
        // No relevant element in click chain
        return;
      }

      const paramRaw = extractParamNameFromElement(candidate);
      if (!paramRaw) return;

      const paramName = String(paramRaw).trim();
      if (!paramName) return;

      // Build redirect target
      const targetUrl = '/instructions#' + encodeURIComponent(paramName.toLowerCase());

      // Stop other handlers and navigate
      if (DEBUG) debugLog('Intercepted click for param:', paramName, '->', targetUrl, 'element:', candidate);

      e.preventDefault();
      e.stopImmediatePropagation();

      // Use location.assign to behave like a navigation
      window.location.assign(targetUrl);
    } catch (err) {
      console.error('[instructions] clickInterceptor error', err);
    }
  }

  // Rewrite anchors proactively (fallback)
  function rewriteAnchorsOnce() {
    try {
      const anchors = Array.from(document.querySelectorAll('a[href^="#param-"]'));
      anchors.forEach(a => {
        if (a.dataset.__instructions_rewritten) return;
        const href = a.getAttribute('href') || '';
        const m = href.match(/^#param-(.+)/i);
        if (!m) return;
        const q = m[1].trim();
        if (!q) return;
        const newHref = '/instructions#' + encodeURIComponent(q.toLowerCase());
        a.setAttribute('href', newHref);
        a.dataset.__instructions_rewritten = '1';
        a.style.cursor = 'pointer';
        if (DEBUG) debugLog('Rewrote anchor', href, '->', newHref, a);
      });
    } catch (err) {
      console.error('[instructions] rewriteAnchorsOnce error', err);
    }
  }

  // Install mutation observer to catch async render
  function setupMutationObserver() {
    try {
      const mo = new MutationObserver(muts => {
        for (const m of muts) {
          if (m.addedNodes && m.addedNodes.length) {
            rewriteAnchorsOnce();
          }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      if (DEBUG) debugLog('MutationObserver set up');
      return mo;
    } catch (err) {
      console.error('[instructions] setupMutationObserver error', err);
    }
  }

  // Boot
  document.addEventListener('DOMContentLoaded', () => {
    debugLog('DOMContentLoaded fired — attaching capture listener');

    // Capture-phase click listener so we run before Mintlify's handlers
    document.addEventListener('click', clickInterceptor, true);

    // initial rewrite pass
    rewriteAnchorsOnce();

    // mutation observer for async content
    setupMutationObserver();

    // periodic retry for a short window (covers race conditions)
    let attempts = 0;
    const interval = setInterval(() => {
      rewriteAnchorsOnce();
      attempts++;
      if (attempts > 20) clearInterval(interval); // stop after ~10s
    }, 500);

    debugLog('setup complete');
  });
})();
