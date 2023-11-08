import { createTheme } from '@mui/material/styles';

// Puedes importar fuentes de Google Fonts o cualquier otra fuente personalizada aquí
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
            light: '#758fff', // Color más claro de la paleta primaria
            dark: '#0044b2',  // Color más oscuro de la paleta primaria
            contrastText: '#ffffff', // Texto que contrasta con el color primario
        },
        secondary: {
            main: '#19857b',
            // Puedes definir más tonos para el color secundario si es necesario
        },
        error: {
            main: '#ff3d00',
        },
        warning: {
            main: '#ffa726',
        },
        info: {
            main: '#29b6f6',
        },
        success: {
            main: '#66bb6a',
        },
        background: {
            default: '#f4f6f8', // Un color de fondo claro para la aplicación
            paper: '#ffffff', // Fondo para componentes que se consideran papel
        },
        text: {
            primary: '#2e3c45', // Color principal de texto
            secondary: '#546e7a', // Color secundario de texto
            disabled: '#8e99a4', // Texto deshabilitado o de menor importancia
        },
    },
    typography: {
        fontFamily: [
            'Arial',
            'Roboto',
            '"Helvetica Neue"',
            'sans-serif',
        ].join(','), // Define una pila de fuentes
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        // Puedes definir estilos para h2, h3, ..., body1, body2, etc.
    },
    components: {
        // Personalización de botones
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Elimina el texto en mayúsculas
                    borderRadius: 8, // Bordes redondeados
                    // Agrega más estilos si es necesario
                },
            },
        },
        // Personalización de tarjetas
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Sombra suave para las tarjetas
                    borderRadius: 12, // Bordes más redondeados para las tarjetas
                },
            },
        },
        // Personalizaciones adicionales...
    },
});

export default theme;
