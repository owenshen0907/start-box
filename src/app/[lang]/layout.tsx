// app/[lang]/layout.tsx
import '../globals.css';
import { ReactNode } from 'react';
import { getLocale } from '@/app/lib/i18n/get-locale';
import type { Locale } from '@/app/lib/i18n/i18n-config';
import Nav from './nav'; // 引入 Nav 组件

type Props = {
    children: ReactNode;
    params: { lang: Locale } | Promise<{ lang: Locale }>;
};

export default async function LangLayout({ children, params }: Props) {
    const { lang } = await Promise.resolve(params);
    const translations = await getLocale(lang);

    return (
        <>
            {/* 使用 Nav 组件传入翻译数据 */}
            <Nav t={translations} />

            {/* 主体内容区域 */}
            <main className="flex-1 p-4">
                {children}
            </main>

            {/* 底部页脚 */}
            <footer className="bg-gray-200 text-center p-4">
                {translations.footer}
            </footer>
        </>
    );
}