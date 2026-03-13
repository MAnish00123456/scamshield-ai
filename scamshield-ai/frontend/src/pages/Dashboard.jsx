import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'

const stats = [
  { value: '1,247', label: 'Total scans today' },
  { value: '89%', label: 'Scams detected' },
  { value: '342', label: 'Users protected' },
]

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <h2>Dashboard</h2>
        <p>Overview of ScamShield AI detection metrics.</p>
        <div className="dashboard-stats">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Dashboard
