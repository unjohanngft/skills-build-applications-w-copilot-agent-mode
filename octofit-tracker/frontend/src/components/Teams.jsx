import ResourcePage from './ResourcePage.jsx'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

export default function Teams() {
  return <ResourcePage endpoint={`${API_BASE_URL}/api/teams/`} title="Teams" description="Find teams and their current members." />
}
