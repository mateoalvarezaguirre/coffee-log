'use client';

import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '@/app/store/store';
import { useAuth } from '@/app/context/AuthContext';

const GoogleAuth: React.FC = () => {

    const {loginWithGoogle, loading, auth } = useAuth();

    const { error } = useAppSelector((state: RootState) => state.auth);

    const dispatch = useAppDispatch();

    const handleGoogleLogin = async () => {
        loginWithGoogle();
    };

    useEffect(() => {
        if (auth) {
            dispatch({ type: 'auth/loginSuccess', payload: auth });
        }
    }, [auth, dispatch])
    

    return (
        <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md bg-foreground">
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-foreground bg-background border border-transparent rounded-md group hover:bg-foreground hover:text-background hover:border hover:border-background focus:outline-none focus:ring-none focus:ring-background transition-all ease duration-300"
                    onClick={handleGoogleLogin} disabled={loading}
                >
                    {!error &&
                        (<svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.9 0 6.6 1.6 8.1 2.9l6-6C34.6 2.9 29.9 1 24 1 14.7 1 7.1 6.9 4.3 15.1l7.1 5.5C13.4 14.1 18.1 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-2.7-.3-4H24v8.1h12.7c-.5 2.7-2.1 5-4.4 6.5l7.1 5.5c4.1-3.8 6.1-9.4 6.1-16.1z" />
                            <path fill="#FBBC05" d="M10.4 28.6c-1-2.7-1-5.6 0-8.3l-7.1-5.5C1.1 18.1 0 21 0 24s1.1 5.9 3.3 8.2l7.1-5.6z" />
                            <path fill="#34A853" d="M24 47c5.9 0 10.8-1.9 14.4-5.2l-7.1-5.5c-2 1.4-4.5 2.3-7.3 2.3-5.9 0-10.9-4-12.7-9.4l-7.1 5.5C7.1 41.1 14.7 47 24 47z" />
                            <path fill="none" d="M0 0h48v48H0z" />
                        </svg>)}
                    {!error &&(loading ? 'Ingresando con tu cuenta de Google...' : 'Ingresa con tu cuenta de Google')}

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </button>
            </div>
        </div>
    );
};

export default GoogleAuth;