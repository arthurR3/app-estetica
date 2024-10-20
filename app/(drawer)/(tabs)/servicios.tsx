import CardServicios from '@/components/Servicios/CardServicios'
import { Servicios } from '@/interfaces/services.interfaces'
import ServiciosService from '@/services/servicios.services'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function ServiciosScreen() {
  const [servicios, setServicios] = useState<Servicios[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await ServiciosService.getAllServices();
      setServicios(response)
    }
    fetchData()
  }, []);
  const renderItem = ({ item }: { item: any }) =>
    <CardServicios
      key={item.id}
      id={item.id}
      title={item.name}
      imageUrl={item.image}
      descripcion={item.description}
      customStyles={{
        containerStyle: styles.container,
        cardStyle: styles.card,
        imageStyle: styles.image,
        titleStyle: styles.title,
        descripcionStyle: styles.descripcion,
        priceStyle: styles.price,
        textContainer: styles.textContainer
      }} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.titleService}>Servicios de la estética:</Text>
      <View>
        <FlatList data={servicios} renderItem={renderItem} keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleService: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: '#452e3f',
    fontWeight: '600'
  },
  container: {
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  descripcion: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});


