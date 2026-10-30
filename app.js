/**
 * ZMRA Pinyin & Phonetics Engine
 * Offline-first Chinese Pinyin Ruby annotator & English IPA phonetic assistant.
 * (c) 2026 ZMRA - https://zmra.com
 */

(function () {
  'use strict';

  // 1. Polyphone Context Dictionary (Common phrases to resolve multi-reading characters)
  const PHRASE_DICT = {
    '银行': [{ c: '银', py: 'yín', tone: 2 }, { c: '行', py: 'háng', tone: 2 }],
    '行业': [{ c: '行', py: 'háng', tone: 2 }, { c: '业', py: 'yè', tone: 4 }],
    '行走': [{ c: '行', py: 'xíng', tone: 2 }, { c: '走', py: 'zǒu', tone: 3 }],
    '行动': [{ c: '行', py: 'xíng', tone: 2 }, { c: '动', py: 'dòng', tone: 4 }],
    '音乐': [{ c: '音', py: 'yīn', tone: 1 }, { c: '乐', py: 'yuè', tone: 4 }],
    '乐器': [{ c: '乐', py: 'yuè', tone: 4 }, { c: '器', py: 'qì', tone: 4 }],
    '快乐': [{ c: '快', py: 'kuài', tone: 4 }, { c: '乐', py: 'lè', tone: 4 }],
    '重量': [{ c: '重', py: 'zhòng', tone: 4 }, { c: '量', py: 'liàng', tone: 4 }],
    '重要': [{ c: '重', py: 'zhòng', tone: 4 }, { c: '要', py: 'yào', tone: 4 }],
    '重新': [{ c: '重', py: 'chóng', tone: 2 }, { c: '新', py: 'xīn', tone: 1 }],
    '重复': [{ c: '重', py: 'chóng', tone: 2 }, { c: '复', py: 'fù', tone: 4 }],
    '了解': [{ c: '了', py: 'liǎo', tone: 3 }, { c: '解', py: 'jiě', tone: 3 }],
    '走了': [{ c: '走', py: 'zǒu', tone: 3 }, { c: '了', py: 'le', tone: 0 }],
    '降落': [{ c: '降', py: 'jiàng', tone: 4 }, { c: '落', py: 'luò', tone: 4 }],
    '投降': [{ c: '投', py: 'tóu', tone: 2 }, { c: '降', py: 'xiáng', tone: 2 }],
    '调动': [{ c: '调', py: 'diào', tone: 4 }, { c: '动', py: 'dòng', tone: 4 }],
    '调整': [{ c: '调', py: 'tiáo', tone: 2 }, { c: '整', py: 'zhěng', tone: 3 }],
    '空调': [{ c: '空', py: 'kōng', tone: 1 }, { c: '调', py: 'tiáo', tone: 2 }],
    '处理': [{ c: '处', py: 'chǔ', tone: 3 }, { c: '理', py: 'lǐ', tone: 3 }],
    '到处': [{ c: '到', py: 'dào', tone: 4 }, { c: '处', py: 'chù', tone: 4 }],
    '长短': [{ c: '长', py: 'cháng', tone: 2 }, { c: '短', py: 'duǎn', tone: 3 }],
    '生长': [{ c: '生', py: 'shēng', tone: 1 }, { c: '长', py: 'zhǎng', tone: 3 }],
    '长大': [{ c: '长', py: 'zhǎng', tone: 3 }, { c: '大', py: 'dà', tone: 4 }],
    '长江': [{ c: '长', py: 'cháng', tone: 2 }, { c: '江', py: 'jiāng', tone: 1 }],
    '和平': [{ c: '和', py: 'hé', tone: 2 }, { c: '平', py: 'píng', tone: 2 }],
    '和面': [{ c: '和', py: 'huó', tone: 2 }, { c: '面', py: 'miàn', tone: 4 }],
    '暖和': [{ c: '暖', py: 'nuǎn', tone: 3 }, { c: '和', py: 'huo', tone: 0 }],
    '首都': [{ c: '首', py: 'shǒu', tone: 3 }, { c: '都', py: 'dū', tone: 1 }],
    '都是': [{ c: '都', py: 'dōu', tone: 1 }, { c: '是', py: 'shì', tone: 4 }]
  };

  // 2. High-Frequency Hanzi to Pinyin & Tone Mapping
  const CHAR_DICT = {
    '中': { py: 'zhōng', num: 'zhong1', tone: 1, alts: ['zhōng', 'zhòng'] },
    '华': { py: 'huá', num: 'hua2', tone: 2, alts: ['huá', 'huà'] },
    '人': { py: 'rén', num: 'ren2', tone: 2, alts: ['rén'] },
    '民': { py: 'mín', num: 'min2', tone: 2, alts: ['mín'] },
    '共': { py: 'gòng', num: 'gong4', tone: 4, alts: ['gòng', 'gōng'] },
    '和': { py: 'hé', num: 'he2', tone: 2, alts: ['hé', 'hè', 'huó', 'huo'] },
    '国': { py: 'guó', num: 'guo2', tone: 2, alts: ['guó'] },
    '学': { py: 'xué', num: 'xue2', tone: 2, alts: ['xué'] },
    '习': { py: 'xí', num: 'xi2', tone: 2, alts: ['xí'] },
    '强': { py: 'qiáng', num: 'qiang2', tone: 2, alts: ['qiáng', 'qiǎng', 'jiàng'] },
    '天': { py: 'tiān', num: 'tian1', tone: 1, alts: ['tiān'] },
    '地': { py: 'dì', num: 'di4', tone: 4, alts: ['dì', 'de'] },
    '生': { py: 'shēng', num: 'sheng1', tone: 1, alts: ['shēng'] },
    '日': { py: 'rì', num: 'ri4', tone: 4, alts: ['rì'] },
    '月': { py: 'yuè', num: 'yue4', tone: 4, alts: ['yuè'] },
    '水': { py: 'shuǐ', num: 'shui3', tone: 3, alts: ['shuǐ'] },
    '火': { py: 'huǒ', num: 'huo3', tone: 3, alts: ['huǒ'] },
    '山': { py: 'shān', num: 'shan1', tone: 1, alts: ['shān'] },
    '海': { py: 'hǎi', num: 'hai3', tone: 3, alts: ['hǎi'] },
    '你': { py: 'nǐ', num: 'ni3', tone: 3, alts: ['nǐ'] },
    '好': { py: 'hǎo', num: 'hao3', tone: 3, alts: ['hǎo', 'hào'] },
    '我': { py: 'wǒ', num: 'wo3', tone: 3, alts: ['wǒ'] },
    '们': { py: 'men', num: 'men0', tone: 0, alts: ['men'] },
    '这': { py: 'zhè', num: 'zhe4', tone: 4, alts: ['zhè', 'zhèi'] },
    '是': { py: 'shì', num: 'shi4', tone: 4, alts: ['shì'] },
    '一': { py: 'yī', num: 'yi1', tone: 1, alts: ['yī', 'yí', 'yì'] },
    '个': { py: 'gè', num: 'ge4', tone: 4, alts: ['gè', 'ge'] },
    '大': { py: 'dà', num: 'da4', tone: 4, alts: ['dà', 'dài'] },
    '小': { py: 'xiǎo', num: 'xiao3', tone: 3, alts: ['xiǎo'] },
    '有': { py: 'yǒu', num: 'you3', tone: 3, alts: ['yǒu'] },
    '的': { py: 'de', num: 'de0', tone: 0, alts: ['de', 'dí', 'dì'] },
    '了': { py: 'le', num: 'le0', tone: 0, alts: ['le', 'liǎo'] },
    '不': { py: 'bù', num: 'bu4', tone: 4, alts: ['bù', 'bú'] },
    '在': { py: 'zài', num: 'zai4', tone: 4, alts: ['zài'] },
    '他': { py: 'tā', num: 'ta1', tone: 1, alts: ['tā'] },
    '她': { py: 'tā', num: 'ta1', tone: 1, alts: ['tā'] },
    '它': { py: 'tā', num: 'ta1', tone: 1, alts: ['tā'] },
    '来': { py: 'lái', num: 'lai2', tone: 2, alts: ['lái'] },
    '去': { py: 'qù', num: 'qu4', tone: 4, alts: ['qù'] },
    '到': { py: 'dào', num: 'dao4', tone: 4, alts: ['dào'] },
    '时': { py: 'shí', num: 'shi2', tone: 2, alts: ['shí'] },
    '候': { py: 'hòu', num: 'hou4', tone: 4, alts: ['hòu'] },
    '道': { py: 'dào', num: 'dao4', tone: 4, alts: ['dào'] },
    '理': { py: 'lǐ', num: 'li3', tone: 3, alts: ['lǐ'] },
    '智': { py: 'zhì', num: 'zhi4', tone: 4, alts: ['zhì'] },
    '能': { py: 'néng', num: 'neng2', tone: 2, alts: ['néng'] },
    '语': { py: 'yǔ', num: 'yu3', tone: 3, alts: ['yǔ', 'yù'] },
    '言': { py: 'yán', num: 'yan2', tone: 2, alts: ['yán'] },
    '音': { py: 'yīn', num: 'yin1', tone: 1, alts: ['yīn'] },
    '标': { py: 'biāo', num: 'biao1', tone: 1, alts: ['biāo'] },
    '素': { py: 'sù', num: 'su4', tone: 4, alts: ['sù'] },
    '认': { py: 'rèn', num: 'ren4', tone: 4, alts: ['rèn'] },
    '知': { py: 'zhī', num: 'zhi1', tone: 1, alts: ['zhī'] },
    '算': { py: 'suàn', num: 'suan4', tone: 4, alts: ['suàn'] },
    '法': { py: 'fǎ', num: 'fa3', tone: 3, alts: ['fǎ'] },
    '开': { py: 'kāi', num: 'kai1', tone: 1, alts: ['kāi'] },
    '源': { py: 'yuán', num: 'yuan2', tone: 2, alts: ['yuán'] },
    '软': { py: 'ruǎn', num: 'ruan3', tone: 3, alts: ['ruǎn'] },
    '件': { py: 'jiàn', num: 'jian4', tone: 4, alts: ['jiàn'] },
    '工': { py: 'gōng', num: 'gong1', tone: 1, alts: ['gōng'] },
    '具': { py: 'jù', num: 'ju4', tone: 4, alts: ['jù'] },
    '机': { py: 'jī', num: 'ji1', tone: 1, alts: ['jī'] },
    '器': { py: 'qì', num: 'qi4', tone: 4, alts: ['qì'] },
    '人': { py: 'rén', num: 'ren2', tone: 2, alts: ['rén'] },
    '长': { py: 'cháng', num: 'chang2', tone: 2, alts: ['cháng', 'zhǎng'] },
    '短': { py: 'duǎn', num: 'duan3', tone: 3, alts: ['duǎn'] },
    '重': { py: 'zhòng', num: 'zhong4', tone: 4, alts: ['zhòng', 'chóng'] },
    '行': { py: 'xíng', num: 'xing2', tone: 2, alts: ['xíng', 'háng'] },
    '乐': { py: 'lè', num: 'le4', tone: 4, alts: ['lè', 'yuè'] },
    '都': { py: 'dōu', num: 'dou1', tone: 1, alts: ['dōu', 'dū'] },
    '调': { py: 'tiáo', num: 'tiao2', tone: 2, alts: ['tiáo', 'diào'] },
    '降': { py: 'jiàng', num: 'jiang4', tone: 4, alts: ['jiàng', 'xiáng'] },
    '处': { py: 'chù', num: 'chu4', tone: 4, alts: ['chù', 'chǔ'] },
    '春': { py: 'chūn', num: 'chun1', tone: 1, alts: ['chūn'] },
    '眠': { py: 'mián', num: 'mian2', tone: 2, alts: ['mián'] },
    '觉': { py: 'jué', num: 'jue2', tone: 2, alts: ['jué', 'jiào'] },
    '晓': { py: 'xiǎo', num: 'xiao3', tone: 3, alts: ['xiǎo'] },
    '处': { py: 'chù', num: 'chu4', tone: 4, alts: ['chù', 'chǔ'] },
    '闻': { py: 'wén', num: 'wen2', tone: 2, alts: ['wén'] },
    '啼': { py: 'tí', num: 'ti2', tone: 2, alts: ['tí'] },
    '鸟': { py: 'niǎo', num: 'niao3', tone: 3, alts: ['niǎo'] },
    '夜': { py: 'yè', num: 'ye4', tone: 4, alts: ['yè'] },
    '风': { py: 'fēng', num: 'feng1', tone: 1, alts: ['fēng'] },
    '雨': { py: 'yǔ', num: 'yu3', tone: 3, alts: ['yǔ'] },
    '声': { py: 'shēng', num: 'sheng1', tone: 1, alts: ['shēng'] },
    '花': { py: 'huā', num: 'hua1', tone: 1, alts: ['huā'] },
    '落': { py: 'luò', num: 'luo4', tone: 4, alts: ['luò', 'là'] },
    '知': { py: 'zhī', num: 'zhi1', tone: 1, alts: ['zhī'] },
    '多': { py: 'duō', num: 'duo1', tone: 1, alts: ['duō'] },
    '少': { py: 'shǎo', num: 'shao3', tone: 3, alts: ['shǎo', 'shào'] },
    '床': { py: 'chuáng', num: 'chuang2', tone: 2, alts: ['chuáng'] },
    '前': { py: 'qián', num: 'qian2', tone: 2, alts: ['qián'] },
    '明': { py: 'míng', num: 'ming2', tone: 2, alts: ['míng'] },
    '光': { py: 'guāng', num: 'guang1', tone: 1, alts: ['guāng'] },
    '疑': { py: 'yí', num: 'yi2', tone: 2, alts: ['yí'] },
    '霜': { py: 'shuāng', num: 'shuang1', tone: 1, alts: ['shuāng'] },
    '举': { py: 'jǔ', num: 'ju3', tone: 3, alts: ['jǔ'] },
    '头': { py: 'tóu', num: 'tou2', tone: 2, alts: ['tóu', 'tou'] },
    '望': { py: 'wàng', num: 'wang4', tone: 4, alts: ['wàng'] },
    '低': { py: 'dī', num: 'di1', tone: 1, alts: ['dī'] },
    '思': { py: 'sī', num: 'si1', tone: 1, alts: ['sī'] },
    '故': { py: 'gù', num: 'gu4', tone: 4, alts: ['gù'] },
    '乡': { py: 'xiāng', num: 'xiang1', tone: 1, alts: ['xiāng'] }
  };

  // Tone diacritic to tone number map
  const TONE_CHAR_MAP = {
    'ā': { char: 'a', tone: 1 }, 'á': { char: 'a', tone: 2 }, 'ǎ': { char: 'a', tone: 3 }, 'à': { char: 'a', tone: 4 },
    'ē': { char: 'e', tone: 1 }, 'é': { char: 'e', tone: 2 }, 'ě': { char: 'e', tone: 3 }, 'è': { char: 'e', tone: 4 },
    'ī': { char: 'i', tone: 1 }, 'í': { char: 'i', tone: 2 }, 'ǐ': { char: 'i', tone: 3 }, 'ì': { char: 'i', tone: 4 },
    'ō': { char: 'o', tone: 1 }, 'ó': { char: 'o', tone: 2 }, 'ǒ': { char: 'o', tone: 3 }, 'ò': { char: 'o', tone: 4 },
    'ū': { char: 'u', tone: 1 }, 'ú': { char: 'u', tone: 2 }, 'ǔ': { char: 'u', tone: 3 }, 'ù': { char: 'u', tone: 4 },
    'ǖ': { char: 'v', tone: 1 }, 'ǘ': { char: 'v', tone: 2 }, 'ǚ': { char: 'v', tone: 3 }, 'ǜ': { char: 'v', tone: 4 }
  };

  function parseTone(pyStr) {
    if (!pyStr) return { pinyin: '', tone: 0, num: '' };
    for (let i = 0; i < pyStr.length; i++) {
      const c = pyStr[i];
      if (TONE_CHAR_MAP[c]) {
        const { char, tone } = TONE_CHAR_MAP[c];
        const raw = pyStr.slice(0, i) + char + pyStr.slice(i + 1);
        return { pinyin: pyStr, tone: tone, num: raw + tone };
      }
    }
    return { pinyin: pyStr, tone: 0, num: pyStr + '0' };
  }

  // 3. English to IPA Phonetics Dictionary
  const IPA_DICT = {
    'hello': '/həˈloʊ/',
    'world': '/wɜːrld/',
    'welcome': '/ˈwel.kəm/',
    'language': '/ˈlæŋ.ɡwɪdʒ/',
    'companion': '/kəmˈpæn.jən/',
    'assistant': '/əˈsɪs.tənt/',
    'intelligence': '/ɪnˈtel.ɪ.dʒəns/',
    'artificial': '/ˌɑːr.tɪˈfɪʃ.əl/',
    'cognitive': '/ˈkɒɡ.nɪ.tɪv/',
    'computation': '/ˌkɒm.pjuːˈteɪ.ʃən/',
    'robotics': '/roʊˈbɑː.tɪks/',
    'kinematics': '/ˌkɪn.əˈmæt.ɪks/',
    'actuator': '/ˈæk.tʃu.eɪ.tər/',
    'harmonic': '/hɑːrˈmɑː.nɪk/',
    'mechanism': '/ˈmek.ə.nɪ.zəm/',
    'precision': '/prɪˈsɪʒ.ən/',
    'learning': '/ˈlɜːr.nɪŋ/',
    'phonetics': '/fəˈnet.ɪks/',
    'pronunciation': '/prəˌnʌn.siˈeɪ.ʃən/',
    'open': '/ˈoʊ.pən/',
    'source': '/sɔːrs/',
    'lab': '/læb/',
    'chinese': '/tʃaɪˈniːz/',
    'japanese': '/ˌdʒæp.əˈniːz/',
    'english': '/ˈɪŋ.ɡlɪʃ/',
    'pinyin': '/ˈpɪn.jɪn/',
    'system': '/ˈsɪs.təm/',
    'developer': '/dɪˈvel.ə.pər/',
    'tools': '/tuːlz/',
    'offline': '/ˌɔːfˈlaɪn/',
    'engine': '/ˈen.dʒɪn/'
  };

  // State
  let state = {
    colorized: true,
    activeRecall: false,
    numberTone: false,
    tokens: [] // Parsed tokens
  };

  // Sample texts
  const SAMPLES = {
    zh: '中华语言认知引擎，提供离线汉字拼音四声色彩标注。春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。',
    poly: '银行里面的人行道；音乐给人带来快乐；重力加速度与重新启动；首都北京都是好去处；降落伞与投降。',
    en: 'Welcome to the cognitive language intelligence engine. Precision robotics and phonetics companion.'
  };

  // DOM Elements
  const sourceInput = document.getElementById('source-input');
  const previewOutput = document.getElementById('preview-output');
  const toggleColorized = document.getElementById('toggle-colorized');
  const toggleRecall = document.getElementById('toggle-recall');
  const toggleNumberTone = document.getElementById('toggle-number-tone');

  const btnSampleZh = document.getElementById('btn-sample-zh');
  const btnSamplePoly = document.getElementById('btn-sample-poly');
  const btnSampleEn = document.getElementById('btn-sample-en');
  const btnClear = document.getElementById('btn-clear');
  const btnSpeak = document.getElementById('btn-speak');

  const btnCopyHtml = document.getElementById('btn-copy-html');
  const btnCopyMd = document.getElementById('btn-copy-md');
  const btnCopyAnki = document.getElementById('btn-copy-anki');
  const btnCopyPlain = document.getElementById('btn-copy-plain');

  // Tokenization & Parsing Pipeline
  function annotateText(text) {
    if (!text || text.trim() === '') {
      return [];
    }

    const tokens = [];
    let i = 0;
    const len = text.length;

    while (i < len) {
      // 1. Check for 2-character phrase match first
      if (i + 1 < len) {
        const twoChar = text.slice(i, i + 2);
        if (PHRASE_DICT[twoChar]) {
          const phraseTokens = PHRASE_DICT[twoChar];
          for (let p = 0; p < phraseTokens.length; p++) {
            const item = phraseTokens[p];
            const parsed = parseTone(item.py);
            tokens.push({
              type: 'hanzi',
              char: item.c,
              pinyin: item.py,
              num: parsed.num,
              tone: item.tone,
              alts: CHAR_DICT[item.c] ? CHAR_DICT[item.c].alts : [item.py]
            });
          }
          i += 2;
          continue;
        }
      }

      const char = text[i];

      // 2. Hanzi check
      if (/[\u4e00-\u9fa5]/.test(char)) {
        if (CHAR_DICT[char]) {
          const entry = CHAR_DICT[char];
          tokens.push({
            type: 'hanzi',
            char: char,
            pinyin: entry.py,
            num: entry.num,
            tone: entry.tone,
            alts: entry.alts
          });
        } else {
          // Fallback tone 1 / default
          tokens.push({
            type: 'hanzi',
            char: char,
            pinyin: 'zì',
            num: 'zi4',
            tone: 4,
            alts: ['zì']
          });
        }
        i++;
        continue;
      }

      // 3. English word match
      if (/[a-zA-Z]/.test(char)) {
        let word = '';
        while (i < len && /[a-zA-Z]/.test(text[i])) {
          word += text[i];
          i++;
        }
        const lower = word.toLowerCase();
        const ipa = IPA_DICT[lower] || `/${lower}/`;
        tokens.push({
          type: 'english',
          word: word,
          ipa: ipa
        });
        continue;
      }

      // 4. Punctuation, Whitespace, Newlines
      tokens.push({
        type: 'raw',
        char: char
      });
      i++;
    }

    return tokens;
  }

  // Render Preview Output
  function renderPreview() {
    state.tokens = annotateText(sourceInput.value);

    if (state.tokens.length === 0) {
      previewOutput.innerHTML = '<span style="color: var(--text-sub); font-size: 0.95rem;">实时转换结果将在此呈现，四声色彩即刻生效...</span>';
      return;
    }

    let html = '';
    state.tokens.forEach((token, index) => {
      if (token.type === 'hanzi') {
        const displayPy = state.numberTone ? token.num : token.pinyin;
        const toneClass = `tone-${token.tone}`;
        const hasAlts = token.alts && token.alts.length > 1;
        const altTooltip = hasAlts ? `title="点击切换多音字 (${token.alts.join(' / ')})"` : '';
        html += `<ruby data-idx="${index}" ${altTooltip}><rb>${token.char}</rb><rt class="${toneClass}">${displayPy}</rt></ruby>`;
      } else if (token.type === 'english') {
        html += `<ruby class="en-ruby"><rb>${token.word}</rb><rt class="ipa-tag">${token.ipa}</rt></ruby> `;
      } else if (token.type === 'raw') {
        if (token.char === '\n') {
          html += '<br/>';
        } else {
          html += token.char;
        }
      }
    });

    previewOutput.innerHTML = html;

    // Attach click listener for polyphones
    const rubies = previewOutput.querySelectorAll('ruby[data-idx]');
    rubies.forEach((el) => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-idx'), 10);
        const tok = state.tokens[idx];
        if (tok && tok.alts && tok.alts.length > 1) {
          const curIndex = tok.alts.indexOf(tok.pinyin);
          const nextIndex = (curIndex + 1) % tok.alts.length;
          tok.pinyin = tok.alts[nextIndex];
          const parsed = parseTone(tok.pinyin);
          tok.tone = parsed.tone;
          tok.num = parsed.num;
          renderPreview();
        }
      });
    });
  }

  // Export generators
  function getHtmlExport() {
    let out = '<div class="zmra-pinyin-block" style="font-size: 1.25rem; line-height: 2.2;">\n';
    state.tokens.forEach((t) => {
      if (t.type === 'hanzi') {
        const py = state.numberTone ? t.num : t.pinyin;
        out += `  <ruby><rb>${t.char}</rb><rt class="tone-${t.tone}">${py}</rt></ruby>\n`;
      } else if (t.type === 'english') {
        out += `  <ruby><rb>${t.word}</rb><rt>${t.ipa}</rt></ruby>\n`;
      } else if (t.type === 'raw') {
        out += t.char;
      }
    });
    out += '</div>';
    return out;
  }

  function getMarkdownExport() {
    let out = '';
    state.tokens.forEach((t) => {
      if (t.type === 'hanzi') {
        const py = state.numberTone ? t.num : t.pinyin;
        out += `{${t.char}}(${py})`;
      } else if (t.type === 'english') {
        out += `[${t.word}](${t.ipa}) `;
      } else if (t.type === 'raw') {
        out += t.char;
      }
    });
    return out;
  }

  function getAnkiExport() {
    // Front \t Back (TSV)
    let front = '';
    let back = '';
    state.tokens.forEach((t) => {
      if (t.type === 'hanzi') {
        front += t.char;
        back += (state.numberTone ? t.num : t.pinyin) + ' ';
      } else if (t.type === 'english') {
        front += t.word + ' ';
        back += t.ipa + ' ';
      } else if (t.type === 'raw') {
        front += t.char;
        back += t.char;
      }
    });
    return `${front.trim()}\t${back.trim()}`;
  }

  function getPlainPinyinExport() {
    let out = '';
    state.tokens.forEach((t) => {
      if (t.type === 'hanzi') {
        out += (state.numberTone ? t.num : t.pinyin) + ' ';
      } else if (t.type === 'english') {
        out += t.ipa + ' ';
      } else if (t.type === 'raw') {
        out += t.char;
      }
    });
    return out.trim();
  }

  // Toast feedback helper
  function showToast(msg) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '2rem';
      toast.style.right = '2rem';
      toast.style.background = 'linear-gradient(135deg, #14b8a6, #06b6d4)';
      toast.style.color = '#040d12';
      toast.style.padding = '10px 20px';
      toast.style.borderRadius = '8px';
      toast.style.fontWeight = '700';
      toast.style.boxShadow = '0 6px 20px rgba(0,0,0,0.5)';
      toast.style.zIndex = '9999';
      toast.style.transition = 'opacity 0.3s ease';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
    }, 2200);
  }

  function copyToClipboard(text, successMsg) {
    if (!text || text.trim() === '') {
      showToast('⚠️ 当前无内容可复制');
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        promptFallback(text);
      });
    } else {
      promptFallback(text);
    }
  }

  function promptFallback(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✅ 复制成功 (兼容模式)');
  }

  // Event Listeners
  sourceInput.addEventListener('input', renderPreview);

  toggleColorized.addEventListener('change', (e) => {
    state.colorized = e.target.checked;
    if (state.colorized) {
      previewOutput.classList.add('tone-colorized');
    } else {
      previewOutput.classList.remove('tone-colorized');
    }
  });

  toggleRecall.addEventListener('change', (e) => {
    state.activeRecall = e.target.checked;
    if (state.activeRecall) {
      previewOutput.classList.add('hide-pinyin');
    } else {
      previewOutput.classList.remove('hide-pinyin');
    }
  });

  toggleNumberTone.addEventListener('change', (e) => {
    state.numberTone = e.target.checked;
    renderPreview();
  });

  // Preset Buttons
  btnSampleZh.addEventListener('click', () => {
    sourceInput.value = SAMPLES.zh;
    renderPreview();
  });

  btnSamplePoly.addEventListener('click', () => {
    sourceInput.value = SAMPLES.poly;
    renderPreview();
  });

  btnSampleEn.addEventListener('click', () => {
    sourceInput.value = SAMPLES.en;
    renderPreview();
  });

  btnClear.addEventListener('click', () => {
    sourceInput.value = '';
    renderPreview();
  });

  // Speech TTS
  btnSpeak.addEventListener('click', () => {
    const text = sourceInput.value.trim();
    if (!text) {
      showToast('⚠️ 请先输入要朗读的文本');
      return;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = /[\u4e00-\u9fa5]/.test(text) ? 'zh-CN' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      showToast('🔊 正在朗读...');
    } else {
      showToast('⚠️ 您的浏览器不支持 Web Speech 语音接口');
    }
  });

  // Export Buttons
  btnCopyHtml.addEventListener('click', () => {
    copyToClipboard(getHtmlExport(), '✅ HTML <ruby> 代码已复制到剪贴板');
  });

  btnCopyMd.addEventListener('click', () => {
    copyToClipboard(getMarkdownExport(), '✅ Markdown 注音格式已复制');
  });

  btnCopyAnki.addEventListener('click', () => {
    copyToClipboard(getAnkiExport(), '✅ Anki TSV 制表符分隔卡片已复制');
  });

  btnCopyPlain.addEventListener('click', () => {
    copyToClipboard(getPlainPinyinExport(), '✅ 纯拼音/音标文本已复制');
  });

  // Initial load
  sourceInput.value = SAMPLES.zh;
  renderPreview();
})();
