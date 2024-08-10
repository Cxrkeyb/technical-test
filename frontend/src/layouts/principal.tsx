'use client';

import { Assistant } from 'next/font/google';
import * as React from 'react';

import NavbarPrincipal from '@/components/common/layout/navbar';

interface Props {
  children: JSX.Element;
  className?: string;
}

const righteous = Assistant({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const MemoizedChildren = React.memo(function MemoizedChildren({
  children,
}: Props) {
  return <div className="pb-0 relative w-full">{children}</div>;
});

const MainContent = ({ children }: Props) => {
  return (
    <div className="mt-0 pb-0 min-h-[80vh] w-full items-center flex flex-col justify-center">
      <MemoizedChildren>{children}</MemoizedChildren>
    </div>
  );
};

function PrincipalLayout({ children, className }: Props) {
  return (
    <div className={`${className} ${righteous.className} w-full`}>
      <NavbarPrincipal />
      <div className="flex items-center justify-center flex-col gap-4 w-full mb-10">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}

export default PrincipalLayout;
