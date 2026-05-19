import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/ThemeContext';

const menuItems = [
  { id: 1, name: 'Jobs', icon: 'briefcase-outline' },
  { id: 2, name: 'Search', icon: 'search-outline' },
  { id: 3, name: 'Dashboard', icon: 'grid-outline' },
  { id: 4, name: 'History', icon: 'time-outline' },
  { id: 5, name: 'Profile', icon: 'person-outline' },
];
const ManualMenu = () => {
  const { theme, isDark } = useTheme();

  const color = isDark ? 'rgba(78, 83, 89, 0.3)' : 'rgba(78, 83, 89, 0.1)';

  const handlePress = (name: string) => {
    console.log(name);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.bg, borderColor: color },
      ]}
    >
      {menuItems.map(item => (
        <TouchableOpacity
          key={item.name}
          style={styles.item}
          onPress={() => handlePress(item.name)}
        >
          <Ionicons name={item.icon} size={22} color={theme.text} />
          <Text style={[styles.label, { color: theme.text }]}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ManualMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
  },

  item: {
    alignItems: 'center',
  },

  label: {
    fontSize: 11,
    marginTop: 3,
    fontWeight: '600',
  },
});
