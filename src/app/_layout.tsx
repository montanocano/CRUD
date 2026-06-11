import 'reflect-metadata';
import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="screens/WelcomeScreen" />
      <Stack.Screen name="screens/ListadoPersonasScreen" />
      <Stack.Screen name="screens/EditarInsertarPersonaScreen" />
      <Stack.Screen name="screens/ListadoDepartamentos" />
    </Stack>
  );
}
