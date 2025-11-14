import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Header from './components/Header';



export default function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/data/trailerflix.json');
        if (!response.ok) {
          throw new Error('No se pudieron cargar los datos de películas.');
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (isLoading) {
    return <h1>Cargando catálogo... ⏳</h1>;
  }

  if (error) {
    return <h1>Error al cargar: {error} ❌</h1>;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home initialMovies={movies} />} />
        <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}