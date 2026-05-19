import client from './client';

export const getJobs = async () => {
  try {
    const res = await client.get('/api/job/get');

    return res.data.data;
  } catch (error) {
    console.log('Jobs API Error:', error);
    return [];
  }
};