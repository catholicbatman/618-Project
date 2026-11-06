import express from 'express'
import { userRoutes } from './routes/users.js'
import { recipesRoutes } from './routes/recipes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { eventRoutes } from './routes/events.js'
import { ApolloServer } from '@apollo/server'
import { typeDefs, resolvers } from './graphql/index.js'
import { expressMiddleware } from '@apollo/server/express4'
import { optionalAuth } from './middleware/jwt.js'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

apolloServer.start().then(() =>
  app.use(
    '/graphql',
    optionalAuth,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { auth: req.auth }
      },
    }),
  ),
)

recipesRoutes(app)
userRoutes(app)
eventRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express live!')
})

export { app }
