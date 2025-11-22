import { useNavigate } from 'react-router-dom';
import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    // Al hacer click en la tarjeta navegamos a /movie/:id
    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        // El div entero es clickeable para mejorar la experiencia en móviles/desktop.
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.cardPicture}>
                {/* Imagen tomada desde la carpeta /posters usando el id de la película */}
                <img src={movie.poster.replace(/^\.\//, '/')} alt={movie.titulo} />
            </div>
            <div className={styles.cardBottom}>
                <h3 className={styles.cardBottomTitle}>{movie.titulo}</h3>
                <p className={styles['white-text']}>{movie.categoria}</p>
            </div>
        </div>
    );
};

export default MovieCard;