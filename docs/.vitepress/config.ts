import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'SatTPV API',
  description: 'Official documentation for the SatTPV REST API',
  base: '/docs/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3a86ff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'SatTPV API Documentation' }],
    ['meta', { property: 'og:site_name', content: 'SatTPV API' }],
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
})
