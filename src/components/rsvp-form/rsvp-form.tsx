'use client';

import { useRef, useState } from 'react';
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
  const [meal, setMeal] = useState<'식사 예정' | '식사 안 함' | '미정' | ''>(
    ''
  );
  const [count, setCount] = useState(1);
  const [pending, setPending] = useState(false);
  const [mealInvalid, setMealInvalid] = useState(false);
  const mealRef = useRef<HTMLButtonElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    if (meal === '') {
      setMealInvalid(true);
      mealRef.current?.focus();
      return;
    }
    setPending(true);
    try {
      await createRSVP({
        side,
        name,
        meal:
          meal === '식사 예정'
            ? 'yes'
            : meal === '식사 안 함'
              ? 'no'
              : 'undecided',
        count,
      });
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
        className="disabled:cursor-not-allowed disabled:opacity-60 mt-3.5 pb-1"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6.5">
          {/* Side select */}
          <div className="flex flex-col items-center gap-y-2.5">
            <span className="text-center text-body">
              신랑 · 신부 측을 선택해 주세요.
            </span>
            <RadioGroup
              value={side}
              onValueChange={(v) => setSide(v as 'groom' | 'bride')}
              className="grid grid-cols-2 gap-2"
            >
              <Label
                htmlFor="groom"
                className={`flex h-13 cursor-pointer items-center justify-center border text-center text-body! ${
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
                className={`flex h-13 cursor-pointer items-center justify-center border text-center text-body! ${
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
          <div className="flex flex-col items-center gap-y-2.5">
            <Label htmlFor="name" className="text-center text-body!">
              이름
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="성함을 입력해 주세요."
              className="border-black bg-white text-center h-13 text-body! placeholder:text-black"
            />
          </div>

          {/* Meal */}
          <div className="flex flex-col items-center gap-y-2.5">
            <Label htmlFor="meal" className="text-center text-body!">
              식사 여부
            </Label>
            <Select
              value={meal}
              onValueChange={(v) => {
                setMeal(v as '식사 예정' | '식사 안 함' | '미정');
                setMealInvalid(false);
              }}
            >
              <SelectTrigger
                ref={mealRef}
                aria-invalid={mealInvalid || undefined}
                className="w-full border-black bg-white [&>svg]:hidden justify-center text-center h-13!"
              >
                <SelectValue
                  placeholder="선택해 주세요."
                  className="text-black text-body! flex-none"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="식사 예정">식사 예정</SelectItem>
                <SelectItem value="식사 안 함">식사 안 함</SelectItem>
                <SelectItem value="미정">미정</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Count */}
          <div className="flex flex-col items-center gap-y-2.5">
            <Label htmlFor="count" className="text-center text-body!">
              본인을 포함한 참석 인원을 입력해 주세요.
            </Label>
            <Input
              id="count"
              type="number"
              min={1}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              required
              className="border-black bg-white text-center h-13"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!enabled || pending}
            className="w-full h-13 bg-black text-white"
          >
            {pending ? '제출 중...' : '제출하기'}
          </Button>
        </form>
      </fieldset>
    </>
  );
}
