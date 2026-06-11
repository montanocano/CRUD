import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import PersonasViewModel from '../ui/viewmodels/PersonasViewModel';
import DepartamentosViewModel from '../ui/viewmodels/DepartamentosViewModel';

export default function Index() {
  const router = useRouter();
  const personasVM = PersonasViewModel.getInstance();
  const departamentosVM = DepartamentosViewModel.getInstance();

  useEffect(() => {
    async function initializeApp() {
      try {
        // Parallel load of initial data
        await Promise.all([
          personasVM.loadPersonas(),
          departamentosVM.loadDepartamentos()
        ]);
        // Navigate to welcome screen
        router.replace('/screens/WelcomeScreen');
      } catch (e) {
        console.error('Initialization failed', e);
      }
    }
    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1976D2" />
      <Text style={styles.loadingText}>Initializing App...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
