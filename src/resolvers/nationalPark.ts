import { PathLike } from 'fs'
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

async function readData(filename: PathLike | fsp.FileHandle) {
  const buffer = await fsp.readFile(filename, 'utf-8')
  const data = JSON.parse(buffer.toString())
  return data
}

const resolvers = {
  Query: {
    nationalParks: async (): Promise<NationalPark[]> => {
      const nationalParks: NationalPark[] = await readData(`./src/data/${FILENAME}`)
      return nationalParks
    },
    nationalPark: async (root: unknown, args: { id: string }): Promise<NationalPark | null> => {
      const nationalParks: NationalPark[] = await readData(`./src/data/${FILENAME}`)
      let nationalPark: NationalPark | null = null

      for (let i = 0; i < nationalParks.length; i++) {
        const park = nationalParks[i]

        if (args.id === park.id) {
          nationalPark = park
          break
        }
      }

      return nationalPark
    },
  },
}

export default resolvers
