import { ChatroomModel } from '@/models/Chatroom'
import { MessageModel } from '@/models/Message'
import { UserModel } from '@/models/User'

type MessageChunkModel = {
    id: string
    chatroomId: string
    createdAt: Date
    pageSequence: number
    messages: MessageModel[]
}

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
            pageSequence: 2,
            messages: [
                {
                    id: 'b4b42b94-0e5e-48d9-9f5d-8ce2e5a1ef20',
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
                    id: '95e103c3-48b0-4f7c-aab2-36cb4e0b3d8b',
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
                    id: '0e7f8b3f-fd43-42f8-8ac5-3a00c2e1f145',
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
                    id: '7c90dc8a-1344-42b4-b409-0b4e8fd065f2',
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
                    id: 'c7df1fbd-e15f-453e-8699-64d7d2cb9f4e',
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
                    id: '2a97dabe-92bb-4a6a-8165-77bd7a914ec9',
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
                    id: 'f78be5f5-3ae4-4b52-8cbe-f95cbb74bb85',
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
                    id: '857df6cf-6e02-4268-bdbc-c06c45378d62',
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
                    id: 'c2a77747-45d5-4f33-9c98-fd882d36a4cc',
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
                    id: 'a36cb4e1-f1e0-44df-a401-6a54e8dfed01',
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
                    id: '26786b50-84a2-4a98-a31f-b97f2c926ffd',
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
                    id: '32ec967d-73bc-464d-996f-172a6cf70dcd',
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
                    id: 'c949ea46-d0a6-4e7d-9d89-9947dbbd2cf6',
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
                    id: 'a48f2d5e-3a42-43f6-9220-04a34a73a0f9',
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
                    id: '3cd8045a-0c8a-48d0-9021-00139f19bd4c',
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
                    id: '59ad1a91-f7de-46d4-92f6-d161d4182789',
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
            pageSequence: 1,
            messages: [
                {
                    id: '3fc6cbea-07d5-4dd6-9cf0-74f538327fb6',
                    message: 'Hello world 17',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: 'aadcd1db-cc85-4c3a-86e4-24c25b9d1b2b',
                    message: 'Hello world 18',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: '7be06d23-5e0a-4fa6-b2d5-c97e3bd8d645',
                    message: 'Hello world 19',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: '8b2c68d0-5d4e-4d7f-80b8-5be85b64c04e',
                    message: 'Hello world 20',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: 'd27f4377-d0c0-4305-a1b3-b6ad5c6364ec',
                    message: 'Hello world 21',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: '0d4039c1-58fc-49c3-9e2e-cc44226321ed',
                    message: 'Hello world 22',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: 'b097ff62-1f11-4a90-8a20-2fd73450e4a2',
                    message: 'Hello world 23',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: 'f11388b5-4351-42ce-b1da-b9276553c95e',
                    message: 'Hello world 24',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: '3ef8585f-8fa2-49fc-bd84-3b2ed530c313',
                    message: 'Hello world 25',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: '70250408-8be4-493b-8db3-65b08c68a316',
                    message: 'Hello world 26',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: '6b5a3eb7-bf6d-4c63-8c08-5bbedc684a95',
                    message: 'Hello world 27',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: 'c4040e0a-7f35-4979-8d15-7e46c7e34c35',
                    message: 'Hello world 28',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: '2ea87b74-8019-40b1-8492-fb89d3e11f60',
                    message: 'Hello world 29',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: '3d9b3c83-bc5e-41c5-8739-c5c8322f8711',
                    message: 'Hello world 30',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: 'c9a17f92-9a61-4a1e-8350-352f5c3a37ae',
                    message: 'Hello world 31',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
                {
                    id: 'ae6a680f-963b-4cb6-8f4c-7c5449188ff5',
                    message: 'Hello world 32',
                    messageHash: 'asdfasdfasdfasf',
                    senderUsername: 'mfidelus1',
                    receiverUsername: 'haziqam',
                    sentAt: new Date(),
                    signature: { r: 'adsfadf', s: 'asdfafd' },
                },
            ],
        },
        {
            id: '7193799a-cafe-49d1-9724-b659c5decc7d',
            chatroomId: '71e9df5d-5a33-47da-b467-0600bbab5b86',
            createdAt: new Date(),
            pageSequence: 1,
            messages: [
                {
                    id: '59ad1a91-f7de-46d4-92f6-d161d4182743',
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
