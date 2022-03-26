import React from 'react';
import Lottie from 'react-lottie-player';

import animJson from '../animations/loading-indicator.json';

const CircularLoadingIndicator: React.FC = () => {
    return (
        <div className="loading-indicator">
            <Lottie
                loop
                animationData={animJson}
                play
                style={{ width: 150, height: 150 }}
            />
        </div>
    );
}

export default CircularLoadingIndicator;