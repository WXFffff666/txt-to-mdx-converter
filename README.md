# TXT to MDX Converter

🤖 **完全由 AI 构建** - Claude (Anthropic)

**用 MDX 格式写博客，保存为 .txt 文件，一键转换成 .mdx 上传博客！**

## 💡 这个工具是做什么的？

如果你习惯用 **MDX 格式**写博客内容，但想保存为 `.txt` 文件方便编辑，这个工具可以帮你：

**工作流程：**
```
1. 用 MDX 格式写内容 → 保存为 .txt 文件
2. 运行转换工具
3. 得到 .mdx 文件 → 上传到博客平台
```

**为什么需要这个工具？**
- ✍️ 用 MDX 格式写博客（支持 Markdown + Front Matter + JSX 组件）
- 💾 保存为 `.txt` 文件（任何编辑器都支持，不会有格式问题）
- 🔄 自动转换成 `.mdx` 文件
- 🧹 自动清理不支持的组件和 import 语句
- 🛠️ 自动修复格式问题（未闭合的代码块、缺失的 Front Matter）
- 📤 输出干净的 `.mdx` 文件，直接上传到博客（Next.js、Docusaurus、Gatsby 等）

## ⚠️ 重要说明

**这个工具要求：**
- ✅ 你的 `.txt` 文件必须用 **MDX 格式**编写
- ✅ 包含 Front Matter（或工具会自动添加）
- ✅ 可以包含 Markdown 语法、代码块、列表等

**不是：**
- ❌ 不是把普通纯文本转成 MDX
- ❌ 不是把 Word 文档转成 MDX
- ❌ 不是自动生成博客内容

**简单来说：** 你已经用 MDX 格式写好了内容，只是保存成了 `.txt` 文件，这个工具帮你转成 `.mdx` 文件并清理格式。

## ✨ 支持的功能

### 🔄 自动转换
- 批量转换 `.txt` 到 `.mdx`
- 递归处理子目录
- 保留目录结构

### 🎨 支持 32+ MDX 插件（2026-02-16 更新）

转换后的 `.mdx` 文件完全兼容以下插件生态：

#### Remark 插件（12个）- Markdown 处理
- ✅ **remarkExtractFrontmatter** - 提取 Front Matter
- ✅ **remarkCodeTitles** - 代码块标题（```javascript:file.js）
- ✅ **remarkMath** - 数学公式（$E=mc^2$）
- ✅ **remarkEmoji** - Emoji 短代码（:smile: :heart:）
- ✅ **remarkMermaid** - Mermaid 图表
- ✅ **remarkDefinitionList** - 定义列表
- ✅ **remarkDirective** - 自定义容器块（:::note）
- ✅ **remarkImgToJsx** - 图片转 JSX
- ✅ **remarkVideoEmbed** - 视频嵌入（YouTube、Bilibili 等 8 个平台）
- ✅ **remarkGfm** - GitHub Flavored Markdown（表格、任务列表、删除线、脚注）
- ✅ **remarkAlert** - GitHub 风格提示块（> [!NOTE]）
- ✅ **remarkBreaks** - 软换行支持

#### Rehype 插件（8个）- HTML 处理
- ✅ **rehypeSlug** - 标题 ID
- ✅ **rehypeAutolinkHeadings** - 标题链接
- ✅ **rehypeExternalLinks** - 外部链接处理
- ✅ **rehypeImgSize** - 图片尺寸优化
- ✅ **rehypeKatex** - 数学公式渲染
- ✅ **rehypeCitation** - 引用支持
- ✅ **rehypePrettyCode** - 代码高亮
- ✅ **rehypePresetMinify** - HTML 压缩

#### MDX 组件（10个）
- ✅ **Image** - 图片组件（支持缩放）
- ✅ **Twemoji** - Twitter Emoji
- ✅ **CodeTitle** - 代码标题
- ✅ **CodeDiff** - 代码 Diff 显示
- ✅ **CodeWithLineNumbers** - 带行号的代码块
- ✅ **Mermaid** - Mermaid 图表
- ✅ **VideoEmbed** - 视频嵌入
- ✅ **Link** - 链接组件
- ✅ **Pre** - 代码块容器（增强）
- ✅ **TableWrapper** - 表格包装器

### 🧹 自动清理（移除以下组件）
转换器会自动移除这些不支持的 React 组件：

| 组件名称 | 说明 | 示例 |
|---------|------|------|
| `VideoPlayer` | 视频播放器 | `<VideoPlayer src="..." />` |
| `Chart` | 图表组件 | `<Chart data={...} />` |
| `Callout` | 提示框 | `<Callout type="warning">...</Callout>` |
| `CustomComponent` | 自定义组件 | `<CustomComponent {...props} />` |
| `Interactive` | 交互组件 | `<Interactive />` |
| `Demo` | 演示组件 | `<Demo>...</Demo>` |
| `Widget` | 小部件 | `<Widget id="..." />` |

**同时移除：**
- ✅ 所有 `import` 语句（如 `import { Component } from '@/components'`）
- ✅ 多余的空行（超过 2 个连续空行）

### ✨ 保留的组件（v1.1.0 新增）
以下组件会被**完整保留**，因为它们是博客系统支持的标准组件：

| 组件名称 | 说明 | 用途 |
|---------|------|------|
| `CodeDiff` | 代码对比显示 | 显示代码的添加/删除行 |
| `CodeWithLineNumbers` | 带行号的代码块 | 显示代码行号和高亮 |
| `Mermaid` | Mermaid 图表 | 渲染流程图、时序图等 |
| `VideoEmbed` | 视频嵌入 | 嵌入 YouTube、Bilibili 等视频 |
| `Image` | 图片组件 | 支持缩放的图片显示 |
| `Twemoji` | Emoji 组件 | 显示 Twitter 风格的 emoji |

**使用示例：**
```markdown
<CodeDiff language="javascript">
{`- const oldCode = 'old'
+ const newCode = 'new'`}
</CodeDiff>

