import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Header from './components/Header';



export default function App() {

  // Estados para las películas, estado de carga y posibles errores
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Cargo el JSON de películas al montar el componente
  // Uso try/catch para controlar errores y finalmente dejo de mostrar el loader
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/data/trailerflix.json');
        if (!response.ok) {
          throw new Error('No se pudieron cargar los datos de películas.');
        }
        const data = await response.json();
        setMovies(data); // guardo las películas en el estado
      } catch (err) {
        setError(err.message); // guardo el mensaje de error para mostrarlo
      } finally {
        setIsLoading(false); // dejo de mostrar el estado de carga
      }
    };
    fetchMovies();
  }, []);

  // Mensajes mientras carga o si hay algún error
  if (isLoading) {
    return <h1>Cargando catálogo... ⏳</h1>;
  }

  if (error) {
    return <h1>Error al cargar: {error} ❌</h1>;
  }

  // Ocultar solo el <nav> en la página 404
  const isNotFound = location.pathname !== '/' && location.pathname !== '/login' && !location.pathname.startsWith('/movie/');

  return (
    <>
      {/* Paso hideNav al Header: el logo sigue visible, solo se oculta la navegación */}
      <Header hideNav={isNotFound} />
      <Routes>
        {/* Rutas principales: Home recibe las películas cargadas */}
        <Route path="/" element={<Home initialMovies={movies} />} />
        <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
        <Route path="/login" element={<Login />} />
        {/* Ruta comodín para 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}