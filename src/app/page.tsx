import { getUiFlag } from '@/db/queries';
import RsvpForm from '@/components/rsvp-form/rsvp-form';

export default async function Home() {
  const uiFlag = await getUiFlag('rsvp');
  const enabled = uiFlag?.enabled ?? false;

  return (
    <div className="p-6 max-w-md">
      <RsvpForm enabled={enabled} />
    </div>
  );
}
