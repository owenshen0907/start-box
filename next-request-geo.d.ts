// next-request-geo.d.ts
import 'next/server';

declare module 'next/server' {
    interface NextRequest {
        geo?: {
            country?: string;
            region?: string;
            city?: string;
        };
    }
}