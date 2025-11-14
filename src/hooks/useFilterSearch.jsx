import { useState, useMemo } from 'react';

const useFilterSearch = (initialMovies) => {
    const [searchTerm, setSearchTerm] = useState('');

    const [activeFilters, setActiveFilters] = useState({
        genero: [],
        categoria: [],
    });

    const filteredMovies = useMemo(() => {
        let results = initialMovies;

        const lowerSearchTerm = searchTerm.toLowerCase().trim();

        if (lowerSearchTerm) {
            results = results.filter(movie =>
                movie.busqueda.toLowerCase().includes(lowerSearchTerm)
            );
        }

        const { genero, categoria } = activeFilters;

        if (genero.length > 0) {
            results = results.filter(movie =>
                genero.some(g => movie.genero.includes(g))
            );
        }

        if (categoria.length > 0) {
            results = results.filter(movie =>
                categoria.includes(movie.categoria)
            );
        }

        return results;
    }, [initialMovies, searchTerm, activeFilters]);

    const toggleFilter = (type, value) => {
        setActiveFilters(prevFilters => {
            const currentValues = prevFilters[type];
            if (currentValues.includes(value)) {
                return {
                    ...prevFilters,
                    [type]: currentValues.filter(v => v !== value),
                };
            } else {
                return {
                    ...prevFilters,
                    [type]: [...currentValues, value],
                };
            }
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setActiveFilters({ genero: [], categoria: [] });
    };

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