import { Plat } from './plat';

export class Restaurant {
    id: number;
    nom: string;
    description: string;
    Latitude: number;
    Longitude: number;
    plats: Plat[];
    dailies: Plat[];
}
