import React from 'react'
import { Image, Text, View, TouchableOpacity, StyleSheet, Pressable } from 'react-native'

interface CardComponentProps {
  id: number,
  title: string,
  imageUrl: any,
  price?: number,
  descripcion? : string
  onPress: () => void,

}

const CardProducts: React.FC<CardComponentProps> = (props) => {
  return (
    <View style={styles.container} key={props.id}>
      <Pressable style={styles.card} onPress={()=>props.onPress}>
        <Image source={{uri: props.imageUrl}} style={styles.image} />
        <Text style={styles.title}>{props.title}</Text>
        {props.price && <Text style={styles.price}>Precio: ${props.price}</Text>}
        {props.descripcion && <Text style={styles.price}>{props.descripcion}</Text>}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 160,
    width: 150,
    marginBottom:15,
    backgroundColor:'transparent',
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
    shadowRadius: 10,
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

export default CardProducts;


