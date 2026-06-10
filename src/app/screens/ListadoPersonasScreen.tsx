import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import PersonasViewModel from '../ui/viewmodels/PersonasViewModel';
import { PersonaUIModel } from '../ui/models/PersonaUIModel';
import PersonaListItem from '../components/PersonaListItem';

const personasVM = PersonasViewModel.getInstance();

const ListadoPersonasScreen: React.FC = observer(() => {
  useEffect(() => {
    personasVM.loadPersonas();
  }, []);

  const handleAddPersona = () => {
    // navigation to edit/insert screen
    // placeholder: open console
    console.log('navigate to add persona');
  };

  const handleEditPersona = (p: PersonaUIModel) => {
    personasVM.selectPersona(p);
    console.log('navigate to edit persona', p.id);
  };

  const handleDeletePersona = async (id: number) => {
    if (!confirm('¿Eliminar persona?')) return;
    try {
      await personasVM.deletePersona(id);
    } catch (e: any) {
      alert(e.message || 'Error deleting');
    }
  };

  if (personasVM.isLoading) return <div>Loading...</div>;
  if (personasVM.error) return <div>Error: {personasVM.error}</div>;

  return (
    <div>
      <header style={{ background: '#1976D2', color: 'white', padding: 12 }}>
        <button onClick={() => history.back()}>&larr;</button>
        <span style={{ marginLeft: 8 }}>Personas ({personasVM.personas.length})</span>
      </header>
      <main>
        <ul>
          {personasVM.personas.map(p => (
            <li key={p.id}>
              <PersonaListItem persona={p} onPress={() => handleEditPersona(p)} onDelete={() => handleDeletePersona(p.id)} />
            </li>
          ))}
        </ul>
      </main>
      <button aria-label="add" onClick={handleAddPersona} style={{ position: 'fixed', right: 24, bottom: 24 }}>+</button>
    </div>
  );
});

export default ListadoPersonasScreen;
