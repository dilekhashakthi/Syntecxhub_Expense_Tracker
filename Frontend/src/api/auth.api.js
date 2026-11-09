import api from './axiosInstance'

export const loginRequest = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data.data
}

export const registerRequest = async (formData) => {
  const response = await api.post('/auth/register', formData)
  return response.data.data
}

export const getMeRequest = async () => {
  const response = await api.get('/auth/me')
  return response.data.data.user
}
