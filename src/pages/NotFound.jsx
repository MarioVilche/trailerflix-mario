import React from 'react'
import styles from './NotFound.module.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.errorCode}>404</h1>
            <div className={styles.filmIcon}>🎬</div>
            <h2 className={styles.errorMessage}>Página no encontrada</h2>
            <p className={styles.errorDescription}>
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
                Puede que el contenido haya sido eliminado o la URL sea incorrecta.
            </p>
            <Link to="/" className={styles.backHomeBtn}>VOLVER AL INICIO</Link>
        </div>
    )
}