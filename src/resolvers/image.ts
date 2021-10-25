import { GraphQLResolveInfo } from 'graphql/type'
import { Image } from 'types'
import { rateLimit } from '../utils'

const resolvers = {
  Query: {
    images: async (
      parent: unknown,
      args: Record<string, any>,
      context: { db },
      info: GraphQLResolveInfo,
    ): Promise<Image[]> => {
      await rateLimit({ parent, args, context, info }, { max: 5, window: '10s' })

      const images: Image[] = context.db.image.findMany({
        include: {
          license: true,
        },
      })

      return images
    },
    image: async (
      parent: unknown,
      args: { id: string },
      context: { db },
      info: GraphQLResolveInfo,
    ): Promise<Image | null> => {
      await rateLimit({ parent, args, context, info }, { max: 5, window: '10s' })

      const image: Image | null = context.db.image.findUnique({
        where: { id: parseInt(args.id) },
        include: {
          license: true,
        },
      })

      return image
    },
  },
}

export default resolvers
