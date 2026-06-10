import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import DepartamentosViewModel from '../ui/viewmodels/DepartamentosViewModel';
import DepartamentoListItem from '../components/DepartamentoListItem';

const departamentosVM = DepartamentosViewModel.getInstance();

const ListadoDepartamentos: React.FC = observer(() => {
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

  if (departamentosVM.isLoading) return <div>Loading...</div>;
  if (departamentosVM.error) return <div>Error: {departamentosVM.error}</div>;

  return (
    <div>
      <header style={{ background: '#1976D2', color: 'white', padding: 12 }}>
        <button onClick={() => history.back()}>&larr;</button>
        <span style={{ marginLeft: 8 }}>Departamentos ({departamentosVM.departamentos.length})</span>
      </header>
      <main>
        <ul>
          {departamentosVM.departamentos.map((d: any) => (
            <li key={d.idDepartamento}>
              <DepartamentoListItem departamento={d} onPress={() => {}} onDelete={() => handleDelete(d.idDepartamento)} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
});

export default ListadoDepartamentos;
