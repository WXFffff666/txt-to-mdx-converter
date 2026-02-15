# TXT to MDX Converter

🤖 **完全由 AI 构建** - Claude (Anthropic)

一个简单的工具，帮助你将用 MDX 语法编写的 `.txt` 文件转换成 `.mdx` 格式，方便发布到博客平台。

## 💡 这个工具是做什么的？

如果你：
- 习惯用文本编辑器写博客
- 想用 MDX 语法（Markdown + 组件）
- 需要转换成 `.mdx` 文件发布到 Next.js、Docusaurus 等平台

那这个工具可能对你有帮助。

**简单来说：**
1. 你用 MDX 语法写内容，保存为 `.txt` 文件
2. 运行这个工具
3. 得到可以直接发布的 `.mdx` 文件

## ✨ 功能

- 🔄 批量转换 `.txt` 到 `.mdx`
- 🧹 自动清理不支持的组件（`<VideoPlayer />`, `<Chart />` 等）
- 🛠️ 自动修复未闭合的代码块
- ✅ 自动添加或修复 Front Matter
- 🚀 提供 GitHub Actions 工作流
- 📦 零依赖

## 🚀 使用方法

### 方式 1：使用 GitHub Actions（推荐）

**最简单的方式，无需本地安装 Node.js**

1. **Fork 或克隆这个仓库**
   ```bash
   git clone https://github.com/WXFffff666/txt-to-mdx-converter.git
   cd txt-to-mdx-converter
   ```

2. **添加你的 TXT 文件**
   
   在 `input/` 目录创建 `.txt` 文件（用 MDX 语法写作）：
   
   ```markdown
   ---
   title: "我的博客文章"
   date: "2024-01-15"
   summary: "文章摘要"
   ---
   
   # 标题
   
   这是正文内容...
   
   ## 代码示例
   
   ```javascript
   console.log("Hello");
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

### 方式 2：本地使用

需要 Node.js 12+

```bash
# 克隆仓库
git clone https://github.com/WXFffff666/txt-to-mdx-converter.git
cd txt-to-mdx-converter

# 将 .txt 文件放到 input/ 目录

# 运行转换
node txt-to-mdx.js input

# 或使用 npm 脚本
npm run convert
```

**自定义路径：**
```bash
# 指定输入目录
node txt-to-mdx.js /path/to/your/txt/files

# 指定输入和输出目录
node txt-to-mdx.js /path/to/input /path/to/output
```

## 📝 输入格式

### 推荐格式（带 Front Matter）

```markdown
---
title: "文章标题"
date: "2024-01-15"
summary: "文章摘要"
---

# 文章标题

正文内容...
```

### 简单格式（不带 Front Matter）

```markdown
# 文章标题

正文内容...
```

工具会自动添加默认的 Front Matter。

## 🎯 输出结果

转换后的 `.mdx` 文件：
- ✅ 包含完整的 Front Matter
- ✅ 移除了不支持的组件和 import 语句
- ✅ 修复了未闭合的代码块
- ✅ 格式干净，可直接使用

## 📂 目录结构

```
txt-to-mdx-converter/
├── .github/
│   └── workflows/
│       └── convert.yml       # GitHub Actions 工作流
├── input/                    # 放置你的 .txt 文件
├── examples/                 # 示例文件
├── txt-to-mdx.js            # 转换脚本
└── README.md
```

## 🔧 自动清理的内容

工具会自动移除这些组件：
- `<VideoPlayer />`, `<Chart />`, `<Callout />`
- `<CustomComponent />`, `<Interactive />`, `<Demo />`
- `<Widget />`, `<Player />`, `<Embed />`
- 所有 `import` 语句

## ⚠️ 免责声明

**重要提示：**

1. **AI 生成的代码**
   - 这个工具完全由 AI (Claude) 生成
   - 可能存在 bug 或不完善的地方
   - 建议在使用前先用示例文件测试

2. **使用风险**
   - 请在转换前备份你的原始文件
   - 转换后请检查输出结果
   - 不保证 100% 准确转换

3. **适用场景**
   - 这是一个简单的辅助工具
   - 适合基本的 TXT 到 MDX 转换需求
   - 复杂的转换可能需要手动调整

4. **无保证**
   - 按"原样"提供，不提供任何明示或暗示的保证
   - 使用本工具产生的任何问题，作者不承担责任

**建议：** 转换后请仔细检查输出文件，确保符合你的需求。

## 💡 使用场景

- 个人博客写作和发布
- 批量转换文本文件
- 清理和标准化 MDX 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

由于这是 AI 生成的项目，可能有很多可以改进的地方，欢迎贡献你的想法。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 关于

这个工具由 **Claude**（Anthropic 的 AI 助手）构建，旨在简化 TXT 到 MDX 的转换流程。

作为 AI 生成的项目，它可能不够完美，但希望能对你有所帮助。如果遇到问题，欢迎提 Issue。

---

**🤖 完全由 AI 构建** | [报告问题](https://github.com/WXFffff666/txt-to-mdx-converter/issues) | [查看示例](examples/)
