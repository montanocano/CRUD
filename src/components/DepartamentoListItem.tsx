import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  departamento: any;
  onPress?: () => void;
  onDelete?: () => void;
};

const DepartamentoListItem: React.FC<Props> = ({ departamento, onPress, onDelete }) => {
  // Use first letter of department name as initials, same pattern as PersonaListItem
  const initial = (departamento.nombreDepartamento || 'D').charAt(0).toUpperCase();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.avatar, { backgroundColor: departamento.color || '#607D8B' }]}>
        <Text style={styles.initials}>{initial}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{departamento.nombreDepartamento}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
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
  // Circle avatar — matches PersonaListItem exactly
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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

export default DepartamentoListItem;