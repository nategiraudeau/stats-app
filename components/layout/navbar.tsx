import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import User from '../../models/user';
import { logOut, useAuth } from '../../providers/auth-provider';
import { useData } from '../../providers/data-provider';
import DialogAction from '../dialog-action';
import DialogButton from '../dialog-button';
import Icons from '../icons';
import Img from '../img';
import LoadingOverlay from '../loading-overlay';

const Navbar: React.FC = () => {
    const authState = useAuth();
    const router = useRouter();
    const data = useData();

    let user: User = undefined;

    const [loading, setLoading] = useState(false);

    if (authState) {
        user = data?.users?.find(u => u.id === authState);
    }

    return (
        <div className="navbar">
            <div className="left">
                <Link href="/"><h1 style={{ cursor: 'pointer' }}>
                    <Icons.BarChart size={38} /> Stats
                </h1></Link>
            </div>
            <div>
                {
                    authState ? (
                        <div>
                            <div className="navbar__links">
                                <Link href="/mystats"><div className="button">My Stats</div></Link>
                                {/* <Dropdown alignment="top-right" button={(
                                    <div className="button" style={{
                                        width: '44px',
                                        padding: 0
                                    }}>
                                        <Icons.User />
                                    </div>
                                )} children={_ => (
                                    <div className="menu">
                                        <div className="menu__link" onClick={async () => {
                                            setLoading(true);
                                            await logOut();
                                            setLoading(false);
                                        }}>Log Out</div>
                                    </div>
                                )} /> */}
                                <DialogButton
                                    key="user-profile"
                                    actionsOrientation='column'
                                    barrierDismissible
                                    actions={[
                                        (<DialogAction key="user-profile__profile">
                                            <div className="dialog__action__icon">
                                                <Icons.Edit3 size={18} />
                                            </div>
                                            Profile
                                        </DialogAction>),
                                        (<DialogAction key="user-profile__logout" onClick={async () => {
                                            setLoading(true);
                                            await logOut();
                                            router.push('/');
                                            setLoading(false);
                                        }}>
                                            <div className="dialog__action__icon">
                                                <Icons.LogOut size={18} />
                                            </div>
                                            Log Out
                                        </DialogAction>)
                                    ]}>
                                    <div className="button" style={{
                                        width: '44px',
                                        padding: 0
                                    }}>
                                        {user?.pfp ? (<Img alt="" src={user.pfp} />) : user?.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                </DialogButton>
                            </div>
                            <LoadingOverlay loading={loading} type="linear" />
                        </div>
                    ) : authState === undefined ? (
                        <div></div>
                    ) : (
                        <div className="navbar__links">
                            <Link href="/login"><div className="button">Log In</div></Link >
                            <Link href="/sign-up"><div className="button button--primary">Sign Up</div></Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Navbar;