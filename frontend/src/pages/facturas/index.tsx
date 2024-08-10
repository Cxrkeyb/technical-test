import { Head } from '@/components';
import FacturaView from '@/views/facturas';

export default function Home() {
  return (
    <>
      <Head title="Facturas" />
      <FacturaView />
    </>
  );
}
