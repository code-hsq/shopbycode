import { defineConfig, DefaultTheme } from 'vitepress';
import fs from 'fs';
import { fileURLToPath, URL } from 'node:url';

import path from 'path';
// import vitePluginMedia from '../vite-plugin-media.mjs';
import videoPlugin from './markdown-it-video';

let docsPath = 'src/docs.json';
let srcDir = 'src/docs';
if (process.env.VITEPRESS_DOCS_ROOT) {
  docsPath = path.join(process.env.VITEPRESS_DOCS_ROOT, 'src/docs.json');
  srcDir = path.join(process.env.VITEPRESS_DOCS_ROOT, 'src/docs');
}
docsPath = path.resolve(docsPath);
console.info(`Loading ${docsPath}`);
const docs = JSON.parse(fs.readFileSync(docsPath).toString());

/**
 * Convert feishu-pages's docs.json into VitePress's sidebar config
 * @param docs from `docs.json`
 * @param rootSlug if provided, will find and use this node as the root.
 * @returns
 */
const convertDocsToSidebars = (
  docs: Record<string, any>[],
  rootSlug?: string
) => {
  const sidebars: DefaultTheme.SidebarItem[] = [];

  // Go to root slug
  docs = docs.find((doc) => doc.slug === rootSlug)?.children || docs;

  for (const doc of docs) {
    let sidebar: DefaultTheme.SidebarItem = {
      text: doc.title,
      link: '/' + doc.slug,
    };
    if (doc.children.length > 0) {
      sidebar.items = convertDocsToSidebars(doc.children);
    }
    sidebars.push(sidebar);
  }

  return sidebars;
};

const docsSidebarEN = convertDocsToSidebars(docs, 'en');
const docsSidebarZHCN = convertDocsToSidebars(docs, 'zh-CN');
// console.log(docsSidebarZHCN);

const homeLink = docsSidebarZHCN[0].link || '/';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: '/assets/logo.png' }]],
  vite: {
    // plugins: [vitePluginMedia()],
    define: {
      _PAGES_: docsSidebarZHCN,
      _BASE_: {
        value: '/shopbycode',
      },
    },
    publicDir: 'public',
    // resolve: {
    //   alias: [
    //     {
    //       find: /^.*\/VPSidebar\.vue$/,
    //       replacement: fileURLToPath(
    //         new URL('./components/CustomSidebar.vue', import.meta.url)
    //       ),
    //     },
    //   ],
    // },
  },
  title: '代码商城',
  description: '代码商城',
  base: '/shopbycode',
  ignoreDeadLinks: true,
  cleanUrls: true,
  srcExclude: ['SUMMARY.md'],
  srcDir: srcDir,
  markdown: {
    math: true,
    config: (md) => {
      md.use(videoPlugin);
    },
  },
  lang: 'zh-CN',
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            tokenize: (text: string) => {
              // 首先按空格分割文本得到词语
              const words = text.split(/\s+/);
              // 然后将每个词语拆分为单个字符
              const chars = words.flatMap((word) => Array.from(word));
              // 返回所有词语和字符的组合（去重）
              return [...new Set([...words, ...chars])];
            },
          },
        },
        detailedView: true,
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    outline: {
      label: '目录', // 可选：修改目录标签
    },
    returnToTopLabel: '返回顶部',
    // lastUpdated: {
    //   text: '最后更新时间',
    //   formatOptions: {
    //     dateStyle: 'full',
    //     timeStyle: 'medium',
    //   },
    // },
    darkModeSwitchLabel: '黑暗模式',
    sidebarMenuLabel: '文档',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { component: 'BackSaas' },
      { text: '文档', link: homeLink },
    ],
    sidebar: [
      {
        text: '文档',
        items: [...docsSidebarZHCN],
      },
    ],
  },
});
