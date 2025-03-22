import { useState, useEffect } from 'react';

export default function useTheme(): ['light' | 'dark', (theme: 'light' | 'dark') => void] {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 初始时读取 localStorage
    useEffect(() => {
        const storedTheme = window.localStorage.getItem('theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
            setTheme(storedTheme);
        }
    }, []);

    // 每次 theme 变化时，同步更新 document.documentElement 的 dark 类
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return [theme, setTheme];
}