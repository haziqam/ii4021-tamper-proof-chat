"use server"

import { PrismaClient, Prisma } from '../generated/prisma'

const prisma = new PrismaClient()

async function getUsers() {
  // ... you will write your Prisma Client queries here
}

export async function registerUser(username: string, password: string, publicKey: string) {
    let user: Prisma.UserCreateInput
    user = {
        username: username,
        password: password,
        publicKey: publicKey,
    }

    const createUser = await prisma.user.create({ data: {
        username: username,
        password: password,
        publicKey: publicKey,
    } })

    console.log(createUser)
    return createUser
}

export async function getChats(id: string) {
    const a = 10
}