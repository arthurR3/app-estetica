import React from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'
import { AppBar, IconButton, Avatar, } from "@react-native-material/core";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation, DrawerActions } from '@react-navigation/native';
const NavBar = () => {
    const colorScheme = useColorScheme()
     const backgroundColor ='#452e3f'; 
     const navigation = useNavigation()
  //const iconColor = colorScheme === 'dark' ? '#452e3f' : '#000000'; 
    return (
        <AppBar

            style={[styles.container,{backgroundColor}]}
            leading={props => (
                <IconButton icon={props => <Icon name='menu' {...props}/>}
                    {...props}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
            )}
            trailing={props => (
                <View style={styles.trailingContainer}>
                    <IconButton icon={<Icon name='bell-ring-outline' {...props}/>} />
                    <Avatar image={require('@/assets/images/logo_estetica.png')} style={styles.AvatarIcon}/>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 60,
        height: 130,
        alignItems:'center',
    },
    trailingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize:60,
      },
      AvatarIcon:{
        marginLeft:8,
        backgroundColor:'transparent',
      }
})

export default NavBar