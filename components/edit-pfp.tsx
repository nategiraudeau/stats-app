import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import db from '../database/db';
import { useAuth } from '../providers/auth-provider';
import { useData } from '../providers/data-provider';
import storage, { uploadProfileImage } from '../storage';
import toBase64 from '../utils/to-base64';
import Icons from './icons';
import Img from './img';
import LoadingOverlay from './loading-overlay';

const EditPfp: React.FC<{ cancel: () => void }> = ({ cancel }) => {
    const userId = useAuth();
    const data = useData();

    const [image, setImage] = useState<string>(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const user = data?.users?.find(u => u.id === userId);
        setImage(user?.pfp || undefined);
    }, [userId]);

    const { getInputProps, getRootProps } = useDropzone({
        onDrop: async (files: File[]) => {
            if (files[0])
                setImage((await toBase64(files[0])));
        }
    });

    if (data.users === undefined || data.teams === undefined) return (<div />);

    const user = data.users.find(u => u.id === userId);
    const ready = user.pfp !== image;

    return (
        <div className='column edit-pfp'>
            <h3>Edit your profile image</h3>
            <br />
            <div className="profile-image big">
                {image ? (
                    <Img src={image} alt=""></Img>
                ) : (
                    <h1>{user.name[0].toUpperCase()}</h1>
                )}
            </div>
            <br />
            <div className="row">
                <div className="icon-button" onClick={() => {
                    setImage(undefined);
                }}>
                    <Icons.Trash />
                </div>
                <div className="h-spacing"></div>
                <div className="h-spacing"></div>
                <div className="h-spacing"></div>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="icon-button">
                        <Icons.Upload />
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div style={{ width: '400px' }} className="edit-pfp__actions row h-align--space">
                <div className="button" onClick={() => cancel()}>Cancel</div>
                <div className={`button button--primary${ready ? '' : ' hidden'}`} onClick={async () => {
                    if (!ready) return;

                    setLoading(true);
                    if (!image) {
                        await storage.refFromURL(user.pfp).delete();
                        await db.collection('users').doc(userId).update({ pfp: null });
                    }
                    else {
                        const newPfp = await uploadProfileImage(image);
                        if (!newPfp) {
                            setImage(undefined);
                            setLoading(false);
                            return;
                        }
                        else {
                            if (user.pfp) await storage.refFromURL(user.pfp).delete();

                            await db.collection('users').doc(userId).update({ pfp: newPfp });
                        }
                    }
                    cancel();
                    setLoading(false);
                }}>Save</div>
            </div>
            <br />
            <LoadingOverlay loading={loading} type="circular" />
        </div>
    );
}

export default EditPfp;