import React from 'react';
import { AppProps } from 'next/app'; // Importa el tipo AppProps
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import '@/app/globals.css'; // Asegúrate de importar tus estilos globales

// MyApp ahora está tipado correctamente con AppProps
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            {/* Component y pageProps ahora están correctamente tipados */}
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default MyApp;
