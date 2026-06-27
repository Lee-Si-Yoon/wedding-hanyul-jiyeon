import { getUiFlag } from '@/db/queries';
import Gallery from '@/components/gallery/gallery';
import RsvpForm from '@/components/rsvp-form/rsvp-form';
import BankAccounts, {
  type BankAccount,
} from '@/components/bank-accounts/bank-accounts';
import KakaoShare from '@/components/kakao-share/kakao-share';
import Map from '@/components/map/map';
import WeddingCalendar from '@/components/calendar/calendar';

const GALLERY_IMAGES = [
  '/gallery-example-1.png',
  '/gallery-example-2.png',
  '/gallery-example-3.png',
];

const GROOM_ACCOUNTS: BankAccount[] = [
  { name: '신랑', bank: '신한', account: '110123456789', holder: '김한율' },
  {
    name: '신랑 어머니',
    bank: '국민',
    account: '220123456789',
    holder: '이순자',
  },
];

const BRIDE_ACCOUNTS: BankAccount[] = [
  { name: '신부', bank: '우리', account: '330123456789', holder: '박지연' },
  {
    name: '신부 어머니',
    bank: '농협',
    account: '440123456789',
    holder: '최영희',
  },
];

const WEDDING_AT = '2026-09-05T17:30:00';
const SITE_URL = 'https://wedding-hanyul-jiyeon.vercel.app';
const PLACE_NAME = '메종디탈리';
const PLACE_ADDRESS = '경기도 성남시 수정구 시흥동 63-5';
const PLACE_LAT = 37.4196541;
const PLACE_LNG = 127.1076838;
const NMAP_PLACE_ID = 1950859773;
const KMAP_PLACE_ID = 843214968;
const KAKAO_SHARE_TITLE = '결혼식에 초대합니다';
const KAKAO_SHARE_DESCRIPTION =
  'ㅁㅁㅁ과 ㅁㅁㅁ의 결혼식에 초대합니다. 함께 축하해주세요!';
const KAKAO_SHARE_IMAGE_URL = `${SITE_URL}/gallery-example-1.png`;

export default async function Home() {
  const uiFlag = await getUiFlag('rsvp');
  const enabled = uiFlag?.enabled ?? false;

  return (
    <div className="p-6 max-w-md space-y-8">
      <div>
        <h2>결혼식 일시</h2>
        <WeddingCalendar targetDate={WEDDING_AT} />
      </div>
      <div>
        <h2>사진첩</h2>
        <Gallery images={GALLERY_IMAGES} />
      </div>
      <div>
        <h2>오시는 길</h2>
        <Map
          lat={PLACE_LAT}
          lng={PLACE_LNG}
          placeName={PLACE_NAME}
          nmapPlaceId={NMAP_PLACE_ID}
          kmapPlaceId={KMAP_PLACE_ID}
        />
      </div>
      <div>
        <h2>마음 전하기</h2>
        <BankAccounts label="신랑측" accounts={GROOM_ACCOUNTS}>
          신랑측 계좌번호 보기
        </BankAccounts>
        <BankAccounts label="신부측" accounts={BRIDE_ACCOUNTS}>
          신부측 계좌번호 보기
        </BankAccounts>
      </div>
      <div>
        <h2>참석여부 전달하기</h2>
        <RsvpForm enabled={enabled} />
      </div>
      <KakaoShare
        siteUrl={SITE_URL}
        address={PLACE_ADDRESS}
        addressTitle={PLACE_NAME}
        title={KAKAO_SHARE_TITLE}
        description={KAKAO_SHARE_DESCRIPTION}
        imageUrl={KAKAO_SHARE_IMAGE_URL}
      />
    </div>
  );
}
