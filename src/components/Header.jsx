import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

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
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>Trailerflix</h1>
            </Link>

            <nav>
                {isAuthenticated ? (
                    <div className="login-container">
                        <span style={{ marginRight: '15px' }}>{message + user.nombre}</span>
                        <button onClick={logout}>Cerrar Sesión</button>
                    </div>
                ) : (
                    <Login />
                )}
            </nav>
        </header>
    );
};

export default Header;