import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

export interface DropdownProps {
    /** The element that toggles the dropdown. */
    button: JSX.Element,
    /** The alignment of the dropdown. */
    alignment?: 'top-left' | 'top-right',
    /** Wether or not the dropdown goes over the button */
    overButton?: boolean,
    /** The dropdown's children */
    children?: (collapse: () => void) => React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({ button, children, alignment, overButton }) => {
    const [show, setShow] = useState(false);

    return (
        <OutsideClickHandler onOutsideClick={() => {
            setShow(false);
        }}>
            <div className={`dropdown dropdown--${alignment || 'top-left'}${show ? ' dropdown--show' : ''}${overButton ? ' dropdown--over-button' : ''}`}>
                <div className="dropdown__button" onClick={() => {
                    setShow(!show);
                }}>
                    {button}
                </div>
                <div className="dropdown__content__container">
                    <div className="dropdown__content">
                        {children(() => { if (show) setShow(false) })}
                    </div>
                </div>
            </div>
        </OutsideClickHandler>
    );
}

export default Dropdown;