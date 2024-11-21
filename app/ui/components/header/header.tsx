'use client';

import React, { useEffect } from 'react';
import styles from './header.module.css';
import Image from "next/image";
import Link from 'next/link';
import NavLinks from './navlinks/navlinks';
import { useAppSelector, useAppDispatch } from '@/app/store/store';
import AuthBox from './authBox/AuthBox';
import { getUser } from '@/app/store/slices/auth/authSlice';

const Header = () => {
    const { loading, user } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <Link
                href="/"
            >
                <div className={styles.logo}>
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={75}
                        height={75}
                    />
                    <p className='hidden md:block' >Coffee.log</p>
                </div>
            </Link>
            <div className={styles.pages}>
                <NavLinks />
            </div>
            {loading && <p>Loading...</p>}
            {user && (
                <div className={styles.profile} >
                    <Image
                        src={user.photoURL ?? '/profile.png'}
                        alt="profile"
                        width={50}
                        height={50}
                        className={styles.profileImage}
                    />
                    <p className={styles.profileName} >{user.displayName}</p>
                </div>
            )}
            {!user && (<AuthBox />)}
        </div>
    )
}

export default Header;