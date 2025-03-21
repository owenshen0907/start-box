// app/[lang]/layout.tsx
import '../globals.css';
import { ReactNode } from 'react';
import { getLocale } from '@/app/lib/i18n/get-locale';
import type { Locale } from '@/app/lib/i18n/i18n-config';
type Props = {
    children: ReactNode;
    params: { lang: Locale } | Promise<{ lang: Locale }>;
};

export default async function LangLayout({ children, params }: Props) {
    const { lang } = await Promise.resolve(params);
    const translations = await getLocale(lang);

    return (
        <>
            {/* 顶部导航 */}
            <header className="bg-blue-500 text-white p-4">
                <nav>
                    <h1 className="text-xl font-bold">{translations.navigation}</h1>
                </nav>
            </header>

            {/* 主体内容 */}
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