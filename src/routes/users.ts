import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcrypt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string(),
      username: z.string(),
      password: z.string(),
    })

    const { name, email, username, password } = bodySchema.parse(request.body)

    const newPassword = await bcrypt.hash(password, 10)

    const response = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: newPassword,
        avatarUrl: '',
        gitHubId: '',
        googleId: '',
        login: '',
      },
    })
    return response
  })
}
