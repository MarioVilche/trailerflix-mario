import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout, isAuthenticated } = useAuth();

    let message;

    if (user?.gender === 'female') {
        message = 'Bienvenida, ';
    } else {
        message = 'Bienvenido, ';
    }

    console.log(user);

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>Trailerflix</h1>
            </Link>

            <nav>
                {isAuthenticated ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '15px' }}>{message + user.nombre}</span>
                        <button onClick={logout}>Cerrar Sesión</button>
                    </div>
                ) : (
                    <Link to="/login">
                        <button>Iniciar Sesión</button>
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;