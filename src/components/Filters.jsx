import React from 'react'
import styles from '../styles/Filters.module.css'

// Renderiza los filtros de búsqueda y filtros de género/categoría
export default function Filters({ allGenres,
    allCategories,
    searchTerm,
    setSearchTerm,
    activeFilters,
    toggleFilter,
    clearFilters,
    totalResults }) {

    const resultsCountVisible = activeFilters.genero.length > 0 || activeFilters.categoria.length > 0 || searchTerm.trim().length > 0;

    return (
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
                            {allGenres.map(gen => (
                                <button className={`${styles.filterBtn} ${activeFilters.genero.includes(gen) ? styles.active : ''}`}
                                    key={gen}
                                    onClick={() => toggleFilter('genero', gen)}>
                                    {gen}
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
    )
}

