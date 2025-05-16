'use client'

import { ec as EC } from 'elliptic'
import { Message, SignedMessage } from '@/types/chat'
import { hashMessage } from './signMessage'

const ec = new EC('secp256k1')

function extractMessage(signed: SignedMessage): Omit<Message, 'id'> {
    const { senderUsername, receiverUsername, message, sentAt } = signed
    return { senderUsername, receiverUsername, message, sentAt }
}

export function verifySignedMessage(
    signedMessage: SignedMessage,
    publicKey: string
): boolean {
    const message = extractMessage(signedMessage)
    const hash = hashMessage(message)

    if (hash !== signedMessage.messageHash) return false

    const key = ec.keyFromPublic(publicKey, 'hex')

    return key.verify(hash, {
        r: signedMessage.signature.r,
        s: signedMessage.signature.s,
    })
}
