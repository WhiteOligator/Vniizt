import styles from './Header.module.css'
import React, { memo } from 'react'

const Header = () => {

    return (
        <React.Fragment>
            <div className={styles.head}>
                <h2 className={styles.text}>
                    Тестовое задание ВНИИЖТ
                </h2>
            </div>
        </React.Fragment>
    );
}

export default memo(Header)