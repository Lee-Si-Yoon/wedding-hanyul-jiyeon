'use client';

import { deleteRSVPAction } from '@/db/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { SelectRsvp } from '@/db/schema';

type RsvpRow = SelectRsvp & { createdAtFormatted: string };

type RsvpSummary = {
  total: number;
  mealYes: number;
  mealUndecided: number;
  sideGroom: number;
  sideBride: number;
  lastUpdatedAt: string | null;
};

export default function RsvpList({ list, summary }: { list: RsvpRow[]; summary: RsvpSummary }) {
  async function handleDelete(id: number) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await deleteRSVPAction(id);
  }

  const mealLabel = (m: string) => {
    if (m === 'yes') return '식사함';
    if (m === 'no') return '안함';
    return '미정';
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle>RSVP 요약</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 text-sm">
          <div>총 참석자: {summary.total}</div>
          <div>식사: {summary.mealYes}</div>
          <div>미정: {summary.mealUndecided}</div>
          <div>신랑측: {summary.sideGroom} / 신부측: {summary.sideBride}</div>
          {summary.lastUpdatedAt && <div className="col-span-2">마지막 업데이트: {summary.lastUpdatedAt}</div>}
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>측</TableHead>
            <TableHead>식사</TableHead>
            <TableHead>인원</TableHead>
            <TableHead>등록일</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.side === 'groom' ? '신랑측' : '신부측'}</TableCell>
              <TableCell>{mealLabel(r.meal)}</TableCell>
              <TableCell>{r.count}</TableCell>
              <TableCell>{r.createdAtFormatted}</TableCell>
              <TableCell><Button variant="destructive" size="sm" onClick={() => handleDelete(r.id)}>삭제</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
