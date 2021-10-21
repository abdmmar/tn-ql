import { PathLike } from 'fs'
import * as fsp from 'fs/promises'

const FILENAME = 'national-parks.json'

type NationalPark = {
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

type InternationalStatus = {
  id: number
  name: string
  link: string
}

type Image = {
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

type License = {
  id: number
  type: string
  name: string
  link: string
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
    nationalParks: async (
      _parents: unknown,
      _args: unknown,
      context: {
        db: {
          nationalPark: {
            findMany: (arg0: {
              include: {
                image: { include: { license: boolean } }
                total_area: boolean
                intl_status: boolean
                coordinate: boolean
              }
            }) => NationalPark[]
          }
        }
      },
    ): Promise<NationalPark[]> => {
      const nationalParks: NationalPark[] = context.db.nationalPark.findMany({
        include: {
          image: {
            include: {
              license: true,
            },
          },
          total_area: true,
          intl_status: true,
          coordinate: true,
        },
      })

      return nationalParks
    },
    nationalPark: async (_parents: unknown, args: { id: number }): Promise<NationalPark | null> => {
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
