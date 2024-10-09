import { Productos } from "@/interfaces/products.interface";
import axios from "axios";

class ProductService {
    private static baseUrl = 'https://7a05-189-240-192-130.ngrok-free.app/api/v1/products';

    public static async getProductsForCarousel(): Promise<Productos[]> {
        try {
            const response = await axios.get(this.baseUrl);
            const data:Productos[] = response.data;
            return data.filter(p => p.status ===true).slice(0,10);
        } catch (error) {
            console.log('Error getting products for carousel:', error);
            return [];
        }
    }

    public static async getAllProducts(): Promise<Productos[]> {
        try {
            const response = await axios.get(this.baseUrl);
            const data:Productos[] = response.data
            return data.filter(p => p.status ===true);
        } catch (error) {
            console.log('Error getting all products:', error);
            return [];
        }
    }
}

export default ProductService;
