import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function Home() {
  return (
    <section className="resource-page home-page">
      <p className="eyebrow">OctoFit Tracker</p>
      <h1>Train together. Move further.</h1>
      <p className="description">Your activity, teams, workouts, and friendly competition in one place.</p>
      <Link className="primary-link" to="/activities">View activity</Link>
    </section>
  )
}

const navigation = [
  ['Activities', '/activities'],
  ['Leaderboard', '/leaderboard'],
  ['Teams', '/teams'],
  ['Users', '/users'],
  ['Workouts', '/workouts'],
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to="/">OctoFit</Link>
        <nav aria-label="Main navigation">
          {navigation.map(([label, path]) => (
            <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'active' : ''}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
