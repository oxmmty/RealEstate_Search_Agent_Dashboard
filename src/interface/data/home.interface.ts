export interface RealEstateItem {
    _id?: string;
    image_url: string;
    address: string;
    price: number;
    beds: number;
    baths: number;
    space: string;
    damage_tags: string[];
    saletype_tags: string[];
    description: string;
    link: string;
    recommendation: string;
    createdAt: Date;
}

export interface DataRequest {
    cities: string[],
    damage_tags: string[],
    saletype_tags: string[],
    page: number
}
