import { useState, useMemo } from 'react';

const useFilterSearch = (initialMovies) => {
    // Término de búsqueda que escribe el usuario en el input
    const [searchTerm, setSearchTerm] = useState('');

    // Filtros activos: arrays con los géneros y categorías seleccionados
    const [activeFilters, setActiveFilters] = useState({
        genero: [],
        categoria: [],
    });

    /* Calcula la lista filtrada cuando cambia initialMovies, searchTerm o los filtros,
    Primero filtra por texto (movie.busqueda) y después aplica filtros de género y categoría */
    const filteredMovies = useMemo(() => {
        let results = initialMovies;

        // Normalizamos el término de búsqueda para comparar sin sensibilidad a mayúsculas/espacios
        const lowerSearchTerm = searchTerm.toLowerCase().trim();

        if (lowerSearchTerm) {
            // Si hay texto, filtramos por el campo 'busqueda' de cada película
            results = results.filter(movie =>
                movie.busqueda.toLowerCase().includes(lowerSearchTerm)
            );
        }

        const { genero, categoria } = activeFilters;

        if (genero.length > 0) {
            // Si hay géneros seleccionados, mantenemos las películas que tengan al menos uno de ellos
            results = results.filter(movie =>
                genero.some(g => movie.genero.includes(g))
            );
        }

        if (categoria.length > 0) {
            // Si hay categoría seleccionada, filtramos por igualdad en movie.categoria
            results = results.filter(movie =>
                categoria.includes(movie.categoria)
            );
        }

        return results;
    }, [initialMovies, searchTerm, activeFilters]);

    // Añade o quita un valor del filtro (toggle). 'type' es 'genero' o 'categoria'.
    const toggleFilter = (type, value) => {
        setActiveFilters(prevFilters => {
            const currentValues = prevFilters[type];
            if (currentValues.includes(value)) {
                // Si ya está seleccionado, lo quitamos
                return {
                    ...prevFilters,
                    [type]: currentValues.filter(v => v !== value),
                };
            } else {
                // Si no está, lo añadimos
                return {
                    ...prevFilters,
                    [type]: [...currentValues, value],
                };
            }
        });
    };

    // Limpia búsqueda y filtros — útil para el botón "Limpiar filtros"
    const clearFilters = () => {
        setSearchTerm('');
        setActiveFilters({ genero: [], categoria: [] });
    };

    // Devolvemos lo necesario para la UI: estado, acciones, lista filtrada y total actual
    return {
        searchTerm,
        setSearchTerm,
        activeFilters,
        toggleFilter,
        clearFilters,
        filteredMovies,
        totalResults: filteredMovies.length,
    };
};

export default useFilterSearch;