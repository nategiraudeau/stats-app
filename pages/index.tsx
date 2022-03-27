import Link from 'next/link';
import React from 'react';
import Icons from '../components/icons';

const Landing: React.FC = () => {

    return (
        <div className='column' style={{
            marginTop: '20px'
        }}>
            <br />
            <h1 style={{ fontSize: '68px', marginBottom: 0, textAlign: 'center' }}>Keep track of your soccer stats</h1>
            <br />
            <p style={{
                fontSize: '20px',
                opacity: 0.5
            }}>Every game, evey goal, all in one place.</p>
            <br />
            <br />
            <Link href="/sign-up">
                <div className="button button--primary">
                    <Icons.ArrowRight opacity={0} />
                    Get Started
                    <div className="h-spacing"></div>
                    <div className="h-spacing--sm"></div>
                    <Icons.ArrowRight />
                </div>
            </Link>
        </div>
    );
}

export default Landing;