<Mermaid chart={`graph TD; A-->B;`} />
```

### 🛠️ 自动修复
- ✅ 修复未闭合的代码块（自动添加 ` ``` `）
- ✅ 添加缺失的 Front Matter
- ✅ 确保 Front Matter 包含必要字段（title, date, summary）
- ✅ 自动生成 summary（如果为空）

### 📝 保留的内容
转换器会**完整保留**所有标准 Markdown 语法：
- ✅ 标题（`#`, `##`, `###` 等）
- ✅ 列表（有序、无序、嵌套）
- ✅ 代码块（带语言标识、带标题）
- ✅ 链接和图片
- ✅ 引用块（包括 GitHub 风格提示块）
- ✅ 粗体、斜体、删除线
- ✅ 表格
- ✅ 任务列表
- ✅ 数学公式
- ✅ Emoji 短代码
- ✅ Mermaid 图表
- ✅ 视频链接
- ✅ 所有其他标准 Markdown 语法

## 📂 目录结构

```
txt-to-mdx-converter/
├── input/              ← 📥 放置你用 MDX 格式写的 .txt 文件
│   └── .gitkeep
├── output/             ← 📤 转换后的 .mdx 文件（可直接上传博客）
│   └── .gitkeep
├── examples/           ← 📚 示例文件
├── .github/workflows/  ← 🚀 GitHub Actions 工作流
└── txt-to-mdx.js      ← 🔧 转换脚本
```

**规范化的工作流程：**
1. 用 MDX 格式写博客内容，保存为 `.txt` 文件，放到 `input/` 目录
2. 运行转换命令
3. 从 `output/` 目录获取转换后的 `.mdx` 文件
4. 上传 `.mdx` 文件到你的博客平台

## 🚀 使用方法

### 方式 1：使用 GitHub Actions（推荐）

**最简单的方式，无需本地安装 Node.js**

1. **Fork 或克隆这个仓库**
   ```bash
   git clone https://github.com/WXFffff666/txt-to-mdx-converter.git
   cd txt-to-mdx-converter
   ```

2. **用 MDX 格式写博客，保存为 .txt 文件**
   
   在 `input/` 目录创建 `.txt` 文件，用 MDX 格式编写：
   
   ```markdown
   ---
   title: "我的博客文章"
   date: "2024-01-15"
   summary: "文章摘要"
   ---
   
   # 标题
   
   这是正文内容，支持所有 Markdown 语法。
   
   ## 代码示例
   
   ```javascript
   console.log("Hello, World!");
   ```
   ```

3. **推送到 GitHub**
   ```bash
   git add input/
   git commit -m "Add blog posts"
   git push
   ```

4. **运行工作流**
   - 方式 A：推送 `.txt` 文件到 `input/` 目录会自动触发
   - 方式 B：在 GitHub 仓库的 Actions 标签页手动触发

5. **下载转换结果**
   - 在 Actions 页面下载 Artifacts
   - 得到转换好的 `.mdx` 文件
   - 上传到你的博客平台

### 方式 2：本地使用

需要 Node.js 12+

