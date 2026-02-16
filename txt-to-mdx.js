const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

/**
 * 增强版 TXT 转 MDX 脚本
 * 功能：
 * 1. 扫描 data/blog/ 目录下的所有 .txt 文件并转换为 .mdx 格式
 * 2. 验证代码块是否正确闭合
 * 3. 验证 Front Matter 格式
 * 4. 自动修复常见问题
 * 5. 🛡️ 自动清理不支持的自定义组件（防止构建失败）
 */

const BLOG_DIR = path.join(process.cwd(), 'data', 'blog')

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

/**
 * 🛡️ 清理不支持的自定义组件
 * 从根源上防止构建失败
 */
function cleanUnsupportedComponents(content) {
  let cleaned = content
  let hasChanges = false

  // 1. 移除所有 import 语句
  const importRegex = /^import\s+.*?from\s+['"].*?['"];?\s*$/gm
  if (importRegex.test(cleaned)) {
    cleaned = cleaned.replace(importRegex, '')
    hasChanges = true
    log('  🧹 自动移除 import 语句', 'yellow')
  }

  // 2. 移除自定义组件标签
  const customComponents = [
    'VideoPlayer',
    'Chart',
    'Callout',
    'CustomComponent',
    'Interactive',
    'Demo',
    'Widget',
  ]

  customComponents.forEach((component) => {
    // 自闭合标签: <Component />
    const selfClosingRegex = new RegExp(`<${component}[^>]*/>`, 'gs')
    if (selfClosingRegex.test(cleaned)) {
      cleaned = cleaned.replace(selfClosingRegex, '')
      hasChanges = true
      log(`  🧹 自动移除 <${component} /> 组件`, 'yellow')
    }

    // 成对标签: <Component>...</Component>
    const pairedRegex = new RegExp(`<${component}[^>]*>.*?</${component}>`, 'gs')
    if (pairedRegex.test(cleaned)) {
      cleaned = cleaned.replace(pairedRegex, '')
      hasChanges = true
      log(`  🧹 自动移除 <${component}>...</${component}> 组件`, 'yellow')
    }
  })

  // 3. 清理多余的空行
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n')

  if (hasChanges) {
    log('  ✅ 已自动清理不支持的组件，确保构建成功', 'green')
  }

  return cleaned
}

/**
 * 递归扫描目录获取所有 .txt 文件
 */
function getAllTxtFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getAllTxtFiles(filePath, fileList)
    } else if (path.extname(file) === '.txt') {
      fileList.push(filePath)
    }
  })

  return fileList
}

/**
 * 验证代码块是否正确闭合
 */
function validateCodeBlocks(content) {
  const lines = content.split('\n')
  const codeBlockRegex = /^```/
  let codeBlockCount = 0
  let issues = []

  lines.forEach((line) => {
    if (codeBlockRegex.test(line.trim())) {
      codeBlockCount++
    }
  })

  // 检查代码块是否成对
  if (codeBlockCount % 2 !== 0) {
    issues.push({
      type: 'code-block',
      message: `代码块未正确闭合（找到 ${codeBlockCount} 个标记，应该是偶数）`,
      severity: 'error',
    })
  }

  return issues
}

/**
 * 自动修复代码块问题
 */
function fixCodeBlocks(content) {
  const lines = content.split('\n')
  const codeBlockRegex = /^```/
  let codeBlockCount = 0

  lines.forEach((line) => {
    if (codeBlockRegex.test(line.trim())) {
      codeBlockCount++
    }
  })

  // 如果代码块数量是奇数，在末尾添加闭合标记
  if (codeBlockCount % 2 !== 0) {
    log('  ⚠️  检测到未闭合的代码块，自动添加闭合标记', 'yellow')
    return content.trim() + '\n```\n'
  }

  return content
}

/**
 * 验证 Front Matter
 */
function validateFrontMatter(frontmatter) {
  const issues = []

  // 检查必需字段
  if (!frontmatter.title) {
    issues.push({
      type: 'frontmatter',
      message: '缺少 title 字段',
      severity: 'warning',
    })
  }

  if (!frontmatter.date) {
    issues.push({
      type: 'frontmatter',
      message: '缺少 date 字段',
      severity: 'warning',
    })
  }

  // 检查不推荐的字段
  if (frontmatter.categories) {
    issues.push({
      type: 'frontmatter',
      message: '检测到 categories 字段，建议使用 tags 代替',
      severity: 'warning',
    })
  }

  // 检查 summary 是否为空
  if (!frontmatter.summary || frontmatter.summary.trim() === '') {
    issues.push({
      type: 'frontmatter',
      message: 'summary 字段为空，建议添加文章摘要以提升 SEO',
      severity: 'info',
    })
  }

  return issues
}

/**
 * 从第一行提取标题
 */
function extractTitleFromContent(content) {
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed) {
      // 移除 markdown 标题符号
      return trimmed.replace(/^#+\s*/, '').substring(0, 100)
    }
  }
  return 'Untitled'
}

/**
 * 生成当前日期的 ISO 字符串
 */
function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

/**
 * 自动生成摘要
 */
