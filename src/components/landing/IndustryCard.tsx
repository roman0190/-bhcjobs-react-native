import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { INDUSTRY_IMAGE_BASE_URL } from '../../utils/storeUrl';
import { Industry } from './IndustrySection';
type Props = {
  item: Industry;
};
const IndustryCard = ({ item }: Props) => {
  const { theme } = useTheme();
  const imageUrl = INDUSTRY_IMAGE_BASE_URL + item.image;
  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { backgroundColor: theme.card }]}
      />
      <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
      <Text style={styles.jobs}>{item.jobs_count} Available Jobs</Text>
    </View>
  );
};

export default IndustryCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 14,
    borderRadius: 14,
    justifyContent: 'center', // vertical center
    alignItems: 'center', // horizontal center
    shadowColor: '#fff',
    // iOS shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Android shadow
    elevation: 8,
  },

  name: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },

  jobs: {
    marginTop: 6,
    fontSize: 12,
    color: '#64748B',
  },

  image: {
    width: 45,
    height: 45,
    borderRadius: 10,
    marginBottom: 10,
    // resizeMode: 'cover',
  },
});
