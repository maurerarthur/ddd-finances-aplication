import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { PrismaClient, Prisma } from '@prisma/client'
import { CreateClient } from '../core/use-cases/Client/create-client'

const prisma = new PrismaClient()

export const ClientSignup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const client = await CreateClient({ name, email, password })

  if (client.error) {
    return res.status(400).send(client)
  }

  const create = async () => {
    try {
      const createdClient = await prisma.client.create({
        data: client
      })

      return res.status(201).send(createdClient)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(409).send({ error: true, message: 'The email already exists.' })
        }

        throw error
      }
    }
  }

  create().finally(async () => await prisma.$disconnect())
}

export const ClientSignin = (req: Request, res: Response) => {
  const { email, password } = req.body

  const find = async () => {
    try {
      const client = await prisma.client.findUnique({
        where: {
          email
        }
      })

      if (!client) {
        return res.status(204).send({
          error: true,
          message: 'Client not found.'
        })
      }

      const clientData = {
        id: client.id,
        email: client.email,
        name: client.name
      }

      const token = sign(clientData, process.env.JWT_SECRET!.toString(), {
        expiresIn: process.env.JWT_EXPIRY!.toString()
      })

      if (await compare(password, client?.password)) {
        return res.status(200).send({
          ...clientData,
          token
        })
      }

      return res.status(403).send({
        error: true,
        message: 'Wrong email or password.'
      })
    } catch (error) {
      throw error
    }
  }

  find().finally(async () => await prisma.$disconnect())
}
