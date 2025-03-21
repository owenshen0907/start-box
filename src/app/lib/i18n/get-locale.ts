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