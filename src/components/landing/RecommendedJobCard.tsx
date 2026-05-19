import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../theme/ThemeContext';
import { COMPANY_IMAGE_BASE_URL } from '../../utils/storeUrl';

const RecommendedJobCard = ({ item, loading = false }: any) => {
  const { theme } = useTheme();
  const [saved, setSaved] = useState(false);

  if (loading || !item) {
    return (
      <View style={[styles.card, { backgroundColor: theme.transparent, borderColor: theme.border }]}>
        <View style={[styles.skeleton, { backgroundColor: '#e0e0e0' }]} />
        <View style={[styles.skeleton, { backgroundColor: '#e0e0e0', marginTop: 12, height: 60 }]} />
        <View style={[styles.skeleton, { backgroundColor: '#e0e0e0', marginTop: 12 }]} />
        <View style={[styles.skeleton, { backgroundColor: '#e0e0e0', marginTop: 12 }]} />
      </View>
    );
  }

  const imageUrl = COMPANY_IMAGE_BASE_URL + item.company?.image;

  // SALARY
  const minBdt = Number(item.min_salary || 0) * 33;
  const maxBdt = Number(item.max_salary || 0) * 33;

  // FOOD
  const foodBdt = Number(item.food_amount || 0) * 33;

  // DATE
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'No Deadline';

    const [year, month, day] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const deadlineText = `Deadline: ${formatDate(item.expiry)}`;

  return (
    <View style={[styles.card, { backgroundColor: theme.transparent, borderColor: theme.border }]}>
      
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Image source={{ uri: imageUrl }} style={styles.logo} />

        <View style={styles.headerTextContainer}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
            {item.job_title}
          </Text>

          <Text style={[styles.company, { color: theme.text }] } numberOfLines={1}>
            {item.company_name} •{' '}
            <Text style={{ color: theme.icon }}>{item.country?.name}</Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setSaved(!saved)}
          style={[styles.starButton, { backgroundColor: theme.transparentBg, borderColor: theme.border }]}
        >
          <Ionicons
            name={saved ? 'star' : 'star-outline'}
            size={18}
            color={saved ? '#facc15' : theme.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      {/* SALARY */}
      <Text style={[styles.salary, { color: theme.text }]}>
        Salary: {item.currency}{' '}
        {Number(item.min_salary).toLocaleString()} -{' '}
        {Number(item.max_salary).toLocaleString()} / {item.salary_type}
      </Text>

      <Text style={[styles.salaryBdt, { color: theme.icon }]}>
        ~ {minBdt.toLocaleString()} - {maxBdt.toLocaleString()} BDT approx.
      </Text>

      {/* FOOD */}
      {item.food_option === 'allowance' && item.food_amount > 0 && (
        <Text style={[styles.food, { color: theme.icon }]}>
          Food Allowance: {item.currency} {item.food_amount} (~{' '}
          {foodBdt.toLocaleString()} BDT approx.)
        </Text>
      )}

      {/* DEADLINE */}
      <Text style={[styles.deadline, { color: theme.primary }]}>
        {deadlineText}
      </Text>

      {/* BUTTONS */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={[styles.viewBtn, { borderColor: theme.primary }]}>
          <Text style={[styles.viewText, { color: theme.primary }]}>Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.applyBtn, { backgroundColor: theme.primary }]}>
          <Text style={styles.applyText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecommendedJobCard;

const styles = StyleSheet.create({
  card: {

    width: '100%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },

  company: {
    fontSize: 13,
    fontWeight: '500',
  },

  starButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
  },

  divider: {
    height: 1,
    marginVertical: 14,
  },

  salary: {
    fontSize: 14,
    fontWeight: '700',
  },

  salaryBdt: {
    fontSize: 12,
    marginTop: 2,
  },

  food: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
  },

  deadline: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '700',
  },

  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },

  viewBtn: {
    flex: 1,
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },

  applyBtn: {
    flex: 1.3,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },

  viewText: {
    fontWeight: '700',
  },

  applyText: {
    color: '#fff',
    fontWeight: '700',
  },

  skeleton: {
    width: '100%',
    height: 46,
    borderRadius: 12,
  },
});