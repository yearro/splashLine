import CarCard from './CarCard';

interface QueueCardItemProps {
  carModel: string;
  licensePlate: string;
  packageName?: string;
  initialStatusId?: number;
  onRemove?: () => void;
}

const QueueCardItem = ({
  carModel = 'Tesla Model 3',
  licensePlate = 'KLR-8821',
  packageName = 'Ceramic Pro Coating',
  initialStatusId = 1,
  onRemove,
}: QueueCardItemProps) => {
  return (
    <CarCard
      carModel={carModel}
      licensePlate={licensePlate}
      packageName={packageName}
      initialStatusId={initialStatusId}
      onRemove={onRemove}
    />
  );
};

export default QueueCardItem;
