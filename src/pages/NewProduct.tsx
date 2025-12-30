import { useNavigate } from 'react-router-dom';
import { ProductForm } from '@/components/products/ProductForm';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/data/mockData';

export default function NewProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSave = async (productData: Partial<Product>, publish: boolean) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: publish ? 'Product Published' : 'Draft Saved',
      description: publish 
        ? 'Your product is now live and visible to customers.'
        : 'Your product draft has been saved.',
    });
    
    navigate('/products');
  };

  return <ProductForm onSave={handleSave} />;
}
