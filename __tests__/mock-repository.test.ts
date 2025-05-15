// __tests__/repositories.test.ts
import { ChatroomRepository } from '@/repositories/mock/ChatroomRepository'
import { MessageRepository } from '@/repositories/mock/MessageRepository'
import { UserRepository } from '@/repositories/mock/UserRepository'
import * as dummyDb from '@/repositories/mock/dummy/dummyDb'
import { v4 as uuidv4 } from 'uuid'

// Reset database before each test
beforeEach(() => {
    dummyDb.emptyAll()
})

describe('UserRepository', () => {
    const userRepo = new UserRepository()

    test('create user', async () => {
        const user = await userRepo.create({
            username: 'alice',
            password: 'hash1',
            publicKey: 'pubkey1',
        })

        expect(user.id).toBeDefined()
        expect(dummyDb.users).toHaveLength(1)
        expect(dummyDb.users[0].username).toBe('alice')
    })

    test('getById returns null for non-existent user', async () => {
        expect(await userRepo.getById('nonexistent')).toBeNull()
    })

    test('getByUsername returns null for non-existent user', async () => {
        expect(await userRepo.getByUsername('nonexistent')).toBeNull()
    })

    test('list users with pagination', async () => {
        // Create 5 test users
        for (let i = 0; i < 5; i++) {
            userRepo.create({
                username: `user${i}`,
                password: `pass${i}`,
                publicKey: `pubkey${i}`,
            })
        }

        const page1 = await userRepo.list(1, 2)
        expect(page1).toHaveLength(2)
        expect(page1[0].username).toBe('user0')

        const page3 = await userRepo.list(3, 2)
        expect(page3).toHaveLength(1)
        expect(page3[0].username).toBe('user4')
    })
})

describe('ChatroomRepository', () => {
    const chatroomRepo = new ChatroomRepository()
    const userRepo = new UserRepository()

    test('create chatroom', async () => {
        const user = await userRepo.create({
            username: 'alice',
            password: 'hash1',
            publicKey: 'pubkey1',
        })

        const chatroom = await chatroomRepo.create({
            members: [{ username: user.username, publicKey: user.publicKey }],
        })

        expect(chatroom.id).toBeDefined()
        expect(dummyDb.chatrooms).toHaveLength(1)
        expect(chatroom.members).toHaveLength(1)
        expect(chatroom.members[0].username).toBe('alice')

        // Verify initial chunk was created
        expect(dummyDb.messageChunks).toHaveLength(1)
        expect(dummyDb.messageChunks[0].chatroomId).toBe(chatroom.id)
        expect(dummyDb.messageChunks[0].chunkSequence).toBe(1)
    })

    test('getLastChunk returns correct chunk', async () => {
        const chatroom = await chatroomRepo.create({
            members: [{ username: 'alice', publicKey: 'pubkey1' }],
        })

        const chunk = chatroomRepo.getLastChunk(chatroom.id)
        expect(chunk).toBeDefined()
        expect(chunk?.chatroomId).toBe(chatroom.id)
    })
})

