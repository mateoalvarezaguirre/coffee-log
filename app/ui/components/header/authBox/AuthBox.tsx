import React, { useState } from 'react';
import styles from './AuthBox.module.css';
import GoogleAuth from '../../auth/GoogleAuth';

const AuthBox: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`relative ${styles.authBox}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.login}
            >
                Sign In
            </button>
            <div
                className={`absolute top-0 right-0 z-10 mt-12 w-[300px] rounded-md shadow-lg transition transform ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDuration: '200ms' }}
            >
                <div className="py-1">
                    <GoogleAuth />
                </div>
            </div>
        </div>
    );
};

export default AuthBox;
