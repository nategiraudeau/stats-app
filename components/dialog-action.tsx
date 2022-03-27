import clsx from 'clsx';
import React from 'react';

export interface DialogActionProps {
    danger?: boolean,
    primary?: boolean,
    isStatic?: boolean
    onClick?: () => void
}

const DialogAction: React.FC<DialogActionProps> = ({ children, danger, primary, isStatic, onClick }) => (
    <div onClick={onClick} className={clsx('dialog__action', danger ? 'danger' : '', primary ? 'primary' : '', isStatic ? ' static' : '')}>
        {children}
    </div>
);

export default DialogAction;