'use client';

import { useState } from 'react';
import { createRSVP } from '@/db/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RsvpForm({ enabled }: { enabled: boolean }) {
  const [side, setSide] = useState<'groom' | 'bride'>('groom');
  const [name, setName] = useState('');
  const [meal, setMeal] = useState<'yes' | 'no' | 'undecided'>('yes');
  const [count, setCount] = useState(1);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      await createRSVP({ side, name, meal, count });
      window.alert('제출되었습니다');
      setName('');
      setMeal('yes');
      setCount(1);
      setSide('groom');
    } catch {
      window.alert('제출에 실패했습니다');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <Label>측</Label>
        <RadioGroup value={side} onValueChange={(v) => setSide(v as 'groom' | 'bride')} className="flex gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="groom" id="groom" />
            <Label htmlFor="groom">신랑측</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="bride" id="bride" />
            <Label htmlFor="bride">신부측</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="name">이름</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label>식사 여부</Label>
        <Select value={meal} onValueChange={(v) => setMeal(v as 'yes' | 'no' | 'undecided')}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">식사함</SelectItem>
            <SelectItem value="no">안함</SelectItem>
            <SelectItem value="undecided">미정</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="count">참석 인원 (본인포함)</Label>
        <Input id="count" type="number" min={1} value={count} onChange={(e) => setCount(Number(e.target.value))} required />
      </div>
      <Button type="submit" disabled={!enabled || pending}>
        {pending ? '제출 중...' : '제출하기'}
      </Button>
    </form>
  );
}
