import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'expo-router';
import DepartamentosViewModel from '../../ui/viewmodels/DepartamentosViewModel';
import DepartamentoListItem from '../../components/DepartamentoListItem';

const departamentosVM = DepartamentosViewModel.getInstance();

const ListadoDepartamentos: React.FC = observer(() => {
  const router = useRouter();

  useEffect(() => {
    departamentosVM.loadDepartamentos();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar departamento?')) return;
    try {
      await departamentosVM.deleteDepartamento(id);
    } catch (e: any) {
      alert(e.message || 'Error deleting');
    }
  };

  if (departamentosVM.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  if (departamentosVM.error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {departamentosVM.error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => departamentosVM.loadDepartamentos()}>
          <Text style={styles.retryText}>Retry</Text>
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
        <Text style={styles.headerTitle}>Departamentos ({departamentosVM.departamentos.length})</Text>
      </View>
      
      <FlatList
        data={departamentosVM.departamentos}
        keyExtractor={(item) => item.idDepartamento.toString()}
        renderItem={({ item }) => (
          <DepartamentoListItem 
            departamento={item} 
            onPress={() => {}} 
            onDelete={() => handleDelete(item.idDepartamento)} 
          />
        )}
        contentContainerStyle={styles.listContent}
      />
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
    paddingBottom: 20,
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
});

export default ListadoDepartamentos;
