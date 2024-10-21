import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Modal, Platform, Pressable, SafeAreaView, ScrollView, SectionList, SectionListComponent, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useUsuarioContext } from '@/components/context/userContext'
import InputLogin from '@/components/InputText'
import CustomButton from '@/components/CustomButton'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import CustomDatePicker from '@/components/DatePicker'

export default function CitasScreen() {
  const { state } = useUsuarioContext();
  const [userToken, setUserToken] = useState(null);
  const [name, setName] = useState<string>('');
  const [selectDate, setSelectDate] = useState('');

  const handleDateChange = (date: string) => {
    setSelectDate(date); 
  };
  
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
       
        <InputLogin placeholder='Selecciona un servicio' image='cut-outline' value={name} onChange={() => setName}  />
        <View>
          <CustomDatePicker onDateChange={handleDateChange} display='spinner' minimumDate={new Date(Date.now())}/>
        </View>

        <InputLogin placeholder='Selecciona una hora' image='time' value={name} onChange={() => setName} />

        <CustomButton title='Agendar' onPress={() => {}} disabled={false} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 36,
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 50,
    fontSize: 14,
    fontWeight: '500',
    borderRadius: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button:{
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    marginTop:10,
    marginBottom:5,
    backgroundColor:"#075985",
    color:'white',
    paddingHorizontal:20,
    margin:6
  },
});