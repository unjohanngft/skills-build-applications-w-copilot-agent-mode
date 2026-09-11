import ResourceTable from './ResourceTable.jsx'

export default function ResourcePage({ rows, error, loading, title, description }) {
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
