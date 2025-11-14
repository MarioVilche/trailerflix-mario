import MovieCard from '../components/MovieCard';
import useFilterSearch from '../hooks/useFilterSearch';

const Home = ({ initialMovies }) => {
    const {
        searchTerm,
        setSearchTerm,
        activeFilters,
        toggleFilter,
        clearFilters,
        filteredMovies,
        totalResults
    } = useFilterSearch(initialMovies);

    const allGenres = [...new Set(initialMovies.map(m => m.gen))];
    const allCategories = [...new Set(initialMovies.map(m => m.categoria))];

    return (
        <div style={{ padding: '20px' }}>
            <input
                type="text"
                placeholder="Buscar por título, género o reparto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px', margin: '10px 0' }}
            />

            <div style={{ margin: '10px 0' }}>

                <h4>Géneros:</h4>
                {allGenres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => toggleFilter('genero', genre)}
                        style={{
                            backgroundColor: activeFilters.genero.includes(genre) ? 'green' : 'gray',
                            color: 'white',
                            margin: '5px'
                        }}
                    >
                        {genre}
                    </button>
                ))}

                <h4>Categorías:</h4>
                {allCategories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => toggleFilter('categoria', cat)}
                        style={{
                            backgroundColor: activeFilters.categoria.includes(cat) ? 'blue' : 'gray',
                            color: 'white',
                            margin: '5px'
                        }}
                    >
                        {cat}
                    </button>
                ))}

                <button onClick={clearFilters} style={{ marginLeft: '20px', backgroundColor: 'red', color: 'white' }}>
                    Limpiar Filtros
                </button>
            </div>

            <h3>Se encontraron **{totalResults}** resultados</h3>

            <div className="movie-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {totalResults > 0 ? (
                    filteredMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>No se encontraron resultados que coincidan con la búsqueda/filtros.</p>
                )}
            </div>
        </div>
    );
};

export default Home;