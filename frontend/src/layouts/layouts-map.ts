import PrincipalLayout from './principal';

const layoutsMap: Record<string, React.FC<{ children: JSX.Element }>> = {
  '/': PrincipalLayout,
  '/terms-and-conditions': PrincipalLayout,
  '/_error': PrincipalLayout,
};

export default layoutsMap;
