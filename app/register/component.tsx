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
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { register } from '@/use-case/mock/register'

export function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        publicKey: '',
        password: '',
        confirmPassword: '',
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
        register(formData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Register to KriptoChat</CardTitle>
                    <CardDescription>
                        Repudiate your friend's repudiation
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
                            <Label htmlFor="publicKey">Public Key</Label>
                            <Input
                                id="publicKey"
                                placeholder="TODO: autogenerate public key"
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
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Your password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mt-2 text-xs">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-700 underline">
                            Login
                        </a>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit">
                        Register
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
