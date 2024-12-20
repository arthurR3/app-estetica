import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, View, Pressable, StyleProp, ViewStyle, ImageStyle, TextStyle, Alert } from 'react-native'

interface CardComponentProps {
  id: number,
  title: string,
  imageUrl: any,
  price?: number,
  descripcion?: string
  customStyles: {
    containerStyle: StyleProp<ViewStyle>,
    cardStyle: StyleProp<ViewStyle>,
    imageStyle: StyleProp<ImageStyle>,
    titleStyle: StyleProp<TextStyle>,
    descripcionStyle?: StyleProp<TextStyle>,
    priceStyle?: StyleProp<TextStyle>,
    textContainer?: StyleProp<ViewStyle>,
  }
}

const CardProducts: React.FC<CardComponentProps> = (props) => {
  return (
    <Link href={`/details/products/${props.id}`} asChild>
      <Pressable>
      <View style={props.customStyles.containerStyle} key={props.id}>
        <View style={props.customStyles.cardStyle}>
          <Image source={{ uri: props.imageUrl }} style={props.customStyles.imageStyle} />
          <View style={props.customStyles.textContainer}>
            <Text style={props.customStyles.titleStyle}>{props.title}</Text>
            {props.descripcion && <Text style={props.customStyles.descripcionStyle}>{props.descripcion}</Text>}
            {props.price && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={props.customStyles.priceStyle}>
                  ${(props.price).toFixed(2)}
                </Text>
                <Pressable style={{alignItems:'center'}} onPress={() => {Alert.alert('Hola')}}>
                  <Ionicons name='cart-outline' size={24} />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
      </Pressable>
    </Link>
  )
}
export default CardProducts;


