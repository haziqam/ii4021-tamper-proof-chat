'use client'

import { KeyPair } from '@/types/crypto'
import { ec as EC } from 'elliptic'

export function generateKeyPair(): KeyPair {
    const ec = new EC('secp256k1')
    const keyPair = ec.genKeyPair()
    const privateKey = keyPair.getPrivate('hex')
    const publicKey = keyPair.getPublic('hex')

    return {
        publicKey,
        privateKey,
    }
}
