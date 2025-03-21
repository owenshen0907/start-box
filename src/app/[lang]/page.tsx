// app/[lang]/page.tsx
import { getLocale } from '@/app/lib/i18n/get-locale';
import type { Locale } from '@/app/lib/i18n/i18n-config';

type Props = {
    params: { lang: Locale } | Promise<{ lang: Locale }>;
};

export default async function HomePage({ params }: Props) {
    const { lang } = await Promise.resolve(params);
    const translations = await getLocale(lang);
    return (
        <div>
            <h2 className="text-2xl font-semibold">{translations.welcome}</h2>
            <p>{translations.description}</p>
        </div>
    );
}