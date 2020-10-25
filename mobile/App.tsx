import React from 'react';

import { useFonts } from 'expo-font';
import { 
  Nunito_600SemiBold, 
  Nunito_700Bold, 
  Nunito_800ExtraBold 
} from '@expo-google-fonts/nunito';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  // Se as fontes ainda não estão carregadas
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Routes />
  );
}
