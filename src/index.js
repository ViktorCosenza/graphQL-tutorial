import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Link from './resolvers/Link'
import Vote from './resolvers/Vote'

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
}

const server = new GraphQLServer({
  typeDefs: './src/schemas/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma
  })
})

export default server
