import React from 'react';
import { LinearProgress } from '@rmwc/linear-progress';
import CircularLoadingIndicator from '../components/circular-loading-indicator';

export interface LoadingOverlayProps {
    type?: 'linear' | 'circular' | 'default',
    loading?: boolean
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ type, loading }) => {
    return (
        <div className={`loading-overlay${loading ? ' show' : ''}`}>
            {
                type === 'linear' ? (
                    <div className="loading--linear">
                        <LinearProgress />
                    </div>
                ) : type === 'circular' ? (
                    <CircularLoadingIndicator />
                ) : ('')
            }
        </div>
    );
}

export default LoadingOverlay;