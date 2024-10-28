import { TimeSlot } from "@/components/Servicios/Horario/format_utilsTime";
import { Schedule, Servicios } from "@/interfaces/services.interfaces";
import axios from "axios";

class ServiciosService { 
    private static baseUrl = `http://localhost:5000/api/v1/services`;
    private static basicUrl = 'http://localhost:5000/api/v1';
    public static async getWorkedSchedule(){
        try {
            const response = await axios.get(`${this.basicUrl}/horarioGnral`)
            return response.data;
        } catch (error) {
            console.log('Error getting schedule worked', error);
        }
    }

    public static async getWorkedExceptions(): Promise<Schedule[]> {
        try {
            const response = await axios.get(`${this.basicUrl}/horarioEXP`);
            const data:Schedule[] = response.data;
            return data;
        } catch (error) {
            console.log('Error getting schedule horarioEXP', error);
            return [];
        }
    }

    public static async getBookedSlots(selectDate: Date){
        try {
            const response = await axios.post(`${this.basicUrl}/dates/counts/times`,{selectDate});
            return response.data.slots;
        } catch (error) {
            console.log('Error getting times-date', error)
            return [];
        }
    }
 
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
