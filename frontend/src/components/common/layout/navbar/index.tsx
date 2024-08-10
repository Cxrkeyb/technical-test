import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo from '@/components/common/logo';

function NavbarPrincipal() {
  const router = useRouter();

  return (
    <div className="bg-black pb-1">
      <div className="flex flex-row container items-end w-full justify-between">
        <Logo />
        <div className="flex flex-row">
          <div className="flex flex-row gap-8 pb-1">
            <Link
              className={`text-white text-lg relative ${
                router.pathname === '/' ? 'font-bold text-primary' : ''
              }`}
              href="/"
            >
              Clientes
              {router.pathname === '/' && (
                <div className="w-full h-1 bg-primary rounded-full absolute -bottom-[9px]" />
              )}
            </Link>
            <Link
              className={`text-white text-lg relative ${
                router.pathname === '/facturas' ? 'font-bold text-primary' : ''
              }`}
              href="/facturas"
            >
              Facturas
              {router.pathname === '/facturas' && (
                <div className="w-full h-1 bg-primary rounded-full absolute -bottom-[9px]" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarPrincipal;
