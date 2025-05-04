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
import { ChangeEventHandler, FormEventHandler, useState } from 'react'

export function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { id, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }))
    }

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        login(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
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
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Your username"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Your password"
                                onChange={handleChange}
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
