/*
 *  Copyright (c) 2022 Matteu
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

import React from 'react';
import Link from 'next/link';

type NativeButtonTypes = 'button' | 'submit' | 'reset' | undefined;

interface HCButtonProps {
    label?: string;
    icon?: Array<React.ReactElement | string>;
    type?: string;
    nativeType?: NativeButtonTypes;
    link?: string | null;
    isDisabled?: boolean;
    isSubmit?: boolean;
    isReset?: boolean;
    onClick?: (() => React.MouseEventHandler | void);
}

const HCButton: React.FC<HCButtonProps> = ({
    label,
    icon,
    type,
    link,
    isDisabled,
    onClick,
    children,
    nativeType = 'button',
}) => {

    const VALID_BUTTON_TYPES: Array<string> = [
        'outlined',
        'filled',
        'inverted',
        'danger',
        'warning',
        'success'
    ];

    if (type) {
        type.split(' ').forEach((type: string) => {
            if (!VALID_BUTTON_TYPES.includes(type)) throw new Error(`Invalid type: ${ type} ! Please use a valid button type: ${ VALID_BUTTON_TYPES.join(', ') }`);
        });
    }

    const parseTypes = (type: string): string => {
        const finalTypes: Array<string> = [];
        type.split(' ').forEach((type: string) => {
            finalTypes.push('hc-button--' + type);
        });
        return finalTypes.join(' ');
    };

    const ButtonBase = (
        <button
            className={ `hc-button${ type ? ' ' + parseTypes(type) : '' }` }
            type={ nativeType }
            onClick={ onClick }
            disabled={ isDisabled }
            role="button"
        >
            { icon && icon[0] == 'left' && <i className="hc-button__icon">{ icon }</i> }
            { label || children && <span className="hc-button__label">{ label || children }</span> }
            { icon && icon[0] == 'right' && <i className="hc-button__icon">{ icon }</i> }
        </button>
    );

    if (!link) {
        return ButtonBase;
    }

    return (
        <Link href={ link } passHref>
            { ButtonBase }
        </Link>
    );
};

export default HCButton;