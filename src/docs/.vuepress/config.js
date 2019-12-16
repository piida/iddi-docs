const path = require("path");

module.exports = {
    title: 'iDDi UAN',
    description: 'iDentidad Digital Universitaria',
    evergreen: true,
    base: "/docs/",
    dest: "./dist/docs",
    // markdown: {
    //   anchor: { permalink: false },
    // //   extendMarkdown: md => {
    // //     md.use(require('markdown-it-xxx'))
    // //   }
    // },
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': path.resolve(__dirname,"../../assets"),
                '@images': path.resolve(__dirname,"../../assets/images")
            }
        },
        node: {global: true, fs: 'empty', process: 'mock'},
    },
    plugins: {
        // 'vuepress-plugin-global-toc': {},
        // 'vuepress-plugin-export': {},
        '@vuepress/pwa': {
            serviceWorker: true,
            updatePopup: {
                message: "Hay nuevo contenido disponible, actualiza la página.",
                buttonText: "Actualizar"
            }
        },
        '@vuepress/nprogress': {},
        '@vuepress/medium-zoom': {
        // selector: 'img.zoom-custom-imgs',
        // See: https://github.com/francoischalifour/medium-zoom#options
        // options: {
        //   margin: 16
        // }
        }
    },
    head: [
      ['link', { rel: 'icon', href: '/../a/i/icons/favicon-32x32.png' }],
      ['link', { rel: 'manifest', href: '/../manifest.json' }],
      ['meta', { name: 'theme-color', content: '#003b70' }],
      ['meta', { name: 'application-name', content: 'iDDi Docs' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
      ['link', { rel: 'apple-touch-icon', href: '/../apple-touch-icon.png' }],
      ['link', { rel: 'mask-icon', href: '/../a/i/icons/safari-pinned-tab.svg', color: '#003b70' }],
      ['meta', { name: 'msapplication-config', content: '/../browserconfig.xml' }],
    ],

    themeConfig: {
        logo: '/a/i/logo-iddi.svg',
        searchPlaceholder: 'Buscar...',
        smoothScroll: true,
        sidebarDepth: 2,
        sidebar: {
            '/plataforma/': [
                'introduccion',
                ['aspectos', 'Aspectos de la Plataforma'],
                ['perfiles', 'Usuarios y Perfiles']
            ],

            '/documentacion-tecnica/': [
                'qr-de-identidad',
                ['uso-de-la-api', 'Uso de la API']
            ],

            '/api/': [
                'api-iddi-public', /* /bar/three.html */
            ],

            // // fallback
            // '/': [
            //     '',
            //     'contact', /* /contact.html */
            //     'about'
            // ]
        },
        nav: [
            { text: 'Inicio', link: '/' },
            { text: 'Overview', link: '/plataforma/aspectos' },
            {
            text: 'Documentación',
            items: [
                {
                    text: 'REFERENCIA TÉCNICA', items: [
                        { text: 'Qr de Identidad', link: '/documentacion-tecnica/qr-de-identidad' },
                        { text: 'Uso de la API', link: '/documentacion-tecnica/uso-de-la-api' },
                    ]
                },
                {
                    text: 'API\'S',
                    items: [
                        { text: 'API Pública', link: 'https://iddi.uan.mx/api-spec/api-publica/index.html', target:'_blank' },
                        // { text: 'API Pública', link: '/api/api-iddi-public.md' },
                        { text: 'API Issuer', link: 'https://iddi.uan.mx/api-spec/api-issuer/index.html', target:'_blank' },
                        { text: 'API PiiDA', link: 'https://iddi.uan.mx/api-spec/api-piida/index.html', target:'_blank' },
                    ]
                },
            ]
            },
            { text: 'PiiDA', link: 'https://piida.uan.mx', target:'_blank' },
        ]
    }
}