// ZMRA Pinyin & Phonetics Content Script
(function() {
  const QUICK_DICT = {
    '中': { py: 'zhōng', t: 't1' },
    '国': { py: 'guó', t: 't2' },
    '人': { py: 'rén', t: 't2' },
    '好': { py: 'hǎo', t: 't3' },
    '大': { py: 'dà', t: 't4' },
    '的': { py: 'de', t: 't0' },
    '了': { py: 'le', t: 't0' },
    '语': { py: 'yǔ', t: 't3' },
    '言': { py: 'yán', t: 't2' },
    '音': { py: 'yīn', t: 't1' }
  };

  chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action === 'ANNOTATE_SELECTION') {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;
      const range = sel.getRangeAt(0);
      const text = range.toString();
      if (!text.trim()) return;

      const span = document.createElement('span');
      let html = '';
      for (let c of text) {
        if (QUICK_DICT[c]) {
          html += `<ruby class="zmra-pinyin-ruby">${c}<rt class="${QUICK_DICT[c].t}">${QUICK_DICT[c].py}</rt></ruby>`;
        } else if (/[\u4e00-\u9fa5]/.test(c)) {
          html += `<ruby class="zmra-pinyin-ruby">${c}<rt class="t1">zì</rt></ruby>`;
        } else {
          html += c;
        }
      }
      span.innerHTML = html;
      range.deleteContents();
      range.insertNode(span);
    }
  });
})();
