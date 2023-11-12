import * as React from 'react'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { register, Role, AuthRequest, AuthResponse, roleMapper } from '@/api/authService'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string | null>(null)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        const body: AuthRequest = {
            email: event.target[0].value,
            password: event.target[1].value,
            role: event.target[3].value,
        }
        setIsLoading(true)
        const response = await register(import.meta.env.VITE_AUTH_SERVER, body)
            .catch((error) => {
                setError(error.message)
                return null
            })
            .then((response) => {
                return response
            })
        console.log(response)
        setIsLoading(false)
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className='grid gap-2'>
                    <div className='grid gap-1'>
                        <Label className='sr-only' htmlFor='email'>
                            Email
                        </Label>
                        <Input
                            id='email'
                            placeholder='name@example.com'
                            type='email'
                            autoCapitalize='none'
                            autoComplete='email'
                            autoCorrect='off'
                            disabled={isLoading}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <Label className='sr-only' htmlFor='password'>
                            Password
                        </Label>
                        <Input
                            id='password'
                            placeholder='password'
                            type='password'
                            autoCapitalize='none'
                            autoComplete='password'
                            autoCorrect='off'
                            disabled={isLoading}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <Label className='sr-only' htmlFor='role'>
                            Role
                        </Label>

                        <Select>
                            <SelectTrigger className=''>
                                <SelectValue placeholder='please select role' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Roles</SelectLabel>
                                    <SelectItem value={roleMapper(Role.Admin)}>Admin</SelectItem>
                                    <SelectItem value={roleMapper(Role.Student)}>Student</SelectItem>
                                    <SelectItem value={roleMapper(Role.Professor)}>Teacher</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {error && (
                        <div className='text-red-500 text-sm font-medium'>
                            <p>{error}</p>
                        </div>
                    )}
                    <Button disabled={isLoading}>
                        {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                        Sign Up with Email
                    </Button>
                </div>
            </form>
        </div>
    )
}
