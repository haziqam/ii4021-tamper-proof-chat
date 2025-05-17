import { ChatroomRepository } from '@/repositories/prisma/ChatroomRepository'
import { MessageRepository } from '@/repositories/prisma/MessageRepository'
import { UserRepository } from '@/repositories/prisma/UserRepository'

export const chatroomRepository = new ChatroomRepository()
export const messageRepository = new MessageRepository()
export const userRepository = new UserRepository()