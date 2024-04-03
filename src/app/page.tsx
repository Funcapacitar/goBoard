

import { redirect, useRouter } from 'next/navigation'

export default function Home() {
  // const router = useRouter();
  // router.push('/dashboard', { scroll: false });
  redirect('/login')
}
