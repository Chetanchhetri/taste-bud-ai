import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  recommendedIds?: string[];
  title?: string;
  onProductClick?: (product: Product) => void;
}

export const ProductGrid = ({ products, recommendedIds = [], title, onProductClick }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-2xl font-bold text-center">{title}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            isRecommended={recommendedIds.includes(product.id)}
            onClick={() => onProductClick?.(product)}
          />
        ))}
      </div>
    </div>
  );
};