import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
    const date = new Date().getFullYear();

    return (
        <div className={styles.container}>
            <div className={styles.blogName}>
                Coffee.log
            </div>
            <div className={styles.rights}>
                <p>© {date} Coffee.log. All rights reserved.</p>
                <p>Made by <a href='https://github.com/mateoalvarezaguirre' target='_blank'>mateoalvarez</a></p>
            </div>
        </div>
    )
}

export default Footer