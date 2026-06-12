import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Aplicación CRUD</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bienvenido</Text>
        <Text style={styles.subText}>Gestiona tus datos eficientemente</Text>

        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: '#1976D2' }]} 
            onPress={() => router.push('/screens/ListadoPersonasScreen')}
          >
            <Text style={styles.cardTitle}>Personas</Text>
            <Text style={styles.cardDesc}>Ver y gestionar personas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: '#388E3C' }]} 
            onPress={() => router.push('/screens/ListadoDepartamentos')}
          >
            <Text style={styles.cardTitle}>Departamentos</Text>
            <Text style={styles.cardDesc}>Gestionar unidades organizativas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 60,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    paddingHorizontal: 20,
    elevation: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  cardContainer: {
    width: '100%',
    gap: 15,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 4,
  },
});
