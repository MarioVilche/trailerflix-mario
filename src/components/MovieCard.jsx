import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div className={styles.card} onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className={styles['card-picture']}>
                <img src={`/posters/${movie.id}.jpg`} alt={movie.titulo} />
            </div>
            <div className={styles['card-bottom']}>
                <h3 className={styles['card-bottom-title']}>{movie.titulo}</h3>
                <p className={styles['white-text']}>Categoría: {movie.categoria}</p>
            </div>
        </div>
    );
};

export default MovieCard;