const BASE = 'https://disease.sh/v3/covid-19'

export type GlobalStats = {
  cases: number
  deaths: number
  recovered: number
  active: number
  critical: number
  updated: number
}

export type CountryStats = GlobalStats & {
  country: string
  countryInfo: { flag: string; iso2: string }
  population: number
}

export async function fetchGlobal(): Promise<GlobalStats> {
  const r = await fetch(`${BASE}/all`)
  if (!r.ok) throw new Error('Failed to fetch global data')
  return r.json()
}

export async function fetchCountries(): Promise<CountryStats[]> {
  const r = await fetch(`${BASE}/countries?sort=cases`)
  if (!r.ok) throw new Error('Failed to fetch countries')
  return r.json()
}

export async function fetchHistorical(country: string, days = 90): Promise<{ cases: Record<string, number>; deaths: Record<string, number> }> {
  const r = await fetch(`${BASE}/historical/${encodeURIComponent(country)}?lastdays=${days}`)
  if (!r.ok) throw new Error('Failed to fetch historical data')
  const data = await r.json()
  return data.timeline ?? data
}
