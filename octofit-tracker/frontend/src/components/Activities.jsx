import ResourcePage from './ResourcePage.jsx'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

export default function Activities() {
  return <ResourcePage endpoint={`${API_BASE_URL}/api/activities/`} title="Activities" description="Review activity logged by the OctoFit community." />
}
