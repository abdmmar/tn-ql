import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { PrismaClient } from '@prisma/client'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const PORT = process.env.PORT || 4000

async function startServer() {
  const db = new PrismaClient()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: {
      db,
    },
  })

  const { url } = await server.listen(PORT)
  console.log(`🚀 Server is running on ${url}`)
}

startServer()
