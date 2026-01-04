// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect users to the dashboard automatically
  redirect('/dashboard');
}