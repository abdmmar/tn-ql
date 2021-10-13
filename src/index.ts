import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const PORT = process.env.PORT || 4000

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  })

  const { url } = await server.listen(PORT)
  console.log(`🚀 Server is running on ${url}`)
}

startServer()
