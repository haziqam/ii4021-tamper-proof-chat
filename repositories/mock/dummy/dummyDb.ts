import { ChatroomModel } from '@/models/Chatroom'
import { MessageChunkModel } from '@/models/Message'
import { UserModel } from '@/models/User'

declare global {
    var __mockDb:
        | {
              users: UserModel[]
              chatrooms: ChatroomModel[]
              messageChunks: MessageChunkModel[]
          }
        | undefined
}

global.__mockDb = global.__mockDb || {
    users: [
        {
            id: '8df5ce62-4f24-42c5-bdf4-8f32d5ec9023',
            username: 'haziqam',
            password: 'haziqam',
            publicKey: '01JTZ8J44W9PQHN4DEV26P0NTP',
            chatroomIds: [
                '72944dc3-ae31-4d84-8e81-dcdf1c85abf7',
                '71e9df5d-5a33-47da-b467-0600bbab5b86',
            ],
        },
        {
            id: 'd7fa6b3d-f2ec-4ba0-99d2-422bcf81ba20',
            username: 'mfidelus1',
            password: 'b7|%bD+V',
            publicKey: '01JTZ8J44XDWCKNVPDQG100RTN',
            chatroomIds: ['72944dc3-ae31-4d84-8e81-dcdf1c85abf7'],
        },
        {
            id: '901b6c83-bf54-4591-a1c5-fb69747b4aaf',
            username: 'jbelcher2',
            password: 'x9<)>yo0YTdilnlo',
            publicKey: '01JTZ8J44Y662YXC6K7AMXME5G',
            chatroomIds: ['71e9df5d-5a33-47da-b467-0600bbab5b86'],
        },
        {
            id: 'df76e52d-d00c-4c44-b2f5-a2aa1ae6a835',
            username: 'fclampe3',
            password: 'p4/hy|Q~)_7cwx',
            publicKey: '01JTZ8J44Z2XVR7XE7VS7X200Z',
            chatroomIds: [],
        },
        {
            id: '773f3d48-d138-4a9a-8d43-9cc99b99faac',
            username: 'nlomb4',
            password: 'r8?TiTDBd',
            publicKey: '01JTZ8J450842P5DE3HQX6ZSV4',
            chatroomIds: [],
        },
        {
            id: 'd7921b0a-e231-4a6a-9a50-658fffd9897e',
            username: 'wocalleran5',
            password: 's7~Ghgva*Z#(',
            publicKey: '01JTZ8J451W5SC0CP2087BAC12',
            chatroomIds: [],
        },
        {
            id: 'ed8edbee-6eba-47dc-98bc-69a2c64ef48e',
            username: 'abiasetti6',
            password: 'z4!Nr.6$6',
            publicKey: '01JTZ8J451WM2WP4SXG4E6R910',
            chatroomIds: [],
        },
    ],
    chatrooms: [
        {
            id: '72944dc3-ae31-4d84-8e81-dcdf1c85abf7',
            members: [
                {
                    username: 'haziqam',
                    publicKey: '01JTZ8J44W9PQHN4DEV26P0NTP',
                },
                {
                    username: 'mfidelus1',
                    publicKey: '01JTZ8J44XDWCKNVPDQG100RTN',
                },
            ],
            createdAt: new Date(),
        },
        {
            id: '71e9df5d-5a33-47da-b467-0600bbab5b86',
            members: [
                {
                    username: 'haziqam',
                    publicKey: '01JTZ8J44W9PQHN4DEV26P0NTP',
                },
                {
                    username: 'jbelcher2',
                    publicKey: '01JTZ8J44Y662YXC6K7AMXME5G',
                },
            ],
            createdAt: new Date(),
        },
    ],
    messageChunks: [
        {
            id: 'd1cccc3e-6116-4447-bc7f-29eb9c6606c7',
            chatroomId: '72944dc3-ae31-4d84-8e81-dcdf1c85abf7',
            createdAt: new Date(),
            chunkSequence: 2,
            messages: [
                {
                    message: 'Hello world 1',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 2',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 3',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 4',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 5',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 6',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 7',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 8',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 9',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 10',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 11',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 12',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 13',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 14',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 15',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world 16',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
            ],
        },
        {
            id: 'fd40567f-deb9-4cae-9eeb-d3458afe7bed',
            chatroomId: '72944dc3-ae31-4d84-8e81-dcdf1c85abf7',
            createdAt: new Date(),
            chunkSequence: 1,
            messages: [
                {
                    message: 'Hello world a',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
                {
                    message: 'Hello world b',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'mfidelus1',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
            ],
        },
        {
            id: '7193799a-cafe-49d1-9724-b659c5decc7d',
            chatroomId: '71e9df5d-5a33-47da-b467-0600bbab5b86',
            createdAt: new Date(),
            chunkSequence: 1,
            messages: [
                {
                    message: 'Hello world',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'haziqam',
                    receiverUsername: 'jbelcher2',
                    sentAt: new Date(),
                    signature: {
                        r: 'adsfadf',
                        s: 'asdfafd',
                    },
                },
            ],
        },
    ],
}

export const users = global.__mockDb.users
export const chatrooms = global.__mockDb.chatrooms
export const messageChunks = global.__mockDb.messageChunks

export const CHUNK_SIZE = 16

export function emptyAll() {
    global.__mockDb?.users.splice(0)
    global.__mockDb?.chatrooms.splice(0)
    global.__mockDb?.messageChunks.splice(0)
}
