import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';
import styles from './Header.module.css';

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
        <header>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1 className={styles.logo}>TRAILERFLIX</h1>
            </Link>

            <nav className={styles.nav}>
                {isAuthenticated ? (
                    <div className={styles.userInfo}>
                        <span className={styles.userNameDisplay}>{message + user.nombre}</span>
                        <button className={styles.logoutBtn} onClick={logout}>Cerrar Sesión</button>
                    </div>
                ) : (
                    <Login />
                )}
            </nav>
        </header>
    );
};

export default Header;