# TXT to MDX Converter

🤖 **Built by Claude** - Anthropic's AI Assistant

**用 MDX 格式写博客？直接写 TXT，一键转换成 `.mdx` 发布！**

这是一个专为博客写作设计的工具，让你可以用 MDX 语法在 `.txt` 文件中写作，然后自动转换成标准的 `.mdx` 文件发布到博客平台（如 Next.js、Docusaurus、Gatsby 等）。

## 💡 为什么需要这个工具？

很多现代博客平台（Next.js Blog、Docusaurus 等）使用 MDX 格式，但直接编辑 `.mdx` 文件有时会遇到：
- ❌ 编辑器对 MDX 支持不完善
- ❌ 包含不支持的组件导致构建失败
- ❌ Front Matter 格式错误
- ❌ 代码块未闭合

**解决方案：**
1. ✍️ 用 MDX 语法在 `.txt` 文件中写博客（任何编辑器都支持）
2. 🔄 运行转换工具，自动清理和修复
3. 📤 生成干净的 `.mdx` 文件，直接发布到博客

## ✨ 核心功能

### 🔄 自动转换
- 批量将 `.txt` 文件转换为 `.mdx` 格式
- 保留所有 Markdown 和 MDX 语法
- 自动添加或修复 Front Matter

### 🧹 智能清理
自动移除不支持的组件和导入语句：
- `<VideoPlayer />`, `<Chart />`, `<Callout />`
- `<CustomComponent />`, `<Interactive />`, `<Demo />`
- `<Widget />`, `<Player />`, `<Embed />`
- 所有 `import` 语句

### 🛠️ 自动修复
- ✅ 修复未闭合的代码块
- ✅ 添加缺失的 Front Matter
- ✅ 修复空的 summary 字段
- ✅ 清理多余的空行

### 🚀 GitHub Actions 工作流
**开箱即用！克隆仓库后直接使用：**
1. Fork 或克隆这个仓库
2. 在 `data/blog/` 目录放入你的 `.txt` 文件
3. 推送到 GitHub 或手动触发工作流
4. 自动生成 `.mdx` 文件并上传为 Artifacts

### 🎨 其他特性
- 彩色终端输出，实时显示转换进度
- 零依赖，纯 Node.js 实现
- 支持递归处理子目录

## 📦 快速开始

### 方式 1：使用 GitHub Actions（推荐）

**最简单的方式，无需本地安装！**

1. **Fork 或克隆这个仓库**
   ```bash
   git clone https://github.com/WXFffff666/txt-to-mdx-converter.git
   cd txt-to-mdx-converter
   ```

2. **添加你的博客文章**
   
   在 `data/blog/` 目录创建 `.txt` 文件，用 MDX 语法写作：
   
   ```markdown
   ---
   title: "我的第一篇博客"
   date: "2024-01-15"
   summary: "这是一篇用 MDX 写的博客"
   ---
   
   # 欢迎来到我的博客
   
   这是正文内容，支持所有 Markdown 语法。
   
   ## 代码示例
   
   ```javascript
   console.log("Hello, World!");
   ```
   ```

3. **推送到 GitHub**
   ```bash
   git add data/blog/
   git commit -m "Add new blog post"
   git push
   ```

4. **自动转换**
   - GitHub Actions 会自动运行转换
   - 转换后的 `.mdx` 文件会上传为 Artifacts
   - 在 Actions 标签页下载转换结果

5. **手动触发工作流**
   - 进入仓库的 Actions 标签页
   - 选择 "Convert TXT to MDX" 工作流
   - 点击 "Run workflow" 按钮

### 方式 2：本地使用

1. **克隆仓库**
   ```bash
   git clone https://github.com/WXFffff666/txt-to-mdx-converter.git
   cd txt-to-mdx-converter
   ```

2. **放置 TXT 文件**
   
   将你的 `.txt` 文件放到 `data/blog/` 目录

3. **运行转换**
   ```bash
   node txt-to-mdx.js
   ```
   
   或使用 npm 脚本：
   ```bash
   npm run convert
   ```

4. **自定义目录**
   ```bash
   # 指定输入目录
   node txt-to-mdx.js /path/to/your/txt/files
   
   # 指定输入和输出目录
   node txt-to-mdx.js /path/to/input /path/to/output
   ```

## 📝 写作格式

### 推荐格式（带 Front Matter）

```markdown
---
title: "文章标题"
date: "2024-01-15"
summary: "文章摘要"
tags: ["tag1", "tag2"]
---

# 文章标题

这里是正文内容...

## 小标题

- 列表项 1
- 列表项 2

### 代码示例

```python
def hello():
    print("Hello, World!")
```
```

### 简单格式（不带 Front Matter）

```markdown
# 文章标题

直接开始写内容，工具会自动添加 Front Matter。
```

工具会自动添加：
```yaml
---
title: "Untitled"
date: "2024-01-15"  # 当天日期
summary: ""
---
```

## 🎯 转换结果

转换后的 `.mdx` 文件：
- ✅ 包含完整的 Front Matter
- ✅ 移除了所有不支持的组件
- ✅ 移除了所有 import 语句
- ✅ 修复了未闭合的代码块
- ✅ 格式干净，可直接发布

## 📂 目录结构

```
txt-to-mdx-converter/
├── .github/
│   └── workflows/
│       └── convert.yml       # GitHub Actions 工作流（开箱即用）
├── data/
│   └── blog/                 # 放置你的 .txt 文件
├── examples/                 # 示例文件
│   ├── example-with-frontmatter.txt
│   └── example-without-frontmatter.txt
├── .gitignore
├── package.json
├── README.md
├── LICENSE
├── CONTRIBUTING.md
└── txt-to-mdx.js            # 转换脚本
```

## 🔧 工作流程

```
┌─────────────────┐
│  写 .txt 文件   │  用 MDX 语法写博客
│  (MDX 语法)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  运行转换工具   │  node txt-to-mdx.js
│  或推送到 GitHub │  或 git push（自动触发）
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  生成 .mdx 文件 │  自动清理和修复
│  (干净、标准)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  发布到博客     │  Next.js / Docusaurus / Gatsby
└─────────────────┘
```

## 🚀 GitHub Actions 详情

工作流会在以下情况自动运行：
- ✅ 手动触发（Actions 标签页 → Run workflow）
- ✅ 推送 `.txt` 文件到 `data/blog/` 目录

工作流会：
1. 自动转换所有 `.txt` 文件
2. 生成对应的 `.mdx` 文件
3. 上传转换结果为 Artifacts（可下载）
4. 在 Summary 中显示转换的文件列表

## 💡 使用场景

1. **个人博客写作**
   - 在本地用喜欢的编辑器写 `.txt` 文件
   - 推送到 GitHub，自动转换
   - 下载 `.mdx` 文件发布到博客

2. **团队协作**
   - 团队成员提交 `.txt` 格式的文章
   - CI/CD 自动转换和验证
   - 统一的格式和清理规则

3. **内容迁移**
   - 批量转换旧的文本文件
   - 自动添加 Front Matter
   - 清理不兼容的组件

## 🤝 贡献

欢迎提交 Pull Request！详见 [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

这个工具由 **Claude**（Anthropic 的 AI 助手）构建，旨在简化 MDX 博客的写作和发布流程。

---

**🤖 Built with AI by Claude** | [报告问题](https://github.com/WXFffff666/txt-to-mdx-converter/issues) | [查看示例](examples/)
