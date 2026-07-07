import CarCard from './CarCard';

interface QueueCardItemProps {
  carModel: string;
  licensePlate: string;
  packageName?: string;
  initialStatusId?: number;
}

const QueueCardItem = ({
  carModel = 'Tesla Model 3',
  licensePlate = 'KLR-8821',
  packageName = 'Ceramic Pro Coating',
  initialStatusId = 1,
}: QueueCardItemProps) => {
  return (
    <CarCard
      carModel={carModel}
      licensePlate={licensePlate}
      packageName={packageName}
      initialStatusId={initialStatusId}
    />
  );
};

export default QueueCardItem;
