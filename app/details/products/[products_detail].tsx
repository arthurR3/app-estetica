import { Productos } from '@/interfaces/products.interface'
import ProductService from '@/services/productos.services'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View, Button, Image, StyleSheet } from 'react-native'

export default function DetailsScreen() {
  const { products_detail } = useLocalSearchParams()
  const [detailProduct, setDetailProduct] = useState<Productos | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [cart, setCart] = useState<Productos[]>([]) // To store cart items

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (products_detail) {
        const response = await ProductService.getProductById(Number(products_detail))
        setDetailProduct(response)
        setLoading(false)
      }
    }
    fetchData()
  }, [products_detail])

  const addToCart = () => {
    if (detailProduct) {
      setCart((prevCart) => [...prevCart, detailProduct]) // Adds the selected product to the cart
      alert('Producto agregado al carrito')
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {detailProduct && (
        <View style={styles.productContainer}>
          <Image source={{ uri: detailProduct.image }} style={styles.image} />
          <Text style={styles.title}>{detailProduct.name}</Text>
          <Text style={styles.description}>{detailProduct.description}</Text>
          <Text style={styles.price}>${detailProduct.price}</Text>
          
          <Button title="Agregar al carrito" onPress={addToCart} />
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  productContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
})
