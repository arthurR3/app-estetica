import { useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import InputLogin from "./InputText";

interface DatePickerProps {
    onDateChange: (date: string) => void
    display: 'inline' | 'spinner',
    minimumDate?: Date;
}

const CustomDatePicker = ({ onDateChange, minimumDate}: DatePickerProps) => {
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState<string>('');
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }

    const onChange = (event: any, selectedDate?: Date) => {
        if (event.type === 'set' && selectedDate) {
          const currentDate = selectedDate;
          setDate(currentDate);
          const formatted = currentDate.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          });
          setFormattedDate(formatted);
          onDateChange(formatted); // Propaga el cambio al componente padre
    
          if (Platform.OS === 'android') {
            toggleDatePicker();
          }
        } else {
          toggleDatePicker();
        }
      };
    
      const confirmiOSDate = () => {
        const formatted = date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        setFormattedDate(formatted);
        onDateChange(formatted); // Propaga el cambio
        toggleDatePicker();
      };
    
    return(
        <View>
          {!showPicker && (
            <Pressable onPress={toggleDatePicker}>
              <InputLogin 
                placeholder='Selecciona una fecha' 
                image='calendar'
                value={formattedDate} 
                editable={false} 
                onPressIn={toggleDatePicker}
              />
            </Pressable>
          )}

          {/* Mostrar DateTimePicker en un modal */}
          {showPicker && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={showPicker}
              onRequestClose={toggleDatePicker}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <DateTimePicker
                    mode='date'
                    display={Platform.OS === 'ios' ? 'inline' : 'spinner'} 
                    value={date}
                    onChange={onChange}
                    minimumDate={minimumDate}
                  />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                <Pressable style={[styles.button,{backgroundColor:'white'}]} onPress={toggleDatePicker}>
                  <Text style={{fontSize:24, color:'black'}}>Cancel</Text>
                </Pressable>
                <Pressable style={[styles.button]} onPress={confirmiOSDate}>
                  <Text style={{fontSize:24, color:'white', fontWeight:500}}>Seleccionar</Text>
                </Pressable>
              </View>
              </View>
             
            </Modal>
          )}
        </View>
    )
}
export default CustomDatePicker
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