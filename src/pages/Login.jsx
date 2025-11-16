import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

/* Componente de Login:
- Formulario simple para usuario y contraseña.
- Carga los usuarios desde /data/usuarios.json y compara credenciales.
- Si las credenciales coinciden llama a login() del contexto y redirige al home.
- Si ya estás autenticado te redirige automáticamente a '/' */
const Login = () => {
    // Estados del formulario y lista de usuarios
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    // Si ya estás logueado, te mando al inicio (evita ver el formulario estando autenticado)
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Cargo la lista de usuarios desde el JSON local cuando se monta el componente
    useEffect(() => {
        fetch('/data/usuarios.json')
            .then(res => res.json())
            .then(data => setUsuarios(data.users))
            .catch(err => console.error("Error al cargar usuarios:", err));
    }, []);

    // Maneja el submit del formulario: valida contraseñas y usuarios cargados y hace login
    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        const userFound = usuarios.find(
            u => u.username === username && u.password === password
        );

        if (userFound) {
            // Prepara el objeto de usuario tal como lo espera el contexto
            const userData = {
                id: userFound.id,
                nombre: userFound.firstName,
                username: userFound.username,
                gender: userFound.gender
            };
            login(userData); // guardo el usuario en el contexto (y en localStorage via AuthProvider)
            navigate('/'); // voy al inicio
        } else {
            // Muestro un error si no coinciden las credenciales
            setError('Credenciales inválidas. Intente con el email y password de usuarios.json.');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.logoutBtn} type="submit">Ingresar</button>
            </form>
            {/* Muestro el mensaje de error si existe */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;