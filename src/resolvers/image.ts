import { Image } from 'types'

const resolvers = {
  Query: {
    images: async (_parents: unknown, _args: unknown, context: { db }): Promise<Image[]> => {
      const images: Image[] = context.db.image.findMany({
        include: {
          license: true,
        },
      })

      return images
    },
    image: async (_parents: unknown, args: { id: string }, context: { db }): Promise<Image | null> => {
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
