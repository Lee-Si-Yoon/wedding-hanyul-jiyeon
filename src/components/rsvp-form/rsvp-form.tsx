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
    <>
      {!enabled && (
        <p className="mb-5 text-center text-sm text-black/50">
          지금은 참석여부 전달을 받고 있지 않습니다
        </p>
      )}
      <fieldset
        disabled={!enabled}
        className="disabled:cursor-not-allowed disabled:opacity-60"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-[10px]">
            {/* Side select */}
            <div className="flex flex-col items-center">
              <span className="text-center">
                신랑 · 신부 측을 선택해 주세요.
              </span>
              <RadioGroup
                value={side}
                onValueChange={(v) => setSide(v as 'groom' | 'bride')}
                className="mt-3 grid grid-cols-2 gap-2"
              >
                <Label
                  htmlFor="groom"
                  className={`flex h-12 cursor-pointer items-center justify-center border text-center ${
                    side === 'groom'
                      ? 'border-white bg-black text-white'
                      : 'border-black bg-white text-black'
                  }`}
                >
                  <RadioGroupItem
                    value="groom"
                    id="groom"
                    className="sr-only first:hidden"
                  />
                  신랑측
                </Label>
                <Label
                  htmlFor="bride"
                  className={`flex h-12 cursor-pointer items-center justify-center border text-center ${
                    side === 'bride'
                      ? 'border-white bg-black text-white'
                      : 'border-black bg-white text-black'
                  }`}
                >
                  <RadioGroupItem
                    value="bride"
                    id="bride"
                    className="sr-only first:hidden"
                  />
                  신부측
                </Label>
              </RadioGroup>
            </div>

            {/* Name */}
            <div className="flex flex-col items-center">
              <Label htmlFor="name" className="text-center">
                이름
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="성함을 입력해 주세요."
                className="border-black bg-white text-center"
              />
            </div>

            {/* Meal */}
            <div className="flex flex-col items-center">
              <Label htmlFor="meal" className="text-center">
                식사 여부
              </Label>
              <Select
                value={meal}
                onValueChange={(v) => setMeal(v as 'yes' | 'no' | 'undecided')}
              >
                <SelectTrigger
                  id="meal"
                  className="w-full border-black bg-white [&>svg]:hidden"
                >
                  <SelectValue placeholder="선택해 주세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">식사함</SelectItem>
                  <SelectItem value="no">안함</SelectItem>
                  <SelectItem value="undecided">미정</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Count */}
            <div className="flex flex-col items-center">
              <Label htmlFor="count" className="text-center">
                본인을 포함한 참석 인원을 입력해 주세요.
              </Label>
              <Input
                id="count"
                type="number"
                min={1}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                required
                className="border-black bg-white text-center"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={!enabled || pending}
              className="w-full bg-black text-white"
            >
              {pending ? '제출 중...' : '제출하기'}
            </Button>
          </div>
        </form>
      </fieldset>
    </>
  );
}
