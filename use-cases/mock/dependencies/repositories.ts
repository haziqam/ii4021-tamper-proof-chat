import { ChatroomRepository } from '@/repositories/mock/ChatroomRepository'
import { MessageRepository } from '@/repositories/mock/MessageRepository'
import { UserRepository } from '@/repositories/mock/UserRepository'

export const chatroomRepository = new ChatroomRepository()
export const messageRepository = new MessageRepository()
export const userRepository = new UserRepository()
