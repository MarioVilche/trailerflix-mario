import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';
import styles from './Header.module.css';


const Header = ({ hideNav }) => {
    const { user, logout, isAuthenticated } = useAuth();

    // Mensaje de bienvenida según el género del usuario (si está disponible)
    let message;

    if (user?.gender === 'female') {
        message = 'Bienvenida, ';
    } else {
        message = 'Bienvenido, ';
    }


    return (
        <header>
            {/* Logo: siempre visible */}
            <Link to="/" className={styles.logoLink}>
                <h1 className={styles.logo}>TRAILERFLIX</h1>
            </Link>

            {/* Si hideNav es true no renderizo la navegación (ni el login), solo el logo */}
            {!hideNav && (
                <nav className={styles.nav}>
                    {isAuthenticated ? (
                        // Usuario autenticado: se muestra el nombre y el botón para cerrar sesión
                        <div className={styles.userInfo}>
                            <span className={styles.userNameDisplay}>{message + user.nombre}</span>
                            <button className={styles.logoutBtn} onClick={logout}>Cerrar Sesión</button>
                        </div>
                    ) : (
                        // No autenticado: se muestra el componente de Login dentro del nav
                        <Login />
                    )}
                </nav>
            )}
        </header>
    );
};

export default Header;