// components/Header.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { isLogin, logoutUser } from '../api/auth';

interface HeaderProps {
  rightText?: string;
}

export default function Header({ rightText }: HeaderProps) {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { theme, isDark, toggleTheme } = useTheme();
  const [loggedIn, setLoggedIn] = useState(false);

  const logo = isDark
    ? 'https://bhcjobs.com/images/logo_night_mode.png'
    : 'https://bhcjobs.com/images/logo_day_mode.png';

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const res = await isLogin();
    setLoggedIn(res.status);
  };

  const handleLogout = async () => {
    await logoutUser();
    navigation.replace('signin');
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: theme.bg,
        },
      ]}
    >
      <Image source={{ uri: logo }} style={styles.logo} resizeMode="contain" />

      <View style={styles.rightSection}>
        {/* Login / Right button */}
        {loggedIn ? (
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.rightBtn, { borderColor: theme.text }]}
          >
            <Ionicons name="log-out-outline" size={18} color={theme.icon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('signin')}
            style={[styles.rightBtn, { borderColor: theme.text }]}
          >
            <Text style={[styles.right, { color: theme.text }]}>{rightText}</Text>
          </TouchableOpacity>
        )}

        {/* Theme toggle icon */}
        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.rightBtn,
            { borderColor: theme.text, backgroundColor: theme.transparent },
          ]}
        >
          <Ionicons
            name={isDark ? 'sunny-outline' : 'moon-outline'}
            size={18}
            color={theme.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 35,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    padding: 6,
    borderRadius: 20,
  },
  right: {
    fontSize: 14,
    fontWeight: '700',
  },
  rightBtn: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
