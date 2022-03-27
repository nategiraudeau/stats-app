import Head from 'next/head';
import React from 'react';

export interface TitleProps {
    children: string
}

const Title: React.FC<TitleProps> = ({ children }) => {
    return (
        <Head>
            <title>{children} | Nate's Email </title>
        </Head>
    );
}

export default Title;