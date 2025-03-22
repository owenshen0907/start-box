// src/app/[lang]/components/icon-button.tsx
import React, { forwardRef } from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: JSX.Element;
    title: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ icon, title, className, style, ...rest }, ref) => {
        return (
            <button
                ref={ref}
                title={title}
                aria-label={title}
                style={style}
                className={`border-none outline-none cursor-pointer ${className || ''}`}
                {...rest}
            >
                {icon}
            </button>
        );
    }
);

IconButton.displayName = 'IconButton';

export default IconButton;