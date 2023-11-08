// pages/index.tsx
import React, { useEffect, useState } from 'react';
import BanknoteCard from '../components/BanknoteCard';
import { Banknote } from "@/types";
import Layout from "@/components/layout";
import Grid from "@mui/material/Grid";
import TablePagination from '@mui/material/TablePagination';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {getBanknotes} from "@/utils/api";
const IndexPage: React.FC = () => {
    const [banknotes, setBanknotes] = useState<Banknote[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page
    };

    useEffect(() => {
        const fetchBanknotes = async () => {
            try {
                const data = await getBanknotes();
                console.log(data); // Log the data received from the API
                setBanknotes(data);
            } catch (error) {
                console.error("Error fetching banknotes:", error);
            }
        };
        fetchBanknotes();
    }, [page]);

    const dataToShow = banknotes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const handleAddBanknote = () => {
        // Aquí puedes implementar la lógica para agregar un nuevo billete
        // Por ejemplo, abrir un modal de formulario o redirigir a una página de creación de billete
        console.log('Agregar nuevo billete');
    };
    return (
        <Layout>
            <Container maxWidth="lg">
                <Box my={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link href="/add-banknote" passHref>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                        >
                            Agregar Billete
                        </Button>
                    </Link>
                </Box>
                <Box my={4}>
                    <Grid container spacing={2}>
                        {dataToShow.map((banknote) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={banknote.id}>
                                {/* Envuelve BanknoteCard con Link */}
                                <Link href={`/banknotes/${banknote.id}`} passHref>
                                    <BanknoteCard banknote={banknote} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box my={2} display="flex" justifyContent="center">
                    <TablePagination
                        component="div"
                        count={banknotes.length} // Total count of items
                        page={page} // Current page index
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        // Add custom styles if needed
                    />
                </Box>
            </Container>
        </Layout>
    );
};

export default IndexPage;