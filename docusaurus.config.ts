import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Ryota Onuma",
  tagline: "",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://onuma.ryota.space",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Ryota-Onuma", // Usually your GitHub org/user name.
  projectName: "Ryota-Onuma", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "blog/tech",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "diary",
        routeBasePath: "blog/diary",
        path: "./blog/diary",
      },
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: "/img/musician_duck.png",
    metadata: [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image:width", content: "1200" },
      { name: "og:image:height", content: "600" },
      { name: "og:description", content: "Welcome to my website." },
    ],
    navbar: {
      title: "Ryota Onuma",
      logo: {
        alt: "Ryota Onuma Logo",
        src: "img/musician_duck.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "techBlogSidebar",
          position: "left",
          label: "Tech Blog",
          autoCollapseCategories: true,
        },
        { to: "/blog/diary", label: "Diary", position: "left" },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Ryota Onuma, Built with Docusaurus.`,
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
