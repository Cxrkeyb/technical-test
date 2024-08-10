import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo from '@/components/common/logo';

function NavbarPrincipal() {
  const router = useRouter();

  return (
    <div className="bg-black pb-1">
      <div className="flex flex-col md:flex-row container items-center md:items-end w-full justify-between">
        <Logo />
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 pb-1">
            <Link
              className={`text-white text-base relative ${
                router.pathname === '/' ? 'font-bold text-primary' : ''
              }`}
              href="/"
            >
              Clientes
              {router.pathname === '/' && (
                <div className="w-full h-1 bg-primary rounded-full absolute -bottom-[3px] md:-bottom-[9px]" />
              )}
            </Link>
            <Link
              className={`text-white text-base relative ${
                router.pathname === '/facturas' ? 'font-bold text-primary' : ''
              }`}
              href="/facturas"
            >
              Facturas
              {router.pathname === '/facturas' && (
                <div className="w-full h-1 bg-primary rounded-full absolute -bottom-[3px] md:-bottom-[9px]" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarPrincipal;
