import { redirect } from 'next/navigation';

export default function AccountPage(props: {}) {
  redirect('/account/login');
}
