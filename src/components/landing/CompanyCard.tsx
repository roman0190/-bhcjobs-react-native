import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { COMPANY_IMAGE_BASE_URL } from '../../utils/storeUrl';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CompanyCard = ({ item }: any) => {
  const { theme } = useTheme();

  const imageUrl = COMPANY_IMAGE_BASE_URL + item.image;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      {/* LOGO */}
      <Image source={{ uri: imageUrl }} style={styles.logo} />

      {/* NAME */}
      <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
        {item.name}
      </Text>

      {/* JOB COUNT */}
      <Text style={[styles.jobs, { color: theme.icon }]}>
        {item.jobs_count || 0} Available Jobs
      </Text>
    </TouchableOpacity>
  );
};

export default CompanyCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 14,
    borderRadius: 14,
    justifyContent: 'center', 
    alignItems: 'center', 
    // shadowColor: '#fff',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.18,

    shadowRadius: 8,

    // elevation: 8,
  },

  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#f1f5f9',
  },

  name: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },

  jobs: {
    fontSize: 11,
    marginTop: 4,
  },

  arrowBox: {
    marginTop: 10,
    padding: 6,
    borderRadius: 8,
  },
});
