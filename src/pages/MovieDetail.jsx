import { useParams, useNavigate } from 'react-router-dom';

const MovieDetail = ({ movies }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const movie = movies.find(m => String(m.id) === id);

    if (!movie) {
        return <h1>Película no encontrada</h1>;
    }

    return (
        <div className="movie-detail">
            <button onClick={() => navigate('/')}>← Volver al catálogo</button>
            <div class="movie-poster">
                <img src={`/posters/${movie.id}.jpg`} alt={movie.titulo} />
            </div>
            <div class="movie-info">
                <h2>{movie.titulo}</h2>
                <p><strong>Resumen:</strong>{movie.resumen}</p>
                <iframe width="560" height="315" src={movie.trailer} frameborder="0" allowfullscreen></iframe>
                <p><strong>Reparto:</strong>{movie.reparto}</p>
            </div>
        </div>
    );
};

export default MovieDetail;