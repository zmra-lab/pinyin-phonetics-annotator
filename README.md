# ZMRA Pinyin & Phonetics Annotator (汉字四声色彩拼音与音标伴侣)

<p align="center">
  <a href="#-english">English</a> | <a href="#-中文说明">简体中文</a> | <a href="#-日本語">日本語</a> | <a href="https://zmra.com">Official Portal 官网</a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-teal.svg" alt="License" /></a>
  <a href="extension/"><img src="https://img.shields.io/badge/WebExtension-Manifest%20V3-emerald.svg" alt="Manifest V3" /></a>
  <a href="https://zmra.com"><img src="https://img.shields.io/badge/Crafted%20by-ZMRA-white.svg" alt="Brand" /></a>
</p>

---

## 🌐 English

A high-performance, offline-first Chinese Pinyin 4-tone ruby annotator and English IPA phonetic reader. Converts Chinese Hanzi into standard HTML `<ruby>` tags with distinctive 4-tone color rendering, contextual polyphone disambiguation, and English IPA pronunciation annotations.

Crafted by the **[ZMRA Lab Team](https://zmra.com)**.

### 🌟 Key Features
* **🌈 4-Tone Chromatic Color System**:
  * **1st tone 阴平 (mā)**: Cyan Blue (`#38bdf8`)
  * **2nd tone 阳平 (má)**: Emerald Green (`#34d399`)
  * **3rd tone 上声 (mǎ)**: Amber Yellow (`#fbbf24`)
  * **4th tone 去声 (mà)**: Rose Red (`#f43f5e`)
  * **Neutral tone 轻声 (ma)**: Slate Neutral (`#94a3b8`)
* **🧠 Contextual Polyphone Disambiguation**:
  * Built-in compound phrase context engine (e.g. `银行 yín háng` vs `行走 xíng zǒu`).
  * Interactive click-to-cycle: click any Chinese character in the preview to switch between alternative readings.
* **🌐 English IPA Phonetic Annotation**:
  * Transcribes English vocabulary to International Phonetic Alphabet (IPA) ruby tags (e.g. `cognitive` $\to$ `/ˈkɒɡ.nɪ.tɪv/`).
* **👁️ Active Recall / Quiz Mode**:
  * Hides pinyin readings by default, revealing them only on hover for testing memory and reading mastery.
* **🔊 Native Web Speech Synthesis (TTS)**:
  * Built-in natural Chinese and English text-to-speech pronunciation without network latency.
* **📦 One-Click Multi-Format Export**:
  * Standard HTML5 `<ruby>` code, Markdown format, and Anki TSV flashcard format.
* **🔒 Privacy-First & Local-First Design**:
  * Runs entirely within your browser engine using native system font stacks. Zero external network tracking or CDN delays.

### 🚀 Quick Start
```bash
git clone https://github.com/zmra-lab/pinyin-phonetics-annotator.git
cd pinyin-phonetics-annotator
npx serve -l 3000 .
```

---

## 🇨🇳 中文说明

高性能、纯本地运行的汉字四声色彩拼音注音与英文 IPA 国际音标助读平台。将汉字转换为带有声调色彩语义的标准 HTML `<ruby>` 标签，具备词组上下文多音字智能消歧与点击轮换功能。

由 **[ZMRA Lab Team](https://zmra.com)** 研发打造。

### 🌟 核心特性
* **🌈 视觉化四声声调色彩系统**:
  * **一声 阴平 (mā)**: 赛博天青 (`#38bdf8`)
  * **二声 阳平 (má)**: 翡翠碧绿 (`#34d399`)
  * **三声 上声 (mǎ)**: 琥珀金黄 (`#fbbf24`)
  * **四声 去声 (mà)**: 玫瑰暖红 (`#f43f5e`)
  * **轻声 (ma)**: 雾灰中性 (`#94a3b8`)
* **🧠 词组上下文多音字消歧与交互轮换**:
  * 依托双字/多字词库自动识别多音字真实读音（如“银行 yín háng” vs “行走 xíng zǒu”，“音乐 yīn yuè” vs “快乐 kuài lè”）。
  * 点击预览区任一汉字即可快速循环切换备选读音并同步修正。
* **🌐 英文 IPA 国际音标标注**:
  * 支持中英文混排文本，自动为英文词汇标注标准国际音标（IPA）Ruby 标签。
* **👁️ 悬停隐音测验模式 (Active Recall)**:
  * 默认隐藏注音，鼠标悬停时动态显现，检验汉语发音与认读记忆。
* **🔊 原生 Web 语音发音 (TTS)**:
  * 内置中英文双语真人发音朗读，零外部 API 依赖。
* **📦 一键多格式导出**:
  * 标准 HTML5 代码、Markdown 记事本格式与 Anki 间隔重复记忆库 TSV 文件。

### 🚀 快速启动
```bash
git clone https://github.com/zmra-lab/pinyin-phonetics-annotator.git
cd pinyin-phonetics-annotator
npx serve -l 3000 .
```

---

## 🇯🇵 日本語

高性能・オフライン完結型の中国語ピンイン（四声カラー分類）＆英語IPA国際音声記号ルビ注釈ツール。漢字を標準HTML5の `<ruby>` タグに変換し、四声ごとに色分けされたピンイン表記、文脈に応じた多音字（多音字）の自動識別、および英語のIPA発音記号表示に対応します。

開発: **[ZMRA Lab Team](https://zmra.com)**

### 🌟 主な機能
* **🌈 四声カラーコーディングシステム**:
  * **第1声 陰平 (mā)**: シアンブルー (`#38bdf8`)
  * **第2声 陽平 (má)**: エメラルドグリーン (`#34d399`)
  * **第3声 上声 (mǎ)**: アンバーイエロー (`#fbbf24`)
  * **第4声 去声 (mà)**: ローズレッド (`#f43f5e`)
  * **軽声 (ma)**: スレートグレー (`#94a3b8`)
* **🧠 文脈に応じた多音字の自動識別＆クリック切り替え**:
  * 熟語辞書に基づき、前後の文脈から正しい読みを自動判定（例:「银行 yín háng」と「行走 xíng zǒu」）。
  * プレビュー画面の漢字をクリックするだけで、候補となる別の読みに瞬時に手動切り替え可能。
* **🌐 英語 IPA（国際音声記号）注釈**:
  * 中英混在テキストに対応し、英単語に対しても自動的にIPA発音記号ルビを付与。
* **👁️ ホバー暗記モード (想起学習)**:
  * 通常はピンインを隠し、マウスカーソルを乗せたときだけ表示して中国語の読解力をセルフテスト。
* **🔊 ブラウザ標準音声読み上げ (TTS)**:
  * 外部APIに依存せず、中国語普通話および英語のネイティブ音声を即座に再生。
* **📦 ワンクリック出力**:
  * HTML5コード、Markdown記法、Anki単語帳用TSVデータの一括書き出しに対応。

### 🚀 クイックスタート
```bash
git clone https://github.com/zmra-lab/pinyin-phonetics-annotator.git
cd pinyin-phonetics-annotator
npx serve -l 3000 .
```

---

---

## 🔬 Project Status, Evaluation Disclaimer & Feedback / 项目状态、免责声明与反馈

### 🌐 English
> ⚠️ **Evaluation Prototype Notice (Not Intended for Critical or Production Control)**:  
> This open-source repository is an experimental educational and simulation preview under active development. It is provided strictly **"AS IS"** for educational inspection, kinematics/mechanics study, and technical evaluation. It is **not certified for physical safety-critical machinery, high-voltage industrial automation, or direct production deployment**. We make no commercial promises or operational warranties. We warmly welcome community feedback, pull requests, and suggestions to help us refine and improve!  
> 📬 *Community Contact & Feedback*: [`contact@zmra.com`](mailto:contact@zmra.com)

### 🇨🇳 简体中文
> ⚠️ **评估原型免责声明（仅用于技术验证与教育交流，不建议直接用于生产工控）**:  
> 本开源项目属于处于持续迭代完善中的实验性技术演示与评估原型，按“现状（AS IS）”提供。**仅供机构原理教学、算法仿真验证与离线学习参考，未经工业安全与关键任务控制认证，不建议也不承诺直接应用于物理实体机电设备或工业生产控制**。本团队不作任何商业承诺或可用性担保。热忱欢迎广大开发者、机器人与语言学爱好者提出宝贵的改进建议与 Issue 反馈！  
> 📬 *交流与反馈渠道*: [`contact@zmra.com`](mailto:contact@zmra.com)

### 🇯🇵 日本語
> ⚠️ **評価用プロトタイプに関する免責事項（教育・研究評価用・重要制御への投入非推奨）**:  
> 本オープンソースプロジェクトは、現在も継続的な改良を行っている実験的な教育・シミュレーション用プレビューです。機構原理の学習、アルゴリズムの動作検証、概念実証を目的として現状有姿（AS IS）で公開されており、**物理的な実機機械の保安制御や産業生産現場への直接投入は推奨しておらず、一切の商用保証を行いません**。機能向上や品質改善に向けたコミュニティからのご意見・改善提案・Issue報告を心より歓迎いたします！  
> 📬 *フィードバック窓口*: [`contact@zmra.com`](mailto:contact@zmra.com)

## 📄 License
Released under the [MIT License](LICENSE).
