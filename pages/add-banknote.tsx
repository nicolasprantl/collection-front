import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    CircularProgress,
    Snackbar,
} from '@mui/material';
import axios from 'axios';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
import countriesData from '@/countries.json'; // Importa el archivo JSON

const AddBanknotePage: React.FC = () => {
    const [banknote, setBanknote] = useState({
        issueDate: '',
        country: '',
        denomination: '',
        series: '',
        description: '',
    });
    const [frontImage, setFrontImage] = useState<File | null>(null);
    const [backImage, setBackImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<{ front: string; back: string }>({ front: '', back: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState('');
    const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBanknote((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setError('');
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        imageType: 'front' | 'back'
    ) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            imageType === 'front' ? setFrontImage(file) : setBackImage(file);
            handleImagePreview(file, imageType);
        }
    };

    const handleImagePreview = (file: File, imageType: 'front' | 'back') => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview((prev) => ({ ...prev, [imageType]: reader.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleCloseSnackbar = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason !== 'clickaway') {
            setOpenSnackbar(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('issueDate', banknote.issueDate);
        formData.append('country', banknote.country);
        formData.append('denomination', banknote.denomination);
        formData.append('series', banknote.series);
        formData.append('description', banknote.description);
        if (frontImage) formData.append('frontImage', frontImage);
        if (backImage) formData.append('backImage', backImage);

        try {
            const response = await axios.post('http://localhost:8080/api/banknotes/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSnackbarMessage('Banknote added successfully');
            setOpenSnackbar(true);
            setBanknote({
                issueDate: '',
                country: '',
                denomination: '',
                series: '',
                description: '',
            });
            setFrontImage(null);
            setBackImage(null);
            setImagePreview({ front: '', back: '' });
        } catch (error) {
            setSnackbarMessage('Error adding banknote');
            setOpenSnackbar(true);
            setError('An error occurred while adding the banknote.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        // Accede a los datos de los países desde el archivo JSON local
        const countries = countriesData.map((country: any) => country.name.common);
        setCountrySuggestions(countries);
    }, []);


    return (
        <Layout>
            <Container maxWidth="sm">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Agregar un nuevo billete
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Fecha de Emisión"
                            type="date"
                            name="issueDate"
                            value={banknote.issueDate}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="País"
                            name="country"
                            value={banknote.country}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            inputProps={{ list: "country-suggestions" }}
                        />
                        <datalist id="country-suggestions">
                            {countrySuggestions.map((suggestion, index) => (
                                <option key={index} value={suggestion} />
                            ))}
                        </datalist>
                        <TextField
                            label="Denominación"
                            name="denomination"
                            value={banknote.denomination}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            label="Serie"
                            name="series"
                            value={banknote.series}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Descripción"
                            name="description"
                            value={banknote.description}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="frontImage"></InputLabel>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<PhotoCamera />}
                                fullWidth
                            >
                                Imagen del Frente
                                <input
                                    id="frontImage"
                                    name="frontImage"
                                    type="file"
                                    hidden
                                    onChange={(e) => handleImageChange(e, 'front')}
                                />
                            </Button>
                            {imagePreview.front && (
                                <Box mt={2} mb={2}>
                                    <img src={imagePreview.front} alt="Vista previa del frente" style={{ maxWidth: '100%', height: 'auto' }} />
                                </Box>
                            )}
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="backImage"></InputLabel>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<PhotoCamera />}
                                fullWidth
                            >
                                Imagen del Dorso
                                <input
                                    id="backImage"
                                    name="backImage"
                                    type="file"
                                    hidden
                                    onChange={(e) => handleImageChange(e, 'back')}
                                />
                            </Button>
                            {imagePreview.back && (
                                <Box mt={2} mb={2}>
                                    <img src={imagePreview.back} alt="Vista previa del dorso" style={{ maxWidth: '100%', height: 'auto' }} />
                                </Box>
                            )}
                        </FormControl>
                        <Box mt={2} sx={{ position: 'relative' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                            >
                                {isSubmitting ? <CircularProgress size={24} /> : 'Guardar Billete'}
                            </Button>
                        </Box>
                    </form>
                </Box>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </Layout>
    );
};

export default AddBanknotePage;
