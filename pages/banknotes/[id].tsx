import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getBanknote } from "@/utils/api"; // Importa la función de utilidad

const BanknoteDetailsPage: React.FC = () => {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [banknoteDetails, setBanknoteDetails] = useState({
        id: 0,
        issueDate: '',
        country: '',
        denomination: 0,
        series: '',
        description: '',
        frontImageUrl: '',
        backImageUrl: '',
    });

    useEffect(() => {
        const { id } = router.query;

        if (id) {
            // Realiza una solicitud para obtener los detalles del billete
            getBanknote(id).then((data) => {
                setBanknoteDetails(data);
            });
        }
    }, [router.query]);

    return (
        <Layout>
            <Container maxWidth="md">
                <Box my={4}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {banknoteDetails.country} - {banknoteDetails.denomination}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Serie: {banknoteDetails.series}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Fecha de Emisión: {banknoteDetails.issueDate}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            {banknoteDetails.description}
                        </Typography>
                        <Grid container spacing={2} sx={{ my: 2, justifyContent: 'center' }}>
                            <Grid item xs={12} sm={6}>
                                <Image
                                    src={banknoteDetails.frontImageUrl}
                                    alt={`Front of ${banknoteDetails.country} banknote`}
                                    width={400}
                                    height={200}
                                    layout="responsive"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Image
                                    src={banknoteDetails.backImageUrl}
                                    alt={`Back of ${banknoteDetails.country} banknote`}
                                    width={400}
                                    height={200}
                                    layout="responsive"
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </Layout>
    );
};

export default BanknoteDetailsPage;
