// components/BanknoteForm.tsx
import React, { useState } from 'react';
import { Banknote } from '@/types'; // Asegúrate de que la ruta sea correcta

interface BanknoteFormProps {
    onSubmit: (data: BanknoteFormData) => void;
    initialData?: Banknote;
}

interface BanknoteFormData {
    country: string;
    denomination: number;
    issueDate: string;
    series?: string;
    description?: string;
}

const BanknoteForm: React.FC<BanknoteFormProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState<BanknoteFormData>({
        country: initialData?.country || '',
        denomination: initialData?.denomination || 0,
        issueDate: initialData?.issueDate || '',
        series: initialData?.series || '',
        description: initialData?.description || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="country">País:</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="denomination">Denominación:</label>
                <input
                    type="number"
                    id="denomination"
                    name="denomination"
                    value={formData.denomination}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="issueDate">Fecha de Emisión:</label>
                <input
                    type="date"
                    id="issueDate"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="series">Serie:</label>
                <input
                    type="text"
                    id="series"
                    name="series"
                    value={formData.series}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Guardar</button>
        </form>
    );
};

export default BanknoteForm;
