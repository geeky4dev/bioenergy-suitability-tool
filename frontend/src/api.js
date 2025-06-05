import axios from 'axios';
const API_URL = 'http://localhost:5000/api';

export const fetchSite = async (id) => {
  const res = await axios.get(`${API_URL}/site/${id}`);
  return res.data;
};
