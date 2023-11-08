// components/BanknoteCard.tsx
import React from 'react';
import styles from '@/styles/Banknote.module.css';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Banknote {
    id: number;
    issueDate: string;
    country: string;
    denomination: number;
    series?: string;
    description?: string;
    frontImageUrl: string;
    backImageUrl: string;
}

interface BanknoteCardProps {
    banknote: Banknote;
}

const BanknoteCard: React.FC<BanknoteCardProps> = ({ banknote }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={banknote.frontImageUrl}
                alt={`Front of ${banknote.country} banknote`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {banknote.country} - {banknote.denomination}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Fecha de Emisión: {banknote.issueDate}
                    <br />
                    Serie: {banknote.series}
                    <br />
                    Descripción: {banknote.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BanknoteCard;
