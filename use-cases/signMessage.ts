'use client'

import { Message, SignedMessage } from '@/types/chat'
import { sha3_256 } from 'js-sha3'
import { ec as EC } from 'elliptic'

const ec = new EC('secp256k1')

export function hashMessage(message: Omit<Message, 'id'>): string {
    const canonicalMessage = {
        ...message,
        sentAt: message.sentAt.toISOString(),
    }
    const msgString = JSON.stringify(
        canonicalMessage,
        Object.keys(canonicalMessage).sort()
    )
    return sha3_256(msgString)
}

export function signMessage(
    message: Omit<Message, 'id'>,
    privateKey: string
): Omit<SignedMessage, 'id'> {
    const msgHash = hashMessage(message)

    const key = ec.keyFromPrivate(privateKey, 'hex')
    const signature = key.sign(msgHash, { canonical: true })

    return {
        ...message,
        messageHash: msgHash,
        signature: {
            r: signature.r.toString('hex'),
            s: signature.s.toString('hex'),
        },
    }
}
