import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.avatar, { backgroundColor: persona.color || '#ccc' }]}>
        {persona.foto && !imageError ? (
          <Image 
            source={{ uri: persona.foto }} 
            style={styles.avatarImage} 
            onError={() => setImageError(true)} 
          />
        ) : (
          <Text style={styles.initials}>{initials}</Text>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{persona.nombre} {persona.apellidos}</Text>
        <Text style={styles.phone}>{persona.telefono}</Text>
      </View>

      <View style={styles.rightContent}>
        {persona.nombreDepartamento && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{persona.nombreDepartamento}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  initials: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  tag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 10,
    color: '#555',
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteText: {
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default PersonaListItem;
