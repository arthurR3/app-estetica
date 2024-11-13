import { Productos } from '@/interfaces/products.interface'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import CardProducts from '../Productos/CardProducts';
import Carousel from 'react-native-reanimated-carousel';
import { Servicios } from '@/interfaces/services.interfaces';
import CardServicios from '../Servicios/CardServicios';
import { router } from 'expo-router';

interface CardCarouselItem {
  products: Productos[];
  onClick: (id: number) => void;
}

const CarouselItem: React.FC<CardCarouselItem> = ({ products, onClick }) => {

  const baseOptions = {
    parallaxScrollingOffset: 220,
    parallaxScrollingScale: 1,
    parallaxAdjacentItemScale: 1,
}
  const screenWidth = Dimensions.get('window').width;
  return (
    <Carousel
      loop
      width={screenWidth}
      height={screenWidth/2}
      autoPlay={true}
      scrollAnimationDuration={1000}
      modeConfig={baseOptions}
      mode='parallax'
      data={products}
      renderItem={({ item }) => (
        <CardProducts
        key={item.id}
          id={item.id}
          title={item.name}
          imageUrl={item.image}
          customStyles={{
            containerStyle: styles.container,
            cardStyle: styles.card,
            imageStyle: styles.image,
            titleStyle: styles.title,
          }} 
        />
      )}
    />
  )
}

export interface CardCarouselService {
  servicios: Servicios[],
}

const CarouselServicesItem: React.FC<CardCarouselService> = ({ servicios }) => {

  const baseOptions = {
    parallaxScrollingOffset: 220,
    parallaxScrollingScale: 1,
    parallaxAdjacentItemScale: 1,
}
  const screenWidth = Dimensions.get('window').width;
  return (
    <Carousel
      loop
      width={screenWidth}
      height={screenWidth/2}
      autoPlay={true}
      scrollAnimationDuration={1000}
      modeConfig={baseOptions}
      mode='parallax'
      data={servicios}
      renderItem={({ item }) => (
        <CardServicios
        key={item.id}
          id={item.id}
          title={item.name}
          imageUrl={item.image}
          customStyles={{
            containerStyle: styles.container,
            cardStyle: styles.card,
            imageStyle: styles.image,
            titleStyle: styles.title,
          }} 
        />
      )}
    />
  )
}

export  {CarouselItem, CarouselServicesItem}


const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 160,
    width: 150,
    marginBottom:15,
    backgroundColor:'transparent'
},
  card: {
    backgroundColor: '#fff',
    margin:'auto',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '80%',
    height: 100,
    borderRadius: 10,
    aspectRatio:1
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});