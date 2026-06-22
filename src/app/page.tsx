import { getUiFlag } from '@/db/queries';
import Gallery from '@/components/gallery/gallery';
import RsvpForm from '@/components/rsvp-form/rsvp-form';

export default async function Home() {
  const uiFlag = await getUiFlag('rsvp');
  const enabled = uiFlag?.enabled ?? false;

  return (
    <div className="p-6 max-w-md space-y-8">
      <div className="pt-8">
        <h2 className="pb-4">Gallery</h2>
        <Gallery />
      </div>
      <div className="pt-8 gap-4">
        <h2 className="pb-4">RSVP</h2>
        <RsvpForm enabled={enabled} />
      </div>
    </div>
  );
}
