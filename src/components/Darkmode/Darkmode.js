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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
                    <path d="M8 4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 1 0v-1A.5.5 0 0 0 8 4.5zM8 10.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5zm-4-3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0-.5.5zm8 0a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0-.5.5zM5.636 5.636a.5.5 0 0 0-.707.707l.707.707a.5.5 0 0 0 .707-.707l-.707-.707zm4.95 4.95a.5.5 0 0 0-.707.707l.707.707a.5.5 0 0 0 .707-.707l-.707-.707zM4.5 8a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 .5-.5zm8 0a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 .5-.5zM6.343 6.343a.5.5 0 0 0-.707-.707l-.707.707a.5.5 0 0 0 .707.707l.707-.707zm4.95 4.95a.5.5 0 0 0-.707-.707l-.707.707a.5.5 0 0 0 .707.707l.707-.707z"/>
                    <path d="M8 1a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3 3 3 0 0 1-3-3V4a3 3 0 0 1 3-3zM4 4a4 4 0 0 1 8 0v1a4 4 0 0 1-8 0V4z"/>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
                    <path d="M6 0a6 6 0 0 0-6 6c0 3.315 2.686 6 6 6a6.1 6.1 0 0 0 5.53-3.634 6.62 6.62 0 0 1-1.406.135c-3.315 0-6-2.686-6-6 0-.485.058-.956.16-1.406A6.1 6.1 0 0 0 6 0z"/>
                </svg>
            )}
        </button>
    );
}

export default DarkMode;
