import { defineConfig } from 'vitepress'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const DOCS_ROOT = join(__dirname, '..')

function collectMarkdownFiles(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (entry.startsWith('.') || entry === 'public' || entry === 'node_modules') continue
    const stat = statSync(full)
    if (stat.isDirectory()) {
      collectMarkdownFiles(full, files)
    } else if (entry.endsWith('.md')) {
      files.push(full)
    }
  }
  return files
}

function buildLlmsFullTxt(outFile: string) {
  const files = collectMarkdownFiles(DOCS_ROOT).sort()
  const parts: string[] = [
    '# SatTPV API — Full documentation',
    '',
    '> This file concatenates every Markdown page of the SatTPV API documentation. It is generated automatically at build time and is intended to be consumed by Large Language Models.',
    '',
  ]
  for (const file of files) {
    const rel = relative(DOCS_ROOT, file).replace(/\\/g, '/')
    const content = readFileSync(file, 'utf8')
    parts.push('---')
    parts.push(`Source: ${rel}`)
    parts.push('---')
    parts.push('')
    parts.push(content.trim())
    parts.push('')
  }
  writeFileSync(outFile, parts.join('\n'), 'utf8')
}

export default defineConfig({
  lang: 'en-US',
  title: 'SatTPV API',
  description: 'Official documentation for the SatTPV REST API',
  base: '/docs/',
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: 'https://https://sattpv-software.github.io/docs/',
  },

  head: [
    ['meta', { name: 'theme-color', content: '#3a86ff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'SatTPV API Documentation' }],
    ['meta', { property: 'og:site_name', content: 'SatTPV API' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'alternate', type: 'text/markdown', title: 'LLM-friendly index', href: '/docs/llms.txt' }],
    ['link', { rel: 'alternate', type: 'text/markdown', title: 'Full documentation for LLMs', href: '/docs/llms-full.txt' }],
  ],

  themeConfig: {
    siteTitle: 'SatTPV API',

    nav: [
      { text: 'Introduction', link: '/introduction' },
      { text: 'Authentication', link: '/authentication' },
      { text: 'API Reference', link: '/api/customers/' },
      { text: 'sattpv.net', link: 'https://www.sattpv.net' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Authentication', link: '/authentication' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          {
            text: 'Customers',
            collapsed: false,
            link: '/api/customers/',
            items: [
              { text: 'List customers', link: '/api/customers/list' },
              { text: 'Get customer', link: '/api/customers/get' },
              { text: 'Create customer', link: '/api/customers/create' },
              { text: 'Update customer', link: '/api/customers/update' },
              { text: 'Delete customer', link: '/api/customers/delete' },
            ],
          },
          {
            text: 'Products',
            collapsed: false,
            link: '/api/products/',
            items: [
              { text: 'List products', link: '/api/products/list' },
              { text: 'Get product', link: '/api/products/get' },
              { text: 'Update product', link: '/api/products/update' },
              { text: 'Delete product', link: '/api/products/delete' },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SatTPV-Software/docs' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the SatTPV terms of service.',
      copyright: `Copyright © ${new Date().getFullYear()} SatTPV`,
    },

    editLink: {
      pattern: 'https://github.com/SatTPV-Software/docs/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
  },

  buildEnd(siteConfig) {
    const outFile = join(siteConfig.outDir, 'llms-full.txt')
    buildLlmsFullTxt(outFile)
  },
})
