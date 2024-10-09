import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/app/(drawer)/(tabs)';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Configura el Stack
function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppStack