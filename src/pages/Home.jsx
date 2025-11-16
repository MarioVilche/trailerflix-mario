import MovieCard from '../components/MovieCard';
import useFilterSearch from '../hooks/useFilterSearch';
import styles from './Home.module.css';

// Página principal: controla búsqueda y filtros y organiza la salida por secciones de género

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

    // Obtiene todos los géneros únicos y los ordena alfabéticamente
    const allGenres = [
        ...new Set(
            initialMovies.flatMap(m => Array.isArray(m.gen) ? m.gen : [m.gen])
        )
    ].sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

    const allCategories = [...new Set(initialMovies.map(m => m.categoria))];

    const resultsCountVisible = activeFilters.genero.length > 0 || activeFilters.categoria.length > 0 || searchTerm.trim().length > 0;

    // Géneros que aparecen en los resultados filtrados
    const genresFromResults = allGenres.filter(g =>
        filteredMovies.some(m => {
            const mg = Array.isArray(m.gen) ? m.gen : [m.gen];
            return mg.includes(g);
        })
    );

    // Si hay géneros seleccionados muestra solo esas secciones, si no muestra todas las de los resultados
    const genresToShow = activeFilters.genero.length > 0
        ? activeFilters.genero.filter(g => genresFromResults.includes(g))
        : genresFromResults;


    // Lista de secciones con su array de películas para renderizar
    const moviesByGenre = genresToShow.map(genre => ({
        genre,
        movies: filteredMovies.filter(m => {
            const mg = Array.isArray(m.gene) ? m.gen : [m.gen];
            return mg.includes(genre);
        })
    }));

    return (
        <div>
            <div className={styles.searchFiltersSection}>
                <div className={styles.searchContainer}>
                    <input className={styles.searchInput}
                        type="text"
                        placeholder="Buscar por título, género o reparto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <span className={styles.searchIcon}>🔍</span>
                </div>

                <div className={styles.filtersContainer}>

                    <div>
                        <div className={styles.filterGroup}>
                            <div>
                                <h4 className={styles.filterLabel}>Géneros:</h4>
                            </div>
                            <div className={styles.filterBtnDirection}>
                                {allGenres.map(genre => (
                                    <button className={`${styles.filterBtn} ${activeFilters.genero.includes(genre) ? styles.active : ''}`}
                                        key={genre}
                                        onClick={() => toggleFilter('genero', genre)}>
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.filterGroup}>
                            <div>
                                <h4 className={styles.filterLabel}>Categorías:</h4>
                            </div>
                            <div className={styles.filterBtnDirection}>
                                {allCategories.map(cat => (
                                    <button className={`${styles.filterBtn} ${activeFilters.categoria.includes(cat) ? styles.active : ''}`}
                                        key={cat}
                                        onClick={() => toggleFilter('categoria', cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}

                                <button className={styles.clearBtn} onClick={clearFilters}>
                                    Limpiar Filtros
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className={`${styles.resultsCount} ${resultsCountVisible ? styles.resultsCountVisible : ''}`}>Se encontraron **{totalResults}** resultados</h3>

            </div>

            <div className={styles.container}>
                {moviesByGenre.length > 0 ? (
                    moviesByGenre.map(section => (
                        <div key={section.genre}>
                            <h2 className={styles.genero}>{section.genre}</h2>
                            <div className={styles.movieContainer}>
                                {section.movies.map(movie => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.movieContainer}>
                        {totalResults > 0 ? (
                            filteredMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))
                        ) : (
                            <p>No se encontraron resultados que coincidan con la búsqueda/filtros.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;