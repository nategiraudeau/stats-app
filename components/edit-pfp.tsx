import React, { useState } from 'react';
import { useAuth } from '../providers/auth-provider';
import { useData } from '../providers/data-provider';
import DialogAction from './dialog-action';
import LoadingOverlay from './loading-overlay';

const EditPfp: React.FC<{ cancel: () => void }> = ({ cancel }) => {
    const userId = useAuth();
    const data = useData();

    const [loading, setLoading] = useState(false);

    return (
        <div className='column'>
            <div className="dialog__actions">
                <div className="dialog__action__container">
                    <DialogAction primary>Choose Image</DialogAction>
                </div>
            </div>
            <LoadingOverlay loading={loading} />
        </div>
    );
}

export default EditPfp;