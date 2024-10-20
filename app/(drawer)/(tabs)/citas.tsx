import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, SectionList, SectionListComponent, StyleSheet, Text, TextInput, View } from 'react-native'
import { useUsuarioContext } from '@/components/context/userContext'
import InputLogin from '@/components/InputText'
import CustomButton from '@/components/CustomButton'
import DateTimePicker from '@react-native-community/datetimepicker'

const SECRET_KEY = 'C@mps2@24'
export default function CitasScreen() {
  const { state } = useUsuarioContext()
  const [userToken, setUserToken] = useState(null)
  const [name, setName] = useState<string>('')

  useEffect(() => {


  })

  if (state.token) {
    return (
      <View>
        <Text>Debes iniciar sesion para poder agendar</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 18 }}>
          <Text style={styles.titleContainer}>Reserva una cita ahora mismo!</Text>

          <InputLogin placeholder='Selecciona un servicio' image='cut-outline' value={name} onChange={() => setName} />
          <View>
            <DateTimePicker
            value={new Date()}
              mode="date"
              display="default"
              
            />
          </View>

          <InputLogin placeholder='selecciona una hora' image='time-outline' value={name} onChange={() => setName} />

          <CustomButton title='Agendar' onPress={() => { }} disabled={false} />
      </SafeAreaView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 36,
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 15,
    fontWeight: '800',
    textAlign: 'center'
  }
})