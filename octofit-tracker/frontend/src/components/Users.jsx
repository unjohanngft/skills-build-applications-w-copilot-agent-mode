import ResourcePage from './ResourcePage.jsx'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

export default function Users() {
  return <ResourcePage endpoint={`${API_BASE_URL}/api/users/`} title="Users" description="Browse the people taking part in OctoFit." />
}
