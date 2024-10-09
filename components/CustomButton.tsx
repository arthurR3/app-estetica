import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import React from 'react'
import { GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface CustomButtonProps {
    title: string,
    onPress: (event: GestureResponderEvent) => void;
    backgroundColor?: string
    imageSource?:any;
    iconName?: string
}

const CustomButton: React.FC<CustomButtonProps> =({title, onPress, backgroundColor='#632e3d', imageSource, iconName}) =>{
    return (
        <<TouchableOpacity> style={[style.button, {backgroundColor}]} onPress={onPress}>
            <View style={style.content}>
                {imageSource && <Image source={imageSource} style={style.image}/>}
                <Text style={style.text}>{title}</Text>
                {iconName && <Icon name='calendar-week' size={36}style={{marginLeft:30}} color={'white'}/>}
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton

const style = StyleSheet.create({
    button:{
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems:'center',
        justifyContent: 'center',
        shadowColor:'#000',
        elevation:3,
        shadowOffset:{width:0, height:2},
        shadowOpacity:0.2,
        shadowRadius:5,
    },
    content:{
        flexDirection:'row',
        alignItems:'center'
    },
    text:{
        padding:3,
        fontSize:28,
        color:'white',
        textAlign:'center',
        fontWeight:'600'
    },
    image:{
        width:24,
        height:24,
        marginHorizontal:8
    }
})