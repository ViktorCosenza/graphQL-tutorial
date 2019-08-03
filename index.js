import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    info: String!
  }
`

const resolvers = {
  Query: {
    info: () => 'aaaaa'
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log(`Running at localhost:4000`))
