import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useUsuarioContext } from '@/components/context/userContext';
import { Alert } from 'react-native';

const CustomDrawerContent = (props:any) => {
    const { state, dispatch } = useUsuarioContext()

    const handleSubmit = () => {
        try {
           dispatch({type:'logout'})
    
          router.replace('/')
          Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
        } catch (error) {
          Alert.alert('Error', 'Hubo un error al intentar cerrar sesión');
        }
      }
    
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem icon={({ color, size }) => (<Feather name='shopping-bag' size={25} color={color} />
            )}
                label={'Productos'}
                labelStyle={{ fontSize: 22 }}
                onPress={() => { router.push('/(drawer)/(tabs)/productos') }}
            />
            <DrawerItem icon={({ color, size }) => (<Feather name='scissors' size={25} color={color} />
            )}
                label={'Servicios'}
                labelStyle={{ fontSize: 22 }}
                onPress={() => { router.push('/(drawer)/(tabs)/servicios') }}
            />
            <DrawerItem icon={({ color, size }) => (<Feather name='calendar' size={25} color={color} />
            )}
                label={'Agendar Citas'}
                labelStyle={{ fontSize: 22 }}
                onPress={() => { router.push('/(drawer)/(tabs)/citas') }}
            />
            {state.token ? (
                <>

                    <DrawerItem
                        icon={({ color, size }) => (<Feather name='user' size={25} color={color} />)}
                        label={'Mi Perfil'}
                        labelStyle={{ fontSize: 22 }}
                        onPress={() => { router.push('/(drawer)/') }} 
                    />
                    <DrawerItem
                        icon={({ color, size }) => (<Feather name='log-out' size={25} color={color} />)}
                        label={'Cerrar Sesión'}
                        labelStyle={{ fontSize: 22 }}
                        onPress={handleSubmit} 
                    />
                </>
            ) : (
                <DrawerItem
                    icon={({ color, size }) => (<Feather name='log-in' size={25} color={color} />)}
                    label={'Iniciar Sesión'}
                    labelStyle={{ fontSize: 22 }}
                    onPress={() => { router.navigate('/(auth)/login') }} 
                />
            )}
        </DrawerContentScrollView>
    )
}
export default function DrawerLayout() {
    return (
        <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: '#4f3047' } }} />
    );
}
