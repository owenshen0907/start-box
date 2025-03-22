// tailwind.config.js
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'nav-light': '#f8f9fa', // 示例颜色，可按需调整
                'nav-dark': '#343a40',
            },
        },
    },
    plugins: [],
}