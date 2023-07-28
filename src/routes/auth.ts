import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcrypt'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth', async (request) => {
    const bodySchema = z.object({
      username: z.string(),
      password: z.string(),
    })

    const { username, password } = bodySchema.parse(request.body)
    console.log(username + ' ' + password)

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })
    console.log(user)
    if (user) {
      const userPassword = user.password
      const passwordIsValid = await bcrypt.compare(password, userPassword)

      if (passwordIsValid) {
        const token = app.jwt.sign(
          {
            name: user.name,
          },
          {
            sub: user.id,
            expiresIn: '30 daya',
          },
        )
        return { token }
      }
    }
  })
}
