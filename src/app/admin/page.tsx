'use client';

import { signOut } from 'next-auth/react';

export default function AdminPage() {
  return (
    <div>
      <h1>Admin</h1>
      <button
        onClick={() =>
          signOut({ callbackUrl: '/api/auth/signin?callbackUrl=/admin' })
        }
      >
        Sign out
      </button>
    </div>
  );
}
