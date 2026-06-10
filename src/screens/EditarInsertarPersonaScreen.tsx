import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import PersonasViewModel from '../ui/viewmodels/PersonasViewModel';
import DepartamentosViewModel from '../ui/viewmodels/DepartamentosViewModel';
import container from '../core/container';
import TYPES from '../core/types';
import { PersonaApi } from '../data/api/PersonaApi';

const personasVM = PersonasViewModel.getInstance();
const departamentosVM = DepartamentosViewModel.getInstance();

const EditarInsertarPersonaScreen: React.FC = observer(() => {
  const selected = personasVM.personaSeleccionada;

  const [nombre, setNombre] = useState(selected?.nombre || '');
  const [apellidos, setApellidos] = useState(selected?.apellidos || '');
  const [telefono, setTelefono] = useState(selected?.telefono || '');
  const [direccion, setDireccion] = useState(selected?.direccion || '');
  const [foto, setFoto] = useState(selected?.foto || '');
  const [idDepartamento, setIdDepartamento] = useState<number | undefined>(selected?.idDepartamento ?? undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const personaApi = (() => {
    try {
      return container.get<PersonaApi>(TYPES.PersonaApi);
    } catch (e) {
      return null;
    }
  })();

  useEffect(() => {
    departamentosVM.loadDepartamentos();
  }, []);

  useEffect(() => {
    if (selected) {
      setNombre(selected.nombre || '');
      setApellidos(selected.apellidos || '');
      setTelefono(selected.telefono || '');
      setDireccion(selected.direccion || '');
      setFoto(selected.foto || '');
      setIdDepartamento(selected.idDepartamento ?? undefined);
    }
  }, [selected]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!personaApi) return alert('Upload not available');
    setUploading(true);
    try {
      const url = await personaApi.uploadImage(file);
      setFoto(url);
      alert('Image uploaded');
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleGuardar = async () => {
    if (!nombre || !apellidos) return alert('Nombre y apellidos obligatorios');
    setIsSaving(true);
    try {
      const payload = { nombre, apellidos, telefono, direccion, foto, idDepartamento };
      if (selected) {
        await personasVM.updatePersona(selected.id, payload);
      } else {
        await personasVM.addPersona(payload);
      }
      history.back();
    } catch (e: any) {
      alert(e.message || 'Error saving');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <header style={{ background: '#1976D2', color: 'white', padding: 12 }}>
        <button onClick={() => history.back()}>&larr;</button>
        <span style={{ marginLeft: 8 }}>{selected ? 'Editar Persona' : 'Nueva Persona'}</span>
      </header>
      <main style={{ padding: 12 }}>
        <div>
          <label>Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div>
          <label>Apellidos</label>
          <input value={apellidos} onChange={e => setApellidos(e.target.value)} />
        </div>
        <div>
          <label>Teléfono</label>
          <input value={telefono} onChange={e => setTelefono(e.target.value)} />
        </div>
        <div>
          <label>Dirección</label>
          <input value={direccion} onChange={e => setDireccion(e.target.value)} />
        </div>
        <div>
          <label>Foto (URL)</label>
          <input value={foto} onChange={e => setFoto(e.target.value)} />
        </div>
        <div>
          <label>Subir foto</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {uploading && <div>Uploading...</div>}
        </div>
        <div>
          <label>Departamento</label>
          <select value={idDepartamento as any || ''} onChange={e => setIdDepartamento(e.target.value ? Number(e.target.value) : undefined)}>
            <option value="">-- Sin departamento --</option>
            {departamentosVM.departamentos.map((d: any) => (
              <option key={d.idDepartamento} value={d.idDepartamento}>{d.nombreDepartamento}</option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: 12 }}>
          <button onClick={handleGuardar} disabled={isSaving}>{isSaving ? 'Guardando...' : 'Guardar'}</button>
          <button onClick={() => history.back()} style={{ marginLeft: 8 }}>Cancelar</button>
        </div>
      </main>
    </div>
  );
});

export default EditarInsertarPersonaScreen;
