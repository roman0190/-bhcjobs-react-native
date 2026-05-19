import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (data: any) => {
  try {
    const res = await client.post('/api/job_seeker/register', data);

    return res.data;
  } catch (error: any) {
    console.log('Register Error:', error?.response?.data);

    return error?.response?.data;
  }
};

export const verifyPhoneOtp = async (data: any) => {
  try {
    const res = await client.post('/api/job_seeker/phone_verify', data);

    return res.data;
  } catch (error: any) {
    console.log('OTP Verify Error:', error?.response?.data);

    return error?.response?.data;
  }
};

export const loginUser = async (data: { phone: string; password: string }) => {
  try {
    const res = await client.post('/api/job_seeker/login', data);

    return res.data;
  } catch (error: any) {
    console.log('Login Error:', error?.response?.data);

    return error?.response?.data;
  }
};

export const isLogin = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      return {
        status: true,
        token,
      };
    }

    return {
      status: false,
      token: null,
    };
  } catch (error) {
    console.log('isLogin Error:', error);

    return {
      status: false,
      token: null,
    };
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('token');

    return {
      status: true,

      message: 'Logged out successfully',
    };
  } catch (error) {
    console.log('Logout Error:', error);

    return {
      status: false,

      message: 'Logout failed',
    };
  }
};
