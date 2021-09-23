import * as fsp from 'fs/promises'

const FILENAME = 'national-parks.json'

type NationalPark = {
  id: string
  image: Image | null
  link: string
  name: string
  year: number
  total_area: { km: string; miles: string }
  waters_percentages: string | null
  intl_status: string | string[]
  region: Regions
  description: string
  coordinate: { latitude: string; longitude: string }
  map: string
  location: string
  established: number
  visitors: string
  management: string
}

type Image = {
  link: string
  title: string
  width: string
  height: string
  size: string
  type: string
  date: Date | null
  original_source: string | null
  author: string | null
  src: string
  license: License | License[] | null
}

type License = {
  type: string | null
  link: string | null
}

type Regions =
  | 'Jawa'
  | 'Bali dan Nusa Tenggara'
  | 'Kalimantan'
  | 'Maluku dan Papua'
  | 'Sulawesi'
  | 'Sumatra'
  | ''

const resolvers = {
  Query: {
    nationalParks: async (): Promise<NationalPark[]> => {
      const data = await fsp.readFile(`./src/data/${FILENAME}`, 'utf-8')
      const nationalParks = JSON.parse(data.toString())
      return nationalParks
    },
  },
}

export default resolvers
