import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import {Drawer} from 'expo-router/drawer'
import * as SplashScreen from 'expo-splash-screen';
import NavBar from './navbar/nav';
import 'react-native-reanimated';
import { UsuarioProvider } from '@/components/context/userContext';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  DarkTheme.colors.background = '#fff0b4'
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <UsuarioProvider>
      <Stack>
        <Stack.Screen name='(drawer)' options={{header: ()=> <NavBar/>}}/>
        <Stack.Screen name='(auth)' options={{headerShown:false}}/>
      </Stack>
      </UsuarioProvider>
    </ThemeProvider>
  );
}
