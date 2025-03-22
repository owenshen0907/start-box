// src/app/[lang]/nav.tsx
'use client'
import { useEffect, useState } from 'react'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from '@nextui-org/react'
import type { Selection } from '@nextui-org/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Github from '@/app/icons/github.svg'
import Language from '@/app/icons/language.svg'
import Logo from '@/app/icons/logo.png'
import { GITHUB_URL, LANGS } from '@/app/lib/constants'
import IconButton from './components/icon-button'
import { Locale } from '@/app/lib/i18n/i18n-config'
import { Tran } from '@/app/lib/types'
import UserInfo from './components/user-info'

export default function Nav({ t }: { t: Tran }) {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(['cn']))
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const locale = pathname.split('/')[1] || 'cn'
        window.localStorage.setItem('browserLang', locale)
        setSelectedKeys(new Set([locale]))
    }, [pathname])

    const handleSelectionChange = (key: Selection) => {
        const newLocale = Array.from(key)[0] as Locale
        const currentUrl = new URL(window.location.href)
        const segments = currentUrl.pathname.split('/').filter(segment => segment !== '')
        if (segments.length > 0 && LANGS.some(lang => lang.value === segments[0])) {
            segments[0] = newLocale
        } else {
            segments.unshift(newLocale)
        }
        const newPath = '/' + segments.join('/')
        if (newPath !== currentUrl.pathname) {
            window.location.href = newPath
        }
    }

    const handleClickTitle = () => {
        router.refresh()
    }

    // 固定中性色调的导航样式
    const navStyle: React.CSSProperties = {
        width: '100%',
        padding: '0 16px',
        height: '56px',
        display: 'flex',
        position: 'sticky',
        top: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        borderBottom: '1px solid #e5e7eb',
        background: '#F3F4F6', // 中性浅灰
        color: '#1F2937',      // 深灰文字
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    }

    const leftStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        userSelect: 'none',
    }

    const titleStyle: React.CSSProperties = {
        fontSize: '16px',
        fontWeight: 'bold',
        margin: 0,
    }

    const rightStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    }

    const iconStyle: React.CSSProperties = {
        width: '16px',
        height: '16px',
    }

    const dropdownMenuStyle: React.CSSProperties = {
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '4px',
    }

    const dropdownItemStyle: React.CSSProperties = {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        transition: 'background 0.2s',
    }

    return (
        <nav style={navStyle}>
            {/* 左侧：Logo 与网站名称 */}
            <div style={leftStyle} onClick={handleClickTitle}>
                <Image src={Logo} alt="Logo" width={24} height={24} />
                <p style={titleStyle}>Owen&apos;s Cats TTS Web</p>
            </div>
            {/* 右侧：操作区 */}
            <div style={rightStyle}>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    <IconButton
                        icon={<Github style={iconStyle} />}
                        title="Github"
                        style={{}}
                    />
                </a>
                <Dropdown>
                    <DropdownTrigger>
                        <IconButton
                            icon={<Language style={iconStyle} />}
                            title={t['select-language-btn']}
                            style={{}}
                        />
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Select Language"
                        selectionMode="single"
                        disallowEmptySelection
                        selectedKeys={selectedKeys}
                        onSelectionChange={handleSelectionChange}
                        style={dropdownMenuStyle}
                    >
                        {LANGS.map(item => (
                            <DropdownItem key={item.value} value={item.value} style={dropdownItemStyle}>
                                {item.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                {/* 移除主题切换组件 */}
                <UserInfo t={t} />
            </div>
        </nav>
    )
}