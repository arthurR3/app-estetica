import { Servicios } from '@/interfaces/services.interfaces'
import ServiciosService from '@/services/servicios.services'
import { Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import NavBar from '../navbar/nav'

export default function DetailsScreen() {
  const { service_detail } = useLocalSearchParams()
  const [detailService, setDetailService] = useState<Servicios | null>(null)
  const [loading, setLoading] = useState<boolean>(true)  // Estado para el loading

  useEffect(() => {
    if (service_detail) {
      setLoading(true)
      ServiciosService.getDetail(Number(service_detail))
        .then(setDetailService)
        .finally(() => setTimeout(() => { setLoading(false) }, 1500))
    }
  }, [service_detail])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    )
  }

  return (
      <View>
        {detailService ? (
          <Text>Detalle de los servicios: {detailService.name}</Text>
        ) : (
          <Text>No se encontró el servicio</Text>
        )}
      </View>
  )
}
