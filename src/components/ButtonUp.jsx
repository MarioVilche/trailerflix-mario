import React, { useEffect, useRef } from 'react'
import styles from '../styles/ButtonUp.module.css'

export default function ButtonUp() {

    // ref para el botón "ir al inicio" y manejo seguro de eventos
    const irAInicioRef = useRef(null);

    useEffect(() => {
        const buttonUp = irAInicioRef.current;
        const handleScroll = () => {
            const scroll1 = document.documentElement.scrollTop;
            if (!buttonUp) return;
            buttonUp.style.bottom = scroll1 > 200 ? '15px' : '-75px';
        };
        const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

        window.addEventListener('scroll', handleScroll);
        if (buttonUp) buttonUp.addEventListener('click', handleClick);

        // cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (buttonUp) buttonUp.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div ref={irAInicioRef} className={styles.irAInicio}>
            <img src='/icons/up-arrow.png'></img>
        </div>
    )
}
