import clsx from 'clsx';
import React from 'react';

export interface ImgProps {
    src: string,
    alt: string,
    className?: string,
    style?: React.CSSProperties,
    id?: string,
    onClick?: () => void,
    onLoad?: () => void
}

const Img: React.FC<ImgProps> = ({ src, alt, className, id, onClick, onLoad, style }) => (
    <img style={style} onClick={onClick} className={clsx('img', className)} onLoad={e => {
        e.currentTarget.classList.add('loaded');
        if (onLoad) onLoad();
    }} id={id} src={src} alt={alt} />
);

export default Img;