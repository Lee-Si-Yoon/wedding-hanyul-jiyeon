'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function SignOutButton() {
  return <Button variant="outline" onClick={() => signOut({ callbackUrl: '/api/auth/signin?callbackUrl=/admin' })}>로그아웃</Button>;
}
