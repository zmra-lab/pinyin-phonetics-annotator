# 拼音与国际音标 (IPA) 原理与模型说明 (Pinyin & IPA Principles & Model Architecture)

> **归属实验室**: ZMRA Open-Source Lab (`zmra-opensource-lab`)  
> **所属项目**: `pinyin-phonetics-annotator`  
> **官方主页**: [https://zmra.com](https://zmra.com) | **商务咨询**: `contact@zmra.com`

---

## 📌 1. 核心设计原则：纯本地离线引擎，零外部重型依赖

本项目专注于**汉字拼音四声色彩注音、多音字消歧与英文 IPA 国际音标助读**，**不提供任何外部大文件，纯靠 HTML+JS 本地高效执行**：

1. **隐私安全与离线体验**:
   - 内置高频核心成语词库与多音字上下文规则引擎，纯前端实时渲染，用户无需等待几十 MB 的外部模型或字典下载。
2. **交互式多音字校正**:
   - 支持直接点击汉字轮流切换备选多音字，将控制权完全留给用户，免除算法误判困扰。
3. **商业定制渠道**:
   - 针对超大篇幅文言文生僻字注音引擎、声调五度标记法物理波形分析及跨语种音标映射定制，请联系 `contact@zmra.com`。

---

## 🏭 2. AI 模型生产流水线：`model-builder` 与 `model-factory`

对于 ZMRA 旗下的大规模神经网络 G2P 音素对齐模型与端侧推理模型，统一通过工作区标准车间流水线构建与发布：

1. **微调与量化车间**:
   - 路径：`zmra-model-builder`
   - 使用 QLoRA 对多语言音素与教育语料进行微调，使用 llama.cpp 导出标准 GGUF 模型。
2. **Hugging Face 矩阵发布车间**:
   - 路径：`social_matrix/custom-model-factory`
   - 通过 `publish_brand_models.sh` 脚本统一发布至 Hugging Face 官方组织 `zmra/`，为 `https://zmra.com` 建立高权重权威外链。
