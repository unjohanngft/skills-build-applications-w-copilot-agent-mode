import ResourcePage from './ResourcePage.jsx'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

export default function Workouts() {
  return <ResourcePage endpoint={`${API_BASE_URL}/api/workouts/`} title="Workouts" description="Explore suggested workouts for every training day." />
}
