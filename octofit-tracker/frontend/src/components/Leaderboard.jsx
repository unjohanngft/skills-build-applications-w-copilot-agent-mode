import ResourcePage from './ResourcePage.jsx'

const API_BASE_URL = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

export default function Leaderboard() {
  return <ResourcePage endpoint={`${API_BASE_URL}/api/leaderboard/`} title="Leaderboard" description="See how teams and athletes are progressing." />
}
