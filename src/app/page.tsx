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
const GROOM_NAME = '이한율';
const BRIDE_NAME = '김지연';
const KAKAO_SHARE_TITLE = '결혼식에 초대합니다';
const KAKAO_SHARE_DESCRIPTION = `${GROOM_NAME}과 ${BRIDE_NAME}의 결혼식에 초대합니다. 함께 축하해주세요!`;
const KAKAO_SHARE_IMAGE_URL = `${SITE_URL}/gallery-example-1.png`;

const WEDDING_DATE = new Date(WEDDING_AT);
const PAD = (n: number) => String(n).padStart(2, '0');
const DATE_NUMERIC = `${WEDDING_DATE.getFullYear()}.${PAD(
  WEDDING_DATE.getMonth() + 1,
)}.${PAD(WEDDING_DATE.getDate())}`;
const DATE_SPACED = `${WEDDING_DATE.getFullYear()} · ${PAD(
  WEDDING_DATE.getMonth() + 1,
)} · ${PAD(WEDDING_DATE.getDate())}`;
const WEEKDAY = WEDDING_DATE.toLocaleDateString('ko-KR', { weekday: 'long' });
const HOUR24 = WEDDING_DATE.getHours();
const TIME_STR = `${HOUR24 < 12 ? '오전' : '오후'} ${
  HOUR24 % 12 === 0 ? 12 : HOUR24 % 12
}:${PAD(WEDDING_DATE.getMinutes())}`;

export default async function Home() {
  const uiFlag = await getUiFlag('rsvp');
  const enabled = uiFlag?.enabled ?? false;

  return (
    <main className="flex-1 w-full">
      {/* Hero */}
      <section
        aria-label="결혼식 초대"
        className="relative flex min-h-[88vh] flex-col items-center justify-center px-6 text-center"
      >
        <p
          data-hero
          className="text-sm font-medium tracking-[0.08em] text-muted-foreground"
        >
          결혼식에 초대합니다
        </p>
        <h1
          data-hero
          data-hero-delay="1"
          className="mt-7 text-[clamp(2.25rem,11vw,3.5rem)] font-semibold leading-[1.15] tracking-[-0.01em]"
        >
          {GROOM_NAME} · {BRIDE_NAME}
        </h1>
        <p
          data-hero
          data-hero-delay="2"
          className="mt-5 text-xl font-medium tabular-nums tracking-[0.15em] text-brand sm:text-2xl"
        >
          {DATE_SPACED}
        </p>
        <p data-hero data-hero-delay="3" className="mt-2 text-sm text-muted-foreground">
          {WEEKDAY} {TIME_STR} · {PLACE_NAME}
        </p>
        <div
          data-hero
          data-hero-delay="5"
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/60"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto w-full max-w-[640px] px-6">
        {/* 결혼식 일시 */}
        <section
          aria-labelledby="sec-when"
          className="pt-[clamp(3rem,8vw,4.5rem)]"
        >
          <div className="section-heading">
            <h2 id="sec-when">결혼식 일시</h2>
          </div>
          <WeddingCalendar targetDate={WEDDING_AT} />
        </section>

        {/* 사진첩 */}
        <section
          aria-labelledby="sec-gallery"
          className="pt-[clamp(3.5rem,10vw,5.5rem)]"
        >
          <div className="section-heading">
            <h2 id="sec-gallery">사진첩</h2>
          </div>
          <Gallery images={GALLERY_IMAGES} />
        </section>

        {/* 오시는 길 */}
        <section
          aria-labelledby="sec-map"
          className="pt-[clamp(3.5rem,10vw,5.5rem)]"
        >
          <div className="section-heading">
            <h2 id="sec-map">오시는 길</h2>
          </div>
          <p className="mb-4 text-[0.95rem] leading-relaxed text-muted-foreground">
            {PLACE_NAME}
            <br />
            {PLACE_ADDRESS}
          </p>
          <Map
            lat={PLACE_LAT}
            lng={PLACE_LNG}
            placeName={PLACE_NAME}
            nmapPlaceId={NMAP_PLACE_ID}
            kmapPlaceId={KMAP_PLACE_ID}
          />
        </section>

        {/* 마음 전하기 */}
        <section
          aria-labelledby="sec-gift"
          className="pt-[clamp(3.5rem,10vw,5.5rem)]"
        >
          <div className="section-heading">
            <h2 id="sec-gift">마음 전하기</h2>
          </div>
          <p className="mb-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            축하 마음을 전하고 싶으신 분들은 아래 계좌를 확인해 주세요.
          </p>
          <div className="space-y-3">
            <BankAccounts label="신랑측" accounts={GROOM_ACCOUNTS}>
              신랑측 계좌번호 보기
            </BankAccounts>
            <BankAccounts label="신부측" accounts={BRIDE_ACCOUNTS}>
              신부측 계좌번호 보기
            </BankAccounts>
          </div>
        </section>

        {/* 참석여부 전달하기 */}
        <section
          aria-labelledby="sec-rsvp"
          className="pt-[clamp(3.5rem,10vw,5.5rem)]"
        >
          <div className="section-heading">
            <h2 id="sec-rsvp">참석여부 전달하기</h2>
          </div>
          <RsvpForm enabled={enabled} />
        </section>

        {/* Share */}
        <section className="pt-[clamp(3.5rem,10vw,5.5rem)]">
          <KakaoShare
            siteUrl={SITE_URL}
            address={PLACE_ADDRESS}
            addressTitle={PLACE_NAME}
            title={KAKAO_SHARE_TITLE}
            description={KAKAO_SHARE_DESCRIPTION}
            imageUrl={KAKAO_SHARE_IMAGE_URL}
          />
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-12 pb-16 text-center">
          <p className="text-lg font-medium text-brand tracking-[-0.01em]">
            {GROOM_NAME} · {BRIDE_NAME}
          </p>
          <p className="mt-3 text-sm tabular-nums text-muted-foreground">
            {DATE_NUMERIC} {WEEKDAY} {TIME_STR}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{PLACE_NAME}</p>
          <p className="mt-8 text-xs tracking-[0.12em] text-muted-foreground">
            찾아주셔서 감사합니다
          </p>
        </footer>
      </div>
    </main>
  );
}
