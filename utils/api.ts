// utils/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBanknotes = async () => {
    const response = await fetch(`http://localhost:8080/api/banknotes/`);
    const data = await response.json();
    return data;
};

export const getBanknote = async (id: any) => {
    const response = await fetch(`http://localhost:8080/api/banknotes/${id}`);
    const data = await response.json();
    return data;
};


// Add more API utilities as needed...
