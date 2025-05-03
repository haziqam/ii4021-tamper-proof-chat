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
import { FormEventHandler } from 'react'
import { register } from '@/use-case/mock/register'

export function RegisterForm() {
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        register({
            username: '',
            publicKey: '',
            password: '',
            confirmPassword: '',
        })
    }

    return (
        <form onSubmit={onSubmit}>
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
                            <Label htmlFor="Username">Username</Label>
                            <Input id="Username" placeholder="Your username" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="PublicKey">Public Key</Label>
                            <Input
                                id="PublicKey"
                                placeholder="TODO: autogenerate public key"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Password">Password</Label>
                            <Input
                                id="Password"
                                type="password"
                                placeholder="Your password"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="Confirm Password">
                                Confirm Password
                            </Label>
                            <Input
                                id="Confirm Password"
                                type="password"
                                placeholder="Your password"
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
