import React from 'react'
import styles from './NotFound.module.css'

export default function NotFound() {
    return (
        <div className={styles.errorContainer}>
            <h1 >Página no encontrada</h1>
            <h2 className={styles.errorCode}>404</h2>
        </div>
    )
}
