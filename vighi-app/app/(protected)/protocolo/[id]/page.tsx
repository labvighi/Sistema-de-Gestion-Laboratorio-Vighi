import ProtocoloView from '@/features/protocolo/components/ProtocoloView';

export default function ProtocoloPage({ params }: { params: { id: string } }) {
  return <ProtocoloView id={params.id} />;
}
