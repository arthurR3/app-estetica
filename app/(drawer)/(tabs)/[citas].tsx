import React, { useEffect, useState } from 'react'
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useUsuarioContext } from '@/components/context/userContext'
import InputLogin from '@/components/InputText'
import CustomButton from '@/components/CustomButton'
import CustomDatePicker from '@/components/DatePicker'
import ServiciosService from '@/services/servicios.services'
import { Exceptions, Schedule, Servicios } from '@/interfaces/services.interfaces'
import { parseDuration } from '@/components/Servicios/Horario/format_utilsTime'
import { router, useLocalSearchParams } from 'expo-router'
import { adjustDateForApi, fetcBookedSlots, generateTimes } from '@/components/Servicios/Horario/serviciosTime'
import { Picker } from '@react-native-picker/picker'
import { jwtDecode, JwtDecodeOptions, JwtPayload } from 'jwt-decode'
import { DecodeToken, UserData } from '@/interfaces/auth.interfaces'
import axios from 'axios'
import DatesService from '@/services/dates.services'
import { ActivityIndicator } from '@react-native-material/core'

export default function CitasScreen() {
  const { state } = useUsuarioContext();
  const [userToken, setUserToken] = useState<UserData | null>(null);
  const { citas } = useLocalSearchParams();
  const [serviceObject, setServiceObject] = useState<Servicios>();
  const [selectedTime, setSelectedTime] = useState<null>(null);
  const [services, setServices] = useState<Servicios[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectDate, setSelectDate] = useState<Date | null>(null);
  const [workSchedule, setWorkSchedule] = useState<Schedule[]>([]);
  const [exceptions, setExceptions] = useState<Exceptions[]>([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [workDay, setWorkDay] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  /* useEffect(() => {
    if (state.token) {

      const decoded = jwtDecode<DecodeToken>(state.token)
      setUserToken(decoded.user)
    }
  }, [state.token]) */

  useEffect(() => {
    const fetchData = async () => {
      // Verificar si hay un token de usuario antes de hacer la llamada a la API
      if (!state.token) return;

      try {

        // Obtenemos todos los servicios de la empresa
        const allServices: Servicios[] = await ServiciosService.getAllServices();
        setServices(allServices);

        // Obtenemos el servicio seleccionado de la lista de servicios, solo si se pasa el id
        if (citas) {
          const response = allServices.find(service => service.id === Number(citas));
          setServiceObject(response)
          if (response) {
            setSelectedService(response.id);
          }
        }

        // Obtenemos los días laborales de la empresa
        const schedule: Schedule[] = await ServiciosService.getWorkedSchedule();
        setWorkSchedule(schedule);

        // Obtenemos los días laborales con excepciones de la empresa
        setExceptions(await ServiciosService.getWorkedExceptions());

        // Obtenemos los días hábiles de trabajo
        setWorkDay(schedule.map((day: Schedule) => day.dia_semana));
      } catch (error) {
        console.log('Error getting work day', error);
      }
    };

    fetchData();
  }, [citas, state.token]);

  useEffect(() => {
    if (selectDate) {
      try {
        fetcBookedSlots(selectDate.toISOString(), setBookedSlots)
      } catch (error) {
        console.log('Error al obtener los horarios Reservados F-E', error)
      }
    }
  }, [selectDate])


  const isWorkDay = (date: Date) => {
    const dayOfWeek = date.getDay()
    return workDay.includes(dayOfWeek);
  }

  const calculateDuration = () => {
    if (selectedService !== null) {
      const selected = services.find(servicio => servicio.id === Number(selectedService));
      if (selected) {
        return parseDuration(selected.duration);
      }
    }
    return 0;
  }
  const handleDateChange = (date: Date) => {
    setSelectDate(date);
  };

  const handleSubmit = async () => {

    if (!userToken?.email || !selectedTime || !selectDate || !serviceObject) {
      // Muestra un mensaje de advertencia si algún campo está vacío
      alert("Por favor completa todos los campos antes de agendar la cita.");
      return;
    }

    const email = userToken.email;
    const dateFormatted = adjustDateForApi(selectDate.toDateString())
    const data = {
      customer: { email },
      data: { time: selectedTime, date: dateFormatted, service: [serviceObject] },
      total: serviceObject?.price
    }
    //console.log(data.data.date)
    const response = await DatesService.sendDate(data)
    if (response.success) {
      setSelectedTime(null);
      setSelectDate(null);
      setSelectedService(null);

      Alert.alert('Cita agendada con exito!');
      router.replace('/');
    } else {
      Alert.alert('Error al agendar la cita, intente nuevamente.')
    }
  };
  if (!state.token) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Ups! Parece que no has iniciado sesión</Text>
        <Text style={styles.message}>
          Inicia sesión para poder agendar una cita y acceder a los horarios disponibles.
        </Text>
        <View>
          <CustomButton title='Iniciar Sesión' onPress={() => { router.navigate('/(auth)/login') }} disabled={false} />
        </View>
      </View>
    )
  }

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 18 }}>
        <Text style={styles.titleContainer}>Reserva una cita ahora mismo!</Text>
        <Text>Selecciona un servicio</Text>
        <InputLogin placeholder='Selecciona un servicio' image='cut-outline'>
          <Picker selectedValue={selectedService}
            onValueChange={(value) => { setSelectedService(value), setServiceObject(services.find(service => service.id === Number(value))) }}

          >
            <Picker.Item label='Selecciona un servicio' value={null} />
            {services.map((service) => (
              <Picker.Item key={service.id} label={service.name} value={service.id} />
            ))}
          </Picker>
        </InputLogin>
        <Text>Selecciona una hora</Text>
        <View>
          <CustomDatePicker onDateChange={handleDateChange} display='spinner' minimumDate={new Date(Date.now())} filterDate={isWorkDay} />
        </View>
        {selectDate && (

          <InputLogin placeholder='Selecciona una hora' image='time'>
            <Picker selectedValue={selectedTime}
              onValueChange={(value) => { setSelectedTime(value) }}
            >
              <Picker.Item label='Selecciona un horario' value={null} />
              {generateTimes(calculateDuration, bookedSlots, workSchedule, exceptions, selectDate).map((time, index) => (
                <Picker.Item key={index} label={time} value={time} />
              ))}
            </Picker>
          </InputLogin>
        )}
        {loading ? (
          <ActivityIndicator  color='#452e3f' style={styles.loading} />
        ) : (
          <CustomButton title='Agendar' onPress={handleSubmit} disabled={loading} />
        )}
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
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "#075985",
    color: 'white',
    paddingHorizontal: 20,
    margin: 6,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 26,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    marginVertical: 20,
  },
});