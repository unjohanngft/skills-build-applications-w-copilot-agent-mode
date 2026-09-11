import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

export default function Users() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const endpoint = `${API_BASE_URL}/api/users/`

  useEffect(() => {
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error(`Users request failed (${response.status})`)
        return response.json()
      })
      .then((payload) => setRows(normalizeCollection(payload)))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [endpoint])

  return <ResourcePage rows={rows} error={error} loading={loading} title="Users" description="Browse the people taking part in OctoFit." />
}
