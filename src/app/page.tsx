import { getUiFlag } from '@/db/queries';
import Gallery from '@/components/gallery/gallery';
import RsvpForm from '@/components/rsvp-form/rsvp-form';
import BankAccounts, {
  type BankAccount,
} from '@/components/bank-accounts/bank-accounts';

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

export default async function Home() {
  const uiFlag = await getUiFlag('rsvp');
  const enabled = uiFlag?.enabled ?? false;

  return (
    <div className="p-6 max-w-md space-y-8">
      <div>
        <h2>사진첩</h2>
        <Gallery images={GALLERY_IMAGES} />
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
    </div>
  );
}
