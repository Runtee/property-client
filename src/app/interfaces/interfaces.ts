export interface propertyInterface {
    id: string;
    title: string;
    price?: number;
    category?: string;
    description?: string;
    address?: string;
    location?: string;
    city?: string;
    state?: string;
    image?: string;
    video?: string;
    status?: string;
    c_of_o?: boolean;
    doxxed?: boolean;
    kyc?: boolean;
    name?: boolean;
    email?: boolean;
    number?: boolean;
    clonable?:boolean;
    searched?:boolean;
    is_locked?:boolean;
    survey?:boolean;
    user_id?:string;
    lock_timestamp?:number;
}

export interface propertyCategoryInterface {
    "Real Estate": string;
    "Land": string;
    "Rent": string;
}

export interface notificationInterface {
    'id'?: string;
    "message"?: string;
    "category"?: string;
    "user"?: string;
    "read"?: string;
}


export interface supportInterface {
    "email": string;
    "subject": string;
    "message": string;
}
