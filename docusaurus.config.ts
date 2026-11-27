import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Adresse eurer Pages-CMS-Installation
const CMS_URL = 'https://app.pagescms.org';
const REPO = 'CrayonSMP/CrayonDocs';

const config: Config = {
  title: 'CrayonSMP - Wiki',

  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    // Use the faster toolchain (Rspack + SWC + Lightning CSS + MDX-rs)
    // provided by the installed @docusaurus/faster package.
    faster: true,
  },

  // Set the production url of your site here
  url: 'https://wiki.crayonsmp.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'CrayonSMP', // Usually your GitHub org/user name.
  projectName: 'CrayonDocs', // Usually your repo name.

  onBrokenLinks: 'warn',

  markdown: {
    // .md = normales Markdown (Pages CMS), .mdx = MDX mit Komponenten
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      // ein fehlendes Bild soll nicht den ganzen Build abbrechen
      onBrokenMarkdownImages: 'warn',
    }
  },

  // Reapply saved theme preferences BEFORE first paint so the navbar/active
  // states don't flash defaults on reload. The pickers (initThemeColorPicker,
  // initSidebarToolbar) own these attributes thereafter; this only sets them
  // early. Runs in <head>, before React mounts.
  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
      try {
        const themeColor = localStorage.getItem('theme-color');
        if (themeColor) {
          document.documentElement.setAttribute('data-theme-color', themeColor);
        }
      } catch (_) {}
      try {
        const eyeCare = localStorage.getItem('eyecare');
        if (eyeCare) {
          document.documentElement.setAttribute('data-eyecare', eyeCare);
        }
      } catch (_) {}
      `,
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          routeBasePath: '/',
          // .md-Seiten öffnen im CMS, .mdx-Seiten weiterhin auf GitHub
          editUrl: ({docPath}) =>
            docPath.endsWith('.md')
              ? `${CMS_URL}/${REPO}/draft/collection/wiki/edit/${encodeURIComponent(`docs/${docPath}`)}`
              : `https://github.com/${REPO}/edit/draft/docs/${docPath}`,
          editLocalizedFiles: true,
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    navbar: {
      title: 'CrayonSMP Wiki',
      logo: {
        src: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          href: 'https://discord.gg/cdhWC3XkR8',
          label: 'Discord',
          position: 'right',
          className: 'navbar-discord-link',
          'aria-label': 'Discord',
        },
      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java'],
    },
    colorMode: {
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'rgba(255,255,255,0.8)',
        dark: 'rgba(36,36,36,0.8)',
      },
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ["en"],
        searchBarShortcutKeymap: "ctrl+shift+f",
        docsRouteBasePath: "/",
      }),
    ],
    'docusaurus-plugin-image-zoom',
  ],
};

export default config;
