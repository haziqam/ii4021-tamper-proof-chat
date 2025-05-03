'use client'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '@/use-case/mock/login'
import { FormEventHandler } from 'react'

export function LoginForm() {
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        login({
            username: '',
            password: '',
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login to KriptoChat</CardTitle>
                    <CardDescription>
                        Never let anyone tamper your chat
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Username">Username</Label>
                            <Input id="Username" placeholder="Your username" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Password">Password</Label>
                            <Input
                                id="Password"
                                type="password"
                                placeholder="Your password"
                            />
                        </div>
                    </div>
                    <div className="mt-2 text-xs">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-700 underline">
                            Register
                        </a>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Login</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
