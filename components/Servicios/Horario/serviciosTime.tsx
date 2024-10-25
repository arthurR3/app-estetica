import { Schedule } from "@/interfaces/services.interfaces"
import { formatTime, isTimeSlotAvailable, parseTime, TimeSlot } from "./format_utilsTime"
import ServiciosService from "@/services/servicios.services";

interface Exceptions{
    id: number;
    id_administrador: number;
    dia_semana : number;
    hora_desde: string;
    hora_hasta: string;

}
export const fetcBookedSlots = async (selectedDate: Date, setBookedSlots:any) => {
  if(selectedDate){
    try {
      const response = await ServiciosService.getBookedSlots(selectedDate);
      const slots = response.map((slots:any )=> {
        const [start, end] = slots.Horario.split(' - ');
        return {
          start: start.trim(),
          end: end.trim(),
        }
      });
      setBookedSlots(slots);
    } catch (error) {
      console.log('Error al obtener horarios reservados', error);
    }
  }

}

export const generTimes = (calculateDuration:() => number, bookedSlots:TimeSlot[], workSchedule:Schedule[], exceptions:Exceptions[], selectedDate:Date) => {
    const totalDuration = calculateDuration();
    const dayOfWeek = selectedDate.getDay();
    const currentDate = new Date();
    const isToday = selectedDate.toDateString() === currentDate.toDateString();

    // Se verifica si la fecha no esta en la lista de exceptiones
    const isExceptions = exceptions.some(exception =>{
        const exceptionDate = new Date(exception.dia_semana)
        return exceptionDate.toDateString() === selectedDate.toDateString();
    })
    if(isExceptions){
        return [];
    }

       // Encuentra el horario laboral del día seleccionado
       const daySchedule = workSchedule.find(schedule => {
        return schedule.dia_semana === dayOfWeek;
    });   
  
    if (!daySchedule) {
      //console.log('No hay horario laboral para este día.');
      return [];
    }
  
    const times: string[] = [];

    // Itera sobre cada intervalo de trabajo del día
    daySchedule.intervalos.forEach(interval => {
        let timeInicial = parseTime(interval.hora_desde); // Convierte "hora_desde" a minutos
        const endOfDay = parseTime(interval.hora_hasta);  // Convierte "hora_hasta" a minutos
  
        let currentTime = isToday ? Math.max(parseTime(currentDate.toTimeString().split(' ')[0]), timeInicial) : timeInicial;
          
          // Redondea hacia la próxima hora completa si es el día actual
          if (isToday) {
              const nextFullHour = Math.ceil(currentTime / 60) * 60; // Redondea al siguiente múltiplo de 60 (próxima hora)
              currentTime = Math.max(currentTime, nextFullHour); // Asegura que comienza a la siguiente hora completa
          }
        //console.log(currentTime)
        //console.log('Intervalo inicial:', formatTime(timeInicial), 'Intervalo final:', formatTime(endOfDay));
    
        // Genera los intervalos de tiempo dentro de cada intervalo de trabajo
        while (currentTime + totalDuration <= endOfDay) {
          const timeFinal = currentTime + totalDuration;
    
          // Verifica si el slot está disponible
          if (isTimeSlotAvailable(currentTime, timeFinal, bookedSlots)) {
            times.push(`${formatTime(currentTime)} - ${formatTime(timeFinal)}`);
          }
    
          currentTime = timeFinal; 
        }
      });

      return times;
}