```bash
# 克隆仓库
git clone https://github.com/WXFffff666/txt-to-mdx-converter.git
cd txt-to-mdx-converter

# 用 MDX 格式写博客，保存为 .txt 文件，放到 input/ 目录

# 运行转换（输出到 output/ 目录）
npm run convert

# 或直接使用 node
node txt-to-mdx.js input output

# 从 output/ 目录获取 .mdx 文件，上传到博客
```

**自定义路径：**
```bash
# 指定输入和输出目录
node txt-to-mdx.js /path/to/input /path/to/output

# 只指定输入目录（输出到 output/）
node txt-to-mdx.js /path/to/input
```

## 📝 输入格式要求

### ✅ 正确的格式（MDX 格式）

**推荐格式（带 Front Matter）：**

```markdown
---
title: "文章标题"
date: "2024-01-15"
summary: "文章摘要"
tags: ["tag1", "tag2"]
---

# 文章标题

正文内容，支持所有 Markdown 语法...

## 小标题

- 列表项 1
- 列表项 2

## 代码示例

```javascript
console.log("Hello");
```

**粗体** 和 *斜体*
```

**简单格式（不带 Front Matter）：**

```markdown
# 文章标题

正文内容...
```

工具会自动添加默认的 Front Matter：
```yaml
---
title: "Untitled"
date: "2024-01-15"  # 当天日期
summary: ""
---
```

### ❌ 不支持的格式

- ❌ 纯文本（没有任何 Markdown 格式）
- ❌ Word 文档内容
- ❌ HTML 格式
- ❌ 其他非 MDX 格式的内容

## 🎯 转换示例

### 输入文件（input/example.txt）

**用 MDX 格式编写的内容：**

```markdown
---
title: "测试文章"
date: "2024-01-15"
---

import { VideoPlayer } from '@/components'

# 我的文章

<VideoPlayer src="video.mp4" />

这是正文内容。

```javascript
function test() {
  console.log("未闭合的代码块");
```

### 输出文件（output/example.mdx）

**转换后的干净 .mdx 文件：**

```markdown
---
title: "测试文章"
date: "2024-01-15"
summary: ""
---

# 我的文章

这是正文内容。

```javascript
function test() {
  console.log("未闭合的代码块");
}
```
```

**转换结果：**
- ✅ 移除了 `import` 语句
- ✅ 移除了 `<VideoPlayer />` 组件
- ✅ 添加了缺失的 `summary` 字段
- ✅ 修复了未闭合的代码块
- ✅ 保留了所有 Markdown 内容
- ✅ 可以直接上传到博客平台

## 🧪 测试功能

仓库包含了完整的测试文件 `input/test-all-features.txt`，你可以运行测试验证所有功能：

```bash
npm run convert
```

然后检查 `output/test-all-features.mdx` 查看转换结果。

## ⚠️ 免责声明

**重要提示：**

1. **AI 生成的代码**
   - 这个工具完全由 AI (Claude) 生成
   - 可能存在 bug 或不完善的地方
   - 建议在使用前先用测试文件验证

2. **使用要求**
   - 你的 `.txt` 文件必须用 **MDX 格式**编写
   - 不支持纯文本或其他格式的转换

3. **使用风险**
   - 请在转换前备份你的原始文件
   - 转换后请检查 `output/` 目录的输出结果
   - 不保证 100% 准确转换

4. **适用场景**
   - 这是一个简单的辅助工具
   - 适合已经用 MDX 格式写好内容的用户
   - 复杂的转换可能需要手动调整

5. **无保证**
   - 按"原样"提供，不提供任何明示或暗示的保证
   - 使用本工具产生的任何问题，作者不承担责任

**建议：** 转换后请仔细检查 `output/` 目录的文件，确保符合你的需求后再上传到博客。

## 💡 使用场景

- ✅ 用 MDX 格式写博客，保存为 .txt 方便编辑
- ✅ 批量转换 MDX 格式的 .txt 文件
- ✅ 清理和标准化 MDX 文件
- ✅ 移除不支持的组件后上传博客

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

由于这是 AI 生成的项目，可能有很多可以改进的地方，欢迎贡献你的想法。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 关于

这个工具由 **Claude**（Anthropic 的 AI 助手）构建，旨在帮助用 MDX 格式写博客的用户，将 .txt 文件转换成 .mdx 文件并上传到博客平台。

作为 AI 生成的项目，它可能不够完美，但希望能对你有所帮助。如果遇到问题，欢迎提 Issue。

---

**🤖 完全由 AI 构建** | [报告问题](https://github.com/WXFffff666/txt-to-mdx-converter/issues) | [查看示例](examples/) | [测试文件](input/test-all-features.txt)
