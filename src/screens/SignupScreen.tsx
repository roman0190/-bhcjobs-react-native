import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';

import { registerUser } from '../api/auth';

const genderData = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
];

const SignupScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const [gender, setGender] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    passport: '',
    password: '',
    confirmPassword: '',
  });

  const setField = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.name) return 'Name required';
    if (!form.phone || form.phone.length !== 11) return 'Valid phone required';
    if (!form.email.includes('@')) return 'Valid email required';
    if (!form.passport) return 'Passport required';
    if (!gender) return 'Gender required';
    if (form.password.length < 6) return 'Password min 6 chars';
    if (form.password !== form.confirmPassword) return 'Password not match';
    if (!agree) return 'Accept terms first';
    return null;
  };

  const handleSignup = async () => {
    const error = validate();
    if (error) return Alert.alert('Error', error);

    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      password: form.password,
      confirm_password: form.confirmPassword,
      passport_number: form.passport,
      dob: date.toISOString().split('T')[0],
      gender,
    };

    const res = await registerUser(payload);

    if (res?.status === true) {
      navigation.navigate('otp', { phone: form.phone });
    } else {
      Alert.alert(
        'Error',
        res?.message ||
          res?.error?.passport_number?.[0] ||
          'Something went wrong',
      );
    }
  };

  const isDisabled =
    !agree ||
    !form.name ||
    !form.phone ||
    !form.email ||
    !form.passport ||
    !form.password ||
    !form.confirmPassword ||
    !gender;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* TITLE */}
        <Text style={[styles.heading, { color: theme.text }]}>
          Create an account
        </Text>

        {/* NAME */}
        <Text style={[styles.label, { color: theme.text }]}>Full Name *</Text>
        <View
          style={[
            styles.inputBox,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Ionicons name="person-outline" size={18} color={theme.icon} />
          <TextInput
            placeholder="Enter full name"
            placeholderTextColor={theme.overlay}
            value={form.name}
            onChangeText={v => setField('name', v)}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        {/* PHONE */}
        <Text style={[styles.label, { color: theme.text }]}>
          Mobile Number *
        </Text>
        <View
          style={[
            styles.inputBox,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Ionicons name="call-outline" size={18} color={theme.icon} />
          <TextInput
            placeholder="01XXXXXXXXX"
            keyboardType="phone-pad"
            placeholderTextColor={theme.overlay}
            value={form.phone}
            onChangeText={v => setField('phone', v)}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        {/* DOB */}
        <Text style={[styles.label, { color: theme.text }]}>
          Date of Birth *
        </Text>
        <TouchableOpacity
          onPress={() => setOpenDate(true)}
          style={[
            styles.inputBox,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Ionicons name="calendar-outline" size={18} color={theme.icon} />
          <Text style={{ color: theme.text, marginLeft: 10 }}>
            {date.toISOString().split('T')[0]}
          </Text>
        </TouchableOpacity>

        <DatePicker
          modal
          open={openDate}
          date={date}
          mode="date"
          onConfirm={d => {
            setOpenDate(false);
            setDate(d);
          }}
          onCancel={() => setOpenDate(false)}
        />

        {/* PASSPORT */}
        <Text style={[styles.label, { color: theme.text }]}>Passport No *</Text>
        <View
          style={[
            styles.inputBox,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Ionicons name="document-text-outline" size={18} color={theme.icon} />
          <TextInput
            placeholder="Enter passport number"
            placeholderTextColor={theme.overlay}
            value={form.passport}
            onChangeText={v => setField('passport', v)}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        {/* GENDER */}
        <Text style={[styles.label, { color: theme.text }]}>Gender *</Text>
        <Dropdown
          data={genderData}
          labelField="label"
          valueField="value"
          placeholder="Select gender"
          placeholderStyle={{ color: theme.overlay }}
          selectedTextStyle={{ color: theme.text }}
          itemTextStyle={{ color: theme.text }}
          value={gender}
          onChange={item => setGender(item.value)}
          style={[
            styles.dropdown,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
          containerStyle={{
            backgroundColor: theme.bg,
            borderRadius: 12,
          }}
          activeColor={theme.card}
        />

        {/* EMAIL */}
        <Text style={[styles.label, { color: theme.text }]}>Email *</Text>
        <View
          style={[
            styles.inputBox,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Ionicons name="mail-outline" size={18} color={theme.icon} />
          <TextInput
            placeholder="Enter email"
            placeholderTextColor={theme.overlay}
            value={form.email}
            onChangeText={v => setField('email', v)}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        {/* PASSWORD */}
        <Text style={[styles.label, { color: theme.text }]}>Password *</Text>
        <View
          style={[
            styles.inputBox,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Ionicons name="lock-closed-outline" size={18} color={theme.icon} />
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="Enter password"
            placeholderTextColor={theme.overlay}
            value={form.password}
            onChangeText={v => setField('password', v)}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        {/* CONFIRM */}
        <Text style={[styles.label, { color: theme.text }]}>
          Confirm Password *
        </Text>
        <View
          style={[
            styles.inputBox,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Ionicons name="lock-closed-outline" size={18} color={theme.icon} />
          <TextInput
            secureTextEntry={!showConfirm}
            placeholder="Confirm password"
            placeholderTextColor={theme.overlay}
            value={form.confirmPassword}
            onChangeText={v => setField('confirmPassword', v)}
            style={[styles.input, { color: theme.text }]}
          />
        </View>

        {/* TERMS */}
        <TouchableOpacity
          onPress={() => setAgree(!agree)}
          style={styles.checkboxRow}
        >
          <Ionicons
            name={agree ? 'checkbox' : 'square-outline'}
            size={20}
            color={theme.primary}
          />
          <Text style={[styles.terms, { color: theme.icon }]}>
            Accept Terms & Conditions
          </Text>
        </TouchableOpacity>

        {/* BUTTON */}
        <TouchableOpacity
          disabled={isDisabled}
          onPress={handleSignup}
          style={[
            styles.btn,
            { backgroundColor: isDisabled ? '#94A3B8' : theme.primary },
          ]}
        >
          <Text style={styles.btnText}>SIGN UP</Text>
        </TouchableOpacity>

        {/* LOGIN */}
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: theme.icon }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('signin')}>
            <Text
              style={{ color: theme.primary, fontWeight: '700', marginTop: 4 }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    gap: 10,
  },

  terms: {
    fontSize: 11,
    flex: 1,
    lineHeight: 16,
  },

  btn: {
    marginTop: 20,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '800',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    marginHorizontal: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    justifyContent: 'center',
  },
});
