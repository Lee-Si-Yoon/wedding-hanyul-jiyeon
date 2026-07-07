import { getUiFlag } from '@/db/queries';
import Gallery from '@/components/gallery/gallery';
import RsvpForm from '@/components/rsvp-form/rsvp-form';
import BankAccounts, {
  type BankAccount,
} from '@/components/bank-accounts/bank-accounts';
import KakaoShare from '@/components/kakao-share/kakao-share';
import Map from '@/components/map/map';
import WeddingCalendar from '@/components/calendar/calendar';
import Image from 'next/image';

const GALLERY_IMAGES = Array.from(
  { length: 20 },
  (_, i) => `/gallery/img_${i + 1}.webp`
);

const GROOM_ACCOUNTS: BankAccount[] = [
  {
    name: '신랑',
    bank: '기업',
    account: '539-024812-01-016',
    holder: '이한율',
  },
  {
    name: '신랑 아버지',
    bank: '농협',
    account: '100092-52-103695',
    holder: '이경복',
  },
  {
    name: '신랑 어머니',
    bank: '농협',
    account: '221026-56-023504',
    holder: '손재희',
  },
];

const BRIDE_ACCOUNTS: BankAccount[] = [
  { name: '신부', bank: '신한', account: '110-611-439125', holder: '김지연' },
  {
    name: '신부 아버지',
    bank: '신한',
    account: '110-529-874250',
    holder: '김수헌',
  },
  {
    name: '신부 어머니',
    bank: '신한',
    account: '110-071-896642',
    holder: '김종옥',
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
const KAKAO_SHARE_TITLE = '지연 & 한율 결혼식에 초대합니다.';
const KAKAO_SHARE_DESCRIPTION = '메종디탈리 2026년 9월 5일 오후 5시 30분';
const KAKAO_SHARE_IMAGE_URL = `${SITE_URL}/ogimage_kakao.png`;

export default async function Home() {
  const uiFlag = await getUiFlag('rsvp');
  const enabled = uiFlag?.enabled ?? false;

  return (
    <main className="flex-1 w-full bg-white text-[#000] font-['Pretendard']">
      <div className="mx-auto w-full max-w-[375px]">
        {/* Hero */}
        <div className="relative w-full h-[496px]">
          <Image
            src="/hero.png"
            alt={`${BRIDE_NAME}-${GROOM_NAME}`}
            fill
            priority
            sizes="375px"
            className="object-cover"
          />
        </div>

        {/* Invitation text + Sketching Our Future */}
        <section className="flex flex-col items-center gap-12 py-[25px]">
          <div className="flex items-center justify-center px-12">
            <Image
              src="/title_sketching_our_future.svg"
              alt="Sketching Our Future"
              width={198}
              height={87}
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </div>
          <div className="flex flex-col items-center gap-[55px] px-0 pb-[25px]">
            <p className="w-[252px] text-center text-[15px] font-medium leading-[2.96em] tracking-[-0.04em]">
              종이 냄새를 좋아하는 공학도와{`\n`}
              물감 냄새를 좋아하는 미술학도가 만나,{`\n`}한 폭의 그림을 그려
              나가려 합니다.{`\n`}
              색이 채워지는 순간을 함께해 주세요.
            </p>
            <div className="flex flex-col items-center gap-[11px]">
              <div className="flex flex-col items-center justify-center gap-[10px]">
                <span className="text-center text-[15px] font-medium leading-[1.4em] tracking-[-0.04em]">
                  이경복 손재희 의
                </span>
                <span className="text-center text-[15px] font-normal leading-[1.4em] tracking-[-0.04em]">
                  장남
                </span>
                <span className="text-center text-[15px] font-medium leading-[1.4em] tracking-[-0.04em]">
                  이한율
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-[10px]">
                <span className="text-center text-[15px] font-medium leading-[1.4em] tracking-[-0.04em]">
                  김수헌 김종옥 의
                </span>
                <span className="text-center text-[15px] font-normal leading-[1.4em] tracking-[-0.04em]">
                  차녀
                </span>
                <span className="text-center text-[15px] font-medium leading-[1.4em] tracking-[-0.04em]">
                  김지연
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="flex flex-col items-center gap-[30px] py-[15px] pb-[63px]">
          <div className="relative w-full h-[63px]">
            <Image
              src="/title_gallery.png"
              alt="Gallery"
              width={91}
              height={36}
              style={{ width: 'auto', height: 'auto' }}
              className="absolute left-1/2 top-1/2 -translate-x-[20px] translate-y-[10px]"
            />
          </div>
          <Gallery images={GALLERY_IMAGES} />
        </section>

        {/* RSVP — #E9E9E9 bg */}
        <section className="bg-[#E9E9E9] py-[45px] px-0">
          <div className="px-[37px]">
            <h2 className="text-center text-[21px] font-semibold leading-[1.47em] tracking-[-0.04em]">
              참석 의사 전달
            </h2>
            <p className="mt-[18px] text-center text-[15px] font-normal leading-[1.75em] tracking-[-0.04em]">
              축하의 마음으로 참석해 주실 모든 분을{`\n`}
              정중히 모시고자 하오니,{`\n`}
              참석 여부를 알려주시면 감사하겠습니다.
            </p>
          </div>
          <RsvpForm enabled={enabled} />
        </section>

        {/* Date */}
        <section className="py-[40px]">
          <div className="px-[37px]">
            <h2 className="text-center text-[21px] font-semibold leading-[1.47em] tracking-[-0.04em]">
              결혼식 일시
            </h2>
          </div>
          <div className="mt-[31px] flex flex-col items-center gap-[31px]">
            <p className="text-center text-[15px] font-normal leading-[1.9em] tracking-[-0.04em]">
              2026년 9월 5일 토요일 오후 5시 30분{`\n`}
              메종디탈리 (Maison d&apos;Italie)
            </p>
            <p className="text-center text-[15px] font-normal leading-[2.96em] tracking-[-0.04em]">
              밝은 차림으로 그날의 저녁을 빛내주세요.
            </p>
          </div>
          <div className="mt-[35px]">
            <WeddingCalendar targetDate={WEDDING_AT} />
          </div>
        </section>

        {/* Directions */}
        <section className="py-[15px] pb-[45px]">
          <div className="px-[37px]">
            <h2 className="text-center text-[21px] font-semibold leading-[1.47em] tracking-[-0.04em]">
              오시는 길
            </h2>
            <p className="mt-[18px] text-center text-[15px] font-normal leading-[1.75em] tracking-[-0.04em]">
              메종 디탈리{`\n`}경기도 성남시 수정구 시흥동 63-5
            </p>
          </div>
          <div className="mt-[14px]">
            <Map
              lat={PLACE_LAT}
              lng={PLACE_LNG}
              placeName={PLACE_NAME}
              nmapPlaceId={NMAP_PLACE_ID}
              kmapPlaceId={KMAP_PLACE_ID}
            />
          </div>
          {/* Detail sections */}
          <div className="mt-[15px] flex flex-col gap-0">
            <div className="px-0 py-[13px]">
              <h3 className="text-[15px] font-semibold leading-[1.47em] tracking-[-0.04em]">
                주소
              </h3>
              <p className="text-[15px] font-normal leading-[1.75em] tracking-[-0.04em]">
                메종디탈리{`\n`}경기 성남시 수정구 설개로 39{`\n`}T. 02-579-6166
                / 02-579-6165
              </p>
            </div>
            <div className="px-0 py-[13px]">
              <h3 className="text-[15px] font-semibold leading-[1.47em] tracking-[-0.04em]">
                셔틀
              </h3>
              <div className="flex flex-col gap-[5px]">
                <p className="text-[15px] font-normal leading-[1.75em] tracking-[-0.04em]">
                  수서역 6번 출구에서{`\n`}
                  메종디탈리 요원의 안내에 따라 7m 직진하면{`\n`}
                  셔틀을 이용하실 수 있습니다.
                </p>
                <p className="text-[15px] font-normal leading-[1.75em] tracking-[-0.04em]">
                  <span className="font-semibold">
                    예식 시간 기준 1시간 전부터 총 4시간 운행됩니다.
                  </span>
                  {`\n`}( 운행시간 16:30~20:30 )
                </p>
              </div>
            </div>
            <div className="px-0 py-[13px]">
              <h3 className="text-[15px] font-semibold leading-[1.47em] tracking-[-0.04em]">
                버스
              </h3>
              <p className="text-[15px] font-normal leading-[1.75em] tracking-[-0.04em]">
                성남농협영농종합지원센터 하차 도보5분 거리{`\n`}
                (노선 9800 / 9400 / 9408)
              </p>
            </div>
            <div className="px-0 py-[13px]">
              <h3 className="text-[15px] font-semibold leading-[1.47em] tracking-[-0.04em]">
                주차
              </h3>
              <p className="text-[15px] font-normal leading-[1.75em] tracking-[-0.04em]">
                메종디탈리 주차장을 이용하실 수 있습니다.{`\n`}
                주차 자리가 협소하여{`\n`}
                대중교통과 셔틀 이용을 권장드립니다.
              </p>
            </div>
            <div className="px-0 py-[13px]">
              <h3 className="text-[15px] font-semibold leading-[1.47em] tracking-[-0.04em]">
                드레스 코드
              </h3>
              <p className="text-[15px] font-normal leading-[1.75em] tracking-[-0.04em]">
                밝은 차림으로 그날의 저녁을 빛내주세요.
              </p>
            </div>
          </div>
        </section>

        {/* Gift — #E9E9E9 bg */}
        <section className="bg-[#E9E9E9] py-[45px]">
          <div className="flex flex-col gap-[18px] w-[375px]">
            <h2 className="text-center text-[21px] font-semibold leading-[1.47em] tracking-[-0.04em]">
              마음 전하기
            </h2>
            <p className="text-center text-[15px] font-normal leading-[1.75em] tracking-[-0.04em]">
              축하 마음을 전하고 싶으신 분들은{`\n`}
              아래 계좌를 확인해주세요.
            </p>
          </div>
          <div className="mt-[15px] flex flex-col items-center gap-[15px]">
            <BankAccounts
              label="신랑측"
              accounts={GROOM_ACCOUNTS}
              variant="groom"
            >
              신랑측 계좌번호 보기
            </BankAccounts>
            <BankAccounts
              label="신부측"
              accounts={BRIDE_ACCOUNTS}
              variant="bride"
            >
              신부측 계좌번호 보기
            </BankAccounts>
          </div>
        </section>

        {/* Share */}
        <section className="py-[35px]">
          <KakaoShare
            siteUrl={SITE_URL}
            address={PLACE_ADDRESS}
            addressTitle={PLACE_NAME}
            title={KAKAO_SHARE_TITLE}
            description={KAKAO_SHARE_DESCRIPTION}
            imageUrl={KAKAO_SHARE_IMAGE_URL}
          />
        </section>
      </div>
    </main>
  );
}
