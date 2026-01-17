import { Button } from '@/components/ui/button';
import { AdminDeliveryStatus } from '@/data/adminData';

interface AdminDeliveryFiltersProps {
  activeFilter: AdminDeliveryStatus | 'all';
  onFilterChange: (filter: AdminDeliveryStatus | 'all') => void;
  counts: Record<AdminDeliveryStatus | 'all', number>;
}

const filterOptions: { value: AdminDeliveryStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'dispute', label: 'Dispute' },
];

export function AdminDeliveryFilters({ activeFilter, onFilterChange, counts }: AdminDeliveryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          variant={activeFilter === option.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(option.value)}
          className="gap-1"
        >
          {option.label}
          <span className="ml-1 rounded-full bg-background/20 px-1.5 py-0.5 text-xs">
            {counts[option.value]}
          </span>
        </Button>
      ))}
    </div>
  );
}
