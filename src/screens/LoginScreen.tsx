import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../api/auth';
import { saveToken } from '../storage/authStorage';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // VALIDATION

    if (!phone.trim()) {
      Alert.alert('Error', 'Phone number is required');

      return;
    }

    if (phone.length !== 11) {
      Alert.alert('Error', 'Enter valid phone number');

      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Password is required');

      return;
    }

    try {
      setLoading(true);

      const payload = {
        phone,

        password,
      };

      const response = await loginUser(payload);

      console.log('LOGIN RESPONSE:', response);

      // SUCCESS

      if (response?.status === true) {
        const token = response?.data?.token;

        // SAVE TOKEN

        await saveToken(token);

        Alert.alert('Success', response?.message);

        // NAVIGATE

        navigation.replace('Landing');
      } else {
        Alert.alert(
          'Login Failed',

          response?.message || 'Something went wrong',
        );
      }
    } catch (error) {
      console.log(error);

      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: theme.bg }}
      >
        <View style={styles.container}>
          {/* TITLE */}
          <View style={styles.titleRow}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color={theme.icon}
            />
            <Text style={[styles.heading, { color: theme.text }]}>
              Job Seeker Login
            </Text>
          </View>

          {/* MOBILE */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Mobile Number
            </Text>

            <View
              style={[
                styles.inputWrapper,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Ionicons name="call-outline" size={20} color={theme.icon} />
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="01XXXXXXXXX"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                style={[styles.input, { color: theme.text }]}
              />
            </View>
          </View>

          {/* PASSWORD */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Password</Text>

            <View
              style={[
                styles.inputWrapper,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={theme.icon}
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                style={[styles.input, { color: theme.text }]}
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={theme.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* FORGOT */}
          <TouchableOpacity style={styles.forgotContainer}>
            <Text style={[styles.forgotText, { color: theme.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* BUTTON */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={[
              styles.signInBtn,

              {
                backgroundColor: theme.primary,

                opacity: loading ? 0.7 : 1,
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signInText}>SIGN IN</Text>
            )}
          </TouchableOpacity>

          {/* DIVIDER */}
          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <Text style={[styles.orText, { color: theme.icon }]}>OR</Text>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
          </View>

          {/* REGISTER */}
          <View style={styles.bottomContainer}>
            <Text style={[styles.bottomText, { color: theme.icon }]}>
              New to BhcJobs?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text style={[styles.registerText, { color: theme.primary }]}>
                Create an account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 40,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 40,
    alignSelf: 'center',
  },

  heading: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 56,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },

  forgotText: {
    fontSize: 13,
    fontWeight: '600',
  },

  signInBtn: {
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },

  signInText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },

  divider: {
    flex: 1,
    height: 1,
  },

  orText: {
    marginHorizontal: 12,
    fontSize: 12,
    fontWeight: '600',
  },

  bottomContainer: {
    alignItems: 'center',
  },

  bottomText: {
    fontSize: 13,
    marginBottom: 6,
  },

  registerText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
