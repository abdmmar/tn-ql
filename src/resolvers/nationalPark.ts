import { GraphQLResolveInfo } from 'graphql/type'
import { NationalPark } from 'types'
import { rateLimit } from '../utils'

const resolvers = {
  Query: {
    nationalParks: async (
      parent: unknown,
      args: Record<string, unknown>,
      context: { db },
      info: GraphQLResolveInfo,
    ): Promise<NationalPark[]> => {
      await rateLimit({ parent, args, context, info }, { max: 5, window: '10s' })

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
      parent: unknown,
      args: { id: string },
      context: { db },
      info: GraphQLResolveInfo,
    ): Promise<NationalPark | null> => {
      await rateLimit({ parent, args, context, info }, { max: 5, window: '10s' })

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
