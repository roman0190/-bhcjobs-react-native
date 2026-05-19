import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { verifyPhoneOtp } from '../api/auth';
import { useTheme } from '../theme/ThemeContext';
import { saveToken } from '../storage/authStorage';

const OTP_LENGTH = 4;

const OTP = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { phone } = route.params;
  const { theme } = useTheme();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    if (/[^0-9]/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');

    if (code.length !== OTP_LENGTH) {
      Alert.alert('Error', `Enter full ${OTP_LENGTH} digit OTP`);
      return;
    }

    const res = await verifyPhoneOtp({
      phone,
      otp: code,
    });

    if (res?.status === true) {
      await saveToken(res?.data?.token);
      Alert.alert('Success', res?.message);
      navigation.replace('Landing');
    } else {
      Alert.alert('Error', res?.message || 'Invalid OTP');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* BACK */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Ionicons name="arrow-back" size={22} color={theme.text} />
        <Text style={[styles.backText, { color: theme.text }]}>Back</Text>
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={[styles.title, { color: theme.text }]}>
        OTP Verification
      </Text>

      <Text style={{ color: theme.icon, marginBottom: 20 }}>
        Code sent to {phone}
      </Text>

      {/* INPUT BOXES */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref: TextInput | null) => {
              inputs.current[index] = ref;
            }}
            style={[
              styles.box,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(digit, index);
              }
            }}
          />
        ))}
      </View>

      {/* BUTTON */}
      <TouchableOpacity
        onPress={handleVerify}
        style={[styles.btn, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.btnText}>VERIFY OTP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 6,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  box: {
    width: 55,
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },

  btn: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '800',
  },
});
