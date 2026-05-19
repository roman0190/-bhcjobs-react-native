import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { useTheme } from '../../theme/ThemeContext';
import { getJobs } from '../../api/job';
import TrendingJobCard from './TrendingJobCard';
import Loading from '../common/Loading';

export type Job = {
  id: number;
  job_title: string;
  company_name: string;

  currency: string;
  min_salary: string;
  salary_type: string;

  food_option: string;
  food_amount: string;

  type: string;

  expiry: string;

  country: {
    name: string;
  };
};

const TrendingJobsSection = () => {
  const { theme } = useTheme();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getJobs();

      const filteredJobs = (res || []).filter((item: Job) => {
        const expiryDate = new Date(item.expiry);

        if (isNaN(expiryDate.getTime())) return false;
        //dummy
        const diff = expiryDate.getTime() - new Date('2026-01-01').getTime();

        const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

        return daysLeft > 0;
      });
      console.log('filteredJobs', filteredJobs);
      setJobs(filteredJobs);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.bg }]}>
      <Text
        style={[
          styles.title,
          { color: theme.text, backgroundColor: theme.card },
        ]}
      >
        Trending Jobs
      </Text>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <TrendingJobCard item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default TrendingJobsSection;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 700,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 30,
  },

  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingCardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
});
