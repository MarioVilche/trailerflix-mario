import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

/* Contexto de autenticación para toda la app.
Guarda el usuario en localStorage para que la sesión persista al recargar */
export const AuthProvider = ({ children }) => {
    /* Intento leer el usuario guardado en localStorage al crear el estado.
    Si algo falla (p. ej. JSON malformado) devuelvo null para que la app no se rompa */
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('currentUser');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error leyendo localStorage:", error);
            return null;
        }
    });

    /* Cada vez que cambia 'user' lo persisto en localStorage.
    Si user es null elimino la clave para no dejar datos obsoletos */
    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [user]);

    /* Función para iniciar sesión: guarda los datos del usuario en el estado.
    Aca se asume que la validación/obtención de userData se hizo antes */
    const login = (userData) => {
        setUser(userData);
    };

    // Cierra sesión: simplemente limpiamos el usuario del estado (y del localStorage via el useEffect)
    const logout = () => {
        setUser(null);
    };

    /* Objeto que compartimos a través del contexto.
    isAuthenticated es un atajo booleano para saber si hay un usuario */
    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
    };

    // Pasa el contexto a todos los componentes hijos
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};