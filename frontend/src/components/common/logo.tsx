import Image from 'next/image';
import Link from 'next/link';

function Logo() {
  return (
    <div className="justify-center flex items-center">
      <Link href="/">
        <Image
          className="max-w-[140px] min-h-[48px] h-8"
          src="/logo.svg"
          width="2000"
          height="2000"
          alt="Facturate Logo"
        />
      </Link>
    </div>
  );
}

export default Logo;
