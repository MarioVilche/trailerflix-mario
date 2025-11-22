import ButtonUp from '../components/ButtonUp';
import MovieCard from '../components/MovieCard';
import Filters from '../components/Filters';
import styles from '../styles/Home.module.css';
import useFilterSearch from '../hooks/useFilterSearch';

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
            const mg = Array.isArray(m.gen) ? m.gen : [m.gen];
            return mg.includes(genre);
        })
    }));

    return (
        <div>

            <ButtonUp />

            {/* pasa los handlers/estados al componente Filters para que solo renderice la UI */}
            <Filters
                allGenres={allGenres}
                allCategories={allCategories}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                activeFilters={activeFilters}
                toggleFilter={toggleFilter}
                clearFilters={clearFilters}
                totalResults={totalResults}
            />

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