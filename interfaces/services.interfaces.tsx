export interface Servicios{
    id: number;
    name : string;
    id_categoria: number;
    description:string;
    price: number;
    duration: number
    image: string;
    status:boolean;
    categoria: Categoria;
}

export interface Categoria{
    name: string;
}