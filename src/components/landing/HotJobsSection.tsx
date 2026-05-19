import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { getJobs } from '../../api/job';
import RecommendedJobCard from './RecommendedJobCard';

const CARD_WIDTH = 360; // card width + spacing

const HotJobsSection = () => {
  const { theme } = useTheme();

  const [jobs, setJobs] = useState<any[]>([]);
  const flatListRef = useRef<FlatList>(null);

  const scrollX = useRef(0);
  const currentIndex = useRef(0);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (jobs.length === 0) return;

    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % jobs.length;

      flatListRef.current?.scrollToOffset({
        offset: currentIndex.current * CARD_WIDTH,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [jobs]);

  const fetchJobs = async () => {
    const res = await getJobs();

    const filtered = res.filter((job: any) => job.is_hot === 1);
    console.log('Hot job', filtered);
    setJobs(filtered);
  };

  return (
    <View style={{ paddingVertical: 30, backgroundColor: theme.bg }}>
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
            backgroundColor: theme.card,
          },
        ]}
      >
        Hot Jobs
      </Text>

      <FlatList
        ref={flatListRef}
        data={jobs}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={{
              width: CARD_WIDTH,
              paddingHorizontal: 8,
            }}
          >
            <RecommendedJobCard item={item} />
          </View>
        )}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
      />
    </View>
  );
};

export default HotJobsSection;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 700,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 30,
  },
});
