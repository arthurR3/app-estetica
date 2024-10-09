import CustomButton from '@/components/CustomButton'
import InputLogin from '@/components/InputText'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function ForgettedScreen() {
    const [email, setEmail] = useState('')
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>¿Has olvidado tu contraseña?</Text>
                <Text style={styles.subtitle}>Actualizar contraseña.</Text>
                <View style={{marginTop:40}}>
                    <Text style={styles.inputText}>
                        CORREO ELECTRONICO
                    </Text>
                    <InputLogin placeholder='micorreo@gmail.com' image='mail' keyboardType='email-address' value={email} onChangeText={setEmail} />
                </View>
            </View>
            <CustomButton title='Recuperar contraseña' onPress={() =>{}}/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:10
    },
    title: {
        fontSize: 50,
        fontWeight: '600',
        textAlign: 'center',
    },
    inputText: {
        color: '#452E3F',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    subtitle: {
        color: 'gray',
        fontSize: 28,
        marginBottom: 30,
        textAlign:'center'
      },

})