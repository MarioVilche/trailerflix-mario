import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        fetch('/data/usuarios.json')
            .then(res => res.json())
            .then(data => setUsuarios(data.users))
            .catch(err => console.error("Error al cargar usuarios:", err));
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        const userFound = usuarios.find(
            u => u.username === username && u.password === password
        );

        if (userFound) {
            const userData = {
                id: userFound.id,
                nombre: userFound.firstName,
                username: userFound.username,
                gender: userFound.gender
            };
            login(userData);
            navigate('/');
        } else {
            setError('Credenciales inválidas. Intente con el email y password de usuarios.json.');
        }
    };

    return (
        <div className={styles[`login-container`]}>
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;