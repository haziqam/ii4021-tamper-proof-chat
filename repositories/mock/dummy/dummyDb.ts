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
            username: 'bhartley0',
            password: 'b7_R9v{h1o&zIO',
            publicKey: '01JTZ8J44W9PQHN4DEV26P0NTP',
            chatroomIds: [],
        },
        {
            id: 'd7fa6b3d-f2ec-4ba0-99d2-422bcf81ba20',
            username: 'mfidelus1',
            password: 'b7|%bD+V',
            publicKey: '01JTZ8J44XDWCKNVPDQG100RTN',
            chatroomIds: [],
        },
        {
            id: '901b6c83-bf54-4591-a1c5-fb69747b4aaf',
            username: 'jbelcher2',
            password: 'x9<)>yo0YTdilnlo',
            publicKey: '01JTZ8J44Y662YXC6K7AMXME5G',
            chatroomIds: [],
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
        {
            id: 'b65a3426-f478-4223-9d6f-c1d3f5eead53',
            username: 'gtreves7',
            password: 'z6"d8T\'*isRpF',
            publicKey: '01JTZ8J4523NQ79XTME61M9PH4',
            chatroomIds: [],
        },
        {
            id: 'aad924ff-2a9d-4673-93ad-4e8611ec72d7',
            username: 'gtokell8',
            password: 'n7@mFL_/M0)94a_',
            publicKey: '01JTZ8J45344GXNCR5AFXFJXN9',
            chatroomIds: [],
        },
        {
            id: '02f5cc55-82ec-43a2-8b51-d200d819308c',
            username: 'tlavery9',
            password: 'k6@La1pnLIP',
            publicKey: '01JTZ8J453PTNP15K3KFFJF68Q',
            chatroomIds: [],
        },
        {
            id: 'b914e34b-7c59-4ec8-a9f4-e19bc0db73b7',
            username: 'clamorta',
            password: 'p5<)+#OA6W',
            publicKey: '01JTZ8J454SETV4JXJ808GRFM2',
            chatroomIds: [],
        },
        {
            id: 'dfacc585-ade3-42fb-b7db-388b8c9a8bc6',
            username: 'dhailyb',
            password: 'b8+Nm84#',
            publicKey: '01JTZ8J455Q35M3055V9J5BNXM',
            chatroomIds: [],
        },
        {
            id: 'c68b241f-ff4d-4130-9603-2ca82f183991',
            username: 'aborzonec',
            password: 'p6"aqJLOk~',
            publicKey: '01JTZ8J455A5WG9DTX4VT36JJG',
            chatroomIds: [],
        },
        {
            id: 'cf1191b0-0cf7-47bb-be3a-73b4e94f4fee',
            username: 'rmatousekd',
            password: 'v5,407{.',
            publicKey: '01JTZ8J456BWS37ZR6SDJXZYW1',
            chatroomIds: [],
        },
        {
            id: '1087026e-8fcc-4413-b5c6-bb0c251da8b9',
            username: 'dpralle',
            password: "d9%gbyv%~VK?M_F'",
            publicKey: '01JTZ8J457FHN6MH0KRS8Q8ZS6',
            chatroomIds: [],
        },
        {
            id: 'f3fead8d-298d-48fe-9413-d6fe3f2abc3f',
            username: 'spainf',
            password: 'u2/Ec(/z@Cq9vqBv',
            publicKey: '01JTZ8J457CMJP3RDPFVT8RA20',
            chatroomIds: [],
        },
        {
            id: 'a1a7d071-dabe-4bf1-adbf-88aa956b6383',
            username: 'labrahmg',
            password: 'w6,oOL!.',
            publicKey: '01JTZ8J45880R2QNJKFHD9JV84',
            chatroomIds: [],
        },
        {
            id: '39f2e4ca-fd0e-4328-a516-2ef81c0e1e15',
            username: 'nicetonh',
            password: 'r9\\DCOdAs',
            publicKey: '01JTZ8J459JTGFS3FF3DQ94EGT',
            chatroomIds: [],
        },
        {
            id: '6902dd76-7354-4554-b1b3-e49ddab7b770',
            username: 'ebraunsi',
            password: 'j0&8o`{rfz',
            publicKey: '01JTZ8J459MDBHHEHZFMZTYJT3',
            chatroomIds: [],
        },
        {
            id: 'c1944527-aa05-47a6-9a4d-078ee5dce575',
            username: 'lguisbyj',
            password: 'q5&ICpqcWn6!Z"wt',
            publicKey: '01JTZ8J45ADTS5ZD0F8EJ8YPBB',
            chatroomIds: [],
        },
        {
            id: '9ecb385c-dde5-45c8-b536-9821d90ad64b',
            username: 'jflamentk',
            password: 'v0_ywYn"xun3j}',
            publicKey: '01JTZ8J45BM51BN7XWCR6QE1SW',
            chatroomIds: [],
        },
        {
            id: 'e96db157-e78e-426e-936f-b874a7f2850d',
            username: 'tedgleyl',
            password: 't1,7|f}E"so',
            publicKey: '01JTZ8J45D3W3QA3XVWAWECXWW',
            chatroomIds: [],
        },
        {
            id: '29444ed3-5e47-4355-b852-98116cf53895',
            username: 'mposkittm',
            password: 'j1=aHe,_gXUXt8{N',
            publicKey: '01JTZ8J45EEVBRWSJNEK839E6N',
            chatroomIds: [],
        },
        {
            id: '2d2e31e7-5acf-40f7-a070-ffec2939f0f5',
            username: 'efellonn',
            password: "q7@IhRnY\\'URZ",
            publicKey: '01JTZ8J45FNX1E3ADNWQFMXEAD',
            chatroomIds: [],
        },
        {
            id: '887ae6c1-cd61-4aad-a4a2-9cdf7eb9d987',
            username: 'rboorneo',
            password: 'r9#T$fm+am%',
            publicKey: '01JTZ8J45G1XV58NWAXQRDZG48',
            chatroomIds: [],
        },
        {
            id: '84457c05-4f7c-49c7-8489-e05d910d84a2',
            username: 'cphythianp',
            password: 'y3.xs>F`q=eVgKH',
            publicKey: '01JTZ8J45H8CE1E19VPH25FAHV',
            chatroomIds: [],
        },
        {
            id: 'fe525bae-1a02-4cae-a9bb-bea27507223d',
            username: 'mfoyq',
            password: 't8(w)$f9|5NMW',
            publicKey: '01JTZ8J45JN4T8Y12BX0HS6YW1',
            chatroomIds: [],
        },
        {
            id: '8ed36e5c-4547-4e77-bb76-5b6eb6b81f16',
            username: 'tfeldhammerr',
            password: "c4=6/chSf*M'fp6d",
            publicKey: '01JTZ8J45K09M9NPQ5KQF3B4FE',
            chatroomIds: [],
        },
        {
            id: 'a082105d-9bfc-4123-95d7-201d77a96e60',
            username: 'taspitals',
            password: 'b4>?Hz7<8\\a(i=v',
            publicKey: '01JTZ8J45KWCJCGFHA4C7DZ8K0',
            chatroomIds: [],
        },
        {
            id: '810910ca-8ddd-4463-81f2-dc326ddc3e54',
            username: 'aseegart',
            password: 'i0`&tKaSSI.P5',
            publicKey: '01JTZ8J45MWFQKGTERRAJNHW86',
            chatroomIds: [],
        },
        {
            id: '11afa4e2-9f82-4a9c-ab1a-d0eec6d9d827',
            username: 'ainceu',
            password: 'j6$zgwAFx5QDoBn',
            publicKey: '01JTZ8J45NPFP83HDP1EHYAR3G',
            chatroomIds: [],
        },
        {
            id: 'ad9ded94-f945-480d-89ff-359e19c86f76',
            username: 'nchildv',
            password: 'n4&BL$QEKa#(',
            publicKey: '01JTZ8J45NAX33NS87X16J8CVK',
            chatroomIds: [],
        },
        {
            id: 'aebdbede-0d35-407e-b3fd-30355dbe6624',
            username: 'lfugglew',
            password: 'r1<MF|*!)N',
            publicKey: '01JTZ8J45P4ZW9H3DT5B6XYS0K',
            chatroomIds: [],
        },
        {
            id: '96cc4638-377d-49f0-a482-fda477b03a2c',
            username: 'aawtyx',
            password: 'q1)#FWH$',
            publicKey: '01JTZ8J45QVXR21GBKT3VQH9MB',
            chatroomIds: [],
        },
        {
            id: '241329ac-9497-450e-bd20-a46d53dc365e',
            username: 'adytery',
            password: 'g9|xM*oPU3+8|',
            publicKey: '01JTZ8J45Q4VEC3H7QF29HJ3P8',
            chatroomIds: [],
        },
        {
            id: 'da0f4994-9deb-4f99-be98-dd8991f0b7ce',
            username: 'mdinsez',
            password: 'l8|tinhp',
            publicKey: '01JTZ8J45RCWDDHENRC81MWJM7',
            chatroomIds: [],
        },
        {
            id: '27623fbf-7e2c-4bc7-9c6a-d21f42bc239d',
            username: 'lmerredy10',
            password: 'k8<?3jQuA*@',
            publicKey: '01JTZ8J45SVM7SZV8J3GTNHD7K',
            chatroomIds: [],
        },
        {
            id: 'c74f0d6d-26c0-45aa-aae8-d42d0f46104d',
            username: 'jaish11',
            password: "z0'4{#{hVh+",
            publicKey: '01JTZ8J45SYFMBVGKNP5TQ91ZT',
            chatroomIds: [],
        },
        {
            id: '5bcefe4c-1820-4f94-ab3b-873da6210dd3',
            username: 'lchatwood12',
            password: 'g6\\+oLd*9BP}v',
            publicKey: '01JTZ8J45T3VPK9VA1Q6AYF9B4',
            chatroomIds: [],
        },
        {
            id: '32b3917d-0015-46eb-8304-47588c2d36b9',
            username: 'wlangman13',
            password: 'p3"Y+tyje',
            publicKey: '01JTZ8J45TEH3S7ARDEPVNB9NN',
            chatroomIds: [],
        },
        {
            id: '4a063a54-ba36-40a5-951b-b2b2891ae075',
            username: 'bblaycock14',
            password: 'm0|C/b5J',
            publicKey: '01JTZ8J45VMDX06XTPTG4B6N5G',
            chatroomIds: [],
        },
        {
            id: '9bf3e991-1c32-4648-b7e1-2c4dac169296',
            username: 'bfroment15',
            password: 'v6)Ocuw2P{{P>l',
            publicKey: '01JTZ8J45W33EHKDP7H8XBS6ZA',
            chatroomIds: [],
        },
        {
            id: '1611d33d-d123-4a78-bb83-4bf88e048d58',
            username: 'qsey16',
            password: 'a7$8>bk8O)qgK#',
            publicKey: '01JTZ8J45XEJTHRRN35YFD3NM4',
            chatroomIds: [],
        },
        {
            id: '9c8705e3-f795-4b0b-ab5c-17dc23ff1776',
            username: 'mdearl17',
            password: 'c8_kZgiYg!r%',
            publicKey: '01JTZ8J45YZ7K4B9HERWWYJX8X',
            chatroomIds: [],
        },
        {
            id: '3ded6ee5-8e2c-40e6-88d5-32eef8038a5f',
            username: 'kchittem18',
            password: "v5*'C+qh",
            publicKey: '01JTZ8J45ZXKZ9APPZAV57V1EV',
            chatroomIds: [],
        },
        {
            id: '14f9e699-b811-42ee-96b8-0251bea02a0b',
            username: 'sglazzard19',
            password: 'c9.?iN8BxuCr{',
            publicKey: '01JTZ8J460WHXPZ0BP8SC3HG46',
            chatroomIds: [],
        },
        {
            id: 'e817023a-0e45-4694-afb9-c0cc6e843328',
            username: 'rscyner1a',
            password: 'y7?_MvKQ',
            publicKey: '01JTZ8J4609JGBEAH3RK3R5A6F',
            chatroomIds: [],
        },
        {
            id: '92381496-019e-4767-a184-374b5877fb85',
            username: 'dcarley1b',
            password: 'e7(kmGRWq',
            publicKey: '01JTZ8J461GN6ZKYFPCDZ4M8DG',
            chatroomIds: [],
        },
        {
            id: '04b20e39-70e3-49f5-bc0c-fa7c05a53519',
            username: 'kmew1c',
            password: 'm1!hc#qfU~',
            publicKey: '01JTZ8J462Y2F5M65F4KG7PWTM',
            chatroomIds: [],
        },
        {
            id: '2a6b9933-8bf0-4e8d-a312-75652c690149',
            username: 'istratz1d',
            password: "w2@%=*mRmZn'",
            publicKey: '01JTZ8J462Y15GPPHV42KZ2CZA',
            chatroomIds: [],
        },
    ],
    chatrooms: [],
    messageChunks: [],
}

export const users = global.__mockDb.users
export const chatrooms = global.__mockDb.chatrooms
export const messageChunks = global.__mockDb.messageChunks

export const CHUNK_SIZE = 32

export function emptyAll() {
    global.__mockDb = {
        users: [],
        chatrooms: [],
        messageChunks: [],
    }
}
