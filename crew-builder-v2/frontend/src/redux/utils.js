export const REQUEST_STATE = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  ERROR: 'ERROR',
}

export const handleApiCall = async (apiCall, fallbackMessage) => {
  try {
    const response = await apiCall()
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || fallbackMessage
    throw new Error(errorMsg)
  }
}
