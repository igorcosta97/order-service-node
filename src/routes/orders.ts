import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function orderRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })
  // Todas as ordens
  app.get('/order', async () => {
    const response = await prisma.order.findMany({
      orderBy: {
        ordemNumber: 'desc',
      },
    })
    return response
  })

  // Ordens Aprovadas
  // Ordens Em Andamento
  // Ordens Finalizadas

  // Ordem única
  app.get('/order/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)
    const response = await prisma.order.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return response
  })

  // Criar Order
  app.post('/order', async (request) => {
    const bodySchema = z.object({
      description: z.string(),
      status: z.string(),
      clientId: z.string().uuid(),
    })

    const { description, status, clientId } = bodySchema.parse(request.body)

    const response = await prisma.order.create({
      data: {
        description,
        status,
        clientId,
      },
    })
    return response
  })

  // Editar Ordem
  app.put('/order/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      description: z.string(),
      status: z.string(),
      clientId: z.string().uuid(),
    })

    const { description, status, clientId } = bodySchema.parse(request.body)

    const response = await prisma.order.update({
      where: {
        id,
      },
      data: {
        description,
        status,
        clientId,
      },
    })
    return response
  })

  // Deletar Cliente
  app.delete('/order/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prisma.service.deleteMany({
      where: {
        orderId: id,
      },
    })

    const response = await prisma.order.delete({
      where: {
        id,
      },
    })
    return response
  })
}
