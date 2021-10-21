export type NationalPark = {
  id: number
  image: Image[] | null
  link: string | null
  name: string
  year: number
  total_area: { km: number; miles: number }
  waters_percentages: string | null
  intl_status: InternationalStatus[] | [] | null
  region: Regions
  description: string | null
  coordinate: { latitude: number; longitude: number } | null
  map: string | null
  location: string | null
  established: number | null
  visitors: string | null
  management: string | null
}

export type InternationalStatus = {
  id: number
  name: string
  link: string
}

export type Image = {
  id: number
  link: string
  title: string
  width: number
  height: number
  size: string
  type: string
  date: Date | null
  original_source: string | null
  author: string | null
  src: string
  license: License[] | null
}

export type License = {
  id: number
  type: string
  name: string
  link: string
}

export type Regions =
  | 'Jawa'
  | 'Bali dan Nusa Tenggara'
  | 'Kalimantan'
  | 'Maluku dan Papua'
  | 'Sulawesi'
  | 'Sumatra'
  | ''
