'use client'

let cachedPrivateKey: string | null = null

export async function getPrivateKey(username: string): Promise<string | null> {
    if (cachedPrivateKey) {
        return cachedPrivateKey
    }

    try {
        const opfsRoot = await navigator.storage.getDirectory()

        const fileHandle = await opfsRoot.getFileHandle(
            `${username}-pk-ecdsa`,
            { create: false }
        )

        const file = await fileHandle.getFile()
        const text = await file.text()

        cachedPrivateKey = text
        return text
    } catch (err: any) {
        if (err.name === 'NotFoundError') {
            return null
        }
        throw err
    }
}

export async function setPrivateKey(
    username: string,
    privateKey: string
): Promise<void> {
    const opfsRoot = await navigator.storage.getDirectory()
    const fileHandle = await opfsRoot.getFileHandle(`${username}-pk-ecdsa`, {
        create: true,
    })

    const writable = await fileHandle.createWritable()
    await writable.write(privateKey)
    await writable.close()
}
