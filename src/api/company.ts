import client from './client';

export const getCompanies = async () => {
  try {
    const res = await client.get('/api/company/get');
    return res.data.data;
  } catch (error) {
    console.log('Company API Error:', error);
    return [];
  }
};