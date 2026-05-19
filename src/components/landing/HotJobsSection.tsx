import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { getJobs } from '../../api/job';
import RecommendedJobCard from './RecommendedJobCard';

const HORIZONTAL_PADDING = 20;
const ITEM_GAP = 16;

const HotJobsSection = () => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const [jobs, setJobs] = useState<any[]>([]);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  const scrollX = useRef(0);
  const currentIndex = useRef(0);
  const cardWidth = Math.min(360, width - HORIZONTAL_PADDING * 2);
  const itemWidth = cardWidth + ITEM_GAP;

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (jobs.length === 0 || !isAutoScrollEnabled) return;

    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % jobs.length;

      flatListRef.current?.scrollToOffset({
        offset: currentIndex.current * itemWidth,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [jobs, isAutoScrollEnabled, itemWidth]);

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
        scrollEnabled
        onScrollBeginDrag={() => {
          setIsAutoScrollEnabled(false);
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: cardWidth,
              marginRight: ITEM_GAP,
            }}
          >
            <RecommendedJobCard item={item} />
          </View>
        )}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
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
