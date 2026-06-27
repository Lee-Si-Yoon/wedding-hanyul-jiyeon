import { getUiFlag } from '@/db/queries';
import Gallery from '@/components/gallery/gallery';
import RsvpForm from '@/components/rsvp-form/rsvp-form';
import BankAccounts, {
  type BankAccount,
} from '@/components/bank-accounts/bank-accounts';
import KakaoShare from '@/components/kakao-share/kakao-share';
import Map from '@/components/map/map';
import WeddingCalendar from '@/components/calendar/calendar';
import { Hero } from '@/components/hero/hero';

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
  WEDDING_DATE.getMonth() + 1
)}.${PAD(WEDDING_DATE.getDate())}`;
const DATE_KOREAN = `${WEDDING_DATE.getFullYear()}년 ${
  WEDDING_DATE.getMonth() + 1
}월 ${WEDDING_DATE.getDate()}일`;
const DATE_SPACED = `${WEDDING_DATE.getFullYear()} · ${PAD(
  WEDDING_DATE.getMonth() + 1
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
    <main className="flex-1 w-full bg-[#050505] text-[#111]">
      <div className="mx-auto w-full max-w-[760px] border border-[#d9d9d9] bg-white">
        <div className="px-8 py-16 sm:px-14">
          <Hero
            groomName={GROOM_NAME}
            brideName={BRIDE_NAME}
            dateSpaced={DATE_SPACED}
            weekday={WEEKDAY}
            timeStr={TIME_STR}
            placeName={PLACE_NAME}
          />
        </div>

        <section
          aria-label="초대의 글"
          className="px-10 py-16 text-center sm:px-16"
        >
          <p className="text-[clamp(1.9rem,8vw,3.1rem)] font-medium leading-none tracking-[0.08em]">
            INDEFINITELY
          </p>
          <h2 className="mt-5 text-[clamp(1.8rem,7vw,3rem)] font-normal leading-tight tracking-normal">
            As long as we&apos;re together.
          </h2>
          <div className="mx-auto mt-16 max-w-[36rem] space-y-7 text-[1.05rem] leading-[2.05] sm:text-[1.2rem]">
            <p>
              유난히도 뜨거운 어느 6월,
              <br />
              아인슈타인을 좋아하는 공학도와
              <br />
              데이비드 호크니를 좋아하는 미술학도가 만나,
              <br />
              풋내음이 가득한 날, 이곳에서 새로운 시작을 하려 합니다.
            </p>
            <p>
              여름의 끝자락, 가을의 시작점에서
              <br />
              여유로운 저녁을 함께해 주세요.
              <br />
              드레스코드는 없지만, 밝은 차림으로 함께해 주신다면
              <br />
              그날의 풍경이 더욱 따뜻하게 빛날 것 같습니다.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-[28rem] grid-cols-[1fr_auto_1fr] gap-x-5 gap-y-3 text-[1.05rem] leading-relaxed sm:text-[1.2rem]">
            <span>이경복 손재희의</span>
            <span>장남</span>
            <strong className="font-medium">이한율</strong>
            <span>김수현 김종욱의</span>
            <span>차녀</span>
            <strong className="font-medium">김지연</strong>
          </div>
          <div className="mt-20 text-[0.95rem] leading-[1.9] sm:text-[1.05rem]">
            <p>
              {DATE_KOREAN} {WEEKDAY} {TIME_STR}
            </p>
            <p>{PLACE_NAME} (Maison d&apos;Italie)</p>
            <p>{PLACE_ADDRESS}</p>
          </div>
        </section>

        {/* Content */}
        <div className="mx-auto w-full max-w-[640px] px-8 sm:px-10">
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
            <div className="mt-8 space-y-7 text-[0.95rem] leading-[1.85]">
              <div>
                <h3 className="mb-2 text-base font-semibold">버스</h3>
                <p>
                  성남농협영농종합지원센터 (버스노선 9800 / 9400 / 9408) 에서
                  도보 5분 거리에 메종디탈리가 위치해 있습니다.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold">셔틀</h3>
                <p>
                  수서역 3호선 6번 출구에서 나오는 방향으로 7m 직진하면
                  메종디탈리 셔틀을 이용하실 수 있습니다.
                  <br />
                  예식 시간 기준 1시간 전부터 총 4시간 운행됩니다.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold">
                  식장 주소 및 연락처
                </h3>
                <p>
                  {PLACE_NAME} (Maison d&apos;Italie) {PLACE_ADDRESS}
                  <br />
                  02-579-6166 / 02-579-6165
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold">주차장</h3>
                <p>
                  식장 주차장과 식장 입구 맞은편 교회 주차장을 이용하실 수
                  있습니다. 주차자리가 협소하여 대중교통과 셔틀 이용을
                  권장드립니다.
                </p>
              </div>
            </div>
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
      </div>
    </main>
  );
}
