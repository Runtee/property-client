export interface propertyInterface {
    id?: string;
    title: string;
    price?: number;
    category?: string;
    description?: string;
    address?: string;
    location?: string;
    city?: string;
    state?: string;
    image?: string | Blob;
    video_file?: string | Blob;
    status?: string;
    c_of_o?: boolean;
    doxxed?: boolean;
    is_trending?: boolean;
    kyc?: boolean;
    name?: string;
    email?: string;
    number?: string;
    clonable?: boolean;
    searched?: boolean;
    is_locked?: boolean;
    survey?: boolean;
    user_id?: string;
    lock_timestamp?: number;
    clone_type?: string;
    cloning_percentage?:number
    allowed_emails?: string;
    account_number?: string;
    bank_name?: string;
    account_name?: string;
    cloner_account_number?: string;
    cloner_bank_name?: string;
    cloner_account_name?: string;
    marked_done_by_buyer?: boolean;
    marked_done_by_seller?: boolean;
    specific_cloners?: string[];
    is_deleted?: boolean;
    property_media?: property_media[];
    [key: string]: any
}
interface property_media{
    media_type?: string
    media_file?:string
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
    'id'?: string;
    "email": string;
    "subject": string;
    "message": string;
}

export interface userInterface {
    email: string;
    email_verified: string;
    name: string
    nickname: string
    picture: string
    sub: string
    updated_at: Date
}
/*
*/