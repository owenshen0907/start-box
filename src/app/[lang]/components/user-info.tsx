// app/[lang]/components/user-info.tsx
'use client'
import { useState } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'

export default function UserInfo({ t }: { t: Record<string, string> }) {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => setIsOpen((prev) => !prev)

    return (
        <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
            <DropdownTrigger>
                <button
                    onClick={handleToggle}
                    className="flex items-center px-2 hover:text-[#0ea5e9] transition-colors duration-300"
                >
                    {/* 直接用文本替代图标 */}
                    {t['user'] || 'User'}
                </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Menu">
                <DropdownItem key="profile">{t['user-profile'] || 'Profile'}</DropdownItem>
                <DropdownItem key="settings">{t['user-settings'] || 'Settings'}</DropdownItem>
                <DropdownItem key="logout">{t['user-logout'] || 'Logout'}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}