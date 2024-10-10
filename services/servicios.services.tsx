import { Servicios } from "@/interfaces/services.interfaces";
import axios from "axios";

class ServiciosService {
    private static baseUrl = 'https://2d4d-201-97-90-89.ngrok-free.app/api/v1/services';

    public static async getServiciosCarousel(): Promise<Servicios[]> {
        try {
            const response = await axios.get(this.baseUrl);
            const data:Servicios[] = response.data
            return data.filter(s=> s.status === true).slice(0,10);
        } catch (error) {
            console.log('Error getting products for carousel:', error);
            return [];
        }
    }

    public static async getAllProducts(): Promise<Servicios[]> {
        try {
            const response = await axios.get(this.baseUrl);
            const data:Servicios[] = response.data
            return data.filter(s => s.status === true); 
        } catch (error) {
            console.log('Error getting all products:', error);
            return [];
        }
    }
}

export default ServiciosService;
