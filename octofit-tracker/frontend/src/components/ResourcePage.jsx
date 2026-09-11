import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import ResourceTable from './ResourceTable.jsx'

export default function ResourcePage({ endpoint, title, description }) {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetchCollection(endpoint)
      .then((items) => {
        if (active) setRows(items)
      })
      .catch((requestError) => {
        if (active) setError(requestError.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [endpoint])

  return (
    <section className="resource-page">
      <p className="eyebrow">OctoFit Tracker</p>
      <h1>{title}</h1>
      <p className="description">{description}</p>
      {loading && <p>Loading {title.toLowerCase()}...</p>}
      {error && <p className="error-state">{error}</p>}
      {!loading && !error && (
        <ResourceTable rows={rows} emptyMessage={`No ${title.toLowerCase()} found.`} />
      )}
    </section>
  )
}
