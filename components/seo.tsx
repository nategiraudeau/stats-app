import React from 'react';
import Head from 'next/head';

export interface SeoProps {
    title?: string,
    description?: string
}

const Seo: React.FC<SeoProps> = ({ title, description, children }) => (
    <Head>
        <title>{title ? `${title} | Nate's Email` : 'Nate\'s Email'}</title>
        <meta name="description" content={description} />
        {children}
    </Head>
);

export default Seo;