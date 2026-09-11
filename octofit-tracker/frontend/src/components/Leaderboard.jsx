import { useEffect, useState } from 'react'
import { normalizeCollection } from '../api.js'
import ResourcePage from './ResourcePage.jsx'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

export default function Leaderboard() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/leaderboard/`)
      .then((response) => {
        if (!response.ok) throw new Error(`Leaderboard request failed (${response.status})`)
        return response.json()
      })
      .then((payload) => setRows(normalizeCollection(payload)))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  return <ResourcePage rows={rows} error={error} loading={loading} title="Leaderboard" description="See how teams and athletes are progressing." />
}
