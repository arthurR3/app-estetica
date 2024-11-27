import { useUsuarioContext } from "@/components/context/userContext";
import CustomButton from "@/components/CustomButton";
import CarritoItem from "@/components/Productos/CarritoItem";
import { Productos } from "@/interfaces/products.interface";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function IndeX() {
    const {state} = useUsuarioContext()

    const [userToken, setUserToken] = useState(null)

    useEffect(() => {
        if(state.token){
            const decoded = jwtDecode(state.token) as { idUser: number, user: any }
            setUserToken(decoded.user) 
        }
    }, [state.token])

/*     const carrito = [
        { id: '1', nombre: 'Black Helmet V9', descripcion: 'Full Face - Hydrate', precio: 50, cantidad: 4, imagen: 'https://example.com/helmet.jpg' },
        { id: '2', nombre: 'Glow Gloves', descripcion: 'Limited Edition', precio: 20, cantidad: 5, imagen: 'https://example.com/gloves.jpg' },
        { id: '4', nombre: 'Black Helmet V9', descripcion: 'Full Face - Hydrate', precio: 50, cantidad: 4, imagen: 'https://example.com/helmet.jpg' },
        { id: '5', nombre: 'Glow Gloves', descripcion: 'Limited Edition', precio: 20, cantidad: 5, imagen: 'https://example.com/gloves.jpg' },
    ];


    const subTotal = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const descuento = subTotal * 0.1;
    const impuestos = subTotal * 0.15;
    const envio = 50;
    const total = subTotal - descuento + impuestos + envio;
 */
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Carrito</Text>
            {cart.length === 0 ? (
                <Text style={styles.empty}>Tu carrito está vacío</Text>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CarritoItem
                            id={item.id}
                            nombre={item.name}
                            descripcion={item.description}
                            precio={item.price * item.quantity}
                            cantidad={item.amount}
                            imagen={item.image}
                            onEliminar={() => (item.id)}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}
            {cart.length > 0 && (
                <View style={styles.footer}>
                    <CustomButton title="Limpiar" onPress={clearCart} disabled={false} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    empty: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
    },
    item: {
      flexDirection: 'row',
      marginBottom: 15,
      backgroundColor: '#f9f9f9',
      padding: 10,
      borderRadius: 8,
    },
    image: {
      width: 80,
      height: 80,
      marginRight: 10,
      borderRadius: 8,
    },
    info: {
      flex: 1,
      justifyContent: 'space-between',
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 16,
      color: '#333',
    },
    quantity: {
      fontSize: 14,
      color: '#666',
    },
    footer: {
      marginTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      paddingTop: 10,
    },
  })