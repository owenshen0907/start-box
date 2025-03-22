// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supportedLocales = ['cn', 'en', 'jp'];

export function middleware(request: NextRequest) {
    // 使用 geo 信息来确定默认语言
    const country = request.geo?.country || '';
    let locale = 'cn';
    if (country === 'JP') {
        locale = 'jp';
    } else if (['US', 'GB', 'CA', 'AU'].includes(country)) {
        locale = 'en';
    }

    const pathname = request.nextUrl.pathname;
    // 拆分路径并过滤空字符串
    const segments = pathname.split('/').filter((seg) => seg !== '');
    console.log('Middleware debug:', { pathname, segments, computedLocale: locale });

    // 如果 URL 已经以任何支持的语言开头，则不干预
    if (segments.length > 0 && supportedLocales.includes(segments[0])) {
        return NextResponse.next();
    }

    // 如果 URL 没有语言前缀，则添加计算出的语言前缀
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    console.log('Redirecting to:', url.pathname);
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};