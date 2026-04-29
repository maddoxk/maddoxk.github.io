import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import ProjectHero from '@/components/project/ProjectHero'
import NeonButton from '@/components/ui/NeonButton'
import { fetchGlobal, fetchCountries, fetchHistorical, type CountryStats, type GlobalStats } from '@/lib/covidApi'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#e6f1ff', font: { family: 'JetBrains Mono' } } },
    tooltip: { backgroundColor: '#0a0f1e', borderColor: '#00f0ff', borderWidth: 1, titleColor: '#00f0ff', bodyColor: '#e6f1ff' },
  },
  scales: {
    x: { grid: { color: 'rgba(0, 240, 255, 0.1)' }, ticks: { color: '#7a8aa8', font: { family: 'JetBrains Mono', size: 10 } } },
    y: { grid: { color: 'rgba(0, 240, 255, 0.1)' }, ticks: { color: '#7a8aa8', font: { family: 'JetBrains Mono', size: 10 } } },
  },
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="panel p-3 border border-[var(--border-panel)]">
      <div className="font-mono text-[10px] tracking-widest text-muted">{label}</div>
      <div className="font-display text-xl text-cyan-neon" style={{ textShadow: 'var(--glow-cyan-sm)' }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  )
}

export default function Covid() {
  const [global, setGlobal] = useState<GlobalStats | null>(null)
  const [countries, setCountries] = useState<CountryStats[]>([])
  const [selected, setSelected] = useState('USA')
  const [history, setHistory] = useState<{ cases: Record<string, number>; deaths: Record<string, number> } | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([fetchGlobal(), fetchCountries()])
      .then(([g, c]) => { setGlobal(g); setCountries(c) })
      .catch(e => setErr(e.message))
  }, [])

  useEffect(() => {
    if (!selected) return
    fetchHistorical(selected).then(setHistory).catch(e => setErr(e.message))
  }, [selected])

  const selectedCountry = countries.find(c => c.country === selected || c.countryInfo?.iso2 === selected)

  const data = history ? {
    labels: Object.keys(history.cases),
    datasets: [
      {
        label: 'Cases',
        data: Object.values(history.cases),
        borderColor: '#00f0ff',
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Deaths',
        data: Object.values(history.deaths),
        borderColor: '#ff2bd6',
        backgroundColor: 'rgba(255, 43, 214, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  } : null

  return (
    <>
      <ProjectHero
        eyebrow="DATA_VIZ // PUBLIC_HEALTH"
        title="COVID-19 DASHBOARD"
        subtitle="Live worldwide and per-country data visualization via disease.sh."
      />
      <article className="px-6 max-w-5xl mx-auto py-12">
        {err && (
          <div className="panel cyber-border p-4 mb-6 text-magenta-neon font-mono text-sm" style={{ borderColor: 'var(--neon-magenta)' }}>
            &gt; ERROR: {err} — data source temporarily unreachable.
          </div>
        )}

        <section className="mb-12">
          <h2 className="font-display text-2xl text-cyan-neon mb-6">Worldwide</h2>
          {global ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="TOTAL_CASES" value={global.cases} />
              <Stat label="ACTIVE" value={global.active} />
              <Stat label="RECOVERED" value={global.recovered} />
              <Stat label="DEATHS" value={global.deaths} />
              <Stat label="CRITICAL" value={global.critical} />
              <Stat label="UPDATED" value={new Date(global.updated).toLocaleDateString()} />
            </div>
          ) : (
            <div className="text-muted font-mono">&gt; LOADING_GLOBAL...</div>
          )}
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl text-cyan-neon mb-6">Country Data</h2>
          <div className="mb-6">
            <label className="block font-mono text-xs text-muted mb-2">&gt; SELECT_COUNTRY</label>
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              className="panel border border-cyan-neon px-4 py-2 font-mono text-sm text-cyan-neon bg-transparent w-full md:w-96"
            >
              {countries.map(c => (
                <option key={c.country} value={c.country} className="bg-deep">
                  {c.country}
                </option>
              ))}
            </select>
          </div>
          {selectedCountry && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <Stat label="POPULATION" value={selectedCountry.population} />
              <Stat label="CASES" value={selectedCountry.cases} />
              <Stat label="DEATHS" value={selectedCountry.deaths} />
              <Stat label="RECOVERED" value={selectedCountry.recovered} />
            </div>
          )}
          {data && (
            <div className="panel cyber-border p-4" style={{ height: 400 }}>
              <Line data={data} options={CHART_OPTS as any} />
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-2xl text-cyan-neon mb-4">Learn More</h2>
          <p className="text-muted mb-4">Explore how COVID-19 data is collected and analyzed.</p>
          <NeonButton href="https://www.ecdc.europa.eu/en/covid-19/data-collection">
            &gt; OPEN_ECDC_DATA_SOURCE
          </NeonButton>
        </section>
      </article>
    </>
  )
}
