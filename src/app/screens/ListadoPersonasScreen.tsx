import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'expo-router';
import PersonasViewModel from '../../ui/viewmodels/PersonasViewModel';
import { PersonaUIModel } from '../../ui/models/PersonaUIModel';
import PersonaListItem from '../../components/PersonaListItem';

const personasVM = PersonasViewModel.getInstance();

const ListadoPersonasScreen: React.FC = observer(() => {
  const router = useRouter();

  useEffect(() => {
    personasVM.loadPersonas();
  }, []);

  const handleAddPersona = () => {
    personasVM.selectPersona(null);
    router.push('/screens/EditarInsertarPersonaScreen');
  };

  const handleEditPersona = (p: PersonaUIModel) => {
    personasVM.selectPersona(p);
    router.push('/screens/EditarInsertarPersonaScreen');
  };

  const handleDeletePersona = async (id: number) => {
    // In React Native, we should use Alert.alert, but for web compatibility 'confirm' is fine
    if (!confirm('¿Eliminar persona?')) return;
    try {
      await personasVM.deletePersona(id);
    } catch (e: any) {
      alert(e.message || 'Error al eliminar');
    }
  };

  if (personasVM.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  if (personasVM.error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {personasVM.error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => personasVM.loadPersonas()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>&larr;</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personas ({personasVM.personas.length})</Text>
      </View>
      
      <FlatList
        data={personasVM.personas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PersonaListItem 
            persona={item} 
            onPress={() => handleEditPersona(item)} 
            onDelete={() => handleDeletePersona(item.id)} 
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddPersona}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: 60,
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  backButton: {
    color: '#fff',
    fontSize: 24,
  },
  listContent: {
    paddingBottom: 80,
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 10,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#1976D2',
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabIcon: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default ListadoPersonasScreen;
