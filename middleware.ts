import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { JWTExpired } from 'jose/errors'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('access-token')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    try {
        await jwtVerify(token, secret)
        return NextResponse.next()
    } catch (err) {
        if (err instanceof JWTExpired) {
            return NextResponse.redirect(
                new URL('/login?error=session-expired', req.url)
            )
        }
        return NextResponse.redirect(
            new URL('/login?error=invalid-token', req.url)
        )
    }
}

export const config = {
    matcher: ['/((?!login|register|api|_next|favicon.ico).*)'],
}
