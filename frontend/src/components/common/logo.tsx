import Link from 'next/link';

function Logo() {
  return (
    <div className="justify-center flex items-center">
      <Link href="/">
        <picture>
          <img
            className="max-w-[140px] min-h-[48px] h-8"
            src="/logo.svg"
            width="2000"
            height="2000"
            alt="Facturate Logo"
          />
        </picture>
      </Link>
    </div>
  );
}

export default Logo;