describe('MessageRepository', () => {
    const messageRepo = new MessageRepository()
    const chatroomRepo = new ChatroomRepository()
    const userRepo = new UserRepository()

    test('add message creates initial chunk', async () => {
        const user = await userRepo.create({
            username: 'alice',
            password: 'hash1',
            publicKey: 'pubkey1',
        })

        const chatroom = await chatroomRepo.create({
            members: [{ username: user.username, publicKey: user.publicKey }],
        })

        const message = await messageRepo.addMessage(chatroom.id, {
            senderUsername: 'alice',
            receiverUsername: 'bob',
            message: 'Hello!',
            sentAt: new Date(),
            messageHash: 'hash1',
            signature: { r: 'r1', s: 's1' },
        })

        // Verify chunk was created
        expect(dummyDb.messageChunks).toHaveLength(1)
        const chunk = dummyDb.messageChunks[0]
        expect(chunk.messages).toHaveLength(1)
        expect(chunk.messages[0].message).toBe('Hello!')

        // Verify chatroom lastMessage was updated
        expect(dummyDb.chatrooms[0].lastMessage).toBeDefined()
        expect(dummyDb.chatrooms[0].lastMessage?.message).toBe('Hello!')
    })

    test('messages are chunked correctly', async () => {
        const chatroom = await chatroomRepo.create({
            members: [{ username: 'alice', publicKey: 'pubkey1' }],
        })

        // Add exactly CHUNK_SIZE messages
        for (let i = 0; i < dummyDb.CHUNK_SIZE; i++) {
            await messageRepo.addMessage(chatroom.id, {
                senderUsername: 'alice',
                receiverUsername: 'bob',
                message: `Message ${i}`,
                sentAt: new Date(),
                messageHash: `hash${i}`,
                signature: { r: `r${i}`, s: `s${i}` },
            })
        }

        // Should still be in first chunk
        expect(dummyDb.messageChunks).toHaveLength(1)
        expect(dummyDb.messageChunks[0].messages).toHaveLength(
            dummyDb.CHUNK_SIZE
        )

        // Add one more message to trigger new chunk
        messageRepo.addMessage(chatroom.id, {
            senderUsername: 'alice',
            receiverUsername: 'bob',
            message: 'Last message',
            sentAt: new Date(),
            messageHash: 'lasthash',
            signature: { r: 'lastr', s: 'lasts' },
        })

        // Should now have two chunks
        expect(dummyDb.messageChunks).toHaveLength(2)
        expect(dummyDb.messageChunks[1].messages).toHaveLength(1)
        expect(dummyDb.messageChunks[1].chunkSequence).toBe(2)
    })

    test('getMessages returns correct chunk', async () => {
        const chatroom = await chatroomRepo.create({
            members: [{ username: 'alice', publicKey: 'pubkey1' }],
        })

        // Add messages to two different chunks
        for (let i = 0; i < dummyDb.CHUNK_SIZE + 1; i++) {
            await messageRepo.addMessage(chatroom.id, {
                senderUsername: 'alice',
                receiverUsername: 'bob',
                message: `Message ${i}`,
                sentAt: new Date(),
                messageHash: `hash${i}`,
                signature: { r: `r${i}`, s: `s${i}` },
            })
        }

        const chunk1Messages = await messageRepo.getMessages(chatroom.id, 1)
        expect(chunk1Messages).toHaveLength(dummyDb.CHUNK_SIZE)

        const chunk2Messages = await messageRepo.getMessages(chatroom.id, 2)
        expect(chunk2Messages).toHaveLength(1)
    })
})

describe('Integration: User with Chatrooms', () => {
    const userRepo = new UserRepository()
    const chatroomRepo = new ChatroomRepository()
    const messageRepo = new MessageRepository()

    test('listUserChatrooms returns user chatrooms', async () => {
        const user1 = await userRepo.create({
            username: 'alice',
            password: 'hash1',
            publicKey: 'pubkey1',
        })

        const user2 = await userRepo.create({
            username: 'bob',
            password: 'hash2',
            publicKey: 'pubkey2',
        })

        // Create chatrooms and associate with users
        const chatroom1 = await chatroomRepo.create({
            members: [
                { username: user1.username, publicKey: user1.publicKey },
                { username: user2.username, publicKey: user2.publicKey },
            ],
        })

        // Update user's chatroomIds (normally would be done in a service layer)
        user1.chatroomIds.push(chatroom1.id)
        user2.chatroomIds.push(chatroom1.id)

        // Add a message
        await messageRepo.addMessage(chatroom1.id, {
            senderUsername: user1.username,
            receiverUsername: user2.username,
            message: 'Hello Bob!',
            sentAt: new Date(),
            messageHash: 'msg1',
            signature: { r: 'r1', s: 's1' },
        })

        // Test the relationship
        const result = await userRepo.listUserChatrooms(user1.id)
        expect(result).not.toBeNull()
        expect(result).toHaveLength(1)
        expect(result[0].id).toBe(chatroom1.id)
        expect(result[0].lastMessage?.message).toBe('Hello Bob!')
    })
})
