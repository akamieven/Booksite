// Modern, modular, accessible script for the authors view
// Improvements:
// - ES6 module-like pattern (IIFE) to keep scope clean
// - Debounced, case-insensitive search
// - Render with DocumentFragment (faster DOM updates)
// - No inline HTML for dynamic content (use textContent) to avoid accidental XSS
// - Lazy-loading images, keyboard accessibility (Enter on cards, Escape to close modal)
// - Copy-to-clipboard with non-blocking toast feedback (no alert popups)
// - Single place to edit authorsData (easy to read / edit); can be moved to JSON later
// - Clear CSS class hooks so appearance is handled in CSS, not inline styles

(() => {
  // ====== Data: edit here ======
  // Keep this array small and simple to edit; move to authors.json and fetch() if you prefer.
  const authorsData = [
    {
      id: 1,
      name: "غسان كنفاني",
      image: "https://i.postimg.cc/054GzSS1/5b2cc74e67c83d85a860d5c9ff81c0d4.jpg",
      bio: `غسان كنفاني (عكا 9 أبريل 1936 - بيروت 8 يوليو 1972) هو روائي وقاص وصحفي فلسطيني...`,
      quotes: [
        { text: `لقد اهترأت هذه الأقوال العتيقة، هذه المعادلات الحسابية المترعة بالأخادع...`, book: "مختارات" , tag: "" },
        { text: `أتعرفين؟ طوال عشرين سنة كنت أتصور أن بوابة "مندلبوم" ستفتح ذات يوم...`, book: "عائد إلى حيفا", tag: "" }
      ]
    },
    {
      id: 2,
      name: "ستيفان زفايغ",
      image: "https://i.postimg.cc/Y9cMsbG3/50e7371c9c64fc9848057668a1310b16.jpg",
      bio: `شتيفان زفايغ (28 نوفمبر 1881 ـ 22 فبراير 1942) أديب وكاتب نمساوي...`,
      quotes: [
        { text: `انطبع على شفتيّ طعمٌ مر، طعم تفاهةِ الحياة البشريّة...`, book: "مختارات", tag: "" },
        { text: `لقد كانوا يعذبوننا بالعزلة، عزلة خالصة...`, book: "قصص", tag: "" }
      ]
    }
  ];
  // ==============================

  // Quick lookup by id
  const authorsById = new Map(authorsData.map(a => [String(a.id), a]));

  // Cache DOM nodes (assumes these IDs exist in your HTML)
  const container = document.getElementById('authorsContainer');
  const searchInput = document.getElementById('searchInput');
  const themeToggle = document.getElementById('themeToggle');
  const modal = document.getElementById('authorModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = modal ? modal.querySelector('.close-btn') : null;

  if (!container) {
    console.warn('Authors container (#authorsContainer) not found. Script exiting.');
    return;
  }

  // Utility: debounce
  const debounce = (fn, wait = 250) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  };

  // Utility: create element with classes, attrs and children
  const el = (tag, { className, attrs = {}, text = null } = {}, children = []) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    if (text !== null) node.textContent = text;
    children.forEach(child => node.appendChild(child));
    return node;
  };

  // Show toast feedback (non-blocking)
  const showToast = (message, timeout = 1800) => {
    let toast = document.getElementById('copiedToast');
    if (!toast) {
      toast = el('div', { className: 'copied-toast', attrs: { id: 'copiedToast', role: 'status', 'aria-live': 'polite' } });
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('visible'), timeout);
  };

  // Copy text to clipboard with graceful fallback
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast('تم النسخ!');
    } catch (err) {
      // fallback: create temporary textarea
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast('تم النسخ!');
      } catch (err2) {
        console.error('Copy failed', err2);
        showToast('فشل النسخ');
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  // Render author list
  function renderAuthors(filter = '') {
    const q = (filter || '').trim().toLowerCase();
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const matching = authorsData.filter(a => a.name.toLowerCase().includes(q) || (a.bio || '').toLowerCase().includes(q));

    if (matching.length === 0) {
      const empty = el('div', { className: 'authors-empty', text: 'لا توجد نتائج.' });
      fragment.appendChild(empty);
    } else {
      matching.forEach(author => {
        const img = el('img', { className: 'author-img', attrs: { src: author.image, alt: author.name, loading: 'lazy' } });
        const h3 = el('h3', { className: 'author-name', text: author.name });
        const card = el('button', { className: 'author-card', attrs: { type: 'button', 'data-id': String(author.id), 'aria-label': `عرض ${author.name}` } }, [img, h3]);
        // keyboard + click handled via event delegation (below)
        fragment.appendChild(card);
      });
    }

    container.appendChild(fragment);
  }

  // Build modal content safely (textContent + create elements)
  function openModalById(id) {
    const author = authorsById.get(String(id));
    if (!author || !modal || !modalBody) return;
    // clear previous
    modalBody.innerHTML = '';

    const header = el('div', { className: 'modal-header' });
    const avatar = el('img', { className: 'modal-avatar', attrs: { src: author.image, alt: author.name, loading: 'lazy' } });
    const title = el('h2', { className: 'modal-title', text: author.name });
    header.appendChild(avatar);
    header.appendChild(title);

    // Bio paragraphs
    const bioContainer = el('div', { className: 'modal-bio' });
    // split on blank lines to form paragraphs when editing bio; allows simple editing of bio string
    (author.bio || '').split(/\n\s*\n/).forEach(pText => {
      const p = el('p', { text: pText.trim() });
      bioContainer.appendChild(p);
    });

    // Quotes
    const quotesContainer = el('div', { className: 'modal-quotes' });
    const qHeading = el('h3', { className: 'quotes-heading', text: 'إقتباسات' });
    quotesContainer.appendChild(qHeading);

    (author.quotes || []).forEach((q, idx) => {
      const quoteBox = el('blockquote', { className: 'quote-box' });
      const quoteText = el('p', { className: 'quote-text', text: q.text });
      const meta = el('div', { className: 'quote-meta' });
      const metaLeft = el('div', { className: 'quote-book', text: q.book || '' });
      const metaRight = el('div', { className: 'quote-actions' });

      const copyBtn = el('button', { className: 'quote-copy', attrs: { type: 'button', 'aria-label': `نسخ اقتباس ${author.name}` } }, []);
      copyBtn.innerHTML = `<i class="fas fa-copy" aria-hidden="true"></i> نسخ`; // small innerHTML for icon; text is safe
      copyBtn.addEventListener('click', () => {
        const full = `"${q.text}"\n— ${author.name}`;
        copyToClipboard(full);
      });

      if (q.tag) {
        const tag = el('span', { className: 'quote-tag', text: `#${q.tag}` });
        metaLeft.appendChild(tag);
      }

      metaRight.appendChild(copyBtn);
      meta.appendChild(metaLeft);
      meta.appendChild(metaRight);

      quoteBox.appendChild(quoteText);
      quoteBox.appendChild(meta);
      quotesContainer.appendChild(quoteBox);
    });

    modalBody.appendChild(header);
    modalBody.appendChild(bioContainer);
    modalBody.appendChild(quotesContainer);

    // show modal
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    // focus management
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  // Event delegation for author cards
  function onContainerClick(e) {
    const btn = e.target.closest('.author-card');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    if (id) openModalById(id);
  }

  // Keyboard handling for author cards (Enter to open)
  function onContainerKeydown(e) {
    const target = e.target;
    if (target && target.classList && target.classList.contains('author-card')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = target.getAttribute('data-id');
        if (id) openModalById(id);
      }
    }
  }

  // Bind events
  function bind() {
    container.addEventListener('click', onContainerClick);
    container.addEventListener('keydown', onContainerKeydown);

    if (searchInput) {
      searchInput.addEventListener('input', debounce((ev) => renderAuthors(ev.target.value), 200));
    }

    if (themeToggle) {
      themeToggle.addEventListener('click', () => document.body.classList.toggle('dark-mode'));
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    // close modal on overlay click (click outside modalBody)
    if (modal) {
      modal.addEventListener('click', (ev) => {
        if (ev.target === modal) closeModal();
      });
    }

    // Escape key to close modal
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') closeModal();
    });
  }

  // Initialize
  function init() {
    renderAuthors('');
    bind();
  }

  // Expose init globally so you can call it if you dynamically load data
  window.AuthorsModule = { init, renderAuthors, openModalById, authorsData };

  // Auto-init on DOMContentLoaded if script is loaded in head
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();