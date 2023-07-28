import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function clientRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })
  // Listar todos os clientes
  app.get('/client', async () => {
    const response = await prisma.client.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return response
  })

  // Listar um único cliente
  app.get('/client/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const response = await prisma.client.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return response
  })

  app.post('/client/name', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
    })

    console.log(request.body)
    const { name } = bodySchema.parse(request.body)

    const response = await prisma.client.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })
    return response
  })

  // Criar Cliente
  app.post('/client', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string(),
      address: z.string(),
      district: z.string(),
      city: z.string(),
      cep: z.string(),
      phoneNumber: z.string(),
    })

    const { name, email, address, district, city, cep, phoneNumber } =
      bodySchema.parse(request.body)

    console.log(
      name +
        ' ' +
        email +
        ' ' +
        address +
        ' ' +
        district +
        ' ' +
        city +
        ' ' +
        cep +
        ' ' +
        phoneNumber,
    )
    const response = await prisma.client.create({
      data: {
        name,
        email,
        address,
        district,
        city,
        cep,
        phoneNumber,
      },
    })
    return response
  })

  // Editar Cliente
  app.put('/client/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      name: z.string(),
      email: z.string(),
      address: z.string(),
      district: z.string(),
      city: z.string(),
      cep: z.string(),
      phoneNumber: z.string(),
    })

    const { name, email, address, district, city, cep, phoneNumber } =
      bodySchema.parse(request.body)

    const response = await prisma.client.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        address,
        district,
        city,
        cep,
        phoneNumber,
      },
    })
    return response
  })

  // Deletar Cliente
  app.delete('/client/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const response = await prisma.client.delete({
      where: {
        id,
      },
    })
    return response
  })
}
