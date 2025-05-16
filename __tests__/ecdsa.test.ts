import { ec as EC } from 'elliptic'
import { Message } from '@/types/chat'
import { signMessage } from '@/use-cases/signMessage'
import { verifySignedMessage } from '@/use-cases/verifyMessage'

const ec = new EC('secp256k1')

describe('`ECDSA` signing and verification', () => {
    const keyPair = ec.genKeyPair()
    const privateKey = keyPair.getPrivate('hex')
    const publicKey = keyPair.getPublic('hex')

    const message: Message = {
        senderUsername: 'alice',
        receiverUsername: 'bob',
        message: 'Hello Bob!',
        sentAt: new Date(),
    }

    it('signs and verifies a message', () => {
        const signed = signMessage(message, privateKey)
        const isValid = verifySignedMessage(signed, publicKey)
        expect(isValid).toBe(true)
    })

    it('fails verification for tampered message', () => {
        const signed = signMessage(message, privateKey)
        signed.message = 'Tampered'
        const isValid = verifySignedMessage(signed, publicKey)
        expect(isValid).toBe(false)
    })
})
