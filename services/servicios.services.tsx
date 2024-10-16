import { Servicios } from "@/interfaces/services.interfaces";
import axios from "axios";

class ServiciosService {
    private static baseUrl = `https://ffa4-201-97-72-168.ngrok-free.app/api/v1/services`;

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

    public static async getAllServices(): Promise<Servicios[]> {
        try {
            const response = await axios.get(this.baseUrl);
            const data:Servicios[] = response.data
            return data.filter(s => s.status === true); 
        } catch (error) {
            console.log('Error getting all products:', error);
            return [];
        }
    }

    public static async getDetail(id:number): Promise<Servicios|null> {
        try {
            const response = await axios.get(`${this.baseUrl}/${id}`)
            const data:Servicios = response.data;
            return data;
        } catch (error) {
            console.log('Error getting for id products', error);
            return null
        }
    }
}

export default ServiciosService;
