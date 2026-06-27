'use client';

import { useState } from 'react';
import { createRSVP } from '@/db/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <div className="border-y border-foreground py-7">
      {!enabled && (
        <p className="mb-5 text-center text-sm text-muted-foreground">
          지금은 참석여부 전달을 받고 있지 않습니다
        </p>
      )}
      <fieldset
        disabled={!enabled}
        className="disabled:cursor-not-allowed disabled:opacity-60"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <span className="text-sm font-semibold">
                어느 쪽 손님이신가요
              </span>
              <RadioGroup
                value={side}
                onValueChange={(v) => setSide(v as 'groom' | 'bride')}
                className="mt-3 grid grid-cols-2 gap-2"
              >
                <Label
                  htmlFor="groom"
                  className={`flex h-12 cursor-pointer items-center justify-center border text-base transition-colors ${
                    side === 'groom'
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-background'
                  }`}
                >
                  <RadioGroupItem
                    value="groom"
                    id="groom"
                    className="sr-only"
                  />
                  신랑측
                </Label>
                <Label
                  htmlFor="bride"
                  className={`flex h-12 cursor-pointer items-center justify-center border text-base transition-colors ${
                    side === 'bride'
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-background'
                  }`}
                >
                  <RadioGroupItem
                    value="bride"
                    id="bride"
                    className="sr-only"
                  />
                  신부측
                </Label>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="name" className="font-semibold">
                이름
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2"
                placeholder="성함을 입력해 주세요"
              />
            </div>
            <div>
              <Label htmlFor="meal" className="font-semibold">
                식사 여부
              </Label>
              <Select
                value={meal}
                onValueChange={(v) => setMeal(v as 'yes' | 'no' | 'undecided')}
              >
                <SelectTrigger id="meal" className="mt-2 w-full">
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
              <Label htmlFor="count" className="font-semibold">
                참석 인원
              </Label>
              <Input
                id="count"
                type="number"
                min={1}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                required
                className="mt-2"
              />
              <p className="mt-2 text-sm text-muted-foreground">
                본인을 포함한 인원입니다.
              </p>
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!enabled || pending}
            >
              {pending ? '제출 중...' : '제출하기'}
            </Button>
          </div>
        </form>
      </fieldset>
    </div>
  );
}
