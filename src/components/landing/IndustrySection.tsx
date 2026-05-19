import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IndustryCard from './IndustryCard';
import { useTheme } from '../../theme/ThemeContext';
import { getIndustries } from '../../api/industry';
import Loading from '../common/Loading';

export type Industry = {
  id: number;
  name: string;
  jobs_count: number;
  image: string;
};

const IndustrySection = () => {
  const { theme } = useTheme();

  const [data, setData] = useState<Industry[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await getIndustries();
    setData(res);
    setLoading(false);
  };

  const visibleData = showAll ? data : data.slice(0, 6);

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.bg }]}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text
          style={[
            styles.title,
            {
              color: theme.text,
              backgroundColor: theme.card,
            },
          ]}
        >
          Popular Industries
        </Text>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={visibleData}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <IndustryCard item={item} />}
          scrollEnabled={false}
        />
      )}

      {data.length > 6 && (
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

export default IndustrySection;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 20,
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
