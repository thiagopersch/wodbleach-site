'use client';

import Loading from '@/app/loading';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginInput, loginSchema } from '../_hooks/validations';

export default function LoginForm(props) {
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/account/profile');
    }
  }, [status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      accountname: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setError('');

    try {
      const result = await signIn('credentials', {
        accountname: data.accountname,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid account name or password');
      } else {
        router.push('/account/profile');
        router.refresh();
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <Card className="mx-auto mt-40 flex max-w-md flex-col justify-center space-y-6">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl font-bold">Acessar minha conta</CardTitle>
        <CardDescription className="text-center">Insira suas credenciais de sua conta para acessar.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountname">Usuário</Label>
            <Input
              id="accountname"
              type="text"
              placeholder="Digite seu nome de usuário"
              {...register('accountname')}
              disabled={isLoading}
              maxLength={15}
              required
            />
            {errors.accountname && <p className="text-sm text-red-500">{errors.accountname.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              {...register('password')}
              disabled={isLoading}
              required
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Acessar
          </Button>

          <div className="text-center text-sm">
            Você ainda não tem uma conta?{' '}
            <Link href="/account/create" className="text-blue-600 hover:underline">
              Crie uma agora!
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
