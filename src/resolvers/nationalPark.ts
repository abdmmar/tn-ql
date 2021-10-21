import { NationalPark } from 'types'

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
