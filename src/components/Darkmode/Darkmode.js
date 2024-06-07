import React, { useState, useEffect } from 'react';
import './Darkmode.css';

function DarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
        const body = document.body;
        body.classList.toggle('dark-mode', isDarkMode);
        body.classList.add('no-transition'); // Adicionando a classe para evitar transição
        // Removendo a classe após um pequeno intervalo para garantir que a transição inicial ocorra
        setTimeout(() => {
            body.classList.remove('no-transition');
        }, 100);
    }, []);

    useEffect(() => {
        const handleRouteChange = () => {
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            setDarkMode(isDarkMode);
            const body = document.body;
            body.classList.toggle('dark-mode', isDarkMode);
        };

        // Listen for changes in the URL
        window.addEventListener('popstate', handleRouteChange);

        return () => {
            // Cleanup
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
        const body = document.body;
        body.classList.toggle('dark-mode', newDarkMode);
    };

    return (
        <button 
            className="btn btn-light btn-darkinho position-fixed bottom-0 end-0 m-3 rounded-circle" 
            onClick={toggleDarkMode}
        >
            {darkMode ? (
                <i class="bi bi-moon-stars-fill"></i>
            ) : (
                <i className="bi bi-sun-fill"></i>
            )}
        </button>
    );
}

export default DarkMode;
