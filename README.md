


```markdown
# Start Box 🚀

**Start Box** 是一个基于 Next.js 的多语言网站模板，采用轻量级自定义多语言方案。内置响应式布局，集成 TailwindCSS，支持动态路由与按需语言加载。

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/owenshen0907/StartBox/blob/main/LICENSE)
![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)

![Preview](https://via.placeholder.com/800x400.png?text=StartBox+Preview) 

## ✨ 核心特性

- 🌍 **智能多语言支持**
  - 动态加载 `en`/`cn`/`jp` 语言包
  - 根据路由参数自动切换语言
- 🖥 **响应式布局**
  - 顶部导航 | 内容区域 | 底部页脚三明治结构
  - 暗黑模式自适应（CSS 变量驱动）
- ⚡ **现代技术栈**
  - Next.js App Router
  - TailwindCSS 原子化样式
  - TypeScript 类型安全

## 🗂 项目结构

```bash
start-box/
├── app/
│   ├── [lang]/               # 动态路由参数
│   │   ├── layout.tsx        # 全局布局组件
│   │   └── page.tsx          # 首页内容组件
│   └── globals.css           # 全局样式表
├── lib/
│   └── i18n/
│       ├── i18n-config.ts    # 语言配置类型定义
│       └── get-locale.ts     # 动态语言加载器
├── locales/                  # 多语言资源
│   ├── en/common.json
│   ├── cn/common.json
│   └── jp/common.json
└── configs/                  # 工程配置
    ├── next.config.js
    ├── tailwind.config.js
    └── tsconfig.json
```

## 🛠 快速开始

### 环境要求
- Node.js ≥ v18
- [Yarn](https://yarnpkg.com/) (推荐) 或 npm

### 安装依赖
```bash
git clone https://github.com/owenshen0907/StartBox.git
cd StartBox
yarn install
```

### 开发模式
```bash
yarn dev
```
访问示例页面：
- 中文: http://localhost:3000/cn
- 英文: http://localhost:3000/en
- 日文: http://localhost:3000/jp

### 生产构建
```bash
yarn build
yarn start
```

## 🌐 多语言实现

采用动态 JSON 加载方案，核心逻辑位于 `get-locale.ts`：

```typescript
// app/lib/i18n/get-locale.ts
import 'server-only';
import type { Locale } from './i18n-config';

type Translations = Record<string, string>;

type TranslationsLoader = () => Promise<Translations>;

const locales: Record<Locale, TranslationsLoader> = {
    en: () => import('@/ locales/en/common.json').then((module) => module.default),
    cn: () => import('@/ locales/cn/common.json').then((module) => module.default),
    jp: () => import('@/ locales/jp/common.json').then((module) => module.default),
};

export const getLocale = async (locale: Locale): Promise<Translations> => {
    return (await locales[locale]?.()) ?? (await locales.en());
};
```

## 🎨 样式系统

全局样式文件 `globals.css` 实现主题控制：

```css
@import "tailwindcss";

:root {
    --background: #ffffff;
    --foreground: #171717;
}

@theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --font-sans: var(--font-geist-sans);
    --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
    :root {
        --background: #0a0a0a;
        --foreground: #ededed;
    }
}

body {
    background: var(--background);
    color: var(--foreground);
    font-family: Arial, Helvetica, sans-serif;
}

}
```

## 🤝 参与贡献

欢迎通过以下方式参与项目：
1. 提交 [GitHub Issue](https://github.com/owenshen0907/StartBox/issues) 报告问题
2. Fork 项目并提交 Pull Request
3. 完善多语言翻译文件

## 📜 许可证

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 开源。

---

> **提示**：项目持续更新中，建议 Star ⭐ 收藏以获取最新动态！  
> 有任何问题请联系 [owenshen0907](https://github.com/owenshen0907) 或在仓库中创建 Discussion。
