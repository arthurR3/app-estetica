import { UsuarioProvider } from '@/components/context/userContext'
import { Slot, Stack } from 'expo-router'
import React from 'react'

export default function AuthScreen() {
    return (
        <Stack screenOptions={{headerShown:false}}/>
    )
}
