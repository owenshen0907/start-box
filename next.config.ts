// next.config.ts

import type { Configuration } from 'webpack';

const nextConfig = {
    webpack(config: Configuration) {
        // 如果 module 存在且 module.rules 存在，才 push
        if (config.module?.rules) {
            config.module.rules.push({
                test: /\.svg$/,
                issuer: { and: [/\.(js|ts)x?$/] },
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgo: true,
                            svgoConfig: {
                                plugins: [
                                    { name: 'removeViewBox', active: false },
                                    { name: 'removeDimensions', active: true },
                                ],
                            },
                            expandProps: 'start',
                        },
                    },
                ],
            });
        }
        return config;
    },
};

export default nextConfig;