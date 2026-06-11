import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'expo-router';
import DepartamentosViewModel from '../../ui/viewmodels/DepartamentosViewModel';

const departamentosVM = DepartamentosViewModel.getInstance();

const EditarInsertarDepartamentoScreen: React.FC = observer(() => {
  const router = useRouter();
  const selected = departamentosVM.departamentoSeleccionado;

  const [nombreDepartamento, setNombreDepartamento] = useState(selected?.nombreDepartamento || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (selected) {
      setNombreDepartamento(selected.nombreDepartamento || '');
    }
  }, [selected]);

  const handleGuardar = async () => {
    if (!nombreDepartamento.trim()) return alert('Nombre del departamento obligatorio');
    setIsSaving(true);
    try {
      const payload = { nombreDepartamento: nombreDepartamento.trim() };
      if (selected) {
        await departamentosVM.updateDepartamento(selected.idDepartamento, {
          idDepartamento: selected.idDepartamento,
          ...payload,
        });
      } else {
        await departamentosVM.addDepartamento(payload);
      }
      router.back();
    } catch (e: any) {
      alert(e.message || 'Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {selected ? 'Editar Departamento' : 'Nuevo Departamento'}
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre del Departamento</Text>
          <TextInput
            style={styles.input}
            value={nombreDepartamento}
            onChangeText={setNombreDepartamento}
            placeholder="Ej: Recursos Humanos"
            autoFocus
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveButton} onPress={handleGuardar} disabled={isSaving}>
            {isSaving
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.saveButtonText}>Guardar</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 60, backgroundColor: '#1976D2',
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 15, elevation: 4,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 15 },
  backButton: { color: '#fff', fontSize: 24 },
  form: { padding: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    padding: 12, fontSize: 16,
  },
  actions: { marginTop: 10, gap: 10 },
  saveButton: {
    backgroundColor: '#1976D2', padding: 15,
    borderRadius: 8, alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelButton: {
    padding: 15, borderRadius: 8, alignItems: 'center',
    borderWidth: 1, borderColor: '#ddd',
  },
  cancelButtonText: { color: '#666', fontSize: 16 },
});

export default EditarInsertarDepartamentoScreen;