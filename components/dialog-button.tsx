import React, { useEffect, useState } from 'react';
import delay from '../utils/delay';
import DialogAction from './dialog-action';
import TextParagraph from './text-paragraph';

export interface DialogButtonProps {
    title?: string | JSX.Element,
    content?: string | JSX.Element | ((close: () => void) => JSX.Element[]),
    barrierDismissible?: boolean
    actions?: JSX.Element[] | ((close: () => void) => JSX.Element[]),
    actionsOrientation?: 'row' | 'column',
    onClose?: () => void
}

const DialogButton: React.FC<DialogButtonProps> = ({
    title,
    content,
    actions,
    children,
    barrierDismissible,
    actionsOrientation,
    onClose
}) => {
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (onClose && showDialog === false) {
            delay(100).then(() => onClose())
        }
    }, [showDialog]);

    return (
        <div className={`dialog-button${showDialog ? ' show' : ''}`}>
            <div className="dialog-button__dialog__background" onClick={() => {
                if (barrierDismissible) {
                    setShowDialog(false);
                }
            }}></div>
            <div className="dialog-button__dialog__container">
                <div className="dialog-button__dialog">
                    {
                        title ? (
                            <h1 className="dialog__title">{title}</h1>
                        ) : (
                            <br />
                        )
                    }
                    {
                        content && (typeof content === 'string' || content instanceof Array ? (
                            <p style={typeof content === 'string' ? {
                                whiteSpace: 'pre-wrap',
                                fontSize: 12
                            } : {}} className="dialog__content">{content}</p>
                        ) : typeof content === 'function' ? (
                            <div className="dialog__content">{content(() => setShowDialog(false))}</div>
                        ) : (
                            <div />
                        ))
                    }
                    {
                        actions &&
                        (
                            <div className={`dialog__actions${actionsOrientation ? ` ${actionsOrientation}` : ''}`}>
                                {actions instanceof Array ? actions.map(action => {
                                    return (
                                        <div key={Math.random()} className="dialog__action__container" onClick={() => {
                                            if (action.props.isStatic) return;
                                            setShowDialog(false);
                                        }}>{action}</div>
                                    );
                                }) : actions(() => setShowDialog(false))}
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="dialog-button__trigger" onClick={() => setShowDialog(true)}>
                {children}
            </div>
        </div >
    );
}

export default DialogButton;