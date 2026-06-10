import React from 'react';

type Props = {
  departamento: any;
  onPress?: () => void;
  onDelete?: () => void;
};

const DepartamentoListItem: React.FC<Props> = ({ departamento, onPress, onDelete }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: 8, borderBottom: '1px solid #eee' }}>
      <div style={{ width: 40, height: 40, borderRadius: 8, background: departamento.color || '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginRight: 12 }} onClick={onPress}>
        <span>{departamento.icon || 'D'}</span>
      </div>
      <div style={{ flex: 1 }} onClick={onPress}>
        <div style={{ fontWeight: 600 }}>{departamento.nombreDepartamento}</div>
      </div>
      <div>
        <button onClick={onDelete} aria-label="delete">Eliminar</button>
      </div>
    </div>
  );
};

export default DepartamentoListItem;
