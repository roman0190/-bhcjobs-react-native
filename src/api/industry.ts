import client from './client';

export const getIndustries = async () => {
  try {
    const res = await client.get('/api/industry/get');

    return res.data.data;
  } catch (error) {
    console.log('Industry API Error:', error);
    return [];
  }
};
