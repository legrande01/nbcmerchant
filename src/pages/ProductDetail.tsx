import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetails } from '@/components/products/ProductDetails';
import { useToast } from '@/hooks/use-toast';
import { getProductById } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const product = id ? getProductById(id) : undefined;

  const handleArchive = () => {
    toast({
      title: 'Product Archived',
      description: 'Product has been archived successfully.',
    });
    navigate('/products');
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/products')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </div>
    );
  }

  return <ProductDetails product={product} onArchive={handleArchive} />;
}
