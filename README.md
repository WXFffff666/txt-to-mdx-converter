# TXT to MDX Converter

🤖 **Built by Claude** - Anthropic's AI Assistant

A powerful command-line tool that converts plain text files to MDX (Markdown + JSX) format with automatic cleanup and formatting.

## ✨ Features

- 🔄 **Automatic Conversion**: Batch convert all `.txt` files to `.mdx` format
- 🧹 **Smart Cleanup**: Automatically removes unsupported components and imports
- 🛠️ **Auto-Fix**: Fixes unclosed code blocks and missing Front Matter
- 🎨 **Colorful Output**: Beautiful terminal output with progress indicators
- 🚀 **GitHub Actions**: Ready-to-use workflow for automated conversion
- 📦 **Zero Dependencies**: Pure Node.js implementation

### Automatic Cleanup

The converter automatically removes these unsupported components:
- `VideoPlayer`, `Chart`, `Callout`
- `CustomComponent`, `Interactive`, `Demo`
- `Widget`, `Player`, `Embed`

It also removes all `import` statements to ensure clean MDX output.

## 📦 Installation

### Option 1: Clone the repository

```bash
git clone https://github.com/WXFffff666/txt-to-mdx-converter.git
cd txt-to-mdx-converter
```

### Option 2: Download as ZIP

Download the repository and extract it to your desired location.

## 🚀 Usage

### 1. Basic Usage (Default Directory)

Place your `.txt` files in the `data/blog/` directory, then run:

```bash
node txt-to-mdx.js
```

This will convert all `.txt` files in `data/blog/` to `.mdx` format in the same directory.

### 2. Custom Input Directory

```bash
node txt-to-mdx.js /path/to/your/txt/files
```

### 3. Custom Input and Output Directories

```bash
node txt-to-mdx.js /path/to/input /path/to/output
```

### 4. Using NPM Scripts

```bash
# Convert files in default directory
npm run convert

# Test with example files
npm run test
```

### 5. GitHub Actions Workflow

The repository includes a GitHub Actions workflow that automatically converts files when:
- You manually trigger the workflow
- You push `.txt` files to the `data/blog/` directory

The converted `.mdx` files are uploaded as artifacts and can be downloaded from the Actions tab.

## 📝 Input Format

Your `.txt` files can include Front Matter or not. The converter will handle both cases.

### With Front Matter

```markdown
---
title: "My Blog Post"
date: "2024-01-01"
summary: "A brief description"
---

# Content here

Your blog post content...
```

### Without Front Matter

```markdown
# My Blog Post

Your blog post content...
```

The converter will automatically add Front Matter if missing.

## 🎯 Output Format

The converter generates clean `.mdx` files with:
- ✅ Proper Front Matter structure
- ✅ Removed unsupported components
- ✅ Fixed code blocks
- ✅ Clean formatting

## 📂 Directory Structure

```
txt-to-mdx-converter/
├── .github/
│   └── workflows/
│       └── convert.yml       # GitHub Actions workflow
├── data/
│   └── blog/                 # Default input/output directory
├── examples/                 # Example files
│   ├── example-with-frontmatter.txt
│   └── example-without-frontmatter.txt
├── .gitignore
├── package.json
├── README.md
└── txt-to-mdx.js            # Main converter script
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This tool was built by **Claude**, Anthropic's AI Assistant, to help developers easily convert text files to MDX format for modern documentation and blogging platforms.

---

**🤖 Built with AI by Claude** | [Report Issues](https://github.com/WXFffff666/txt-to-mdx-converter/issues)
