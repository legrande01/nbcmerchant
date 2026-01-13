import { createContext, useContext, useState, ReactNode } from 'react';
import { DriverDelivery, mockDriverDeliveries } from '@/data/driverData';

interface DeliveryContextType {
  selectedDelivery: DriverDelivery | null;
  setSelectedDelivery: (delivery: DriverDelivery | null) => void;
  getDeliveryById: (id: string) => DriverDelivery | undefined;
  activeDeliveries: DriverDelivery[];
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [selectedDelivery, setSelectedDelivery] = useState<DriverDelivery | null>(null);

  const getDeliveryById = (id: string): DriverDelivery | undefined => {
    return mockDriverDeliveries.find(d => d.id === id);
  };

  const activeDeliveries = mockDriverDeliveries.filter(d => 
    ['awaiting_pickup', 'in_transit', 'awaiting_buyer_confirmation'].includes(d.status)
  );

  return (
    <DeliveryContext.Provider value={{ 
      selectedDelivery, 
      setSelectedDelivery, 
      getDeliveryById,
      activeDeliveries 
    }}>
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (context === undefined) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
}
