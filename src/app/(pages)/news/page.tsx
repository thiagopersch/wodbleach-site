import { redirect } from 'next/navigation';

export default function News() {
  redirect('/news/latest-news');
}
