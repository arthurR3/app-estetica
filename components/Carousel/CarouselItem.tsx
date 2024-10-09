import { Productos } from '@/interfaces/products.interface'
import React from 'react'
import { Dimensions } from 'react-native'
import CardProducts from '../Productos/CardProducts';
import Carousel from 'react-native-reanimated-carousel';
import { Servicios } from '@/interfaces/services.interfaces';
import CardServicios from '../Servicios/CardServicios';

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
          onPress={() => onClick(item.id)}
        />
      )}
    />
  )
}

export interface CardCarouselService {
  servicios: Servicios[],
  onClick: (id: number) => void;
}

const CarouselServicesItem: React.FC<CardCarouselService> = ({ servicios, onClick }) => {

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
          onPress={() => onClick(item.id)}
        />
      )}
    />
  )
}

export  {CarouselItem, CarouselServicesItem}



{/* <Carousel
    ref={isCarousel}
      data={products}
      renderItem={({ item }) => (
        <CardProducts
        key={item.id}
          id={item.id}
          title={item.name}
          imageUrl={item.image}
          onPress={() => onClick(item.id)}
        />
      )}
      
      layout="tinder"
      layoutCardOffset={9}
      sliderWidth={screenWidth}
      itemWidth={screenWidth/3}
      inactiveSlideShift={0}
      useScrollView={true}
    /> */}
