import { RegisterForm } from '@/components/auth/register-form';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface CreateAccountPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function CreateAccountPage({ searchParams }: CreateAccountPageProps) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
