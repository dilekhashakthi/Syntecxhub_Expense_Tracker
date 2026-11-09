import api from './axiosInstance'

export const fetchTransactions = async (kind) => {
  const response = await api.get(`/${kind}`)
  return response.data.data
}

export const createTransaction = async (kind, payload) => {
  const response = await api.post(`/${kind}`, payload)
  return response.data.data
}

export const deleteTransaction = async (kind, id) => {
  await api.delete(`/${kind}/${id}`)
}
export const downloadTransactions = async (kind) => {
  try {
    const response = await api.get(`/${kind}/download`, { responseType: 'blob' })
    return response.data
  } catch (error) {
    if (error.response?.data instanceof Blob) {
      try {
        error.response.data = JSON.parse(await error.response.data.text())
      } catch (error){
        console.log(error);
      }
    }
    throw error
  }
}
