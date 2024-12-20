import { DataRequest } from "@/interfaces/dates.interfaces"
import axios from "axios"

interface ApiResponse {
    success: boolean;
    message?: string; // Este campo es opcional y solo aparece en caso de error
  }

class DatesService {
    private static baseUrl = 'https://back-estetica-production-e475.up.railway.app/api/v1/dates'

    public static async sendDate(data:DataRequest): Promise<ApiResponse>{
        try {
            const response = await axios.post(`${this.baseUrl}/create-sinpay`, data)
            if (response.data.success) {
                return { success: true };
              } else {
                return { success: false, message: 'Error al guardar los datos.' };
              }

        } catch (error) {
            console.log('Error getting all products:', error);
            return {success:false, message: 'Error al enviar los datos.' };
        }
    }
}

export default DatesService;