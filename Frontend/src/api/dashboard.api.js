import api from './axiosInstance'

export const fetchDashboard = async () => {
  const response = await api.get('/dashboard')
  return response.data.data
}
