import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div className="movie-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img src={`/posters/${movie.id}.jpg`} alt={movie.titulo} />
            <h3>{movie.titulo}</h3>
            <p>{movie.categoria}</p>
        </div>
    );
};

export default MovieCard;