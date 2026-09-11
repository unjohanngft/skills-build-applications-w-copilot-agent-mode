import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

export default function Teams() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const endpoint = `${API_BASE_URL}/api/teams/`

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((payload) => setRows(normalizeCollection(payload)))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [endpoint])

  return <ResourcePage rows={rows} error={error} loading={loading} title="Teams" description="Find teams and their current members." />
}
