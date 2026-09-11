export default function ResourceTable({ rows, emptyMessage }) {
  if (!rows.length) return <p className="empty-state">{emptyMessage}</p>

  const columns = Object.keys(rows[0]).filter((key) => key !== '__v')

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => <th key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id ?? row._id ?? index}>
              {columns.map((column) => (
                <td key={column}>
                  {typeof row[column] === 'object'
                    ? JSON.stringify(row[column])
                    : String(row[column] ?? '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
