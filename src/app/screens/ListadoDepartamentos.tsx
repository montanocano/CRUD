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

  const handleAdd = () => {
    departamentosVM.selectDepartamento(null);
    router.push('./EditarInsertarDepartamentoScreen');
  };

  const handleEdit = (item: any) => {
    departamentosVM.selectDepartamento(item);
    router.push('./EditarInsertarDepartamentoScreen');
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
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Departamentos ({departamentosVM.departamentos.length})</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>+ Nuevo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={departamentosVM.departamentos.filter((d: any) => d?.idDepartamento != null)}
        keyExtractor={(item) => String(item.idDepartamento)}
        renderItem={({ item }) => (
          <DepartamentoListItem
            departamento={item}
            onPress={() => handleEdit(item)}
            onDelete={() => handleDelete(item.idDepartamento)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay departamentos.</Text>
            <Text style={styles.emptySubText}>Pulsa "+ Nuevo" para añadir uno.</Text>
          </View>
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    height: 60, backgroundColor: '#1976D2',
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 15, elevation: 4,
  },
  headerTitle: {
    color: '#fff', fontSize: 18, fontWeight: 'bold',
    marginLeft: 15, flex: 1,
  },
  backButton: { color: '#fff', fontSize: 24 },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)',
  },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  listContent: { paddingBottom: 20 },
  errorText: { color: '#D32F2F', marginBottom: 10 },
  retryButton: { padding: 10, backgroundColor: '#1976D2', borderRadius: 5 },
  retryText: { color: '#fff' },
  emptyContainer: { flex: 1, alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: 16, color: '#666', marginBottom: 4 },
  emptySubText: { fontSize: 14, color: '#aaa' },
});

export default ListadoDepartamentos;