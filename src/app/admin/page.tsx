import { signOut } from 'next-auth/react';
import { getRSVPList, getRSVPSummary, getUiFlag } from '@/db/queries';
import RsvpToggle from '@/components/rsvp-toggle/rsvp-toggle';
import RsvpList from '@/components/rsvp-list/rsvp-list';
import { SignOutButton } from '@/components/sign-out-button';

const fmtDate = (d: Date | string) =>
  new Date(d).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

const fmtDateShort = (d: Date | string) =>
  new Date(d).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });

export default async function AdminPage() {
  const [rsvpList, summary, uiFlag] = await Promise.all([
    getRSVPList(),
    getRSVPSummary(),
    getUiFlag('rsvp'),
  ]);

  const formattedList = rsvpList.map((r) => ({
    ...r,
    createdAtFormatted: fmtDateShort(r.createdAt),
  }));

  const formattedSummary = {
    ...summary,
    lastUpdatedAt: summary.lastUpdatedAt
      ? fmtDate(summary.lastUpdatedAt)
      : null,
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">관리자</h1>
        <SignOutButton />
      </div>
      <RsvpToggle
        enabled={uiFlag?.enabled ?? false}
        updatedAt={uiFlag?.updatedAt ? fmtDate(uiFlag.updatedAt) : null}
      />
      <RsvpList list={formattedList} summary={formattedSummary} />
    </div>
  );
}
