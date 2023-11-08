// types.ts
export interface Banknote {
    id: number;
    issueDate: string;
    country: string;
    denomination: number;
    series?: string;
    description?: string;
    frontImageUrl: string;
    backImageUrl: string;
}