function generateSummary(content) {
  // 移除 markdown 标记和代码块
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/^#+\s+/gm, '') // 移除标题标记
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接，保留文本
    .replace(/[*_~`]/g, '') // 移除格式标记
    .replace(/\n+/g, ' ') // 合并换行
    .trim()

  // 提取前 150 个字符作为摘要
  const summary = cleanContent.substring(0, 150)
  return summary ? summary + '...' : ''
}

/**
 * 转换单个 TXT 文件为 MDX
 */
function convertTxtToMdx(txtFilePath) {
  try {
    log(`\n📄 处理文件: ${path.relative(process.cwd(), txtFilePath)}`, 'cyan')

    const content = fs.readFileSync(txtFilePath, 'utf-8')
    const parsed = matter(content)

    let frontmatter = parsed.data
    let bodyContent = parsed.content

    // 🛡️ 清理不支持的自定义组件（防止构建失败）
    bodyContent = cleanUnsupportedComponents(bodyContent)

    // 验证代码块
    const codeBlockIssues = validateCodeBlocks(bodyContent)
    if (codeBlockIssues.length > 0) {
      codeBlockIssues.forEach((issue) => {
        log(`  ⚠️  ${issue.message}`, 'yellow')
      })
      // 自动修复
      bodyContent = fixCodeBlocks(bodyContent)
    }

    // 如果没有 frontmatter，自动生成
    if (Object.keys(frontmatter).length === 0) {
      const title = extractTitleFromContent(bodyContent)
      const summary = generateSummary(bodyContent)

      frontmatter = {
        title: title,
        date: getCurrentDate(),
        tags: [],
        summary: summary,
        draft: false,
      }
      log('  ℹ️  自动生成 Front Matter', 'blue')
    } else {
      // 验证 Front Matter
      const fmIssues = validateFrontMatter(frontmatter)
      if (fmIssues.length > 0) {
        fmIssues.forEach((issue) => {
          if (issue.severity === 'error') {
            log(`  ❌ ${issue.message}`, 'red')
          } else if (issue.severity === 'warning') {
            log(`  ⚠️  ${issue.message}`, 'yellow')
          } else {
            log(`  ℹ️  ${issue.message}`, 'blue')
          }
        })
      }

      // 自动修复 Front Matter
      if (!frontmatter.title) {
        frontmatter.title = extractTitleFromContent(bodyContent)
        log('  ✓ 自动生成 title', 'green')
      }
      if (!frontmatter.date) {
        frontmatter.date = getCurrentDate()
        log('  ✓ 自动生成 date', 'green')
      }
      if (!frontmatter.tags) {
        frontmatter.tags = []
      }
      if (!frontmatter.summary || frontmatter.summary.trim() === '') {
        frontmatter.summary = generateSummary(bodyContent)
        log('  ✓ 自动生成 summary', 'green')
      }
      if (frontmatter.draft === undefined) {
        frontmatter.draft = false
      }

      // 移除不推荐的字段
      if (frontmatter.categories) {
        delete frontmatter.categories
        log('  ✓ 移除 categories 字段', 'green')
      }
    }

    // 生成新的 MDX 内容
    const mdxContent = matter.stringify(bodyContent, frontmatter)

    // 生成 MDX 文件路径
    const mdxFilePath = txtFilePath.replace(/\.txt$/, '.mdx')

    // 写入 MDX 文件
    fs.writeFileSync(mdxFilePath, mdxContent, 'utf-8')

    // 验证生成的 MDX 文件
    const generatedContent = fs.readFileSync(mdxFilePath, 'utf-8')
    const generatedIssues = validateCodeBlocks(generatedContent)

    if (generatedIssues.length > 0) {
      log(`  ❌ 生成的 MDX 文件仍有问题`, 'red')
      return false
    }

    log(`  ✅ 转换成功: ${path.basename(mdxFilePath)}`, 'green')
    return true
  } catch (error) {
    log(`  ❌ 转换失败: ${error.message}`, 'red')
    console.error(error.stack)
    return false
  }
}

/**
 * 主函数
 */
function main() {
  log('\n🚀 开始 TXT 转 MDX 转换...\n', 'cyan')

  if (!fs.existsSync(BLOG_DIR)) {
    log(`❌ 目录不存在: ${BLOG_DIR}`, 'red')
    return
  }

  const txtFiles = getAllTxtFiles(BLOG_DIR)

  if (txtFiles.length === 0) {
    log('ℹ️  未找到 TXT 文件', 'blue')
    return
  }

  log(`📁 找到 ${txtFiles.length} 个 TXT 文件`, 'blue')

  let successCount = 0
  let failCount = 0

  txtFiles.forEach((txtFile) => {
    if (convertTxtToMdx(txtFile)) {
      successCount++
    } else {
      failCount++
    }
  })

  log('\n' + '='.repeat(50), 'cyan')
  if (failCount === 0) {
    log(`✅ 转换完成: ${successCount} 成功, ${failCount} 失败`, 'green')
  } else {
    log(`⚠️  转换完成: ${successCount} 成功, ${failCount} 失败`, 'yellow')
  }
  log('='.repeat(50) + '\n', 'cyan')
}

// 执行主函数
main()
