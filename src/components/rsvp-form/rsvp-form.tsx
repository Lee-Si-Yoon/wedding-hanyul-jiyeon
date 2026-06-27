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
  const [meal, setMeal] = useState<'yes' | 'no' | 'undecided' | ''>('');
  const [count, setCount] = useState(1);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending || meal === '') return;
    setPending(true);
    try {
      await createRSVP({ side, name, meal, count });
      window.alert('제출되었습니다');
      setName('');
      setMeal('');
      setCount(1);
      setSide('groom');
    } catch {
      window.alert('제출에 실패했습니다');
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      {!enabled && (
        <p className="mb-4 text-sm text-muted-foreground">
          지금은 참석여부 전달을 받고 있지 않습니다
        </p>
      )}
      <fieldset
        disabled={!enabled}
        className="space-y-5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <span className="text-sm font-medium">측</span>
              <RadioGroup value={side} onValueChange={(v) => setSide(v as 'groom' | 'bride')} className="flex gap-4 mt-2">
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
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-2" />
            </div>
            <div>
              <Label htmlFor="meal">식사 여부</Label>
              <Select value={meal} onValueChange={(v) => setMeal(v as 'yes' | 'no' | 'undecided')}>
                <SelectTrigger id="meal" className="w-full mt-2">
                  <SelectValue placeholder="선택해 주세요" />
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
              <Input id="count" type="number" min={1} value={count} onChange={(e) => setCount(Number(e.target.value))} required className="mt-2" />
            </div>
            <Button type="submit" className="w-full" disabled={!enabled || pending}>
              {pending ? '제출 중...' : '제출하기'}
            </Button>
          </div>
        </form>
      </fieldset>
    </div>
  );
}
