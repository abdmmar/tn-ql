import { ApolloServer } from 'apollo-server'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const PORT = process.env.PORT || 4000

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers })

  server.listen(PORT).then(({ url }) => {
    console.log(`🚀 Server is running on ${url}`)
  })
}

startServer()
