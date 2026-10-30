document.addEventListener('DOMContentLoaded', () => {
  const popInput = document.getElementById('pop-input');
  const popConvert = document.getElementById('pop-convert');
  const popAnnotate = document.getElementById('pop-annotate');
  const popResult = document.getElementById('pop-result');

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

  function quickConvert(text) {
    if (!text.trim()) return '';
    let html = '';
    for (let c of text) {
      if (QUICK_DICT[c]) {
        html += `<ruby>${c}<rt class="${QUICK_DICT[c].t}">${QUICK_DICT[c].py}</rt></ruby>`;
      } else if (/[\u4e00-\u9fa5]/.test(c)) {
        html += `<ruby>${c}<rt class="t1">zì</rt></ruby>`;
      } else {
        html += c;
      }
    }
    return html;
  }

  popConvert.addEventListener('click', () => {
    const txt = popInput.value;
    popResult.innerHTML = quickConvert(txt) || '<span style="color:#64748b;">请输入文本</span>';
  });

  popAnnotate.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab) {
        chrome.tabs.sendMessage(tab.id, { action: 'ANNOTATE_SELECTION' });
      }
    } catch (e) {
      console.error(e);
    }
  });
});
