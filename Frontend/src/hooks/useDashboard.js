import { useCallback, useEffect, useState } from 'react'
import { fetchDashboard } from '../api/dashboard.api'
import  {getErrorMessage } from '../utils/errors'

const useDashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let ignore = false
    fetchDashboard()
      .then((summary) => {
        if (ignore) return
        setData(summary)
        setError('')
      })
      .catch((err) => {
        if (!ignore) setError(getErrorMessage(err))
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [reloadKey])

  const retry = useCallback(() => {
    setLoading(true)
    setReloadKey((key) => key + 1)
  }, [])

  return { data, loading, error, retry }
}

export default useDashboard