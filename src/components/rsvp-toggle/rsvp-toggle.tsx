'use client';

import { useState } from 'react';
import { updateUiFlagAction } from '@/db/actions';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function RsvpToggle({ enabled, updatedAt }: { enabled: boolean; updatedAt: string | null }) {
  const [checked, setChecked] = useState(enabled);
  const [pending, setPending] = useState(false);

  async function handleToggle(val: boolean) {
    if (pending) return;
    setPending(true);
    setChecked(val);
    try {
      await updateUiFlagAction('rsvp', val);
    } catch {
      setChecked(!val);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Switch checked={checked} onCheckedChange={handleToggle} disabled={pending} />
      <Label>RSVP {checked ? '활성화' : '비활성화'}</Label>
      {updatedAt && <span className="text-sm text-muted-foreground">업데이트: {updatedAt}</span>}
    </div>
  );
}
