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
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fetchGlobal, fetchCountries, fetchHistorical, type CountryStats, type GlobalStats } from '@/lib/covidApi'
import { ExternalLink } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: 'rgba(255, 255, 255, 0.8)', font: { family: 'Geist Variable' } } },
    tooltip: { backgroundColor: '#1c1d22', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, titleColor: '#fff', bodyColor: 'rgba(255,255,255,0.8)' },
  },
  scales: {
    x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { family: 'Geist Variable', size: 10 } } },
    y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { family: 'Geist Variable', size: 10 } } },
  },
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <Card className="bg-card/40 border-border/50">
      <CardContent className="p-4">
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
        <div className="text-xl font-bold text-foreground">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      </CardContent>
    </Card>
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
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Deaths',
        data: Object.values(history.deaths),
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        fill: true,
        tension: 0.3,
      },
    ],
  } : null

  return (
    <>
      <ProjectHero
        eyebrow="Data Visualization"
        title="COVID-19 Analytics Dashboard"
        subtitle="Live worldwide and country-specific pandemic tracking via disease.sh API."
      />
      <article className="px-6 max-w-5xl mx-auto py-12 text-muted-foreground leading-relaxed">
        {err && (
          <div className="p-4 mb-6 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-mono">
            Error: {err} — data source temporarily unreachable.
          </div>
        )}

        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Worldwide Metrics</h2>
          {global ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <Stat label="Total Cases" value={global.cases} />
              <Stat label="Active" value={global.active} />
              <Stat label="Recovered" value={global.recovered} />
              <Stat label="Deaths" value={global.deaths} />
              <Stat label="Critical" value={global.critical} />
              <Stat label="Last Updated" value={new Date(global.updated).toLocaleDateString()} />
            </div>
          ) : (
            <div className="text-muted-foreground font-mono text-sm">Loading global stats...</div>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-4">Per-Country Trends</h2>
          <div className="mb-6">
            <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Select Country</label>
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              className="px-3 py-2 rounded-lg bg-card/60 border border-border/60 text-foreground text-sm w-full md:w-80 outline-none focus:border-ring"
            >
              {countries.map(c => (
                <option key={c.country} value={c.country} className="bg-card text-foreground">
                  {c.country}
                </option>
              ))}
            </select>
          </div>
          {selectedCountry && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <Stat label="Population" value={selectedCountry.population} />
              <Stat label="Total Cases" value={selectedCountry.cases} />
              <Stat label="Deaths" value={selectedCountry.deaths} />
              <Stat label="Recovered" value={selectedCountry.recovered} />
            </div>
          )}
          {data && (
            <Card className="bg-card/40 border-border/50 p-4" style={{ height: 380 }}>
              <Line data={data} options={CHART_OPTS as any} />
            </Card>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Data Source</h2>
          <p className="text-muted-foreground text-sm mb-4">Data updated daily via European Centre for Disease Prevention and Control (ECDC).</p>
          <Button variant="outline" asChild className="gap-2">
            <a href="https://www.ecdc.europa.eu/en/covid-19/data-collection" target="_blank" rel="noreferrer">
              ECDC Data Collection <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </section>
      </article>
    </>
  )
}
