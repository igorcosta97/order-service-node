import fastify from 'fastify'
import cors from '@fastify/cors'
import { clientRoutes } from './routes/clients'
import { orderRoutes } from './routes/orders'
import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/users'
import { serviceRoute } from './routes/services'
import jwt from '@fastify/jwt'

const app = fastify()

app.register(authRoutes)
app.register(userRoutes)
app.register(clientRoutes)
app.register(orderRoutes)
app.register(serviceRoute)
app.register(cors, {
  origin: true,
})
app.register(jwt, {
  secret: 'lskeieprepokfs3ds889494ieuueu3twuwuuwuedkkc',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 Servidor rodando na porta 3333')
  })
