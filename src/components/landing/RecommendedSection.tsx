import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../theme/ThemeContext';
import { getJobs } from '../../api/job';
import RecommendedJobCard from './RecommendedJobCard';

const RecommendedSection = () => {
  const { theme } = useTheme();
  const [jobs, setJobs] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await getJobs();

    const sorted = res.sort((a: any, b: any) => b.view_count - a.view_count);

    setJobs(sorted);
  };

  const visibleJobs = showAll ? jobs : jobs.slice(0, 10);

  return (
    <View style={{ backgroundColor: theme.bg }}>
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
            backgroundColor: theme.card,
          },
        ]}
      >
        Recommended Jobs
      </Text>

      <FlatList
        data={visibleJobs}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <RecommendedJobCard item={item} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 20 }}
      />

      {jobs.length > 10 && (
        <TouchableOpacity
          onPress={() => setShowAll(!showAll)}
          style={[
            styles.button,
            { backgroundColor: theme.bg, borderColor: theme.text },
          ]}
        >
          <Ionicons
            name={showAll ? 'chevron-up' : 'chevron-down'}
            size={26}
            color={theme.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RecommendedSection;

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
