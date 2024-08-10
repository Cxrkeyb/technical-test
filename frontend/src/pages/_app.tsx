import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import FooterWrapper from '@/footers';
import LayoutWrapper from '@/layouts';

const App = ({ Component }: AppProps) => {
  return (
    <LayoutWrapper>
      <FooterWrapper>
        <Component />
      </FooterWrapper>
    </LayoutWrapper>
  );
};

export default App;
