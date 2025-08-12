// public/custom.js
(function () {
  const PROCESSED_FLAG = 'data-instructions-processed';

  function processRoot(root = document) {
    root.querySelectorAll('.param-instructions a[href^="#param-"]').forEach(anchor => {
      if (anchor.dataset[PROCESSED_FLAG]) return; // skip if already processed
      anchor.dataset[PROCESSED_FLAG] = '1';

      const original = anchor.getAttribute('href');      // "#param-TITLE"
      const query = (original || '').replace(/^#param-/, '').toLowerCase();
      if (!query) return;

      const newHref = `/instructions#${encodeURIComponent(query)}`;

      // Update href and override click to ensure redirect works consistently
      anchor.setAttribute('href', newHref);
      anchor.style.cursor = 'pointer';
      anchor.addEventListener('click', evt => {
        evt.preventDefault();
        window.location.href = newHref;
      });

      console.log('[instructions] updated anchor:', original, '→', newHref);
    });
  }

  // Run once on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    processRoot(document);

    // Also observe DOM mutations for content that is rendered after initial load
    const mo = new MutationObserver(muts => {
      for (const m of muts) {
        m.addedNodes.forEach(node => {
          if (node.nodeType === 1) processRoot(node);
        });
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });
  });
})();




console.log("Custom.js is loaded!");

