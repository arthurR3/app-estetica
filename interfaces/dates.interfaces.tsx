import { Servicios } from "./services.interfaces";

export interface DataRequest {
    customer:{
        email:string;
    },
    data:{
        time: string;
        date:string;
        service: Servicios[];
    }
    total: number;
}