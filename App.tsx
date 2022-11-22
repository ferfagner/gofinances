import 'react-native-gesture-handler'
import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components'
import AppLoading from 'expo-app-loading';

import { AuthProvaider, useAuth } from './src/hooks/auth'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'

import {Routes} from './src/routes/index'


export default function App() {
  const {userLoading} = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded || userLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        <AuthProvaider >
          <Routes />
        </AuthProvaider>
    </ThemeProvider>
  );
}
