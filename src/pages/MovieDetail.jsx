import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/MovieDetail.module.css';

const MovieDetail = ({ movies }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    /*Al montar este componente hacemos window.scrollTo(0,0) para asegurarnos de que
    la vista comience desde arriba (esto lo hice porque al entrar a los detalles el scrol aparecia al final de la página)*/
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [id]);

    // Se busca la película por id; si no existe se muestra un mensaje y un botón para volver.
    const movie = movies.find(m => String(m.id) === id);

    if (!movie) {
        return <div className={styles.moviePageContainer}>
            <button className={styles.backBtn} onClick={() => navigate('/')}>← Volver al catálogo</button>
            <div className={styles.movieDetails}>
                <p className={styles.error}>Película no encontrada</p>
            </div>
        </div>;
    }

    return (
        <div className={styles.moviePageContainer}>
            <button className={styles.backBtn} onClick={() => navigate('/')}>← Volver al catálogo</button>
            <div className={styles.movieDetails}>
                <div className={styles.moviePoster}>
                    <img src={movie.poster.replace(/^\.\//, '/')} alt={movie.titulo} />
                </div>
                <div className={styles.movieInfo}>
                    <h2>{movie.titulo}</h2>
                    <p><strong>Resumen:</strong>{movie.resumen}</p>
                    <iframe width="560" height="315" src={movie.trailer} frameBorder="0" allowFullScreen></iframe>
                    <p><strong>Reparto:</strong>{movie.reparto}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;