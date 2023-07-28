import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function serviceRoute(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  // Listar todos servicos relacionados a determinada ordem
  app.get('/service', async (request) => {
    const bodySchema = z.object({
      orderId: z.string().uuid(),
    })

    const { orderId } = bodySchema.parse(request.body)

    const response = await prisma.service.findMany({
      where: {
        orderId,
      },
    })
    return response
  })

  // Listar serviço único
  app.get('/service/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const response = await prisma.service.findMany({
      where: {
        id,
      },
    })
    return response
  })

  // Criar Servico
  app.post('/service', async (request) => {
    const bodySchema = z.object({
      model: z.string(),
      brand: z.string(),
      description: z.string(),
      unitAmmount: z.string(),
      observation: z.string(),
      orderId: z.string().uuid(),
    })

    const { model, brand, description, unitAmmount, observation, orderId } =
      bodySchema.parse(request.body)

    const response = await prisma.service.create({
      data: {
        model,
        brand,
        description,
        unitAmmount,
        observation,
        orderId,
      },
    })

    return response
  })
  // Editar Servico
  app.put('/service/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      model: z.string(),
      brand: z.string(),
      description: z.string(),
      unitAmmount: z.string(),
      observation: z.string(),
      orderId: z.string().uuid(),
    })

    const { model, brand, description, unitAmmount, observation, orderId } =
      bodySchema.parse(request.body)

    const response = await prisma.service.update({
      where: {
        id,
      },
      data: {
        model,
        brand,
        description,
        unitAmmount,
        observation,
        orderId,
      },
    })

    return response
  })

  // Deletar Servico
  app.delete('/service/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const response = await prisma.service.delete({
      where: {
        id,
      },
    })

    return response
  })
}
