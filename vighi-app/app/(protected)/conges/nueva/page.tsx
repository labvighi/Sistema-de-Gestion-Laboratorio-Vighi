import { Suspense } from 'react';
import NuevaCongelacionView from '@/features/conges/components/NuevaCongelacionView';

export default function NuevaCongelacionPage() {
  return (
    <Suspense>
      <NuevaCongelacionView />
    </Suspense>
  );
}
