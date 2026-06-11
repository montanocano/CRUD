import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'expo-router';
import PersonasViewModel from '../../ui/viewmodels/PersonasViewModel';
import DepartamentosViewModel from '../../ui/viewmodels/DepartamentosViewModel';

const personasVM = PersonasViewModel.getInstance();
const departamentosVM = DepartamentosViewModel.getInstance();

const EditarInsertarPersonaScreen: React.FC = observer(() => {
  const router = useRouter();
  const selected = personasVM.personaSeleccionada;

  const [nombre, setNombre] = useState(selected?.nombre || '');
  const [apellidos, setApellidos] = useState(selected?.apellidos || '');
  const [telefono, setTelefono] = useState(selected?.telefono || '');
  const [direccion, setDireccion] = useState(selected?.direccion || '');
  const [idDepartamento, setIdDepartamento] = useState<number | null>(selected?.idDepartamento ?? null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    departamentosVM.loadDepartamentos();
  }, []);

  useEffect(() => {
    if (selected) {
      setNombre(selected.nombre || '');
      setApellidos(selected.apellidos || '');
      setTelefono(selected.telefono || '');
      setDireccion(selected.direccion || '');
      setIdDepartamento(selected.idDepartamento ?? null);
    }
  }, [selected]);

  const handleGuardar = async () => {
    if (!nombre || !apellidos) return alert('Nombre y apellidos obligatorios');
    setIsSaving(true);
    try {
      const payload: any = {
        nombre,
        apellidos,
        telefono: telefono || null,
        direccion: direccion || null,
        idDepartamento: idDepartamento ?? null,
      };
      if (selected) {
        // Include all required fields for PUT
        payload.id = selected.id;
        if (selected.fechaNac) payload.fechaNac = selected.fechaNac;
        payload.foto = selected.foto ?? null;
        await personasVM.updatePersona(selected.id, payload);
      } else {
        await personasVM.addPersona(payload);
      }
      router.back();
    } catch (e: any) {
      alert(e.message || 'Error saving');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selected ? 'Editar Persona' : 'Nueva Persona'}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Nombre" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Apellidos</Text>
          <TextInput style={styles.input} value={apellidos} onChangeText={setApellidos} placeholder="Apellidos" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} placeholder="Teléfono" keyboardType="phone-pad" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dirección</Text>
          <TextInput style={styles.input} value={direccion} onChangeText={setDireccion} placeholder="Dirección" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Departamento</Text>
          <View style={styles.pickerContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.deptScroll}>
              <TouchableOpacity
                style={[styles.deptOption, !idDepartamento && styles.deptOptionSelected]}
                onPress={() => setIdDepartamento(null)}
              >
                <Text style={[styles.deptOptionText, !idDepartamento && styles.deptOptionTextSelected]}>Ninguno</Text>
              </TouchableOpacity>
              {departamentosVM.departamentos.map((d: any) => (
                <TouchableOpacity
                  key={d.idDepartamento}
                  style={[styles.deptOption, idDepartamento === d.idDepartamento && styles.deptOptionSelected]}
                  onPress={() => setIdDepartamento(d.idDepartamento)}
                >
                  <Text style={[styles.deptOptionText, idDepartamento === d.idDepartamento && styles.deptOptionTextSelected]}>
                    {d.nombreDepartamento}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveButton} onPress={handleGuardar} disabled={isSaving}>
            {isSaving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Guardar</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  pickerContainer: { marginTop: 5 },
  deptScroll: { flexDirection: 'row' },
  deptOption: {
    paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#f0f0f0', marginRight: 10, borderWidth: 1, borderColor: '#ddd',
  },
  deptOptionSelected: { backgroundColor: '#1976D2', borderColor: '#1976D2' },
  deptOptionText: { color: '#666' },
  deptOptionTextSelected: { color: '#fff' },
  actions: { marginTop: 20, gap: 10 },
  saveButton: { backgroundColor: '#1976D2', padding: 15, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelButton: { padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  cancelButtonText: { color: '#666', fontSize: 16 },
});

export default EditarInsertarPersonaScreen;