import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../theme/ThemeContext';

const AnimatedView = Animated.createAnimatedComponent(View);

const TrendingJobCard = ({ item }: any) => {
  const { theme } = useTheme();
  const shimmerValue = useSharedValue(0);

  const shimmerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      shimmerValue.value,
      [0, 50, 100],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    ),
  }));

  // Original card rendering code starts here
  console.log('item.expired_at', item.expiry);
  // expiry calculation
  const expiryDate = new Date(item.expiry);
  const today = new Date('2026-01-01').getTime();

  let daysLeft = 0;

  if (!isNaN(expiryDate.getTime())) {
    const diff = expiryDate.getTime() - today;

    daysLeft = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  // salary conversion
  const salaryInBdt = Number(item.min_salary) * 33;

  const foodInBdt = Number(item.food_amount) * 33;

  return (
    <View style={styles.cardWrapper}>
      {/* DAYS BADGE (outside floating) */}
      <View style={styles.daysBadge}>
        <Ionicons
          name="time-outline"
          size={12}
          color="red"
          style={{ marginRight: 4 }}
        />
        <Text style={styles.daysText}>{daysLeft} DAYS LEFT</Text>
      </View>
      {/* CARD */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.jobTitle, { color: theme.text }]}>
          {item.job_title}
        </Text>

        <Text style={styles.company}>{item.company_name}</Text>

        <Text style={[styles.salary, { color: theme.text }]}>
          Salary: {item.currency} {item.min_salary} {item.salary_type}
        </Text>

        <Text style={styles.salaryBdt}>
          Equivalent BDT {salaryInBdt.toLocaleString()}
        </Text>

        {item.food_option === 'allowance' && (
          <View>
            <Text style={[styles.food, { color: theme.text }]}>
              Food Allowance: {item.currency} {item.food_amount}
            </Text>
          </View>
        )}

        <View style={styles.badgeRow}>
          <View style={styles.typeBadge}>
            <Ionicons
              name="briefcase-outline"
              size={12}
              color="#2563EB"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.badgeText}>{item.type}</Text>
          </View>

          <View style={styles.countryBadge}>
            <Ionicons
              name="location-outline"
              size={12}
              color="#16A34A"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.badgeText}>{item.country?.name}</Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={[styles.btnText, { color: theme.text }]}>Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.btnText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TrendingJobCard;

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'relative',
    marginRight: 5,
    paddingTop: 10,
    paddingLeft: 30,
  },
  card: {
    width: 340,
    marginRight: 16,
    borderRadius: 20,
    padding: 18,
    position: 'relative',
  },

  daysBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 40,
    backgroundColor: '#f4e8e8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    zIndex: 999,
    elevation: 5,
  },

  daysText: {
    color: '#2f80ed',
    fontWeight: '700',
    fontSize: 13,
  },

  jobTitle: {
    fontSize: 20,
    fontWeight: '800',
  },

  company: {
    marginTop: 4,
    color: '#64748B',
    fontWeight: '600',
  },

  salary: {
    marginTop: 18,
    fontWeight: '700',
    color: '#0F172A',
  },

  salaryBdt: {
    marginTop: 3,
    color: '#64748B',
  },

  food: {
    marginTop: 12,
    fontWeight: '700',
    color: '#0F172A',
  },

  badgeRow: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 10,
  },

  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  countryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    fontWeight: '700',
    fontSize: 11,
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 22,
  },

  viewBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2f80ed',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 10,
  },

  applyBtn: {
    flex: 1,
    backgroundColor: '#2f80ed',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '700',
  },

  // Skeleton styles
  skeletonTitle: {
    height: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 8,
  },

  skeletonText: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginBottom: 8,
  },

  skeletonBadge: {
    width: 80,
    height: 28,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },

  skeletonButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    marginRight: 10,
  },
});
