'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { RegisterInput, registerSchema } from '@/app/(pages)/account/_hooks/validations';
import Link from 'next/link';

export function RegisterForm() {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountname: data.accountname,
          password: data.password,
          email: data.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Registration failed');
        return;
      }

      setSuccess('Account created successfully! You can now login.');
      setTimeout(() => {
        router.push('/account/login');
      }, 2000);
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
        <CardDescription className="text-center">Create a new account to access the monster database</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountname">Account Name</Label>
            <Input
              id="accountname"
              type="text"
              placeholder="Choose an account name (max 15 chars)"
              {...register('accountname')}
              disabled={isLoading}
              maxLength={15}
            />
            {errors.accountname && <p className="text-sm text-red-500">{errors.accountname.message}</p>}
            <p className="text-xs text-gray-500">Only letters and numbers allowed, maximum 15 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input id="email" type="email" placeholder="your@email.com" {...register('email')} disabled={isLoading} />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Choose a secure password"
              {...register('password')}
              disabled={isLoading}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              disabled={isLoading}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>

          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/account/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
