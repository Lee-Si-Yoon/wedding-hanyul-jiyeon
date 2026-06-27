'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export type BankAccount = {
  name: string;
  bank: string;
  account: string;
  holder: string;
};

export default function BankAccounts({
  label,
  accounts,
  children,
}: {
  label: string;
  accounts: BankAccount[];
  children: React.ReactNode;
}) {
  async function copyAccount(text: string) {
    await navigator.clipboard.writeText(text);
    window.alert('복사되었습니다');
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" className="w-full" />}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{label} 계좌번호</DialogTitle>
        <div className="space-y-3">
          {accounts.map((a) => (
            <div
              key={a.account}
              className="flex items-center justify-between gap-2"
            >
              <div>
                <div className="font-medium">
                  {a.name} ({a.holder})
                </div>
                <div className="text-sm text-muted-foreground">
                  {a.bank} {a.account}
                </div>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => copyAccount(`${a.bank} ${a.account}`)}
              >
                복사
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
