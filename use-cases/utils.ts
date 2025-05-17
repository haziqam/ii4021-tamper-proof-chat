import { hash, compare } from 'bcrypt'

const SALT_ROUNDS = 10

export async function saltPassword(plainPassword: string): Promise<string> {
    return await hash(plainPassword, SALT_ROUNDS);
}

export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
}