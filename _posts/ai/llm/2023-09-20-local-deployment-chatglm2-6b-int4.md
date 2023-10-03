---
layout: post
title:  本地部署ChatGLM2-6B-Int4
categories: ai
tag: llm
---

* content
{:toc}

### 环境准备

#### Python

- https://www.python.org/downloads/
- 下载对应的系统和架构

#### PyCharm

- https://www.jetbrains.com.cn/pycharm/download/

#### CUDA

- CUDA（Compute Unified Device Architecture），是显卡厂商[NVIDIA](https://baike.baidu.com/item/NVIDIA/325313?fromModule=lemma_inlink)推出的运算平台。 CUDA™是一种由NVIDIA推出的通用[并行计算](https://baike.baidu.com/item/并行计算/113443?fromModule=lemma_inlink)架构，该架构使[GPU](https://baike.baidu.com/item/GPU?fromModule=lemma_inlink)能够解决复杂的计算问题。 它包含了CUDA[指令集架构](https://baike.baidu.com/item/指令集架构/7029547?fromModule=lemma_inlink)（ISA）以及GPU内部的并行计算引擎。 开发人员可以使用[C语言](https://baike.baidu.com/item/C语言?fromModule=lemma_inlink)来为CUDA™架构编写程序，所编写出的程序可以在支持CUDA™的处理器上以超高性能运行。CUDA3.0已经开始支持C++和[FORTRAN](https://baike.baidu.com/item/FORTRAN/674319?fromModule=lemma_inlink)。

- https://developer.nvidia.com/cuda-downloads

- https://developer.nvidia.com/cuda-toolkit-archive

- 安装步骤：https://blog.csdn.net/qq_44111805/article/details/128281503

测试安装成功

```sh
nvcc --version # 检查CUDA的版本号
set cuda # 查看CUDA设置的环境变量
```

查看显卡信息

```sh
nvidia-smi
```

杀死进程命令：

```sh
taskkill /pid PID /f
```

#### Anaconda

- Conda 是一个开源的软件包管理系统和环境管理系统，用于安装多个版本的软件包及其依赖关系，并在它们之间轻松切换
- Anaconda是一个开源的Python发行版本，其包含了conda、Python等软件包，numpy，pandas（数据分析），scipy等科学计算包，无需再单独下载配置。

- https://www.anaconda.com/download

#### ChatGLM

- ChatGLM-6B 是一个开源的、支持中英双语的对话语言模型，基于 [General Language Model (GLM)](https://github.com/THUDM/GLM) 架构，具有 62 亿参数。结合模型量化技术，用户可以在消费级的显卡上进行本地部署（INT4 量化级别下最低只需 6GB 显存）。 ChatGLM-6B 使用了和 ChatGPT 相似的技术，针对中文问答和对话进行了优化。经过约 1T 标识符的中英双语训练，辅以监督微调、反馈自助、人类反馈强化学习等技术的加持，62 亿参数的 ChatGLM-6B 已经能生成相当符合人类偏好的回答
- ChatGLM**2**-6B 是开源中英双语对话模型 [ChatGLM-6B](https://github.com/THUDM/ChatGLM-6B) 的第二代版本，在保留了初代模型对话流畅、部署门槛较低等众多优秀特性的基础之上，ChatGLM**2**-6B 引入了如下新特性：
  1. **更强大的性能**：基于 ChatGLM 初代模型的开发经验，我们全面升级了 ChatGLM2-6B 的基座模型。ChatGLM2-6B 使用了 [GLM](https://github.com/THUDM/GLM) 的混合目标函数，经过了 1.4T 中英标识符的预训练与人类偏好对齐训练，[评测结果](https://github.com/THUDM/ChatGLM2-6B#评测结果)显示，相比于初代模型，ChatGLM2-6B 在 MMLU（+23%）、CEval（+33%）、GSM8K（+571%） 、BBH（+60%）等数据集上的性能取得了大幅度的提升，在同尺寸开源模型中具有较强的竞争力。
  2. **更长的上下文**：基于 [FlashAttention](https://github.com/HazyResearch/flash-attention) 技术，我们将基座模型的上下文长度（Context Length）由 ChatGLM-6B 的 2K 扩展到了 32K，并在对话阶段使用 8K 的上下文长度训练。对于更长的上下文，我们发布了 [ChatGLM2-6B-32K](https://huggingface.co/THUDM/chatglm2-6b-32k) 模型。[LongBench](https://github.com/THUDM/LongBench) 的测评结果表明，在等量级的开源模型中，ChatGLM2-6B-32K 有着较为明显的竞争优势。
  3. **更高效的推理**：基于 [Multi-Query Attention](http://arxiv.org/abs/1911.02150) 技术，ChatGLM2-6B 有更高效的推理速度和更低的显存占用：在官方的模型实现下，推理速度相比初代提升了 42%，INT4 量化下，6G 显存支持的对话长度由 1K 提升到了 8K。
  4. **更开放的协议**：ChatGLM2-6B 权重对学术研究**完全开放**，在填写[问卷](https://open.bigmodel.cn/mla/form)进行登记后**亦允许免费商业使用**。

- 清华源：https://cloud.tsinghua.edu.cn/d/674208019e314311ab5c/?p=%2F&mode=list

- 或通过huggingface拉取：git lfs install
  git clone https://huggingface.co/THUDM/chatglm2-6b-int4



### 拉取代码

https://github.com/THUDM/ChatGLM2-6B.git



### 安装依赖

- 启动anaconda点击`Environments`选中`base(root)`新建环境

- 新建完成后切换到该环境
- 点击Home，启动PyCharm
- 安装依赖：`pip install -r requirements.txt`
- 安装pytorch：https://pytorch.org/get-started/locally/



### 代码

web_demo2.py

```python
import torch
from transformers import AutoModel, AutoTokenizer
import streamlit as st

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(torch.__version__)
print(torch.cuda.is_available())
print(device)

st.set_page_config(
    page_title="ChatGLM2-6b 演示",
    page_icon=":robot:",
    layout='wide'
)


@st.cache_resource
def get_model():
    tokenizer = AutoTokenizer.from_pretrained(r"D:\Workspace\backend\pycharm\chatglm2-6b-int4", trust_remote_code=True)
    model = AutoModel.from_pretrained(r"D:\Workspace\backend\pycharm\chatglm2-6b-int4", trust_remote_code=True).to(device)
    # tokenizer = AutoTokenizer.from_pretrained("THUDM/chatglm2-6b", trust_remote_code=True)
    # model = AutoModel.from_pretrained("THUDM/chatglm2-6b", trust_remote_code=True).cuda()
    # 多显卡支持，使用下面两行代替上面一行，将num_gpus改为你实际的显卡数量
    # from utils import load_model_on_gpus
    # model = load_model_on_gpus("THUDM/chatglm2-6b", num_gpus=2)
    # model = model.eval()
    return tokenizer, model


tokenizer, model = get_model()

st.title("ChatGLM2-6B")

max_length = st.sidebar.slider(
    'max_length', 0, 32768, 8192, step=1
)
top_p = st.sidebar.slider(
    'top_p', 0.0, 1.0, 0.8, step=0.01
)
temperature = st.sidebar.slider(
    'temperature', 0.0, 1.0, 0.8, step=0.01
)

if 'history' not in st.session_state:
    st.session_state.history = []

if 'past_key_values' not in st.session_state:
    st.session_state.past_key_values = None

for i, (query, response) in enumerate(st.session_state.history):
    with st.chat_message(name="user", avatar="user"):
        st.markdown(query)
    with st.chat_message(name="assistant", avatar="assistant"):
        st.markdown(response)
with st.chat_message(name="user", avatar="user"):
    input_placeholder = st.empty()
with st.chat_message(name="assistant", avatar="assistant"):
    message_placeholder = st.empty()

prompt_text = st.text_area(label="用户命令输入",
                           height=100,
                           placeholder="请在这儿输入您的命令")

button = st.button("发送", key="predict")

if button:
    input_placeholder.markdown(prompt_text)
    history, past_key_values = st.session_state.history, st.session_state.past_key_values
    for response, history, past_key_values in model.stream_chat(tokenizer, prompt_text, history,
                                                                past_key_values=past_key_values,
                                                                max_length=max_length, top_p=top_p,
                                                                temperature=temperature,
                                                                return_past_key_values=True):
        message_placeholder.markdown(response)

    st.session_state.history = history
    st.session_state.past_key_values = past_key_values
```

### 启动程序

可以通过以下命令启动基于 Gradio 的网页版 demo：

```sh
python web_demo.py
```

可以通过以下命令启动基于 Streamlit 的网页版 demo：
```sh
streamlit run web_demo2.py
```
网页版 demo 会运行一个 Web Server，并输出地址。在浏览器中打开输出的地址即可使用。 经测试，基于 Streamlit 的网页版 Demo 会更流畅。

### 遇到的问题

- ModuleNotFoundError: No module named 'streamlit.cli'：找到本地anaconda3\envs\chatglm\Scripts路径下的streamlit-script.py
    - 修改代码：streamlit.cli替换为streamlit.web.cli
    ```python
    # -*- coding: utf-8 -*-
    import re
    import sys

    # from streamlit.cli import main
    from streamlit.web.cli import main

    if __name__ == '__main__':
        sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
        sys.exit(main())

    ```
