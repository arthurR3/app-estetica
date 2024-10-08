import { useUsuarioContext, UsuarioContext } from '@/components/context/userContext';
import CustomButton from '@/components/CustomButton';
import InputLogin from '@/components/InputText';
import useValidation from '@/hooks/validation/useValidation';
import axios from 'axios';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';

const URLBASE = 'https://2d4d-201-97-90-89.ngrok-free.app/api/v1';

export default function LoginScreen() {
  const { state, dispatch } = useUsuarioContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const { emailError, passwordError, validationEmail, validationPassword } = useValidation();

  const handleSubmit = async () => {
    const isEmailValid = validationEmail(email);
    const isPasswordValid = validationPassword(password);

    if (isEmailValid && isPasswordValid) {
      setLoading(true); // Iniciar el loading

      try {
        const response = await axios.post(`${URLBASE}/users/login`, {
          email: email,
          password: password,
        });

        if (response.data.success) {
          dispatch({ type: 'login', payload: response.data.data });
          router.replace('/(tabs)/');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
              Alert.alert('Incorrecto', 'Credenciales incorrectas');
            } else {
              Alert.alert('Error', 'Ocurrió un error inesperado.');
            }
          }
        } else {
          Alert.alert('Error', 'No se puede conectar al servidor.');
        }
      } finally {
        setLoading(false); // Detener el loading
      }
    }
  };

  const toogleAccount = () => {
    router.navigate('/(auth)/account');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.welcome}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar.</Text>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.inputText}>CORREO ELECTRONICO</Text>
          <InputLogin
            placeholder='example@example.com'
            image='mail'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
            bolError={!!emailError}
            strError={emailError}
          />
          <Text style={styles.inputText}>CONTRASEÑA</Text>
          <InputLogin
            placeholder='********'
            image='lock-closed'
            secureText={secureText}
            bolGone={true}
            onPressIcon={() => setSecureText(!secureText)}
            value={password}
            onChangeText={setPassword}
            bolError={!!passwordError}
            strError={passwordError}
          />
        </View>

        {/* Mostrar el indicador de carga si loading es verdadero */}
        {loading ? (
          <ActivityIndicator size="large" color="#452e3f" style={styles.loading} />
        ) : (
          <CustomButton title='Iniciar Sesión' onPress={handleSubmit} disabled={loading} />
        )}

        <Link style={{ margin: 15, fontSize: 20, alignSelf: 'center' }} href={'/(auth)/forgetted'}>Recuperar contraseña</Link>
        <CustomButton title='Crear cuenta' onPress={toogleAccount}  disabled={false} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 60,
    color: '#452e3f',
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    color: 'gray',
    fontSize: 28,
  },
  inputText: {
    color: '#452E3F',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  loading: {
    marginVertical: 20,
  },
});
