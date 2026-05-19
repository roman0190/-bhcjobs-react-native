import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import Hero from '../components/landing/Hero';
import { useTheme } from '../theme/ThemeContext';
import IndustrySection from '../components/landing/IndustrySection';
import { ScrollView } from 'react-native';
import TrendingJobsSection from '../components/landing/TrendingJobsSection';
import RecommendedSection from '../components/landing/RecommendedSection';
import PopularCompaniesSection from '../components/landing/PopularCompaniesSection';
import HotJobsSection from '../components/landing/HotJobsSection';
export default function LandingScreen() {
  const { theme } = useTheme();
  return (
    <AppLayout showHeader={true}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: 0 }}
      >
        <Hero />
        <IndustrySection />
        <TrendingJobsSection />
        <RecommendedSection />
        <PopularCompaniesSection />
        <HotJobsSection/>
      </ScrollView>
    </AppLayout>
  );
}
