# TXT to MDX Converter

🤖 **完全由 AI 构建** - Claude (Anthropic)

一个简单的工具，将 `.txt` 文件转换成 `.mdx` 格式，自动清理不支持的组件，方便发布到博客平台。

## 💡 这个工具是做什么的？

如果你需要将文本文件转换成 MDX 格式用于博客发布（Next.js、Docusaurus、Gatsby 等），这个工具可以帮你：

1. 将 `.txt` 文件转换成 `.mdx` 文件
2. 自动移除不支持的组件和 import 语句
3. 自动修复格式问题（未闭合的代码块、缺失的 Front Matter 等）
4. 输出干净、标准的 MDX 文件

## ✨ 支持的功能

### 🔄 自动转换
- 批量转换 `.txt` 到 `.mdx`
- 递归处理子目录
- 保留目录结构

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
| `Player` | 播放器 | `<Player url="..." />` |
| `Embed` | 嵌入组件 | `<Embed src="..." />` |

**同时移除：**
- ✅ 所有 `import` 语句（如 `import { Component } from '@/components'`）
- ✅ 多余的空行（超过 2 个连续空行）

### 🛠️ 自动修复
- ✅ 修复未闭合的代码块（自动添加 ` ``` `）
- ✅ 添加缺失的 Front Matter
- ✅ 确保 Front Matter 包含必要字段（title, date, summary）

### 📝 保留的内容
转换器会**完整保留**所有标准 Markdown 语法：
- ✅ 标题（`#`, `##`, `###` 等）
- ✅ 列表（有序、无序、嵌套）
- ✅ 代码块（带语言标识）
- ✅ 链接和图片
- ✅ 引用块
- ✅ 粗体、斜体
- ✅ 表格
- ✅ 所有其他标准 Markdown 语法

## 📂 目录结构

```
txt-to-mdx-converter/
├── input/              ← 📥 放置你的 .txt 文件（输入）
│   └── .gitkeep
├── output/             ← 📤 转换后的 .mdx 文件（输出）
│   └── .gitkeep
├── examples/           ← 📚 示例文件
├── .github/workflows/  ← 🚀 GitHub Actions 工作流
└── txt-to-mdx.js      ← 🔧 转换脚本
```

**规范化的工作流程：**
1. 将 `.txt` 文件放到 `input/` 目录
2. 运行转换命令
3. 从 `output/` 目录获取转换后的 `.mdx` 文件
4. 文件不会混乱，输入输出分离

## 🚀 使用方法

### 方式 1：使用 GitHub Actions（推荐）

**最简单的方式，无需本地安装 Node.js**

1. **Fork 或克隆这个仓库**
   ```bash
   git clone https://github.com/WXFffff666/txt-to-mdx-converter.git
   cd txt-to-mdx-converter
   ```

2. **添加你的 TXT 文件**
   
   在 `input/` 目录创建 `.txt` 文件：
   
   ```markdown
   ---
   title: "我的博客文章"
   date: "2024-01-15"
   summary: "文章摘要"
   ---
   
   # 标题
   
   这是正文内容...
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

### 方式 2：本地使用

需要 Node.js 12+

```bash
# 克隆仓库
git clone https://github.com/WXFffff666/txt-to-mdx-converter.git
cd txt-to-mdx-converter

# 将 .txt 文件放到 input/ 目录

# 运行转换（输出到 output/ 目录）
npm run convert

# 或直接使用 node
node txt-to-mdx.js input output
```

**自定义路径：**
```bash
# 指定输入和输出目录
node txt-to-mdx.js /path/to/input /path/to/output

# 只指定输入目录（输出到 output/）
node txt-to-mdx.js /path/to/input
```

## 📝 输入格式

### 推荐格式（带 Front Matter）

```markdown
---
title: "文章标题"
date: "2024-01-15"
summary: "文章摘要"
tags: ["tag1", "tag2"]
---

# 文章标题

正文内容...

## 代码示例

```javascript
console.log("Hello");
```
```

### 简单格式（不带 Front Matter）

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

## 🎯 转换示例

### 输入文件（input/example.txt）

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

2. **使用风险**
   - 请在转换前备份你的原始文件
   - 转换后请检查 `output/` 目录的输出结果
   - 不保证 100% 准确转换

3. **适用场景**
   - 这是一个简单的辅助工具
   - 适合基本的 TXT 到 MDX 转换需求
   - 复杂的转换可能需要手动调整

4. **无保证**
   - 按"原样"提供，不提供任何明示或暗示的保证
   - 使用本工具产生的任何问题，作者不承担责任

**建议：** 转换后请仔细检查 `output/` 目录的文件，确保符合你的需求。

## 💡 使用场景

- ✅ 个人博客写作和发布
- ✅ 批量转换文本文件
- ✅ 清理和标准化 MDX 文件
- ✅ 移除不支持的组件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

由于这是 AI 生成的项目，可能有很多可以改进的地方，欢迎贡献你的想法。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 关于

这个工具由 **Claude**（Anthropic 的 AI 助手）构建，旨在简化 TXT 到 MDX 的转换流程。

作为 AI 生成的项目，它可能不够完美，但希望能对你有所帮助。如果遇到问题，欢迎提 Issue。

---

**🤖 完全由 AI 构建** | [报告问题](https://github.com/WXFffff666/txt-to-mdx-converter/issues) | [查看示例](examples/) | [测试文件](input/test-all-features.txt)
