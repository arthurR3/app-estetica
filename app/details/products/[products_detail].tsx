import { Productos } from '@/interfaces/products.interface'
import ProductService from '@/services/productos.services'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'

export default function DetailsScreen() {
    const {products_detail} = useLocalSearchParams()
    const [detailProducts, setDetailProduct] = useState<Productos | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    
     useEffect(() =>{ 
        const fetchData = async () => {
            setLoading(true)
            if(products_detail){
                const response = await ProductService.getProductById(Number(products_detail))
                setDetailProduct(response)
                setLoading(false)
            }
        }
        fetchData()
    },[products_detail])

    
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    )
  }
  return (
    <ScrollView>
        <View>
            <Text>
            {products_detail}
            </Text>
        </View>
    </ScrollView>
  )
}
