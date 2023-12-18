export interface propertyInterface {
    id?: string;
    title?: string;
    price?: number;
    category?: string;
    description?: string;
    address?: string;
    city?: string;
    state?: string;
    image?: string;
    video?: string;
    status?: string;
    c_of_o?: boolean;
    doxxed?: boolean;
    kyc?: boolean;
}

export interface propertyCategoryInterface {
    "Real Estate": string;
    "Land": string;
    "Rent": string;
}