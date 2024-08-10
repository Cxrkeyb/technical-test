import PrincipalFooter from './principal';

const footersMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  '/': PrincipalFooter,
  '/_error': PrincipalFooter,
  '/terms-and-conditions': PrincipalFooter,
};

export default footersMap;
