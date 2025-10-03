import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOutIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

interface UserAccountNavProps {
  user: {
    id: string;
    email: string;
    name: string;
    expires: string;
  };
}

export default function UserAccountNav(props: UserAccountNavProps) {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const signOutFunc = async () => {
    await signOut({
      callbackUrl: '/account/login',
      redirect: true,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarFallback>{props.user.name.at(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">{props.user.name}</span>
          <span className="text-muted-foreground truncate text-xs font-normal">{props.user.email}</span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            Sessão válida até:{' '}
            <strong>{props.user.expires.slice(0, 10).split('-').reverse().join('/').trim() ?? 'N/A'}</strong>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOutFunc}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
