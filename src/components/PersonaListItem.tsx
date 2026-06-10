import React, { useState } from 'react';
import { PersonaUIModel } from '../ui/models/PersonaUIModel';

type Props = {
  persona: PersonaUIModel;
  onPress?: () => void;
  onDelete?: () => void;
};

const PersonaListItem: React.FC<Props> = ({ persona, onPress, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const initials = persona.initials || '';
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: 8, borderBottom: '1px solid #eee' }}>
      <div style={{ width: 48, height: 48, borderRadius: 24, background: persona.color || '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginRight: 12 }} onClick={onPress}>
        {persona.foto && !imageError ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={persona.foto} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} onError={() => setImageError(true)} />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <div style={{ flex: 1 }} onClick={onPress}>
        <div style={{ fontWeight: 600 }}>{persona.nombre} {persona.apellidos}</div>
        <div style={{ fontSize: 12 }}>{persona.telefono}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {persona.nombreDepartamento && <span style={{ background: '#eee', padding: '4px 8px', borderRadius: 12, marginRight: 8 }}>{persona.nombreDepartamento}</span>}
        <button onClick={onDelete} aria-label="delete">Eliminar</button>
      </div>
    </div>
  );
};

export default PersonaListItem;
