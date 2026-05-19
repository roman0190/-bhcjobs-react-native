import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { getCompanies } from '../../api/company';
import CompanyCard from './CompanyCard';

const PopularCompaniesSection = () => {
  const { theme } = useTheme();
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const res = await getCompanies();

    const sorted = res
      .sort((a: any, b: any) => (b.jobs_count || 0) - (a.jobs_count || 0))
      .slice(0, 10);

    setCompanies(sorted);
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.bg }]}>
      {/* TITLE */}
      <Text
        style={[
          styles.title,
          { color: theme.text, backgroundColor: theme.card },
        ]}
      >
        Popular Companies
      </Text>

      <FlatList
        data={companies}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CompanyCard item={item} />}
        scrollEnabled={false}
      />
    </View>
  );
};

export default PopularCompaniesSection;

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
