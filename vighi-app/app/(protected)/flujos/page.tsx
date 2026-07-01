import { Suspense } from 'react';
import FlujoView from '@/features/flujos/components/FlujoView';

export default function FlujoPage() {
  return (
    <Suspense>
      <FlujoView />
    </Suspense>
  );
}
