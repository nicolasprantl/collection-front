import React from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemText, Box, Toolbar, AppBar, CssBaseline } from '@mui/material';

const drawerWidth = 240; // El ancho del Drawer

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
            >
                {/* Aquí puedes colocar la barra de la aplicación si es necesario */}
                <Toolbar>
                    {/* Contenido del AppBar si es necesario */}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <Link href="/" passHref>
                            <ListItem button>
                                <ListItemText primary="Inicio" />
                            </ListItem>
                        </Link>
                        {/* Más elementos de la lista aquí si es necesario */}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}>
                <Toolbar /> {/* Añade esta línea para asegurarte de que el contenido no se oculte detrás del AppBar */}
                {/* Encabezado y contenido principal aquí */}
                <header>
                    <nav>
                        <h1>Colección de Billetes</h1>
                    </nav>
                </header>
                {children}
                {/* Pie de página aquí */}
                <footer>
                    <p>© 2023 Colección de Billetes</p>
                </footer>
            </Box>
        </Box>
    );
};

export default Layout;
