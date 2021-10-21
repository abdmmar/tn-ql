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

const resolvers = {
  Query: {
    nationalParks: async (_parents: unknown, _args: unknown, context: { db }): Promise<NationalPark[]> => {
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
    nationalPark: async (
      _parents: unknown,
      args: { id: string },
      context: { db },
    ): Promise<NationalPark | null> => {
      const nationalPark: NationalPark | null = context.db.nationalPark.findUnique({
        where: { id: parseInt(args.id) },
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

      return nationalPark
    },
  },
}

export default resolvers
